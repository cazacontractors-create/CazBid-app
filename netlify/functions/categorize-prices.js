// Caza Estimator — AI auto-categorize for price-book imports (Stage 2b).
// ----------------------------------------------------------------------------
// POST { materials: ["2x4x8 SPF", "1/2in drywall 4x8", ...] }
//   -> { rows: [ { index, trade, category, confidence } ] }
// Classifies each imported material into one of the deterministic trades + a
// short product category, with a confidence the UI uses to highlight low-
// confidence rows in the mandatory review step (2c). Forced tool use = clean
// structured output. Regular (fast) function — caller should chunk big imports.

// Keep in sync with PRICE_BOOK_TRADES in app.src.jsx. Roofing is the flagship — it MUST be here.
const TRADES = ["roofing", "siding", "framing", "trim", "drywall", "insulation", "concrete", "decks", "flooring", "interior", "cabinetry", "electrical", "plumbing", "hvac", "other"];

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const TOOL = {
  name: "classify_materials",
  description: "Classify each residential construction material into the trade that buys/installs it and a short product category.",
  input_schema: {
    type: "object",
    properties: {
      rows: {
        type: "array",
        items: {
          type: "object",
          properties: {
            index: { type: "integer", description: "0-based index of the input material this row classifies." },
            trade: { type: "string", enum: TRADES, description: "The trade. Use 'other' only if it fits none." },
            category: { type: "string", description: "Short product category, e.g. lumber, sheathing, trusses, fasteners, board, finishing, batts, casing, ready-mix, rebar, wire, device, fixture, equipment, duct." },
            confidence: { type: "number", description: "0.0-1.0 confidence in the trade classification." },
          },
          required: ["index", "trade", "category", "confidence"],
        },
      },
    },
    required: ["rows"],
  },
};

const SYSTEM =
  "You classify residential construction MATERIALS into the trade that buys/installs them and a short product category. " +
  "Trades and what they cover: roofing (asphalt/architectural shingles, standing-seam & metal roof panels + clips/cleats/panel fasteners, drip edge, rake/eave metal, ice & water shield, synthetic/felt underlayment, ridge cap & hip/ridge, ridge/soffit vent, valley metal, step/pipe flashing, pipe boots, TPO/EPDM/PVC membrane, polyiso, coverboard, starter), " +
  "framing (dimensional lumber, studs, plates, sheathing/OSB, trusses, joists, framing fasteners, house wrap), " +
  "drywall (gypsum board, joint compound/mud, tape, drywall screws, corner bead), insulation (batts, blown-in, rigid board, rim insulation), " +
  "trim (baseboard, casing, interior doors, crown, door hardware), siding (lap/vinyl/fiber-cement/cedar field, starter, J-channel, corner posts, soffit, fascia), " +
  "concrete (ready-mix, rebar, wire mesh, vapor barrier, forms, anchor bolts, gravel base), " +
  "decks (PT/composite/cedar decking boards, joist hangers, deck screws/hidden fasteners, railing, posts, ledger, flashing tape), " +
  "flooring (LVP/laminate/hardwood/tile flooring, underlayment, thinset, grout, transitions, trowel), " +
  "interior (primer, paint, stain, caulk, patch/spackle, rollers/brushes — interior/exterior painting & finish), " +
  "cabinetry (cabinets, countertops, cabinet hardware/pulls, fillers, toe kick), " +
  "electrical (Romex/wire, devices/receptacles/switches, light fixtures, breakers, panel), " +
  "plumbing (toilets/sinks/tubs fixtures, PEX supply, DWV pipe, water heater), hvac (furnace/AC/heat-pump equipment, ductwork, registers, thermostat, lineset). " +
  "Return EXACTLY one row per input material, each with its 0-based index. Set confidence below 0.6 when the material name is ambiguous or could belong to multiple trades.";

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Server missing ANTHROPIC_API_KEY" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Bad request body" }) }; }

  const materials = Array.isArray(body.materials) ? body.materials.map((m) => String(m || "").trim()).filter(Boolean) : [];
  if (!materials.length) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "No materials provided" }) };
  if (materials.length > 120) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Too many materials in one call (max 120) — chunk the import." }) };

  const userText = "Classify these materials (index: name):\n" + materials.map((m, i) => i + ": " + m).join("\n");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 4000,
        system: SYSTEM,
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
    const byIndex = {};
    if (raw && Array.isArray(raw.rows)) {
      raw.rows.forEach((r) => {
        const i = Number(r.index);
        if (i >= 0 && i < materials.length) {
          byIndex[i] = {
            trade: TRADES.indexOf(String(r.trade)) >= 0 ? String(r.trade) : "other",
            category: String(r.category || "").slice(0, 40),
            confidence: Math.max(0, Math.min(1, Number(r.confidence) || 0)),
          };
        }
      });
    }
    // Ensure one row per input, in order (fallback for any the model skipped).
    const rows = materials.map((m, i) => Object.assign(
      { index: i, material: m, trade: "other", category: "", confidence: 0 },
      byIndex[i] || {}
    ));
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ rows: rows }) };
  } catch (e) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Request failed: " + (e.message || String(e)) }) };
  }
};
