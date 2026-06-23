// Caza Estimator — HOMEOWNER RANGE (Stage 4) deterministic compute, range-only.
// ----------------------------------------------------------------------------
// ONE source of truth: the homeowner price comes from the SAME deterministic
// engine as the contractor side (tradeEngine.computeTrade) — but this endpoint
// is HOMEOWNER-SAFE on two layers:
//
//   1. DISPLAY: the caller renders only a scope list + a single $ range + a
//      disclaimer (enforced in app.src.jsx).
//   2. DATA (the one that's easy to get wrong): the range is computed SERVER-SIDE
//      here and ONLY the final range leaves the server. Raw line costs, unit
//      costs, labor rates, hours, margins, and grand totals NEVER appear in the
//      response body — so dev-tools / the network tab can't expose contractor
//      figures. Do NOT add items/byTrade/grandTotal/laborRate/etc. to the output.
//
// Two request modes:
//   • STRUCTURED:  { trades: [ { trade, inputs }, ... ], priceBook? }
//       mirrors estimate-multi — used by the Stage-5 interactive house (zone ->
//       trade, inputs from defaults/forms). Pure JS, no LLM, fast.
//   • DESCRIPTION: { description, facts?: [..], region? }
//       the homeowner-chat path. The server CLASSIFIES the job into Caza's
//       deterministic trades, then reuses the engine's extraction step to turn
//       the description into structured inputs, then computes. Needs the LLM key.
//
// If no deterministic trade applies (roofing, landscaping, a small repair, …),
// the response is { usedEngine:false } and the caller keeps AL's own LLM range.

const engine = require("./tradeEngine.js");

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const DISCLAIMER = "Preliminary estimate — subject to on-site verification.";
// Deliberate spread around the computed cost so the homeowner is never anchored
// on the exact contractor figure (Stage 4 requirement). ±27%.
const SPREAD = 0.27;

function titleCase(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

// Round low DOWN / high UP to a "nice" step so the range reads as a ballpark,
// not a false-precision quote.
function niceStep(total) {
  if (total < 2000) return 50;
  if (total < 10000) return 100;
  if (total < 50000) return 250;
  return 500;
}
function roundRange(total) {
  const step = niceStep(total);
  const low = Math.max(0, Math.floor((total * (1 - SPREAD)) / step) * step);
  const high = Math.ceil((total * (1 + SPREAD)) / step) * step;
  return { priceLow: low, priceHigh: high };
}

// HOMEOWNER-SAFE response: only the four allowed fields (+ usedEngine flag).
function rangeResponse(total, scopeLabels) {
  const r = roundRange(total);
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({
      usedEngine: true,
      engine: "deterministic-range",
      scope: scopeLabels,
      priceLow: r.priceLow,
      priceHigh: r.priceHigh,
      disclaimer: DISCLAIMER,
    }),
  };
}
function noEngineResponse() {
  return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ usedEngine: false }) };
}

// Compute the summed grand total + scope labels for a list of {trade, inputs}.
// Returns null if no entry maps to a deterministic spec. NOTHING about the
// internal figures leaves this function except the single summed total.
function sumTrades(reqTrades, priceBook) {
  let total = 0;
  const scope = [];
  for (const t of reqTrades) {
    const key = String((t && t.trade) || "").toLowerCase();
    const spec = engine.SPECS[key];
    if (!spec) continue;
    try {
      const result = engine.computeTrade(spec, (t && t.inputs) || {}, priceBook);
      total += result.grandTotal;
      scope.push(titleCase(key));
    } catch (e) {
      // a bad single trade shouldn't sink the whole range — skip it
      console.error("estimate-range: " + key + " compute failed:", e && e.message);
    }
  }
  return scope.length ? { total, scope } : null;
}

// ---- DESCRIPTION MODE: classify the job into deterministic trades, then reuse
// the engine's extraction step per trade to get inputs. LLM, server-side only.
function buildUserMessages(description, facts) {
  const parts = [];
  if (description) parts.push("HOMEOWNER PROJECT: " + String(description).trim());
  if (Array.isArray(facts) && facts.length) {
    parts.push("CONFIRMED DETAILS:\n" + facts.map((f) => "- " + String(f)).join("\n"));
  }
  return [{ role: "user", content: [{ type: "text", text: parts.join("\n\n") || "(no description)" }] }];
}

async function classifyTrades(apiKey, messages) {
  const tradeKeys = Object.keys(engine.SPECS);
  const tool = {
    name: "classify_trades",
    description:
      "Identify which of Caza's deterministic construction trades the homeowner's project requires. " +
      "Include a trade ONLY if the described work clearly involves it. Many jobs (roofing, landscaping, " +
      "gutters, a simple repair, appliance swaps) match NONE of these — in that case return an empty array.",
    input_schema: {
      type: "object",
      properties: {
        trades: {
          type: "array",
          description: "The deterministic trades this project needs (0-4). Empty if none apply.",
          items: {
            type: "object",
            properties: {
              trade: { type: "string", enum: tradeKeys },
              confidence: { type: "number", description: "0-1 confidence this trade is actually part of the job." },
            },
            required: ["trade"],
          },
        },
      },
      required: ["trades"],
    },
  };
  const data = await engine.callAnthropic(apiKey, {
    model: "claude-opus-4-8",
    max_tokens: 600,
    system:
      "You route a homeowner's project to Caza's deterministic estimating trades. Pick only the trades the " +
      "work genuinely includes. If the project is not one of these trades, return an empty list.",
    tools: [tool],
    tool_choice: { type: "tool", name: tool.name },
    messages: messages,
  });
  let picked = [];
  if (Array.isArray(data.content)) {
    for (const b of data.content) {
      if (b && b.type === "tool_use" && b.name === tool.name && b.input && Array.isArray(b.input.trades)) {
        picked = b.input.trades; break;
      }
    }
  }
  return picked
    .filter((t) => t && engine.SPECS[String(t.trade).toLowerCase()] && (t.confidence == null || t.confidence >= 0.5))
    .map((t) => String(t.trade).toLowerCase())
    .filter((t, i, a) => a.indexOf(t) === i)
    .slice(0, 4);
}

// Extract one trade's inputs from the description via the engine's forced-tool
// extractor (same contract the contractor path uses), then compute its total.
async function computeFromDescription(apiKey, tradeKey, messages, priceBook) {
  const spec = engine.SPECS[tradeKey];
  const tool = engine.buildExtractionTool(spec);
  const exData = await engine.callAnthropic(apiKey, {
    model: "claude-opus-4-8",
    max_tokens: 1500,
    system: engine.buildExtractionSystem(spec),
    tools: [tool],
    tool_choice: { type: "tool", name: tool.name },
    messages: messages,
  });
  let raw = null;
  if (Array.isArray(exData.content)) {
    for (const b of exData.content) {
      if (b && b.type === "tool_use" && b.name === tool.name) { raw = b.input; break; }
    }
  }
  if (!raw || typeof raw !== "object") throw new Error(tradeKey + " extraction returned no input");
  const result = engine.computeTrade(spec, raw, priceBook);
  return result.grandTotal;
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: HEADERS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Bad request body" }) }; }

  const priceBook = body.priceBook && Array.isArray(body.priceBook.entries) ? body.priceBook : null;

  // ---- STRUCTURED MODE -----------------------------------------------------
  if (Array.isArray(body.trades) && body.trades.length) {
    const summed = sumTrades(body.trades, priceBook);
    if (!summed) return noEngineResponse();
    return rangeResponse(summed.total, summed.scope);
  }

  // ---- DESCRIPTION MODE ----------------------------------------------------
  const description = (body.description || "").trim();
  if (!description && !(Array.isArray(body.facts) && body.facts.length)) {
    return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Provide trades[] or a description" }) };
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return noEngineResponse(); // can't classify without the key -> caller keeps its own range

  try {
    const messages = buildUserMessages(description, body.facts);
    const tradeKeys = await classifyTrades(apiKey, messages);
    if (!tradeKeys.length) return noEngineResponse(); // not a deterministic job

    const totals = await Promise.all(tradeKeys.map(async (k) => {
      try { return { trade: k, total: await computeFromDescription(apiKey, k, messages, priceBook) }; }
      catch (e) { console.error("estimate-range describe " + k + ":", e && e.message); return null; }
    }));
    const ok = totals.filter(Boolean);
    if (!ok.length) return noEngineResponse();
    const total = ok.reduce((s, x) => s + x.total, 0);
    const scope = ok.map((x) => titleCase(x.trade));
    return rangeResponse(total, scope);
  } catch (e) {
    console.error("estimate-range failed:", e && e.message);
    return noEngineResponse(); // any failure -> caller falls back to AL's LLM range
  }
};
