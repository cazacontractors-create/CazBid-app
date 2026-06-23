// Caza Estimator — Netlify Function
// Holds your Anthropic API key server-side (NEVER in the browser) and calls Claude Opus 4.8.
// The browser posts { prompt, maxTokens, search, trade } and gets back { text }.
//
// NEW: when the browser sends a "trade" key, this function loads that trade's estimating
// manual from ./manuals and prepends it as a SYSTEM prompt — so AL applies Caza's
// pre-computed trade expertise. Only the ONE relevant manual is loaded per estimate
// (keeps the call fast + cheap), not the whole 105k-word master.

const fs = require("fs");
const path = require("path");
const engine = require("./tradeEngine.js");

// trade key -> manual filename (the files live in ./manuals next to this function)
const MANUAL_FILES = {
  roofing:    "Caza_Roofing_Estimating_Manual.md",
  siding:     "Caza_Siding_Estimating_Manual.md",
  framing:    "Caza_Framing_Estimating_Manual.md",
  concrete:   "Caza_Concrete_Masonry_Manual.md",
  decks:      "Caza_Deck_Estimating_Manual.md",
  insulation: "Caza_Insulation_Thermal_Manual.md",
  interior:   "Caza_Interior_Finish_Painting_Manual.md",
  flooring:   "Caza_Flooring_Estimating_Manual.md",
  cabinetry:  "Caza_Cabinetry_Estimating_Manual.md",
  electrical: "Caza_Electrical_Estimating_Manual.md",
  hvac:       "Caza_HVAC_Estimating_Manual.md",
  plumbing:   "Caza_Plumbing_Estimating_Manual.md",
};

// simple in-memory cache so a warm function doesn't re-read the file each call
const manualCache = {};

function loadManual(trade) {
  const key = String(trade || "").toLowerCase();
  const fname = MANUAL_FILES[key];
  if (!fname) return null;
  if (manualCache[key] !== undefined) return manualCache[key];
  // try a few likely locations (Netlify bundles included_files relative to the function)
  const candidates = [
    path.join(__dirname, "manuals", fname),
    path.join(process.cwd(), "netlify", "functions", "manuals", fname),
    path.join(process.cwd(), "manuals", fname),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const txt = fs.readFileSync(p, "utf8");
        manualCache[key] = txt;
        return txt;
      }
    } catch (e) { /* keep trying */ }
  }
  manualCache[key] = null; // remember the miss so we don't re-stat every call
  return null;
}

function buildSystemPrompt(trade) {
  const manual = loadManual(trade);
  if (!manual) return null;
  return (
    "You are AL, the estimator for Caza Contractors. Below is Caza's in-house estimating manual " +
    "for THIS trade. Treat it as your authoritative reference: use its material lists, coverage/waste " +
    "rates, production rates, units, and best-practice notes when building the takeoff. Honor every " +
    "\u26a0\ufe0f flag — never invent a structural size, never give licensed-trade install procedures, and note " +
    "where the job needs engineering, a permit, or a licensed sub. Apply the cold-climate / Climate-Zone-6 " +
    "guidance (heavy snow, deep frost, well/septic). When the manual and your general knowledge conflict, " +
    "the manual wins.\n\n" +
    "===== CAZA ESTIMATING MANUAL (THIS TRADE) =====\n\n" +
    manual +
    "\n\n===== END MANUAL =====\n"
  );
}

exports.handler = async function (event) {
  // CORS / preflight
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server missing ANTHROPIC_API_KEY. Set it in Netlify > Site settings > Environment variables." }) };
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad request body" }) }; }

  const prompt = body.prompt || "";
  const maxTokens = body.maxTokens || 4000;
  const useSearch = !!body.search;
  const trade = body.trade || "";        // NEW: which manual to load
  const priceBook = (body.priceBook && Array.isArray(body.priceBook.entries)) ? body.priceBook : null;
  if (!prompt) return { statusCode: 400, headers, body: JSON.stringify({ error: "No prompt provided" }) };

  // prompt may be a plain string (one user message) OR a full messages array
  // (role/content objects, possibly with images). Normalize to a messages array.
  let messages;
  if (Array.isArray(prompt)) {
    messages = prompt.map(function (m) {
      // accept {role, content} where content is a string or an array of blocks
      var role = (m && m.role) || "user";
      var content = m && typeof m.content !== "undefined" ? m.content : m;
      if (typeof content === "string") content = [{ type: "text", text: content }];
      return { role: role, content: content };
    });
  } else {
    messages = [{ role: "user", content: prompt }];
  }

  // NEW: load the relevant trade manual as a system prompt (if we have one)
  const sys = buildSystemPrompt(trade);

  // DETERMINISTIC TRADE PATH: any trade with a spec in tradeEngine.SPECS gets the
  // extract -> JS-compute -> prose flow. (Two Opus calls — best run via
  // estimate-background; supported here for parity. Falls through on any failure.)
  const spec = engine.SPECS[String(trade).toLowerCase()];
  if (spec) {
    try {
      const out = await engine.runDeterministicTrade(spec, { apiKey: apiKey, messages: messages, maxTokens: maxTokens, manualSystem: sys, priceBook: priceBook });
      // Emit the app's estResult JSON shape as `text` (markdown in estResult.numericBlock).
      return { statusCode: 200, headers, body: JSON.stringify({ text: JSON.stringify(out.estResult), manualUsed: trade, engine: "deterministic-trade" }) };
    } catch (e) {
      console.error("Deterministic trade failed; falling back to LLM path:", e && e.message);
    }
  }

  const payload = {
    model: "claude-opus-4-8",
    max_tokens: maxTokens,
    messages: messages,
  };
  if (sys) payload.system = sys;

  if (useSearch) {
    payload.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }];
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      const msg = (data && data.error && data.error.message) ? data.error.message : ("Anthropic API error " + res.status);
      return { statusCode: res.status, headers, body: JSON.stringify({ error: msg }) };
    }

    // assemble all text blocks from the content array
    let text = "";
    if (Array.isArray(data.content)) {
      data.content.forEach(function (block) {
        if (block && block.type === "text" && block.text) text += block.text;
      });
    }
    // include which manual was used, for transparency/debugging (browser can ignore)
    return { statusCode: 200, headers, body: JSON.stringify({ text: text, manualUsed: sys ? trade : null }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Request failed: " + (e.message || String(e)) }) };
  }
};
