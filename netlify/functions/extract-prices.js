// Caza Estimator — extract price lines from a PDF / photo (Stage 2b).
// ----------------------------------------------------------------------------
// POST { fileData: <base64 (no data: prefix)>, mediaType: "image/jpeg" | "image/png"
//        | "application/pdf" }
//   -> { rows: [ { material, unit, cost, trade, category, confidence } ] }
// Uses Claude vision/document reading + forced tool use to pull priced material
// lines off a supplier price sheet, quote, or invoice, classify each into a
// trade + category, and report a per-row confidence. Extraction is NEVER trusted
// blindly — the rows feed the SAME editable review->commit gate the CSV import
// uses (the app highlights low-confidence rows). A misread "$1.20" as "$120"
// must be catchable, so confidence is conservative on hard-to-read lines.

const TRADES = ["framing", "drywall", "insulation", "trim", "siding", "concrete", "electrical", "plumbing", "hvac", "other"];

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const TOOL = {
  name: "extract_price_lines",
  description: "Extract every priced material line item from a supplier price sheet, quote, or invoice.",
  input_schema: {
    type: "object",
    properties: {
      rows: {
        type: "array",
        items: {
          type: "object",
          properties: {
            material: { type: "string", description: "The material/product name as printed." },
            unit: { type: "string", description: "Unit of measure if shown (EA, SF, LF, SH, ROLL, CY, etc.), else empty." },
            cost: { type: "number", description: "The UNIT price in dollars (not an extended/line total). If only a line total + qty is shown, divide; if you cannot tell the per-unit price, report your best read and lower confidence." },
            trade: { type: "string", enum: TRADES, description: "Trade the material belongs to; 'other' if none." },
            category: { type: "string", description: "Short product category (lumber, board, fixture, etc.)." },
            confidence: { type: "number", description: "0.0-1.0: how sure you are you read BOTH the material name and the unit price correctly. Lower it for blurry, ambiguous, or total-vs-unit-uncertain lines." },
          },
          required: ["material", "cost", "trade", "category", "confidence"],
        },
      },
    },
    required: ["rows"],
  },
};

const SYSTEM =
  "You read a supplier price sheet, quote, or invoice and extract every priced MATERIAL line. " +
  "Report the UNIT price (per EA/SF/LF/etc.), not the extended line total — if only a line total and quantity are shown, divide to get the unit price and lower confidence. " +
  "Skip tax, freight, subtotals, labor, and non-material lines. Classify each into the trade that buys/installs it " +
  "(framing, drywall, insulation, trim, siding, concrete, electrical, plumbing, hvac, or 'other') and a short category. " +
  "Be CONSERVATIVE with confidence: a misread price ruins a bid. If a price digit, decimal point, or material name is at all unclear, set confidence below 0.6 so the contractor reviews it.";

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Server missing ANTHROPIC_API_KEY" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Bad request body" }) }; }

  let data = String(body.fileData || "");
  let mediaType = String(body.mediaType || "").toLowerCase();
  // Tolerate a full data: URL.
  const m = data.match(/^data:([^;]+);base64,(.*)$/);
  if (m) { mediaType = mediaType || m[1].toLowerCase(); data = m[2]; }
  if (!data) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "No file data provided" }) };

  const isPdf = mediaType === "application/pdf";
  const okImage = ["image/jpeg", "image/png", "image/webp", "image/gif"].indexOf(mediaType) >= 0;
  if (!isPdf && !okImage) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Unsupported file type: " + (mediaType || "unknown") + " (use a JPG/PNG photo or a PDF)" }) };

  const fileBlock = isPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: data } }
    : { type: "image", source: { type: "base64", media_type: mediaType, data: data } };

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
        messages: [{ role: "user", content: [fileBlock, { type: "text", text: "Extract all priced material lines from this supplier price sheet / quote." }] }],
      }),
    });
    const dataResp = await res.json();
    if (!res.ok) {
      const msg = (dataResp && dataResp.error && dataResp.error.message) ? dataResp.error.message : ("Anthropic API error " + res.status);
      return { statusCode: res.status, headers: HEADERS, body: JSON.stringify({ error: msg }) };
    }
    let raw = null;
    if (Array.isArray(dataResp.content)) {
      for (const b of dataResp.content) { if (b && b.type === "tool_use" && b.name === TOOL.name) { raw = b.input; break; } }
    }
    const rows = (raw && Array.isArray(raw.rows) ? raw.rows : [])
      .map((r) => ({
        material: String(r.material || "").slice(0, 120),
        unit: String(r.unit || "").slice(0, 12),
        cost: Number(r.cost) || 0,
        trade: TRADES.indexOf(String(r.trade)) >= 0 ? String(r.trade) : "other",
        category: String(r.category || "").slice(0, 40),
        confidence: Math.max(0, Math.min(1, Number(r.confidence) || 0)),
      }))
      .filter((r) => r.material && r.cost > 0);
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ rows: rows }) };
  } catch (e) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: "Request failed: " + (e.message || String(e)) }) };
  }
};
