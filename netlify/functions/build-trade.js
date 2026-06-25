// Caza Estimator — AI TRADE BUILDER (Roadmap Feature A).
// ----------------------------------------------------------------------------
// When a scope has no matching trade, Opus generates a STRUCTURED, reusable trade
// definition instead of falling back to a wrong trade. POST:
//   { scope, description, region, priceBook: [{name, unit, cost}] }
// -> { trade } where `trade` is a structured definition (inputs to collect,
// material lines with units + estimated unit costs, labor basis + MH/unit,
// equipment, caveats, confidence). The contractor's own price book is reused for
// any overlapping materials (source:"pricebook"); genuinely new items get an
// honest regional estimate (source:"estimate") flagged in caveats/confidence.
// The result is ALWAYS surfaced as "AI estimate — verify" and is never bid-ready
// until a real job calibrates it (Feature B). Forced tool use = clean output.

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const TOOL = {
  name: "define_trade",
  description: "Define a reusable residential construction trade so it can be estimated: the dimensional inputs to collect, the material takeoff lines, the labor basis, equipment, and honest caveats/confidence.",
  input_schema: {
    type: "object",
    properties: {
      trade: { type: "string", description: "Short trade name, e.g. 'Epoxy garage floor coating'." },
      summary: { type: "string", description: "One line: what this trade covers / scope." },
      inputs: {
        type: "array",
        description: "The dimensional inputs an estimator must collect to size this trade.",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            unit: { type: "string", description: "e.g. SF, LF, EA, CY" },
            description: { type: "string" },
          },
          required: ["name", "unit"],
        },
      },
      materials: {
        type: "array",
        description: "Material takeoff lines. Use the contractor's price-book unit cost when a line matches (source 'pricebook'); otherwise give a realistic regional estimate (source 'estimate').",
        items: {
          type: "object",
          properties: {
            item: { type: "string" },
            unit: { type: "string" },
            unitCost: { type: "number", description: "Estimated $ per unit." },
            qtyBasis: { type: "string", description: "How quantity is derived from the inputs, incl. waste, e.g. 'area SF x 1.1 / coverage'." },
            source: { type: "string", enum: ["pricebook", "estimate"], description: "'pricebook' if the unit cost came from the contractor's price book, else 'estimate'." },
          },
          required: ["item", "unit", "unitCost", "source"],
        },
      },
      labor: {
        type: "object",
        properties: {
          basis: { type: "string", description: "What labor scales with, e.g. 'MH per SF of floor'." },
          ratePerUnit: { type: "number", description: "Man-hours per unit." },
          unit: { type: "string" },
          note: { type: "string" },
        },
        required: ["basis", "ratePerUnit", "unit"],
      },
      equipment: { type: "string", description: "Any rentals / disposal / dumpster (a real cost that is NOT a material), or '' if none." },
      caveats: { type: "array", items: { type: "string" }, description: "Honest caveats: what's uncertain, what to verify, regional price risk." },
      confidence: { type: "number", description: "0.0-1.0 overall confidence in this definition." },
    },
    required: ["trade", "summary", "inputs", "materials", "labor", "caveats", "confidence"],
  },
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Server missing ANTHROPIC_API_KEY" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Bad request body" }) }; }

  const scope = String(body.scope || "").trim();
  const description = String(body.description || "").trim();
  if (!scope && !description) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Describe the trade to build" }) };
  const region = String(body.region || "upstate New York").trim();
  const priceBook = Array.isArray(body.priceBook) ? body.priceBook.slice(0, 150) : [];

  const pbText = priceBook.length
    ? "CONTRACTOR'S PRICE BOOK (reuse these exact unit costs for any matching material; mark source 'pricebook'):\n" +
      priceBook.map((m) => "- " + String(m.name || m.material || "") + (m.unit ? " (" + m.unit + ")" : "") + ": $" + (m.cost != null ? m.cost : m.unitCost != null ? m.unitCost : m.price)).join("\n") + "\n"
    : "The contractor has no price book entries yet — estimate all material unit costs and flag that in caveats.\n";

  const system =
    "You are a senior residential construction estimator near " + region + ". A contractor needs to bid a trade that is not yet in the system. " +
    "Build a STRUCTURED, REUSABLE trade definition by calling define_trade. List the dimensional INPUTS an estimator must collect to size it; the MATERIAL takeoff lines with units, a realistic per-unit cost, and how quantity derives from the inputs (incl. waste); the LABOR basis + man-hours per unit; any EQUIPMENT (rental/disposal — never a material line). " +
    "PRICING IS THE WEAK SPOT — be honest. Reuse the contractor's price-book unit costs where materials overlap (source 'pricebook'); for new items give a sound regional ESTIMATE (source 'estimate') and lower your confidence accordingly. Do NOT invent precise local/supplier prices you cannot know — call out the uncertainty in caveats. This output is a STARTING POINT to verify, never a finished bid.\n" + pbText;

  const userText = "Build the trade definition for:\nWORK TYPE: " + (scope || "(see description)") + "\nDESCRIPTION: " + (description || "(see work type)");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 3000,
        system: system,
        tools: [TOOL],
        tool_choice: { type: "tool", name: TOOL.name },
        messages: [{ role: "user", content: userText }],
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = (data && data.error && data.error.message) ? data.error.message : ("Anthropic API error " + res.status);
      return { statusCode: res.status, headers: HEADERS, body: JSON.stringify({ error: msg }) };
    }
    let raw = null;
    if (Array.isArray(data.content)) {
      for (const b of data.content) { if (b && b.type === "tool_use" && b.name === TOOL.name) { raw = b.input; break; } }
    }
    if (!raw || typeof raw !== "object") return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: "AI did not return a trade definition" }) };

    // normalize + clamp; tag origin so it stays flagged until calibrated
    const trade = {
      trade: String(raw.trade || scope || "Custom trade").slice(0, 80),
      summary: String(raw.summary || "").slice(0, 300),
      inputs: Array.isArray(raw.inputs) ? raw.inputs.slice(0, 12).map((i) => ({ name: String(i.name || "").slice(0, 60), unit: String(i.unit || "").slice(0, 12), description: String(i.description || "").slice(0, 160) })) : [],
      materials: Array.isArray(raw.materials) ? raw.materials.slice(0, 30).map((m) => ({ item: String(m.item || "").slice(0, 80), unit: String(m.unit || "").slice(0, 12), unitCost: Math.max(0, Number(m.unitCost) || 0), qtyBasis: String(m.qtyBasis || "").slice(0, 160), source: m.source === "pricebook" ? "pricebook" : "estimate" })) : [],
      labor: raw.labor && typeof raw.labor === "object" ? { basis: String(raw.labor.basis || "").slice(0, 120), ratePerUnit: Math.max(0, Number(raw.labor.ratePerUnit) || 0), unit: String(raw.labor.unit || "").slice(0, 20), note: String(raw.labor.note || "").slice(0, 200) } : { basis: "", ratePerUnit: 0, unit: "" },
      equipment: String(raw.equipment || "").slice(0, 200),
      caveats: Array.isArray(raw.caveats) ? raw.caveats.slice(0, 8).map((c) => String(c).slice(0, 200)) : [],
      confidence: Math.max(0, Math.min(1, Number(raw.confidence) || 0)),
      origin: "ai",          // <- stays flagged until a real job calibrates it (Feature B)
      calibratedJobs: 0,
      builtAt: new Date().toISOString(),
    };
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ trade: trade }) };
  } catch (e) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Request failed: " + (e.message || String(e)) }) };
  }
};
