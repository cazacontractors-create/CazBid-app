# CazBid — Handoff for Stages 4 & 5 (new session)

Stages **0, 1, 2, 3 are DONE, live on https://cazbid.netlify.app, and committed to
GitHub** (`cazacontractors-create/CazBid-app`, through PR #5). This doc is what a
fresh session needs to finish **Stage 4 (homeowner range)** and **Stage 5
(interactive house)**. Read the three CazBid memory files first — they have the
full architecture + history.

---

## Operational essentials (don't relearn these)

- **Source lives in two NON-git dirs:** `~/Desktop/files/cazbid` (build + app.src.jsx
  + most functions + `engine/`) and `~/Desktop/cazbid-market-netlify` (`estimate.js`
  + the 12 markdown manuals). The deployed bundle is assembled at **`/tmp/cazbid-deploy`**.
- **No node/npm on this Mac** — use the portable node already at
  `/tmp/node-v20.18.1-darwin-arm64/bin` (put it on PATH).
- **Deploy:** Netlify MCP `netlify-deploy-services-updater` op `deploy-site`
  (siteId `b54f5dbe-1589-4e43-8f58-93b8e9404619`) returns an
  `npx @netlify/mcp ... --proxy-path <token>` command — run it from `/tmp/cazbid-deploy`
  with portable node. Netlify runs `npm run build` (build.mjs → dist) + bundles functions.
  Deploys are **zip uploads, NOT git** — so the repo lags until you sync it.
- **Repo sync recipe (do after each deploy):** `gh` is installed + authed
  (`cazacontractors-create`). `cd /tmp/CazBid-app && git checkout main && git pull`,
  copy the changed live files over, `node build.mjs && cp dist/index.html index.html`,
  new branch, `git add -A && commit`, `gh pr create` + `gh pr merge --merge --delete-branch`.
- **Verify on the LIVE site**, not just locally (sandbox-passes/prod-fails has bitten this).
  Browser checks: the **Claude-in-Chrome extension wouldn't pair**; what worked was the
  **Control_Chrome MCP** (open/switch tabs only — its execute_javascript errors) +
  **computer-use screenshot** (Chrome granted read-tier; needs Screen Recording perm on
  the Claude app). The user drives clicks; you screenshot to verify.

### Gotchas that already bit us
- **`claude-opus-4-8` deprecates `temperature`** — sending it 400s. Never include it.
- **build.mjs guards reject `import(`/`import"`/`require(`/`export …` in the COMPILED
  output, including comments & strings** — so a comment like `// CSV import (...)` or a
  string `"...import"` FAILS the build. Reword to avoid `import` immediately followed by
  `( { ' "`. Always Babel-compile-check app.src.jsx before deploying (see below).
- **app.src.jsx is ~350KB** — edit surgically; it's plain JSX compiled by build.mjs
  (classic React runtime, global React/ReactDOM). Compile-check:
  `cd /tmp/babelcheck && node -e '...Babel.transform(...)...'` (deps already installed there).

---

## Architecture (what to build on)

- **`netlify/functions/tradeEngine.js`** — the deterministic engine. `SPECS[trade]`
  for 9 trades (framing, drywall, insulation, trim, siding, concrete, electrical,
  plumbing, hvac), each with `inputs[]`, `lineItems[]` (string `takeoff` formulas +
  `priceMatch` hints), `labor.laborBasis`, `calibration`. Key exports:
  - `computeTrade(spec, inputs, priceBook)` → `{lineItems[](qty,unitCost,lineCost,
    priceTier,priceMatch), materialTotal, labor{laborHours,laborCost}, grandTotal, inputs}`.
    **Deterministic** (same inputs → same numbers). priceBook applies the waterfall:
    builder price book (fuzzy, per-trade) → HD/Lowe's retail (`setRetailSource`, off by
    default) → seed.
  - `buildEstResult(spec, result, narrative, numericBlock)` → the app's `estResult`
    JSON shape (items/laborHours/laborRate/priceSummary/…, `deterministic:true`).
  - `runDeterministicTrade(spec, {apiKey, messages, maxTokens, manualSystem, priceBook})`
    — LLM extracts inputs (forced tool) → computeTrade → narrative → estResult.
- **`netlify/functions/estimate-multi.js`** — POST `{trades:[{trade,inputs}], priceBook}`
  → per-trade estResult + `combined` roll-up (materialTotal/laborCost/grandTotal/
  priceSummary/byTrade). **No LLM, fast.** This is the contractor (full-detail) endpoint.
- **`netlify/functions/trade-specs.js`** — GET → every trade's input schema + complexity
  (NO costs/rates — safe for the homeowner path). Drives the Whole House forms + would
  drive AL intake.
- **`netlify/functions/estimate-background.js` / `estimate.js`** — single-trade flow;
  both accept `body.priceBook`. Route `SPECS[trade]` → deterministic, else LLM fallback.
- **Price import:** `categorize-prices.js` (AI trade/category), `extract-prices.js`
  (vision PDF/photo → priced lines), `fetch-url.js` (SSRF-guarded supplier-feed proxy).
- **app.src.jsx:** contractor bottom-nav tab **"Whole House"** (`tab==="wholehouse"`):
  fetches trade-specs, per-trade forms + the **price book editor** (`enginePB` state,
  persisted via `pSet(ENGINE_PB_KEY)`) + CSV/PDF/photo/API import (the shared
  `csvReview` → `csvCommit` gate), POSTs to estimate-multi, renders combined +
  priceSummary. Single-trade Estimate tab shows per-line 📗/🏷️ tier badges.
  Stage 3 `JobContextPanel` (photos + measurements + get-measured) is on the
  contractor estimator and homeowner chat.

**Whole House data flow for an estimate:** app collects `{trade: inputs}` from the forms
(+ the manual/imported price book `enginePriceBookPayload()`) → POST `estimate-multi`.

---

## STAGE 4 — Homeowner range off the SAME trade figures  ← DO THIS FIRST

Goal: one source of truth. The homeowner range comes from the SAME deterministic engine
as the contractor side. **The hard requirement is two layers of margin/rate hiding:**

1. **DISPLAY:** homeowner view shows ONLY a scope list + a single $ RANGE + a disclaimer.
   No labor rates, hourly cost, margin %, crew/production rates, or line-item dollars.
2. **DATA (the one that's easy to get wrong):** compute the range **SERVER-SIDE** and send
   **ONLY the final range** to the browser. Do NOT send full cost data and hide it with CSS
   (dev-tools would expose it). **Raw rates/line costs must never leave the server on the
   homeowner path.**

### How to build it
- Add a **new endpoint `estimate-range.js`** (mirror estimate-multi but homeowner-safe):
  POST `{trades:[{trade,inputs}], priceBook?}` → run `computeTrade` per trade server-side
  → sum grandTotals → apply a deliberate spread (**start ±25–30%** around the computed cost,
  rounded e.g. to nearest $100/$500) → return **ONLY** `{ scope:[trade labels],
  priceLow, priceHigh, disclaimer }`. **Do NOT include** items, unitCost, laborRate,
  laborCost, materialTotal, byTrade, or grandTotal in the response.
- Wire the **homeowner** estimate (the `tab==="chat"` conversational flow, `convBid`/
  `bidPreview`) so that when the job maps to deterministic trade(s), it calls
  `estimate-range` and shows the range — never the contractor numbers.
- The homeowner can supply dims via the existing chat (or address-ballpark). You may reuse
  the LLM extraction (runDeterministicTrade's extract step) to turn their description into
  `inputs`, then call computeTrade server-side for the range.

### Verify (all three required)
(a) homeowner estimate produces a RANGE from the trade figures;
(b) NO rate/margin/line-item value anywhere in the homeowner UI;
(c) **inspect the network response** (DevTools / Control_Chrome read_network or curl the
    endpoint) — confirm raw rates/margins/line costs are NOT in the payload.
Label clearly: "Preliminary estimate — subject to on-site verification." Never anchor the
homeowner on the exact contractor figure.

> Guardrail also applies to any homeowner-side AL intake and the Stage-5 clickable house:
> the homeowner price stays range-only in ALL contexts; only the contractor view shows real figures.

---

## STAGE 5 — Interactive House Selector + AL avatar  ← BUILD LAST

**Do NOT start until Stage 4 is live + verified.** This is a VISUAL SKIN over the Whole
House selector — clicking a zone = checking that trade's box. It adds ZERO estimating
accuracy; do not fork a second engine. Map every zone to the existing `whChecked` / trade
state and reuse `estimate-multi` (contractor) / `estimate-range` (homeowner).

- Illustrated/cartoon cutaway house + the AL avatar (use `AL_NOTEPAD` data-URL already in
  app.src.jsx) pointing/reacting to clicks. Zones peel/deconstruct to reveal inner systems.
- **Zone → trade map:** sidewalk/hardscape→concrete(+masonry); sloped roof→roofing
  (shingles+metal); flat roof→flat-roof; siding→siding; foundation→concrete;
  landscaping→landscaping; peel ROOF → overhead interior view → bathroom/kitchen/flooring +
  clickable drywall/painting/trim; walls DECONSTRUCT → electrical/plumbing/HVAC; Full Build
  → whole multi-trade scope. (Some zones like roofing/landscaping aren't deterministic
  trades yet — they fall to the LLM path; that's fine.)
- Clicking a zone opens a visual material list w/ pricing: contractor → real cost/price;
  homeowner → RANGE only (Stage-4 guardrails still apply, incl. the data layer).
- Keep the checkbox Whole House selector as the accessible fallback; the house is an
  alternate skin onto the same state. Hit-detection/layer states + art assets + AL
  point/react states are the main new work.

---

## Also outstanding (smaller)
- **Stage 1 optional — AL conversational intake** (never built): generate AL's questions
  from the checked trades' `spec.inputs[].required` (read from `trade-specs`), ask only for
  gaps, feed the SAME computeTrade. The trade-specs endpoint already exposes everything needed.
- **Pricing polish:** fuzzy dedup on commit is exact-ish (token overlap ≥0.8); a sparse
  price book can over-match (an R-19 wall-batt entry also priced cathedral batts) — the
  review/transparency covers it; tighten if desired.
- **Stage 3 visual check** still pending (display-only, low risk; build contains it).
- **Security housekeeping:** `ANTHROPIC_API_KEY` is stored NON-secret in Netlify env (came
  back in plaintext when read for debugging) — consider marking it secret / rotating.

Task list + the 3 `cazbid-*` memory files carry the rest.
