// Caza Estimator — TRADE INPUT SCHEMAS (for the Whole House form + AL intake).
// ----------------------------------------------------------------------------
// GET -> the input schema for every deterministic trade, so the front-end can
// generate per-trade input forms AND drive AL's conversational intake (asking
// only for each checked trade's REQUIRED inputs). Single source of truth =
// tradeEngine.SPECS. Deliberately exposes ONLY the input schema + labels — NOT
// seed costs / crew rates (keeps pricing off a public endpoint; the homeowner
// guardrails in Stage 4 depend on rates never leaving the server).

const engine = require("./tradeEngine.js");

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=300",
};

function titleCase(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };

  const trades = Object.keys(engine.SPECS).map((key) => {
    const spec = engine.SPECS[key];
    const c = spec.complexity || {};
    return {
      trade: key,
      label: titleCase(key),
      basis: spec.basis,
      laborBasis: spec.labor.laborBasis,
      complexity: { min: c.min != null ? c.min : 1.0, max: c.max != null ? c.max : 1.8, default: c.default != null ? c.default : spec.labor.complexityFactor, guide: c.guide || "" },
      inputs: spec.inputs.map((d) => ({
        name: d.name,
        label: d.label || d.name,
        unit: d.unit || "",
        type: d.type || "number",
        required: !!d.required,
        default: d.default != null ? d.default : (d.type === "enum" || d.type === "string" ? "" : 0),
        enumValues: d.enumValues || undefined,
        description: d.description || "",
      })),
    };
  });

  return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ trades: trades }) };
};
