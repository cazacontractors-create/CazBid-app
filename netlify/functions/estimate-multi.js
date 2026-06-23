// Caza Estimator — MULTI-TRADE (Whole House / Addition) deterministic compute.
// ----------------------------------------------------------------------------
// POST { trades: [ { trade, inputs }, ... ] }  where `inputs` is the structured
// takeoff for that trade (from the form or AL intake). Computes EACH trade with
// the deterministic engine (NO LLM — pure JS), then returns per-trade estResults
// plus a combined roll-up. Fast enough for a regular function (no Blobs/LLM).
//
// This is the contractor (full-detail) endpoint. The homeowner range path
// (Stage 4) will reuse computeTrade server-side but emit ONLY a range.

const engine = require("./tradeEngine.js");

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Bad request body" }) }; }

  const reqTrades = Array.isArray(body.trades) ? body.trades : [];
  if (!reqTrades.length) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "No trades provided" }) };

  const trades = [];
  const errors = [];
  for (const t of reqTrades) {
    const key = String((t && t.trade) || "").toLowerCase();
    const spec = engine.SPECS[key];
    if (!spec) { errors.push({ trade: key, error: "no deterministic spec for this trade" }); continue; }
    try {
      const result = engine.computeTrade(spec, (t && t.inputs) || {});
      const numericBlock = engine.formatTradeNumericBlock(spec, result);
      const est = engine.buildEstResult(spec, result, "", numericBlock);
      trades.push({ trade: key, estResult: est });
    } catch (e) {
      errors.push({ trade: key, error: (e && e.message) || String(e) });
    }
  }

  // Combined roll-up across the trades that computed.
  const round0 = (n) => Math.round(Number(n) || 0);
  let materialTotal = 0, laborCost = 0, laborHours = 0, grandTotal = 0;
  const combinedItems = [];
  const byTrade = [];
  for (const t of trades) {
    const e = t.estResult;
    materialTotal += e.materialTotal;
    laborCost += e.laborCost;
    laborHours += e.laborHours;
    grandTotal += e.grandTotal;
    byTrade.push({ trade: t.trade, title: e.title, materialTotal: e.materialTotal, laborCost: e.laborCost, grandTotal: e.grandTotal });
    e.items.forEach((it) => combinedItems.push(Object.assign({ trade: t.trade }, it)));
  }

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({
      deterministic: true,
      engine: "deterministic-multi",
      trades: trades,
      errors: errors,
      combined: {
        items: combinedItems,
        byTrade: byTrade,
        materialTotal: round0(materialTotal),
        laborCost: round0(laborCost),
        laborHours: round0(laborHours),
        grandTotal: round0(grandTotal),
        tradeCount: trades.length,
      },
    }),
  };
};
