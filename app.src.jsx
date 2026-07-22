// ---- React hooks from the global UMD build (no ES imports in the browser) ----
const { useState, useEffect, useRef, useMemo } = React;

// ---- Inline icon set (replaces lucide-react so there's no external icon dependency) ----
// Each is a small SVG that accepts size/className/strokeWidth-ish props like lucide did.
function __mkIcon(paths) {
  return function (props) {
    props = props || {};
    const size = props.size || 20;
    return React.createElement("svg", {
      width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: "currentColor", strokeWidth: props.strokeWidth || 2,
      strokeLinecap: "round", strokeLinejoin: "round",
      className: props.className || "", style: props.style || null,
    }, paths.map((d, i) => React.createElement("path", { key: i, d: d })));
  };
}
// minimal but recognizable glyphs
const Sparkles = __mkIcon(["M12 3l1.9 4.8L18 9.5l-4.1 1.7L12 16l-1.9-4.8L6 9.5l4.1-1.7z"]);
const Briefcase = __mkIcon(["M3 7h18v13H3z","M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]);
const Users = __mkIcon(["M16 18v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2","M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6","M22 18v-2a4 4 0 0 0-3-3.8"]);
const User = __mkIcon(["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"]);
const ClipboardList = __mkIcon(["M9 3h6v3H9z","M5 6h14v15H5z","M9 11h6","M9 15h6"]);
const Camera = __mkIcon(["M23 19V8h-4l-2-3H9L7 8H3v11z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8"]);
const ChevronLeft = __mkIcon(["M15 18l-6-6 6-6"]);
const RefreshCw = __mkIcon(["M21 12a9 9 0 1 1-3-6.7L21 8","M21 3v5h-5"]);
const MessageCircle = __mkIcon(["M21 11.5a8.5 8.5 0 0 1-12 7.7L3 21l1.8-6A8.5 8.5 0 1 1 21 11.5z"]);
const Star = __mkIcon(["M12 3l2.9 6 6.6 .9-4.8 4.6 1.2 6.5L12 18.5 6.1 21l1.2-6.5L2.5 9.9 9 9z"]);
const Send = __mkIcon(["M22 2L11 13","M22 2l-7 20-4-9-9-4z"]);
const X = __mkIcon(["M18 6L6 18","M6 6l12 12"]);
const Check = __mkIcon(["M20 6L9 17l-5-5"]);
const PartyPopper = __mkIcon(["M5 19l5-13 8 8z","M14 6l1-2","M18 10l2-1","M16 14l2 1"]);
const ArrowLeftRight = __mkIcon(["M8 3L4 7l4 4","M4 7h16","M16 21l4-4-4-4","M20 17H4"]);
const Share = __mkIcon(["M4 12v8h16v-8","M16 6l-4-4-4 4","M12 2v14"]);
const MessageSquare = __mkIcon(["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"]);
const Trash2 = __mkIcon(["M3 6h18","M8 6V4h8v2","M19 6l-1 14H6L5 6","M10 11v6","M14 11v6"]);
const Pencil = __mkIcon(["M12 20h9","M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"]);
const ListChecks = __mkIcon(["M11 6h10","M11 12h10","M11 18h10","M3 6l1.5 1.5L7 5","M3 18l1.5 1.5L7 17"]);
const AlertTriangle = __mkIcon(["M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z","M12 9v4","M12 17h.01"]);
const Bell = __mkIcon(["M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9","M13.7 21a2 2 0 0 1-3.4 0"]);
const Calculator = __mkIcon(["M4 2h16v20H4z","M8 6h8","M8 10h2","M12 10h2","M16 10h0","M8 14h2","M12 14h2","M16 14h2","M8 18h6"]);
const Plus = __mkIcon(["M12 5v14","M5 12h14"]);


/* ============================================================
   CAZBID MARKETPLACE v3
   Same data as v2 (keys unchanged - existing profiles/jobs/chats
   survive). New: iOS-style bottom tab nav, SaaS dashboard styling,
   reviews-about-you, autosaved drafts, celebration confetti,
   large photo dropzones.
   ============================================================ */

const JOB_INDEX = "cazbid-job-index-v2";
const JOB_KEY = (id) => "cazbid-job2-" + id;
const USER_INDEX = "cazbid-user-index-v2";
const USER_KEY = (uid) => "cazbid-user2-" + uid;
const CHAT_KEY = (jobId) => "cazbid-chat2-" + jobId;
const POST_KEY = (uid, pid) => "cazbid-post2-" + uid + "-" + pid;
const ME_KEY = "cazbid-me-v2";
const ARCHIVE_KEY = "cazbid-archive-v2";
const SEED_KEY = "cazbid-seed-v2";
const PRICELIB_KEY = "cazbid-pricelib-v1";
const COSTCACHE_KEY = "cazbid-costcache-v1";
const MATCOST_KEY = "cazbid-matcosts-v1";
const PRICEBOOK_KEY = "cazbid-pricebook-v1";
const RATEBOOK_KEY = "cazbid-ratebook-v1";
const ENGINE_PB_KEY = "cazbid-engine-pricebook-v1"; // trade-organized price book for the deterministic engine
const AI_TRADES_KEY = "cazbid-ai-trades-v1"; // contractor's AI-built trade definitions (Feature A; flagged until calibrated)
const CALIB_KEY = "cazbid-calibration-v1"; // per-trade job-cost calibration (Feature B): logged actuals + labor factor
const ESTIMATES_KEY = "cazbid-estimates-v1"; // saved-estimates library (build-set #3, Phase 1 local)
const STANDING_RULES_KEY = "cazbid-standing-rules-v1"; // STANDING RULES ("Tell AL") — contractor-authored knowledge injected into every estimate; rules > manual > model
const RULES_CHAR_BUDGET = 5000;
// Rule scopes must be keys manualTradeKey can PRODUCE — a rule scoped to a key that never routes
// (trim/drywall/other) would be accepted but never injected. Drywall/trim jobs route to "interior".
const SR_SCOPES = ["roofing", "siding", "framing", "concrete", "decks", "insulation", "interior", "flooring", "cabinetry", "electrical", "hvac", "plumbing"]; // cap on total ACTIVE rule text — near it, merge/retire, never silently truncate
const COSTJOBS_KEY = "cazbid-costjobs-v1"; // JOB COST TRACKING — contractor jobs independent of estimates (actuals: receipts + hours)
const CJ_DISMISSED_KEY = "cazbid-costjobs-dismissed-v1"; // estimate ids whose auto-created cost job was deliberately deleted (tombstones — never resurrect)
const PERSONA_KEY = "cazbid-persona-v1"; // selected assistant persona (name + voiceId + avatar)
const PERSONA_SPEED_KEY = "cazbid-persona-speeds-v1"; // per-persona TTS speed { name: 0.7..1.2 }
// Assistant PERSONAS — name + ElevenLabs voiceId + avatar (blank for now → initials fallback).
// AL is the DEFAULT + home base; others are alternates. Voice IDs are not secret.
const PERSONAS = [
  { name: "AL", voiceId: "NNl6r8mD7vthiJatiJt1", avatar: "", sex: "m", note: "default" },
  { name: "Bill", voiceId: "pqHfZKP75CvOlQylNhV4", avatar: "", sex: "m" },
  { name: "Adam", voiceId: "pNInz6obpgDQGcFmaJgB", avatar: "", sex: "m" },
  { name: "Adam 2", voiceId: "IRHApOXLvnW57QJPQH2P", avatar: "", sex: "m" },
  { name: "Daniel", voiceId: "onwK4e9ZLuTAKqWW03F9", avatar: "", sex: "m" },
  { name: "Brian", voiceId: "nPczCjzI2devNBz1zQrb", avatar: "", sex: "m" },
  { name: "Brittney", voiceId: "iNwc1Lv2YQLywnCvjfn1", avatar: "", sex: "f" },
  { name: "Luna", voiceId: "6rOxfAnZpbM3VIEhFaeV", avatar: "", sex: "f" },
  { name: "Bella", voiceId: "hpp4J3VqNfWAUOO0d1Us", avatar: "", sex: "f" },
  { name: "Jessica", voiceId: "cgSgspJ2msm6clMCkdW9", avatar: "", sex: "f" },
];
// Owens Corning Duration shingle line (homeowner color selector). hex ≈ for the swatch;
// confirm the live list against OC's current Duration colors when productizing.
const OC_DURATION_COLORS = [
  { name: "Desert Rose", hex: "#9c6b5a" }, { name: "Midnight Plum", hex: "#3a2f3a" }, { name: "Peppercorn", hex: "#5b5b57" },
  { name: "Sand Castle", hex: "#cbb48f" }, { name: "Williamsburg Gray", hex: "#8a8f8a" }, { name: "Brownwood", hex: "#6e5742" },
  { name: "Chateau Green", hex: "#4f5f4d" }, { name: "Colonial Slate", hex: "#6a6e73" }, { name: "Driftwood", hex: "#9a8b73" },
  { name: "Estate Gray", hex: "#5a5e62" }, { name: "Harbor Blue", hex: "#4a5a66" }, { name: "Onyx Black", hex: "#2b2b2d" },
  { name: "Sierra Gray", hex: "#7c7b76" }, { name: "Slatestone Gray", hex: "#5f6266" }, { name: "Teak", hex: "#7b5e3b" },
  { name: "Terra Cotta", hex: "#9c5a44" },
];
const personaByName = (n) => PERSONAS.find((p) => p.name === n) || PERSONAS[0];
const personaInitials = (n) => String(n || "AL").trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// Kynar (PVDF) — standing-seam / architectural metal. SMP — exposed-fastener AG panels.
// CertainTeed — siding. (hex ≈ for the swatch; confirm the live lines when productizing.)
const KYNAR_COLORS = [
  { name: "Regal White", hex: "#f2f0e9" }, { name: "Sandstone", hex: "#d8c9a3" }, { name: "Sierra Tan", hex: "#b89c74" },
  { name: "Ash Gray", hex: "#b6b8b5" }, { name: "Slate Gray", hex: "#6f7479" }, { name: "Charcoal Gray", hex: "#44474a" },
  { name: "Matte Black", hex: "#2a2a2c" }, { name: "Hartford Green", hex: "#2f4a3a" }, { name: "Colonial Red", hex: "#7c2b25" },
  { name: "Burgundy", hex: "#5a2230" }, { name: "Medium Bronze", hex: "#5a4a39" }, { name: "Dark Bronze", hex: "#3a3128" },
  { name: "Mansard Brown", hex: "#4a3b30" }, { name: "Patina Green", hex: "#5e7d6e" }, { name: "Copper Metallic", hex: "#8a5a3b" },
  { name: "Regal Blue", hex: "#2c3e57" },
];
const SMP_COLORS = [
  { name: "Polar White", hex: "#f4f4f0" }, { name: "Light Stone", hex: "#d9d2c0" }, { name: "Tan", hex: "#c9b48f" },
  { name: "Clay", hex: "#b79b6e" }, { name: "Burnished Slate", hex: "#5a4636" }, { name: "Brown", hex: "#4b3a2b" },
  { name: "Charcoal", hex: "#45484b" }, { name: "Black", hex: "#262627" }, { name: "Gray", hex: "#8a8d8f" },
  { name: "Hunter Green", hex: "#2e4636" }, { name: "Evergreen", hex: "#283a2e" }, { name: "Rustic Red", hex: "#7a2f28" },
  { name: "Barn Red", hex: "#6e231f" }, { name: "Ocean Blue", hex: "#2f4f6e" }, { name: "Gallery Blue", hex: "#3a5a78" },
  { name: "Copper Penny", hex: "#9a5a36" },
];
const CERTAINTEED_COLORS = [
  { name: "Snow White", hex: "#f3f3ef" }, { name: "Heritage Cream", hex: "#e6dcc2" }, { name: "Sterling Gray", hex: "#9ea3a4" },
  { name: "Sandstone Beige", hex: "#cbb89a" }, { name: "Natural Clay", hex: "#cdbfa6" }, { name: "Savannah Wicker", hex: "#c2a878" },
  { name: "Autumn Red", hex: "#7c3a32" }, { name: "Forest", hex: "#2f4636" }, { name: "Sage", hex: "#8a9a82" },
  { name: "Charcoal", hex: "#44474a" }, { name: "Granite Gray", hex: "#6f7377" }, { name: "Mountain Cedar", hex: "#6e5640" },
  { name: "Coastal Blue", hex: "#4a6275" }, { name: "Pacific Blue", hex: "#34566e" }, { name: "Espresso", hex: "#3b2f28" },
  { name: "Flagstone", hex: "#5a5f63" },
];
// Shingle color lines BY BRAND (so colors follow the tier's actual manufacturer).
const GAF_HDZ_COLORS = [
  { name: "Charcoal", hex: "#3b3d40" }, { name: "Pewter Gray", hex: "#6f7378" }, { name: "Weathered Wood", hex: "#7a6a52" },
  { name: "Barkwood", hex: "#5b4a39" }, { name: "Shakewood", hex: "#a98f6b" }, { name: "Slate", hex: "#5a5f64" },
  { name: "Birchwood", hex: "#b9a781" }, { name: "Hickory", hex: "#8a7152" }, { name: "Hunter Green", hex: "#2e4636" },
  { name: "Patriot Red", hex: "#6e2b27" }, { name: "Williamsburg Slate", hex: "#54585d" }, { name: "Mission Brown", hex: "#4b382a" },
  { name: "Golden Amber", hex: "#9a7240" }, { name: "Biscayne Blue", hex: "#34526a" }, { name: "Oyster Gray", hex: "#9a9890" },
  { name: "Appalachian Sky", hex: "#6b7a86" },
];
const CT_LANDMARK_COLORS = [
  { name: "Moire Black", hex: "#2c2d2f" }, { name: "Charcoal Black", hex: "#3a3c3f" }, { name: "Georgetown Gray", hex: "#6e7176" },
  { name: "Pewter", hex: "#8a8d90" }, { name: "Cobblestone Gray", hex: "#7c7e80" }, { name: "Weathered Wood", hex: "#7a6a52" },
  { name: "Heather Blend", hex: "#6a5d5a" }, { name: "Burnt Sienna", hex: "#7c3f2c" }, { name: "Resawn Shake", hex: "#5a4a3b" },
  { name: "Driftwood", hex: "#9a8b73" }, { name: "Colonial Slate", hex: "#6a6e73" }, { name: "Hunter Green", hex: "#2e4636" },
  { name: "Granite Gray", hex: "#6f7377" }, { name: "Silver Birch", hex: "#b3ac9c" }, { name: "Sunrise Cedar", hex: "#8a5a3b" },
  { name: "Atlantic Blue", hex: "#34526a" },
];
// Composite (synthetic) and natural-slate color lines.
const COMPOSITE_COLORS = [
  { name: "Slate Gray", hex: "#5a5f64" }, { name: "Smoke Gray", hex: "#7c7f82" }, { name: "Mountain", hex: "#6a6e6a" },
  { name: "Weathered Gray", hex: "#8a8a82" }, { name: "Aberdeen", hex: "#5e5a52" }, { name: "Brownstone", hex: "#6e5742" },
  { name: "Castle Gray", hex: "#676b6e" }, { name: "Tahoe", hex: "#4a5550" }, { name: "Vineyard", hex: "#5a4250" },
  { name: "Stonewood", hex: "#7a6a55" }, { name: "Charcoal Black", hex: "#33353a" }, { name: "Evergreen", hex: "#2e4636" },
  { name: "Mulberry", hex: "#5a2f3a" }, { name: "Bark", hex: "#4b3a2b" }, { name: "Sterling", hex: "#9a9d9f" }, { name: "Driftwood", hex: "#9a8b73" },
];
const SLATE_COLORS = [
  { name: "Unfading Black", hex: "#2b2c2e" }, { name: "Gray-Black", hex: "#3c3e41" }, { name: "Unfading Gray", hex: "#6f7377" },
  { name: "Weathering Gray-Green", hex: "#6a7068" }, { name: "Vermont Green (unfading)", hex: "#3c4a3a" }, { name: "Sea Green", hex: "#5e6e5c" },
  { name: "Unfading Purple", hex: "#4a3f4f" }, { name: "Mottled Purple/Green", hex: "#4e4a48" }, { name: "Vermont Red", hex: "#6e2f28" },
  { name: "Semi-Weathering Gray", hex: "#7c7e80" }, { name: "Buckingham Black", hex: "#2f3033" }, { name: "Spanish Gray", hex: "#73767a" },
  { name: "Strata Gray", hex: "#5f6266" }, { name: "China Black", hex: "#2a2b2d" }, { name: "Mottled Gray/Black", hex: "#4a4c4f" }, { name: "Monson Black", hex: "#303234" },
];
// Color line from the chosen PRODUCT name (tier's brand), falling back to material type.
function colorLineForProduct(name, tradeKey, mat) {
  const s = (String(name || "") + " " + String(mat || "")).toLowerCase();
  if (tradeKey === "roofing") {
    if (/ag panel|ag-panel|corrugated|exposed.?fastener|panel rib|rib panel|ribbed|r-?panel\b|u-?panel\b|\bsmp\b/.test(s)) return { key: "smp", label: "SMP — AG panel colors", colors: SMP_COLORS };
    if (/standing.?seam|snap.?lock|\blok\b|nu-?lok|kynar|pvdf|metal|steel/.test(s)) return { key: "kynar", label: "Kynar — metal colors", colors: KYNAR_COLORS };
    if (/tpo|epdm|flat|membrane/.test(s)) return null;
    if (/composite|synthetic|davinci|brava|ecostar|inspire|symphony/.test(s)) return { key: "composite", label: "Composite colors", colors: COMPOSITE_COLORS };
    if (/slate/.test(s)) return { key: "slate", label: "Slate colors", colors: SLATE_COLORS };
    if (/\bgaf\b|timberline|\bhdz\b|grand sequoia|camelot/.test(s)) return { key: "gaf", label: "GAF Timberline colors", colors: GAF_HDZ_COLORS };
    if (/certainteed|landmark|grand manor|presidential/.test(s)) return { key: "ct", label: "CertainTeed Landmark colors", colors: CT_LANDMARK_COLORS };
    return { key: "duration", label: "Owens Corning Duration colors", colors: OC_DURATION_COLORS };
  }
  return colorLineFor(tradeKey, mat);
}
// Curated Good/Better/Best product options the contractor can preset in Profile, BY CATEGORY
// (shingle vs standing seam are both roofing but different lines, so they're separate).
const TIER_OPTIONS = {
  shingle: {
    good: ["GAF Timberline HDZ", "Owens Corning Oakridge", "CertainTeed Landmark", "Atlas Pinnacle Pristine", "IKO Cambridge"],
    better: ["Owens Corning Duration", "CertainTeed Landmark PRO", "GAF Timberline HDZ (upgraded)", "Atlas StormMaster Shake", "Malarkey Highlander"],
    best: ["GAF Grand Sequoia / Camelot II", "Owens Corning Berkshire", "CertainTeed Grand Manor / Presidential", "DaVinci composite slate", "Brava composite"],
  },
  standingseam: {
    good: ["26ga SMP snap-lock", "ABC SL-16 (SMP)", "McElroy Meridian (SMP)"],
    better: ["24ga Kynar snap-lock", "Englert S1000 (Kynar)", "Drexel snap-lock (Kynar)"],
    best: ["24ga Kynar mechanical-lock", "Sheffield / Drexel mech-lock", "Heavy-gauge w/ striations (Kynar)"],
  },
  siding: {
    good: ["CertainTeed MainStreet vinyl", "Mastic Ovation vinyl", "LP SmartSide lap"],
    better: ["CertainTeed Monogram vinyl", "James Hardie HardiePlank", "Royal Estate vinyl"],
    best: ["James Hardie Artisan", "CertainTeed Cedar Impressions", "Everlast composite"],
  },
  windows: {
    good: ["Vinyl double-hung (builder)", "Silver Line 2900", "MI V3000"],
    better: ["Andersen 100/200", "Pella 250", "Simonton 5500"],
    best: ["Andersen 400 Series", "Pella Lifestyle / Reserve", "Marvin Elevate"],
  },
  composite: {
    good: ["EcoStar Majestic Slate", "CertainTeed Symphony", "Brava Cedar Shake"],
    better: ["DaVinci Single-Width Slate", "Brava Slate", "DaVinci Shake"],
    best: ["DaVinci Multi-Width Slate", "DaVinci Bellaforté Slate", "Inspire Composite Slate"],
  },
  slate: {
    good: ["Greenstone semi-weathering gray", "North Country black", "Vermont gray/black (S1)"],
    better: ["Vermont unfading gray", "Buckingham Virginia slate", "Vermont unfading green"],
    best: ["Vermont unfading purple / mottled", "Spanish premium slate", "Monson Maine slate"],
  },
  decking: {
    good: ["PT pine 5/4", "Pressure-treated SYP", "Cedar decking"],
    better: ["Trex Enhance", "TimberTech PRO", "Fiberon Good Life"],
    best: ["Trex Transcend", "TimberTech AZEK", "Fiberon Concordia"],
  },
  flooringtile: {
    good: ["Ceramic tile (builder)", "Porcelain 12x24", "MSI ceramic"],
    better: ["Porcelain wood-look plank", "Daltile porcelain", "Marazzi porcelain"],
    best: ["Large-format porcelain", "Natural stone (travertine/marble)", "Porcelain slab"],
  },
  flooringlvp: {
    good: ["LVP 12mil (builder)", "COREtec One", "NuCore"],
    better: ["LVP 20mil rigid core", "COREtec Pro Plus", "Engineered hardwood 3/8"],
    best: ["LVP 28mil / SPC premium", "Solid hardwood 3/4 oak", "Engineered wide-plank 5/8"],
  },
};
const TIER_CATS = [{ key: "shingle", label: "Shingles" }, { key: "standingseam", label: "Standing seam" }, { key: "composite", label: "Composite" }, { key: "slate", label: "Slate" }, { key: "siding", label: "Siding" }, { key: "windows", label: "Windows" }, { key: "decking", label: "Decking" }, { key: "flooringtile", label: "Tile floor" }, { key: "flooringlvp", label: "LVP / wood" }];
// Which tier-pref category a trade+material falls in (null = no presets for it).
function tierPrefCategory(tradeKey, sys) {
  if (tradeKey === "roofing") {
    const s = (sys || "").toLowerCase();
    if (/composite|synthetic|davinci|brava|ecostar|inspire|symphony/.test(s)) return "composite";
    if (/slate/.test(s)) return "slate";
    const t = roofTypeOf(sys || "");
    return t === "metal" ? "standingseam" : (t === "shingle" ? "shingle" : null);
  }
  if (tradeKey === "siding") return "siding";
  if (tradeKey === "windows") return "windows";
  if (tradeKey === "deck") return "decking";
  if (tradeKey === "flooring") { const s = (sys || "").toLowerCase(); return /tile|porcelain|ceramic|stone/.test(s) ? "flooringtile" : "flooringlvp"; }
  return null;
}
// Which color line a trade+material uses (null = no color selector for this trade).
function colorLineFor(tradeKey, mat) {
  const m = String(mat || "").toLowerCase();
  if (tradeKey === "roofing") {
    if (/ag panel|ag-panel|corrugated|exposed.?fastener|panel rib|rib panel|ribbed|r-?panel\b|u-?panel\b/.test(m)) return { key: "smp", label: "SMP — AG panel colors", colors: SMP_COLORS };
    if (/standing.?seam|snap.?lock|\blok\b|nu-?lok|kynar|pvdf/.test(m)) return { key: "kynar", label: "Kynar — standing-seam colors", colors: KYNAR_COLORS };
    if (/tpo|epdm|flat|membrane/.test(m)) return null;
    if (/metal|steel|panel/.test(m)) return { key: "kynar", label: "Kynar — metal roof colors", colors: KYNAR_COLORS };
    return { key: "duration", label: "Owens Corning Duration — shingle colors", colors: OC_DURATION_COLORS };
  }
  if (tradeKey === "siding") return { key: "certainteed", label: "CertainTeed — siding colors", colors: CERTAINTEED_COLORS };
  return null;
}
const SEED_PRICES = [
  { id: "pb_acm_aluminum_roll_valley_flashing", cat: "Sloped roof", name: "ACM Aluminum Roll Valley Flashing", unit: "roll", price: 56.5 },
  { id: "pb_rms_kynar_sheet_24g", cat: "Flat / low slope", name: "24G Fabral Kynar 4x10 Sheet — custom fab included (Roof Metals Supply)", unit: "sheet", price: 155.5 },
  { id: "pb_rms_cap_95", cat: "Flat / low slope", name: "24G Kynar Custom Cap Metal 9.5in cut, 10ft pcs (Roof Metals Supply)", unit: "LF", price: 3.11 },
  { id: "pb_rms_locker", cat: "Flat / low slope", name: "24G Galvanized Continuous Locker 10ft (Roof Metals Supply)", unit: "LF", price: 1.79 },
  { id: "pb_rms_underplate", cat: "Flat / low slope", name: "Underplate — cap seam (Roof Metals Supply)", unit: "ea", price: 4.75 },
  { id: "pb_membrane_pipe_boot", cat: "Flat / low slope", name: "Pre-molded Membrane Pipe Boot (QuickSeam EPDM / weldable TPO)", unit: "ea", price: 34.0 },
  { id: "pb_american_flash_kickout_with_j_chan", cat: "Sloped roof", name: "American Flash Kickout with J-Channel", unit: "ea", price: 16.0 },
  { id: "pb_atlas_roofing_pinnacle_pristine_ar", cat: "Sloped roof", name: "Atlas Roofing Pinnacle Pristine Architectural Shingles", unit: "sq", price: 127.99 },
  { id: "pb_atlas_roofing_pro_cut_hp42_starter", cat: "Sloped roof", name: "Atlas Roofing Pro-Cut HP42 Starter Shingles", unit: "bndl", price: 77.2 },
  { id: "pb_caliber_metals_rake_edge", cat: "Sloped roof", name: "Caliber Metals Rake Edge", unit: "LF", price: 2.4 },
  { id: "pb_certainteed_cedar_crest_hip_ridge_", cat: "Sloped roof", name: "CertainTeed Cedar Crest Hip & Ridge Shingles", unit: "LF", price: 4.53 },
  { id: "pb_certainteed_grand_manor_architectu", cat: "Sloped roof", name: "CertainTeed Grand Manor Architectural Shingles", unit: "sq", price: 319.95 },
  { id: "pb_certainteed_landmark_pro_architect", cat: "Sloped roof", name: "CertainTeed Landmark Pro Architectural Shingles", unit: "sq", price: 147.75 },
  { id: "pb_certainteed_roofrunner_synthetic_u", cat: "Sloped roof", name: "CertainTeed RoofRunner Synthetic Underlayment", unit: "sq", price: 13.88 },
  { id: "pb_certainteed_swiftstart_starter_shi", cat: "Sloped roof", name: "CertainTeed Swiftstart Starter Shingles", unit: "bndl", price: 78.3 },
  { id: "pb_gaf_master_flow_erv5ht_power_attic", cat: "Sloped roof", name: "GAF Master Flow ERV5HT Power Attic Vent", unit: "pc", price: 242.5 },
  { id: "pb_gaf_master_flow_erv6_power_attic_v", cat: "Sloped roof", name: "GAF Master Flow ERV6 Power Attic Vent", unit: "ea", price: 214.0 },
  { id: "pb_gaf_master_flow_ir_65_slant_back_v", cat: "Sloped roof", name: "GAF Master Flow IR-65 Slant Back Vent", unit: "ea", price: 18.99 },
  { id: "pb_generic_staples", cat: "Sloped roof", name: "Generic Staples", unit: "box", price: 11.99 },
  { id: "pb_geocel_2300_construction_tripolyme", cat: "Sloped roof", name: "Geocel 2300 Construction Tripolymer Sealant", unit: "ea", price: 10.33 },
  { id: "pb_griprite_ht_ice_and_water_shield_2", cat: "Sloped roof", name: "GripRite HT Ice and Water Shield 2sq Roll", unit: "roll", price: 129.47 },
  { id: "pb_ips_aluminum_multi_size_4n1_pipe_f", cat: "Sloped roof", name: "IPS Aluminum Multi-Size 4N1 Pipe Flashing", unit: "ea", price: 14.0 },
  { id: "pb_lifetime_tool_pipe_flashing_200_ul", cat: "Sloped roof", name: "Lifetime Tool Pipe Flashing 200 Ultimate", unit: "pc", price: 51.6 },
  { id: "pb_lifetime_tool_pipe_flashing_300_ul", cat: "Sloped roof", name: "Lifetime Tool Pipe Flashing 300 Ultimate", unit: "pc", price: 59.35 },
  { id: "pb_lifetime_tool_pipe_flashing_400_ul", cat: "Sloped roof", name: "Lifetime Tool Pipe Flashing 400 Ultimate", unit: "pc", price: 59.35 },
  { id: "pb_lifetime_tool_pipe_flashing_easysl_2", cat: "Sloped roof", name: "Lifetime Tool Pipe Flashing EasySleeve ES 300", unit: "pc", price: 29.85 },
  { id: "pb_lifetime_tool_pipe_flashing_easysl", cat: "Sloped roof", name: "Lifetime Tool Pipe Flashing EasySleeve ES200", unit: "pc", price: 25.2 },
  { id: "pb_lifetime_tool_pipe_flashing_easysl_3", cat: "Sloped roof", name: "Lifetime Tool Pipe Flashing EasySleeve ES400", unit: "pc", price: 34.65 },
  { id: "pb_lomanco_bath_pro_brv34", cat: "Sloped roof", name: "Lomanco Bath PRO BRV34", unit: "ea", price: 43.5 },
  { id: "pb_lomanco_lor30_lo_omniroll_ridge_ve", cat: "Sloped roof", name: "Lomanco LOR30 Lo-OmniRoll Ridge Vent", unit: "LF", price: 4.1 },
  { id: "pb_marco_roof_boot_electrical_service", cat: "Sloped roof", name: "Marco Roof Boot Electrical Service Mast Flashing", unit: "ea", price: 64.05 },
  { id: "pb_national_nail_coil_nails", cat: "Sloped roof", name: "National Nail Coil Nails", unit: "box", price: 83.99 },
  { id: "pb_national_nail_pro_fit_electro_galv", cat: "Sloped roof", name: "National Nail Pro-Fit Electro Galvanized Roofing Nails Ring Shank", unit: "box", price: 68.5 },
  { id: "pb_omg_masonry_fasteners", cat: "Sloped roof", name: "OMG Masonry Fasteners", unit: "box", price: 33.89 },
  { id: "pb_osi_quad_max_window_door_siding_se", cat: "Sloped roof", name: "OSI Quad Max Window, Door & Siding Sealant", unit: "tube", price: 10.59 },
  { id: "pb_owens_corning_proarmor_synthetic_u", cat: "Sloped roof", name: "Owens Corning ProArmor Synthetic Underlayment", unit: "sq", price: 12.18 },
  { id: "pb_owens_corning_proedge_hip_ridge_sh", cat: "Sloped roof", name: "Owens Corning ProEdge Hip & Ridge Shingles", unit: "LF", price: 2.68 },
  { id: "pb_owens_corning_rhinoroof_granulated", cat: "Sloped roof", name: "Owens Corning RhinoRoof Granulated SA Underlayment", unit: "roll", price: 94.25 },
  { id: "pb_owens_corning_rhinoroof_u20_synthe", cat: "Sloped roof", name: "Owens Corning RhinoRoof U20 Synthetic Underlayment", unit: "sq", price: 7.35 },
  { id: "pb_owens_corning_starter_strip_plus_s", cat: "Sloped roof", name: "Owens Corning Starter Strip Plus Shingle", unit: "sq", price: 51.7 },
  { id: "pb_owens_corning_trudefinition_durati", cat: "Sloped roof", name: "Owens Corning TruDefinition Duration Architectural Shingles", unit: "sq", price: 129.0 },
  { id: "pb_owens_corning_trudefinition_durati_2", cat: "Sloped roof", name: "Owens Corning TruDefinition Duration Designer Architectural Shingles", unit: "sq", price: 135.0 },
  { id: "pb_owens_corning_weatherlock_g_ice_wa", cat: "Sloped roof", name: "Owens Corning WeatherLock G Ice & Water Synthetic Underlayment", unit: "roll", price: 146.25 },
  { id: "pb_owens_corning_weatherlock_mat_self", cat: "Sloped roof", name: "Owens Corning WeatherLock Mat Self-Sealing Waterproofing Barrier", unit: "LF", price: 1.86 },
  { id: "pb_velux_edl_flashing_kit", cat: "Sloped roof", name: "Velux EDL Flashing Kit", unit: "ea", price: 120.0 },
  { id: "pb_velux_edw_c06_0000a_step_flashing", cat: "Sloped roof", name: "Velux Edw-C06-0000A Step Flashing", unit: "ea", price: 227.0 },
  { id: "pb_velux_fs_deck_mounted_skylight", cat: "Sloped roof", name: "Velux FS Deck Mounted Skylight", unit: "ea", price: 604.0 },
  { id: "pb_4_pipe_boot_3_5", cat: "Standing seam", name: "#4 Pipe Boot 3\"-5\"", unit: "ea", price: 14.46 },
  { id: "pb_1_pan_head_screw_250_ct_bag", cat: "Standing seam", name: "1\" Pan Head Screw (250 ct bag)", unit: "bag", price: 11.5 },
  { id: "pb_1_5_standing_seam_clip", cat: "Standing seam", name: "1.5 Standing Seam Clip", unit: "ea", price: 0.47 },
  { id: "pb_24g_kynar_a1500_snap_lock_panel_16", cat: "Standing seam", name: "24G Kynar A1500 Snap Lock Panel 16\" 24ga (1-1/2\" snap lock)", unit: "LF", price: 4.43 },
  { id: "pb_24g_kynar_drip_edge", cat: "Standing seam", name: "24G Kynar Drip Edge", unit: "pc", price: 25.86 },
  { id: "pb_24g_kynar_endwall_side", cat: "Standing seam", name: "24G Kynar Endwall/Side", unit: "pc", price: 23.32 },
  { id: "pb_24g_kynar_headwall", cat: "Standing seam", name: "24G Kynar Headwall", unit: "pc", price: 23.32 },
  { id: "pb_24g_kynar_hip_and_ridge", cat: "Standing seam", name: "24G Kynar Hip and Ridge", unit: "pc", price: 36.71 },
  { id: "pb_24g_kynar_offset_cleat", cat: "Standing seam", name: "24G Kynar Offset Cleat", unit: "pc", price: 11.2 },
  { id: "pb_24g_kynar_transition", cat: "Standing seam", name: "24G Kynar Transition", unit: "pc", price: 32.78 },
  { id: "pb_24g_kynar_valley", cat: "Standing seam", name: "24G Kynar Valley", unit: "pc", price: 41.87 },
  { id: "pb_24g_kynar_z_closure_solid", cat: "Standing seam", name: "24G Kynar Z-Closure Solid", unit: "pc", price: 12.06 },
  { id: "pb_26g_pre_cut_vented_z", cat: "Standing seam", name: "26G Pre Cut Vented Z", unit: "pc", price: 6.87 },
  { id: "pb_butyl_tape_3_4_x_3_32_x_50_roll", cat: "Standing seam", name: "Butyl Tape 3/4\" x 3/32\" x 50' Roll", unit: "roll", price: 8.31 },
  { id: "pb_copper_sheet_2_x_8_16_oz", cat: "Standing seam", name: "Copper Sheet 2' X 8' 16 OZ", unit: "sht", price: 135.4 },
  { id: "pb_copper_sheet_3_x_10_16_oz", cat: "Standing seam", name: "Copper Sheet 3' X 10' 16 OZ", unit: "sht", price: 253.8 },
  { id: "pb_pop_rivets_44_colored_ss_100_ct_ba", cat: "Standing seam", name: "Pop Rivets #44 Colored SS (100 ct bag)", unit: "bag", price: 9.5 },
  { id: "pb_pre_bent_back_flashing_26ga_black_", cat: "Standing seam", name: "Pre Bent Back Flashing 26ga Black 10'", unit: "pc", price: 22.25 },
  { id: "pb_abc_roof_paint", cat: "Flat roof", name: "ABC Roof Paint", unit: "can", price: 6.89 },
  { id: "pb_elevate_045_tpo_membrane", cat: "Flat roof", name: "Elevate 045 TPO Membrane", unit: "roll", price: 833.0 },
  { id: "pb_elevate_060_epdm_max_membrane", cat: "Flat roof", name: "Elevate 060 EPDM Max Membrane", unit: "roll", price: 1433.05 },
  { id: "pb_elevate_060_epdm_membrane", cat: "Flat roof", name: "Elevate 060 EPDM Membrane", unit: "roll", price: 2061.7 },
  { id: "pb_elevate_060_epdm_rubbergard_membra", cat: "Flat roof", name: "Elevate 060 EPDM RubberGard Membrane Self-Adhered", unit: "roll", price: 2068.4 },
  { id: "pb_elevate_1_part_pourable_sealer", cat: "Flat roof", name: "Elevate 1-Part Pourable Sealer", unit: "ea", price: 58.0 },
  { id: "pb_elevate_all_purpose_fasteners", cat: "Flat roof", name: "Elevate All-Purpose Fasteners", unit: "box", price: 299.99 },
  { id: "pb_elevate_batten_bar", cat: "Flat roof", name: "Elevate Batten Bar", unit: "ea", price: 10.0 },
  { id: "pb_elevate_insulation_fastening_plate", cat: "Flat roof", name: "Elevate Insulation Fastening Plate", unit: "box", price: 285.99 },
  { id: "pb_elevate_isogard_hd_roof_board", cat: "Flat roof", name: "Elevate Isogard HD Roof Board", unit: "sht", price: 34.5 },
  { id: "pb_elevate_lap_sealant_hs", cat: "Flat roof", name: "Elevate Lap Sealant HS", unit: "tube", price: 13.5 },
  { id: "pb_elevate_perimeter_fastening_strip_", cat: "Flat roof", name: "Elevate Perimeter Fastening Strip Reinforced", unit: "roll", price: 273.0 },
  { id: "pb_elevate_polyiso_insulation_board_1", cat: "Flat roof", name: "Elevate Polyiso Insulation Board 1\"", unit: "sht", price: 30.0 },
  { id: "pb_elevate_quickprime_plus_lvoc", cat: "Flat roof", name: "Elevate QuickPrime Plus LVOC", unit: "gal", price: 129.0 },
  { id: "pb_elevate_quickscrubber_pad", cat: "Flat roof", name: "Elevate QuickScrubber Pad", unit: "box", price: 43.0 },
  { id: "pb_elevate_quickseam_batten_cover", cat: "Flat roof", name: "Elevate QuickSeam Batten Cover", unit: "roll", price: 431.5 },
  { id: "pb_elevate_quickseam_curb_flashing", cat: "Flat roof", name: "Elevate QuickSeam Curb Flashing", unit: "ea", price: 226.0 },
  { id: "pb_elevate_quickseam_epdm_pipe_flashi", cat: "Flat roof", name: "Elevate QuickSeam EPDM Pipe Flashing", unit: "pc", price: 59.0 },
  { id: "pb_elevate_quickseam_formflash_flashi", cat: "Flat roof", name: "Elevate QuickSeam FormFlash Flashing", unit: "roll", price: 448.5 },
  { id: "pb_elevate_quickseam_penetration_pock", cat: "Flat roof", name: "Elevate QuickSeam Penetration Pocket Kit", unit: "ea", price: 104.5 },
  { id: "pb_elevate_quickseam_self_adhered_fla", cat: "Flat roof", name: "Elevate QuickSeam Self Adhered Flashing", unit: "roll", price: 587.5 },
  { id: "pb_elevate_quickseam_splice_tape", cat: "Flat roof", name: "Elevate QuickSeam Splice Tape", unit: "roll", price: 144.0 },
  { id: "pb_elevate_s_20_water_block_seal", cat: "Flat roof", name: "Elevate S-20 Water-Block Seal", unit: "tube", price: 7.5 },
  { id: "pb_elevate_seam_plate", cat: "Flat roof", name: "Elevate Seam Plate", unit: "box", price: 353.99 },
  { id: "pb_elevate_single_ply_low_voc_bonding", cat: "Flat roof", name: "Elevate Single Ply Low-Voc Bonding Adhesive", unit: "drum", price: 281.5 },
  { id: "pb_elevate_single_ply_lvoc_primer", cat: "Flat roof", name: "Elevate Single-Ply LVOC Primer", unit: "can", price: 142.0 },
  { id: "pb_elevate_standalone_insulation_fast", cat: "Flat roof", name: "Elevate Standalone Insulation Fasteners", unit: "box", price: 248.99 },
  { id: "pb_elevate_termination_bar", cat: "Flat roof", name: "Elevate Termination Bar", unit: "ea", price: 17.5 },
  { id: "pb_elevate_ultraply_tpo_quickseam_fla", cat: "Flat roof", name: "Elevate UltraPly TPO QuickSeam Flashing", unit: "roll", price: 319.5 },
  { id: "pb_johns_manville_separator_cover_boa", cat: "Flat roof", name: "Johns Manville Separator Cover Board", unit: "sht", price: 12.0 },
  { id: "pb_marathon_balum3crp_aluminator_roof", cat: "Flat roof", name: "Marathon BALUM3CRP Aluminator Roof Drain", unit: "ea", price: 190.0 },
  { id: "pb_marathon_balum4crp_aluminator_roof", cat: "Flat roof", name: "Marathon BALUM4CRP Aluminator Roof Drain", unit: "ea", price: 322.5 },
  { id: "pb_marathon_balum6crp_aluminator_roof", cat: "Flat roof", name: "Marathon BALUM6CRP Aluminator Roof Drain", unit: "ea", price: 533.0 },
  { id: "pb_marathon_bff375eco_economy_retrofi", cat: "Flat roof", name: "Marathon BFF375ECO Economy Retrofit Roof Drain", unit: "ea", price: 98.69 },
  { id: "pb_mule_hide_modified_bitumen_base_sh", cat: "Flat roof", name: "Mule-Hide Modified Bitumen Base Sheet Self-Adhered", unit: "sq", price: 82.38 },
  { id: "pb_mule_hide_retrofit_drain", cat: "Flat roof", name: "Mule-Hide Retrofit Drain", unit: "ea", price: 217.0 },
  { id: "pb_mule_hide_sa_sbs_modified_bitumen_", cat: "Flat roof", name: "Mule-Hide SA-SBS Modified Bitumen Cap Sheet", unit: "sq", price: 128.0 },
  { id: "pb_mulehide_aluminator_retrofit_drain", cat: "Flat roof", name: "Mulehide Aluminator Retrofit Drain", unit: "ea", price: 318.5 },
  { id: "pb_mulehide_modified_bitumen_base_she", cat: "Flat roof", name: "Mulehide Modified Bitumen Base Sheet Self-Adhered", unit: "roll", price: 193.5 },
  { id: "pb_omg_hercules_retrodrain", cat: "Flat roof", name: "OMG Hercules RetroDrain", unit: "ea", price: 440.0 },
  { id: "pb_acm_aluminum_smooth_trim_coil", cat: "Exterior", name: "ACM Aluminum Smooth Trim Coil", unit: "roll", price: 132.5 },
  { id: "pb_acm_fascia_ribbed", cat: "Exterior", name: "ACM Fascia Ribbed", unit: "pc", price: 18.5 },
  { id: "pb_mastic_mvj051_j_channel", cat: "Exterior", name: "Mastic MVJ051 J Channel", unit: "ea", price: 7.85 },
  { id: "pb_mastic_vfr05_f_channel", cat: "Exterior", name: "Mastic VFR05 F Channel", unit: "pc", price: 22.25 },
  { id: "pb_norandex_builder_triple_4_x_12_per", cat: "Exterior", name: "Norandex Builder Triple 4\" x 12' Perforated Vinyl Soffit", unit: "sq", price: 110.5 },
  { id: "pb_norandex_builder_triple_4_x_12_sol", cat: "Exterior", name: "Norandex Builder Triple 4\" x 12' Solid Vinyl Soffit", unit: "sq", price: 110.5 },
  { id: "pb_norandex_double_5_x_12_premium_ful", cat: "Exterior", name: "Norandex Double 5\" x 12' Premium Full Vent Vinyl Soffit", unit: "pnl", price: 21.47 },
  { id: "pb_norandex_double_5_x_12_premium_sol", cat: "Exterior", name: "Norandex Double 5\" x 12' Premium Solid Vinyl Soffit", unit: "sq", price: 214.65 },
  { id: "pb_norandex_smooth_trim_coil", cat: "Exterior", name: "Norandex Smooth Trim Coil", unit: "roll", price: 132.5 },
  { id: "pb_2_x_4_x_16_pressure_treated", cat: "Framing & decks", name: "2\" X 4\" X 16' Pressure Treated", unit: "ea", price: 27.85 },
  { id: "pb_cdx_fire_rated_plywood_1_2_4_x_8", cat: "Framing & decks", name: "Cdx Fire Rated Plywood 1/2\" 4' X 8'", unit: "sht", price: 50.0 },
  { id: "pb_cdx_plywood_3_8_4_x_8_3_ply", cat: "Framing & decks", name: "Cdx Plywood 3/8\" 4' X 8' 3-Ply", unit: "sht", price: 23.8 },
  { id: "pb_gp_1_2_4_x_8_cdx_plywood", cat: "Framing & decks", name: "GP 1/2\" 4' X 8' Cdx Plywood", unit: "sht", price: 26.0 },
  { id: "pb_gp_1_2_4_x_8_cdx_plywood_alt_listi", cat: "Framing & decks", name: "GP 1/2\" 4' X 8' Cdx Plywood (alt listing)", unit: "sht", price: 35.75 },
  { id: "pb_generic_osb_sheathing", cat: "Framing & decks", name: "Generic OSB Sheathing", unit: "sht", price: 15.95 },
  { id: "pb_generic_plywood", cat: "Framing & decks", name: "Generic Plywood", unit: "sht", price: 43.95 },
  { id: "pb_generic_plywood_clips", cat: "Framing & decks", name: "Generic Plywood Clips", unit: "ea", price: 25.0 },
  { id: "pb_onsite_roll_off_dumpster", cat: "Other", name: "Onsite Roll Off (dumpster)", unit: "ea", price: 375.0 },
];
const SEED_RATES = [
  { id: "r_tearoff_shingle", cat: "Roofing — steep slope", task: "Tear-off — shingles (per layer)", unit: "sq", rate: 1.0 },
  { id: "r_shingle", cat: "Roofing — steep slope", task: "Shingle install (architectural, walkable)", unit: "sq", rate: 2.0 },
  { id: "r_steep_adder", cat: "Roofing — steep slope", task: "Steep-slope adder (10/12+)", unit: "sq", rate: 1.0 },
  { id: "r_underlayment", cat: "Roofing — steep slope", task: "Synthetic underlayment", unit: "sq", rate: 0.15 },
  { id: "r_iw", cat: "Roofing — steep slope", task: "Ice & water shield", unit: "sq", rate: 0.25 },
  { id: "r_dripedge", cat: "Roofing — steep slope", task: "Drip edge / perimeter metal", unit: "LF", rate: 0.02 },
  { id: "r_ridge", cat: "Roofing — steep slope", task: "Ridge vent & caps", unit: "LF", rate: 0.05 },
  { id: "r_ss_panel", cat: "Roofing — steep slope", task: "Standing seam panel install", unit: "sq", rate: 3.4 },
  { id: "r_ss_trim", cat: "Roofing — steep slope", task: "Standing seam trim / flashings", unit: "LF", rate: 0.08 },
  { id: "r_tearoff_flat", cat: "Roofing — flat / low slope", task: "Tear-off — BUR / EPDM (per layer)", unit: "sq", rate: 1.5 },
  { id: "r_iso", cat: "Roofing — flat / low slope", task: "ISO insulation install (per layer)", unit: "sq", rate: 0.5 },
  { id: "r_coverboard", cat: "Roofing — flat / low slope", task: "Coverboard install", unit: "sq", rate: 0.5 },
  { id: "r_epdm", cat: "Roofing — flat / low slope", task: "EPDM membrane (fully adhered)", unit: "sq", rate: 1.538 },
  { id: "r_tpo", cat: "Roofing — flat / low slope", task: "TPO mech-attached + welds", unit: "sq", rate: 1.176 },
  { id: "r_termbar", cat: "Roofing — flat / low slope", task: "Term bar / edge detail", unit: "LF", rate: 0.06 },
  { id: "r_parapet", cat: "Roofing — flat / low slope", task: "Parapet wrap / coping", unit: "LF", rate: 0.15 },
  { id: "r_pen", cat: "Roofing — flat / low slope", task: "Penetration flashing", unit: "ea", rate: 0.75 },
  { id: "r_wall_frame", cat: "Framing & decks", task: "Wall framing 2x4/2x6", unit: "sqft", rate: 0.08 },
  { id: "r_rafter", cat: "Framing & decks", task: "Rafter framing (stick-built)", unit: "sqft", rate: 0.12 },
  { id: "r_sheathing", cat: "Framing & decks", task: "Sheathing install", unit: "sqft", rate: 0.025 },
  { id: "r_deck_frame", cat: "Framing & decks", task: "Deck framing (PT joists/beams)", unit: "sqft", rate: 0.15 },
  { id: "r_decking", cat: "Framing & decks", task: "Composite decking install", unit: "sqft", rate: 0.1 },
  { id: "r_railing", cat: "Framing & decks", task: "Vinyl/composite railing", unit: "LF", rate: 0.4 },
  { id: "r_vinyl_siding", cat: "Exterior", task: "Vinyl siding install", unit: "sq", rate: 3.2 },
  { id: "r_ag_panel", cat: "Exterior", task: "AG panel siding/roofing", unit: "sq", rate: 2.0 },
  { id: "r_housewrap", cat: "Exterior", task: "Housewrap", unit: "sq", rate: 0.2 },
  { id: "r_soffit", cat: "Exterior", task: "Soffit install", unit: "LF", rate: 0.08 },
  { id: "r_fascia", cat: "Exterior", task: "Fascia / trim coil wrap", unit: "LF", rate: 0.06 },
  { id: "r_window", cat: "Exterior", task: "Window/door install (replacement)", unit: "ea", rate: 2.5 },
  { id: "r_lvp", cat: "Interior", task: "LVP flooring install", unit: "sqft", rate: 0.025 },
  { id: "r_dw_hang", cat: "Interior", task: "Drywall hang", unit: "sqft", rate: 0.012 },
  { id: "r_dw_finish", cat: "Interior", task: "Drywall tape & finish", unit: "sqft", rate: 0.03 },
  { id: "r_trim", cat: "Interior", task: "Interior trim", unit: "LF", rate: 0.033 },
  { id: "r_slate", cat: "Roofing — steep slope", task: "Slate / Nu-Lok install", unit: "sq", rate: 4.571 },
  { id: "r_slate_ridge", cat: "Roofing — steep slope", task: "Slate ridge install", unit: "LF", rate: 0.04 },
  { id: "r_shake", cat: "Roofing — steep slope", task: "Wood shake install", unit: "sq", rate: 3.2 },
  { id: "r_ss_copper", cat: "Roofing — steep slope", task: "Standing seam — copper", unit: "sq", rate: 6.667 },
  { id: "r_steel_panel", cat: "Roofing — steep slope", task: "Steel panel roof (26ga)", unit: "sq", rate: 3.2 },
  { id: "r_step_flash", cat: "Roofing — steep slope", task: "Step / wall flashing", unit: "sq", rate: 5.5 },
  { id: "r_epdm_mech", cat: "Roofing — flat / low slope", task: "EPDM (mechanically attached)", unit: "sq", rate: 1.143 },
  { id: "r_tpo_adhered", cat: "Roofing — flat / low slope", task: "TPO (fully adhered)", unit: "sq", rate: 1.6 },
  { id: "r_modbit", cat: "Roofing — flat / low slope", task: "Modified bitumen cap (SBS/APP)", unit: "sqft", rate: 0.019 },
  { id: "r_gutter", cat: "Exterior", task: "Gutter — 5in K aluminum", unit: "LF", rate: 0.064 },
  { id: "r_downspout", cat: "Exterior", task: "Downspout — aluminum", unit: "LF", rate: 0.042 },
  { id: "r_fibercement", cat: "Exterior", task: "Fiber cement siding install", unit: "sqft", rate: 0.039 },
  { id: "r_woodsiding", cat: "Exterior", task: "Wood / cedar siding install", unit: "sqft", rate: 0.027 },
  { id: "r_studs6", cat: "Structural", task: "Wall framing — 2x6 studs (8ft)", unit: "LF", rate: 0.016 },
  { id: "r_rafter28", cat: "Structural", task: "Roof rafters — 2x8", unit: "LF", rate: 0.017 },
  { id: "r_joist210", cat: "Structural", task: "Floor joists — 2x10", unit: "LF", rate: 0.018 },
  { id: "r_truss", cat: "Structural", task: "Roof truss set", unit: "ea", rate: 0.582 },
  { id: "r_lvl", cat: "Structural", task: "LVL beam set", unit: "LF", rate: 0.033 },
  { id: "r_ply_roof", cat: "Structural", task: "Plywood sheathing — 1/2in", unit: "sqft", rate: 0.011 },
  { id: "r_subfloor", cat: "Structural", task: "Subfloor — 3/4 plywood", unit: "sqft", rate: 0.013 },
  { id: "r_deck_joist", cat: "Decks", task: "Deck framing — joists 2x8", unit: "LF", rate: 0.015 },
  { id: "r_batt19", cat: "Interior", task: "Batt insulation — R19 wall", unit: "sqft", rate: 0.007 },
  { id: "r_blown38", cat: "Interior", task: "Blown insulation — attic R38", unit: "sqft", rate: 0.021 },
  { id: "r_spray2", cat: "Interior", task: "Closed-cell spray foam — 2in", unit: "sqft", rate: 0.008 },
  { id: "r_casing", cat: "Interior", task: "Door / window casing", unit: "LF", rate: 0.032 },
  { id: "r_demo_shingle", cat: "Demolition", task: "Tear-off asphalt shingles", unit: "sq", rate: 1.143 },
  { id: "r_demo_flash", cat: "Demolition", task: "Demo — flashing / sheet metal", unit: "sqft", rate: 0.028 },
  { id: "r_demo_gutter", cat: "Demolition", task: "Demo — gutters", unit: "LF", rate: 0.033 },
];
const QUICK_DIMS = [
  ["Roof area", "sqft"], ["Pitch", "/12"], ["Eaves", "LF"], ["Rakes", "LF"],
  ["Ridges", "LF"], ["Hips", "LF"], ["Valleys", "LF"], ["Step flashing", "LF"],
  ["Wall flashing", "LF"], ["Perimeter", "LF"], ["Parapet", "LF"], ["Penetrations", "ct"],
  ["Wall length", "LF"], ["Wall height", "ft"], ["Wall area", "sqft"], ["Floor area", "sqft"],];

const CATEGORIES = [
  { cat: "Site Work & Prep", subs: [
    { label: "Excavation, grading, land clearing", hint: "dig, grade, clear" },
    { label: "Foundations, footings, concrete slabs", hint: "footings, slabs" },
    { label: "Drainage, retaining walls", hint: "drainage, retaining" },
  ] },
  { cat: "Structural Work", subs: [
    { label: "Framing", hint: "wood, steel, or concrete" },
    { label: "Masonry, blockwork, structural beams", hint: "block, beams" },
    { label: "Roofing structure", hint: "trusses, rafters" },
  ] },
  { cat: "Exterior Systems", subs: [
    { label: "Roofing", hint: "shingles, metal, flat systems" },
    { label: "Siding", hint: "vinyl, wood, metal" },
    { label: "Gutters, soffits, fascia", hint: "gutters, soffit, fascia" },
    { label: "Windows, exterior doors", hint: "windows, doors" },
  ] },
  { cat: "Interior Finishes", subs: [
    { label: "Drywall, plaster, insulation", hint: "drywall, insulation" },
    { label: "Suspended / drop ceiling", hint: "acoustic ceiling, grid, tiles" },
    { label: "Painting, wallpaper, trim", hint: "paint, trim" },
    { label: "Flooring", hint: "tile, wood, carpet" },
  ] },
  { cat: "Utilities & Mechanical", subs: [
    { label: "Plumbing", hint: "water, sewer, gas lines" },
    { label: "Electrical", hint: "wiring, lighting, smart systems" },
    { label: "HVAC", hint: "heating, ventilation, AC" },
  ] },
  { cat: "Landscaping & Exterior", subs: [
    { label: "Softscaping", hint: "plants, trees, lawns" },
    { label: "Hardscaping", hint: "patios, pathways, decks" },
    { label: "Fencing, lighting, irrigation", hint: "fence, lighting, irrigation" },
  ] },
  { cat: "Specialty Trades", subs: [
    { label: "Solar panel installation", hint: "solar PV" },
    { label: "Smart home systems, alarms", hint: "smart home, alarms" },
    { label: "Custom metalwork or glasswork", hint: "metal, glass" },
  ] },
  { cat: "Demolition & Remediation", subs: [
    { label: "Demolition, tear-out, haul-away", hint: "demo, plaster/drywall/lath removal, haul-away" },
    { label: "Mold remediation, asbestos removal", hint: "mold, asbestos" },
    { label: "Structural reinforcement after removal", hint: "reinforce" },
  ] },
  { cat: "Finishing Details", subs: [
    { label: "Custom cabinetry, built-ins", hint: "cabinets, built-ins" },
    { label: "Specialty lighting, accent features", hint: "accent lighting" },
    { label: "Final staging, decorative elements", hint: "staging, decor" },
  ] },
];

const CAZA_LOGO = "data:image/jpeg;base64,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";
const AL_NOTEPAD = "data:image/jpeg;base64,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";
const CACHE_FRESH_DAYS = 45;
const DRAFT_KEY = "cazbid-draft-v2";
const PROFDRAFT_KEY = "cazbid-profdraft-v2";

const PLANS = [
  { id: "starter", name: "Starter", price: 49, limit: 3, blurb: "3 job applications / month" },
  { id: "pro", name: "Pro", price: 149, limit: 0, blurb: "Unlimited applications" },
];


// ===== TRADE-SPECIFIC ESTIMATING MODULES (routed by scope so each estimate only carries its trade) =====
const TRADE_BASE_RULES =
  "Build the takeoff as an expert in THIS trade. Include only components that belong to this trade/system; never pull in parts from an unrelated trade. Derive quantities from the measurements/dimensions given. A real takeoff is itemized (many lines), not a skeleton. Omit a component only if it genuinely does not apply. The items[] list is MATERIALS ONLY - do NOT put tool/equipment rentals (seamers, lifts, telehandlers, dumpsters go in equipment), labor, or day-rate lines in items[]; put rental/equipment dollars in the equipment field instead. Every item line must be a physical material with a real per-unit cost (no $0 placeholder lines, no lump-sum tear-off lines - tear-off is labor). " +
  "CRITICAL SYSTEM ISOLATION: the contractor's price book, material list, and production rates below contain entries for EVERY system and trade this company works in (asphalt shingle, standing seam, slate, flat membrane, steel panel, siding, etc.). Use ONLY the entries that belong to THIS job's identified system. Concrete example: on an ASPHALT SHINGLE roof, NEVER include metal panels, standing-seam panels, panel clips, seam/butyl sealant tape, or metal trim/coping lines - even though those entries sit right there in the price book - because they belong to a different roofing system. Pulling materials from the wrong system is the single most common estimating error; do not make it.\n";

const TRADE_MODULES = {
  roofing:
    "TRADE: ROOFING. First identify the roofing SYSTEM from the work type / description, then include ONLY that system's components:\n" +
    "ASPHALT SHINGLE: shingles, starter, hip/ridge cap shingles, synthetic underlayment, ice & water, drip edge, valley metal, STEP FLASHING + counter flashing at walls, corrugated/strip RIDGE VENT, pipe boots, roofing nails.\n" +
    "STANDING SEAM METAL: metal panels by square, concealed CLIPS + screws, butyl/seam SEALANT TAPE, eave/rake/gable TRIM, valley pan/flashing, hem/cleat, continuous metal RIDGE CAP with vented Z-closure (NOT shingle ridge-vent strips), headwall/sidewall PAN + counter flashing (NOT step flashing), pipe flashings, underlayment + high-temp ice & water. Do NOT include shingle ridge vent, step-flashing bundles, cap shingles, or starter strip. SNAP-LOCK panels (e.g. ABC LokSeam, most 1in nail-strip) are hand-seamed - DO NOT add a powered seamer or seamer rental. Only MECHANICAL-LOCK (double-lock) panels need a seamer, and that is EQUIPMENT, never a material line.\n" +
    "EXPOSED-FASTENER METAL PANEL: panels, exposed screws w/ washers, closure strips, ridge cap, rake/eave trim, sidewall/endwall flashing, butyl tape.\n" +
    "SLATE / NU-LOK: slate or Nu-Lok by square, BATTENS/counter-battens, copper or stainless nails/clips, copper/lead valley + flashing, slate/metal ridge, snow guards, high-temp underlayment - NOT asphalt step flashing or shingle ridge vent.\n" +
    "FLAT MEMBRANE (TPO/EPDM/BUR): membrane, insulation/ISO, coverboard, fasteners/plates or adhesive, term bar, edge metal, parapet/coping, pipe boots, seam tape/cover strip - no shingle or metal-panel parts.\n" +
    "Always: tear-off + dumpster if a re-roof; field material by squares incl. waste; perimeter/valley/ridge metal from matching LF; penetrations by count; fasteners + sealant. Labor: asphalt re-roof ~1.5-2.5 MH/sq; steep (8/12+), complex, tear-off, and specialty (slate/tile/standing seam) much higher - slate/Nu-Lok 6-12+ MH/sq.\n",
  siding:
    "TRADE: SIDING. Identify the siding type (vinyl, fiber cement/Hardie, wood/cedar lap, engineered wood, board & batten, steel/AG panel) and include only its components:\n" +
    "Field siding by square (incl. waste); starter strip; J-channel, outside/inside corner posts, undersill/finish trim (vinyl); for fiber cement: trim boards, joint flashing, blind-nail + face screws; for wood: building paper, corner boards, galvanized/SS nails; housewrap; window/door flashing tape + head flashing; soffit + fascia if in scope; caulk/sealant; fasteners appropriate to the product. Do NOT include roofing shingles, membrane, or roof flashing. Labor scales with stories, openings, and cut-up walls.\n",
  decks:
    "TRADE: DECKS. Include: footings/piers (count from span), posts, beams, ledger board + flashing + lag/structural screws, joists + hangers, rim/fascia, decking (PT, cedar, or composite) by sqft, hidden clips or deck screws, stair stringers/treads, railing posts/rails/balusters by LF, post caps. Add concrete for footings. Do NOT include roofing or siding parts. Labor scales with height off grade, stairs, and railing footage.\n",
  framing:
    "TRADE: FRAMING / STRUCTURAL. Include the right members for the scope: pressure-treated sill plates, studs/plates (walls), rafters or trusses + ridge/hangers (roof framing), joists + rim + hangers (floors), beams/LVL/headers, sheathing (wall/roof/subfloor) by sheet, structural connectors (Simpson), framing nails/screws, anchor bolts. Do NOT include finish materials, roofing, or siding. Labor by board-foot or per-member productivity.\n",
  exterior:
    "TRADE: EXTERIOR METAL (gutters / soffit / fascia / trim). Include: gutter by LF (size/profile), inside/outside corners, end caps, downspouts + elbows + straps (count), hangers/spikes-ferrules, gutter guard if specified; soffit panels + channel by LF/sqft; fascia/trim coil wrap by LF; flashing; fasteners + sealant. Labor scales with stories and linear footage.\n",
  demolition:
    "TRADE: DEMOLITION / TEAR-OUT (plaster, lath, drywall removal, gut-outs). The COST here is mostly LABOR + DISPOSAL, NOT materials. Labor: plaster+lath removal ~0.05 MH/SF; drywall-only removal ~0.025 MH/SF; raise for ceilings, height, and tight access. DISPOSAL is the real expense — size a dumpster by debris weight (plaster+lath is heavy, ~6 lb/SF) and put dumpster rental + per-ton dump/haul fees in the EQUIPMENT field (not items[]). MATERIALS are minimal: dust-control plastic sheeting, painter's tape, contractor bags, floor protection, respirators — only a few small real-cost lines (never $0). Do NOT add any INSTALL materials (no new drywall, insulation, or ceiling unless separately scoped). For pre-1980 plaster, note possible asbestos/lead testing in the notes.\n",
  ceiling:
    "TRADE: SUSPENDED / DROP (ACOUSTIC) CEILING. For a room of area A (SF) and perimeter P (LF): TILES = A / tile_coverage x 1.10 waste (2x4 tile -> divide by 8 SF; 2x2 tile -> divide by 4 SF). MAIN runners (12ft tees): main LF ~ A/4 (one main per 4ft of width); pieces = (A/4)/12, round up. CROSS tees (4ft): ~ A/8, round up; for a 2x2 grid ALSO add 2ft cross tees ~ A/4. WALL ANGLE (perimeter): P LF; pieces = P/12, round up. HANGER WIRE: ~ A/16 drops (4ft OC on 4ft-spaced mains), round up; add eye-lag/anchor fasteners for the hangers. Labor ~0.02 MH/SF for a clean rectangular room, more if cut up. Do NOT include drywall or joint compound (that is a hard/gypsum ceiling — a different scope).\n",
};

function tradeModuleFor(scope, desc) {
  const s = ((scope || "") + " " + (desc || "")).toLowerCase();
  if (/(roof|shingle|standing seam|metal panel|slate|nu-?lok|tpo|epdm|membrane|bur|flat roof|re-?roof)/.test(s)) return TRADE_MODULES.roofing;
  if (/(siding|vinyl|hardie|fiber cement|clapboard|cedar lap|board.?and.?batten|ag panel)/.test(s)) return TRADE_MODULES.siding;
  if (/(deck|railing|porch)/.test(s)) return TRADE_MODULES.decks;
  if (/(fram|truss|rafter|joist|stud|beam|lvl|sheathing|structural)/.test(s)) return TRADE_MODULES.framing;
  if (/(gutter|soffit|fascia|downspout|trim coil)/.test(s)) return TRADE_MODULES.exterior;
  if (/(drop ceiling|suspended ceiling|acoustic ceiling|ceiling tile|ceiling grid|t-?bar ceiling|grid ceiling)/.test(s)) return TRADE_MODULES.ceiling;
  if (/(demolition|demo\b|tear.?out|plaster removal|\blath\b|haul.?away|gut.?out|\bgut\b|remove (drywall|plaster|ceiling|lath))/.test(s)) return TRADE_MODULES.demolition;
  // Tier 2: any other trade -> generic expert prompt that adapts to the named trade
  return "TRADE: " + (scope || desc || "the specified trade") + ". Act as an expert estimator in THIS specific trade. List every material/component this trade actually uses for the described scope, with realistic quantities from the dimensions. Use correct trade units and terminology. Do NOT include components from unrelated trades (no roofing parts on a plumbing job, etc.). If you are unsure of exact local specifics, give a sound professional estimate and note assumptions in the notes field.\n";
}

// ===== CAZA TRADE MANUALS — fetched on demand from a public URL (one per estimate) =====
// The full estimating manuals are hosted as raw files (e.g. GitHub raw). The artifact fetches
// ONLY the relevant trade's manual when building an estimate, so Sonnet gets Caza's pre-computed
// trade expertise without bloating the app. If the fetch fails for any reason, the estimate
// still runs on the inline tradeModuleFor() hint — so this NEVER breaks an estimate.
//
// SETUP: put the 12 manual .md files at this base URL (keep the exact filenames below), then
// set MANUAL_BASE_URL to your raw path. Example GitHub raw base (note the /main/ branch):
//   https://raw.githubusercontent.com/<your-username>/<your-repo>/main/
const MANUAL_BASE_URL = "https://raw.githubusercontent.com/cazacontractors-create/caza-manuals/refs/heads/main/";

const MANUAL_FILE_FOR_TRADE = {
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

// scope/desc -> manual trade key (mirrors tradeModuleFor's routing, extended to all 12 trades)
function manualTradeKey(scope, desc) {
  const s = ((scope || "") + " " + (desc || "")).toLowerCase();
  if (/(roof|shingle|standing seam|metal panel|slate|nu-?lok|tpo|epdm|membrane|bur|flat roof|re-?roof|ridge|soffit|fascia|gutter|downspout)/.test(s)) return "roofing";
  // F9/F10: DECKS before siding/framing — a "Trex deck + VINYL railing" must not route into the
  // siding engine (run-6: all-zero siding template), and a deck's PT SUBFRAME (joists/beams/posts)
  // belongs to the deck trade, never the HOUSE-framing engine (run-6: roof trusses on a deck).
  if (/(deck|railing|guard|baluster|porch|composite deck|trex)/.test(s)) return "decks";
  if (/(siding|vinyl|hardie|fiber cement|clapboard|cedar lap|board.?and.?batten|ag panel|cladding|housewrap|wrb)/.test(s)) return "siding";
  if (/(fram|truss|rafter|joist|stud|beam|lvl|header|sheathing|structural|timber)/.test(s)) return "framing";
  if (/(concrete|masonry|foundation|footing|slab|cmu|block|brick|stone|veneer|paver|hardscape|retaining|flatwork|mortar)/.test(s)) return "concrete";
  if (/(insulat|spray foam|batt|blown.?in|cellulose|rigid board|r-?value|air seal|vapor barrier|thermal)/.test(s)) return "insulation";
  if (/(drywall|sheetrock|gypsum|joint compound|\bpaint|primer|interior finish|level 5)/.test(s)) return "interior";
  if (/(floor|tile|hardwood|engineered wood|lvp|lvt|vinyl plank|laminate|carpet|subfloor)/.test(s)) return "flooring";
  if (/(cabinet|countertop|vanity|built.?in|millwork|kitchen|quartz|granite top)/.test(s)) return "cabinetry";
  if (/(electric|wiring|circuit|breaker|outlet|receptacle|service upgrade|ev charger|generator|low.?voltage)/.test(s)) return "electrical";
  if (/(hvac|furnace|heat pump|mini.?split|ductwork|air condition|boiler|ventilat|erv|hrv|heating|cooling)/.test(s)) return "hvac";
  if (/(plumb|pipe|fixture|water heater|tankless|well|septic|dwv|drain|sump|water treatment|softener)/.test(s)) return "plumbing";
  return "";
}

// in-memory cache so we fetch each manual at most once per session
const __manualCache = {};

// Artifacts often can't fetch raw.githubusercontent.com directly (the browser's CORS check blocks
// the background request even though the URL opens fine in a tab). So we try several independent
// paths and take the first that returns real manual text. If all fail, the estimate still runs
// without the manual (graceful fallback). Built to maximize the odds one path connects.
function manualSourcesFor(fileUrl) {
  const enc = encodeURIComponent(fileUrl);
  return [
    fileUrl,                                                      // 1. direct
    "https://corsproxy.io/?url=" + enc,                           // 2. corsproxy.io
    "https://api.allorigins.win/raw?url=" + enc,                  // 3. allorigins raw
    "https://thingproxy.freeboard.io/fetch/" + fileUrl,           // 4. thingproxy
    "https://api.codetabs.com/v1/proxy/?quest=" + fileUrl,        // 5. codetabs
  ];
}

// Loose check: does this text look like one of our manuals? (proxies may alter encoding/wrap content,
// so don't require an exact literal — accept several signatures the manuals reliably contain.)
function looksLikeManual(txt) {
  if (!txt || txt.length < 800) return false;
  const t = txt.slice(0, 4000); // signatures live near the top
  if (t.indexOf("Caza") !== -1 && (t.indexOf("Estimating Manual") !== -1 || t.indexOf("Manual") !== -1)) return true;
  if (t.indexOf("Required Dimensions") !== -1 || t.indexOf("Required dimensions") !== -1) return true;
  if (t.indexOf("Labor / cost drivers") !== -1 || t.indexOf("Material list") !== -1 || t.indexOf("material list") !== -1) return true;
  if (t.indexOf("SCOPING") !== -1 || t.indexOf("BUILD format") !== -1) return true;
  return false;
}

async function fetchOneManual(fileUrl) {
  const sources = manualSourcesFor(fileUrl);
  for (let i = 0; i < sources.length; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(sources[i], { signal: ctrl.signal });
      clearTimeout(timer);
      if (res && res.ok) {
        let txt = await res.text();
        // some proxies wrap the body in JSON like {"contents":"..."} — unwrap if so
        if (txt && txt.charAt(0) === "{" && txt.indexOf("contents") !== -1) {
          try { const j = JSON.parse(txt); if (j && typeof j.contents === "string") txt = j.contents; } catch (e) {}
        }
        if (looksLikeManual(txt)) return txt;
      }
    } catch (e) {
      clearTimeout(timer);
      // try the next source
    }
  }
  return null;
}

async function fetchManual(scope, desc) {
  try {
    if (!MANUAL_BASE_URL || MANUAL_BASE_URL.indexOf("REPLACE_ME") !== -1) return null; // not configured yet
    const key = manualTradeKey(scope, desc);
    if (!key) return null;
    if (__manualCache[key] !== undefined) return __manualCache[key];
    const file = MANUAL_FILE_FOR_TRADE[key];
    if (!file) { __manualCache[key] = null; return null; }
    const txt = await fetchOneManual(MANUAL_BASE_URL + file);
    __manualCache[key] = txt || null;
    return __manualCache[key];
  } catch (e) {
    return null; // any failure -> estimate proceeds without the manual
  }
}

// ===== deterministic labor from the rate book (so labor never depends on the AI's mood) =====
// ===== parse EagleView measurement string into numbers =====
function parseMeas(dims) {
  const s = (dims || "").toLowerCase().replace(/,/g, "");
  const g = (re) => { const m = s.match(re); return m ? parseFloat(m[1]) : 0; };
  return {
    area: g(/([\d.]+)\s*sqft/),
    pitch: g(/([\d.]+)\s*\/\s*12/),
    eaves: g(/eaves?\s*([\d.]+)/),
    ridges: g(/ridges?\s*([\d.]+)/),
    hips: g(/hips?\s*([\d.]+)/),
    valleys: g(/valleys?\s*([\d.]+)/),
    rakes: g(/rakes?\s*([\d.]+)/),
    drip: g(/drip\s*edge\s*([\d.]+)/),
    flashing: g(/flashing\s*([\d.]+)/),
    stepflash: g(/step\s*flash(?:ing)?\s*([\d.]+)/),
    pens: g(/(\d+)\s*penetr/) || g(/penetrations?\s*(\d+)/),
  };
}
// Roofing PROFILE from the type/desc. Drives a DIFFERENT material takeoff per profile.
// DEFECT B: classify on PROFILE words, never on FINISH words. SMP / Kynar / PVDF / galvalume are
// paint finishes that appear on BOTH standing-seam AND exposed-fastener panels — they must not
// decide the profile. Tests run most-specific -> generic so a string naming both a finish and a
// profile ("26-ga SMP standing seam") resolves to the explicit profile (standing seam), and a
// finish/gauge-only string ("26G SMP") stays "metal" (Caza's clip standing-seam standard) rather
// than defaulting into screw-down AG panel.
function roofTypeOf(sys) {
  const s = (sys || "").toLowerCase();
  // explicit STANDING SEAM (concealed-clip) — beats the generic AG-panel terms below
  if (/standing.?seam|snap.?lock|mechanical.?lock|nu-?lok|\blok\b/.test(s)) return "metal";
  // explicit EXPOSED-FASTENER / ribbed AG panel (through-screwed, NO concealed clips)
  if (/ag[ -]?panel|exposed.?fastener|through.?fasten|panel rib|rib panel|ribbed panel|corrugated|r-?panel\b|u-?panel\b/.test(s)) return "agpanel";
  // generic metal (only "metal roof" / a gauge, no profile word) -> clip standing-seam assembly
  if (/metal panel|steel panel|metal roof|\b(?:22|24|26|28|29)\s*ga(?:uge)?\b|\b(?:22|24|26|28|29)\s*g\b/.test(s)) return "metal";
  if (/\btpo\b|\bepdm\b|\bpvc\b|flat roof|single.?ply|membrane|\bbur\b|modified bitumen/.test(s)) return "flat";
  if (/\btile\b|clay tile|concrete tile/.test(s)) return "tile";
  return "shingle";
}
// Shingle-family terms (for MIXED-system detection). A roof whose description names BOTH a
// non-shingle profile (metal/agpanel/flat/tile) AND a shingle field is a MIXED system.
const ROOF_SHINGLE_RE = /shingle|asphalt|architect|3-?tab|dimensional|laminat|\bduration\b|timberline|landmark|\bhdz\b/;
// DEFECT A: mixed = roofTypeOf saw a non-shingle profile AND the string also carries shingle terms
// (e.g. "26-ga standing-seam eave band + OC Duration shingle upper field"). Mixed jobs keep the
// LLM's verified two-system takeoff — they are NOT rebuilt-and-replaced as one system.
function roofIsMixed(sys) {
  const s = (sys || "").toLowerCase();
  return roofTypeOf(s) !== "shingle" && ROOF_SHINGLE_RE.test(s);
}
// F13 — a "tear off / strip / remove (1 layer of shingles)" clause names the OLD roof being REMOVED;
// it must not feed system/mixed detection (a shingle tear-off + metal install must read as pure metal,
// not mixed). Strip the removal verb + an optional parenthetical/"N layers of"/one material noun, but
// stop before any install words so "remove old shingles and install standing seam" keeps the metal.
function installScope(s) {
  return String(s || "").toLowerCase().replace(/\b(?:tear[- ]?off|tear[- ]?out|strip(?:ping)?|remov(?:e|al|ing)|rip[- ]?off|demo(?:lish|lition)?)\b\s*(?:\([^)]*\))?\s*(?:(?:the|existing|old|down\s+to\s+deck|\d+\s*layers?\s*(?:of\s+)?)\s*)*(?:asphalt|architectural|3-?tab|dimensional|laminate|shingles?|shakes?|slate|metal|steel|panels?|membrane|tpo|epdm|rubber|tile|roof(?:ing)?)?/g, " ").replace(/\s+/g, " ").trim();
}
// DEFECT D/F + I&W grade rule — build-prompt guidance for a MIXED roof: partition the area per Caza's
// 4ft-band standard (a stated band depth wins), give the exact reference numbers when measurements
// allow, spell the grade->hardware rule (26-ga SMP flange-screw vs 24-ga Kynar clip) and the two-SKU
// I&W split. The LLM produces the partitioned quantities (which the mixed price-only pass then keeps),
// so the band is never double-counted and fasteners/underlayment are band-scoped — not full-roof.
// Shared band/field partition for a mixed roof: eave LF x band depth (a stated depth wins, else Caza's
// 4ft standard); panel LF = band SF / panel coverage width (panelW in, default 16in). Used by the build
// prompt AND the never-omit panel backstop so both agree on the numbers.
function bandPartition(dims, sysStr, desc, panelW) {
  const s = (String(sysStr || "") + " " + String(desc || "")).toLowerCase();
  const m = parseMeas(dims);
  const totalSQ = m.area ? m.area / 100 : 0;
  const eaveLF = m.eaves || 0;
  let bandFt = 4, bandStated = false;
  const bm = s.match(/(\d+(?:\.\d+)?)\s*-?\s*(?:'|ft\b|foot|feet)[- ]*(?:eave\s*)?band/) || s.match(/band[^.]{0,24}?(\d+(?:\.\d+)?)\s*-?\s*(?:'|ft\b|foot|feet)/);
  if (bm) { const v = parseFloat(bm[1]); if (v > 0 && v < 20) { bandFt = v; bandStated = true; } }
  const coverIn = parseFloat(panelW) > 0 ? parseFloat(panelW) : 16;
  const coverFt = coverIn / 12;
  const bandSF = eaveLF * bandFt;
  return { eaveLF, totalSQ, bandFt, bandStated, coverIn, coverFt, bandSF, bandSQ: bandSF / 100, fieldSQ: totalSQ > 0 ? Math.max(0, totalSQ - bandSF / 100) : 0, panelLF: coverFt > 0 ? bandSF / coverFt : 0 };
}
// H2 — ONE band depth must drive BOTH partition halves. The 3-ft run set the shingle field from the
// stated depth but left panel/screws/band-I&W at the 4-ft quantities. After the mixed price-only
// pass, the PANEL line (the band's priciest, formula-owned component) is reconciled to the band
// formula when it deviates >25% — with the math shown in the line note, never silently.
function reconcileBandPanel(items, dims, sysStr, desc, panelW) {
  const bp = bandPartition(dims, sysStr, desc, panelW);
  if (!(bp.panelLF > 0)) return items;
  return (items || []).map((it) => {
    if (roofPartType(it.name) !== "panel") return it;
    const cu = canonUnit(it.unit);
    const want = cu === "sq" ? Math.round(bp.bandSQ * 1.08 * 10) / 10 : Math.round(bp.panelLF);
    const q = Number(it.qty) || 0;
    if (!(want > 0) || (q > 0 && Math.abs(q - want) / want <= 0.25)) return it;
    const up = Number(it.unitPrice) > 0 ? Number(it.unitPrice) : (q > 0 ? (Number(it.cost) || 0) / q : 0);
    return Object.assign({}, it, { qty: want, unitPrice: up, cost: Math.round(up * want), priceNote: ((it.priceNote ? it.priceNote + " · " : "") + "panel set to the band formula: " + bp.eaveLF + " LF eave x " + bp.bandFt + "' band" + (cu === "sq" ? "" : " / " + bp.coverIn + "in coverage") + " = " + want + " " + (cu === "sq" ? "SQ" : "LF") + (bp.bandStated ? "" : " (4ft Caza standard - adjust?)")) });
  });
}
// F2 (Dustin, locked): REGULAR I&W on shingle roofs — high-temp is a STEEL-system product. On a
// PURE-shingle job (mixed keeps HT on its band) a high-temp I&W line is conformed to regular:
// renamed + repriced from the book when it has a regular SKU, the swap shown in the line note —
// never a silent pass, never an omission. (~$150-200/job + a spec mismatch otherwise.)
function enforceShingleIwGrade(items, books) {
  return (items || []).map((it) => {
    if (roofLineKey(it.name) !== "iw") return it;
    if (!/high.?temp|\bht\b/i.test(String(it.name || ""))) return it;
    const name = "Ice & water shield (regular)";
    const qty = Number(it.qty) || 0;
    const mb = matchBookLine({ name: name, unit: it.unit, key: "iw" }, books, { jobShingle: true });
    if (mb && mb.unitPrice != null) return Object.assign({}, it, { name: name, unitPrice: mb.unitPrice, cost: Math.round(mb.unitPrice * qty), unpriced: false, priceNote: "Caza standard: REGULAR I&W on shingle (high-temp is for steel) — swapped + repriced from your book" });
    return Object.assign({}, it, { name: name, priceNote: "Caza standard: REGULAR I&W on shingle (was high-temp) — still at the HT price; set your regular I&W cost" });
  });
}
function mixedRoofBlock(dims, sysStr, desc, panelW) {
  const s = (String(sysStr || "") + " " + String(desc || "")).toLowerCase();
  const bp = bandPartition(dims, sysStr, desc, panelW);
  const totalSQ = Math.round(bp.totalSQ * 10) / 10, eaveLF = bp.eaveLF, bandFt = bp.bandFt, bandStated = bp.bandStated, coverIn = bp.coverIn, coverFt = bp.coverFt;
  const isKynar = /kynar|24\s*ga|1-?1\/2|1\.5\s*(?:in|")?\s*seam/.test(s) && !/\bsmp\b|26\s*ga/.test(s);
  let out = "MIXED ROOF — this job has a NON-shingle band AND a shingle field. Build BOTH systems in ONE takeoff and PARTITION the roof area so nothing is double-counted (the band must NOT also be shingled):\n";
  out += "- Band depth: " + (bandStated ? ("as stated in the conversation (" + bandFt + "ft up-slope).") : "use Caza's STANDARD 4ft up-slope (measured along the slope), and FLAG it as an assumption/deviation: \"band figured at Caza standard 4ft - adjust?\".") + "\n";
  out += "- Partition: band SF = eave LF x " + bandFt + "ft; band SQ = band SF / 100; shingle field SQ = total SQ - band SQ; panel LF = band SF / (coverage width " + coverIn + "in = " + (Math.round(coverFt * 1000) / 1000) + "ft).\n";
  if (eaveLF > 0 && totalSQ > 0) {
    const bandSQ = Math.round(bp.bandSQ * 10) / 10, fieldSQ = Math.round(bp.fieldSQ * 10) / 10, panelLF = Math.round(bp.panelLF);
    out += "- FOR THIS JOB (eave " + eaveLF + " LF, total " + totalSQ + " SQ): band ~= " + bandSQ + " SQ, shingle field ~= " + fieldSQ + " SQ, panel ~= " + panelLF + " LF. Use these PARTITIONED quantities — the shingle field is ~" + fieldSQ + " SQ, NOT the full " + totalSQ + " SQ.\n";
  } else {
    out += "- (Eave LF or total area not measured — state the assumption and ask for the eave length if you need it.)\n";
  }
  out += "- NEVER OMIT the metal PANEL line (the band's priciest component): if you can't resolve the band size, still include the panel line with your best default quantity and mark it an assumption — never ship band accessories (butyl/closures/rivets/screws) without their panel.\n";
  out += "- Panel hardware follows the GRADE (flag any mismatch as a deviation): 26-ga SMP = concealed pancake screws through the 1in flange 12in o.c. -> screw count ~= panel LF; NO clips, and NOT AG-style exposed/washered screws. 24-ga Kynar = concealed clips 16in o.c. (clips ~= panel LF x 0.75) + 2 pancake screws per clip. This job reads as " + (isKynar ? "24-ga Kynar (clip)" : "26-ga SMP (flange-screw)") + " unless the SKU/manual says otherwise.\n";
  out += "- Fasteners, band underlayment, and band trim scale to the BAND area, NOT the whole roof.\n";
  out += "- Ice & water by system: HIGH-TEMP on the band area only; REGULAR at the shingle field's eaves/valleys per the EagleView formula. Two separate lines — neither runs across the whole roof.\n";
  out += "- Tiers: keep the shingle field's Good/Better/Best in the SHINGLE family and the band in the METAL family; do NOT flag the shingle tiers as off-family on this mixed job.\n";
  return out;
}
// Infer a takeoff category KEY from a line name (for category-assisted book matching, Defect C).
function roofLineKey(name) {
  const s = String(name || "").toLowerCase();
  if (/\bpanel\b|standing.?seam/.test(s)) return "panel";
  if (/clip|cleat/.test(s)) return "clip";
  if (/screw|fastener/.test(s)) return "screw";
  if (/drip|eave (trim|metal)|edge metal/.test(s)) return "drip";
  if (/rake|gable/.test(s)) return "rake";
  if (/valley/.test(s)) return "valley";
  if (/ridge|hip/.test(s)) return "ridge";
  if (/closure/.test(s)) return "closure";
  if (/starter/.test(s)) return "starter"; // H3: BEFORE field — so the C.5 guard stops starter matching a field-shingle row
  if (/underlay|ice|high.?temp|synthetic|felt/.test(s)) return "iw";
  if (/shingle|membrane|\btpo\b|\bepdm\b|tile/.test(s)) return "field";
  return "";
}
// Category regexes that let a governed (enginePB) book row price a takeoff line by CATEGORY when
// the SKU name shares no tokens (e.g. book "26G SMP A1101" cat "metal roofing panel" prices a
// "panel" line). Keyed by takeoff line key.
const ROOF_KEY_CATEGORY = {
  panel: /panel|standing.?seam|metal roof/, clip: /clip|cleat/, screw: /screw|fastener/,
  drip: /drip|eave|edge metal/, rake: /rake|gable/, valley: /valley/, ridge: /ridge|hip/,
  closure: /closure/, iw: /underlay|ice|high.?temp/, field: /shingle|membrane|tpo|epdm|tile/,
};
// ===== unit-aware, category-assisted price matching (DEFECT C) =====
// Normalize a unit string to a coarse family so a per-LF line never silently takes a per-stick $.
function canonUnit(u) {
  const s = String(u || "").toLowerCase().replace(/[^a-z0-9/' .-]/g, " ").trim();
  if (!s) return "";
  if (/\bsq\b|square/.test(s) && !/sq\s*ft|sqft|\bsf\b/.test(s)) return "sq";
  if (/lin(?:eal|ear)?\.?\s*(?:ft|foot|feet)|\blf\b|\/\s*lf|ln\s*ft|per\s*(?:ft|foot|lineal)/.test(s)) return "lf";
  if (/\bft\b|feet|foot/.test(s)) return "lf";
  if (/bundle|\bbdl\b|bndl/.test(s)) return "bundle";
  if (/\broll\b/.test(s)) return "roll";
  if (/bucket|pail/.test(s)) return "bucket";
  if (/\bbox\b/.test(s)) return "box";
  if (/stick|length|piece|\bpc\b|\bpcs\b|\bea\b|each/.test(s)) return "ea";
  return s;
}
// Pull a stock length in feet from a name/unit ("16'", "10 ft", "12 foot", "10-ft stick").
function parseLenFt(str) {
  const s = String(str || "").toLowerCase();
  let m = s.match(/(\d+(?:\.\d+)?)\s*(?:'|ft\b|foot|feet)/);
  if (m) return Number(m[1]) || 0;
  return 0;
}
// Best NAME-overlap book row (the original token-overlap logic, returning the row + score).
// C.5 CROSS-PRODUCT GUARD — a takeoff line's part-type must agree with the book row's part-type, so a
// ridge-cap line can't price off a field-shingle bundle (brand tokens like "Owens Corning Duration"
// otherwise overwhelm the one part token "ridge" -> $35.25/LF ridge). Only the distinct BIG products
// are strict-guarded; fasteners/clips/underlayment/closure match freely (units + category catch those).
function roofPartType(s) {
  const t = String(s || "").toLowerCase();
  if (/ridge\s*vent|soffit\s*vent|intake|exhaust/.test(t)) return "vent";
  if (/hip\s*(?:&|and|\/)?\s*ridge|ridge\s*cap|hip\s*cap|\bridge\b|\bhip\b/.test(t)) return "ridge";
  if (/starter/.test(t)) return "starter";
  if (/valley/.test(t)) return "valley";
  if (/drip|eave\s*(?:trim|metal)|edge\s*metal|\brake\b|gable|\bfascia\b|step\s*flash/.test(t)) return "trim";
  if (/underlay|ice\s*(?:&|and)?\s*water|\bi&w\b|high.?temp|\bfelt\b|synthetic/.test(t)) return "iw";
  if (/\bclip\b|cleat/.test(t)) return "clip";
  if (/screw|fastener/.test(t)) return "screw";
  if (/\bpanel\b|standing.?seam/.test(t)) return "panel";
  if (/shingle|architectural|3-?tab|laminate|\bslate\b|\bfield\b|membrane|\btpo\b|\bepdm\b|\btile\b/.test(t)) return "field";
  return "";
}
const KEY_PART = { field: "field", panel: "panel", clip: "clip", screw: "screw", drip: "trim", rake: "trim", step: "trim", flash: "trim", valley: "valley", ridge: "ridge", starter: "starter", iw: "iw" };
const STRICT_PARTS = { field: 1, panel: 1, ridge: 1, trim: 1, valley: 1, starter: 1 }; // distinct big products that must not cross-match
// F6 — steel-SYSTEM SKUs (gauge-prefixed trims, W-bend/valley, cleats, butyl, rivets, pancake/flange
// screws, standing-seam) are unmatchable on a SHINGLE job — a shingle roof takes aluminum drip + a
// closed aluminum valley, never Caza's 26G/24G steel-roof accessories.
function looksSteelSystem(name) {
  return /\b(?:22|24|26|28|29)\s*ga\b|\b(?:22|24|26|28|29)g\b|w-?bend|w-?valley|\bcleat\b|butyl|\brivet|pancake|standing.?seam|snap.?lock/i.test(String(name || ""));
}
function bestBookRowByName(name, books, lineKey, jobShingle) {
  const stem = (t) => (t.length > 3 && t.charAt(t.length - 1) === "s" && t.charAt(t.length - 2) !== "s") ? t.slice(0, -1) : t;
  // split a slash between LETTERS ("hip/ridge" -> "hip ridge") but keep digit fractions ("1/2") intact
  const toks = (x) => String(x || "").toLowerCase().replace(/([a-z])\/([a-z])/g, "$1 $2").replace(/[^a-z0-9/ ]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !["the", "and", "for", "per", "ft", "of"].includes(t)).map(stem);
  const want = new Set(toks(name));
  if (!want.size) return null;
  const expected = lineKey ? KEY_PART[lineKey] : "";
  const guard = !!(expected && STRICT_PARTS[expected]);
  let best = null, bestScore = 0;
  for (const b of books) {
    const c = Number(b && b.cost);
    if (!(c > 0)) continue;
    if (guard) { const rp = roofPartType(b.name); if (rp && STRICT_PARTS[rp] && rp !== expected) continue; } // C.5: skip cross-product rows
    // membrane boots: a flat/membrane line must never price off a shingle-style boot SKU
    if (/membrane|epdm|\btpo\b|\bpvc\b/i.test(String(name)) && /lifetime|ult\s*pipe|pipe\s*flash\s*#?\s*300/i.test(String(b.name || ""))) continue;
    if (jobShingle && looksSteelSystem(b.name)) continue; // F6: no steel-system SKU on a shingle job
    const bt = toks(b.name);
    if (!bt.length) continue;
    const bs = new Set(bt);
    let inter = 0; for (const t of want) if (bs.has(t)) inter++;
    const score = inter / Math.min(want.size, bs.size);
    if (inter >= 1 && score > bestScore) { bestScore = score; best = b; }
  }
  return (best && bestScore >= 0.34) ? { row: best, score: bestScore } : null;
}
// Category-assisted match for a governed (roofing) book row when the name failed.
function bookRowByCategory(key, books) {
  const re = ROOF_KEY_CATEGORY[key];
  if (!re) return null;
  for (const b of books) {
    const cat = String(b && b.cat || "").toLowerCase();
    const tr = String(b && b.trade || "").toLowerCase();
    if (!cat || !(Number(b.cost) > 0)) continue;
    if (tr && tr !== "roofing") continue;
    if (re.test(cat)) return b;
  }
  return null;
}
// The one unit-aware matcher. Returns { unitPrice, note, source, via } when it can price the line
// in the TAKEOFF's own unit; { mismatch, bookUnit, wantUnit } when it found a name/category match
// but the units don't reconcile (caller FLAGS — never silently applies); { unmatched } otherwise.
function matchBookLine(line, books, opts) {
  if (!Array.isArray(books) || !books.length) return { unmatched: true };
  const wantUnit = canonUnit(line.unit);
  let row = null, via = null;
  const bn = bestBookRowByName(line.name, books, line.key, !!(opts && opts.jobShingle)); // key = C.5 guard; jobShingle = F6 steel guard
  if (bn) { row = bn.row; via = "name"; }
  if (!row && line.key) { const cr = bookRowByCategory(line.key, books); if (cr) { row = cr; via = "category"; } }
  if (!row) return { unmatched: true };
  const cost = Number(row.cost);
  if (!(cost > 0)) return { unmatched: true };
  const bookUnit = canonUnit(row.unit);
  // same unit (or either side unit-less) -> use as-is
  if (!bookUnit || !wantUnit || bookUnit === wantUnit) return { unitPrice: cost, source: "book", via: via };
  // known conversion: per-stick/piece (ea) <-> per-LF, using a length on the book/line name or unit
  if (wantUnit === "lf" && bookUnit === "ea") {
    const L = parseLenFt(row.name) || parseLenFt(row.unit);
    if (L > 0) { const per = Math.round((cost / L) * 100) / 100; return { unitPrice: per, source: "book", via: via, note: "$" + cost + "/" + (row.unit || "stick") + " / " + L + "' = $" + per + "/LF" }; }
  }
  if (wantUnit === "ea" && bookUnit === "lf") {
    const L = parseLenFt(line.name);
    if (L > 0) { const per = Math.round(cost * L * 100) / 100; return { unitPrice: per, source: "book", via: via, note: "$" + cost + "/LF x " + L + "' = $" + per + "/" + (line.unit || "ea") }; }
  }
  // no safe conversion -> do NOT apply a per-{bookUnit} price to a per-{wantUnit} line
  return { mismatch: true, bookUnit: row.unit || bookUnit, wantUnit: line.unit || wantUnit };
}
// Back-compat: number-or-null lookup (now unit-aware via matchBookLine).
function priceFromBook(name, books) {
  const r = matchBookLine({ name: name, unit: "" }, books);
  return r && r.unitPrice != null ? r.unitPrice : null;
}
// Price a deterministic roof takeoff: cost book first (unit-aware), then (for lines the book
// lacks) the LLM's own per-unit estimate for that line — NOT hardcoded. Lines neither source can
// price, AND lines the book matched but in an unconvertible unit, are FLAGGED (visible, never $0
// silently, never a per-stick $ silently applied per-LF).
function priceRoofTakeoff(lines, books, llmItems) {
  const llmBook = Array.isArray(llmItems) ? llmItems.map((it) => {
    const u = Number(it.unitPrice) > 0 ? Number(it.unitPrice) : (Number(it.qty) > 0 ? Number(it.cost) / Number(it.qty) : Number(it.cost));
    return { name: it.name, unit: it.unit, cost: u };
  }).filter((x) => x.cost > 0) : [];
  return (lines || []).map((l) => {
    let r = matchBookLine(l, books);
    let src = r && r.unitPrice != null ? "book" : null;
    let note = (r && r.note) || "";
    const mismatch = !!(r && r.mismatch);
    if (!r || r.unitPrice == null) {
      const r2 = matchBookLine({ name: l.name, unit: l.unit }, llmBook); // LLM fallback: name+unit only
      if (r2 && r2.unitPrice != null) { r = r2; src = "ai"; note = r2.note || note; }
    }
    const up = r && r.unitPrice != null ? r.unitPrice : null;
    return {
      name: l.name, qty: l.qty, unit: l.unit,
      unitPrice: up != null ? up : 0,
      cost: up != null ? Math.round(up * l.qty) : 0,
      unpriced: up == null, priceSrc: src,
      priceNote: note || (up == null && mismatch ? ("book price is per " + r.bookUnit + " — takeoff needs per " + r.wantUnit + "; tap to set") : ""),
    };
  });
}
// MIXED-system reprice (DEFECT A): keep the LLM's item lines + quantities (the preflight verified
// them) and run a PRICE-ONLY pass — book-first + unit-aware + category-assisted. A clean book match
// wins; otherwise the LLM's own price is kept (never zeroed), with a note if a unit mismatch blocked
// the book row.
function repriceLlmItems(items, books) {
  return (items || []).map((it) => {
    const qty = Number(it.qty) || 0;
    const line = { name: it.name, unit: it.unit, key: roofLineKey(it.name) };
    const r = matchBookLine(line, books);
    if (r && r.unitPrice != null) {
      return Object.assign({}, it, { unitPrice: r.unitPrice, cost: Math.round(r.unitPrice * qty), unpriced: false, priceSrc: "book", priceNote: r.note || "" });
    }
    if (r && r.mismatch) return Object.assign({}, it, { priceNote: "book has $/" + r.bookUnit + " (needs $/" + r.wantUnit + ") — kept AI price; tap to set" });
    return it;
  });
}
// (Removed the OLD token-overlap priceFromBook + priceRoofTakeoff duplicates that used to live here:
// as later declarations they SHADOWED the unit-aware versions above, so pure non-shingle roofs were
// pricing without unit-awareness / the C.5 guard / category-assist. The versions above are now the
// only definitions — see matchBookLine.)
// ===== COMMERCIAL FLAT ROOF (TPO/EPDM) — good/better/best tier assemblies =====
// The engine builds 3 complete flat-membrane assemblies that vary on the 4 levers a
// commercial customer actually chooses between: membrane thickness (mil), attachment
// (mechanically fastened vs fully adhered), insulation R-value, and NDL warranty term.
// Seed $/unit costs are placeholders (flagged ⚠️ in the takeoff) — the contractor tunes
// them; the TIER DELTAS (mil/R/coverboard/attachment) drive the good/better/best spread.
// NY ENERGY CODE (locked): flat-roof insulation default = TWO staggered layers of 3in polyiso
// (~R-34 total) on any tear-off-to-deck — NEVER a single layer. All tiers carry it; they
// differentiate on membrane mil / attachment / coverboard / NDL term.
const FLAT_TIERS = [
  { tier: "Good",   mil: 45, attach: "mech",    attachLabel: "Mechanically fastened", isoR: 34, coverboard: false, ndl: 15 },
  { tier: "Better", mil: 60, attach: "adhered", attachLabel: "Fully adhered",         isoR: 34, coverboard: false, ndl: 20 },
  { tier: "Best",   mil: 80, attach: "adhered", attachLabel: "Fully adhered",         isoR: 34, coverboard: true,  ndl: 30 },
];
const FLAT_DEFAULT_TIER = "Better"; // middle tier = the one shown in the editable takeoff + MOST POPULAR
const FLAT_SEED = {
  tpo:  { 45: 48, 60: 62, 80: 88 },   // membrane $/SQ by mil
  epdm: { 45: 58, 60: 74, 90: 102 },
  isoPerR: 4.6,   // $/SQ per R-point (polyiso)
  cover: 46,      // $/SQ HD coverboard
  adhesive: 145,  // $/bucket (~3 SQ bonded)
  fastener: 0.12, // $/ea iso fastener + plate (short); long screws priced up in-line
  hdSeamFast: 0.85, // $/ea heavy-duty seam fastener + plate (mech-attached membrane seams)
  seam: 82,       // $/roll seam tape
  term: 2.6,      // $/LF termination bar
  lockerLF: 1.79, // $/LF galvanized 24ga continuous locker (invoice #1851, Roof Metals Supply)
  underplate: 4.75, // $/ea underplate — one at every 10ft cap seam (invoice #1851)
  memBoot: 34,    // $/ea pre-molded membrane pipe boot (QuickSeam / weldable TPO)
  pen: 38,        // $/ea boot / drain (legacy generic)
};
// CUSTOM METAL FAB priced by 4x10 SHEET YIELD (how the supplier actually prices — a STEP
// function, don't smooth it): piecesPerSheet = floor(48 / cutWidthIn) (cut width = inches of
// FLAT STOCK consumed incl. hems/kicks, not the finished face); LF/sheet = pieces x 10;
// $/LF = sheetRate / LFperSheet. Calibration: invoice #1851 (Roof Metals Supply, 06/2026,
// 24-ga Fabral Kynar) — 9.5in cut @ $3.11/LF → 5/sheet → 50 LF/sheet → sheetRate $155.50.
const SHEET_RATE_24_KYNAR = 155.5;
function sheetYield(cutWidthIn, sheetRate) {
  const cw = Number(cutWidthIn) || 0, rate = Number(sheetRate) > 0 ? Number(sheetRate) : SHEET_RATE_24_KYNAR;
  if (!(cw > 0) || cw > 48) return null;
  const pieces = Math.floor(48 / cw);
  if (!(pieces > 0)) return null;
  const lfPerSheet = pieces * 10;
  return { pieces, lfPerSheet, perLF: Math.round((rate / lfPerSheet) * 100) / 100 };
}
// Deck type from the job text — drives iso-fastener LENGTH and family on flat jobs.
function deckTypeOf(s) {
  const t = String(s || "").toLowerCase();
  if (/steel deck|metal deck|\bb-?deck\b|fluted/.test(t)) return "steel";
  if (/wood deck|plank|plywood|osb|wood fiber/.test(t)) return "wood";
  if (/concrete deck|structural concrete/.test(t)) return "concrete";
  if (/gypsum|tectum|lightweight fill/.test(t)) return "gypsum";
  return "";
}
// Iso fastener length: thread must reach >=1in PAST the deck bottom, rounded UP to stocked
// lengths. Steel (22-20ga): stack + ~1in past the flute. Wood: stack + deck (~3/4in) + 1in.
// Concrete/gypsum: different fastener family entirely — never standard HD screws.
// PRODUCTION-RATE SANITY (warn only, never block): plausible MH-per-unit ranges keyed by unit.
// Real incident: BUR removal entered 0.24 (meant 0.24 sq/hr = 4.17 MH/sq) — engine read 0.24 MH/sq,
// underbidding an 84-sq tear-off ~17x (20 hrs instead of ~350). Known intentional outliers exist
// (SS ridge cap 1.0 MH/LF is CORRECT) — hence sanityAck, never auto-"fixing".
const RATE_SANITY = { sq: [0.1, 8], sqft: [0.005, 0.3], sf: [0.005, 0.3], lf: [0.01, 1.5], ea: [0.1, 6], pc: [0.1, 6], pcs: [0.1, 6] };
// TASK-AWARE override (the spec's "per-category overrides"): per-sq TEAR-OFF/REMOVAL work never
// runs under ~0.8 MH/sq — this is what catches the inverted BUR 0.24 without false-flagging legit
// accessory rates (underlayment 0.15/sq, I&W 0.25/sq) that live inside the generic sq range.
const rateSanityOf = (unit, task) => {
  const u = String(unit || "").trim().toLowerCase();
  const base = RATE_SANITY[u] || null;
  if (base && u === "sq" && /tear.?off|remov|demo/i.test(String(task || ""))) return [0.8, 8];
  return base;
};
const rateRecip = (v) => (num(v) > 0 ? Math.round((1 / num(v)) * 1000) / 1000 : 0);
const rateOutOfRange = (r) => { const s = rateSanityOf(r.unit, r.task); return !!(s && !r.sanityAck && (num(r.rate) < s[0] || num(r.rate) > s[1])); };
const FASTENER_STOCK = [3, 4, 5, 6, 7, 8, 10, 12];
function isoFastenerLength(stackIn, deck) {
  if (!(stackIn > 0)) return null;
  if (deck === "concrete") return { special: "structural concrete — masonry anchors / adhesive-set, price manually" };
  if (deck === "gypsum") return { special: "gypsum/tectum deck — specialty toggle fasteners, price manually" };
  const need = stackIn + (deck === "wood" ? 1.75 : 1);
  const len = FASTENER_STOCK.find((L) => L >= need) || FASTENER_STOCK[FASTENER_STOCK.length - 1];
  return { need: Math.round(need * 10) / 10, len };
}
function flatMembraneOf(sys) { return /\bepdm\b|rubber/.test((sys || "").toLowerCase()) ? "EPDM" : "TPO"; }
function flatMilFor(membrane, mil) { return (membrane === "EPDM" && mil === 80) ? 90 : mil; } // EPDM's premium is 90mil, not 80
function flatIsoLayers(r) { return r >= 28 ? 2 : 1; }
function flatLaborHours(sq, membrane, tier, reroof) {
  const memb = tier.attach === "adhered"
    ? (membrane === "EPDM" ? 1.54 : 1.6)    // MH/SQ fully adhered
    : (membrane === "EPDM" ? 1.14 : 1.18);  // MH/SQ mechanically fastened
  let mh = sq * memb;
  mh += sq * 0.5 * flatIsoLayers(tier.isoR);  // polyiso install per layer
  if (tier.coverboard) mh += sq * 0.5;        // coverboard
  mh += sq * 0.15;                            // edge / details / flashing allowance
  if (reroof) mh += sq * 1.5;                 // tear-off (one layer)
  return Math.max(1, Math.round(mh));
}
function flatTierAssembly(dims, membrane, tier, reroof, ctx) {
  const m = parseMeas(dims);
  if (!m.area) return null;
  const up = Math.ceil, sqr = (n) => Math.round(n * 10) / 10;
  const sq = m.area / 100;
  const eaveRake = (m.eaves + m.rakes) || (m.drip || 0);
  const mil = flatMilFor(membrane, tier.mil);
  const isoLayers = flatIsoLayers(tier.isoR); // R-34 -> 2 (NY code: 2 x 3in staggered)
  const seed = FLAT_SEED[membrane.toLowerCase()] || FLAT_SEED.tpo;
  const sline = (name, qty, unit, unitPrice, extra) => Object.assign({ name, qty, unit, unitPrice: Math.round(unitPrice * 100) / 100, cost: Math.round(unitPrice * qty), placeholder: true, priceTier: "seed", unpriced: false, matchType: null }, extra || {});
  const items = [];
  items.push(sline(mil + "mil " + membrane + " membrane (" + tier.attachLabel.toLowerCase() + ")", sqr(sq * 1.10), "SQ", seed[mil] || (membrane === "EPDM" ? 74 : 62)));
  // NY code: 2 x 3in staggered polyiso, priced AS 3in board (never thickness built from 1in
  // sheet counts). ~area/32 boards per layer +5% waste rides in the note for ordering.
  items.push(sline("Polyiso insulation 3in x 2 staggered layers (R-" + tier.isoR + ", NY code)", sqr(sq * isoLayers), "SQ", FLAT_SEED.isoPerR * (tier.isoR / isoLayers), { priceNote: up((m.area / 32) * 1.05) + " boards/layer (4x8, +5% waste) x " + isoLayers + " layers — joints staggered" }));
  if (tier.coverboard) items.push(sline("Coverboard (1/2in HD)", sqr(sq), "SQ", FLAT_SEED.cover));
  if (tier.attach === "adhered") items.push(sline("Bonding adhesive", up(sq / 3) || 1, "bucket", FLAT_SEED.adhesive));
  // ISO ATTACHMENT — density by method (Caza/Elevate field rates): fully adhered (incl. SA)
  // membrane = 16 fasteners+plates per 32SF board (top layer); mech-attached = 6/board + 1 HD
  // seam fastener per LF of membrane seam. Length: stack + penetration by DECK, rounded up.
  const deck = deckTypeOf(ctx || "");
  const stack = isoLayers * 3 + (tier.coverboard ? 0.5 : 0);
  const fl = isoFastenerLength(stack, deck || "steel");
  const perBoard = tier.attach === "adhered" ? 16 : 6;
  items.push(sline("Iso fasteners" + (fl && fl.len ? " " + fl.len + "in" : "") + " + plates (" + perBoard + "/board" + (deck ? ", " + deck + " deck" : ", deck assumed steel — confirm") + ")", up((m.area / 32) * perBoard), "ea", FLAT_SEED.fastener + (fl && fl.len >= 7 ? 0.1 : 0), { priceNote: (fl && fl.special) ? fl.special : (fl ? (stack + "in stack + penetration → " + fl.len + "in screws · field-rate density — verify perimeter/corner enhancement (Elevate zones)") : "") }));
  if (tier.attach === "mech") items.push(sline("HD seam fasteners + plates (1 per LF of membrane seam)", up(m.area / 10), "ea", FLAT_SEED.hdSeamFast));
  // seam tape follows SEAM LF (area / ~10ft sheet width, 100' rolls) — the old 1-roll-per-SQ
  // heuristic was ~10x reality on wide-sheet membrane (317 rolls on a 311-SQ job vs ~31 real)
  items.push(sline("Seam / cover tape", up((m.area / 10) / 100) || 1, "roll", FLAT_SEED.seam));
  if (eaveRake) items.push(sline("Termination bar", up(eaveRake), "LF", FLAT_SEED.term));
  // CAZA PERIMETER METAL DETAIL — an ASSEMBLY, never one line: 24ga Kynar cap (sheet-yield
  // priced, +5% waste) + galvanized continuous locker the SAME LF + underplates at every 10ft
  // seam + substrate fasteners (invoice #1851 rates — national coping $/LF is ~4x Caza's real cost).
  if (eaveRake) {
    const capY = sheetYield(9.5, SHEET_RATE_24_KYNAR);
    items.push(sline("Perimeter cap metal 24ga Kynar (custom fab, 10ft pcs)", up(eaveRake * 1.05), "LF", capY.perLF, { fabMetal: true, cutW: 9.5, sheetRate: SHEET_RATE_24_KYNAR, priceNote: "9.5in cut → " + capY.pieces + "/sheet → $" + capY.perLF + "/LF @ $" + SHEET_RATE_24_KYNAR + "/4x10 sheet — set the real cut width (✂) per job; coping girth 20-24in ≈ $7.78/LF" }));
    items.push(sline("Continuous locker 24ga galvanized (full perimeter — cap hooks on)", up(eaveRake), "LF", FLAT_SEED.lockerLF));
    items.push(sline("Underplates (one at every 10ft cap seam)", up(eaveRake / 10), "ea", FLAT_SEED.underplate));
  }
  // FLAT/MEMBRANE roofs take PRE-MOLDED MEMBRANE BOOTS only — never shingle-style Lifetime boots.
  if (m.pens) items.push(sline("Membrane pipe boots (pre-molded " + membrane + ", clamped + lap-sealed)", m.pens, "ea", FLAT_SEED.memBoot));
  const matCost = items.reduce((a, b) => a + (b.cost || 0), 0);
  return {
    tier: tier.tier, membrane, mil, attachLabel: tier.attachLabel, isoR: tier.isoR, coverboard: tier.coverboard, ndl: tier.ndl,
    name: mil + "mil " + membrane + " · " + tier.attachLabel,
    why: "R-" + tier.isoR + " insulation" + (tier.coverboard ? " + HD coverboard" : "") + " · " + tier.ndl + "-yr NDL warranty",
    items, laborHours: flatLaborHours(sq, membrane, tier, reroof), matCost,
  };
}
function flatTierAssemblies(dims, sys, desc) {
  if (!parseMeas(dims).area) return null;
  const ctx = ((sys || "") + " " + (desc || "")).toLowerCase();
  const membrane = flatMembraneOf(ctx);
  const reroof = /tear|re-?roof|existing|replace|remove|recover|overlay/.test(ctx);
  const tiers = FLAT_TIERS.map((t) => flatTierAssembly(dims, membrane, t, reroof, ctx)).filter(Boolean);
  return tiers.length ? { membrane, tiers } : null;
}
// ===== deterministic ROOF material takeoff from measurements (code does the math) =====
// Returns a COMPLETE, type-specific material line list with quantities. Shingle is
// unchanged (verified-correct). Non-shingle types (metal/flat/tile) get their full
// real material list so materials no longer come back near-zero.
function computeRoofQuantities(dims, system, panelWidthIn) {
  const m = parseMeas(dims);
  if (!m.area) return null;
  const up = Math.ceil;
  const sqr = (n) => Math.round(n * 10) / 10;
  const out = [];
  const type = roofTypeOf(system);
  const sq = m.area / 100;
  const eaveRake = (m.eaves + m.rakes) || (m.drip || 0);
  const ridgeHip = (m.ridges || 0) + (m.hips || 0);
  const valleyHip = (m.valleys || 0) + (m.hips || 0);
  const waste = 1.08 + Math.min(0.22, 2.4 * (m.area > 0 ? valleyHip / m.area : 0));

  if (type === "metal") {
    out.push({ key: "panel", name: "Standing-seam metal panels (24ga)", qty: sqr(sq * waste), unit: "SQ" });
    out.push({ key: "clip", name: "Concealed clips / cleats", qty: up(m.area / 4), unit: "ea" });
    out.push({ key: "screw", name: "Clip & trim fasteners", qty: up(m.area / 4), unit: "ea" });
    out.push({ key: "iw", name: "High-temp underlayment", qty: sqr(sq * 1.10), unit: "SQ" });
    if (ridgeHip) out.push({ key: "ridge", name: "Ridge / hip cap (metal)", qty: up(ridgeHip), unit: "LF" });
    if (m.eaves) out.push({ key: "drip", name: "Eave trim / drip edge (metal)", qty: up(m.eaves), unit: "LF" });
    if (m.rakes) out.push({ key: "rake", name: "Rake / gable trim (metal)", qty: up(m.rakes), unit: "LF" });
    if (m.valleys) out.push({ key: "valley", name: "Valley metal", qty: up(m.valleys), unit: "LF" });
    if (m.flashing || m.stepflash) out.push({ key: "flash", name: "Sidewall / headwall flashing", qty: up((m.flashing || 0) + (m.stepflash || 0)), unit: "LF" });
    out.push({ key: "closure", name: "Ridge / eave closures (foam/metal)", qty: up(ridgeHip + m.eaves), unit: "LF" });
    out.push({ key: "butyl", name: "Butyl / seam sealant tape", qty: up((ridgeHip + m.eaves + m.rakes + m.valleys) / 50) || 1, unit: "roll" });
    out.push({ key: "sealant", name: "Sealant tubes", qty: up(m.area / 600) || 1, unit: "ea" });
    if (m.pens) out.push({ key: "pen", name: "Pipe boots / penetration flashings", qty: m.pens, unit: "ea" });
    out.push({ key: "snow", name: "Snow guards", qty: up(m.eaves), unit: "LF" });
  } else if (type === "agpanel") {
    // exposed-fastener / ribbed AG panel — through-fastened, NO concealed clips
    out.push({ key: "panel", name: "AG / exposed-fastener panels (29ga)", qty: sqr(sq * waste), unit: "SQ" });
    out.push({ key: "screw", name: "Exposed-fastener panel screws (w/ washer)", qty: up(m.area * 0.8), unit: "ea" });
    out.push({ key: "iw", name: "Synthetic underlayment", qty: sqr(sq * 1.10), unit: "SQ" });
    if (ridgeHip) out.push({ key: "ridge", name: "Ridge cap (metal)", qty: up(ridgeHip), unit: "LF" });
    if (m.eaves) out.push({ key: "drip", name: "Eave trim / drip edge (metal)", qty: up(m.eaves), unit: "LF" });
    if (m.rakes) out.push({ key: "rake", name: "Rake / gable trim (metal)", qty: up(m.rakes), unit: "LF" });
    out.push({ key: "closure", name: "Inside / outside foam closures", qty: up(ridgeHip + m.eaves), unit: "LF" });
    if (m.valleys) out.push({ key: "valley", name: "Valley metal", qty: up(m.valleys), unit: "LF" });
    if (m.flashing || m.stepflash) out.push({ key: "flash", name: "Sidewall / headwall flashing", qty: up((m.flashing || 0) + (m.stepflash || 0)), unit: "LF" });
    out.push({ key: "butyl", name: "Butyl sealant tape (laps/closures)", qty: up((ridgeHip + m.eaves + m.rakes) / 50) || 1, unit: "roll" });
    out.push({ key: "sealant", name: "Sealant tubes", qty: up(m.area / 600) || 1, unit: "ea" });
    if (m.pens) out.push({ key: "pen", name: "Pipe boots / penetration flashings", qty: m.pens, unit: "ea" });
  } else if (type === "flat") {
    out.push({ key: "field", name: "Membrane (60mil TPO/EPDM)", qty: sqr(sq * 1.10), unit: "SQ" });
    // NY code: TWO staggered layers of 3in polyiso (~R-34) — never a single layer; 3in priced as 3in board
    out.push({ key: "iso", name: "Polyiso insulation 3in x 2 staggered layers (R-34, NY code)", qty: sqr(sq * 2), unit: "SQ" });
    out.push({ key: "cover", name: "Coverboard (1/2in HD)", qty: sqr(sq), unit: "SQ" });
    out.push({ key: "fast", name: "Iso fasteners + plates (16/board, fully-adhered spec)", qty: up(m.area / 2), unit: "ea" }); // 16 per 32SF board
    out.push({ key: "adh", name: "Bonding adhesive", qty: up(sq) || 1, unit: "bucket" });
    out.push({ key: "seam", name: "Seam / cover tape", qty: up((m.area / 10) / 100) || 1, unit: "roll" }); // seam LF (10ft sheets) / 100' rolls — not 1/SQ
    if (eaveRake) out.push({ key: "term", name: "Termination bar", qty: up(eaveRake), unit: "LF" });
    // CAZA PERIMETER DETAIL: cap + continuous locker (same LF) + underplates at every 10ft seam
    if (eaveRake) out.push({ key: "edge", name: "Perimeter cap metal 24ga Kynar (custom fab, 10ft pcs)", qty: up(eaveRake * 1.05), unit: "LF" });
    if (eaveRake) out.push({ key: "locker", name: "Continuous locker 24ga galvanized (full perimeter)", qty: up(eaveRake), unit: "LF" });
    if (eaveRake) out.push({ key: "uplate", name: "Underplates (one per 10ft cap seam)", qty: up(eaveRake / 10), unit: "ea" });
    if (m.pens) out.push({ key: "pen", name: "Membrane pipe boots (pre-molded)", qty: m.pens, unit: "ea" });
  } else if (type === "tile") {
    out.push({ key: "field", name: "Roof tiles (concrete/clay)", qty: sqr(sq * 1.12), unit: "SQ" });
    out.push({ key: "iw", name: "2-ply / high-temp underlayment", qty: sqr(sq * 1.10), unit: "SQ" });
    out.push({ key: "batten", name: "Battens", qty: sqr(sq), unit: "SQ" });
    out.push({ key: "fast", name: "Tile fasteners / clips / wire", qty: up(m.area / 3), unit: "ea" });
    if (ridgeHip) out.push({ key: "ridge", name: "Hip & ridge tiles", qty: up(ridgeHip), unit: "LF" });
    if (ridgeHip) out.push({ key: "closure", name: "Ridge / hip closure (foam/mortar)", qty: up(ridgeHip), unit: "LF" });
    if (m.valleys) out.push({ key: "valley", name: "Valley metal / flashing", qty: up(m.valleys), unit: "LF" });
    if (m.eaves) out.push({ key: "eaveclose", name: "Eave closures / birdstops", qty: up(m.eaves), unit: "LF" });
    if (m.pens) out.push({ key: "pen", name: "Pipe boots / penetrations", qty: m.pens, unit: "ea" });
  } else {
    // SHINGLE — unchanged (verified-correct).
    out.push({ key: "field", name: "Field roofing", qty: up((m.area * 1.12) / 100), unit: "sq" });
    if (m.eaves) out.push({ key: "starter", name: "Starter", qty: up((m.eaves * 1.10) / 100), unit: "bundle" });
    if (m.ridges + m.hips) out.push({ key: "ridge", name: "Hip/ridge cap", qty: up(((m.ridges + m.hips) * 1.10) / 30), unit: "bundle" });
    const iwNum = (m.eaves * 2) + m.valleys + m.flashing + m.stepflash;
    if (iwNum) out.push({ key: "iw", name: "Ice & water", qty: up(iwNum / 66), unit: "roll" });
    if (eaveRake) out.push({ key: "drip", name: "Drip edge (10ft)", qty: up((eaveRake * 1.15) / 10) * 10, unit: "LF" });
    // F3 + F6 (Dustin, locked): shingle valleys are CLOSED — 14in aluminum ROLL (1 roll per 50 LF)
    // + I&W beneath (the I&W formula above already counts valleys). The old qty `up(valleys/50)*10`
    // mixed the roll formula with a stick length (38 LF of valley -> "10 LF") — rolls now, no x10.
    if (m.valleys) out.push({ key: "valley", name: "Valley flashing — 14in aluminum roll (closed valley)", qty: up(m.valleys / 50) || 1, unit: "roll" });
    if (m.stepflash) out.push({ key: "step", name: "Step flashing", qty: up(m.stepflash / 25), unit: "bundle" });
    if (m.pens) out.push({ key: "pen", name: "Pipe boots / penetrations", qty: m.pens, unit: "ea" });
  }
  return out;
}

function computeLaborFromRateBook(items, rateBook, estDims, scope, desc) {
  if (!Array.isArray(rateBook) || !rateBook.length) return null;
  const ctx = ((scope || "") + " " + (desc || "")).toLowerCase();
  // find a rate-book entry whose task name loosely matches any of the given keywords
  const findRate = (kws) => {
    for (let i = 0; i < rateBook.length; i++) {
      const t = (rateBook[i].task || "").toLowerCase();
      for (let j = 0; j < kws.length; j++) { if (t.indexOf(kws[j]) >= 0) return rateBook[i]; }
    }
    return null;
  };
  // pull a quantity (in the rate's unit) from the takeoff items by keyword + unit family
  const qtyFor = (nameKws, unitFamily) => {
    let q = 0;
    items.forEach((it) => {
      const nm = (it.name || "").toLowerCase();
      const un = (it.unit || "").toLowerCase();
      const nameHit = nameKws.some((k) => nm.indexOf(k) >= 0);
      if (!nameHit) return;
      if (unitFamily === "sq" && (un === "sq" || un.indexOf("square") >= 0)) q = Math.max(q, num(it.qty));
      else if (unitFamily === "lf" && (un === "lf" || un.indexOf("linear") >= 0)) q = Math.max(q, num(it.qty));
      else if (unitFamily === "ea" && (un === "ea" || un.indexOf("each") >= 0 || un === "pc" || un === "pcs")) q += num(it.qty);
    });
    return q;
  };
  // total squares on the job (for primary install + tear-off)
  let squares = 0;
  items.forEach((it) => { const un = (it.unit || "").toLowerCase(); if (un === "sq" || un.indexOf("square") >= 0) squares = Math.max(squares, num(it.qty)); });
  if (!squares && estDims) { const m = String(estDims).match(/([\d,]+(?:\.\d+)?)\s*sqft/i); if (m) squares = (num(String(m[1]).replace(/,/g, "")) || 0) / 100; }

  // difficulty multiplier from pitch + complexity (single combined factor, capped 1.5)
  let mult = 1.0;
  const dl = (estDims || "").toLowerCase();
  const pitchM = dl.match(/(\d{1,2})\/12/);
  const pitch = pitchM ? parseInt(pitchM[1], 10) : 0;
  if (pitch >= 10) mult = 1.45; else if (pitch >= 8) mult = 1.35; else if (pitch >= 6) mult = 1.2;
  if (dl.indexOf("complex") >= 0) mult = Math.min(1.5, mult + 0.1);
  if (mult > 1.5) mult = 1.5;

  let hours = 0; let matched = false; let sqHours = 0; // sqHours = the per-square bulk (install + tear-off)
  const insCtx = installScope(ctx); // F13: the INSTALLED system picks the rate — never the roof being torn off
  // H1 (the $5k template flip): a MIXED roof's install labor covers BOTH systems, computed IN CODE
  // from the PARTITIONED quantities — shingle rate x field SQ + metal rate x band SQ (one difficulty
  // factor). If either rate or the partition is missing, return null (AI total + floor) rather than
  // bid half the install labor.
  if (/roof/.test(ctx) && roofIsMixed(insCtx) && squares > 0) {
    const bp = bandPartition(estDims, insCtx, "", 0);
    const shR = findRate(["shingle install", "shingle"]);
    const ssR = findRate(["standing seam"]) || findRate(["steel panel", "ag panel"]);
    if (!(shR && ssR && bp.bandSQ > 0 && bp.fieldSQ > 0)) return null;
    const h = (bp.fieldSQ * num(shR.rate) + bp.bandSQ * num(ssR.rate)) * mult;
    hours += h; sqHours += h; matched = true;
  } else {
  // 1) PRIMARY INSTALL (per square) — pick the rate matching the system
  let instRate = null;
  if (/standing seam|lok|snap.?lock|mechanical lock/.test(insCtx)) instRate = findRate(["standing seam"]);
  else if (/slate|nu-?lok/.test(insCtx)) instRate = findRate(["slate"]);
  else if (/shake/.test(insCtx)) instRate = findRate(["shake"]);
  else if (/shingle|asphalt/.test(insCtx)) instRate = findRate(["shingle install", "shingle"]);
  else if (/tpo/.test(insCtx)) instRate = findRate(["tpo"]);
  else if (/epdm/.test(insCtx)) instRate = findRate(["epdm"]);
  else if (/metal panel|exposed fastener|ag panel|steel panel/.test(insCtx)) instRate = findRate(["steel panel", "ag panel"]);
  if (instRate && squares > 0) { const h = squares * num(instRate.rate) * mult; hours += h; sqHours += h; matched = true; }
  }

  // 2) TEAR-OFF (per square, not multiplied by pitch difficulty)
  if (/tear|re-?roof|remove|layer/.test(ctx)) {
    const tr = findRate(["tear-off asphalt", "tear-off — shingles", "tear-off shingles", "tear-off"]);
    if (tr && squares > 0) { const h = squares * num(tr.rate); hours += h; sqHours += h; matched = true; }
  }
  // 3) PERIMETER / RIDGE / FLASHING metal by LF (not pitch-multiplied)
  const lfTasks = [
    { kws: ["drip edge", "perimeter metal", "eave", "rake"], rate: ["drip edge"] },
    { kws: ["ridge"], rate: ["ridge"] },
    { kws: ["gutter"], rate: ["gutter"] },
  ];
  lfTasks.forEach((lt) => {
    const q = qtyFor(lt.kws, "lf");
    const r = findRate(lt.rate);
    if (q > 0 && r) { hours += q * num(r.rate); matched = true; }
  });

  if (!matched || hours <= 0) return null;
  // A sized (per-square) job where ONLY perimeter/flashing matched is INCOMPLETE —
  // the big install + tear-off hours were dropped (the 36-MH-on-102-sq bug). Return
  // null so the caller falls back to the AI total + size-scaled floor instead of
  // trusting a partial that would underbid the labor.
  if (squares > 0 && sqHours <= 0) return null;
  return { hours: Math.round(hours), mult: mult };
}

// Realistic minimum man-hours for a sized job — RAISES an implausibly low labor
// total (dropped tear-off/install), never lowers a legit one. Shared by the
// categories estimator and the house non-deterministic path so roofing labor
// can't underbid in either (the BUG-1 fix, kept DRY).
function realisticLaborFloor(sqGuess, dims, sysStr, isRoof) {
  if (!(sqGuess > 0)) return 0;
  let perSq = 2; // generic sized trade (siding, etc.)
  if (isRoof) {
    const dl = (dims || "").toLowerCase();
    const pm = dl.match(/(\d{1,2})\/12/);
    const pitch = pm ? parseInt(pm[1], 10) : 0;
    let rmult = 1.0; if (pitch >= 10) rmult = 1.45; else if (pitch >= 8) rmult = 1.35; else if (pitch >= 6) rmult = 1.2;
    if (dl.indexOf("complex") >= 0 || (sysStr || "").indexOf("complex") >= 0) rmult = Math.min(1.5, rmult + 0.1);
    const tearoff = /tear|re-?roof|remove|layer/.test(sysStr || "");
    perSq = 1.8 * rmult + (tearoff ? 1.0 : 0); // pitch-adjusted install + tear-off
  }
  return Math.round(sqGuess * perSq);
}

// Per-trade BURDENED labor-rate FLOOR ($/hr) — a safety net so no trade ever prices
// labor below a real loaded cost (base wage + comp + payroll taxes + overhead). The
// per-trade split reflects comp/insurance + skill + height premium; floors are still
// overridable, and the calibration loop tunes the real rate from logged actuals.
function burdenedRateFloor(scope, desc) {
  const s = ((scope || "") + " " + (desc || "")).toLowerCase();
  if (/standing seam|metal panel|snap.?lock|\blok\b|slate/.test(s)) return 72; // steep/specialty roofing — highest height + skill premium
  if (/roof|shingle|tpo|epdm|flat roof|membrane/.test(s)) return 65;            // roofing in general
  if (/electric/.test(s)) return 70;
  if (/plumb/.test(s)) return 70;
  if (/hvac|furnace|heat pump|mini.?split|\bduct/.test(s)) return 68;
  if (/concrete|masonry|foundation|footing|\bslab|stucco/.test(s)) return 55;
  if (/siding|fiber.?cement|hardie/.test(s)) return 55;
  return 50; // framing / general carpentry / trim / drywall / paint / deck — base burdened floor
}

// SYSTEM PURITY (BUG 8): deterministically drop takeoff lines that belong to a
// DIFFERENT roofing/siding system than the job's, so a shingle roof can't ship
// metal-panel/standing-seam lines (and vice-versa). Targets system-specific
// products only — never generic accessories (drip edge, valley metal, step
// flashing are used on shingle roofs too, so "metal" alone is NOT banned).
function stripCrossSystem(items, sysStr) {
  if (!Array.isArray(items)) return items || [];
  const s = (sysStr || "").toLowerCase();
  // DEFECT A: a MIXED roof (non-shingle profile band + shingle field) legitimately carries BOTH
  // systems' lines — do NOT ban either side, or the shingle half is stripped before the takeoff
  // pricer ever sees it. roofIsMixed(s) is the same detection the override uses.
  if (roofIsMixed(s)) return items;
  const metal = /standing seam|metal panel|steel panel|ag panel|snap.?lock|mechanical lock|metal roof/.test(s);
  const shingle = /shingle|asphalt|architectural|3-tab|laminate/.test(s) && !metal;
  const tpo = /\btpo\b/.test(s), epdm = /\bepdm\b/.test(s);
  const vinyl = /vinyl (siding|lap)/.test(s);
  const fiber = /fiber.?cement|hardie/.test(s);
  let banned = null;
  if (shingle) banned = /standing seam|metal panel|steel panel|ag panel|snap.?lock|mechanical lock|panel clip|concealed clip|seam tape|metal roof|kynar|pvdf|metal trim|metal drip|metal rake|\b(?:22|24|26|28|29)\s*ga\b|\b(?:22|24|26|28|29)g\b|w-?bend|w-?valley|\bcleat\b|butyl|\brivet|pancake/i;
  else if (metal) banned = /asphalt|3-tab|architectural shingle|laminate shingle|shingle bundle|starter shingle/i;
  else if (tpo) banned = /shingle|asphalt|standing seam|metal panel|epdm membrane/i;
  else if (epdm) banned = /shingle|asphalt|standing seam|metal panel|tpo membrane/i;
  else if (vinyl) banned = /fiber.?cement|hardie|cedar lap|steel siding/i;
  else if (fiber) banned = /vinyl (siding|lap)|steel siding/i;
  if (!banned) return items;
  return items.filter((it) => !banned.test(String(it && it.name || "")));
}

// ===== THE CAZA MANUAL (Parts 1+2: standard assemblies + material specs) =====
// The company's standards the Opus PREFLIGHT verifies each reasoned estimate against. The
// CONVERSATION stays unconstrained — the manual is checked at the build/commit gate, and
// deviations are FLAGGED (never silently forced or hard-blocked). Seeded with sensible
// defaults; every entry is editable in Profile, and adding a standard is a data entry, not
// a code change. Part 1 = assemblies (what a Caza job includes); Part 2 = material specs/subs.
const CAZA_MANUAL_DEFAULT = {
  assemblies: [
    { id: "cm_a_shingle", match: "shingle|asphalt|architectural", includes: ["Tear-off + haul-away", "Ice & water shield (eaves + valleys)", "Synthetic underlayment", "Owens Corning Duration shingles", "Starter strip", "Hip & ridge cap", "Ridge / intake ventilation", "Step + pipe flashing", "Drip edge", "Cleanup / magnetic sweep"], excludes: [], note: "Owens Corning Total Protection system.", walk: "deck → drip edge (eaves, under I&W) → REGULAR I&W (eaves + valleys) → synthetic underlayment → drip edge (rakes, over underlayment) → starter strip → field shingles (bottom-up) → step/headwall + pipe flashing → closed valley (14in alum roll under shingles) → hip/ridge caps + ridge vent" },
    { id: "cm_a_cedar", match: "cedar", includes: ["Cedar field siding", "Cedar fascia / rake", "Metal J-channel", "Cedar starter course", "Building paper / WRB", "Stainless / hot-dipped fasteners"], excludes: ["vinyl j-channel", "vinyl fascia"], note: "Cedar takes metal trim, never vinyl." },
    { id: "cm_a_vinylsoffit", match: "soffit", includes: ["Vinyl soffit", "F-channel receiver at the soffit-wall connection (the ONE receiver)", "Aluminum or vinyl fascia (per standard)", "Drip edge"], excludes: ["wall opening", "window opening", "J-channel at the soffit-wall connection (F-channel is the receiver — never both for the same run)"], note: "Soffit is eave trim — no wall-opening lines. F8 (Dustin, locked): soffit gets ONE receiver at the wall = F-channel; J-channel footage must not also count the soffit run." },
    { id: "cm_a_standingseam", match: "standing.?seam|snap.?lock|mechanical.?lock|nu-?lok|metal panel|metal roof", includes: ["Standing-seam panels (16in coverage)", "Metal valley / eave / rake trim", "Metal step + chimney flashing", "High-temp ice & water (under ALL steel)", "Panel hardware per grade: 26-ga SMP = concealed pancake screws through the 1in integral flange, 12in o.c. (NO clips); 24-ga Kynar = concealed clips 16in o.c. up the 1-1/2in seam + 2 pancake screws per clip"], excludes: ["asphalt flashing", "rubber gutter", "exposed-fastener / washered screws", "regular (non-high-temp) underlayment under steel"], note: "All-metal system. TWO Caza grades: Good = 26-ga SMP (flange-screw, no clips); Better/Best = 24-ga Kynar (clip-fastened). Both 16in coverage — panel LF math is identical; only hardware differs.", walk: "deck → HIGH-TEMP I&W (full coverage) → eave trim + offset cleat → panels eave-to-ridge (26-ga SMP: pancake screws through the flange 12in o.c. | 24-ga Kynar: clips 16in o.c. + 2 pancake screws/clip) → Z-closures → hip/ridge cap" },
    { id: "cm_a_metalband", match: "eave band|metal band|metal eave|band \\+ shingle", includes: ["Metal eave band at Caza standard depth 4ft up-slope (measured along the slope)", "Band panel per standing-seam grade (16in coverage)", "High-temp ice & water on the BAND area only", "Band trim + closures", "Shingle field on the REMAINING area (total minus band) with REGULAR ice & water at eaves/valleys"], excludes: ["shingle field run at the FULL roof area (double-counts the band)", "band fasteners/underlayment scaled to the full roof area"], note: "Mixed roof: PARTITION the area. band SF = eave LF x 4ft; shingle field SQ = total SQ minus band SQ; panel LF = band SF / panel coverage width. Fastener + band underlayment scale to the band area only. A band depth stated in the conversation overrides the 4ft standard.", walk: "deck → HIGH-TEMP I&W on the band (eave, band depth) → eave trim + cleat → band panels → BAND-TO-FIELD TRANSITION flashing (band top edge, lapped by the field underlayment above — a REQUIRED junction step) → regular I&W + synthetic on the field → starter → field shingles → step/pipe flashing → caps/ridge" },
    { id: "cm_a_tpo", match: "\\btpo\\b|flat roof|membrane", includes: ["TPO membrane", "Polyiso insulation (fully adhered)", "TPO-compatible flashing", "TPO fasteners / plates", "Edge metal / coping"], excludes: ["EPDM fasteners", "BUR flashing"], note: "TPO single-ply assembly.", walk: "deck → polyiso insulation → coverboard (Best tier) → membrane (adhered or mech-fastened) → welded seams / cover tape → penetrations & flashing → termination bar + edge metal/coping" },
  ],
  materials: [
    { id: "cm_m_shingle", role: "Shingle", standard: "Owens Corning Duration", subs: ["GAF Timberline HDZ", "CertainTeed Landmark"], note: "OC Total Protection system." },
    { id: "cm_m_ss_smp", role: "Standing seam — Good (economy grade)", standard: "26-ga SMP, 1in seam, integral screw flange, 16in coverage; concealed pancake screws 12in o.c. up the flange, NO clips", subs: [], note: "Flange-screw grade. Screw count ~= panel LF (12in o.c. on one flange). SKU e.g. 26G SMP A1101." },
    { id: "cm_m_ss_kynar", role: "Standing seam — Better/Best (premium grade)", standard: "24-ga Kynar, 1-1/2in seam, clip-fastened, 16in coverage; concealed clips 16in o.c. up the seam, 2 pancake screws per clip", subs: [], note: "Clip grade. Clips ~= panel LF x 0.75; screws = clips x 2." },
    { id: "cm_m_underlay", role: "Underlayment / ice & water", standard: "Synthetic underlayment; REGULAR ice & water at eaves/valleys on shingle roofs; HIGH-TEMP ice & water under ALL steel. On a MIXED roof: high-temp on the metal band, regular at the shingle field's eaves/valleys — two separate SKUs, each scoped to its own area.", subs: [], note: "I&W grade follows the system: regular = asphalt, high-temp = steel. Neither product runs across the whole roof on a mixed job." },
    { id: "cm_m_pipeflash", role: "Pipe flashing (STEEP-slope shingle/metal only)", standard: "Lifetime Tool pipe flashing", subs: [], note: "Steep-slope only — flat/membrane roofs use pre-molded membrane boots, never these." },
    { id: "cm_m_memboot", role: "Pipe boots (flat/membrane roofs)", standard: "Pre-molded membrane boots ONLY — Elevate QuickSeam (EPDM) / weldable TPO boots, ~$25-45/ea, clamped + lap-sealed or welded with the system", subs: [], note: "NEVER shingle-style Lifetime boots on membrane." },
    { id: "cm_m_flatiso", role: "Flat-roof insulation (NY energy code)", standard: "TWO staggered layers of 3in polyiso (~R-34 total) on any tear-off-to-deck — never a single layer. Existing-insulation-stays jobs: add iso to bring the TOTAL assembly to >=R-34 and ask about the moisture survey.", subs: [], note: "Price 3in board AS 3in board — never build thickness from 1in sheet counts. Insulation labor scales with LAYER COUNT (2 layers = 2 passes)." },
    { id: "cm_m_perimmetal", role: "Perimeter edge/coping metal (Caza detail — all roofs)", standard: "ASSEMBLY, not one line: 24ga Kynar cap metal (custom fab, 10ft pieces, full perimeter +5% waste) + galvanized 24ga continuous locker the SAME LF (cap hooks onto it) + underplates ONE at every 10ft seam (LF/10, round up) + fasteners per substrate (pancake screws into wood nailer / masonry fasteners into parapet)", subs: [], note: "Sheet-yield pricing (Roof Metals Supply inv #1851): $155.50 per 24ga Kynar 4x10 sheet, fab included — 9.5in cut = $3.11/LF, locker $1.79/LF, underplates $4.75/ea. National coping pricing ($28-45/LF) is ~4x Caza's real cost — do not use it." },
    { id: "cm_m_fastdensity", role: "Iso/coverboard fastening (flat roofs)", standard: "Fully adhered (incl. SA) membrane: 16 fasteners + plates per 32SF board (top layer). Mechanically fastened: 6 per board PLUS 1 heavy-duty seam fastener per LF of membrane seam (seam LF = area / sheet width, not squares). Fastener length: stack above deck + penetration (steel +1in past flute; wood + deck + 1in), rounded UP to stocked 3/4/5/6/7/8in. Structural concrete = masonry anchors; gypsum/tectum = specialty toggles — flag both for manual pricing.", subs: [], note: "Field-rate density — verify perimeter/corner enhancement per the Elevate zone tables (detail book pending)." },
    { id: "cm_m_cedartrim", role: "Cedar siding trim / J-channel", standard: "Metal J-channel (copper / bronze / aluminum)", subs: [], note: "No vinyl trim on cedar." },
    { id: "cm_m_soffitfascia", role: "Fascia (vinyl soffit job)", standard: "Aluminum fascia", subs: ["Vinyl fascia"], note: "" },
    { id: "cm_m_soffitrecv", role: "Soffit receiver (soffit-wall connection)", standard: "F-channel", subs: [], note: "ONE receiver at the wall. J-channel LF must exclude the soffit run — F-channel AND J on the same run is a double-count." },
  ],
  // PART 5 — vendors/brands: who Caza buys from + preferred manufacturers. Injected into the Opus
  // prompt; the preflight flags a takeoff brand that isn't Caza's preferred (kind "vendor").
  vendors: {
    preferred: [
      { id: "cm_v_abc", name: "ABC Supply", note: "primary roofing / exterior supplier" },
      { id: "cm_v_srs", name: "SRS / Beacon", note: "" },
      { id: "cm_v_ss", name: "Standing-seam panel supplier", note: "standing-seam metal" },
      { id: "cm_v_rms", name: "Roof Metals Supply", note: "metal fab (Utica) — 4x10 sheet-yield pricing, 24ga Fabral Kynar" },
    ],
    brands: [
      { id: "cm_b_oc", name: "Owens Corning", note: "roofing system (Total Protection)" },
      { id: "cm_b_lt", name: "Lifetime Tool", note: "pipe flashing" },
      { id: "cm_b_ct", name: "CertainTeed", note: "" },
      { id: "cm_b_gaf", name: "GAF", note: "" },
    ],
  },
  // PART 4 — pricing: Caza's standard gross margin, the margin FLOOR (never bid below), and a job
  // minimum. Per-trade margin overrides matched to the primary trade. Delivery/mobilization charge
  // (base + miles) already lives in the cost book; tier pricing in proposalTiers. Applied client-side
  // (the margin slider + sellOf); the pricing check flags below-floor margin / below-minimum price.
  pricing: { marginStd: 30, marginFloor: 22, jobMin: 0, perTrade: [] }, // perTrade: [{id,trade,margin}]
  // PART 3 — labor: Caza's burdened crew rate ($/hr) by trade (matched first-hit, order specific→general).
  // Seeded to match the built-in rate floors so nothing changes until the contractor edits. Production
  // rates (MH/unit) already live in the editable rate book; the preflight flags labor off Caza's rate.
  labor: {
    defaultRate: 50,
    crewRates: [
      { id: "cm_l_ss", trade: "standing seam", rate: 72 }, { id: "cm_l_slate", trade: "slate", rate: 72 },
      { id: "cm_l_roof", trade: "roof", rate: 72 }, { id: "cm_l_elec", trade: "electric", rate: 70 }, // F4 (Dustin, locked): roofing burdened floor $72/hr, fires every roofing run
      { id: "cm_l_plumb", trade: "plumb", rate: 70 }, { id: "cm_l_hvac", trade: "hvac", rate: 68 },
      { id: "cm_l_side", trade: "siding", rate: 55 }, { id: "cm_l_conc", trade: "concrete", rate: 55 },
    ],
  },
};
// PART 3 — Caza's standard burdened crew rate for this job's trade (0 = no manual rate → fall to the built-in floor).
function cazaCrewRate(scope, desc, manual) {
  const lab = cazaManualOf(manual).labor;
  if (!lab) return 0;
  const ctx = ((scope || "") + " " + (desc || "")).toLowerCase().replace(/[-–—]/g, " ");
  for (const cr of (lab.crewRates || [])) { const t = (cr.trade || "").toLowerCase().trim(); if (t && ctx.indexOf(t) >= 0 && num(cr.rate) > 0) return num(cr.rate); }
  return num(lab.defaultRate) || 0;
}
// PART 4 — Caza pricing rules. cazaPricing normalizes; the rest read the standard/floor/minimum.
function cazaPricing(manual) { const p = cazaManualOf(manual).pricing; return p || CAZA_MANUAL_DEFAULT.pricing; }
// Standard gross margin for the job — a per-trade override matched to the primary trade, else the std.
function cazaMarginStd(trades, manual) {
  const p = cazaPricing(manual);
  const primary = (trades && trades[0]) || null;
  if (primary && Array.isArray(p.perTrade)) {
    const ctx = ((primary.label || "") + " " + (primary.title || "") + " " + (primary.tradeKey || "")).toLowerCase().replace(/[-–—]/g, " ");
    for (const o of p.perTrade) { const t = (o.trade || "").toLowerCase().trim(); if (t && ctx.indexOf(t) >= 0 && num(o.margin) > 0) return num(o.margin); }
  }
  return num(p.marginStd) > 0 ? num(p.marginStd) : 30;
}
function cazaMarginFloor(manual) { return num(cazaPricing(manual).marginFloor) || 0; }
function cazaJobMin(manual) { return num(cazaPricing(manual).jobMin) || 0; }
// SCOPE INTEGRITY (Leak B) — material FAMILY of a system/product string. Good/better/best tiers
// must stay in the job's specified family (cedar/wood → wood options, never vinyl). "" = unknown
// (don't false-flag a generic brand). Only CLEAR cross-family keywords are flagged off-family.
function materialFamily(s) {
  const t = (s || "").toLowerCase();
  if (/standing.?seam|metal panel|steel panel|ag panel|snap.?lock|metal roof|kynar|\bpvdf\b/.test(t)) return "metal";
  if (/\btpo\b|\bepdm\b|\bpvc\b membrane|single.?ply|membrane|\bbur\b|modified bitumen|flat roof/.test(t)) return "membrane";
  if (/\bslate\b/.test(t)) return "slate";
  if (/\btile\b|clay tile|concrete tile/.test(t)) return "tile";
  if (/asphalt|architectural|3-?tab|laminate shingle|\bshingle\b/.test(t) && !/cedar|wood shake/.test(t)) return "shingle";
  if (/cedar|\bwood\b|clapboard|\bbevel\b|lp smartside|smartside|redwood|cypress|shake/.test(t)) return "wood";
  if (/fiber.?cement|hardie|hardi\b/.test(t)) return "fibercement";
  if (/\bvinyl\b/.test(t)) return "vinyl";
  return "";
}
// A tier option is off-family when its material family is KNOWN and DIFFERENT from the job's family.
function tierOffFamily(jobFamily, optName) {
  if (!jobFamily) return false;
  const of = materialFamily(optName);
  return of !== "" && of !== jobFamily;
}
// MATERIAL PRICING HUB (Parts 4/5) — price staleness. A row is STALE when its last-updated date is
// MISSING (unknown age reads as stale, never fresh — honesty rule) or older than PRICE_STALE_DAYS.
const PRICE_STALE_DAYS = 30;
function priceDate(e) { return (e && e.source && e.source.date) ? String(e.source.date) : ""; }
function priceSupplier(e) { return (e && e.source && e.source.supplier) ? String(e.source.supplier) : ""; }
function priceIsStale(e) { const d = priceDate(e); if (!d) return true; const t = Date.parse(d); if (isNaN(t)) return true; return (Date.now() - t) > PRICE_STALE_DAYS * 86400000; }
function priceUpdatedLabel(e) { const d = priceDate(e), sup = priceSupplier(e); return (d ? "updated " + d : "age unknown") + (sup ? " · " + sup : ""); }
// Use the contractor's edited manual if present, else the seeded default.
function cazaManualOf(manual) { return (manual && (Array.isArray(manual.assemblies) || Array.isArray(manual.materials))) ? manual : CAZA_MANUAL_DEFAULT; }
// Pick the assemblies whose job-type matches this scope; materials always travel (small list).
function cazaManualFor(scope, desc, manual) {
  const m = cazaManualOf(manual);
  const ctx = ((scope || "") + " " + (desc || "")).toLowerCase();
  const asm = (m.assemblies || []).filter((a) => { try { return new RegExp(a.match || "", "i").test(ctx); } catch (e) { return ctx.indexOf(String(a.match || "").toLowerCase()) >= 0; } });
  return { assemblies: asm, materials: m.materials || [] };
}
// Format the matched manual for the Opus preflight prompt.
function cazaManualBlock(scope, desc, manual) {
  const sel = cazaManualFor(scope, desc, manual);
  if (!sel.assemblies.length && !sel.materials.length) return "";
  let s = "THE CAZA MANUAL — verify this estimate against THIS company's standards. FLAG every deviation in \"deviations\" below; do NOT silently change or remove anything.\n";
  if (sel.assemblies.length) s += "CAZA STANDARD ASSEMBLY for this job type (what a Caza job includes end-to-end):\n" + sel.assemblies.map((a) => "- includes [" + (a.includes || []).join("; ") + "]" + ((a.excludes && a.excludes.length) ? "; NEVER [" + a.excludes.join("; ") + "]" : "") + (a.note ? " — " + a.note : "")).join("\n") + "\n";
  // ASSEMBLY WALK (Part 2): the Manual's ordered graph — the model's assemblyWalk is diffed against
  // this order at the preflight; missing/extra/reordered layers flag like material deviations.
  const __walks = sel.assemblies.filter((a) => a.walk);
  if (__walks.length) s += "CAZA ASSEMBLY ORDER (the walk — layers in INSTALL order; junctions are steps):\n" + __walks.map((a) => "- " + a.walk).join("\n") + "\nCompare YOUR assemblyWalk to this order. A MISSING layer, an EXTRA layer, or a REORDERED layer (e.g. I&W above the synthetic) is a deviation — kind \"missing\"/\"extra\"/\"material\" with a note saying what is out of order. Flag it; never silently fix.\n";
  if (sel.materials.length) s += "CAZA STANDARD MATERIALS (role → Caza standard; acceptable subs in parens):\n" + sel.materials.map((mm) => "- " + mm.role + " → " + mm.standard + ((mm.subs && mm.subs.length) ? " (subs ok: " + mm.subs.join(", ") + ")" : "") + (mm.note ? " — " + mm.note : "")).join("\n") + "\n";
  const rate = cazaCrewRate(scope, desc, manual);
  if (rate > 0) s += "CAZA STANDARD BURDENED CREW RATE for this trade: $" + rate + "/hr — use this as laborRate unless the job is genuinely unusual. If your computed burdened rate differs materially, flag a \"labor\" deviation (found=your $/hr, standard=" + rate + ").\n";
  const ven = cazaManualOf(manual).vendors;
  if (ven && ((ven.preferred && ven.preferred.length) || (ven.brands && ven.brands.length))) {
    const brands = (ven.brands || []).map((b) => b.name).filter(Boolean);
    if ((ven.preferred || []).length) s += "CAZA PREFERRED VENDORS: " + (ven.preferred || []).map((v) => v.name + (v.note ? " (" + v.note + ")" : "")).filter(Boolean).join("; ") + ".\n";
    if (brands.length) s += "CAZA PREFERRED BRANDS: " + brands.join("; ") + ". If a takeoff line uses a manufacturer/brand that is NOT one of these (and not an accepted material sub above), flag a \"vendor\" deviation (found=the brand used, standard=the Caza preferred brand for that role).\n";
  }
  return s;
}

// CALIBRATION (Feature B): turn logged job actuals into a per-trade labor factor.
// Damped so one job can't swing estimates — a single job applies 1/3 of the
// correction, 3+ jobs the full average (actual ÷ estimated) ratio.
function calibFactorFrom(jobs) {
  if (!Array.isArray(jobs) || !jobs.length) return 1;
  const ratios = jobs.map((j) => (j.est > 0 ? j.act / j.est : 0)).filter((r) => r > 0 && isFinite(r));
  if (!ratios.length) return 1;
  const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  const damp = Math.min(1, ratios.length / 3);
  return Math.round((1 + (avg - 1) * damp) * 1000) / 1000;
}

const rid = () => Math.random().toString(36).slice(2, 9);
const $0 = (n) => "$" + (Math.round(n) || 0).toLocaleString();
const num = (v) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
const errMsg = (e) => {
  const m = (e && e.message) || "unknown error";
  if (m === "Failed to fetch") return "network/API error — check connection and retry";
  if (m.toLowerCase().includes("invalid response format")) return "the Claude app viewer is blocking the AI call — open the CazBid link in Safari instead and it works";
  return m;
};
const initials = (s) => (s || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" }); } catch (e) { return ""; } };

/* ---------- AI ---------- */
let __aiInFlight = 0;
let __aiLastCall = 0;
let __LAST_MANUAL_USED = null; // set from the server's response so the UI can show which manual loaded

async function callClaude(messages, opts) {
  const background = opts && opts.background;
  // background calls yield entirely if a foreground call is active or recent
  if (background) {
    if (__aiInFlight > 0) throw new Error("skip-background");
    if (Date.now() - __aiLastCall < 1500) throw new Error("skip-background");
  }
  // simple spacing so we never burst past the rate limit
  const since = Date.now() - __aiLastCall;
  if (since < 700) await new Promise((r) => setTimeout(r, 700 - since));
  __aiInFlight++;
  __aiLastCall = Date.now();
  try {
    return await __callClaudeInner(messages, opts);
  } finally {
    __aiInFlight--;
    __aiLastCall = Date.now();
  }
}
async function __callClaudeInner(messages, opts) {
  // MODEL SPLIT: the model is chosen SERVER-SIDE per function — this sync path hits
  // /estimate.js (Sonnet, fast: the AL conversation + measurement/geo extraction); the
  // BUILD/commit preflight goes through callClaudeBackground → /estimate-background.js
  // (Opus, rigorous). The `model` below is not sent to the function; it's documentary.
  const body = { model: "claude-sonnet-4-6", max_tokens: (opts && opts.maxTokens) || 1000, messages };
  if (opts && opts.search) body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }];
  body.messages = body.messages.map((m) =>
    typeof m.content === "string" ? { ...m, content: [{ type: "text", text: m.content }] } : m
  );
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      let res;
      try {
        const __ctrl = new AbortController();
        const __to = setTimeout(() => __ctrl.abort(), 60000); // 60s hard cap so the estimate never hangs forever
        try {
          res = await fetch("/.netlify/functions/estimate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: body.messages,            // pass the full messages array
              maxTokens: body.max_tokens,
              search: !!body.tools,
              trade: (opts && opts.trade) || "" // which manual the server should load
            }),
            signal: __ctrl.signal,
          });
        } finally { clearTimeout(__to); }
      } catch (e) {
        if (e && e.name === "AbortError") throw new Error("Network: estimate timed out after 60s - try again");
        throw new Error("Network: " + (e.message || "fetch failed"));
      }
      const raw = await res.text();
      if (!raw || !raw.trim()) throw new Error("empty reply (connection dropped)");
      let data;
      try { data = JSON.parse(raw); } catch (e) { throw new Error("API status " + res.status + ", non-JSON reply"); }
      if (data && typeof data.manualUsed !== "undefined") __LAST_MANUAL_USED = data.manualUsed; // server tells us which manual it loaded
      if (data.error) {
        const msg = typeof data.error === "string" ? data.error : (data.error.message || JSON.stringify(data.error));
        throw new Error("API status " + res.status + ": " + String(msg).slice(0, 160));
      }
      if (!res.ok) throw new Error("API status " + res.status + (data && data.error ? ": " + data.error : ""));
      // our Netlify function returns { text: "..." }; fall back to raw Anthropic shape just in case
      if (typeof data.text === "string") return data.text;
      if (data.content && Array.isArray(data.content)) return data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
      throw new Error("Unexpected response shape");
    } catch (e) {
      lastErr = e;
      const m = (e.message || "").toLowerCase();
      const retryable = m.includes("empty reply") || m.includes("network:") || m.includes("invalid response format") || m.includes("429") || m.includes("529") || m.includes("overloaded");
      if (attempt < 4 && retryable) { await new Promise((r) => setTimeout(r, 1200 * attempt)); continue; }
      throw e;
    }
  }
  throw lastErr;
}
// Long estimates run as a Netlify BACKGROUND function (15-min limit) plus polling,
// because Opus 4.8 + web search exceeds the 10-second sync-function limit on the
// free plan. We POST to estimate-background (which answers 202 and keeps working),
// then poll estimate-result until the takeoff lands in the Blobs job store.
async function callClaudeBackground(messages, opts) {
  opts = opts || {};
  const jobId = "job_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
  const norm = (messages || []).map((m) =>
    typeof m.content === "string" ? { ...m, content: [{ type: "text", text: m.content }] } : m
  );
  let startRes;
  try {
    startRes = await fetch("/.netlify/functions/estimate-background", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, prompt: norm, maxTokens: opts.maxTokens || 4000, search: !!opts.search, trade: opts.trade || "", priceBook: opts.priceBook || null, standingRules: opts.standingRules || null }),
    });
  } catch (e) {
    throw new Error("Network: couldn't start the estimate — check your connection and try again");
  }
  // background functions answer 202; anything else (and not ok) means it didn't start
  if (startRes.status !== 202 && !startRes.ok) {
    throw new Error("Couldn't start the estimate (status " + startRes.status + "). If this keeps happening the estimate-background function may not be deployed yet.");
  }
  const started = Date.now();
  const DEADLINE_MS = 4 * 60 * 1000; // give Opus + search up to 4 minutes
  let delay = 1500;
  let consecErrors = 0;     // consecutive failed polls
  let lastServerError = ""; // most recent error message the result fn reported
  while (Date.now() - started < DEADLINE_MS) {
    await new Promise((r) => setTimeout(r, delay));
    let r;
    try { r = await fetch("/.netlify/functions/estimate-result?job=" + encodeURIComponent(jobId)); }
    catch (e) {
      if (++consecErrors >= 8) throw new Error("Lost connection while waiting for the estimate — check your network and try again.");
      continue; // transient blip — keep polling
    }
    if (!r || !r.ok) {
      // a persistent error here means the result function itself is failing (e.g. Blobs not
      // configured) — capture the real message and surface it instead of spinning silently
      try { const ed = await r.json(); if (ed && ed.error) lastServerError = ed.error; } catch (e2) {}
      if (++consecErrors >= 6) throw new Error(lastServerError ? ("Estimate service error — " + lastServerError) : ("The estimate service returned an error (status " + (r ? r.status : "?") + ")."));
      delay = Math.min(delay + 500, 4000);
      continue;
    }
    let data;
    try { data = await r.json(); } catch (e) { if (++consecErrors >= 6) throw new Error("The estimate service returned an unreadable response."); continue; }
    consecErrors = 0; // clean response — reset the failure streak
    if (data.status === "done") { __LAST_MANUAL_USED = data.manualUsed; return data.text || ""; }
    if (data.status === "error") { throw new Error(data.error || "The estimate failed on the server"); }
    delay = Math.min(delay + 400, 4000); // still pending — back off gently and keep waiting
  }
  throw new Error("The estimate is taking unusually long — it may still finish; tap Build estimate again in a moment.");
}
function repairJSON(str) {
  let cut = str.lastIndexOf("}");
  while (cut > 0) {
    const head = str.slice(0, cut + 1);
    const stack = [];
    let inStr = false, esc = false;
    for (const ch of head) {
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === String.fromCharCode(34)) { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{" || ch === "[") stack.push(ch);
      else if (ch === "}" || ch === "]") stack.pop();
    }
    const fixed = head + stack.reverse().map((c) => (c === "{" ? "}" : "]")).join("");
    try { return JSON.parse(fixed); } catch (e) { /* keep trimming */ }
    cut = str.lastIndexOf("}", cut - 1);
  }
  throw new Error("reply was cut off and could not be repaired - try again");
}
function parseJSON(text) {
  const clean = (text || "").replace(/```json|```/g, "").trim();
  const s = clean.search(/[\[{]/);
  if (s < 0) throw new Error("no JSON in response");
  const e = Math.max(clean.lastIndexOf("}"), clean.lastIndexOf("]"));
  try { return JSON.parse(clean.slice(s, e + 1)); }
  catch (err) { return repairJSON(clean.slice(s)); }
}
const readDataURL = (file) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = () => rej(new Error("file read failed"));
  r.readAsDataURL(file);
});
const imageToJpeg = async (file, max = 900, q = 0.7) => {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const cv = document.createElement("canvas");
    cv.width = Math.max(1, Math.round(bmp.width * scale));
    cv.height = Math.max(1, Math.round(bmp.height * scale));
    cv.getContext("2d").drawImage(bmp, 0, 0, cv.width, cv.height);
    if (bmp.close) bmp.close();
    return cv.toDataURL("image/jpeg", q);
  } catch (e) { /* fall through */ }
  const dataUrl = await readDataURL(file);
  return await new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(img.width * scale));
        cv.height = Math.max(1, Math.round(img.height * scale));
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        res(cv.toDataURL("image/jpeg", q));
      } catch (err) { rej(err); }
    };
    img.onerror = () => rej(new Error("decode failed"));
    img.src = dataUrl;
  });
};
const dataUrlResize = (dataUrl, max, q) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => {
    try {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.max(1, Math.round(img.width * scale));
      cv.height = Math.max(1, Math.round(img.height * scale));
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      res(cv.toDataURL("image/jpeg", q));
    } catch (e) { rej(e); }
  };
  img.onerror = () => rej(new Error("decode failed"));
  img.src = dataUrl;
});

/* ---------- shared storage ---------- */
async function sGet(key) {
  try { const r = await window.storage.get(key, true); return r && r.value ? JSON.parse(r.value) : null; }
  catch (e) { return null; }
}
async function sSet(key, val) {
  let last;
  for (let a = 1; a <= 5; a++) {
    try { await window.storage.set(key, JSON.stringify(val), true); return; }
    catch (e) {
      last = e;
      const rate = /rate limit/i.test((e && e.message) || "");
      await new Promise((r) => setTimeout(r, (rate ? 1400 : 600) * a));
    }
  }
  throw new Error("storage kept failing - check connection and try again (" + ((last && last.message) || "server error") + ")");
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function pGet(key) {
  try { const r = await window.storage.get(key); return r && r.value ? JSON.parse(r.value) : null; }
  catch (e) { return null; }
}
async function pSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch (e) { /* best effort */ }
}

// ESTIMATE STORE (build-set #3) — the ONE persistence interface for saved estimates.
// The UI only ever calls list/get/save/remove; Phase 1 backs them with on-device
// storage (pGet/pSet). Cloud + JobNimbus later reimplement THESE SAME methods, so
// migrating storage is one module, not a rebuild. Records are cloud/JobNimbus-shaped
// from day one: { id, customerName, jobAddress, createdAt, updatedAt, status,
// jobNimbusId, price, payload }. NOTE: local storage is NOT a backup (cache clear /
// lost phone = gone); it stops mid-session loss until cloud sync ships.
// ===== ASSEMBLY WALK — forced sequential-spatial reasoning (order + presence; NEVER quantities) =====
// Before emitting items[], the model narrates the build in INSTALLATION order; every LLM item traces
// to a step. Code then checks coherence cheaply. Every list-shaped failure this month (accessories
// without their panel, trusses on a roofless deck, skipped transitions) happened where no assembly
// reasoning ran — the walk makes it mandatory and machine-checkable. Passenger, never pilot: a
// missing/failed walk flags "assembly not verified" and the estimate proceeds.
function normalizeWalk(w) {
  if (!Array.isArray(w)) return [];
  return w.slice(0, 24).map((s, i) => ({
    n: Number(s && s.n) > 0 ? Number(s.n) : (i + 1),
    layer: String((s && s.layer) || "").slice(0, 90),
    sitsOn: String((s && s.sitsOn) || "").slice(0, 60),
    lappedBy: String((s && s.lappedBy) || "").slice(0, 60),
    fastenedWith: String((s && s.fastenedWith) || "").slice(0, 60),
    produces: Array.isArray(s && s.produces) ? s.produces.map((x) => String(x).slice(0, 90)).filter(Boolean).slice(0, 6) : [],
  })).filter((s) => s.layer);
}
// Coherence (code, cheap): (1) an LLM item tracing to no step; (2) a step whose produced component
// has no takeoff line (this is where a silently-dropped shingle half or skipped transition surfaces);
// (3) roofing fasteners whose parent panel is absent (never-omit, made structural). Items ADDED BY
// CODE (backfill, never-omit, engine rebuild) are exempt from (1) — they're not in rawNames.
function walkCoherence(walk, items, rawNames, isRoof, checkTrace) {
  if (!walk.length) return ["assembly not verified — the model returned no walk"];
  const flags = [];
  const stepNums = new Set(walk.map((s) => s.n));
  const toks = (x) => String(x || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((t) => t.length > 3);
  const overlap = (a, b) => { const bt = new Set(toks(b)); return toks(a).some((t) => bt.has(t)); };
  if (checkTrace) {
    (items || []).forEach((it) => {
      if (!rawNames.has(String(it.name || "").toLowerCase())) return;
      const ws = Number(it.walkStep) || 0;
      if (!ws || !stepNums.has(ws)) flags.push("“" + it.name + "” traces to no assembly step — verify it belongs in this build");
    });
    walk.forEach((s) => s.produces.forEach((p) => {
      if (!(items || []).some((it) => overlap(p, it.name))) flags.push("step " + s.n + " (" + s.layer + ") installs “" + p + "” — no matching takeoff line");
    }));
  }
  if (isRoof) {
    const hasPanel = (items || []).some((it) => roofPartType(it.name) === "panel");
    (items || []).forEach((it) => { const pt = roofPartType(it.name); if ((pt === "screw" || pt === "clip") && /panel|seam|flange|cleat/.test(String(it.name || "").toLowerCase()) && !hasPanel) flags.push("“" + it.name + "” fastens a PANEL that is not in the takeoff"); });
  }
  return flags.slice(0, 8);
}
// Static walks for deterministic-engine trades — templates get a fixed install order so the Assembly
// section renders (and reads as a crew brief) on engine results too.
const ENGINE_WALKS = {
  framing: ["Plates & layout", "Stud walls", "Headers & beams", "Rafters / trusses", "Sheathing", "House wrap"],
  siding: ["WRB / housewrap", "Starter strip", "Corners & J-channel (openings/rakes — soffit run gets F-channel, not J)", "Field siding (bottom-up)", "Soffit + F-channel receiver", "Fascia & trim"],
  concrete: ["Excavate / base", "Forms", "Rebar / mesh", "Pour & finish", "Cure / strip forms"],
  insulation: ["Air sealing", "Batts / blown-in / foam", "Vapor barrier"],
  electrical: ["Rough-in / boxes", "Wire pulls", "Panel / breakers", "Devices & fixtures"],
  hvac: ["Equipment set", "Ductwork / lineset", "Registers", "Thermostat / startup"],
  plumbing: ["DWV rough", "Supply rough", "Fixtures", "Water heater / startup"],
};
// F12 — market $-sanity band (ADVISORY, never a block): a per-unit installed price far outside the
// physically possible band means template fiction (run-6's $19/SF Trex deck) or fat-finger inputs.
// Bands are deliberately WIDE — only the impossible trips them.
function marketSanity(sysStr, items, sellShare) {
  const s = String(sysStr || "").toLowerCase();
  if (!(sellShare > 0)) return "";
  const isSF = (u) => /sq\s*ft|sqft|\bsf\b/.test(u);
  const isSQ = (u) => !isSF(u) && (/\bsq\b|square/.test(u));
  let area = 0, unitLbl = "", lo = 0, hi = 0, kind = "";
  for (const it of (items || [])) {
    const q = Number(it.qty) || 0; if (!(q > 0)) continue;
    const u = String(it.unit || "").toLowerCase();
    if (/deck|trex|composite/.test(s) && /deck|porch/.test(s)) { kind = "composite deck"; lo = 35; hi = 250; unitLbl = "SF"; if (isSF(u)) { area = Math.max(area, q); } }
    else if (/roof|shingle|standing.?seam|metal panel|slate|tile/.test(s)) { kind = "roof"; lo = 300; hi = 2600; unitLbl = "SQ"; if (isSQ(u)) area = Math.max(area, q); }
    else if (/siding|hardie|clapboard|cladding/.test(s)) { kind = "siding"; lo = 3; hi = 35; unitLbl = "SF"; if (isSF(u)) area = Math.max(area, q); else if (isSQ(u)) area = Math.max(area, q * 100); }
  }
  if (!(area > 0)) return "";
  const per = Math.round((sellShare / area) * 100) / 100;
  if (per >= lo && per <= hi) return "";
  return "≈$" + per + "/" + unitLbl + " installed is " + (per < lo ? "below" : "above") + " the typical " + kind + " band ($" + lo + "–$" + hi + "/" + unitLbl + ") — double-check quantities, scope, and trade routing before sending this.";
}
// ===== DIAGNOSTIC BUNDLE ("flight recorder") — version + input hash =====
// Every estimate run records HOW it was built (raw LLM JSON + final takeoff + provenance), not
// just what it concluded. inputsHash lets identical-input re-rolls be spotted as noise vs a real
// scope change. Bump APP_VERSION on release; DIAG_VERSION on bundle-shape changes.
const DIAG_VERSION = 1;
const APP_VERSION = "2026-07-06";
function hashStr(s) { let h = 0x811c9dc5; const str = String(s || ""); for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); }
const estStore = {
  async list() { const a = await pGet(ESTIMATES_KEY); return Array.isArray(a) ? a : []; },
  async get(id) { return (await estStore.list()).find((e) => e.id === id) || null; },
  async save(rec) {
    const all = await estStore.list();
    const now = new Date().toISOString();
    const idx = all.findIndex((e) => e.id === rec.id);
    const prev = idx >= 0 ? all[idx] : {};
    const merged = Object.assign({}, prev, rec, { createdAt: prev.createdAt || rec.createdAt || now, updatedAt: now });
    if (idx >= 0) all[idx] = merged; else all.unshift(merged);
    await pSet(ESTIMATES_KEY, all);
    return { record: merged, all };
  },
  async remove(id) { const all = (await estStore.list()).filter((e) => e.id !== id); await pSet(ESTIMATES_KEY, all); return all; },
};
// ===== JOB COST TRACKING — what a job REALLY cost (receipts, labor, man-hours) vs what was figured =====
// Jobs exist INDEPENDENTLY of estimates: no estimate, estimate-before, or estimate-after are all valid.
// This is also the calibration engine's data source — real actuals validate the non-roofing labor rates.
const CJ_CATS = ["Materials", "Labor", "Subcontractor", "Equipment/Rental", "Disposal", "Fuel/Travel", "Permits/Fees", "Other"];
const CJ_OTHER_CATS = ["Subcontractor", "Equipment/Rental", "Disposal", "Fuel/Travel", "Permits/Fees", "Other"];
// ACTUALS from the cost entries + hours log. Labor $ is either the summed Labor entries or (toggle)
// total MH x the job's burdened rate — never both. Real margin = (contract - actual total) / contract.
function cjTotals(job) {
  const costs = (job && job.costs) || [];
  const sum = (cat) => costs.filter((c) => c.category === cat).reduce((a, c) => a + (num(c.amount) || 0), 0);
  const mh = Math.round(((job && job.hoursLog) || []).reduce((a, h) => a + (num(h.mh) || 0), 0) * 10) / 10;
  const laborEntries = Math.round(sum("Labor"));
  const laborComputed = Math.round(mh * (num(job && job.burdenRate) || 0));
  const labor = (job && job.laborFromHours) ? laborComputed : laborEntries;
  const mats = Math.round(sum("Materials"));
  const other = Math.round(CJ_OTHER_CATS.reduce((a, c) => a + sum(c), 0));
  const total = mats + labor + other;
  // CHANGE ORDERS — only APPROVED ones touch the math; drafts are parked. Adjusted contract =
  // base + Σ approved CO prices, and ALL margin math uses the adjusted number (a job with paid
  // additions must not read as an overrun).
  const approvedCOs = ((job && job.changeOrders) || []).filter((c) => c.status === "approved");
  const coPrice = Math.round(approvedCOs.reduce((a, c) => a + (num(c.price) || 0), 0));
  const baseContract = num(job && job.planned && job.planned.contract) || 0;
  const contract = baseContract + coPrice;
  // Margin sanity: contract < 25% of cost is almost always a data-entry slip, not a -599% job —
  // suppress the extreme number and let the UI show "check the contract price" instead.
  const marginSuspect = contract > 0 && total > 0 && contract < total * 0.25;
  const margin = contract > 0 && !marginSuspect ? Math.round(((contract - total) / contract) * 100) : null;
  return { mats, labor, laborEntries, laborComputed, mh, other, total, contract, baseContract, coPrice, coCount: approvedCOs.length, margin, marginSuspect };
}
// ESTIMATE-side values from a saved estStore record's payload (READ-ONLY — the engine is untouched).
// Total excludes mobilization (job-level, shown on the estimate itself); margin = the bid margin.
function cjEstVals(rec) {
  if (!rec || !rec.payload || !Array.isArray(rec.payload.trades) || !rec.payload.trades.length) return null;
  const ts = rec.payload.trades;
  const matsOf = (t) => (t.items || []).reduce((s, it) => s + (num(it.cost) || 0), 0);
  const mats = ts.reduce((a, t) => a + matsOf(t), 0);
  const mh = ts.reduce((a, t) => a + (num(t.laborHours) || 0), 0);
  const labor = ts.reduce((a, t) => a + (num(t.laborHours) || 0) * (num(t.laborRate) || 0), 0);
  const equip = ts.reduce((a, t) => a + (num(t.equipment) || 0), 0);
  const tax = ts.reduce((a, t) => a + matsOf(t) * (num(t.taxRate) || 0), 0);
  return { mats: Math.round(mats), labor: Math.round(labor), mh: Math.round(mh), equip: Math.round(equip), total: Math.round(mats + labor + equip + tax), margin: (rec.payload.estMargin != null ? num(rec.payload.estMargin) : null), price: num(rec.price) || 0 };
}
// PLANNED (My Bid Figures) as comparison values — Dustin's own numbers, independent of any AI estimate.
function cjPlanVals(job) {
  const p = (job && job.planned) || {};
  let mats = num(p.mats) || 0, labor = num(p.labor) || 0, mh = num(p.mh) || 0, contract = num(p.contract) || 0;
  if (!mats && !labor && !mh && !contract) return null;
  // APPROVED change orders grow My Figures: expected costs add to mats/labor/MH (when entered),
  // CO price adds to the contract. A priced CO with no expected costs grows only the contract —
  // that's fine, it just reads as pure margin.
  const approvedCOs = ((job && job.changeOrders) || []).filter((c) => c.status === "approved");
  approvedCOs.forEach((c) => { mats += num(c.expMaterials) || 0; labor += num(c.expLabor) || 0; mh += num(c.expManHours) || 0; contract += num(c.price) || 0; });
  const total = mats + labor;
  return { mats: Math.round(mats), labor: Math.round(labor), mh: Math.round(mh * 10) / 10, total: Math.round(total), contract, withCOs: approvedCOs.length > 0, margin: contract > 0 && total > 0 ? Math.round(((contract - total) / contract) * 100) : null };
}
// Variance of actual vs a bid figure: $ and % over/under (positive = OVER the bid = red).
function cjVar(bid, actual) {
  if (bid == null || !(bid > 0)) return null;
  const d = Math.round((actual || 0) - bid);
  return { d, pct: Math.round((d / bid) * 100) };
}
// Plain-language verdict: compares actuals to My Figures when present, else the CazBid estimate.
function cjVerdict(plan, est, act) {
  const bid = plan || est;
  if (!bid || !act || !(act.total > 0)) return "";
  const parts = [];
  const mv = cjVar(bid.mats, act.mats);
  if (mv && Math.abs(mv.d) >= 50) parts.push("$" + Math.abs(mv.d).toLocaleString() + (mv.d > 0 ? " over" : " under") + " on materials");
  const hv = cjVar(bid.mh, act.mh);
  if (hv && Math.abs(hv.d) >= 2) parts.push(Math.abs(hv.d) + " MH " + (hv.d > 0 ? "over" : "under") + " on labor");
  else { const lv = cjVar(bid.labor, act.labor); if (lv && Math.abs(lv.d) >= 100) parts.push("$" + Math.abs(lv.d).toLocaleString() + (lv.d > 0 ? " over" : " under") + " on labor"); }
  let s = parts.length ? ("Came in " + parts.join(", ") + ".") : "Right on the figures.";
  const coPre = (act.coCount > 0) ? ("With " + act.coCount + " approved change order" + (act.coCount === 1 ? "" : "s") + ", real") : "Real";
  if (act.margin != null && bid.margin != null) s += " " + coPre + " margin " + act.margin + "% vs " + bid.margin + "% bid.";
  else if (act.margin != null) s += " " + coPre + " margin " + act.margin + "%.";
  return s;
}

/* ---------- small components ---------- */
function Avatar({ user, size, onTap }) {
  const cls = "avatar" + (size === "lg" ? " lg" : "") + (size === "xl" ? " xl" : "");
  const inner = user && user.avatar
    ? <img src={user.avatar} alt="" />
    : <span className="avinit">{initials(user ? (user.company || user.name) : "?")}</span>;
  if (onTap) {
    return (
      <button className={cls + " avbtn"} onClick={onTap}>
        {inner}
        <span className="avcam"><Camera size={14} /></span>
      </button>
    );
  }
  return <span className={cls}>{inner}</span>;
}
function Stars({ value }) {
  return (
    <span className="starline">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={14} className={n <= value ? "stf" : "ste"} />
      ))}
    </span>
  );
}
function Pill({ kind, children }) {
  return <span className={"pill " + kind}>{children}</span>;
}
function RateBox({ label, onSubmit, busyKey, busy }) {
  const [st, setSt] = useState(0);
  const [cm, setCm] = useState("");
  return (
    <div className="ratebox">
      <div className="rblabel">{label}</div>
      <div className="starsrow">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} className={"starbtn" + (st >= n ? " on" : "")} onClick={() => setSt(n)}>★</button>
        ))}
      </div>
      <input className="in" placeholder="Say a few words (shows on their profile)" value={cm} onChange={(e) => setCm(e.target.value)} />
      <button className="btn ghost full" disabled={!st || busy === busyKey} onClick={() => onSubmit(st, cm)}>
        {busy === busyKey ? "Sending…" : "Submit rating"}
      </button>
    </div>
  );
}
function Mascot({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="CazBid helper" role="img">
      <circle cx="50" cy="50" r="50" fill="#FFF1E8" />
      <path d="M16 44 L50 24 L84 44 Z" fill="none" stroke="#15181C" strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 24 L84 44 L80 47 L50 29 Z" fill="#FF6A13" />
      <circle cx="50" cy="60" r="14" fill="#fff" stroke="#15181C" strokeWidth="3.5" />
      <path d="M37 55 Q50 43 63 55 Z" fill="#FF6A13" stroke="#15181C" strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 55 L40 55" stroke="#15181C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="45" cy="60" r="1.8" fill="#15181C" />
      <circle cx="55" cy="60" r="1.8" fill="#15181C" />
      <path d="M44 65 Q50 70 56 65" fill="none" stroke="#15181C" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 64 L30 47" stroke="#15181C" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M60 64 L70 47" stroke="#15181C" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
function Party({ data, onClose }) {
  const pieces = useMemo(() => {
    const colors = ["#FF6A13", "#2E7D4F", "#1B1F23", "#FFC53D", "#3B82F6", "#EC4899"];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.9,
      dur: 2.4 + Math.random() * 1.6,
      size: 7 + Math.random() * 8,
      color: colors[i % colors.length],
      rot: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line
  return (
    <div className="party" onClick={onClose}>
      {pieces.map((p) => (
        <span key={p.id} className="confetti" style={{
          left: p.left + "%", width: p.size, height: p.size * 0.45, background: p.color,
          animationDelay: p.delay + "s", animationDuration: p.dur + "s",
          ["--rot"]: (p.rot * 720) + "deg",
        }} />
      ))}
      <div className="partycard">
        <PartyPopper size={44} color="#FF6A13" />
        <div className="partytitle">{data.title}</div>
        {data.sub && <div className="partysub">{data.sub}</div>}
        <div className="partyhint">tap anywhere to continue</div>
      </div>
    </div>
  );
}

/* ============================================================ */
// Stage 3: shared Job Context panel — photos + measurement report + measurements
// + a "get measured" entry. Display-only (no estimating logic); IDENTICAL on the
// contractor and homeowner views (job context isn't sensitive pricing data).
function JobContextPanel({ photos, measurements }) {
  const ph = Array.isArray(photos) ? photos : [];
  const meas = (measurements || "").trim();
  return (
    <section className="card jobcontext">
      <div className="seclabel">📋 Job context</div>
      {ph.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>{ph.map((p, i) => (<div className="thumb" key={i}><img src={p} alt="" /></div>))}</div>
      )}
      {meas && <p className="hint" style={{ marginTop: 6 }}>📐 <b>Measurements:</b> {meas}</p>}
      {!ph.length && !meas && <p className="hint">No photos or measurements yet — add photos below, or get measured.</p>}
      <p className="hint" style={{ marginTop: 6 }}>
        📐 Get measured: <a href="https://www.eagleview.com" target="_blank" rel="noopener noreferrer">EagleView</a> / <a href="https://hover.to" target="_blank" rel="noopener noreferrer">Hover</a> (roof &amp; exterior) · <a href="https://poly.cam" target="_blank" rel="noopener noreferrer">Polycam</a> (interior), then upload the report.
      </p>
    </section>
  );
}

/* ============================================================ */

// ============================================================================
// STAGE 5 (image-based) — three pre-rendered photoreal states (Exterior /
// Interior / Systems) with crossfade, invisible hover/click hotspots, a material
// sidebar from the contractor's own price book, and persistent scope badges.
// ISOLATION: this only EMITS a scope selection (trade -> material) and mirrors
// deterministic trades into whChecked; it never touches the estimating engine.
// Images are served as static files from /assets (copied into dist by build.mjs).
// ============================================================================
const HOUSE_IMG = {
  exterior: "/assets/house-exterior.jpg",
  interior: "/assets/house-interior.jpg",
  systems: "/assets/house-systems.jpg",
};
// paddingTop % = image height/width, so the box matches each render's aspect and
// object-fit:cover never crops (keeps hotspot %-coords aligned to the image).
const HOUSE_STATES = [
  { key: "exterior", label: "Outside", aspect: 33.06, hint: "Roof, siding, windows, doors, garage." },
  { key: "interior", label: "Inside", aspect: 66.40, hint: "Roof's off — rooms, flooring, drywall, trim." },
  { key: "systems", label: "Systems", aspect: 56.28, hint: "Walls cut away — HVAC, electrical, plumbing, insulation." },
];
// Invisible hotspots, positioned as % of the image box {x,y,w,h}. Rough starting
// placements over each render — refine on-device. trade = scope key.
const HOUSE_HOTSPOTS = [
  // EXTERIOR
  { state: "exterior", trade: "roofing", label: "Roofing", x: 14, y: 3, w: 72, h: 26 },
  { state: "exterior", trade: "siding", label: "Siding", x: 14, y: 39, w: 13, h: 30 },
  { state: "exterior", trade: "framing", label: "Framing", x: 58, y: 33, w: 26, h: 22 },
  { state: "exterior", trade: "windows", label: "Windows", x: 30, y: 44, w: 17, h: 20 },
  { state: "exterior", trade: "doors", label: "Doors", x: 49, y: 46, w: 7, h: 32 },
  { state: "exterior", trade: "garage", label: "Garage Doors", x: 83, y: 52, w: 16, h: 34 },
  { state: "exterior", trade: "concrete", label: "Concrete / Foundation", x: 20, y: 78, w: 46, h: 11 },
  { state: "exterior", trade: "deck", label: "Deck & Patio", x: 45, y: 90, w: 20, h: 9 },
  { state: "exterior", trade: "landscaping", label: "Landscaping", x: 2, y: 84, w: 16, h: 15 },
  // INTERIOR (top-down dollhouse)
  { state: "interior", trade: "kitchen", label: "Kitchen Remodel", x: 10, y: 12, w: 28, h: 26 },
  { state: "interior", trade: "flooring", label: "Flooring", x: 10, y: 50, w: 28, h: 28 },
  { state: "interior", trade: "bathroom", label: "Bathroom Remodel", x: 42, y: 30, w: 16, h: 18 },
  { state: "interior", trade: "drywall", label: "Drywall", x: 40, y: 8, w: 18, h: 18 },
  { state: "interior", trade: "paint", label: "Paint", x: 60, y: 10, w: 22, h: 16 },
  { state: "interior", trade: "trim", label: "Trim & Molding", x: 12, y: 40, w: 24, h: 7 },
  { state: "interior", trade: "lighting", label: "Lighting", x: 30, y: 22, w: 10, h: 8 },
  { state: "interior", trade: "accessories", label: "Accessories", x: 60, y: 30, w: 14, h: 12 },
  // SYSTEMS (cutaway)
  { state: "systems", trade: "ventilation", label: "Ventilation", x: 36, y: 18, w: 18, h: 12 },
  { state: "systems", trade: "hvac", label: "HVAC", x: 30, y: 30, w: 26, h: 16 },
  { state: "systems", trade: "electrical", label: "Electrical", x: 20, y: 40, w: 14, h: 20 },
  { state: "systems", trade: "insulation", label: "Insulation", x: 14, y: 36, w: 9, h: 26 },
  { state: "systems", trade: "plumbing", label: "Plumbing", x: 26, y: 60, w: 32, h: 14 },
];
// Map a house trade to a price-book trade key (only the 9 deterministic engine
// trades have one — others fall back to suggested materials).
const PB_TRADE_KEY = { framing: "framing", siding: "siding", concrete: "concrete", drywall: "drywall", trim: "trim", insulation: "insulation", hvac: "hvac", electrical: "electrical", plumbing: "plumbing" };
// PRICE-BOOK categories (Material Pricing Hub, Part 1) — DECOUPLED from the deterministic-engine
// trade list (whSpecs / PB_TRADE_KEY). Roofing is the flagship trade and MUST be here even though
// it has no deterministic spec; committed roofing prices flow into the by-name books concat that
// priceRoofTakeoff prices from. Adds the other missing trades too. This is the importer dropdown +
// the categorizer target list — keep in sync with categorize-prices.js TRADES.
const PRICE_BOOK_TRADES = [
  { trade: "roofing", label: "Roofing" },
  { trade: "siding", label: "Siding" },
  { trade: "framing", label: "Framing" },
  { trade: "trim", label: "Trim / millwork" },
  { trade: "drywall", label: "Drywall" },
  { trade: "insulation", label: "Insulation" },
  { trade: "concrete", label: "Concrete / masonry" },
  { trade: "decks", label: "Decking" },
  { trade: "flooring", label: "Flooring" },
  { trade: "interior", label: "Interior / paint" },
  { trade: "cabinetry", label: "Cabinetry" },
  { trade: "electrical", label: "Electrical" },
  { trade: "plumbing", label: "Plumbing" },
  { trade: "hvac", label: "HVAC" },
  { trade: "other", label: "Other" },
];
// PER-PHASE LABOR (time-audit Part 1). Each trade's bid hours allocate across ~4–6 phase
// buckets by typical proportion (rough now; the calibration loop refines splits later).
// names + split arrays are index-aligned; splits ~sum to 1.
const TRADE_PHASES = {
  roofing:   { names: ["Tear-off", "Dry-in", "Field install", "Details & flashing", "Cleanup"], split: [0.20, 0.10, 0.40, 0.22, 0.08] },
  siding:    { names: ["Prep & wrap", "Field install", "Trim & accessories", "Cleanup"], split: [0.20, 0.50, 0.22, 0.08] },
  framing:   { names: ["Layout & plates", "Walls & openings", "Roof/floor structure", "Sheathing", "Cleanup"], split: [0.15, 0.35, 0.30, 0.15, 0.05] },
  concrete:  { names: ["Excavate & form", "Reinforce", "Pour & finish", "Strip & cleanup"], split: [0.30, 0.15, 0.40, 0.15] },
  drywall:   { names: ["Hang", "Tape & mud", "Sand & prep", "Cleanup"], split: [0.30, 0.40, 0.20, 0.10] },
  flooring:  { names: ["Prep & demo", "Underlayment", "Field install", "Trim & cleanup"], split: [0.20, 0.15, 0.50, 0.15] },
  trim:      { names: ["Measure & cut", "Install", "Caulk & finish", "Cleanup"], split: [0.25, 0.45, 0.20, 0.10] },
  insulation:{ names: ["Prep & air-seal", "Install", "Cleanup"], split: [0.25, 0.60, 0.15] },
  _default:  { names: ["Prep", "Install", "Detail", "Cleanup"], split: [0.20, 0.50, 0.20, 0.10] },
};
// Roofing phases are TYPE-SPECIFIC — removal/install differ by system, so actuals land in
// type-specific buckets and the calibration loop learns per system (not a mushed average).
const ROOF_PHASES = {
  shingle:   { names: ["Tear-off (shingles)", "Dry-in", "Field install", "Details & flashing", "Cleanup"], split: [0.20, 0.10, 0.40, 0.22, 0.08] },
  metal:     { names: ["Tear-off / strip", "Underlayment", "Panel set (standing seam)", "Trim & flashing", "Cleanup"], split: [0.18, 0.10, 0.42, 0.22, 0.08] },
  agpanel:   { names: ["Tear-off / strip", "Underlayment", "Panel set & screws", "Trim & closures", "Cleanup"], split: [0.18, 0.10, 0.40, 0.24, 0.08] },
  flat:      { names: ["Strip existing roof", "Insulation", "Membrane install", "Details & flashing", "Cleanup"], split: [0.22, 0.15, 0.40, 0.15, 0.08] },
  tile:      { names: ["Tear-off (tile)", "Underlayment & battens", "Tile set", "Hip/ridge & details", "Cleanup"], split: [0.20, 0.15, 0.40, 0.17, 0.08] },
  composite: { names: ["Tear-off", "Dry-in", "Composite field install", "Details & flashing", "Cleanup"], split: [0.18, 0.10, 0.42, 0.22, 0.08] },
  slate:     { names: ["Tear-off", "Dry-in", "Slate set", "Hip/ridge & details", "Cleanup"], split: [0.18, 0.12, 0.42, 0.20, 0.08] },
  // H1: a MIXED roof gets BOTH install phases — never a single-system template that silently drops
  // half the install labor (the $5k 4'→3' swing was this template flipping shingle↔metal).
  mixed:     { names: ["Tear-off / strip", "Dry-in / underlayment", "Shingle field install", "Metal band panel set", "Details & flashing", "Cleanup"], split: [0.18, 0.10, 0.28, 0.20, 0.16, 0.08] },
};
function roofPhaseSpec(sys) {
  const s = installScope(sys); // F13: phase shape follows the INSTALLED system, not the tear-off
  if (roofIsMixed(s)) return ROOF_PHASES.mixed; // H1: both systems' phases
  if (/composite|synthetic|davinci|brava|ecostar|inspire|symphony/.test(s)) return ROOF_PHASES.composite;
  if (/slate/.test(s)) return ROOF_PHASES.slate;
  return ROOF_PHASES[roofTypeOf(s)] || ROOF_PHASES.shingle;
}
// Allocate bid LABOR HOURS across a trade's phases (man-hours). Remainder lands on the
// biggest bucket so the per-phase bids sum back to the trade's total. For roofing the phase
// set is keyed to the material/system (sys) so removal/install are type-specific.
function allocatePhases(tradeKey, laborHours, sys) {
  const spec = tradeKey === "roofing" ? roofPhaseSpec(sys) : (TRADE_PHASES[tradeKey] || TRADE_PHASES._default);
  const total = Math.max(0, Math.round(Number(laborHours) || 0));
  const raw = spec.names.map((n, i) => ({ name: n, bidHours: Math.round(total * (spec.split[i] || 0)) }));
  const diff = total - raw.reduce((s, p) => s + p.bidHours, 0);
  if (diff !== 0 && raw.length) { let bi = 0; for (let i = 1; i < raw.length; i++) if ((spec.split[i] || 0) > (spec.split[bi] || 0)) bi = i; raw[bi].bidHours = Math.max(0, raw[bi].bidHours + diff); }
  return raw;
}
// Starter material lists (brand + product), most-common first, NO 3-tab shingles.
const MATERIAL_SUGGESTIONS = {
  framing: ["2x6 SPF walls", "2x4 SPF walls", "Advanced framing (24\" OC)", "LVL/engineered beams", "Steel stud"],
  roofing: ["GAF Timberline HDZ (architectural)", "Owens Corning Duration", "CertainTeed Landmark", "Standing-seam metal", "Firestone TPO (flat)"],
  siding: ["James Hardie lap (fiber-cement)", "CertainTeed vinyl lap", "LP SmartSide", "Cedar lap", "Board & batten"],
  windows: ["Andersen 400 Series", "Pella 250 Series", "Marvin Elevate", "Vinyl double-hung"],
  doors: ["Therma-Tru fiberglass", "Masonite steel", "Solid-wood entry"],
  garage: ["Clopay insulated steel", "Wayne Dalton", "Carriage-style"],
  concrete: ["4\" slab", "Poured foundation", "Stamped concrete", "Brick veneer"],
  deck: ["Trex composite", "PT pine", "Cedar", "Paver patio"],
  landscaping: ["Sod", "Mulch beds", "Shrub package", "Hardscape"],
  drywall: ["1/2\" standard", "5/8\" Type X", "Moisture-resistant"],
  flooring: ["Luxury vinyl plank", "Engineered hardwood", "Porcelain tile", "Carpet"],
  kitchen: ["Stock cabinets", "Semi-custom cabinets", "Quartz counters", "Granite counters"],
  bathroom: ["Tile shower", "Tub/shower combo", "Quartz vanity top"],
  trim: ["Painted MDF", "Primed pine", "Hardwood", "Crown package"],
  paint: ["Sherwin-Williams ProClassic", "Benjamin Moore Regal", "Builder flat"],
  lighting: ["Recessed LED", "Pendant package", "Ceiling fans"],
  accessories: ["Built-in shelving", "Closet systems", "Mantel"],
  hvac: ["Carrier furnace + AC", "Trane heat pump", "Mini-split"],
  electrical: ["200A panel", "Devices & fixtures", "EV charger circuit"],
  plumbing: ["PEX supply", "Fixture package", "Water heater"],
  ventilation: ["Bath exhaust fans", "Range hood", "HRV / ERV"],
  insulation: ["Air sealing (caulk & foam)", "Air sealing + blower-door test", "R-13 wall batt", "R-15 wall batt", "R-19 batt", "R-21 wall batt", "R-30 batt", "R-38 batt", "R-49 blown attic", "R-60 blown attic", "Closed-cell spray foam", "Open-cell spray foam", "Rigid foam board"],
};
// Material SYSTEM/TYPE per multi-system trade (the system-purity gate — picked up
// front so the takeoff can't mix systems). "Mixed" combines systems and is sized
// per sub-portion. Trades not listed are single-system (no type picker).
const HOUSE_TYPES = {
  roofing: ["Shingle", "Standing-seam metal", "AG panel (exposed fastener)", "Composite (synthetic)", "Slate / slate-look", "Flat — TPO", "Flat — EPDM", "Tile", "Mixed"],
  siding: ["Vinyl", "Fiber cement", "Steel/Metal", "Wood", "Mixed"],
  flooring: ["Hardwood", "Carpet", "Tile", "LVP / laminate", "Mixed"],
  windows: ["Vinyl", "Wood-clad", "Aluminum", "Mixed"],
  doors: ["Fiberglass", "Steel", "Solid wood", "Mixed"],
  concrete: ["Slab", "Footings / foundation", "Stamped / decorative", "Mixed"],
  hvac: ["Furnace + AC", "Heat pump", "Mini-split", "Mixed"],
  insulation: ["Batt", "Blown-in", "Spray foam", "Rigid board", "Mixed"],
};
const CAT_LABEL = { exterior: "Exterior", interior: "Interior", systems: "Systems" };

function ImageHouse({ scope, onSelect, onDeselect, role }) {
  const [state, setState] = useState("exterior"); // category: exterior | interior | systems
  const [typeFor, setTypeFor] = useState(null);   // trade whose system-type picker is open
  const [customTrade, setCustomTrade] = useState("");
  const [customType, setCustomType] = useState("");
  const cur = HOUSE_STATES.find((s) => s.key === state) || HOUSE_STATES[0];
  const tradesHere = HOUSE_HOTSPOTS.filter((h) => h.state === state);
  const sc = scope || {};
  const selectedKeys = Object.keys(sc);
  const labelFor = (t) => (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t;

  const tapTrade = (t) => {
    if (sc[t]) { onDeselect(t); return; }
    if (HOUSE_TYPES[t]) { setCustomType(""); setTypeFor(t); }
    else onSelect(t);
  };

  return (
    <div className="card househero" style={{ marginTop: 10, overflow: "hidden", marginLeft: -16, marginRight: -16, padding: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
        <img src={AL_NOTEPAD} alt="AL" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flex: "0 0 auto" }} />
        <div>
          <div style={{ fontWeight: 700 }}>What are we working on?</div>
          <div className="hint">Pick a category, then tap the trades{selectedKeys.length ? " · " + selectedKeys.length + " selected" : ""}.</div>
        </div>
      </div>

      {/* 1. category */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {HOUSE_STATES.map((s) => (
          <button key={s.key} className={"btn " + (state === s.key ? "primary" : "ghost")} style={{ flex: 1, padding: "8px 4px" }} onClick={() => { setState(s.key); setTypeFor(null); }}>{CAT_LABEL[s.key]}</button>
        ))}
      </div>

      {/* 2. passive house visual (crossfade per category — no clickable zones) */}
      <div style={{ position: "relative", width: "100%", height: 0, paddingTop: cur.aspect + "%", transition: "padding-top .45s ease", borderRadius: 10, overflow: "hidden", background: "#dfe6ee" }}>
        {HOUSE_STATES.map((s) => (
          <img key={s.key} src={HOUSE_IMG[s.key]} alt={CAT_LABEL[s.key] + " view"}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: state === s.key ? 1 : 0, transform: state === s.key ? "scale(1)" : "scale(1.05)", transition: "opacity .45s ease, transform .6s ease", pointerEvents: "none" }} />
        ))}
      </div>

      {/* 3. multi-select trades for this category */}
      <div className="seclabel" style={{ marginTop: 10, marginBottom: 4 }}>For {CAT_LABEL[state]}, what are you doing? <span className="hint">tap all that apply</span></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tradesHere.map((h) => {
          const on = !!sc[h.trade];
          return (
            <button key={h.trade} className={"btn " + (on ? "primary" : "ghost")} style={{ padding: "6px 10px", fontSize: 13 }} onClick={() => tapTrade(h.trade)}>
              {on ? "✓ " : ""}{h.label}{on && sc[h.trade] !== true ? " · " + sc[h.trade] : ""}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <input value={customTrade} onChange={(e) => setCustomTrade(e.target.value)} placeholder="Something else? type a trade…" style={{ flex: 1 }} />
        <button className="btn ghost" disabled={!customTrade.trim()} onClick={() => { onSelect(customTrade.trim()); setCustomTrade(""); }}>+ Add</button>
      </div>

      {/* 4. material TYPE / SYSTEM picker (per typed trade; Mixed = combine systems) */}
      {typeFor && (
        <>
          <div onClick={() => setTypeFor(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 60 }} />
          <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, maxHeight: "80%", overflowY: "auto", background: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, zIndex: 61, boxShadow: "0 -8px 24px rgba(0,0,0,.2)", maxWidth: 560, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <b>{labelFor(typeFor)} — which type / system?</b>
              <button className="btn ghost" style={{ padding: "2px 8px" }} onClick={() => setTypeFor(null)}>✕</button>
            </div>
            {HOUSE_TYPES[typeFor].map((ty) => (
              <button key={ty} className="btn ghost full" style={{ justifyContent: "flex-start", marginBottom: 4, fontWeight: sc[typeFor] === ty ? 700 : 400, borderColor: sc[typeFor] === ty ? "#14a04a" : undefined }} onClick={() => { onSelect(typeFor, ty); setTypeFor(null); }}>{sc[typeFor] === ty ? "✓ " : ""}{ty}</button>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <input value={customType} onChange={(e) => setCustomType(e.target.value)} placeholder="or type another system…" style={{ flex: 1 }} />
              <button className="btn ghost" disabled={!customType.trim()} onClick={() => { onSelect(typeFor, customType.trim()); setTypeFor(null); }}>Use</button>
            </div>
            <p className="hint" style={{ marginTop: 8 }}>“Mixed” combines systems (e.g. sloped shingle + flat) — AL sizes each part separately so the bid stays accurate.</p>
          </div>
        </>
      )}

      {/* scope checklist (Slack-style) */}
      {selectedKeys.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {selectedKeys.map((t) => (
            <span key={t} onClick={() => { if (HOUSE_TYPES[t]) { setCustomType(""); setTypeFor(t); } }} title={HOUSE_TYPES[t] ? "Tap to change type" : ""} style={{ cursor: HOUSE_TYPES[t] ? "pointer" : "default", fontSize: 12, background: "#e7f6ec", color: "#0a7d36", border: "1px solid #b6e0c4", borderRadius: 12, padding: "3px 10px" }}>
              <b>{labelFor(t)}</b>{sc[t] && sc[t] !== true ? ": " + sc[t] : ""} <span style={{ fontWeight: 700 }} onClick={(e) => { e.stopPropagation(); onDeselect(t); }}>×</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="hint" style={{ marginTop: 12 }}>Pick the trades you're bidding — they build up here, then AL walks each one.</p>
      )}
      <p className="hint" style={{ marginTop: 8 }}>{role === "homeowner" ? "You'll get a price range." : "AL asks the details one trade at a time, then builds the estimate."}</p>
    </div>
  );
}

// Image-based house selector (the simple/SVG view was removed).
function InteractiveHouse(props) {
  return <ImageHouse scope={props.scope} onSelect={props.onSelect} onDeselect={props.onDeselect} priceBook={props.priceBook} role={props.role} />;
}

const TRADE_LABEL = (t) => (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t;
// Pure VISUAL house — reacts to the conversation, never tapped. Crossfades between
// the three render states per category and brightens the active/selected trade
// area(s), dimming the rest. No clickable hotspots, no hover labels.
function HouseVisual({ view, selected, activeTrade, onChipTap, onChipRemove, onAddMore }) {
  const cur = HOUSE_STATES.find((s) => s.key === view) || HOUSE_STATES[0];
  const sel = selected || {};
  const here = HOUSE_HOTSPOTS.filter((h) => h.state === view && sel[h.trade]);
  const anyHL = here.length > 0;
  const activeHere = activeTrade && HOUSE_HOTSPOTS.find((h) => h.state === view && h.trade === activeTrade);
  const selKeys = Object.keys(sel);
  return (
    <div className="card househero" style={{ marginTop: 10, overflow: "hidden", padding: 10 }}>
      {/* category tabs — read-only status, the chat drives them */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {HOUSE_STATES.map((s) => (
          <div key={s.key} style={{ flex: 1, textAlign: "center", padding: "5px 2px", fontSize: 12, fontWeight: view === s.key ? 700 : 500, color: view === s.key ? "#0a7d36" : "#9aa3ad", borderBottom: view === s.key ? "2px solid #0a7d36" : "2px solid #eef0f2", transition: "color .3s" }}>{CAT_LABEL[s.key]}</div>
        ))}
      </div>
      <div style={{ position: "relative", width: "100%", height: 0, paddingTop: cur.aspect + "%", transition: "padding-top .45s ease", borderRadius: 10, overflow: "hidden", background: "#dfe6ee" }}>
        {HOUSE_STATES.map((s) => (
          <img key={s.key} src={HOUSE_IMG[s.key]} alt={CAT_LABEL[s.key] + " view"}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: view === s.key ? 1 : 0, transform: view === s.key ? "scale(1)" : "scale(1.05)", transition: "opacity .45s ease, transform .6s ease", pointerEvents: "none" }} />
        ))}
        {/* dim the whole render when something is highlighted */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,12,20,.42)", opacity: anyHL ? 1 : 0, transition: "opacity .35s ease", pointerEvents: "none" }} />
        {/* bright box(es) for selected trades in this view; the active one glows + lightens */}
        {here.map((h) => {
          const isActive = activeTrade === h.trade;
          return (
            <div key={h.trade} style={{ position: "absolute", left: h.x + "%", top: h.y + "%", width: h.w + "%", height: h.h + "%", borderRadius: 8, border: "2px solid " + (isActive ? "#36e07a" : "rgba(124,255,176,.75)"), background: isActive ? "rgba(255,255,255,.16)" : "rgba(124,255,176,.04)", boxShadow: isActive ? "0 0 16px rgba(54,224,122,.85)" : "0 0 8px rgba(124,255,176,.45)", pointerEvents: "none", transition: "all .35s ease" }}>
              <span style={{ position: "absolute", top: -9, left: 6, fontSize: 10, fontWeight: 700, color: "#fff", background: isActive ? "#1B7A3D" : "#2a3340", padding: "1px 6px", borderRadius: 6, whiteSpace: "nowrap" }}>{h.label}</span>
            </div>
          );
        })}
      </div>
      {/* SCOPE RAIL — selected items pinned on the anchor; the chat below shows only the active question */}
      {selKeys.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, alignItems: "center" }}>
          {selKeys.map((t) => {
            const on = activeTrade === t;
            return (
              <span key={t} onClick={() => onChipTap && onChipTap(t)} title={HOUSE_TYPES[t] ? "Tap to set/change type" : "Tap to focus"} style={{ cursor: "pointer", fontSize: 12, background: on ? "#0a7d36" : "#e7f6ec", color: on ? "#fff" : "#0a7d36", border: "1px solid " + (on ? "#0a7d36" : "#b6e0c4"), borderRadius: 12, padding: "3px 9px", whiteSpace: "nowrap" }}>
                <b>{TRADE_LABEL(t)}</b>{sel[t] && sel[t] !== true ? ": " + sel[t] : ""} <span style={{ fontWeight: 700, marginLeft: 2 }} onClick={(e) => { e.stopPropagation(); onChipRemove && onChipRemove(t); }}>×</span>
              </span>
            );
          })}
          {onAddMore && <button className="btn ghost" style={{ padding: "2px 9px", fontSize: 12 }} onClick={onAddMore}>+ add</button>}
        </div>
      ) : (
        <p className="hint" style={{ marginTop: 8, textAlign: "center" }}>
          {activeHere ? "Sizing " + TRADE_LABEL(activeTrade) + " — AL's on it." : "AL highlights each area as you go — pick trades with the buttons."}
        </p>
      )}
    </div>
  );
}

/* ============================================================ */
function App() {
  const [me, setMe] = useState({ uidH: "", uidC: "", role: "", plan: "", passed: [], mine: [], cele: null, readMsgs: {}, seenAt: 0 });
  const [profH, setProfH] = useState({ name: "", contact: "", town: "", address: "", bio: "", avatar: "" });
  const [profC, setProfC] = useState({ name: "", company: "", trades: "", town: "", base: "", radius: 30, bio: "", prefMaterials: "", avatar: "", posts: [], tierPrefs: {}, mobBase: 350, mobTruckPerMi: 0.7, cazaManual: null, offManualSeen: {} });
  const [tab, setTab] = useState("post");
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState("");
  const [board, setBoard] = useState([]);
  const [users, setUsers] = useState({});
  const [pros, setPros] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [viewPosts, setViewPosts] = useState([]);
  const [chatJob, setChatJob] = useState(null);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatText, setChatText] = useState("");
  const [party, setParty] = useState(null);
  const [unread, setUnread] = useState({});
  const loaded = useRef(false);
  const lastArchive = useRef(0);
  const meTimer = useRef(null);
  const draftTimer = useRef(null);
  const profTimer = useRef(null);
  const chatEnd = useRef(null);

  /* homeowner job draft */
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);
  const [roofDims, setRoofDims] = useState("");
  const [roofOpen, setRoofOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [bidPreview, setBidPreview] = useState(null);
  const [jobAddr, setJobAddr] = useState("");
  const [sameAddr, setSameAddr] = useState(true);
  const [addrPublic, setAddrPublic] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [diag, setDiag] = useState("");
  const [bidPrices, setBidPrices] = useState({});
  const [bidOverride, setBidOverride] = useState({});
  const [radiusOn, setRadiusOn] = useState(true);
  const [archived, setArchived] = useState([]);
  const [priceLib, setPriceLib] = useState([]);
  const [costCache, setCostCache] = useState({});
  const [matCosts, setMatCosts] = useState([]); // [{name, unit, cost}] from contractor CSV
  const [priceBook, setPriceBook] = useState(SEED_PRICES);
  const [rateBook, setRateBook] = useState(SEED_RATES);
  const [estDimRows, setEstDimRows] = useState([]); // [{id,label,value,unit}]
  const [bookOpen, setBookOpen] = useState("");
  const [measOpen, setMeasOpen] = useState("");
  const [estScope, setEstScope] = useState(null); // selected subcategory label (string)
  const [estMode, setEstMode] = useState("categories"); // Estimate tab view: "categories" | "house" (whole-house image selector)
  const [estRunPending, setEstRunPending] = useState(false); // house → delegate to the Categories estimator (FIX 2A)
  const [estDimVals, setEstDimVals] = useState({}); // {key: value}
  const [estGreeted, setEstGreeted] = useState(false);
  const [estTyping, setEstTyping] = useState(false);
  const [estTyped, setEstTyped] = useState(""); // characters revealed so far
  const [estCat, setEstCat] = useState(null); // chosen top-level category
  const [estOpenDesc, setEstOpenDesc] = useState(""); // opening free-text box
  const [estCustomType, setEstCustomType] = useState(""); // typed custom work type
  const estGreetRef = useRef(false);
  const estFirst = ((profC.name || "").trim().split(/\s+/)[0] || "");
  const EST_GREETING = (estFirst ? "Hey " + estFirst + "! " : "Hey! ") + "What are we pricing today? Pick the type of work below, or just tell me what you're looking at — I've seen worse, probably.";
  const [matCostBusy, setMatCostBusy] = useState(false);
  const [svcPrompt, setSvcPrompt] = useState(null); // {name, url} when showing the pre-link instructions
  const [appDist, setAppDist] = useState({});
  const [jobView, setJobView] = useState("active");
  const [inRange, setInRange] = useState(null);
  const [matLists, setMatLists] = useState({});
  const [matBusy, setMatBusy] = useState("");
  const [confirmDel, setConfirmDel] = useState("");
  const [editJob, setEditJob] = useState(null);
  const [editText, setEditText] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [priorQA, setPriorQA] = useState([]); // accumulated {q,a} from earlier question rounds
  // ---- AI trade builder (Feature A) ----
  const [aiTrades, setAiTrades] = useState([]);      // saved AI-built trade defs
  const [aiTradeDesc, setAiTradeDesc] = useState(""); // builder input
  const [aiTradeBusy, setAiTradeBusy] = useState(false);
  const [aiTradeDraft, setAiTradeDraft] = useState(null); // generated def under review
  const aiActiveTrade = useRef(null);                // def to inject into the next estimate
  // ---- job-cost calibration (Feature B) ----
  const [calib, setCalib] = useState({});            // { tradeKey: { jobs:[{est,act,at,title}], factor, n } }
  const [logOpen, setLogOpen] = useState(false);     // "log actuals" form open on the result
  const [logMH, setLogMH] = useState("");
  // ---- contractor Pro estimator ----
  const [estDesc, setEstDesc] = useState("");
  const [estPhotos, setEstPhotos] = useState([]);
  const [estDims, setEstDims] = useState("");
  const [estPanelW, setEstPanelW] = useState(16); // standing seam panel width (in) for deterministic panel LF
  const [estBusy, setEstBusy] = useState("");
  const [estResult, setEstResult] = useState(null); // {trade, items:[{name,qty,unit,cost}], laborHours, laborRate, equipment, taxRate, days, crew, notes}
  const [estMargin, setEstMargin] = useState(30);
  const [estMiles, setEstMiles] = useState(0); // round-trip delivery/mobilization miles (manual entry first)
  const [estMobOn, setEstMobOn] = useState(true); // include the delivery/mobilization charge on this estimate
  const [prefCat, setPrefCat] = useState("shingle"); // which tier-preset category is shown in Profile
  const [cmOpen, setCmOpen] = useState(false); // Caza Manual editor (Profile) expanded
  // FIX 2 — Profile groups are collapsible accordions (chips removed). Default collapsed ("five clean bars");
  // remembered for the session. Cards stay MOUNTED (hidden via CSS) so in-progress edits survive a collapse.
  const [gOpen, setGOpen] = useState({});
  const toggleGroup = (k) => setGOpen((o) => ({ ...o, [k]: !o[k] }));
  const [propOpen, setPropOpen] = useState(false);  // homeowner proposal presentation view
  const [propScopeOpen, setPropScopeOpen] = useState(false); // itemized scope expanded
  const [timerView, setTimerView] = useState("");   // "" | "timer" | "closeout" — on-site per-phase time audit
  const [jobCrew, setJobCrew] = useState(3);         // default crew size; each phase defaults to this
  const [, setNowTick] = useState(0);                // 1s heartbeat to re-render running phase clocks
  const [tcorr, setTcorr] = useState({});            // closeout correction drafts keyed "ti-pi"
  // saved-estimates library (build-set #3)
  const [estimates, setEstimates] = useState([]);     // the saved list (from estStore)
  const [estId, setEstId] = useState(null);           // id of the estimate currently open/in-progress
  const estIdRef = useRef(null);                      // live mirror — two persistCurrent calls racing before setEstId commits must mint ONE id, not two records
  const [estCustomer, setEstCustomer] = useState(""); // customer name on the current estimate
  const [estAddress, setEstAddress] = useState("");   // job address on the current estimate
  const [estEmail, setEstEmail] = useState("");       // customer email (feeds DocuSign send / emailed copy / JobNimbus later)
  const [estStatus, setEstStatus] = useState("draft");// draft | sent | won | lost
  const [estNotes, setEstNotes] = useState("");       // free-text job notes saved with the job
  const [estJobPhotos, setEstJobPhotos] = useState([]);// job/documentation photos saved with the job (separate from AI inspection photos)
  const [savedOpen, setSavedOpen] = useState(false);  // "Saved estimates" list expanded
  const [diagLink, setDiagLink] = useState("");        // diagnostic share link (Part 2), per open estimate
  const [diagBusy, setDiagBusy] = useState(false);
  const [estSvcPrompt, setEstSvcPrompt] = useState(null);
  // ---- Whole House / Addition (deterministic multi-trade) ----
  const [whSpecs, setWhSpecs] = useState(null);   // trade input schemas from /trade-specs
  const [whChecked, setWhChecked] = useState({}); // { trade: bool }
  const [whInputs, setWhInputs] = useState({});   // { trade: { field: value } }
  const [whResult, setWhResult] = useState(null); // combined estimate (real-priced LLM takeoff per trade)
  const [whBusy, setWhBusy] = useState(false);
  const [houseScope, setHouseScope] = useState({}); // Stage 5 image-house: { trade: materialName } across all 21 house trades
  const [housePanelW, setHousePanelW] = useState({}); // per-trade panel width (standing-seam roofing) — drives panel LF
  const [selStep, setSelStep] = useState("category"); // guided chat selection step: "category" | "trades" | "type" | "ready"
  const [customTrade, setCustomTrade] = useState(""); // "type a trade" box in the chat
  const [customType, setCustomType] = useState("");   // "type a system" box in the chat
  const [houseView, setHouseView] = useState("exterior"); // visual house category state (driven by the chat, not tapped)
  const [activeTrade, setActiveTrade] = useState(null); // trade AL is currently working → brightened on the house
  const [enginePB, setEnginePB] = useState([]); // [{id,trade,category,material,unit,unitCost,source}] — feeds the deterministic price waterfall
  const [whPbOpen, setWhPbOpen] = useState(false);
  const [whDims, setWhDims] = useState("");        // extracted measurements for the house flow
  const [whScopeLines, setWhScopeLines] = useState({}); // SCOPE PARTITION: per-trade slice from AL (each item owned by one block)
  const [whReportBusy, setWhReportBusy] = useState(false);
  const [whPhotos, setWhPhotos] = useState([]);    // jobsite photos (Photo button)
  const [whMeasuredOpen, setWhMeasuredOpen] = useState(false); // "Measured" get-measured links
  const [alMsgs, setAlMsgs] = useState([]);        // house AL chat thread [{role:"ai"|"me", text}]
  const alMsgsRef = useRef([]);                    // live mirror of alMsgs — the hands-free loop runs in stale closures, so history must come from the ref, not the captured state
  const setAlThread = (next) => { alMsgsRef.current = next; setAlMsgs(next); };
  const alSendRef = useRef(null);                  // latest alSend — the loop calls this so each turn reads CURRENT state (scope/dims/context), not the session-start closure
  const [alInput, setAlInput] = useState("");
  const [alBusy, setAlBusy] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false); // talk-to-AL voice loop (build-set #4)
  const [persona, setPersona] = useState("AL"); // selected assistant persona name (voice + avatar + name)
  const personaRef = useRef("AL");              // stale-closure-proof for async speak
  const curPersona = personaByName(persona);
  const personaSet = (name) => { const p = personaByName(name); setPersona(p.name); personaRef.current = p.name; pSet(PERSONA_KEY, p.name); };
  const [personaSpeeds, setPersonaSpeeds] = useState({}); // per-persona TTS speed (0.7–1.2, default 1.0)
  const personaSpeedsRef = useRef({});                    // stale-closure-proof for async speak
  const personaSpeed = (name) => { const v = (personaSpeedsRef.current || {})[name]; return v >= 0.7 && v <= 1.2 ? v : 1; };
  const personaSpeedSet = (name, v) => { const nv = Math.max(0.7, Math.min(1.2, Math.round((Number(v) || 1) * 100) / 100)); const next = Object.assign({}, personaSpeedsRef.current, { [name]: nv }); personaSpeedsRef.current = next; setPersonaSpeeds(next); pSet(PERSONA_SPEED_KEY, next); };
  // avatar for a persona: image if supplied (AL keeps his photo); else initials circle —
  // never a broken-image icon. Dropping an image into a persona's avatar is the only step later.
  const personaFace = (p, sm) => {
    const img = (p.name === "AL") ? AL_NOTEPAD : p.avatar;
    const px = sm ? 28 : 44;
    if (img) return <img src={img} alt={p.name} style={{ width: px, height: px, borderRadius: "50%", objectFit: "cover", flex: "0 0 auto" }} />;
    return <div style={{ width: px, height: px, borderRadius: "50%", background: "#0a7d36", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: sm ? 11 : 15, flex: "0 0 auto" }}>{personaInitials(p.name)}</div>;
  };
  const [listening, setListening] = useState(false); // mic is actively recording this turn
  const [transcribing, setTranscribing] = useState(false); // recorded burst is being transcribed by Scribe
  const [voiceSession, setVoiceSession] = useState(false); // hands-free conversation session is open
  const recogRef = useRef(null);                     // SpeechRecognition instance (keyboard-mic fallback only)
  const mediaRecRef = useRef(null);                  // MediaRecorder for ElevenLabs Scribe capture
  const mediaChunksRef = useRef([]);                 // recorded audio chunks
  const mediaStreamRef = useRef(null);               // mic MediaStream (to stop tracks)
  const sessionRef = useRef(false);                  // conversation session active (stale-closure-proof)
  const micMutedRef = useRef(false);                 // mic held closed while AL reads back (anti self-capture)
  const audioCtxRef = useRef(null);                  // AudioContext for silence detection (VAD)
  const analyserRef = useRef(null);                  // AnalyserNode reading mic level
  const vadTimerRef = useRef(null);                  // VAD poll interval
  const voiceRef = useRef(false);                    // mirrors voiceMode for async callbacks (stale-closure-proof)
  const ttsPrimedRef = useRef(false);                // browser TTS unlocked by a user gesture (iOS)
  const alAudioRef = useRef(null);                   // reusable <audio> for ElevenLabs playback
  const audioUnlockedRef = useRef(false);            // <audio> element unlocked by a gesture (iOS)
  // ---- CSV importer (Stage 2b/2c) ----
  // Intake tiles (FIX 1 wiring): each tile opens ITS OWN intake, rendered directly beneath the tiles
  // (not below the whole book editor — that put it off-screen on mobile and made the tiles feel dead).
  const [pbIntakeMode, setPbIntakeMode] = useState(""); // "" | "csv" | "photo" | "feed"
  const pbPhotoInputRef = useRef(null); // always-mounted hidden inputs — a tile tap clicks these
  const pbCsvFileRef = useRef(null);    // SYNCHRONOUSLY (same gesture, so iOS opens the picker)
  const pbIntakeRef = useRef(null);     // the revealed intake block (scrollIntoView target)
  const pbOpenIntake = (mode, ref) => {
    setPbIntakeMode(mode);
    if (ref && ref.current) ref.current.click();
    setTimeout(() => { if (pbIntakeRef.current && pbIntakeRef.current.scrollIntoView) pbIntakeRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); }, 80);
  };
  // FIX 4 — grouped, collapsible price-book view (trade -> category), search, closed by default.
  const [pbSearch, setPbSearch] = useState("");
  const [pbGrpOpen, setPbGrpOpen] = useState({}); // keys: "t:<trade>" and "c:<trade>|<category>"
  const togglePbGrp = (k) => setPbGrpOpen((o) => ({ ...o, [k]: !o[k] }));
  const [staleSheetOpen, setStaleSheetOpen] = useState(false); // "reprice run" print view (stale prices)
  const [csvParsed, setCsvParsed] = useState(null); // { headers:[], rows:[[]] }
  const [csvMap, setCsvMap] = useState({ material: -1, cost: -1, unit: -1, category: -1 });
  const [csvReview, setCsvReview] = useState(null); // [{material,unit,cost,trade,category,confidence}]
  const [csvBusy, setCsvBusy] = useState(false);
  const [csvSupplier, setCsvSupplier] = useState("");
  const [csvMethod, setCsvMethod] = useState("csv"); // csv | photo | pdf | api — source metadata
  const [csvUrl, setCsvUrl] = useState("");
  // ---- homeowner conversational estimate ----
  const [convMsgs, setConvMsgs] = useState([]); // [{role:"ai"|"me", text}]
  const [convInput, setConvInput] = useState("");
  const [convStarted, setConvStarted] = useState(false);
  const [convBusy, setConvBusy] = useState(false);
  const [convBid, setConvBid] = useState(null); // live {priceLow, priceHigh, days, confidence, primaryOptions, cost...}
  const [convFacts, setConvFacts] = useState([]); // accumulated confirmed details
  const [convDone, setConvDone] = useState(false);
  const [convPhotos, setConvPhotos] = useState([]);
  const [convOptions, setConvOptions] = useState([]); // clickable choices for the latest AI question
  const [convConfirmReset, setConvConfirmReset] = useState(false);
  const [convReportOpen, setConvReportOpen] = useState(false);
  const convEndRef = useRef(null);
  const convGreeting = useRef(false);
  const engineRangeSig = useRef(""); // dedupe + last-write-wins guard for the engine-backed range

  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 6000); };
  // ---- Whole House / Addition handlers ----
  const loadWholeHouseSpecs = async () => {
    if (whSpecs) return;
    try {
      const res = await fetch("/.netlify/functions/trade-specs");
      const d = await res.json();
      const list = d.trades || [];
      const checked = {}, inputs = {};
      list.forEach((t) => {
        checked[t.trade] = false; // default EMPTY — the house drives selection (clicking a hotspot adds the trade)
        const iv = {};
        t.inputs.forEach((inp) => { iv[inp.name] = inp.default; });
        iv.complexityFactor = t.complexity.default;
        inputs[t.trade] = iv;
      });
      setWhSpecs(list); setWhChecked(checked); setWhInputs(inputs);
    } catch (e) { flash("Couldn't load trades: " + errMsg(e)); }
  };
  const whToggle = (trade) => setWhChecked((p) => ({ ...p, [trade]: !p[trade] }));
  const whSet = (trade, name, val) => setWhInputs((p) => ({ ...p, [trade]: { ...(p[trade] || {}), [name]: val } }));
  // Stage 5 image-house -> scope. Records trade->material for ALL house trades and
  // mirrors the 8 deterministic ones into whChecked so the existing whole-house
  // build includes them. Never touches the estimating engine itself.
  const houseSelect = (trade, material) => {
    setHouseScope((p) => ({ ...p, [trade]: material || true }));
    const k = PB_TRADE_KEY[trade];
    if (k) setWhChecked((p) => ({ ...p, [k]: true }));
  };
  const houseDeselect = (trade) => {
    setHouseScope((p) => { const n = { ...p }; delete n[trade]; return n; });
    const k = PB_TRADE_KEY[trade];
    if (k) setWhChecked((p) => ({ ...p, [k]: false }));
  };
  // ---- engine price book (manual entry) ----
  const saveEnginePB = (next) => { setEnginePB(next); pSet(ENGINE_PB_KEY, next); };
  // MATERIAL PRICING HUB Part 2 / FIX 3 — THE ONE merged price list. The governed enginePB
  // (trade/date/dedup) comes FIRST so it WINS every tie, then legacy matCosts, then seed priceBook,
  // deduped by name. Uncapped (the book is uncapped) — every price read in the app goes through this
  // one enginePB-first precedence rule: the takeoff pricer's `books`, the AI-trade `pb`, and (capped
  // via contractorPriceLines) the LLM prompt injection. Retiring legacy = they just stop contributing.
  const contractorPriceBook = () => {
    const seen = new Set(), out = [];
    // carry cat/trade (from the FIRST, enginePB-first occurrence) so the takeoff pricer can do
    // category-assisted matching (Defect C) — governed rows win the tie, so their category wins too.
    const add = (name, unit, cost, cat, trade) => { const nm = String(name || "").trim(), key = nm.toLowerCase(); if (!nm || !(num(cost) > 0) || seen.has(key)) return; seen.add(key); out.push({ name: nm, unit: unit || "", cost: num(cost), cat: cat || "", trade: trade || "" }); };
    (enginePB || []).forEach((e) => add(e.material, e.unit, e.unitCost, e.category, e.trade));
    (matCosts || []).forEach((m) => add(m.name, m.unit, m.cost, "", ""));
    (priceBook || []).forEach((p) => add(p.name, p.unit, p.price, p.cat, ""));
    return out;
  };
  // Formatted, capped-for-tokens view of the merged book for LLM prompt injection.
  const contractorPriceLines = () => contractorPriceBook().slice(0, 120).map((b) => "- " + b.name + (b.unit ? " (" + b.unit + ")" : "") + ": $" + b.cost);
  // PART 5 — stale export ("reprice run" list). Rows stale per priceIsStale, grouped supplier → trade.
  const csvCell = (v) => { const s = String(v == null ? "" : v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const downloadText = (text, filename, mime) => {
    try { const url = URL.createObjectURL(new Blob([text], { type: mime || "text/plain" })); const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100); }
    catch (e) { flash("Couldn't download the file."); }
  };
  const staleRows = () => enginePB.filter(priceIsStale).slice().sort((a, b) => { const sa = priceSupplier(a) || "zzz", sb = priceSupplier(b) || "zzz"; if (sa !== sb) return sa.localeCompare(sb); if (a.trade !== b.trade) return String(a.trade).localeCompare(String(b.trade)); return String(a.material).localeCompare(String(b.material)); });
  const exportStalePricesCSV = () => {
    const rows = staleRows();
    if (!rows.length) { flash("No stale prices — everything's up to date."); return; }
    const csv = ["Supplier,Trade,Material,Unit,Last price,Last updated"].concat(rows.map((e) => [priceSupplier(e) || "(unknown)", e.trade || "", e.material || "", e.unit || "", num(e.unitCost) || 0, priceDate(e) || "unknown"].map(csvCell).join(","))).join("\n");
    downloadText(csv, "caza-stale-prices-" + new Date().toISOString().slice(0, 10) + ".csv", "text/csv");
  };
  const openStaleSheet = () => { if (!staleRows().length) { flash("No stale prices — everything's up to date."); return; } setStaleSheetOpen(true); };
  // FULL EXPORTS — every material price across all three stores (with provenance + whether the row
  // actually WINS the enginePB-first dedup) and the whole production rate book. Same precedence walk
  // as contractorPriceBook so "In use = yes" rows are exactly what estimates price from.
  const exportAllPricesCSV = () => {
    const seen = new Set(); const rows = [];
    const push = (source, trade, cat, name, unit, cost, supplier, updated) => {
      const nm = String(name || "").trim(); if (!nm || !(num(cost) > 0)) return;
      const k = nm.toLowerCase(); const inUse = !seen.has(k); if (inUse) seen.add(k);
      rows.push([source, inUse ? "yes" : "no (shadowed)", trade || "", cat || "", nm, unit || "", num(cost), supplier || "", updated || ""]);
    };
    (enginePB || []).forEach((e) => push("governed", e.trade, e.category, e.material, e.unit, e.unitCost, priceSupplier(e), priceDate(e) || "unknown"));
    (matCosts || []).forEach((m) => push("legacy", "", "", m.name, m.unit, m.cost, "", ""));
    (priceBook || []).forEach((p) => push("seed", "", p.cat, p.name, p.unit, p.price, "", ""));
    if (!rows.length) { flash("No material prices to export yet."); return; }
    const csv = ["Source,In use,Trade,Category,Material,Unit,$/unit,Supplier,Last updated"].concat(rows.map((r) => r.map(csvCell).join(","))).join("\n");
    downloadText(csv, "cazbid-material-costs-" + new Date().toISOString().slice(0, 10) + ".csv", "text/csv");
    flash(rows.length + " material prices exported (" + rows.filter((r) => r[1] === "yes").length + " in use).");
  };
  const exportRatesCSV = () => {
    if (!rateBook.length) { flash("No production rates to export."); return; }
    const csv = ["Category,Task,Unit,MH per unit"].concat(rateBook.map((r) => [r.cat || "", r.task || "", r.unit || "", num(r.rate) || 0].map(csvCell).join(","))).join("\n");
    downloadText(csv, "cazbid-production-rates-" + new Date().toISOString().slice(0, 10) + ".csv", "text/csv");
    flash(rateBook.length + " production rates exported.");
  };
  const printStaleSheet = () => {
    const prev = document.title; document.title = "Caza — prices to reprice (" + new Date().toISOString().slice(0, 10) + ")";
    let done = false; const restore = () => { if (done) return; done = true; document.title = prev; window.removeEventListener("afterprint", restore); };
    window.addEventListener("afterprint", restore); setTimeout(restore, 3000);
    setTimeout(() => { try { window.print(); } catch (e) { restore(); flash("Use Share → Print to save the PDF."); } }, 60);
  };
  // FIX 4: optional trade/category pre-fill so "+ add to {trade}" inside a group lands in that group.
  const pbAdd = (trade, category) => saveEnginePB([...enginePB, { id: "pb" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), trade: (typeof trade === "string" && trade) ? trade : PRICE_BOOK_TRADES[0].trade, category: typeof category === "string" ? category : "", material: "", unit: "", unitCost: 0, source: { method: "manual", date: new Date().toISOString().slice(0, 10) } }]);
  const pbSet = (id, field, val) => saveEnginePB(enginePB.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  const pbDel = (id) => saveEnginePB(enginePB.filter((e) => e.id !== id));
  // Convert the manual price book to the engine's expected shape (valid rows only).
  const enginePriceBookPayload = () => ({
    entries: enginePB
      .filter((e) => e.trade && String(e.material).trim() && num(e.unitCost) > 0)
      .map((e) => ({ trade: e.trade, category: e.category || "", material: e.material, unit: e.unit || "", unitCost: num(e.unitCost), source: e.source || { method: "manual" } })),
  });
  // ---- CSV importer: parse -> column-map -> AI categorize -> review -> commit ----
  const parseCSV = (text) => {
    const lines = String(text).replace(/\r\n?/g, "\n").split("\n").filter((l) => l.trim().length);
    const parseLine = (line) => {
      const out = []; let cur = "", q = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
        else { if (c === '"') q = true; else if (c === ",") { out.push(cur); cur = ""; } else cur += c; }
      }
      out.push(cur); return out.map((s) => s.trim());
    };
    const rows = lines.map(parseLine);
    return { headers: rows[0] || [], rows: rows.slice(1) };
  };
  const csvAutoMap = (headers) => {
    const find = (res) => headers.findIndex((h) => res.some((r) => r.test(String(h).toLowerCase())));
    return {
      material: find([/materi/, /descr/, /\bitem\b/, /product/, /\bname\b/]),
      cost: find([/unit.?cost/, /\bcost\b/, /\bprice\b/, /each/, /\$/]),
      unit: find([/\bunit\b/, /\buom\b/, /^um$/]),
      category: find([/categ/, /\btype\b/, /group/]),
    };
  };
  const onCsvText = (text) => {
    const p = parseCSV(text);
    setCsvParsed(p); setCsvReview(null); setCsvMethod("csv");
    if (p.headers.length) setCsvMap(csvAutoMap(p.headers));
  };
  const onCsvFile = async (file) => {
    if (!file) return;
    try { onCsvText(await file.text()); }
    catch (e) { flash("Couldn't read file: " + errMsg(e)); }
  };
  // PDF / photo of a price sheet -> Claude vision extracts priced lines -> same review gate.
  const onPriceFile = async (file) => {
    if (!file) return;
    setCsvBusy(true);
    try {
      let mediaType = file.type || "";
      let fileData;
      setCsvMethod(mediaType === "application/pdf" ? "pdf" : "photo");
      if (mediaType === "application/pdf") { fileData = await readDataURL(file); }
      else { fileData = await imageToJpeg(file, 1500, 0.8); mediaType = "image/jpeg"; }
      const res = await fetch("/.netlify/functions/extract-prices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileData: fileData, mediaType: mediaType }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || ("HTTP " + res.status));
      if (!d.rows || !d.rows.length) { flash("No priced material lines found in that file."); setCsvBusy(false); return; }
      setCsvParsed(null);
      setCsvReview(d.rows.map((r) => ({ material: r.material, unit: r.unit || "", cost: num(r.cost), trade: r.trade || "other", category: r.category || "", confidence: r.confidence != null ? r.confidence : 0 })));
    } catch (e) { flash("Couldn't read prices: " + errMsg(e)); }
    setCsvBusy(false);
  };
  const csvParseAndCategorize = async () => {
    if (!csvParsed || csvMap.material < 0 || csvMap.cost < 0) { flash("Map at least the Material and Cost columns."); return; }
    const base = csvParsed.rows.map((r) => ({
      material: (r[csvMap.material] || "").trim(),
      unit: csvMap.unit >= 0 ? (r[csvMap.unit] || "").trim() : "",
      cost: num(String(r[csvMap.cost] || "").replace(/[^0-9.\-]/g, "")),
      category: csvMap.category >= 0 ? (r[csvMap.category] || "").trim() : "",
    })).filter((x) => x.material && x.cost > 0);
    if (!base.length) { flash("No valid rows — need a material name and a cost > 0."); return; }
    if (base.length > 120) { flash("Too many rows (" + base.length + "). Split the file to ≤120 rows."); return; }
    setCsvBusy(true);
    try {
      const res = await fetch("/.netlify/functions/categorize-prices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ materials: base.map((b) => b.material) }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || ("HTTP " + res.status));
      setCsvReview(base.map((b, i) => {
        const c = (d.rows && d.rows[i]) || {};
        return { material: b.material, unit: b.unit, cost: b.cost, trade: c.trade || "other", category: b.category || c.category || "", confidence: c.confidence != null ? c.confidence : 0 };
      }));
    } catch (e) { flash("Categorize failed: " + errMsg(e)); }
    setCsvBusy(false);
  };
  // Supplier API / URL feed -> proxy fetch -> same column-map -> review gate.
  const fetchSupplierUrl = async () => {
    const u = csvUrl.trim();
    if (!/^https:\/\//i.test(u)) { flash("Enter your supplier feed URL (https://…)."); return; }
    setCsvBusy(true);
    try {
      const res = await fetch("/.netlify/functions/fetch-url?url=" + encodeURIComponent(u));
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || ("HTTP " + res.status));
      const text = String(d.text || "").trim();
      if (!text) { flash("Feed returned nothing."); setCsvBusy(false); return; }
      let host = ""; try { host = new URL(u).hostname; } catch (e) { /* ignore */ }
      if (!csvSupplier) setCsvSupplier(host);
      setCsvMethod("api"); setCsvReview(null);
      if (text.charAt(0) === "[" || text.charAt(0) === "{" || (d.contentType || "").indexOf("json") >= 0) {
        let arr; try { arr = JSON.parse(text); } catch (e) { throw new Error("Feed wasn't valid JSON or CSV"); }
        if (!Array.isArray(arr)) arr = arr.items || arr.data || arr.products || arr.rows || [];
        if (!arr.length || typeof arr[0] !== "object") { flash("Feed had no usable rows."); setCsvBusy(false); return; }
        const headers = Object.keys(arr[0]);
        const rows = arr.map((o) => headers.map((h) => (o[h] == null ? "" : String(o[h]))));
        setCsvParsed({ headers: headers, rows: rows }); setCsvMap(csvAutoMap(headers));
      } else {
        const p = parseCSV(text); setCsvParsed(p); if (p.headers.length) setCsvMap(csvAutoMap(p.headers));
      }
    } catch (e) { flash("Supplier feed failed: " + errMsg(e)); }
    setCsvBusy(false);
  };
  const csvReviewSet = (i, field, val) => setCsvReview((rows) => rows.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));
  const csvResetImport = () => { setCsvParsed(null); setCsvReview(null); setCsvMap({ material: -1, cost: -1, unit: -1, category: -1 }); };
  const csvCommit = () => {
    const valid = (csvReview || []).filter((r) => r.material && num(r.cost) > 0 && r.trade && r.trade !== "other");
    if (!valid.length) { flash("Nothing to commit — give at least one row a real trade (not 'other') and a cost."); return; }
    const date = new Date().toISOString().slice(0, 10);
    // fuzzy dedup: within the same trade, a near-identical material name updates
    // the existing entry instead of adding a duplicate.
    const tok = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((t) => t.length > 1);
    const sim = (a, b) => { const A = new Set(tok(a)), B = new Set(tok(b)); if (!A.size || !B.size) return 0; const sm = A.size <= B.size ? A : B, bg = sm === A ? B : A; let i = 0; sm.forEach((x) => { if (bg.has(x)) i++; }); return i / sm.size; };
    const next = [...enginePB];
    let added = 0, updated = 0;
    valid.forEach((r) => {
      const idx = next.findIndex((e) => e.trade === r.trade && sim(e.material, r.material) >= 0.8);
      // LEGACY migration keeps NO date — an unknown age must LOOK stale, not falsely fresh.
      const entry = { trade: r.trade, category: r.category || "", material: r.material, unit: r.unit || "", unitCost: num(r.cost), source: { method: csvMethod || "csv", supplier: csvSupplier || "", date: csvMethod === "legacy" ? "" : date } };
      if (idx >= 0) { next[idx] = { ...next[idx], ...entry }; updated++; }
      else { next.push({ id: "pb" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), ...entry }); added++; }
    });
    saveEnginePB(next);
    if (csvMethod === "legacy") { setMatCosts([]); pSet(MATCOST_KEY, []); } // retire the ungoverned store once folded in
    csvResetImport(); setPbImportOpen(false);
    flash("Committed " + added + " new + " + updated + " updated to your price book.");
  };
  // MIGRATION (Part 2) — fold the ungoverned legacy matCosts into the canonical book via the SAME
  // categorize → review → commit gate. Rows land as source.method="legacy" with NO date (looks stale).
  const migrateLegacyPrices = async () => {
    if (!matCosts.length) { flash("No legacy CSV prices to consolidate."); return; }
    setCsvBusy(true);
    try {
      const batch = matCosts.slice(0, 120);
      const res = await fetch("/.netlify/functions/categorize-prices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ materials: batch.map((m) => m.name) }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || ("HTTP " + res.status));
      setCsvMethod("legacy"); setCsvSupplier("");
      setCsvReview(batch.map((m, i) => { const c = (d.rows && d.rows[i]) || {}; return { material: m.name, unit: m.unit || "", cost: num(m.cost), trade: c.trade || "other", category: c.category || "", confidence: c.confidence != null ? c.confidence : 0 }; }));
      setWhPbOpen(true); setPbImportOpen(true);
      flash("Review these " + batch.length + " legacy prices, set any 'other' trades, then commit.");
    } catch (e) { flash("Consolidate failed: " + errMsg(e)); }
    setCsvBusy(false);
  };
  // One non-deterministic house trade (roofing, windows, kitchen, …) → an LLM
  // estimate via the SAME server path the categories estimator uses, then a
  // grand-total roll-up. Reuses the shared roofing-labor logic so labor can't
  // underbid (BUG-1 fix applies here too). Uses whDims + whPhotos + the material.
  // ONE per-trade real-priced takeoff — the SAME full LLM takeoff the Categories
  // estimator uses (web-searched prices + the contractor's own price lists + rate
  // book + system-purity + roof-quantity formulas). The house runs this for EVERY
  // selected trade so a bid is identical from either view — NO seed/placeholder
  // path for the house (BUG 6 / the merge). Feeds it whDims + whPhotos + any
  // section-4 dimension fields the user typed for that trade.
  const estimateHouseTradeLLM = async (houseTrade, material) => {
    const region = (profC.base || profC.town || profH.town || "upstate New York").trim();
    const label = (HOUSE_HOTSPOTS.find((h) => h.trade === houseTrade) || {}).label || houseTrade;
    const mat = (material && material !== true) ? String(material) : "";
    const mkey = manualTradeKey(label + " " + mat, "");
    // section-4 typed dimensions for a deterministic trade (so they aren't lost)
    const pbk = PB_TRADE_KEY[houseTrade];
    const fields = (pbk && whInputs[pbk]) ? whInputs[pbk] : null;
    const fieldText = fields ? Object.keys(fields).filter((k) => k !== "complexityFactor" && ((typeof fields[k] === "string" && fields[k]) || num(fields[k]) > 0)).map((k) => k + ": " + fields[k]).join(", ") : "";
    const prompt =
      "You are a senior estimator for an established, insured contractor near " + region + ". Build a DETAILED, itemized estimate a contractor can hand a customer for ONE scope.\n" +
      "WORK: " + label + (mat ? " — material/system: " + mat : "") + "\n" +
      (whDims ? "MEASUREMENTS (use these exact numbers): " + whDims + "\n" : "") +
      (fieldText ? "ENTERED DIMENSIONS: " + fieldText + "\n" : "") +
      (whPhotos.length ? "Photos attached — read scope, materials, condition.\n" : "") +
      EV_FORMULAS +
      "Use web search to verify CURRENT " + new Date().getFullYear() + " LOCAL contractor material unit costs, burdened labor $/hr (small-market ~$45-70/hr, not metro/union), local sales tax, and disposal. Be realistic and accurate — do not pad.\n" +
      "Produce a COMPLETE itemized materials takeoff (8-15+ lines, not two), PRIMARY material first.\n" +
      TRADE_BASE_RULES + tradeModuleFor(label, mat) +
      "LABOR: STEP 1 use the CONTRACTOR PRODUCTION RATES below (hours = qty x MH/unit, summed) for matching tasks; STEP 2 ONE combined difficulty factor capped 1.5 on install only; STEP 3 fallback benchmarks only if nothing matches (asphalt re-roof 1.5-2.5 MH/sq, steep/complex/specialty 4-12+). Never return a token labor number. laborHours = total MH; days = laborHours/(crew x 8).\n" +
      (contractorPriceLines().length ? "CONTRACTOR'S OWN MATERIAL PRICES (use THESE exact unit costs when a line matches; match loosely):\n" + contractorPriceLines().join("\n") + "\n" : "") +
      "CONTRACTOR'S PRICE BOOK (their unit costs; use when a line matches):\n" + priceBook.slice(0, 120).map((m) => "- " + m.name + " (" + m.unit + "): $" + m.price).join("\n") + "\n" +
      "CONTRACTOR'S PRODUCTION RATES (MH/unit, sq=100sqft):\n" + rateBook.slice(0, 120).map((r) => "- " + r.task + " (" + r.unit + "): " + r.rate + " MH/unit").join("\n") + "\n" +
      "FINAL SELF-CHECK: (1) SYSTEM PURITY — delete any line from a DIFFERENT roofing/siding system than this job's (" + (mat || label) + "); an asphalt-shingle job has NO metal-panel / standing-seam / clip / seam-tape lines. (2) sanity-check every qty against the measurements. (3) items[] is MATERIALS ONLY (no labor / equipment / dumpster lines).\n" +
      "Respond with ONLY raw JSON: {\"title\":str,\"trade\":str,\"items\":[{\"name\":str,\"qty\":num,\"unit\":str,\"cost\":num}],\"laborHours\":num,\"laborRate\":num,\"laborSource\":\"ratebook\"|\"estimate\",\"equipment\":num,\"taxRate\":num,\"crew\":num,\"days\":num}";
    const content = [
      ...whPhotos.slice(0, 3).map((ph) => ({ type: "image", source: { type: "base64", media_type: ph.startsWith("data:") ? (ph.substring(5, ph.indexOf(";")) || "image/jpeg") : "image/jpeg", data: ph.split(",")[1] } })),
      { type: "text", text: prompt },
    ];
    const text = await callClaudeBackground([{ role: "user", content }], { search: true, maxTokens: 4000, trade: mkey, priceBook: enginePriceBookPayload(), standingRules: activeRuleTexts(mkey) });
    const d = parseJSON(text);
    let items = Array.isArray(d.items) ? d.items.map((it) => ({ name: String(it.name || "Item"), qty: num(it.qty), unit: String(it.unit || ""), cost: Math.round(num(it.cost)) })) : [];
    const sysStr = installScope(label + " " + mat); // F13: classify by the INSTALL system, not the roof being torn off
    items = stripCrossSystem(items, sysStr); // BUG 8 — drop incompatible-system lines
    const isRoof = /roof|shingle|standing seam|slate|nu-?lok|metal panel|tpo|epdm|membrane/.test(sysStr);
    // ROOF material takeoff. Shingle keeps the qty-override behavior (verified). For
    // NON-shingle types (metal/flat/tile) the LLM under-itemizes ($295 panels bug) —
    // so build the complete deterministic takeoff and price it from the cost book.
    if (isRoof && whDims) {
      const books = contractorPriceBook();
      // DEFECT A: MIXED roof — keep the LLM's verified two-system lines/quantities; price-only pass.
      const __mixed = roofIsMixed(sysStr);
      const q = __mixed ? null : computeRoofQuantities(whDims, sysStr, 0);
      if (__mixed) {
        items = repriceLlmItems(items, books);
        // NEVER-OMIT (run-3): a mixed roof must show its metal PANEL line even if the LLM only shipped
        // band accessories — add a flagged panel line at the best default qty rather than hide the cost.
        if (!items.some((it) => roofPartType(it.name) === "panel")) {
          const bp = bandPartition(whDims, sysStr, mat, 0);
          const qty = bp.panelLF > 0 ? Math.round(bp.panelLF) : 0;
          const mb = matchBookLine({ name: "Standing-seam metal panel", unit: "LF", key: "panel" }, books);
          const up = mb && mb.unitPrice != null ? mb.unitPrice : null;
          items.push({ name: "Standing-seam metal panel (band)", qty: qty, unit: "LF", cost: up != null ? Math.round(up * qty) : 0, unpriced: up == null || qty <= 0 });
        }
        items = reconcileBandPanel(items, whDims, sysStr, mat, 0); // H2: one depth drives both halves
      } else if (q && q.length) {
        if (roofTypeOf(sysStr) !== "shingle") {
          // fallback-for-thin-results only: a ratebook-sourced or >=10-line AI takeoff IS the spec
          if (String(d.laborSource || "").toLowerCase() === "ratebook" || items.length >= 10) items = repriceLlmItems(items, books);
          else items = priceRoofTakeoff(q, books, items);
        } else {
          const matchers = [
            { key: "panel", kw: ["panel", "lok", "standing seam", "seam "] }, { key: "clip", kw: ["clip"] },
            { key: "field", kw: ["shingle", "slate", "field", "membrane", "tpo", "epdm"] }, { key: "iw", kw: ["ice", "i&w", "ice & water", "ice and water"] },
            { key: "drip", kw: ["drip"] }, { key: "starter", kw: ["starter"] }, { key: "ridge", kw: ["ridge cap", "hip cap", "hip/ridge", "ridge/hip"] },
            { key: "valley", kw: ["valley"] }, { key: "step", kw: ["step flash"] }, { key: "pen", kw: ["pipe boot", "penetration", "pipe flash"] },
          ];
          q.forEach((cq) => {
            const mm = matchers.find((x) => x.key === cq.key); if (!mm) return;
            const idx = items.findIndex((it) => { const n = (it.name || "").toLowerCase(); return mm.kw.some((k) => n.indexOf(k) >= 0); });
            if (idx >= 0) { const old = items[idx]; let up = old.qty > 0 ? old.cost / old.qty : old.cost; if ((old.unit || "").toLowerCase() !== (cq.unit || "").toLowerCase() && cq.qty > 0) up = old.cost / cq.qty; items[idx] = Object.assign({}, old, { qty: cq.qty, unit: cq.unit, cost: Math.round(up * cq.qty) }); }
          });
          items = enforceShingleIwGrade(items, books); // F2: regular I&W on shingle — high-temp is steel-only
        }
      }
    }
    const matTotal = items.reduce((s, it) => s + num(it.cost), 0);
    let laborHours = Math.round(num(d.laborHours) || 0);
    const laborRate = Math.round(num(d.laborRate) || 0) || 60;
    const calc = computeLaborFromRateBook(items, rateBook, whDims, label, mat);
    if (calc && calc.hours > 0) laborHours = calc.hours;
    let sqGuess = 0;
    items.forEach((it) => { const u = (it.unit || "").toLowerCase(); if (u.indexOf("square") >= 0 || u === "sq") sqGuess = Math.max(sqGuess, num(it.qty)); });
    if (!sqGuess && whDims) { const m = String(whDims).match(/([\d,]+(?:\.\d+)?)\s*sqft/i); if (m) sqGuess = (num(String(m[1]).replace(/,/g, "")) || 0) / 100; }
    const floor = realisticLaborFloor(sqGuess, whDims, (label + " " + mat).toLowerCase(), isRoof); // raw string — the floor's tear-off test needs the words installScope strips
    if (floor > 0 && laborHours < floor) laborHours = floor;
    if (laborHours <= 0) laborHours = Math.max(8, (num(d.crew) || 2) * (num(d.days) || 1) * 8);
    // Feature B: apply this trade's labor calibration factor (from logged actuals)
    const calibKey = manualTradeKey(label, mat) || houseTrade;
    const ce = calib[calibKey];
    if (ce && ce.factor && ce.factor !== 1) laborHours = Math.max(1, Math.round(laborHours * ce.factor));
    const laborCost = Math.round(laborHours * laborRate);
    const grandTotal = Math.round(matTotal + laborCost + (num(d.equipment) || 0));
    return { trade: houseTrade, title: String(d.title || label), materialTotal: Math.round(matTotal), laborCost: laborCost, laborHours: laborHours, grandTotal: grandTotal, unpriced: items.filter((it) => it.unpriced).length };
  };

  const buildWholeHouse = async () => {
    const sel = Object.keys(houseScope);
    if (!sel.length) { flash("Tap the house to add at least one trade."); return; }
    // FIX 2A — a single trade runs the EXACT Categories estimator (full takeoff +
    // good/better/best + margin), so the house and Categories produce identical
    // results for the same job. (Multi-trade still uses the per-trade roll-up.)
    if (sel.length === 1) {
      const t = sel[0];
      const label = (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t;
      const mat = (houseScope[t] && houseScope[t] !== true) ? String(houseScope[t]) : "";
      aiActiveTrade.current = null;
      setEstScope(label + (mat ? " — " + mat : ""));
      setEstDesc(label + (mat ? " (" + mat + ")" : ""));
      if (whDims) setEstDims(whDims);
      if (whPhotos.length) setEstPhotos(whPhotos.slice(0, 4));
      setEstResult(null);
      setEstMode("categories");
      setEstRunPending(true); // a render-fresh effect runs runEstimate() with the new inputs
      return;
    }
    // every trade now runs the full real-priced takeoff, so it needs some sizing
    const anyFields = sel.some((t) => { const k = PB_TRADE_KEY[t]; const f = k && whInputs[k]; return f && Object.keys(f).some((x) => x !== "complexityFactor" && num(f[x]) > 0); });
    if (!whDims && !whPhotos.length && !anyFields) { flash("Add measurements or photos (📄 Report / 📷 Photo), or type a dimension below, so I can size the job."); return; }
    setWhBusy(true); setWhResult(null);
    try {
      // ONE engine, real pricing, for ALL selected trades (run in parallel)
      const results = await Promise.all(sel.map(async (t) => {
        try { return await estimateHouseTradeLLM(t, houseScope[t]); }
        catch (e) { return { trade: t, error: errMsg(e) }; }
      }));
      const ok = results.filter((r) => !r.error);
      const errors = results.filter((r) => r.error).map((r) => ({ trade: r.trade, error: r.error }));
      if (!ok.length) throw new Error(errors.length ? errors[0].error : "no trades estimated");
      const byTrade = ok.map((r) => ({ trade: r.trade, title: r.title, materialTotal: r.materialTotal, laborCost: r.laborCost, grandTotal: r.grandTotal, unpriced: r.unpriced || 0 }));
      const sum = (f) => ok.reduce((s, r) => s + (r[f] || 0), 0);
      setWhResult({ engine: "house-takeoff", combined: { byTrade: byTrade, materialTotal: Math.round(sum("materialTotal")), laborCost: Math.round(sum("laborCost")), laborHours: Math.round(sum("laborHours")), grandTotal: Math.round(sum("grandTotal")), tradeCount: byTrade.length }, errors: errors });
    } catch (e) { flash("Combined estimate failed: " + errMsg(e)); }
    setWhBusy(false);
  };
  const goTab = (k) => { setTab(k); setViewing(null); setChatJob(null); if (k === "estimator") loadWholeHouseSpecs(); window.scrollTo(0, 0); };
  const shareApp = async () => {
    const url = (typeof window !== "undefined" && window.location && window.location.href) || "";
    const data = { title: "CazBid", text: "Check out CazBid — snap a photo of a home project, get an instant price, and pick a local contractor. (Open in Safari for the best experience.)", url };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(url);
      flash("Link copied — paste it into a text to share CazBid.");
    } catch (e) {
      flash("Share this link: " + url);
    }
  };
  const sendFeedback = () => {
    const body = encodeURIComponent("What I liked:\n\nWhat confused me:\n\nWhat I'd want next:\n\n(Feel free to write however you like!)");
    window.open("mailto:?subject=" + encodeURIComponent("CazBid feedback") + "&body=" + body, "_blank");
  };

  /* ----- boot ----- */
  useEffect(() => {
    (async () => {
      let m = { uidH: "h" + rid(), uidC: "c" + rid(), role: "", plan: "", passed: [], mine: [], cele: null, readMsgs: {}, seenAt: 0 };
      const r = await pGet(ME_KEY);
      if (r) m = { ...m, ...r };
      setMe(m);
      const ph = await sGet(USER_KEY(m.uidH));
      if (ph) setProfH((p) => ({ ...p, ...ph }));
      const pc = await sGet(USER_KEY(m.uidC));
      if (pc) {
        const posts = [];
        for (const meta of pc.posts || []) {
          let photo = meta.photo || "";
          if (!photo) {
            try { const rec = await sGet(POST_KEY(m.uidC, meta.id)); photo = (rec && rec.photo) || ""; } catch (e) { /* skip */ }
          }
          posts.push({ id: meta.id, caption: meta.caption, at: meta.at, photo, uploaded: true });
        }
        setProfC((p) => ({ ...p, ...pc, posts }));
      }
      const pd = await pGet(PROFDRAFT_KEY);
      if (pd) {
        if (pd.h) setProfH((p) => ({ ...p, ...pd.h }));
        if (pd.c) setProfC((p) => ({ ...p, ...pd.c, posts: p.posts }));
      }
      const jd = await pGet(DRAFT_KEY);
      if (jd) { setDesc(jd.desc || ""); setRoofDims(jd.roofDims || ""); }
      if (m.role === "contractor") setTab("feed");
      const arch = await pGet(ARCHIVE_KEY);
      if (arch && Array.isArray(arch)) setArchived(arch);
      const plib = await pGet(PRICELIB_KEY);
      if (plib && Array.isArray(plib)) setPriceLib(plib);
      const cc = await pGet(COSTCACHE_KEY);
      if (cc && typeof cc === "object") setCostCache(cc);
      const mcz = await pGet(MATCOST_KEY);
      if (mcz && Array.isArray(mcz)) setMatCosts(mcz);
      const pbz = await pGet(PRICEBOOK_KEY);
      if (pbz && Array.isArray(pbz) && pbz.length) setPriceBook(pbz);
      const rbz = await pGet(RATEBOOK_KEY);
      if (rbz && Array.isArray(rbz) && rbz.length) setRateBook(rbz);
      const epb = await pGet(ENGINE_PB_KEY);
      if (epb && Array.isArray(epb)) setEnginePB(epb);
      const ait = await pGet(AI_TRADES_KEY);
      if (ait && Array.isArray(ait)) setAiTrades(ait);
      const clb = await pGet(CALIB_KEY);
      if (clb && typeof clb === "object") setCalib(clb);
      const ests = await estStore.list();
      if (ests && ests.length) setEstimates(ests);
      const cjs = await pGet(COSTJOBS_KEY);
      if (Array.isArray(cjs)) setCostJobs(cjs);
      const srs = await pGet(STANDING_RULES_KEY);
      if (Array.isArray(srs)) setStandingRules(srs);
      const cjd = await pGet(CJ_DISMISSED_KEY);
      if (cjd && typeof cjd === "object") cjDismissedRef.current = cjd;
      const pna = await pGet(PERSONA_KEY);
      if (pna && personaByName(pna)) { setPersona(personaByName(pna).name); personaRef.current = personaByName(pna).name; }
      const psp = await pGet(PERSONA_SPEED_KEY);
      if (psp && typeof psp === "object") { setPersonaSpeeds(psp); personaSpeedsRef.current = psp; }
      loaded.current = true;
    })();
  }, []);
  // (Demo contractor/homeowner/job seeding removed — no simulated data.)

  /* ----- autosave: me / job draft / profile drafts ----- */
  useEffect(() => {
    if (!loaded.current) return;
    clearTimeout(meTimer.current);
    meTimer.current = setTimeout(() => pSet(ME_KEY, me), 500);
  }, [me]);
  // autosave: the in-progress estimate (build-set #3) — survives close/reopen; never lost mid-session.
  const estSaveTimer = useRef(null);
  useEffect(() => {
    clearTimeout(estSaveTimer.current); // above the guards — clearing estResult must also kill the pending timer
    if (!loaded.current) return;
    if (!estResult || !(estResult.trades && estResult.trades.length)) return;
    estSaveTimer.current = setTimeout(() => { persistCurrent(); }, 600);
  }, [estResult, estMargin, estMiles, estMobOn, estCustomer, estAddress, estEmail, estStatus, estNotes, estJobPhotos]);
  useEffect(() => {
    if (!loaded.current) return;
    clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => pSet(DRAFT_KEY, { desc, roofDims }), 800);
  }, [desc, roofDims]);
  useEffect(() => {
    if (!loaded.current) return;
    clearTimeout(profTimer.current);
    profTimer.current = setTimeout(() => pSet(PROFDRAFT_KEY, {
      h: profH,
      c: { name: profC.name, company: profC.company, trades: profC.trades, town: profC.town, base: profC.base, radius: profC.radius, bio: profC.bio, prefMaterials: profC.prefMaterials, avatar: profC.avatar, tierPrefs: profC.tierPrefs, mobBase: profC.mobBase, mobTruckPerMi: profC.mobTruckPerMi, cazaManual: profC.cazaManual, offManualSeen: profC.offManualSeen },
    }), 800);
  }, [profH, profC.name, profC.company, profC.trades, profC.town, profC.base, profC.radius, profC.bio, profC.avatar, profC.prefMaterials, profC.tierPrefs, profC.mobBase, profC.mobTruckPerMi, profC.cazaManual, profC.offManualSeen]); // eslint-disable-line

  /* ----- profiles ----- */
  const saveProfileQuiet = async (role) => {
    const uid = role === "contractor" ? me.uidC : me.uidH;
    let rec;
    if (role === "homeowner") {
      rec = { uid, role, ...profH, updatedAt: new Date().toISOString() };
    } else {
      const uploadedIds = [];
      for (const po of profC.posts) {
        if (po.photo && !po.uploaded) {
          let small = po.photo;
          try { small = await dataUrlResize(po.photo, 480, 0.5); } catch (e) { /* keep original */ }
          await sSet(POST_KEY(uid, po.id), { photo: small });
          uploadedIds.push(po.id);
          await sleep(400); // stay under the storage rate limit
        }
      }
      if (uploadedIds.length) {
        setProfC((pc) => ({ ...pc, posts: pc.posts.map((x) => uploadedIds.includes(x.id) ? { ...x, uploaded: true } : x) }));
      }
      try {
        const prev = await sGet(USER_KEY(uid));
        const keep = new Set(profC.posts.map((x) => x.id));
        for (const old of (prev && prev.posts) || []) {
          if (!keep.has(old.id)) { try { await window.storage.delete(POST_KEY(uid, old.id), true); } catch (e) { /* gone */ } }
        }
      } catch (e) { /* best effort */ }
      let thumb = "";
      if (profC.posts[0] && profC.posts[0].photo) {
        try { thumb = await dataUrlResize(profC.posts[0].photo, 180, 0.5); } catch (e) { /* no thumb */ }
      }
      rec = {
        uid, role, name: profC.name, company: profC.company, trades: profC.trades, town: profC.town,
        base: profC.base, radius: profC.radius,
        bio: profC.bio, prefMaterials: profC.prefMaterials, avatar: profC.avatar, thumb,
        posts: profC.posts.map((x) => ({ id: x.id, caption: x.caption, at: x.at })),
        updatedAt: new Date().toISOString(),
      };
    }
    await sSet(USER_KEY(uid), rec);
    const idx = (await sGet(USER_INDEX)) || [];
    if (!idx.includes(uid)) await sSet(USER_INDEX, [uid, ...idx].slice(0, 100));
    setUsers((u) => ({ ...u, [uid]: rec }));
    if (role === "contractor") setProfC((p) => ({ ...p, posts: p.posts.map((x) => ({ ...x, uploaded: true })) }));
  };
  const saveProfile = async (role) => {
    setBusy("prof");
    try {
      if (role === "contractor" && !profC.company.trim()) throw new Error("add your company name");
      if (role === "homeowner" && !profH.name.trim()) throw new Error("add your name");
      if (role === "homeowner" && !profH.contact.trim()) throw new Error("add a phone or email");
      if (role === "homeowner" && !profH.address.trim()) throw new Error("add your home address");
      await saveProfileQuiet(role);
      if (role === "homeowner") { flash("Profile saved ✓ Let's get your project priced."); goTab("chat"); }
      else { flash("Profile saved ✓ Now check the Job Feed for work."); goTab("feed"); }
    } catch (e) { flash("Profile save failed: " + errMsg(e)); }
    setBusy("");
  };
  const setAvatar = async (role, file) => {
    if (!file) return;
    try {
      const img = await imageToJpeg(file, 256, 0.6);
      role === "contractor" ? setProfC({ ...profC, avatar: img }) : setProfH({ ...profH, avatar: img });
    } catch (e) { flash("Couldn't read that photo: " + errMsg(e)); }
  };
  const addPost = async (file, caption) => {
    if (!file) return;
    try {
      const img = await imageToJpeg(file, 480, 0.5);
      setProfC((p) => ({ ...p, posts: [{ id: rid(), photo: img, caption: (caption || "").slice(0, 120), at: new Date().toISOString() }, ...p.posts].slice(0, 6) }));
      flash("Post added — hit Save profile to publish it.");
    } catch (e) { flash("Couldn't read that photo: " + errMsg(e)); }
  };

  /* ----- board + celebrations ----- */
  const detectCelebrations = (jobs) => {
    setMe((m) => {
      const first = !m.cele;
      const cele = m.cele || { apps: {}, wins: [] };
      const apps = { ...cele.apps };
      const wins = [...cele.wins];
      let fire = null;
      for (const j of jobs) {
        if (j.homeownerUid === m.uidH) {
          const n = (j.applicants || []).length;
          if (!first && m.role === "homeowner" && j.status === "open" && n > (apps[j.id] || 0)) {
            fire = fire || { title: "A pro wants your job!", sub: j.title + " — review them under My Jobs" };
          }
          apps[j.id] = n;
        }
        if (j.chosen === m.uidC && !wins.includes(j.id)) {
          if (!first && m.role === "contractor") {
            fire = fire || { title: "You got the job!", sub: (j.homeownerName ? j.homeownerName + " hired you — " : "") + j.title };
          }
          wins.push(j.id);
        }
      }
      if (fire) setTimeout(() => setParty(fire), 250);
      return { ...m, cele: { apps, wins } };
    });
  };
  const buildNotifs = async (jobs) => {
    const list = [];
    const isHO = me.role === "homeowner";
    const isCO = me.role === "contractor";
    for (const j of jobs) {
      const t = (d) => { try { return new Date(d).getTime(); } catch (e) { return 0; } };
      // contractor: new open jobs in the feed
      if (isCO && j.status === "open" && j.homeownerUid !== me.uidH && !me.passed.includes(j.id)) {
        list.push({ id: "new-" + j.id, at: t(j.createdAt), icon: "job", text: "New job posted: " + j.title, jobId: j.id });
      }
      // homeowner: someone applied to my open job
      if (isHO && j.homeownerUid === me.uidH) {
        for (const a of j.applicants || []) {
          const u = users[a.uid];
          list.push({ id: "app-" + j.id + a.uid, at: t(a.at), icon: "bid", text: (u ? u.company : a.company) + " wants \"" + j.title + "\" — " + $0(a.bid || j.price), jobId: j.id });
        }
      }
      // contractor: I got hired (accepted bid)
      if (isCO && j.chosen === me.uidC) {
        list.push({ id: "hired-" + j.id, at: t(j.matchedAt || j.createdAt), icon: "hired", text: "You were hired for: " + j.title, jobId: j.id });
      }
      // homeowner: I hired someone (matched)
      if (isHO && j.homeownerUid === me.uidH && j.status === "matched" && j.chosen) {
        const u = users[j.chosen];
        list.push({ id: "match-" + j.id, at: t(j.matchedAt || j.createdAt), icon: "hired", text: "You hired " + (u ? u.company : "a pro") + " for: " + j.title, jobId: j.id });
      }
      // messages: latest message from the other party on my matched jobs
      const involved = (isHO && j.homeownerUid === me.uidH) || (isCO && j.chosen === me.uidC);
      if (involved && (j.status === "matched" || j.status === "complete")) {
        try {
          const msgs = (await sGet(CHAT_KEY(j.id))) || [];
          const last = msgs[msgs.length - 1];
          if (last && last.from !== me.uidH && last.from !== me.uidC) {
            list.push({ id: "msg-" + j.id + "-" + last.id, at: t(last.at), icon: "msg", text: last.name + ": " + last.text.slice(0, 40) + (last.text.length > 40 ? "…" : ""), jobId: j.id });
          }
        } catch (e) { /* skip */ }
      }
    }
    list.sort((a, b) => b.at - a.at);
    setNotifs(list.slice(0, 30));
  };
  const checkUnread = async (jobs) => {
    const mine = jobs.filter((j) => (j.status === "matched" || j.status === "complete") && (j.homeownerUid === me.uidH || j.chosen === me.uidC));
    const out = {};
    for (const j of mine.slice(0, 12)) {
      try {
        const msgs = (await sGet(CHAT_KEY(j.id))) || [];
        const read = (me.readMsgs || {})[j.id] || 0;
        const unseen = msgs.slice(read).filter((x) => x.from !== me.uidH && x.from !== me.uidC).length;
        if (unseen > 0) out[j.id] = unseen;
      } catch (e) { /* skip */ }
    }
    setUnread(out);
  };
  const refreshBoard = async () => {
    setBusy("board");
    try {
      const rawIdx = (await sGet(JOB_INDEX)) || [];
      const ids = rawIdx.slice(0, 40);
      const jobs = [];
      const need = new Set();
      for (const id of ids) {
        const j = await sGet(JOB_KEY(id));
        if (!j) continue;
        jobs.push(j);
        if (j.homeownerUid) need.add(j.homeownerUid);
        if (j.chosen) need.add(j.chosen);
        for (const a of j.applicants || []) need.add(a.uid);
      }
      const merged = { ...users };
      for (const uid of need) {
        if (!merged[uid]) {
          const u = await sGet(USER_KEY(uid));
          if (u) merged[uid] = u;
        }
      }
      setUsers(merged);
      setBoard(jobs);
      const nowA = Date.now();
      if (nowA - lastArchive.current > 20000) { lastArchive.current = nowA; autoArchive(jobs); }
      detectCelebrations(jobs);
      checkUnread(jobs);
      buildNotifs(jobs);
      setDiag(rawIdx.length + " job" + (rawIdx.length === 1 ? "" : "s") + " on the board, " + jobs.length + " loaded");
    } catch (e) { setDiag("board read FAILED: " + errMsg(e)); flash("Couldn't load the board: " + errMsg(e)); }
    setBusy("");
  };
  const checkRange = async () => {
    if (me.role !== "contractor" || !radiusOn || !profC.base || !profC.base.trim()) { setInRange(null); return; }
    const open = board.filter((j) => j.status === "open" && !me.passed.includes(j.id));
    const locs = open.map((j) => ({ id: j.id, loc: j.town || j.address || "" })).filter((x) => x.loc);
    if (!locs.length) { setInRange({}); return; }
    try {
      const prompt =
        "A contractor is based at \"" + profC.base.trim() + "\" and will travel up to " + (profC.radius || 30) + " miles. For each job location, say if it is plausibly WITHIN that driving radius. Use your knowledge of US geography; approximate is fine.\n" +
        "JOBS:\n" + locs.map((x) => x.id + ": " + x.loc).join("\n") + "\n" +
        "Respond with ONLY raw JSON, no markdown: {\"in\": [job ids that are within range]}.";
      const text = await callClaude([{ role: "user", content: prompt }], { background: true });
      const d = parseJSON(text);
      const inSet = new Set(Array.isArray(d.in) ? d.in.map(String) : []);
      const map = {};
      for (const x of locs) map[x.id] = inSet.has(String(x.id));
      setInRange(map);
    } catch (e) { setInRange(null); /* on failure, show all */ }
  };
  const calcDistances = async () => {
    if (me.role !== "homeowner") return;
    const jobs = board.filter((j) => j.homeownerUid === me.uidH && j.status === "open" && (j.applicants || []).length);
    const pairs = [];
    for (const j of jobs) {
      const jl = j.town || j.address || "";
      if (!jl) continue;
      for (const a of j.applicants || []) {
        const u = users[a.uid];
        const base = u && (u.base || u.town);
        if (base && appDist[j.id + a.uid] == null) pairs.push({ key: j.id + a.uid, from: base, to: jl });
      }
    }
    if (!pairs.length) return;
    try {
      const prompt =
        "Estimate the approximate driving distance in miles for each pair (from contractor base -> job location). Use US geography knowledge; rough is fine.\n" +
        pairs.map((x, i) => i + ": " + x.from + " -> " + x.to).join("\n") + "\n" +
        "Respond with ONLY raw JSON, no markdown: {\"miles\": [{\"i\": index, \"mi\": number}]}.";
      const text = await callClaude([{ role: "user", content: prompt }], { background: true });
      const d = parseJSON(text);
      const upd = {};
      for (const m of (d.miles || [])) { const pr = pairs[m.i]; if (pr) upd[pr.key] = Math.round(num(m.mi)); }
      if (Object.keys(upd).length) setAppDist((prev) => ({ ...prev, ...upd }));
    } catch (e) { /* leave blank */ }
  };
  const refreshPros = async () => {
    setBusy("pros");
    try {
      const idx = ((await sGet(USER_INDEX)) || []).slice(0, 40);
      const list = [];
      const merged = { ...users };
      for (const uid of idx) {
        const u = merged[uid] || (await sGet(USER_KEY(uid)));
        if (u) { merged[uid] = u; if (u.role === "contractor") list.push(u); }
      }
      setUsers(merged);
      setPros(list);
    } catch (e) { flash("Couldn't load pros: " + errMsg(e)); }
    setBusy("");
  };
  useEffect(() => {
    if (!loaded.current || !me.role) return;
    refreshBoard();
    if (tab === "pros") refreshPros();
  }, [tab, me.role]); // eslint-disable-line
  useEffect(() => {
    if (me.role === "contractor" && tab === "feed" && radiusOn) checkRange();
    if (!radiusOn) setInRange(null);
  }, [board, radiusOn, tab]); // eslint-disable-line
  useEffect(() => {
    if (me.role === "homeowner" && tab === "myjobs") calcDistances();
  }, [board, tab]); // eslint-disable-line
  useEffect(() => {
    if (convEndRef.current) convEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [convMsgs, convBusy]); // eslint-disable-line
  useEffect(() => {
    // contractor opens the Estimator: AL "types" then the greeting + scope buttons pop in together
    if (me.role === "contractor" && tab === "estimator" && !estScope && !estResult && !estGreeted && !estGreetRef.current) {
      estGreetRef.current = true;
      setEstTyping(true);
      setEstTyped("");
      // show dots briefly, then type the greeting out character-by-character
      const dotsT = setTimeout(() => {
        setEstTyping(false);
        setEstGreeted(true);
        let i = 0;
        const tick = () => {
          i++;
          setEstTyped(EST_GREETING.slice(0, i));
          if (i < EST_GREETING.length) setTimeout(tick, 28);
        };
        tick();
      }, 800);
      return () => clearTimeout(dotsT);
    }
  }, [me.role, tab]); // eslint-disable-line
  useEffect(() => {
    if (me.role === "homeowner" && tab === "chat" && !convStarted && convMsgs.length === 0 && !convBusy && !convGreeting.current) {
      convGreeting.current = true;
      const first = ((profH.name || "").trim().split(/\s+/)[0] || "");
      const hi = first ? "Hey " + first + "! I'm AL, your CazBid estimator. " : "Hey there! I'm AL, your CazBid estimator. ";
      const greet = hi + "Tell me about the project you're thinking about — even a sentence works. A photo or two helps a lot too, if you've got 'em. What's going on?";
      setConvBusy(true);
      const t = setTimeout(() => { setConvMsgs([{ role: "ai", text: greet }]); setConvBusy(false); }, 1300);
      return () => clearTimeout(t);
    }
  }, [me.role, tab]); // eslint-disable-line
  useEffect(() => {
    (async () => {
      setViewPosts([]);
      if (!viewing) return;
      const u = users[viewing];
      if (!u || u.role !== "contractor") return;
      const out = [];
      for (const meta of u.posts || []) {
        // demo contractors carry their photo inline on the meta; real posts store it in POST_KEY
        if (meta.photo) { out.push({ id: meta.id, caption: meta.caption, photo: meta.photo }); continue; }
        try {
          const rec = await sGet(POST_KEY(viewing, meta.id));
          if (rec && rec.photo) out.push({ id: meta.id, caption: meta.caption, photo: rec.photo });
        } catch (e) { /* skip */ }
      }
      setViewPosts(out);
    })();
  }, [viewing]); // eslint-disable-line
  useEffect(() => {
    if (!me.role) return;
    const t = setInterval(() => { if (board.length) checkUnread(board); }, 25000);
    return () => clearInterval(t);
  }, [me.role, board, me.readMsgs]); // eslint-disable-line
  useEffect(() => {
    if (!chatJob) return;
    const t = setInterval(() => refreshChat(false), 10000);
    return () => clearInterval(t);
  }, [chatJob]); // eslint-disable-line

  /* ----- ratings & reviews ----- */
  const coStars = {}, hoStars = {};
  for (const uid in users) {
    const u = users[uid];
    if (u && Array.isArray(u.seedReviews) && u.seedReviews.length) {
      if (!coStars[uid]) coStars[uid] = { s: 0, n: 0 };
      for (const r of u.seedReviews) { coStars[uid].s += num(r.stars); coStars[uid].n++; }
    }
  }
  for (const j of board) {
    if (j.ratings && j.ratings.ofContractor && j.chosen) {
      if (!coStars[j.chosen]) coStars[j.chosen] = { s: 0, n: 0 };
      coStars[j.chosen].s += num(j.ratings.ofContractor.stars); coStars[j.chosen].n++;
    }
    if (j.ratings && j.ratings.ofHomeowner && j.homeownerUid) {
      if (!hoStars[j.homeownerUid]) hoStars[j.homeownerUid] = { s: 0, n: 0 };
      hoStars[j.homeownerUid].s += num(j.ratings.ofHomeowner.stars); hoStars[j.homeownerUid].n++;
    }
  }
  const starsOf = (map, uid) => {
    const r = map[uid];
    return r && r.n ? "★ " + (r.s / r.n).toFixed(1) + " (" + r.n + ")" : null;
  };
  const reviewsFor = (uid, role) => {
    const out = [];
    if (role === "contractor" && users[uid] && Array.isArray(users[uid].seedReviews)) {
      for (const r of users[uid].seedReviews) out.push({ ...r, job: "Past job", by: "Verified homeowner" });
    }
    for (const j of board) {
      if (role === "contractor" && j.chosen === uid && j.ratings && j.ratings.ofContractor) {
        out.push({ ...j.ratings.ofContractor, job: j.title, by: j.homeownerName || "Homeowner" });
      }
      if (role === "homeowner" && j.homeownerUid === uid && j.ratings && j.ratings.ofHomeowner) {
        const cu = users[j.chosen];
        out.push({ ...j.ratings.ofHomeowner, job: j.title, by: (cu && cu.company) || "Contractor" });
      }
    }
    return out.sort((a, b) => (b.at || "").localeCompare(a.at || ""));
  };
  const ReviewList = ({ uid, role, emptyText }) => {
    const list = reviewsFor(uid, role);
    if (!list.length) return <p className="hint">{emptyText}</p>;
    return (
      <div className="revlist">
        {list.map((r, i) => (
          <div className="rev" key={i}>
            <div className="revtop">
              <Stars value={num(r.stars)} />
              <span className="revby">{r.by}</span>
              <span className="revat">{fmtDate(r.at)}</span>
            </div>
            {r.comment && <div className="revtxt">“{r.comment}”</div>}
            <div className="revjob">{r.job}</div>
          </div>
        ))}
      </div>
    );
  };

  /* ----- job photos / report / bid ----- */
  const addPhotos = async (files) => {
    if (!files || !files.length) return;
    setBusy("photos");
    try {
      const list = [];
      let firstErr = null;
      for (const f of Array.from(files).slice(0, 4)) {
        try { list.push(await imageToJpeg(f)); }
        catch (e) {
          if (["image/jpeg", "image/png", "image/webp", "image/gif"].includes(f.type)) {
            try { list.push(await readDataURL(f)); } catch (e2) { firstErr = firstErr || e2; }
          } else firstErr = firstErr || e;
        }
      }
      if (!list.length) throw new Error("couldn't read those photos" + (firstErr && firstErr.message ? " (" + firstErr.message + ")" : ""));
      setPhotos((p) => [...p, ...list].slice(0, 4));
    } catch (e) { flash("Photo add failed: " + errMsg(e)); }
    setBusy("");
  };
  const EV_PROMPT = "This is a measurement report - either a ROOF aerial report (EagleView, QuickMeasure, Hover) or an INDOOR room scan / floor plan (Polycam, magicplan, Canvas, RoomPlan). Respond with ONLY raw JSON, no markdown: {\"summary\": \"one compact line listing every useful measurement found. Roof example: 2450 sqft, 8/12 pitch, eaves 120 LF, ridges 45 LF, valleys 30 LF, 6 penetrations. Indoor example: kitchen 14x18 ft, living 16x22 ft, total floor 680 sqft, ceilings 8 ft, walls 96 LF\"}. If nothing measurable, return {\"summary\": \"\"}.";
  const fileToB64 = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Read failed"));
    r.readAsDataURL(file);
  });
  // ---- contractor estimator: measurement upload (reuses EV_PROMPT + AI extraction) ----
  const handleEstReport = async (file) => {
    if (!file) return;
    setEstBusy("report");
    try {
      const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
      let block;
      if (isPdf) {
        if (file.size > 28 * 1024 * 1024) throw new Error("PDF over 28MB");
        block = { type: "document", source: { type: "base64", media_type: "application/pdf", data: await fileToB64(file) } };
      } else {
        const b64 = (await imageToJpeg(file, 2000)).split(",")[1];
        block = { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } };
      }
      const text = await callClaude([{ role: "user", content: [block, { type: "text", text: EV_PROMPT }] }]);
      const d = parseJSON(text);
      if (!d.summary || !String(d.summary).trim()) throw new Error("No measurements found in that file");
      setEstDims("Measurements: " + String(d.summary).slice(0, 400));
      flash("Report read — measurements attached to your estimate.");
    } catch (e) { flash("Report parse failed: " + errMsg(e) + ". Try the PDF or type the numbers in the scope."); }
    setEstBusy("");
  };
  // ---- house flow: measurement upload (same EV_PROMPT extraction) ----
  const handleWhReport = async (file) => {
    if (!file) return;
    setWhReportBusy(true);
    try {
      const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
      let block;
      if (isPdf) {
        if (file.size > 28 * 1024 * 1024) throw new Error("PDF over 28MB");
        block = { type: "document", source: { type: "base64", media_type: "application/pdf", data: await fileToB64(file) } };
      } else {
        const b64 = (await imageToJpeg(file, 2000)).split(",")[1];
        block = { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } };
      }
      const text = await callClaude([{ role: "user", content: [block, { type: "text", text: EV_PROMPT }] }]);
      const d = parseJSON(text);
      if (!d.summary || !String(d.summary).trim()) throw new Error("No measurements found in that file");
      setWhDims(String(d.summary).slice(0, 400));
      flash("Report read — AL will use these measurements.");
    } catch (e) { flash("Report parse failed: " + errMsg(e) + ". You can still type dimensions below."); }
    setWhReportBusy(false);
  };
  const onWhPhoto = async (file) => {
    if (!file) return;
    try { const u = await imageToJpeg(file, 1600); setWhPhotos((p) => [...p, u].slice(0, 6)); }
    catch (e) { flash("Couldn't add that photo."); }
  };
  // Accept ONE or MANY files (library multi-select or a single camera shot) — add each.
  const onWhPhotos = async (files) => { const list = Array.from(files || []); for (const f of list) { await onWhPhoto(f); } };
  // Job/documentation photos saved WITH the job record (library or camera, multi). Separate from AI
  // inspection photos. Compressed + capped at 12 — these live in local storage (best-effort), so a
  // huge gallery could exceed quota; keep it to key documentation shots.
  const JOB_PHOTO_MAX = 12;
  const onJobPhotos = async (files) => {
    const list = Array.from(files || []);
    for (const f of list) {
      if (!f) continue;
      if (estJobPhotos.length >= JOB_PHOTO_MAX) { flash("Up to " + JOB_PHOTO_MAX + " job photos (local storage limit) — remove one to add more."); break; }
      try { const u = await imageToJpeg(f, 1200); setEstJobPhotos((p) => [...p, u].slice(0, JOB_PHOTO_MAX)); } catch (e) { flash("Couldn't add that photo."); }
    }
  };
  // AL's next question = first unfilled REQUIRED input across the selected
  // deterministic trades (one at a time; skips anything already answered).
  const whNextQuestion = () => {
    for (const t of (whSpecs || [])) {
      if (!whChecked[t.trade]) continue;
      for (const inp of t.inputs) {
        if (!inp.required) continue;
        const v = whInputs[t.trade] ? whInputs[t.trade][inp.name] : undefined;
        const empty = inp.type === "enum" ? !v : !(num(v) > 0);
        if (empty) return { trade: t.trade, tradeLabel: t.label, inp: inp };
      }
    }
    return null;
  };
  // ---- BUG 9: two-way AL chat (house side). Real text thread, context-aware,
  // asks only gaps, answers questions, and writes captured measurements back into
  // the job (whDims / whInputs) so they feed the bid on Build. ----
  const alContext = () => {
    const sel = Object.keys(houseScope);
    const trades = sel.length
      ? sel.map((t) => { const lbl = (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t; const m = houseScope[t]; const types = HOUSE_TYPES[t] ? (" [allowed types: " + HOUSE_TYPES[t].join(" / ") + "]") : ""; return "- key=" + t + " (" + lbl + ")" + (m && m !== true ? " current type: " + m : " no type chosen yet") + types; }).join("\n")
      : "(none yet — tell them to pick a trade with the buttons up top, or capture what they describe)";
    let known = whDims ? ("Measurements on file: " + whDims + "\n") : "";
    const entered = sel.map((t) => { const k = PB_TRADE_KEY[t]; const f = k && whInputs[k]; if (!f) return null; const vals = Object.keys(f).filter((x) => x !== "complexityFactor" && num(f[x]) > 0).map((x) => x + "=" + f[x]); return vals.length ? (((HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t) + ": " + vals.join(", ")) : null; }).filter(Boolean).join("\n");
    if (entered) known += "Dimensions entered:\n" + entered + "\n";
    if (whPhotos.length) known += whPhotos.length + " jobsite photo(s) attached.\n";
    // deterministic trades still missing a required field
    const gaps = (whSpecs || []).filter((s) => whChecked[s.trade]).map((s) => { const miss = s.inputs.filter((inp) => inp.required && !(whInputs[s.trade] && num(whInputs[s.trade][inp.name]) > 0)).map((inp) => inp.label); return miss.length ? (s.label + ": " + miss.join(", ")) : null; }).filter(Boolean).join("\n");
    const who = [estCustomer.trim() ? "Customer: " + estCustomer.trim() : "", estAddress.trim() ? "Address: " + estAddress.trim() : ""].filter(Boolean).join("\n");
    const savedNote = (estResult && estResult.trades && estResult.trades.length && estId) ? "THIS ESTIMATE IS ALREADY BUILT AND SAVED — do not offer to build/save again; if they want changes, capture them, otherwise you're done.\n" : "";
    return "SELECTED TRADES:\n" + trades + "\n" + (who ? who + "\n" : "") + savedNote + (known || "No measurements, photos, or dimensions captured yet.\n") + (gaps ? "STILL MISSING (ask about these):\n" + gaps + "\n" : "");
  };
  const AL_HOUSE_SYS = (ctx, voice) => {
    const tradeMenu = HOUSE_STATES.map((s) => CAT_LABEL[s.key] + ": " + HOUSE_HOTSPOTS.filter((h) => h.state === s.key).map((h) => h.label + " (key=" + h.trade + ")").join(", ")).join("\n");
    return "You are AL, the estimator INSIDE the CazBid app — named after the grandfather who founded Caza Contractors: a sharp, plain-spoken foreman who takes down a job estimate by talking with the contractor. You are NOT a developer, planner, or assistant that asks permission to \"build\" anything — there is no \"build\" to approve. Your only job is to capture a roofing/exterior construction estimate by conversation. " +
    "HOW YOU WORK — the contractor talks in plain language and you ACT on it. Their WORDS are the input: NEVER tell them to click, tap, press, or select a button. If they name a trade, YOU select it (put it in `select`). If they give a number, you record it. Gather ONE thing at a time — ask one question, get the answer, move on; never present a list to click. " +
    "READ BACK what you capture before you rely on it — short and confirmable ('west slope ten twelve, valley into the dormer — got it?'): they may be driving and the readback is how a wrong number gets caught. Always confirm pitches, measurements, and material types this way. Talk like a foreman — plain, efficient, contractor number-speak ('ten twelve pitch', 'twenty-two squares', 'forty-eight thousand'); not chatty, not a salesbot. Stay in the home-construction estimating lane; if asked something off-topic, steer back. " +
    (voice ? "VOICE MODE — they're hands-free, often driving, and your reply is READ ALOUD: ONE short spoken sentence; read back any number they just gave; say numbers like a foreman; never read a list aloud; no emojis, symbols, or markdown (it gets spoken literally). " : "") +
    "SELECTING THE WORK (from their words — never make them click): when the contractor names what they're doing, put the matching trade key(s) in `select` and move forward. Available trades by category:\n" + tradeMenu + "\n" +
    "Examples: 'I'm doing flooring' -> select [{trade:\"flooring\"}], then ask the next flooring question. 'It's a reroof, standing seam' -> select [{trade:\"roofing\",type:\"Standing-seam metal\"}]. 'Roof and gutters' -> select roofing and trim. If their words don't clearly match a trade, ask a SHORT clarifying question — do NOT fall back to 'click the trade'. " +
    "LOCK IN MATERIALS: whenever the contractor states a material or system for a trade — even one already selected (e.g. they just say 'standing seam' or 'twenty-four gauge') — include {trade, type} in `select` so it's committed to the estimate. Never rely on re-reading the conversation to remember the material; if the context shows a trade with 'no type chosen yet' and they've told you one, set it now. " +
    "If the contractor asks to CHANGE/SWITCH a material for an already-selected trade, set materialChange {trade:key,type} and confirm it. Capture the CUSTOMER NAME and JOB ADDRESS whenever spoken (customer / address). " +
    "SCOPE PARTITION (critical — each physical item belongs to EXACTLY ONE trade, never counted in two): when one physical item could touch several trades, assign it to ONE owning trade and do NOT also list it under others. The cedar boards on a cedar-siding job belong to Siding ONLY — not also Trim or Paint. A PVC drain line belongs to Plumbing ONLY — not also Trim. A gutter splash-guard / drainage piece with no dedicated trade → assign it to ONE block, don't scatter it. Do NOT stand up a finish/paint trade unless the contractor EXPLICITLY asked to paint or finish — never invent a phantom 'repaint'. For each trade you put in `select`, also set `scope` to a short line describing ONLY that trade's slice of the work (e.g. Siding scope: 'cedar bevel siding + cedar starter, 120 SF') so each block bids only what it owns, exactly once. " +
    "STANDING RULES — when the contractor states a lasting requirement ('from now on…', 'always…', 'new code says…', 'never use X on Y'), that's a STANDING RULE to save, not a one-job note: restate it as ONE clean factual sentence with any code/warranty source, infer the scope (a specific trade key from the list, or global), and set standingRule {text, scope}; the app confirms before saving. Rules are KNOWLEDGE (codes, warranty terms, approved products, supplier notes, always-include lines). DECLINE to save anything that changes deterministic math or the app itself (margin formula, fastener-length calc, new input fields) — say that needs an app update and suggest a one-line spec for the queue. " +
    "FINISHING — confirm details as you go; do NOT hoard a sign-off. When the job is fully captured (every selected trade sized) AND the contractor signals they're done — they say that's everything / save it / send it, OR you ask ONCE 'anything else, or want me to save it?' and they say yes — set save=true. That SAVES the estimate; it is the only commit. Do NOT re-summarize the whole scope and ask to 'build' it. Once the context says the estimate is already saved, do NOT ask again — just tell them it's saved. " +
    "JOB CONTEXT (authoritative — never contradict it):\n" + ctx + "\n" +
    "Reply with ONLY raw JSON, no markdown: {\"message\": your reply (1-2 sentences), \"select\": [{\"trade\": a trade key from the list above, \"type\": material/system if they named one else \"\", \"scope\": one-line description of THIS trade's slice of the work only (else \"\")}] for trades they named THIS turn (else []), \"dims\": any NEW measurements as one compact string (e.g. \"west slope 8/12, 102 sq\") else \"\", \"inputs\": {tradeKey:{field:number}} only for a concrete dimension given (siding,concrete,drywall,trim,insulation,electrical,plumbing,hvac,framing) else {}, \"materialChange\": {\"trade\":key,\"type\":new} only on a change request else null, \"customer\": name if given else \"\", \"address\": address if given else \"\", \"save\": true ONLY when they confirm the finished estimate should be saved, else false, \"standingRule\": {\"text\": one clean dated-worthy rule sentence, \"scope\": trade key or \"global\"} ONLY when they stated a lasting requirement this turn, else null}";
  };
  const alOpener = () => {
    const sel = Object.keys(houseScope);
    if (!sel.length) return "Hey, I'm AL. Use the buttons up top to add what you're bidding — roof, siding, kitchen, whatever — then tell me about it and I'll help you size it.";
    const labels = sel.map((t) => (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t);
    const nonDet = sel.filter((t) => !PB_TRADE_KEY[t]);
    if (nonDet.length && !whDims && !whPhotos.length) return "Got " + labels.join(", ") + ". To size that I'll need measurements or photos — tap 📄 Report or 📷 Photo, or just tell me the numbers right here.";
    return "Got " + labels.join(", ") + (whDims ? " plus your measurements" : "") + ". Ask me anything, or tell me the details and I'll get it ready to build.";
  };
  // ---- VOICE (build-set #4, Phase 1): talk TO AL. Built-in phone voice — Web Speech
  // for STT where available (Android/desktop Chrome) + speechSynthesis TTS readback
  // (incl. iOS). On iOS Safari (no Web STT) we fall back to the keyboard mic; AL's
  // text brain (alSend) supplies the understanding either way. Swap to ElevenLabs
  // later = replace speakAL only. AL reads numbers back before they commit. ----
  const SpeechRec = (typeof window !== "undefined") && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const ttsOK = (typeof window !== "undefined") && !!window.speechSynthesis;
  // tiny silent WAV — played inside a tap to UNLOCK the <audio> element on iOS so
  // ElevenLabs audio (which arrives after an async fetch) can play later.
  const makeSilentURL = () => {
    try {
      const sr = 8000, n = 400, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
      const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
      w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); w(8, "WAVE"); w(12, "fmt ");
      v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
      v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true);
      v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, n * 2, true);
      return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
    } catch (e) { return ""; }
  };
  const ensureAudioEl = () => { if (!alAudioRef.current && typeof Audio !== "undefined") { alAudioRef.current = new Audio(); alAudioRef.current.preload = "auto"; } return alAudioRef.current; };
  // Unlock BOTH paths inside a user gesture (iOS): the <audio> element (ElevenLabs)
  // and the SpeechSynthesis fallback. Once per session.
  const primeTTS = () => {
    const a = ensureAudioEl();
    if (a && !audioUnlockedRef.current) {
      try { a.muted = true; a.src = makeSilentURL(); const p = a.play(); if (p && p.then) p.then(() => { try { a.pause(); a.currentTime = 0; a.muted = false; } catch (e) {} }).catch(() => { a.muted = false; }); audioUnlockedRef.current = true; } catch (e) {}
    }
    if (ttsOK && !ttsPrimedRef.current) { try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; window.speechSynthesis.speak(u); ttsPrimedRef.current = true; } catch (e) {} }
  };
  const stopSpeaking = () => {
    try { const a = alAudioRef.current; if (a) { a.pause(); } } catch (e) {}
    try { if (ttsOK) window.speechSynthesis.cancel(); } catch (e) {}
  };
  // BROWSER fallback voice (offline / if the ElevenLabs call fails on a back road).
  // done() resolves the speakAL promise when the synth finishes (drives mic reopen).
  const speakBrowser = (text, done) => {
    const fin = () => { try { done && done(); } catch (e) {} };
    if (!ttsOK || !text) return fin();
    try {
      const clean = String(text).replace(/[*_`#>~]/g, "").replace(/[^\x00-\x7F]+/g, " ").replace(/\s+/g, " ").trim();
      if (!clean) return fin();
      const synth = window.speechSynthesis;
      try { synth.cancel(); } catch (e) {}
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 1.0; u.pitch = 1.0; u.volume = 1.0; u.lang = "en-US";
      const vs = (synth.getVoices && synth.getVoices()) || [];
      const en = vs.filter((v) => /^en/i.test(v.lang || ""));
      if (en.length) u.voice = en.find((v) => /en[-_]?us/i.test(v.lang || "")) || en[0];
      u.onend = fin; u.onerror = fin;
      setTimeout(() => { try { synth.speak(u); setTimeout(() => { try { if (synth.paused) synth.resume(); } catch (e) {} }, 140); } catch (e) { fin(); } }, 60);
    } catch (e) { fin(); }
  };
  // AL's voice = ElevenLabs (selected persona) via the server `speak` function; browser
  // TTS is the offline fallback. Returns a Promise that RESOLVES WHEN PLAYBACK ENDS so
  // conversation mode can reopen the mic only after AL finishes (no self-capture).
  const speakAL = (text, voiceOverride, speedOverride) => new Promise((resolve) => {
    if (!text) return resolve();
    const clean = String(text).replace(/[*_`#>~]/g, "").replace(/\s+/g, " ").trim();
    if (!clean) return resolve();
    const a = ensureAudioEl();
    let done = false; const fin = () => { if (done) return; done = true; resolve(); };
    if (!a) { speakBrowser(clean, fin); return; }
    const voiceId = voiceOverride || personaByName(personaRef.current).voiceId;
    const speed = speedOverride || personaSpeed(personaRef.current);
    (async () => {
      try {
        stopSpeaking();
        const res = await fetch("/.netlify/functions/speak", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: clean, voiceId: voiceId, speed: speed }) });
        if (!res.ok) throw new Error("tts " + res.status);
        const blob = await res.blob();
        if (!blob || blob.size < 200) throw new Error("empty audio");
        const url = URL.createObjectURL(blob);
        a.src = url; a.muted = false; a.volume = 1.0;
        a.onended = () => { try { URL.revokeObjectURL(url); } catch (e) {} fin(); };
        a.onerror = () => { try { URL.revokeObjectURL(url); } catch (e) {} speakBrowser(clean, fin); };
        const p = a.play();
        if (p && p.catch) p.catch(() => speakBrowser(clean, fin)); // autoplay blocked → fallback
      } catch (e) { speakBrowser(clean, fin); }
    })();
  });
  // LOCKED preview line (same for every persona → compare voices, not sentences).
  // {firstName} = first token of the Profile personal name; dropped cleanly if none.
  const previewPersona = (p) => {
    primeTTS();
    const fn = String(profC.name || "").trim().split(/\s+/)[0] || "";
    const line = fn ? ("Good morning " + fn + ", what are we quoting today?") : "Good morning, what are we quoting today?";
    speakAL(line, p.voiceId, personaSpeed(p.name));
  };
  const blobToB64 = (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1] || ""); r.onerror = () => rej(new Error("read failed")); r.readAsDataURL(blob); });
  const mediaOK = (typeof navigator !== "undefined") && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (typeof window !== "undefined") && window.MediaRecorder;
  const pickMime = () => { for (const c of ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac", "audio/ogg"]) { try { if (window.MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(c)) return c; } catch (e) {} } return ""; };
  const transcribeBlob = async (blob) => {
    try {
      const b64 = await blobToB64(blob);
      const res = await fetch("/.netlify/functions/transcribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ audioBase64: b64, mime: blob.type }) });
      const d = await res.json();
      return res.ok ? String((d && d.text) || "").trim() : "";
    } catch (e) { return ""; }
  };
  // CONVERSATION MODE (hands-free): one tap starts a session; thereafter turns chain on
  // their own — client-side silence detection auto-sends each utterance, the mic auto-MUTES
  // while AL reads back (no self-capture) and auto-reopens after. NOT tap-per-turn.
  const endVoiceSession = () => {
    sessionRef.current = false; micMutedRef.current = false;
    try { if (vadTimerRef.current) { clearInterval(vadTimerRef.current); vadTimerRef.current = null; } } catch (e) {}
    try { if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") mediaRecRef.current.stop(); } catch (e) {}
    try { (mediaStreamRef.current && mediaStreamRef.current.getTracks() || []).forEach((t) => t.stop()); } catch (e) {}
    mediaStreamRef.current = null;
    try { if (audioCtxRef.current && audioCtxRef.current.close) audioCtxRef.current.close(); } catch (e) {}
    audioCtxRef.current = null; analyserRef.current = null;
    stopSpeaking();
    setListening(false); setTranscribing(false); setVoiceSession(false);
  };
  // One utterance: record from the live session stream, watch the mic level, and stop on a
  // pause after speech → transcribe → run the turn. Re-arms itself for the next turn.
  const recordTurn = () => {
    if (!sessionRef.current || micMutedRef.current) return;
    const stream = mediaStreamRef.current; if (!stream) return;
    const mime = pickMime();
    let rec; try { rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream); } catch (e) { endVoiceSession(); return; }
    mediaChunksRef.current = [];
    let speechStarted = false, lastLoud = Date.now(), startedAt = Date.now(), stopped = false;
    const clearVad = () => { try { if (vadTimerRef.current) { clearInterval(vadTimerRef.current); vadTimerRef.current = null; } } catch (e) {} };
    const stopTurn = () => { if (stopped) return; stopped = true; clearVad(); try { if (rec.state !== "inactive") rec.stop(); } catch (e) {} };
    rec.ondataavailable = (e) => { if (e.data && e.data.size) mediaChunksRef.current.push(e.data); };
    rec.onstop = async () => {
      setListening(false);
      const blob = new Blob(mediaChunksRef.current, { type: (rec.mimeType || mime || "audio/webm") });
      mediaChunksRef.current = [];
      if (!sessionRef.current) return; // session ended mid-turn
      if (!speechStarted || blob.size < 1400) { if (sessionRef.current && !micMutedRef.current) recordTurn(); return; } // nothing said → keep listening
      setTranscribing(true);
      const text = await transcribeBlob(blob);
      setTranscribing(false);
      if (text) handleTurnText(text);
      else if (sessionRef.current && !micMutedRef.current) recordTurn(); // didn't catch → listen again
    };
    try { rec.start(); } catch (e) { endVoiceSession(); return; }
    mediaRecRef.current = rec; setListening(true);
    const an = analyserRef.current; const buf = an ? new Uint8Array(an.fftSize) : null;
    vadTimerRef.current = setInterval(() => {
      if (!sessionRef.current) { stopTurn(); return; }
      let rms = 0;
      if (an && buf) { an.getByteTimeDomainData(buf); let s = 0; for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; s += v * v; } rms = Math.sqrt(s / buf.length); }
      const now = Date.now();
      if (rms > 0.028) { speechStarted = true; lastLoud = now; } // tuned a bit hot for cab noise
      const elapsed = now - startedAt;
      if (an) { if (speechStarted && (now - lastLoud) > 1100 && elapsed > 600) stopTurn(); else if (elapsed > 25000) stopTurn(); }
      else if (elapsed > 12000) stopTurn(); // no analyser: fall back to a fixed window
    }, 80);
  };
  // A turn: mute the mic, send the transcript through the SAME brain as typed chat, AL reads
  // back (awaited), then reopen the mic for the next turn. Readback-before-anything-commits.
  const handleTurnText = async (text) => {
    micMutedRef.current = true; setListening(false);
    try { await (alSendRef.current || alSend)(text); } catch (e) {} // latest alSend → current scope/dims/history
    if (sessionRef.current) { micMutedRef.current = false; recordTurn(); }
  };
  const startVoiceSession = async () => {
    primeTTS(); // this tap unlocks iOS audio for the readbacks
    setVoiceMode(true); voiceRef.current = true;
    stopSpeaking();
    if (!mediaOK) { flash("Tap the text box, then your keyboard's 🎤 to talk — AL still understands the trade."); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx(); audioCtxRef.current = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const an = ctx.createAnalyser(); an.fftSize = 1024; src.connect(an); analyserRef.current = an;
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
      } catch (e) { analyserRef.current = null; }
      sessionRef.current = true; micMutedRef.current = true; setVoiceSession(true);
      await speakAL("What are we working on?"); // greeting (mic muted until it ends)
      if (sessionRef.current) { micMutedRef.current = false; recordTurn(); }
    } catch (e) { endVoiceSession(); flash("Mic unavailable — allow microphone access, or use your keyboard's 🎤."); }
  };
  // mic button: one tap toggles the hands-free session on/off
  const startVoiceInput = () => { if (sessionRef.current) endVoiceSession(); else startVoiceSession(); };
  const stopListening = () => endVoiceSession();
  // readback on/off preference (the 🎤 mic button drives the hands-free session itself)
  const toggleVoice = () => {
    setVoiceMode((v) => {
      const next = !v;
      voiceRef.current = next;
      if (!next) { stopSpeaking(); if (sessionRef.current) endVoiceSession(); }
      else { primeTTS(); flash("Voice on — tap 🎤 to start a hands-free conversation."); }
      return next;
    });
  };
  const alSend = async (textArg) => {
    const text = (textArg != null ? textArg : alInput).trim();
    if (!text || alBusy) return;
    const msgs = [...alMsgsRef.current, { role: "me", text: text }]; // ref = live history (loop closures are stale)
    setAlThread(msgs); setAlInput(""); setAlBusy(true);
    try {
      const history = msgs.map((m) => (m.role === "ai" ? "AL" : "CONTRACTOR") + ": " + m.text).join("\n");
      const userText = AL_HOUSE_SYS(alContext(), voiceRef.current) + "\n\nCONVERSATION SO FAR:\n" + history + "\n\nReply now as AL — output ONLY the JSON object, nothing before or after.";
      const reply = await callClaude([{ role: "user", content: [{ type: "text", text: userText }] }]);
      let d; try { d = parseJSON(reply); } catch (e) { d = { message: (reply || "").replace(/```json|```/g, "").trim().slice(0, 400) }; }
      const alText = String(d.message || "Got it.");
      setAlThread([...msgs, { role: "ai", text: alText }]);
      // VOICE-DRIVES-STATE: AL's understood trade selections write the SAME state the buttons set.
      if (Array.isArray(d.select) && d.select.length) {
        d.select.forEach((s) => {
          const want = String((s && (s.trade || s)) || "").toLowerCase().trim();
          if (!want) return;
          const h = HOUSE_HOTSPOTS.find((x) => x.trade === want || x.label.toLowerCase() === want || x.label.toLowerCase().indexOf(want) >= 0 || want.indexOf(x.trade) >= 0);
          const key = h ? h.trade : want;
          let type = (s && s.type && String(s.type).trim()) ? String(s.type).trim() : true;
          if (type !== true && HOUSE_TYPES[key]) { const opt = HOUSE_TYPES[key].find((o) => { const lo = o.toLowerCase(), lt = String(type).toLowerCase(); return lo === lt || lo.indexOf(lt) >= 0 || lt.indexOf(lo.split(" ")[0]) >= 0; }); if (opt) type = opt; }
          houseSelect(key, type); setActiveTrade(key);
          if (s && s.scope && String(s.scope).trim()) setWhScopeLines((prev) => ({ ...prev, [key]: String(s.scope).trim().slice(0, 200) })); // this block's slice — feeds the build so it bids only what it owns
          if (h) setHouseView(h.state);
        });
        setSelStep("ready");
      }
      if (d.dims && String(d.dims).trim()) setWhDims((prev) => (prev ? (prev + "; " + String(d.dims).trim()) : String(d.dims).trim()).slice(0, 600));
      // material/system change requested in conversation → update the locked scope so the NEXT Build honors it
      if (d.materialChange && typeof d.materialChange === "object" && d.materialChange.trade) {
        const want = String(d.materialChange.trade).toLowerCase().trim();
        const key = Object.keys(houseScope).find((k) => k.toLowerCase() === want || TRADE_LABEL(k).toLowerCase() === want || TRADE_LABEL(k).toLowerCase().indexOf(want) >= 0 || want.indexOf(k.toLowerCase()) >= 0);
        if (key && d.materialChange.type) {
          let type = String(d.materialChange.type).trim();
          if (HOUSE_TYPES[key]) { const opt = HOUSE_TYPES[key].find((o) => { const lo = o.toLowerCase(), lt = type.toLowerCase(); return lo === lt || lo.indexOf(lt) >= 0 || lt.indexOf(lo.split(" ")[0]) >= 0; }); if (opt) type = opt; }
          houseSelect(key, type); setActiveTrade(key);
        }
      }
      if (d.inputs && typeof d.inputs === "object") {
        Object.keys(d.inputs).forEach((k) => { const f = d.inputs[k]; if (f && typeof f === "object") Object.keys(f).forEach((field) => { const v = f[field]; if (v != null && v !== "") whSet(k, field, typeof v === "number" ? v : num(v)); }); });
      }
      // hands-free CAPTURE: pull customer/address spoken into the saved-estimate fields
      if (d.customer && String(d.customer).trim()) setEstCustomer(String(d.customer).trim());
      if (d.address && String(d.address).trim()) setEstAddress(String(d.address).trim());
      setAlBusy(false);
      if (voiceRef.current) await speakAL(alText); // readback LAST + awaited → conversation mode reopens the mic only after AL finishes
      // COMMIT on confirm: build + save the estimate (auto-save effect persists it). Guard against
      // re-firing once it's already built (kills the confirm→re-propose loop).
      if (d.save === true && Object.keys(houseScope).length && estBusy !== "run" && !(estResult && estResult.trades && estResult.trades.length)) { buildUnifiedEstimate(); }
      // STANDING RULE capture — AL proposed one; confirm (never silent), check conflicts, respect the budget.
      if (d.standingRule && d.standingRule.text) {
        try {
          const txt = String(d.standingRule.text).trim().slice(0, 300);
          const scope = SR_SCOPES.indexOf(d.standingRule.scope) >= 0 ? d.standingRule.scope : "global";
          const toks = txt.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
          const conflict = standingRules.find((r) => r.active && toks.filter((w) => r.text.toLowerCase().includes(w)).length >= Math.max(3, Math.floor(toks.length / 2)));
          const q = conflict
            ? ("A similar rule exists:\n\u201c" + conflict.text + "\u201d\n\nREPLACE it with:\n\u201c" + txt + "\u201d (" + scope + ")?\n\n(Cancel keeps both unsaved — nothing stacks silently.)")
            : ("Save standing rule (" + scope + ")?\n\n\u201c" + txt + "\u201d\n\nIt will be injected into every future " + (scope === "global" ? "estimate" : scope + " estimate") + ".");
          if (window.confirm(q)) {
            if (srAdd(txt, scope, conflict ? conflict.id : null)) flash("Standing rule saved — it now rides into every " + (scope === "global" ? "" : scope + " ") + "estimate.");
          }
        } catch (e) { /* rule capture never breaks the conversation */ }
      }
      return;
    } catch (e) {
      setAlThread([...msgs, { role: "ai", text: "Hmm, that one didn't go through — mind trying again?" }]);
    }
    setAlBusy(false);
  };
  alSendRef.current = alSend; // keep the loop pointed at the freshest alSend (current state)
  // ---- contractor estimator: full takeoff + costing (reuses the homeowner bottom-up engine) ----
  const EV_FORMULAS = "ROOFING MATERIAL TAKEOFF FORMULAS — if this is a roofing job and you have the measurements, compute quantities with THESE exact formulas (round up as noted), do not guess:\n" +
    "- Field shingles (squares): (Area sqft x 1.12) / 100, round up to whole square.\n" +
    "- Starter (bundles): (Eaves LF x 1.10) / 100, round up to bundle.\n" +
    "- Hip/Ridge caps (bundles): ((Ridges LF + Hips LF) x 1.10) / 30, round up to bundle.\n" +
    "- Ice & water (rolls): ((Eaves x 2) + Valleys + Flashing + StepFlash) / 66, round up.\n" +
    "- Drip edge (10ft pieces): (Total eave+rake LF x 1.15) / 10, round up.\n" +
    "- Valley (SHINGLE roof = CLOSED valley): 14in aluminum ROLL valley flashing, Valleys LF / 50 = rolls, round up (+ I&W beneath). Open W-valley steel (10ft sticks, Valleys LF / 10 = sticks) is for STEEL/mixed systems only.\n" +
    "- Step flashing (bundles/pieces): StepFlash LF / 25, round up.\n";
  // ---- AI trade builder (Feature A) helpers ----
  const aiTradeModule = (t) => {
    if (!t) return "";
    let s = "AI-BUILT TRADE DEFINITION for \"" + t.trade + "\" — use this as the takeoff blueprint (the contractor will verify):\n";
    if (t.summary) s += "Scope: " + t.summary + "\n";
    if (t.materials && t.materials.length) s += "Material lines (item | unit | est $/unit | qty basis):\n" + t.materials.map((m) => "- " + m.item + " | " + m.unit + " | $" + m.unitCost + " | " + (m.qtyBasis || "")).join("\n") + "\n";
    if (t.labor && t.labor.basis) s += "Labor: " + t.labor.ratePerUnit + " MH per " + t.labor.unit + " (" + t.labor.basis + ")\n";
    if (t.equipment) s += "Equipment (put $ in the equipment field, not items): " + t.equipment + "\n";
    s += "Build the itemized takeoff from these lines using the job's measurements; keep the given unit costs unless the contractor's price book matches better.\n";
    return s;
  };
  const buildAiTrade = async () => {
    const desc = aiTradeDesc.trim();
    if (!desc) { flash("Describe the trade first."); return; }
    setAiTradeBusy(true); setAiTradeDraft(null);
    try {
      const region = (profC.base || profC.town || profH.town || "upstate New York").trim();
      const pb = contractorPriceBook(); // FIX 3: was matCosts+priceBook only — now the merged enginePB-first book
      const res = await fetch("/.netlify/functions/build-trade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scope: desc, description: desc, region: region, priceBook: pb }) });
      const d = await res.json();
      if (!res.ok || !d.trade) throw new Error(d.error || "couldn't build the trade");
      setAiTradeDraft(d.trade);
    } catch (e) { flash("AI trade build failed: " + errMsg(e)); }
    setAiTradeBusy(false);
  };
  const saveAiTrade = (t) => {
    const next = [t].concat(aiTrades.filter((x) => x.trade.toLowerCase() !== t.trade.toLowerCase())).slice(0, 40);
    setAiTrades(next); pSet(AI_TRADES_KEY, next);
    flash("Saved “" + t.trade + "” — flagged AI until a real job calibrates it.");
  };
  const delAiTrade = (name) => { const next = aiTrades.filter((x) => x.trade !== name); setAiTrades(next); pSet(AI_TRADES_KEY, next); };
  const useAiTrade = (t) => {
    aiActiveTrade.current = t;
    setEstScope(t.trade); setEstDesc(t.summary || t.trade); setAiTradeDraft(null);
    flash("Loaded “" + t.trade + "” — add measurements if any, then Build estimate.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Feature B: log a finished job's ACTUAL man-hours against the estimate → update
  // that trade's labor calibration factor (with confirmation), clearing AI/seed flags.
  const logActuals = (key, est, act, title) => {
    if (!key || !(act > 0)) { flash("Enter the actual man-hours."); return; }
    const entry = calib[key] ? { jobs: (calib[key].jobs || []).slice() } : { jobs: [] };
    entry.jobs = [{ est: Math.round(est) || 0, act: Math.round(act), at: new Date().toISOString(), title: title || "" }].concat(entry.jobs).slice(0, 20);
    entry.factor = calibFactorFrom(entry.jobs);
    entry.n = entry.jobs.length;
    const next = Object.assign({}, calib, { [key]: entry });
    setCalib(next); pSet(CALIB_KEY, next);
    // an AI-built trade with a logged job is no longer purely unverified
    if (aiTrades.some((t) => t.trade === key)) {
      const at = aiTrades.map((t) => t.trade === key ? Object.assign({}, t, { calibratedJobs: (t.calibratedJobs || 0) + 1 }) : t);
      setAiTrades(at); pSet(AI_TRADES_KEY, at);
    }
    setLogOpen(false); setLogMH("");
    flash(key + " calibrated from " + entry.n + " job" + (entry.n === 1 ? "" : "s") + " — labor ×" + entry.factor + (entry.n < 3 ? " (firms up over a few jobs)" : "") + ".");
  };
  // Build ONE trade's full result object (material takeoff + good/better/best +
  // Opus pre-flight + labor + calibration). Pure-ish: takes the scope/desc/dims/
  // photos as params and RETURNS the trade object (no setState) so the unified
  // flow can build one OR many trades into a single combined estimate.
  const buildOneTrade = async ({ scope, desc, dims, photos, panelW, aiTrade, tierPref, excludeList }) => {
    {
      scope = scope || ""; desc = desc || ""; dims = dims || ""; photos = photos || []; panelW = panelW || 0; aiTrade = aiTrade || null; excludeList = excludeList || "";
      const region = (profC.base || profC.town || profH.town || "upstate New York").trim();
      // The relevant Caza trade manual loads SERVER-SIDE (the Netlify function injects it as a
      // system prompt based on this trade key) — no browser fetch, no CORS, all 12 manuals available.
      const __manualKey = manualTradeKey(scope, desc);
      // OFF-MANUAL: no Caza STANDARD ASSEMBLY (Part 1) exists for this job type. AL still bids it from
      // general knowledge, but flags LOWER confidence, asks for the contractor's real numbers, and
      // surfaces assumptions. (Materials/brands/labor rates still travel; only a standard assembly = "in-manual".)
      const __offManual = cazaManualFor(scope, desc, profC.cazaManual).assemblies.length === 0;
      const prompt =
        "You are a senior estimator for an established, fully-insured exterior/roofing contractor near " + region + ". Build a DETAILED, itemized estimate a contractor can hand to a customer.\n" +
        "JOB: " + (desc.trim() || "(see photos)") + "\n" +
        (dims ? dims + "\n" : "") +
        (scope ? "WORK TYPE: " + scope + "\n" : "") +
        (excludeList ? "SCOPE BOUNDARY — OTHER trades on this job already own the following; do NOT include, re-bid, or price ANY of these here (each is billed by its own block, so counting it again double-bills the customer): " + excludeList + ". Bid ONLY this trade's own materials and labor.\n" : "") +
        (photos.length ? "Photos attached — read scope, materials, condition.\n" : "") +
        EV_FORMULAS +
        "Use web search to verify CURRENT " + new Date().getFullYear() + " LOCAL figures: burdened labor rate per man-hour (small-market rate, ~$45-70/hr for most trades, not inflated metro/union numbers), real material unit costs (contractor pricing), local sales tax rate, equipment/disposal. Be realistic and accurate — do not pad.\n" +
        "Produce a COMPLETE, itemized materials takeoff with quantity, unit, and total cost per line. The FIRST item must be the PRIMARY material (slate/shingle/metal for roofing, siding product for siding, decking for decks).\n" +
        TRADE_BASE_RULES +
        tradeModuleFor(scope, desc) +
        ((aiTrade && aiTrade.trade === scope) ? aiTradeModule(aiTrade) : "") +
        "Use the measured dimensions above and (for roofing) the EagleView formulas to set quantities. A typical full job has 8-15+ line items, not two. Suggest a sensible crew size and resulting days on site.\n" +
        "LABOR - FOLLOW THIS PROCEDURE IN ORDER, DO NOT SKIP STEP 1:\n" +
        "STEP 1 (REQUIRED FIRST): Look in the CONTRACTOR PRODUCTION RATES list below for the rate(s) that match the labor tasks in this job (match by name loosely - a standing seam job matches \"Standing seam panel install\", a slate job matches \"Slate / Nu-Lok install\", plus tear-off, flashing, ridge, etc.). For EACH matching task compute hours = quantity x that MH/unit rate, then ADD them up. These are the contractor REAL numbers and ALWAYS take priority over your own per-square guesses.\n" +
        "STEP 2 (ONE combined difficulty multiplier, do NOT stack several): pick a SINGLE factor for the whole job based on the hardest condition, and CAP it at 1.5. Guide: easy/walkable = 1.0; moderate (6-8/12 or somewhat cut up) = 1.15-1.25; steep AND complex (8/12+ with many facets/valleys) = 1.35-1.5 MAX. Do not multiply steep x complex x access together - choose one combined number in that range. Apply it to the INSTALL labor only, not to tear-off, flashing, or trim lines.\n" +
        "STEP 3 (fallback ONLY if nothing matched): if and ONLY if NO task in the rate book matches, estimate from benchmarks - asphalt re-roof ~1.5-2.5 MH/sq; steep/complex/tear-off/specialty much higher (slate or standing seam 4-12+ MH/sq). Never return 0 or a token number like 16 hours for a big roof.\n" +
        "Set laborHours = TOTAL man-hours after multipliers. Set laborSource to \"ratebook\" if ANY hours came from STEP 1, or \"estimate\" only if you used STEP 3 for everything. Set a burdened rate per man-hour and days = laborHours / (crew x ~8).\n" +
        (profC.prefMaterials && profC.prefMaterials.trim() ? "THIS CONTRACTOR'S PREFERRED BRANDS (favor these in the takeoff and in the options below when they fit the job): " + profC.prefMaterials.trim() + "\n" : "") +
        (contractorPriceLines().length ? "THIS CONTRACTOR'S PRICE BOOK — their REAL material unit costs. Use THESE exact costs when a takeoff line matches (match by name loosely); they override your estimates and are more accurate than any guess:\n" + contractorPriceLines().join("\n") + "\n" : "") +
        "CONTRACTOR'S PRODUCTION RATES (man-hours per unit, sq = 100 sqft — use these to compute labor hours for matching tasks):\n" + rateBook.slice(0, 120).map((r) => "- " + r.task + " (" + r.unit + "): " + r.rate + " MH/unit").join("\n") + "\n" +
        "ALSO provide a GOOD / BETTER / BEST set of 3 popular, commonly-stocked PRIMARY-material options for this region (real product lines a local supplier like ABC Supply, SRS, Beacon, Home Depot or Lowe's actually carries — e.g. for roofing: a 3-tab or builder shingle, a mid architectural like GAF Timberline HDZ, and a premium/designer line). For each give a name, a one-line why, the total material cost for THIS job's primary-material quantity at that tier, and a real search URL (a manufacturer product page or a supplier/Home Depot/Lowe's search URL). Do not invent fake URLs — use a real product or a search link like https://www.homedepot.com/s/timberline%20hdz.\n" +
        "FAMILY-LOCK: all THREE tier options MUST be the SAME material family/class as THIS job's specified primary material — they are good/better/best WITHIN that family, not cross-material alternatives. A cedar/wood siding job → three wood or genuine cedar-substitute options (e.g. cedar, red cedar, LP SmartSide engineered wood) — NEVER vinyl or fiber-cement unless the scope explicitly specifies that material. A shingle job → shingle tiers; standing-seam → metal tiers; TPO → membrane tiers. If the contractor's scope specifies the material, match it exactly.\n" +
        ((tierPref && (tierPref.good || tierPref.better || tierPref.best)) ? ("THE CONTRACTOR'S PREFERRED TIER LINES — USE THESE EXACT PRODUCTS as the Good/Better/Best names (price each for this job, give the why + a real URL): " + ["good", "better", "best"].map((k) => tierPref[k] ? (k + "=" + tierPref[k]) : "").filter(Boolean).join(", ") + ".\n") : "") +
        cazaManualBlock(scope, desc, profC.cazaManual) +
        (roofIsMixed(installScope(scope + " " + desc)) ? mixedRoofBlock(dims, installScope(scope + " " + desc), desc, panelW) : "") +
        (__offManual ? "OFF-MANUAL SCOPE: this job type has NO Caza standard assembly on file. Still build a complete, sensible estimate from general building knowledge (materials + approach) — do NOT refuse or force it into a standard that doesn't fit. But BE HONEST about confidence: your labor rate and pricing are NOT from Caza's verified book. Set \"offManual\": true. In \"assumptions\" list what you had to assume (e.g. labor rate estimated, material costs estimated, approach assumptions). In \"questions\" put 1-3 SHORT targeted asks for the contractor's REAL numbers where you're least sure (e.g. \"Your slate labor per square?\", \"Your material cost on the copper?\"). These are the numbers that would make this a verified bid.\n" : "") +
        "ASSEMBLY WALK (REQUIRED — generate this BEFORE items[]): narrate the build in INSTALLATION ORDER — deck-up / eave-to-ridge for roofing, sheathing-out for siding, footing-up for decks/framing. Each step: what layer goes on, what it sits on, what laps it, what fastens it, and which items[] line(s) that step produces (produces: [] only when the substrate already exists). JUNCTIONS ARE STEPS — band-to-field transitions, valleys, wall intersections, penetrations: say exactly what happens at each; a junction with no treatment is a missing step. Then give EVERY items[] line a \"walkStep\": the n of the step that installs it — a fastener's step must reference the component it fastens (screws with no panel cannot pass). The walk owns ORDER and PRESENCE only; quantities still come from the measurements/formulas above.\n" +
        "FINAL SELF-CHECK before you answer (do this silently, then output ONLY the JSON): (1) SYSTEM PURITY - re-read your items[] and DELETE any line that belongs to a different roofing or siding system than this job's. On an asphalt shingle job, strip out every metal-panel, standing-seam, panel-clip, seam-tape, or metal-trim line. (2) QUANTITIES - sanity-check each qty against the measurements; the primary material is line 1; no zero or absurd quantities. (3) items[] is MATERIALS ONLY (no labor, equipment, or dumpster lines). (4) Record what you verified or removed as 2-4 short plain-English strings in the \"checks\" array. (5) CAZA MANUAL CHECK — IF a CAZA MANUAL is given above, compare your estimate to it and record each deviation in \"deviations\": a material that is NOT Caza's standard (and not a listed sub), a standard ASSEMBLY piece that is MISSING, an EXCLUDED item that is present, a burdened LABOR rate that differs materially from Caza's standard crew rate (kind \"labor\"), or a brand/manufacturer that isn't Caza's preferred (kind \"vendor\"). Name the exact line. Do NOT change the estimate to match — only FLAG it. If everything matches (or no manual was given), return \"deviations\": []. ALSO check primaryOptions (the good/better/best tiers): if ANY tier's material family differs from this job's specified primary material (e.g. a vinyl option on a cedar/wood job), record it as a deviation (kind \"material\", item = the off-family tier product name, found = that product, standard = the correct material family) — the tiers must stay in the job's family.\n" +
        "Respond with ONLY raw JSON, no markdown: {\"title\": short job name, \"trade\": one word, \"checks\": [2-4 short strings of what your final self-check verified or fixed], \"offManual\": boolean (true only if told OFF-MANUAL above), \"assumptions\": [short strings — what you assumed; [] if none], \"questions\": [short strings — targeted asks for the contractor's real numbers; [] if none], \"deviations\": [{\"kind\": \"material\"|\"missing\"|\"extra\"|\"labor\"|\"vendor\", \"item\": exact takeoff line name this concerns (for MISSING, the Caza standard name to add; for labor, \"Burdened labor rate\"), \"found\": what the estimate has (or \"—\" if missing), \"standard\": Caza's standard for this (for labor, the $/hr number), \"note\": one short why}], \"assemblyWalk\": [{\"n\": 1, \"layer\": what goes on at this step, \"sitsOn\": str, \"lappedBy\": str, \"fastenedWith\": str, \"produces\": [items[] line names this step adds]}], \"items\": [{\"name\": material name, \"qty\": number, \"unit\": e.g. squares/bundles/pieces/sheets/LF, \"cost\": total $ for this line, \"walkStep\": n of the assemblyWalk step that installs it}], \"primaryOptions\": [{\"tier\": \"Good\"|\"Better\"|\"Best\", \"name\": product line, \"why\": one short line, \"cost\": total $ for the primary material at this tier for this job, \"url\": real link}], \"laborHours\": total man-hours (number), \"laborRate\": burdened $/hr, \"laborSource\": \"ratebook\" or \"estimate\", \"equipment\": $ total, \"taxRate\": decimal, \"crew\": number of workers, \"days\": days on site, \"notes\": one short line of estimator notes — a genuinely useful heads-up (access, tear-off surprises, what really drives the price) with a touch of dry job-site humor, but keep it professional and skip the joke if the job is straightforward}";
      const content = [
        ...photos.slice(0, 3).map((ph) => {
          const mt = ph.startsWith("data:") ? (ph.substring(5, ph.indexOf(";")) || "image/jpeg") : "image/jpeg";
          return { type: "image", source: { type: "base64", media_type: mt, data: ph.split(",")[1] } };
        }),
        { type: "text", text: prompt },
      ];
      let text;
      try { text = await callClaudeBackground([{ role: "user", content }], { search: true, maxTokens: 5000, trade: __manualKey, priceBook: enginePriceBookPayload(), standingRules: activeRuleTexts(__manualKey) }); } // 5000: assemblyWalk adds ~300-800 output tokens
      catch (e1) { text = await callClaudeBackground([{ role: "user", content: prompt }], { search: true, maxTokens: 5000, trade: __manualKey, priceBook: enginePriceBookPayload(), standingRules: activeRuleTexts(__manualKey) }); }
      const __manualLoaded = !!__LAST_MANUAL_USED;
      let d;
      try { d = parseJSON(text); }
      catch (eParse) {
        // last-ditch salvage: pull the largest repairable JSON object out of a truncated reply
        const raw = (text || "").replace(/```json|```/g, "").trim();
        const st = raw.search(/[\[{]/);
        if (st < 0) throw new Error("Estimate failed: reply came back empty — tap Build again.");
        try { d = repairJSON(raw.slice(st)); }
        catch (e2) { throw new Error("Estimate failed: the takeoff was long and got cut off — tap Build estimate again."); }
      }
      let items = Array.isArray(d.items) ? d.items.map((it) => {
        const qty = num(it.qty) || 0;
        const cost = Math.round(num(it.cost) || 0);
        const unitPrice = qty > 0 ? cost / qty : cost; // per-unit so qty edits recompute cost
        return { name: String(it.name || "Item"), qty: qty, unit: String(it.unit || ""), unitPrice: unitPrice, cost: cost, priceTier: it.priceTier || null, matchType: it.matchType || null, walkStep: num(it.walkStep) || 0 };
      }) : [];
      // ASSEMBLY WALK — the model's install-order narration (order + presence; never quantities).
      // rawNames = the LLM's own line names; code-added lines are exempt from the trace check.
      const __walk = normalizeWalk(d.assemblyWalk);
      const __rawNames = new Set((Array.isArray(d.items) ? d.items : []).map((it) => String((it && it.name) || "").toLowerCase()));
      // DETERMINISTIC quantities: overwrite formula-driven roof lines with code-computed values
      // (AI keeps the line names + unit pricing; code fixes the math). Matches by keyword.
      const sysStr = installScope(scope + " " + desc); // F13: classify by the INSTALL system, not the roof being torn off
      items = stripCrossSystem(items, sysStr); // BUG 8 — drop incompatible-system lines (shingle job can't keep metal-panel lines)
      const isRoof = /roof|shingle|standing seam|slate|nu-?lok|metal panel|tpo|epdm|membrane|lok|snap.?lock/.test(sysStr);
      // ENGINE REBUILDS ARE FALLBACKS FOR THIN AI RESULTS — never post-processors of a full,
      // ratebook-sourced takeoff. The $120K SA-EPDM underbid: 20 spec-correct lines + 1,518
      // ratebook MH (coverboard, fasteners, primer, 1,068 LF coping) replaced by a 7-line
      // per-square assembly at 1,168 MH. A ratebook laborSource or a >=10-line itemized list
      // IS the spec — keep it and run the price-only pass instead.
      const __substantialLLM = String(d.laborSource || "").toLowerCase() === "ratebook" || (Array.isArray(d.items) && d.items.length >= 10);
      // COMMERCIAL FLAT (TPO/EPDM): engine builds 3 good/better/best assemblies (membrane mil +
      // attachment + insulation R + NDL warranty). Bypasses the generic LLM takeoff/options/labor.
      // SCALE GATE: per-square assembly pricing is a residential-scale shortcut — block it above
      // ~30 SQ or when a parapet is in play (commercial detail the assembly can't carry).
      const __bigFlat = (parseMeas(dims).area / 100) > 30 || /parapet/i.test(String(dims || "") + " " + String(desc || ""));
      const __flatTiers = (isRoof && !d.deterministic && !__substantialLLM && !__bigFlat && roofTypeOf(sysStr) === "flat") ? flatTierAssemblies(dims, sysStr, desc) : null;
      let __flatDef = null;
      if (__flatTiers && __flatTiers.tiers.length) {
        __flatDef = __flatTiers.tiers.find((x) => x.tier === FLAT_DEFAULT_TIER) || __flatTiers.tiers[Math.min(1, __flatTiers.tiers.length - 1)];
        items = __flatDef.items.map((it) => ({ ...it })); // show the default (Better) assembly as the editable takeoff
      }
      // Deterministic-engine results already carry exact code-computed quantities — do not re-derive.
      if (isRoof && !d.deterministic && !__flatTiers) {
        const books = contractorPriceBook();
        const __mixed = roofIsMixed(sysStr);
        // DEFECT A: MIXED roof (e.g. metal eave band + shingle upper field) — the LLM built BOTH
        // halves and the preflight verified the quantities. Do NOT rebuild-and-replace one system
        // over the whole roof (that silently drops the other half); keep the LLM's lines/quantities
        // and run a PRICE-ONLY pass (book-first, unit-aware, category-assisted).
        const q = __mixed ? null : computeRoofQuantities(dims, sysStr, num(panelW));
        if (__mixed) {
          items = repriceLlmItems(items, books);
          // NEVER-OMIT (run-3): a mixed roof MUST show its metal PANEL line — the band's priciest
          // component. If the LLM shipped band accessories (butyl/closures/screws) but no panel, add a
          // flagged panel line at the best default qty (band SF / coverage). A contractor can fix a
          // flagged number; they can't fix an invisible one.
          if (!items.some((it) => roofPartType(it.name) === "panel")) {
            const bp = bandPartition(dims, sysStr, desc, panelW);
            const qty = bp.panelLF > 0 ? Math.round(bp.panelLF) : 0;
            const mb = matchBookLine({ name: "Standing-seam metal panel", unit: "LF", key: "panel" }, books);
            const up = mb && mb.unitPrice != null ? mb.unitPrice : null;
            items.push({ name: "Standing-seam metal panel (band)", qty: qty, unit: "LF", unitPrice: up != null ? up : 0, cost: up != null ? Math.round(up * qty) : 0, unpriced: up == null || qty <= 0, priceTier: null, matchType: null, priceNote: qty > 0 ? ("band panel ~= " + qty + " LF (Caza " + bp.bandFt + "ft band / " + bp.coverIn + "in coverage)" + (bp.bandStated ? "" : " - 4ft standard, adjust")) : "panel line added - set the band size (eave LF) to get a quantity" });
          }
          items = reconcileBandPanel(items, dims, sysStr, desc, num(panelW)); // H2: one depth drives both halves
        } else if (q && q.length) {
          if (roofTypeOf(sysStr) !== "shingle") {
            if (__substantialLLM) {
              // A full ratebook-sourced takeoff is the SPEC — keep its lines/quantities and
              // price-only against the book (the rebuild below is only for thin, under-itemized
              // results — the "$295 bug" — not a post-processor for complete ones).
              items = repriceLlmItems(items, books);
            } else {
            // NON-shingle (metal/flat/tile): build the complete deterministic takeoff and
            // price it from the cost book (the LLM under-itemizes these → the $295 bug).
            items = priceRoofTakeoff(q, books, items).map((it) => ({ name: it.name, qty: it.qty, unit: it.unit, unitPrice: it.unitPrice, cost: it.cost, unpriced: it.unpriced, priceTier: null, matchType: null, priceNote: it.priceNote || "" }));
            }
          } else {
          const matchers = [
            { key: "panel", kw: ["panel", "lok", "standing seam", "seam "] },
            { key: "clip", kw: ["clip"] },
            { key: "field", kw: ["shingle", "slate", "field", "membrane", "tpo", "epdm"] },
            { key: "iw", kw: ["ice", "i&w", "ice & water", "ice and water"] },
            { key: "drip", kw: ["drip"] },
            { key: "starter", kw: ["starter"] },
            { key: "ridge", kw: ["ridge cap", "hip cap", "hip/ridge", "ridge/hip"] },
            { key: "valley", kw: ["valley"] },
            { key: "step", kw: ["step flash"] },
            { key: "pen", kw: ["pipe boot", "penetration", "pipe flash"] },
          ];
          // DEFECT G: reconcile formula lines with LLM lines by COMPONENT — one line per component, no
          // $0 duplicate. Keyword lists miss variants ("hip & ridge" != "hip/ridge"); roofPartType catches
          // them for the distinct big products so a matched LLM line is rewritten (not duplicated).
          const DISTINCT_PART = { ridge: "ridge", starter: "starter", valley: "valley", field: "field" };
          const matched = {};
          q.forEach((cq) => {
            const mm = matchers.find((x) => x.key === cq.key);
            if (!mm) return;
            const dp = DISTINCT_PART[cq.key];
            const idx = items.findIndex((it) => { const n = (it.name || "").toLowerCase(); return mm.kw.some((k) => n.indexOf(k) >= 0) || (dp && roofPartType(it.name) === dp); });
            if (idx >= 0) {
              matched[cq.key] = true;
              const old = items[idx];
              // derive a per-unit price; if the AI's unit differs from the computed unit, rebuild unit price from cost/computedQty
              let up = num(old.unitPrice);
              const unitChanged = (old.unit || "").toLowerCase() !== (cq.unit || "").toLowerCase();
              if (unitChanged && cq.qty > 0) up = old.cost / cq.qty; // keep total cost, restate per computed unit
              items[idx] = Object.assign({}, old, { qty: cq.qty, unit: cq.unit, unitPrice: up, cost: Math.round(up * cq.qty) });
            }
          });
          // BACKFILL standard shingle accessory lines the LLM omitted (e.g. drip edge when it
          // only emitted a metal-trim line that stripCrossSystem just removed). Priced from the
          // cost book, flagged ⚠️ if unpriced — never silently missing.
          ["drip", "starter", "ridge", "iw", "valley", "step", "pen"].forEach((key) => {
            if (matched[key]) return;
            const cq = q.find((x) => x.key === key);
            if (!cq) return;
            // DEFECT G safety: don't backfill a distinct component the LLM already carries under another name.
            if (DISTINCT_PART[key] && items.some((it) => roofPartType(it.name) === DISTINCT_PART[key])) return;
            const mb = matchBookLine({ name: cq.name, unit: cq.unit, key: cq.key }, books, { jobShingle: true }); // F6: don't price a shingle line off a steel SKU
            const up = mb && mb.unitPrice != null ? mb.unitPrice : null;
            items.push({ name: cq.name, qty: cq.qty, unit: cq.unit, unitPrice: up != null ? up : 0, cost: up != null ? Math.round(up * cq.qty) : 0, unpriced: up == null, priceTier: null, matchType: null, priceNote: (mb && mb.note) || (up == null ? "no shingle-system match in your book — add the price" : "") });
          });
          items = enforceShingleIwGrade(items, books); // F2: regular I&W on shingle — high-temp is steel-only
          }
        }
      }
      // FAMILY-LOCK backstop (Leak B): mark any tier whose material family clearly differs from the
      // job's specified primary (e.g. vinyl on a cedar job) — flagged in the UI, never silently dropped.
      const __jobFamily = materialFamily(scope + " " + desc);
      // DEFECT E: on a MIXED roof BOTH systems' families are in-scope (metal band + shingle field) — a
      // tier matching EITHER is in-family; flag only a tier that matches NEITHER. Single-system jobs keep
      // the strict single-family lock exactly as shipped.
      const __mixedFams = (isRoof && roofIsMixed(sysStr)) ? (() => { const t = roofTypeOf(sysStr); const nf = (t === "metal" || t === "agpanel") ? "metal" : t === "flat" ? "membrane" : t === "tile" ? "tile" : ""; return [nf, "shingle"].filter(Boolean); })() : null;
      const __offFam = (nm) => { const of = materialFamily(nm); if (!of) return false; return __mixedFams ? (__mixedFams.indexOf(of) < 0) : tierOffFamily(__jobFamily, nm); };
      let primaryOptions = Array.isArray(d.primaryOptions) ? d.primaryOptions.slice(0, 3).map((o) => ({
        tier: String(o.tier || ""), name: String(o.name || ""), why: String(o.why || ""),
        cost: Math.round(num(o.cost) || 0), url: String(o.url || ""), offFamily: __offFam(String(o.name || "")),
      })).filter((o) => o.name) : [];
      // Flat commercial: replace the LLM options with the 3 engine assemblies (each carries its
      // full assembly so picking a tier or pricing the proposal swaps membrane+insulation+labor).
      if (__flatTiers) primaryOptions = __flatTiers.tiers.map((tt) => ({
        tier: tt.tier, name: tt.name, why: tt.why, cost: Math.round(tt.matCost), url: "",
        ndl: tt.ndl, membrane: tt.membrane, mil: tt.mil, attachLabel: tt.attachLabel, isoR: tt.isoR, coverboard: tt.coverboard,
        assembly: { items: tt.items, laborHours: tt.laborHours, matCost: tt.matCost },
      }));
      // CAZA MANUAL preflight deviations — flagged (not auto-applied); contractor accepts/overrides.
      const cazaDeviations = Array.isArray(d.deviations) ? d.deviations.slice(0, 8).map((x) => ({
        kind: (["material", "missing", "extra", "labor", "vendor"].indexOf(String(x.kind || "")) >= 0 ? String(x.kind) : "material"),
        item: String(x.item || ""), found: String(x.found || ""), standard: String(x.standard || ""), note: String(x.note || ""), status: "",
      })).filter((x) => x.item || x.standard) : [];
      // ORDERING RULE: the preflight ran on the LLM JSON; items[] was mutated after (mixed reprice,
      // deterministic rebuild, backfill). Re-check the deviations against the FINAL items so a
      // "missing" flag can't point at a line that actually exists (phantom I&W flag on a kept line).
      const __devHasItem = (name) => { const w = String(name || "").toLowerCase().trim(); if (!w) return false; const tok = w.split(/\s+/).filter((t) => t.length > 3); return items.some((it) => { const n = (it.name || "").toLowerCase(); return n.indexOf(w) >= 0 || w.indexOf(n) >= 0 || tok.some((t) => n.indexOf(t) >= 0); }); };
      const cazaDeviationsFinal = cazaDeviations.filter((x) => !(x.kind === "missing" && (__devHasItem(x.standard) || __devHasItem(x.item))));
      // OFF-MANUAL flags — offManual is CLIENT-SIDE truth (no standard assembly); assumptions/questions from Opus.
      const assumptions = (__offManual && !__flatTiers && Array.isArray(d.assumptions)) ? d.assumptions.slice(0, 6).map((x) => String(x)).filter(Boolean) : [];
      const questions = (__offManual && !__flatTiers && Array.isArray(d.questions)) ? d.questions.slice(0, 4).map((x) => String(x)).filter(Boolean) : [];
      const crewN = num(d.crew) || 2, daysN = num(d.days) || 1;
      let laborHours = Math.round(num(d.laborHours) || 0);
      let laborRate = Math.round(num(d.laborRate) || 0);
      // Deterministic engine: trust its labor (computed from the trade's laborBasis) — do NOT override.
      let laborSrc = d.deterministic ? "engine" : (String(d.laborSource || "").toLowerCase() === "ratebook" ? "ratebook" : "estimate");
      if (!d.deterministic) {
        // Labor in code so it never depends on the AI doing the lookup. The rate
        // book is trusted ONLY when it captured the per-square bulk; a partial
        // match returns null (see computeLaborFromRateBook) so it can't drop hours.
        if (__flatDef) { laborHours = __flatDef.laborHours; laborSrc = "engine"; } // flat: deterministic per-assembly labor (mech vs adhered + iso + coverboard + tear-off)
        else { const calc = computeLaborFromRateBook(items, rateBook, dims, scope, desc);
        if (calc && calc.hours > 0) { laborHours = calc.hours; laborSrc = "ratebook"; } }
        // squares on the job (drives the size-scaled realistic floor)
        let sqGuess = 0;
        items.forEach((it) => { const u = (it.unit || "").toLowerCase(); if (u.indexOf("square") >= 0 || u === "sq") sqGuess = Math.max(sqGuess, num(it.qty) || 0); });
        if (!sqGuess && dims) { const m = String(dims).match(/([\d,]+(?:\.\d+)?)\s*sqft/i); if (m) sqGuess = (num(m[1]) || 0) / 100; }
        // Realistic minimum man-hours for a sized job (shared helper; BUG-1 fix).
        const floor = realisticLaborFloor(sqGuess, dims, (scope + " " + desc).toLowerCase(), isRoof); // raw string — the floor's tear-off test needs the words installScope strips
        if (floor > 0 && laborHours < floor) { laborHours = floor; if (laborSrc !== "ratebook") laborSrc = "estimate"; }
      }
      if (laborHours <= 0) laborHours = Math.max(1, crewN * daysN * 8);
      // BURDENED RATE FLOOR — never price labor below a real loaded cost for the trade.
      // PART 3: Caza Manual crew rate for this trade drives the floor (falls back to the built-in floor).
      const __cazaRate = cazaCrewRate(scope, desc, profC.cazaManual);
      const __rateFloor = __cazaRate > 0 ? __cazaRate : burdenedRateFloor(scope, desc);
      const __rateFloored = laborRate < __rateFloor; // incl. the laborRate<=0 case
      if (__rateFloored) laborRate = __rateFloor;
      // Man-hours and days-on-site MUST come from the same number — derive days
      // from the final man-hours + crew so they can never diverge (the 36-MH-but-
      // 13-days bug). If the AI's own day count is bigger, keep it (it implies more MH it knew about).
      // Feature B: apply this trade's labor calibration factor (from logged actuals)
      const calibKey = (aiTrade && aiTrade.trade === scope) ? aiTrade.trade : (manualTradeKey(scope, desc) || String(scope || desc || "").toLowerCase().trim());
      const calibEntry = calib[calibKey] || null;
      if (calibEntry && calibEntry.factor && calibEntry.factor !== 1) laborHours = Math.max(1, Math.round(laborHours * calibEntry.factor));
      const daysFinal = Math.max(1, Math.round(laborHours / (Math.max(1, crewN) * 8)));
      return {
        title: String(d.title || "Estimate"), trade: String(d.trade || "general").toLowerCase(),
        items, primaryOptions, chosenTier: __flatTiers ? FLAT_DEFAULT_TIER : null,
        flatTier: !!__flatTiers, membrane: __flatTiers ? __flatTiers.membrane : null,
        cazaDeviations: __flatTiers ? [] : (__rateFloored ? cazaDeviationsFinal.filter((dv) => dv.kind !== "labor") : cazaDeviationsFinal), // flat tiers own the takeoff; a floored rate is already conformed to Caza's — drop the redundant labor flag; cazaDeviationsFinal drops phantom "missing" flags for lines that exist
        offManual: __offManual, offManualKey: (scope || desc || "").toLowerCase().trim().slice(0, 48), assumptions: assumptions, questions: questions,


        laborHours: laborHours, laborRate: laborRate, laborSource: laborSrc,
        rateFloor: __rateFloor, rateFloored: __rateFloored, burdened: true,
        // F1 (Dustin, locked): a roofing tear-off's disposal is BOOK DATA, not a web guess — 30-yd
        // roofing dumpster = $1,000. Floor the equipment total and flag the raise (still editable).
        // NOTE: tear-off words live in the RAW scope/desc — sysStr is installScope()d (F13 strips them).
        equipment: (() => { const e = Math.round(num(d.equipment) || 0); return (isRoof && /tear|re-?roof|remove|layer/.test((scope + " " + desc).toLowerCase()) && e < 1000) ? 1000 : e; })(),
        equipFloored: !!(isRoof && /tear|re-?roof|remove|layer/.test((scope + " " + desc).toLowerCase()) && Math.round(num(d.equipment) || 0) < 1000),
        taxRate: num(d.taxRate) || 0.08,
        crew: crewN, days: daysFinal, notes: String(d.notes || ""),
        // when the flat-tier engine replaced the items, the AI's checks describe a system that no
        // longer exists in items[] — regenerate them, never ship engine items with foreign checks.
        checks: __flatTiers ? ["Tier-priced by the flat-roof engine (thin AI takeoff) — AI checks/assumptions were regenerated, not carried over"] : (Array.isArray(d.checks) ? d.checks.map((c) => String(c)).filter(Boolean).slice(0, 6) : []),
        manualLoaded: __manualLoaded, manualKey: __manualKey,
        aiBuilt: !!(aiTrade && aiTrade.trade === scope),
        calibKey: calibKey, calibN: calibEntry ? (calibEntry.n || 0) : 0, calibFactor: calibEntry ? calibEntry.factor : 1,
        // ASSEMBLY WALK — deterministic-engine trades get their spec's static walk; LLM trades carry
        // the model's walk. Coherence runs on the FINAL items; the full trace check only where LLM
        // lines survive (mixed / shingle / non-roof LLM) — the rebuild paths replace names wholesale.
        ...(() => { try {
          const w = d.deterministic ? normalizeWalk((ENGINE_WALKS[__manualKey] || []).map((l, i) => ({ n: i + 1, layer: l }))) : __walk;
          const checkTrace = !d.deterministic && !__flatTiers && !(isRoof && !roofIsMixed(sysStr) && roofTypeOf(sysStr) !== "shingle");
          const wf = d.deterministic ? [] : walkCoherence(w, items, __rawNames, isRoof, checkTrace);
          // SHRINK ALARM: an engine pass that cut materials below HALF the AI's total is exactly
          // how the $120K flat-tier underbid was caught by hand — flag it automatically now.
          const __rawMats = (Array.isArray(d.items) ? d.items : []).reduce((a, it) => a + (num(it.cost) || 0), 0);
          const __finMats = items.reduce((a, it) => a + (num(it.cost) || 0), 0);
          if (!d.deterministic && __rawMats > 0 && __finMats < __rawMats * 0.5) wf.push("engine pass cut materials from " + $0(__rawMats) + " to " + $0(__finMats) + " — review against the AI takeoff (the diagnostic bundle carries both)");
          return { assemblyWalk: w, walkFlags: wf };
        } catch (e) { return { assemblyWalk: [], walkFlags: ["assembly not verified — walk check failed"] }; } })(),
        // DIAGNOSTIC capture (stripped from the persisted trade after the run bundle is built): the RAW
        // LLM JSON exactly as parsed (before override/price/dedup) + how this trade was routed.
        __diagRaw: d,
        // F7: roofType/mixed only mean something on ROOFING trades — null them elsewhere so they stop
        // polluting siding/deck/etc. diagnostics. (installScope so a tear-off system doesn't skew it.)
        __diagPipe: (() => { const __rt = /\broof|shingle|standing.?seam|metal panel|\btpo\b|\bepdm\b|slate|\btile\b|membrane/.test((scope + " " + desc).toLowerCase()); const __ins = installScope(scope + " " + desc); return { scope: scope, desc: desc, dims: dims, panelW: num(panelW), roofType: __rt ? roofTypeOf(__ins) : null, mixed: __rt ? roofIsMixed(__ins) : false, deterministic: !!d.deterministic, flat: !!__flatTiers, manualLoaded: __manualLoaded, manualKey: __manualKey, offManual: __offManual, model: "claude-opus-4-8", endpoint: "estimate-background", laborSource: laborSrc, rateFloored: !!__rateFloored, rulesApplied: activeRuleTexts(__manualKey) }; })(),
      };
    }
  };
  // ONE-PAGE ESTIMATE — build every selected trade into a single combined estimate,
  // each trade its OWN full result (takeoff + good/better/best + labor), one shared
  // margin slider. Single trade => trades:[one]; same render path either way.
  const buildUnifiedEstimate = async () => {
    const sel = Object.keys(houseScope);
    if (!sel.length) { flash("Add at least one trade first — AL's buttons up top."); return; }
    const __t0 = Date.now();
    const __prevDiag = (estResult && estResult.diag) ? estResult.diag : null; // for the run-vs-run delta (Part 3)
    setEstBusy("run"); setEstResult(null); setDiagLink("");
    if (voiceRef.current) speakAL("Let me double-check everything before I save this."); // voice pairing for the Opus preflight wait
    try {
      const results = [];
      for (const t of sel) {
        const label = (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).label || t;
        const type = (houseScope[t] && houseScope[t] !== true) ? String(houseScope[t]) : "";
        const scope = label + (type ? " — " + type : "");
        const pbk = PB_TRADE_KEY[t];
        const spec = pbk ? (whSpecs || []).find((s) => s.trade === pbk) : null;
        const dimBits = [];
        if (spec && whInputs[pbk]) spec.inputs.forEach((inp) => { const v = whInputs[pbk][inp.name]; if (v != null && v !== "" && !(typeof v === "number" && v === 0)) dimBits.push(inp.label + ": " + v + (inp.unit ? " " + inp.unit : "")); });
        const dims = [whDims, dimBits.join("; ")].filter(Boolean).join(" · ");
        // Part 2: feed this block ITS slice (from AL's partition) so it bids only what it owns; fall back to label+type.
        const desc = whScopeLines[t] ? whScopeLines[t] : (scope + (type ? " (" + type + ")" : ""));
        // Part 3: tell this block what the OTHER selected blocks own, so it doesn't re-bid shared pieces.
        const excludeList = sel.filter((x) => x !== t).map((x) => { const xl = (HOUSE_HOTSPOTS.find((h) => h.trade === x) || {}).label || x; const xt = (houseScope[x] && houseScope[x] !== true) ? String(houseScope[x]) : ""; return xl + (xt ? " (" + xt + ")" : "") + (whScopeLines[x] ? ": " + whScopeLines[x] : ""); }).filter(Boolean).join("; ");
        const aiT = aiTrades.find((x) => x.trade.toLowerCase() === String(label).toLowerCase() || x.trade.toLowerCase() === String(t).toLowerCase()) || null;
        try {
          const __cat = tierPrefCategory(t, scope + " " + desc);
          const r = await buildOneTrade({ scope, desc, dims, photos: whPhotos, panelW: num(housePanelW[t]) || 0, aiTrade: aiT, tierPref: (__cat && profC.tierPrefs && profC.tierPrefs[__cat]) || null, excludeList: excludeList });
          // F11 — zero-quantity guard (never-render-zero, the trade-level twin of never-omit): a trade
          // whose EVERY line came back qty 0 is a wrong-engine/missing-inputs template, not an estimate.
          // Block-and-ask instead of rendering template lines + phantom minimum hours.
          if (!(r.items || []).some((it) => num(it.qty) > 0)) throw new Error(label + " came back with no real quantities — add its dimensions (or re-describe the scope) and rebuild.");
          r.phaseSys = scope + " " + desc; // remember the system so phases stay type-specific on edit/reopen
          r.phases = allocatePhases(t, r.laborHours, r.phaseSys); // per-phase BID hours, keyed to the material/system
          results.push(Object.assign({ tradeKey: t, label: label }, r));
        } catch (e) { results.push({ tradeKey: t, label: label, error: errMsg(e) }); }
      }
      const ok = results.filter((r) => !r.error);
      if (!ok.length) { flash("Estimate failed: " + ((results[0] && results[0].error) || "tap Build again")); setEstBusy(""); if (voiceRef.current) speakAL("That didn't build — let's try again."); return; }
      // DIAGNOSTIC BUNDLE — build BEFORE stripping the raw-capture temp fields; a failure here never
      // blocks the estimate (diagnostics are a passenger, never the pilot).
      let __diag = null;
      try { __diag = buildDiagBundle(sel, ok, __t0, __prevDiag); } catch (e) { console.warn("diag capture failed", e); }
      ok.forEach((t) => { try { delete t.__diagRaw; delete t.__diagPipe; } catch (e) {} }); // keep the persisted trade lean
      // F12 — advisory market-sanity flag per trade (computed at Caza's standard margin; never blocks)
      const __sanityMargin = cazaMarginStd(ok, profC.cazaManual);
      ok.forEach((t) => { try { const __c = (t.items || []).reduce((s, it) => s + num(it.cost), 0) + (num(t.laborHours) || 0) * (num(t.laborRate) || 0) + (num(t.equipment) || 0); const f = marketSanity((t.label || "") + " " + (t.phaseSys || t.title || ""), t.items, sellOf(__c, __sanityMargin)); if (f) t.sanityFlag = f; } catch (e) {} });
      setEstResult({ trades: ok, errors: results.filter((r) => r.error), multi: ok.length > 1, diag: __diag });
      // PART 3 — run-vs-run delta readback when the same job re-rolls (same inputs, different numbers = noise)
      if (__diag && __diag.deltaVsPrev && __diag.deltaVsPrev.sameInputs) { const dv = __diag.deltaVsPrev; if (Math.abs(dv.price) >= 200 || Math.abs(dv.laborHours) >= 8) flash("Re-roll vs last run: " + (dv.price >= 0 ? "+" : "") + "$" + Math.round(dv.price).toLocaleString() + " price · labor hours " + dv.laborHoursFrom + "→" + dv.laborHoursTo + " (same inputs)."); }
      // PART 4: apply Caza's standard gross margin for this job on a fresh build (contractor can still slide).
      const stdMargin = cazaMarginStd(ok, profC.cazaManual); setEstMargin(stdMargin);
      // OFF-MANUAL: tally each off-manual scope on a FRESH build (not a rebuild) — drives the "add to manual?" nudge on repeats.
      const offTrades = ok.filter((t) => t.offManual);
      if (offTrades.length && !estId) setProfC((p) => { const seen = { ...(p.offManualSeen || {}) }; offTrades.forEach((t) => { const k = t.offManualKey || (t.label || "").toLowerCase(); if (k) seen[k] = (seen[k] || 0) + 1; }); return { ...p, offManualSeen: seen }; });
      // hands-free payoff: speak the price + that it saved (the auto-save effect persists it)
      if (voiceRef.current) { const price = sellOf(jobCostOf(ok), stdMargin); const nDev = ok.reduce((a, t) => a + ((t.cazaDeviations || []).length), 0); speakAL("Built and saved" + (estCustomer.trim() ? " for " + estCustomer.trim() : "") + ". Your price is about " + (Math.round(price / 100) * 100).toLocaleString() + " dollars." + (offTrades.length ? " Note — " + (offTrades[0].label || "one trade") + (offTrades.length > 1 ? " and others" : "") + " " + (offTrades.length > 1 ? "aren't" : "isn't") + " in your manual, so I bid " + (offTrades.length > 1 ? "them" : "it") + " from general knowledge. Labor and pricing are my best estimate for the job type, not a verified Caza standard — give " + (offTrades.length > 1 ? "them" : "it") + " a close look." : "") + (nDev > 0 ? " I also flagged " + nDev + " thing" + (nDev === 1 ? "" : "s") + " that differ from your Caza standard." : "")); }
    } catch (e) { flash("Estimate failed: " + errMsg(e)); }
    setEstBusy("");
  };
  // editable materials list helpers — all keyed by trade index (ti) into estResult.trades
  const estItemSet = (ti, i, field, val) => {
    setEstResult((r) => {
      if (!r) return r;
      const trades = r.trades.map((tr, k) => {
        if (k !== ti) return tr;
        const items = tr.items.map((it, idx) => {
          if (idx !== i) return it;
          if (field === "name" || field === "unit") return { ...it, [field]: val };
          const v = num(val);
          if (field === "cutW") { const y = sheetYield(v, it.sheetRate); if (!y) return { ...it, cutW: v }; return { ...it, cutW: v, unitPrice: y.perLF, cost: Math.round(y.perLF * (num(it.qty) || 0)), priceNote: v + "in cut → " + y.pieces + "/sheet → $" + y.perLF + "/LF @ $" + (num(it.sheetRate) > 0 ? it.sheetRate : SHEET_RATE_24_KYNAR) + "/4x10 sheet" }; }
          if (field === "qty") { const up = num(it.unitPrice); return { ...it, qty: v, cost: Math.round(up * v) }; }
          if (field === "unitPrice") { return { ...it, unitPrice: v, cost: Math.round(v * (num(it.qty) || 0)) }; }
          if (field === "cost") { const q = num(it.qty) || 0; return { ...it, cost: Math.round(v), unitPrice: q > 0 ? v / q : v }; }
          return { ...it, [field]: v };
        });
        return { ...tr, items };
      });
      return { ...r, trades };
    });
  };
  const estItemAdd = (ti) => setEstResult((r) => r ? { ...r, trades: r.trades.map((tr, k) => k === ti ? { ...tr, items: [...tr.items, { name: "New item", qty: 1, unit: "", unitPrice: 0, cost: 0 }] } : tr) } : r);
  const estPickTier = (ti, opt) => setEstResult((r) => {
    if (!r) return r;
    return { ...r, trades: r.trades.map((tr, k) => {
      if (k !== ti || !tr.items.length) return tr;
      // Flat commercial: swap the ENTIRE assembly (membrane mil + insulation R + attachment + labor).
      if (opt.assembly && Array.isArray(opt.assembly.items)) {
        const items = opt.assembly.items.map((it) => ({ ...it }));
        const laborHours = num(opt.assembly.laborHours) || tr.laborHours;
        return { ...tr, items, laborHours, chosenTier: opt.tier, phases: allocatePhases(tr.tradeKey, laborHours, tr.phaseSys || tr.title || "") };
      }
      // FIX 2C: reconcile the editable unit price with the tier total (was left stale → $0.47 ≠ total)
      const items = tr.items.map((it, idx) => idx === 0 ? { ...it, name: opt.name, cost: Math.round(opt.cost), unitPrice: (num(it.qty) > 0 ? Math.round((opt.cost / num(it.qty)) * 100) / 100 : opt.cost), unpriced: false } : it);
      return { ...tr, items, chosenTier: opt.tier };
    }) };
  });
  // CAZA MANUAL deviation — accept (conform the estimate to the standard) or override (keep custom).
  // Never silently auto-corrects: the contractor's call is captured + persisted on the trade.
  const estManualResolve = (ti, di, action) => setEstResult((r) => {
    if (!r) return r;
    return { ...r, trades: r.trades.map((tr, k) => {
      if (k !== ti) return tr;
      const dev = (tr.cazaDeviations || [])[di];
      let items = tr.items;
      // Labor-rate deviation: accept → conform the burdened rate to Caza's standard (no line edit).
      if (action === "accepted" && dev && dev.kind === "labor") {
        const rate = num(String(dev.standard || "").replace(/[^0-9.]/g, ""));
        const cazaDeviations0 = (tr.cazaDeviations || []).map((d, j) => j === di ? { ...d, status: action } : d);
        return rate > 0 ? { ...tr, laborRate: rate, cazaDeviations: cazaDeviations0 } : { ...tr, cazaDeviations: cazaDeviations0 };
      }
      if (action === "accepted" && dev) {
        const want = (dev.item || dev.found || "").toLowerCase().trim();
        const tok = want.split(/\s+/).filter((t) => t.length > 3);
        const idx = items.findIndex((it) => { const n = (it.name || "").toLowerCase(); return want && (n.indexOf(want) >= 0 || want.indexOf(n) >= 0 || tok.some((t) => n.indexOf(t) >= 0)); });
        if (dev.kind === "extra") { if (idx >= 0) items = items.filter((_, x) => x !== idx); }
        else if (dev.kind === "missing") { items = [...items, { name: dev.standard || dev.item, qty: 1, unit: "", unitPrice: 0, cost: 0, unpriced: true, placeholder: true, priceTier: "seed", matchType: null }]; }
        else if (idx >= 0 && dev.standard) { items = items.map((it, x) => x === idx ? { ...it, name: dev.standard } : it); } // material → conform the line name to Caza's standard
      }
      const cazaDeviations = (tr.cazaDeviations || []).map((d, j) => j === di ? { ...d, status: action } : d);
      return { ...tr, items, cazaDeviations };
    }) };
  });
  // OFF-MANUAL → IN-MANUAL: graduate a bid into the Caza Manual (seed a standard assembly from its
  // takeoff + capture the labor rate as a crew rate). This is how the manual GROWS from real bids.
  const cmMatchKey = (tr) => { const parts = String((tr && (tr.offManualKey || tr.label)) || "").split(/[—–\-]/).map((s) => s.trim()).filter(Boolean); return (parts.length > 1 ? parts[parts.length - 1] : (parts[0] || "")).toLowerCase(); };
  const addOffManualToManual = (ti) => {
    const tr = estResult && estResult.trades && estResult.trades[ti];
    if (!tr) return;
    const match = cmMatchKey(tr) || (tr.label || "").toLowerCase();
    if (!match) { flash("Couldn't tell what to name this — add it manually in Profile."); return; }
    const includes = (tr.items || []).slice(0, 10).map((it) => it.name).filter(Boolean);
    cmUpdate((m) => {
      m.assemblies = [...m.assemblies, { id: "cm_a_" + rid(), match: match, includes: includes, excludes: [], note: "Added from a bid — verify." }];
      if (num(tr.laborRate) > 0) m.labor.crewRates = [{ id: "cm_l_" + rid(), trade: match, rate: num(tr.laborRate) }, ...m.labor.crewRates];
    });
    setEstResult((r) => r ? { ...r, trades: r.trades.map((t, k) => k === ti ? { ...t, offManual: false, addedToManual: true } : t) } : r);
    flash("Added “" + match + "” to your Caza Manual — verify the assembly + rate in Profile.");
  };
  const estItemDel = (ti, i) => setEstResult((r) => r ? { ...r, trades: r.trades.map((tr, k) => k === ti ? { ...tr, items: tr.items.filter((_, idx) => idx !== i) } : tr) } : r);
  // CAZA MANUAL editor (Profile) — edits profC.cazaManual; seeds an editable copy from the default on first touch.
  const cmLabOf = (src) => (src && src.labor && (Array.isArray(src.labor.crewRates) || src.labor.defaultRate != null)) ? src.labor : CAZA_MANUAL_DEFAULT.labor;
  const cmPriceOf = (src) => (src && src.pricing && (src.pricing.marginStd != null || Array.isArray(src.pricing.perTrade))) ? src.pricing : CAZA_MANUAL_DEFAULT.pricing;
  const cmVenOf = (src) => (src && src.vendors && (Array.isArray(src.vendors.preferred) || Array.isArray(src.vendors.brands))) ? src.vendors : CAZA_MANUAL_DEFAULT.vendors;
  const cmManual = () => { const m = profC.cazaManual; const src = (m && (Array.isArray(m.assemblies) || Array.isArray(m.materials))) ? m : CAZA_MANUAL_DEFAULT; const lab = cmLabOf(src); const pr = cmPriceOf(src); const ven = cmVenOf(src); return { assemblies: (src.assemblies || CAZA_MANUAL_DEFAULT.assemblies).map((a) => ({ ...a, includes: [...(a.includes || [])], excludes: [...(a.excludes || [])] })), materials: (src.materials || CAZA_MANUAL_DEFAULT.materials).map((x) => ({ ...x, subs: [...(x.subs || [])] })), labor: { defaultRate: lab.defaultRate, crewRates: (lab.crewRates || []).map((c) => ({ ...c })) }, pricing: { marginStd: pr.marginStd, marginFloor: pr.marginFloor, jobMin: pr.jobMin, perTrade: (pr.perTrade || []).map((o) => ({ ...o })) }, vendors: { preferred: (ven.preferred || []).map((v) => ({ ...v })), brands: (ven.brands || []).map((b) => ({ ...b })) } }; };
  const cmUpdate = (mut) => setProfC((p) => { const cur = (p.cazaManual && (Array.isArray(p.cazaManual.assemblies) || Array.isArray(p.cazaManual.materials))) ? p.cazaManual : CAZA_MANUAL_DEFAULT; const lab = cmLabOf(cur); const pr = cmPriceOf(cur); const ven = cmVenOf(cur); const base = { assemblies: (cur.assemblies || []).map((a) => ({ ...a, includes: [...(a.includes || [])], excludes: [...(a.excludes || [])] })), materials: (cur.materials || []).map((x) => ({ ...x, subs: [...(x.subs || [])] })), labor: { defaultRate: num(lab.defaultRate) || 50, crewRates: (lab.crewRates || []).map((c) => ({ ...c })) }, pricing: { marginStd: num(pr.marginStd) || 30, marginFloor: num(pr.marginFloor) || 0, jobMin: num(pr.jobMin) || 0, perTrade: (pr.perTrade || []).map((o) => ({ ...o })) }, vendors: { preferred: (ven.preferred || []).map((v) => ({ ...v })), brands: (ven.brands || []).map((b) => ({ ...b })) } }; mut(base); return { ...p, cazaManual: base }; });
  const cmAsmSet = (i, field, val) => cmUpdate((m) => { m.assemblies = m.assemblies.map((a, j) => j === i ? { ...a, [field]: val } : a); });
  const cmAsmAdd = () => cmUpdate((m) => { m.assemblies = [...m.assemblies, { id: "cm_a_" + rid(), match: "", includes: [], excludes: [], note: "" }]; });
  const cmAsmDel = (i) => cmUpdate((m) => { m.assemblies = m.assemblies.filter((_, j) => j !== i); });
  const cmMatSet = (i, field, val) => cmUpdate((m) => { m.materials = m.materials.map((x, j) => j === i ? { ...x, [field]: val } : x); });
  const cmMatAdd = () => cmUpdate((m) => { m.materials = [...m.materials, { id: "cm_m_" + rid(), role: "", standard: "", subs: [], note: "" }]; });
  const cmMatDel = (i) => cmUpdate((m) => { m.materials = m.materials.filter((_, j) => j !== i); });
  const cmLabDefault = (val) => cmUpdate((m) => { m.labor.defaultRate = num(val); });
  const cmCrewSet = (i, field, val) => cmUpdate((m) => { m.labor.crewRates = m.labor.crewRates.map((c, j) => j === i ? { ...c, [field]: (field === "rate" ? num(val) : val) } : c); });
  const cmCrewAdd = () => cmUpdate((m) => { m.labor.crewRates = [...m.labor.crewRates, { id: "cm_l_" + rid(), trade: "", rate: num(m.labor.defaultRate) || 50 }]; });
  const cmCrewDel = (i) => cmUpdate((m) => { m.labor.crewRates = m.labor.crewRates.filter((_, j) => j !== i); });
  const cmPriceSet = (field, val) => cmUpdate((m) => { m.pricing[field] = num(val); });
  const cmPtSet = (i, field, val) => cmUpdate((m) => { m.pricing.perTrade = m.pricing.perTrade.map((o, j) => j === i ? { ...o, [field]: (field === "margin" ? num(val) : val) } : o); });
  const cmPtAdd = () => cmUpdate((m) => { m.pricing.perTrade = [...m.pricing.perTrade, { id: "cm_p_" + rid(), trade: "", margin: num(m.pricing.marginStd) || 30 }]; });
  const cmPtDel = (i) => cmUpdate((m) => { m.pricing.perTrade = m.pricing.perTrade.filter((_, j) => j !== i); });
  const cmVenSet = (i, field, val) => cmUpdate((m) => { m.vendors.preferred = m.vendors.preferred.map((v, j) => j === i ? { ...v, [field]: val } : v); });
  const cmVenAdd = () => cmUpdate((m) => { m.vendors.preferred = [...m.vendors.preferred, { id: "cm_v_" + rid(), name: "", note: "" }]; });
  const cmVenDel = (i) => cmUpdate((m) => { m.vendors.preferred = m.vendors.preferred.filter((_, j) => j !== i); });
  const cmBrandSet = (i, field, val) => cmUpdate((m) => { m.vendors.brands = m.vendors.brands.map((b, j) => j === i ? { ...b, [field]: val } : b); });
  const cmBrandAdd = () => cmUpdate((m) => { m.vendors.brands = [...m.vendors.brands, { id: "cm_b_" + rid(), name: "", note: "" }]; });
  const cmBrandDel = (i) => cmUpdate((m) => { m.vendors.brands = m.vendors.brands.filter((_, j) => j !== i); });
  // PROFILE reorg Part 3 — DUAL-WRITE: setting a good/better/best tier line also registers that brand
  // in the Caza Manual's preferred list, so the GENERATION side (tierPrefs) and the PREFLIGHT side
  // (cmManual brands) can never disagree. One entry, both consumers.
  const cmBrandUpsert = (name) => { const nm = String(name || "").trim(); if (!nm) return; cmUpdate((m) => { if (!(m.vendors.brands || []).some((b) => String(b.name || "").toLowerCase() === nm.toLowerCase())) m.vendors.brands = [...m.vendors.brands, { id: "cm_b_" + rid(), name: nm, note: "from your tiers" }]; }); };
  const cmList = (s) => String(s || "").split(";").map((x) => x.trim()).filter(Boolean);
  const cmCsv = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean);
  const estTradeField = (ti, field, val) => setEstResult((r) => r ? { ...r, trades: r.trades.map((tr, k) => { if (k !== ti) return tr; const nt = { ...tr, [field]: val }; if (field === "laborHours") nt.phases = allocatePhases(tr.tradeKey, val, tr.phaseSys || tr.title || ""); return nt; }) } : r);
  // ===== PART 1: on-site PER-PHASE TIMER (transition-based, forgiving) =====
  // Actuals are MAN-HOURS = clock-time × that phase's crew. Each phase carries committed
  // minutes (actualMin); a RUNNING phase also has startAt (ephemeral, never persisted while
  // running → no overnight-phantom from an app close; an in-app overnight timer is what the
  // closeout gate catches). Overlap allowed: each running phase keeps its OWN crew, so summing
  // per-phase man-hours never double-counts the crew.
  const fmtClock = (min) => { const s = Math.max(0, Math.round((Number(min) || 0) * 60)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(ss).padStart(2, "0"); };
  const phaseLiveMin = (ph) => (num(ph.actualMin) || 0) + (ph && ph.running && ph.startAt ? Math.max(0, (Date.now() - ph.startAt) / 60000) : 0);
  const phaseCrew = (ph) => (num(ph.crew) > 0 ? num(ph.crew) : jobCrew);
  const phaseManHours = (ph) => Math.round((phaseLiveMin(ph) / 60) * phaseCrew(ph) * 10) / 10;
  const updPhase = (ti, pi, patch) => setEstResult((r) => r ? { ...r, trades: r.trades.map((tr, k) => k !== ti ? tr : { ...tr, phases: (tr.phases || []).map((ph, j) => j !== pi ? ph : Object.assign({}, ph, typeof patch === "function" ? patch(ph) : patch)) }) } : r);
  const commitPh = (ph) => (ph && ph.running && ph.startAt) ? Object.assign({}, ph, { actualMin: (num(ph.actualMin) || 0) + Math.max(0, (Date.now() - ph.startAt) / 60000), running: false, startAt: null }) : ph;
  const phaseStart = (ti, pi) => updPhase(ti, pi, (ph) => ({ running: true, startAt: Date.now(), crew: phaseCrew(ph) }));
  const phasePause = (ti, pi) => updPhase(ti, pi, (ph) => commitPh(ph));
  const phaseSetCrew = (ti, pi, n) => updPhase(ti, pi, { crew: Math.max(1, Math.round(num(n) || 1)) });
  const phaseAddSub = (ti, pi, name, min) => updPhase(ti, pi, (ph) => ({ subs: [...(ph.subs || []), { name: String(name || "task"), min: Math.max(0, num(min) || 0) }] }));
  const commitAllRunning = () => setEstResult((r) => r ? { ...r, trades: r.trades.map((tr) => ({ ...tr, phases: (tr.phases || []).map(commitPh) })) } : r);
  // closeout: approve / correct a phase (nothing saves to the record until approved)
  const phaseApprove = (ti, pi) => updPhase(ti, pi, (ph) => ({ actualMin: phaseLiveMin(ph), running: false, startAt: null, actualManHours: phaseManHours(ph), approved: true }));
  const phaseCorrectMinutes = (ti, pi, totalMin) => updPhase(ti, pi, (ph) => { const m = Math.max(0, num(totalMin) || 0); return { actualMin: m, running: false, startAt: null, actualManHours: Math.round((m / 60) * phaseCrew(ph) * 10) / 10 }; });
  const openTimer = () => {
    // BACKFILL phases so every estimate gets timer rows — older/reopened estimates built
    // before per-phase bids existed have no .phases, which left the timer empty.
    setEstResult((r) => {
      if (!r || !r.trades) return r;
      return { ...r, trades: r.trades.map((t) => (Array.isArray(t.phases) && t.phases.length) ? t : { ...t, phases: allocatePhases(t.tradeKey, t.laborHours, t.phaseSys || (t.label || "") + " " + (houseScope[t.tradeKey] !== true ? houseScope[t.tradeKey] || "" : "")) }) };
    });
    if (estResult && estResult.trades && estResult.trades[0]) setJobCrew(num(estResult.trades[0].crew) || 3);
    setTimerView("timer");
  };
  const closeTimer = () => { commitAllRunning(); setTimerView(""); };
  useEffect(() => {
    if (timerView !== "timer") return;
    const id = setInterval(() => { if (estResult && estResult.trades.some((t) => (t.phases || []).some((p) => p.running))) setNowTick((x) => x + 1); }, 1000);
    return () => clearInterval(id);
  }, [timerView, estResult]);
  // light voice/keyword control for the timer (hands-free phase switching)
  const timerVoiceCommand = (text) => {
    const s = String(text || "").toLowerCase();
    if (!s.trim() || !estResult) return;
    const crewM = s.match(/(\d+|one|two|three|four|five|six)\s*(?:guy|guys|men|man|people|person)/);
    const w2n = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
    const crewN = crewM ? (w2n[crewM[1]] || num(crewM[1])) : 0;
    if (/\b(pause|lunch|break|hold on|stop for)\b/.test(s) && !/start|begin|moving|switch|resume/.test(s)) { commitAllRunning(); flash("Paused all phases."); return; }
    // find a phase by name match across all trades
    let best = null;
    estResult.trades.forEach((tr, ti) => (tr.phases || []).forEach((ph, pi) => { const toks = ph.name.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2); if (toks.some((w) => s.indexOf(w) >= 0)) best = { ti, pi, name: ph.name }; }));
    if (!best) { flash("Didn't catch the phase — say e.g. “starting dry-in, two guys”."); return; }
    const moving = /\b(moving to|switch to|switching to|now on|on to)\b/.test(s);
    const stopping = /\b(done with|finished|stop|wrap)\b/.test(s) && !/start|begin/.test(s);
    if (stopping) { phasePause(best.ti, best.pi); flash("Stopped " + best.name + "."); return; }
    if (moving) commitAllRunning(); // sequential: moving to a phase stops the others
    phaseStart(best.ti, best.pi);
    if (crewN > 0) phaseSetCrew(best.ti, best.pi, crewN);
    flash((moving ? "Moved to " : "Started ") + best.name + (crewN ? " · " + crewN + " crew" : ""));
  };
  // direct correction in MAN-HOURS (back-solves committed minutes from the phase's crew)
  const phaseCorrectManHours = (ti, pi, mh) => updPhase(ti, pi, (ph) => { const v = Math.max(0, Math.round((num(mh) || 0) * 10) / 10); const c = phaseCrew(ph); return { actualMin: c > 0 ? (v / c) * 60 : v * 60, running: false, startAt: null, actualManHours: v }; });
  // closeout natural-language correction → stage a readback draft (tcorr) → Apply confirms
  const closeoutVoice = (text) => {
    const s = String(text || "").toLowerCase(); if (!s.trim() || !estResult) return;
    let best = null; estResult.trades.forEach((tr, ti) => (tr.phases || []).forEach((ph, pi) => { const toks = ph.name.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2); if (toks.some((w) => s.indexOf(w) >= 0)) best = { ti, pi, ph }; }));
    if (!best) { flash("Which phase? e.g. “set details to four hours”."); return; }
    const cur = best.ph.actualManHours != null ? best.ph.actualManHours : phaseManHours(best.ph);
    const crew = phaseCrew(best.ph); let target = null, m;
    if ((m = s.match(/set (?:it |that |the \w+ )?to (\d+(?:\.\d+)?)/)) || (m = s.match(/(?:it'?s|it was|was|actually|really) (\d+(?:\.\d+)?)\s*hours?/)) || (m = s.match(/(?:finished|stopped|ended|done) .*?(\d+(?:\.\d+)?)\s*hours?/))) target = num(m[1]);
    else if ((m = s.match(/(?:subtract|take off|minus|less) (?:an?|(\d+(?:\.\d+)?))/))) target = Math.max(0, cur - (num(m[1]) || 1) * crew);
    else if ((m = s.match(/(?:add|plus) (?:an?|(\d+(?:\.\d+)?))/))) target = cur + (num(m[1]) || 1) * crew;
    if (target == null) { flash("Say e.g. “set tear-off to eighteen” or “subtract an hour from details”."); return; }
    target = Math.round(target * 10) / 10;
    setTcorr({ [best.ti + "-" + best.pi]: { mh: target, name: best.ph.name } });
    if (voiceMode) speakAL("Setting " + best.ph.name + " to " + target + " man hours — tap apply to confirm.");
  };
  const [timerRec, setTimerRec] = useState(false); // one-shot recorder on the timer/closeout
  const timerRecOnce = async (onText) => {
    if (timerRec) { try { if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") mediaRecRef.current.stop(); } catch (e) {} return; }
    if (!mediaOK) { flash("Mic not available here — use the buttons/fields."); return; }
    primeTTS();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = pickMime();
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaChunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data && e.data.size) mediaChunksRef.current.push(e.data); };
      rec.onstop = async () => { try { (stream.getTracks() || []).forEach((t) => t.stop()); } catch (e) {} setTimerRec(false); const blob = new Blob(mediaChunksRef.current, { type: rec.mimeType || mime || "audio/webm" }); mediaChunksRef.current = []; if (!blob.size) return; const t = await transcribeBlob(blob); if (t) onText(t); else flash("Didn't catch that."); };
      mediaRecRef.current = rec; rec.start(); setTimerRec(true);
    } catch (e) { setTimerRec(false); flash("Mic unavailable."); }
  };
  // ---- saved-estimates library (build-set #3) ----
  const tradeCostOf = (t) => { const matTotal = (t.items || []).reduce((a, b) => a + (num(b.cost) || 0), 0); const matTax = Math.round(matTotal * (num(t.taxRate) || 0)); const labor = Math.round((num(t.laborHours) || 0) * (num(t.laborRate) || 0)); return labor + matTotal + matTax + (num(t.equipment) || 0); };
  const combinedCostOf = (trades) => (trades || []).reduce((a, t) => a + tradeCostOf(t), 0);
  const sellOf = (cost, margin) => Math.round(cost / (1 - (num(margin) || 0) / 100) / 25) * 25;
  // DELIVERY / MOBILIZATION — one job-level cost line (cost-true; gross margin lands on top
  // like every other cost). base + RT_miles x crew x (burdened $/min) + RT_miles x truck $/mi.
  // crew = the most workers on any one trade (who travel); burden = labor-weighted burdened
  // $/hr across all trades (so a single-trade job uses exactly that trade's crew + rate).
  const mobRates = () => ({
    base: (profC.mobBase == null || profC.mobBase === "") ? 350 : (num(profC.mobBase) || 0),
    truck: (profC.mobTruckPerMi == null || profC.mobTruckPerMi === "") ? 0.7 : (num(profC.mobTruckPerMi) || 0),
  });
  const mobilizeCostOf = (trades) => {
    if (!estMobOn) return 0;
    const list = trades || [];
    if (!list.length) return 0;
    const { base, truck } = mobRates();
    const mi = Math.max(0, num(estMiles) || 0);
    const crew = list.reduce((m, t) => Math.max(m, num(t.crew) || 1), 1);
    const totHrs = list.reduce((a, t) => a + (num(t.laborHours) || 0), 0);
    const totLab = list.reduce((a, t) => a + (num(t.laborHours) || 0) * (num(t.laborRate) || 0), 0);
    const burden = totHrs > 0 ? totLab / totHrs : (num(list[0].laborRate) || 0);
    return Math.round(base + mi * crew * (burden / 60) + mi * truck);
  };
  // Full job cost = trades + mobilization. Margin is applied to THIS via sellOf.
  const jobCostOf = (trades) => combinedCostOf(trades) + mobilizeCostOf(trades);
  // ===== PART 2: HOMEOWNER PROPOSAL (presentation only; signing is behind the legal gate) =====
  const tierWarranty = (tier) => { const t = String(tier || "").toLowerCase(); if (t.indexOf("best") >= 0) return "Lifetime workmanship + full manufacturer system warranty — our longest coverage."; if (t.indexOf("good") >= 0) return "Manufacturer standard shingle warranty + our workmanship guarantee."; return "Extended manufacturer system warranty + our workmanship guarantee."; };
  const flatWarranty = (ndl) => (num(ndl) || 0) + "-year No Dollar Limit (NDL) manufacturer system warranty + our workmanship guarantee.";
  // Whole-job good/better/best built from the PRIMARY trade's local options; each tier prices
  // the WHOLE job with that primary material. Homeowner-facing: price + value only, never the buildup.
  const proposalTiers = () => {
    if (!estResult || !estResult.trades || !estResult.trades.length) return [];
    const trades = estResult.trades, primary = trades[0];
    const opts = (primary.primaryOptions || []).filter((o) => num(o.cost) > 0);
    const mob = mobilizeCostOf(trades);
    // Flat commercial: each tier is a FULL assembly (membrane + insulation + attachment + labor) —
    // price the whole job by swapping the primary trade's cost for that tier's assembly cost.
    if (primary.flatTier && opts.length && opts.every((o) => o.assembly)) {
      const otherCost = combinedCostOf(trades.slice(1));
      return opts.slice(0, 3).map((o) => {
        const a = o.assembly, mat = num(a.matCost);
        const tierCost = mat + Math.round(mat * (num(primary.taxRate) || 0)) + Math.round((num(a.laborHours) || 0) * (num(primary.laborRate) || 0)) + (num(primary.equipment) || 0);
        return { tier: o.tier, name: o.name, why: o.why, price: sellOf(otherCost + tierCost + mob, estMargin), warranty: flatWarranty(o.ndl), url: o.url || "" };
      });
    }
    const combined = jobCostOf(trades);
    if (!opts.length) return [{ tier: "Your price", name: primary.title || "Complete project", why: "", price: sellOf(combined, estMargin), warranty: tierWarranty("better"), url: "" }];
    const primaryLine = (primary.items && primary.items[0]) ? num(primary.items[0].cost) : 0;
    return opts.slice(0, 3).map((o) => ({ tier: o.tier, name: o.name, why: o.why, price: sellOf(combined - primaryLine + num(o.cost), estMargin), warranty: tierWarranty(o.tier), url: o.url }));
  };
  const proposalScopeBullets = () => (estResult && estResult.trades ? estResult.trades.map((t) => { const m = (houseScope[t.tradeKey] && houseScope[t.tradeKey] !== true) ? String(houseScope[t.tradeKey]) : ""; return (t.label || t.title) + (m ? " — " + m : ""); }) : []);
  const setProposalColor = (tradeKey, name) => setEstResult((r) => r ? { ...r, colors: Object.assign({}, r.colors, { [tradeKey]: name }) } : r);
  const setProposalTier = (tier) => setEstResult((r) => r ? { ...r, proposalTier: tier } : r);
  const openProposal = () => { persistCurrent(); setPropOpen(true); };
  // Export the on-screen proposal as a PDF via the browser's native print (Save as PDF / Share → Print).
  // No library to inline; the @media print stylesheet isolates the .propsheet and drops app chrome.
  const exportProposalPDF = () => {
    persistCurrent();
    const prev = document.title;
    document.title = "Proposal — " + (estCustomer.trim() || profC.company || "Caza Contractors");
    let done = false;
    const restore = () => { if (done) return; done = true; document.title = prev; window.removeEventListener("afterprint", restore); };
    window.addEventListener("afterprint", restore);
    setTimeout(restore, 3000); // iOS may not fire afterprint
    setTimeout(() => { try { window.print(); } catch (e) { restore(); flash("Use your browser's Share → Print to save the PDF."); } }, 60);
  };
  // Build the full reopenable payload from current state.
  const currentEstPayload = () => ({
    trades: (estResult && estResult.trades) || [], multi: !!(estResult && estResult.multi), errors: (estResult && estResult.errors) || [],
    estMargin: estMargin, estMiles: estMiles, estMobOn: estMobOn, houseScope: houseScope, housePanelW: housePanelW, whDims: whDims, whScopeLines: whScopeLines, whPhotos: whPhotos, houseView: houseView,
    colors: (estResult && estResult.colors) || {}, proposalTier: (estResult && estResult.proposalTier) || "",
    jobNotes: estNotes, jobPhotos: estJobPhotos,
    diag: (estResult && estResult.diag) || null, // diagnostic bundle rides with the estimate (no photos/manual text inside)
  });
  // Persist the in-progress estimate (auto-save + explicit). Creates an id on first save.
  // ===== DIAGNOSTIC BUNDLE — build the per-run "flight recorder" (never blocks the estimate) =====
  // Captures BOTH the raw LLM JSON (item 3) AND the final takeoff with per-line provenance (item 4),
  // plus pipeline/money/timing. Deep-cloned at the end so it's a frozen snapshot independent of later
  // edits. No photo bytes, no manual text, no keys — just the dynamic trail.
  const buildDiagBundle = (sel, ok, t0, prevDiag) => {
    const materialsTotal = ok.reduce((a, t) => a + (t.items || []).reduce((s, it) => s + (num(it.cost) || 0), 0), 0);
    const cost = Math.round(jobCostOf(ok));
    const money = { cost: cost, materialsTotal: Math.round(materialsTotal), margin: estMargin, price: Math.round(sellOf(ok ? jobCostOf(ok) : 0, estMargin)), laborHours: ok.reduce((a, t) => a + (num(t.laborHours) || 0), 0) };
    const inputs = { trades: sel, dims: whDims || "", scopeLines: whScopeLines || {}, margin: estMargin, panelW: housePanelW || {}, photoCount: (whPhotos || []).length, houseView: houseView };
    const inputsHash = hashStr(JSON.stringify(inputs));
    const trades = ok.map((t) => ({
      label: t.label, tradeKey: t.tradeKey, title: t.title, trade: t.trade,
      pipeline: t.__diagPipe || null,
      rawLLM: t.__diagRaw || null, // BEFORE overrides/price/dedup
      final: {                     // AS DISPLAYED, with per-line provenance
        items: (t.items || []).map((it) => ({ name: it.name, qty: it.qty, unit: it.unit, unitPrice: it.unitPrice, cost: it.cost, unpriced: !!it.unpriced, priceTier: it.priceTier || null, priceSrc: it.priceSrc || null, priceNote: it.priceNote || "" })),
        laborHours: t.laborHours, laborRate: t.laborRate, laborSource: t.laborSource, phases: t.phases || [],
        equipment: t.equipment, taxRate: t.taxRate, crew: t.crew, days: t.days, rateFloored: !!t.rateFloored, calibFactor: t.calibFactor,
        cazaDeviations: t.cazaDeviations || [], offManual: !!t.offManual, flatTier: !!t.flatTier, chosenTier: t.chosenTier || null,
        assemblyWalk: t.assemblyWalk || [], walkFlags: t.walkFlags || [],
        primaryOptions: (t.primaryOptions || []).map((o) => ({ tier: o.tier, name: o.name, cost: o.cost, offFamily: !!o.offFamily })),
        // F5: the trade only KEEPS assumptions/questions when off-manual — fall back to the raw LLM's so
        // the final block is self-describing.
        checks: t.checks || [], assumptions: (t.assumptions && t.assumptions.length) ? t.assumptions : ((t.__diagRaw && t.__diagRaw.assumptions) || []), questions: (t.questions && t.questions.length) ? t.questions : ((t.__diagRaw && t.__diagRaw.questions) || []),
      },
    }));
    const bundle = { v: DIAG_VERSION, app: APP_VERSION, ts: new Date().toISOString(), runMs: Date.now() - t0, inputs: inputs, inputsHash: inputsHash, money: money, trades: trades };
    if (prevDiag && prevDiag.money) bundle.deltaVsPrev = { sameInputs: prevDiag.inputsHash === inputsHash, laborHoursFrom: prevDiag.money.laborHours || 0, laborHoursTo: money.laborHours, laborHours: money.laborHours - (prevDiag.money.laborHours || 0), materials: money.materialsTotal - (prevDiag.money.materialsTotal || 0), price: money.price - (prevDiag.money.price || 0) };
    return JSON.parse(JSON.stringify(bundle)); // frozen snapshot
  };
  const diagBundleJSON = () => (estResult && estResult.diag) ? JSON.stringify(estResult.diag, null, 2) : null;
  const exportDiagnostics = async () => {
    const js = diagBundleJSON();
    if (!js) { flash("No diagnostics on this estimate — rebuild to capture one."); return; }
    const fname = "cazbid-diag-" + (estId || "run") + "-" + ((estResult.diag && estResult.diag.inputsHash) || Date.now().toString(36)) + ".json"; // H4: inputsHash so two runs of one job don't collide
    try { const f = new File([js], fname, { type: "application/json" }); if (navigator.share && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: "CazBid diagnostics" }); return; } } catch (e) { /* fall through */ }
    try { await navigator.clipboard.writeText(js); flash("Diagnostics JSON copied to clipboard."); }
    catch (e) { downloadText(js, fname, "application/json"); }
  };
  const copyDiagLink = async () => {
    const js = diagBundleJSON();
    if (!js) { flash("No diagnostics on this estimate — rebuild to capture one."); return; }
    if (js.length > 256 * 1024) { flash("Diagnostics too large to link (over 256 KB)."); return; }
    setDiagBusy(true);
    try {
      const res = await fetch("/.netlify/functions/estimate-debug", { method: "POST", headers: { "Content-Type": "application/json" }, body: js });
      const d = await res.json();
      if (!res.ok || !d.url) throw new Error(d.error || "link failed");
      setDiagLink(d.url);
      try { await navigator.clipboard.writeText(d.url); flash("Diagnostic link copied — anyone with it can read this bundle."); } catch (e) { flash("Link ready — copy it below."); }
    } catch (e) { flash("Couldn't create a link — needs a connection. " + errMsg(e)); }
    setDiagBusy(false);
  };
  const deleteDiagLink = async () => {
    const id = (String(diagLink).split("id=")[1] || "").trim();
    if (!id) { setDiagLink(""); return; }
    try { await fetch("/.netlify/functions/estimate-debug?id=" + encodeURIComponent(id), { method: "DELETE" }); flash("Link deleted — the URL no longer works."); } catch (e) { flash("Couldn't delete — " + errMsg(e)); }
    setDiagLink("");
  };
  // ===== JOB COST TRACKING — state + handlers (store follows the estStore pattern: pGet/pSet, local-first) =====
  // ===== STANDING RULES ("Tell AL") — user-writable knowledge layer on top of the manuals =====
  // Precedence: standing rules > manual > model knowledge (rules are newer than the manual by
  // definition). KNOWLEDGE only (codes, warranty terms, details, supplier notes) — deterministic
  // math/UI stays code (AL declines those and suggests a spec one-liner).
  const [standingRules, setStandingRules] = useState([]); // [{id,text,scope:"global"|tradeKey,createdDate,active}]
  const saveStandingRules = (nextOrFn) => setStandingRules((prev) => { const next = (typeof nextOrFn === "function") ? nextOrFn(prev) : nextOrFn; pSet(STANDING_RULES_KEY, next); return next; });
  const activeRulesChars = (rules) => (rules || []).filter((r) => r.active).reduce((a, r) => a + String(r.text || "").length, 0);
  const activeRuleTexts = (tradeKey) => standingRules.filter((r) => r.active && (r.scope === "global" || r.scope === tradeKey)).map((r) => String(r.text || "") + " (added " + (r.createdDate || "") + ")");
  // ATOMIC add/replace: the budget check runs on the post-replace set BEFORE anything mutates, and
  // a replace is ONE updater (never delete-then-maybe-fail-to-add). Text capped at 400 chars to
  // match the server exactly — nothing silently truncates in flight.
  const srAdd = (text, scope, replaceId) => {
    const t = String(text || "").trim().slice(0, 400); if (!t) return false;
    const base = replaceId ? standingRules.filter((r) => r.id !== replaceId) : standingRules;
    if (activeRulesChars(base) + t.length > RULES_CHAR_BUDGET) { flash("Standing rules are at the size cap — merge or retire stale rules first (Profile → Caza Manual). Nothing was changed."); return false; }
    saveStandingRules((prev) => [{ id: "sr" + rid(), text: t, scope: scope || "global", createdDate: new Date().toISOString().slice(0, 10), active: true }, ...(replaceId ? prev.filter((r) => r.id !== replaceId) : prev)]);
    return true;
  };
  const [costJobs, setCostJobs] = useState([]);          // [{id,name,customerName,address,trade,planned{mats,labor,mh,contract},costs[],hoursLog[],burdenRate,laborFromHours,estimateId,afterTheFact,status,actualPerUnit?}]
  const [cjOpen, setCjOpen] = useState(null);            // open job id (detail view on My Jobs)
  const [cjReceiptBusy, setCjReceiptBusy] = useState(false);
  const [cjDraft, setCjDraft] = useState(null);          // cost entry awaiting confirm (receipt-prefilled or manual)
  const [cjHoursDraft, setCjHoursDraft] = useState(null);// hours entry being typed {jobId,date,guys,hrs,mh}
  const [cjNumDraft, setCjNumDraft] = useState(null);    // raw string for a committed-number field while typing (keeps "05"/"1." intact; commits num() on blur)
  const [cjLinkTarget, setCjLinkTarget] = useState(null);// job id waiting for an after-the-fact estimate
  const cjReceiptRef = useRef(null);                     // hidden receipt file input (always mounted — same-gesture picker)
  const cjAttachedRef = useRef({});                      // estimate ids already attached this session (auto-save fires every 600ms)
  const cjDismissedRef = useRef({});                     // tombstones: estimate ids whose auto-job was deleted (loaded at boot)
  // FUNCTIONAL updates ONLY — the 600ms auto-save timer holds stale closures over costJobs; a plain
  // setCostJobs(next) from that snapshot would silently erase jobs created/edited in the window (and
  // pSet would persist the loss). Updaters always see fresh state; pSet writes exactly what commits.
  const saveCostJobs = (nextOrFn) => setCostJobs((prev) => { const next = (typeof nextOrFn === "function") ? nextOrFn(prev) : nextOrFn; pSet(COSTJOBS_KEY, next); return next; });
  // shallow clone is sufficient: every mut() sets top-level scalars, planned.X, or REASSIGNS costs/
  // hoursLog with fresh arrays (map/filter/concat) — never mutates nested entries in place.
  const cjUpdate = (id, mut) => saveCostJobs((prev) => prev.map((j) => { if (j.id !== id) return j; const c = { ...j, planned: { ...(j.planned || {}) } }; mut(c); c.updatedAt = new Date().toISOString(); return c; }));
  // props for a number input that commits through cjUpdate ON BLUR (typing stays a local raw string —
  // committing num() per keystroke eats leading zeros and persists transient 0s to IndexedDB)
  const cjNumField = (job, field, getV, setV) => ({
    type: "number",
    value: (cjNumDraft && cjNumDraft.jobId === job.id && cjNumDraft.field === field) ? cjNumDraft.raw : (getV() || ""),
    onChange: (e) => setCjNumDraft({ jobId: job.id, field: field, raw: e.target.value }),
    onBlur: () => { if (cjNumDraft && cjNumDraft.jobId === job.id && cjNumDraft.field === field) { const v = num(cjNumDraft.raw); cjUpdate(job.id, (j) => setV(j, v)); setCjNumDraft(null); } },
  });
  const cjNew = () => {
    const name = window.prompt("Job name (e.g. Miller — cedar shake tear-off)");
    if (!name || !name.trim()) return;
    const now = new Date().toISOString();
    const j = { id: "cj" + Date.now().toString(36) + rid().slice(0, 3), createdAt: now, updatedAt: now, name: name.trim(), customerName: "", address: "", trade: "", planned: { mats: 0, labor: 0, mh: 0, contract: 0 }, costs: [], hoursLog: [], burdenRate: 0, laborFromHours: false, estimateId: null, afterTheFact: false, status: "active" };
    saveCostJobs((prev) => [j, ...prev]); setCjOpen(j.id);
  };
  const cjDelete = (id) => {
    if (!window.confirm("Delete this job and all its cost entries?")) return;
    const job = costJobs.find((j) => j.id === id);
    if (job && job.estimateId) { cjDismissedRef.current[job.estimateId] = true; pSet(CJ_DISMISSED_KEY, cjDismissedRef.current); } // tombstone — the estimate's next auto-save must not resurrect it
    if (cjLinkTarget === id) setCjLinkTarget(null);
    saveCostJobs((prev) => prev.filter((j) => j.id !== id));
    if (cjOpen === id) setCjOpen(null);
  };
  // RECEIPT photo -> the EXISTING /.netlify/functions/estimate endpoint (image blocks it already accepts;
  // trade:"" so no manual loads). Compressed to 1200px; the small copy stores with the entry.
  const CJ_RECEIPT_PROMPT = 'Read this receipt. Return ONLY raw JSON: {"vendor":"...","date":"YYYY-MM-DD","total":number,"tax":number or 0,"category":one of ["Materials","Labor","Subcontractor","Equipment/Rental","Disposal","Fuel/Travel","Permits/Fees","Other"],"note":"short description of what was bought (e.g. 32 sq Timberline HDZ + accessories)","confidence":"high"|"low"}. A lumberyard/supplier receipt is Materials. A dumpster/transfer-station ticket is Disposal. If unreadable, set confidence "low" and best-guess.';
  const onReceiptFile = async (jobId, file) => {
    if (!file || !jobId) return;
    setCjReceiptBusy(true);
    try {
      const dataUrl = await imageToJpeg(file, 1200, 0.7);
      const text = await callClaude([{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: dataUrl.split(",")[1] } }, { type: "text", text: CJ_RECEIPT_PROMPT }] }], { maxTokens: 400, trade: "" });
      const d = parseJSON(text) || {};
      const thumb = await dataUrlResize(dataUrl, 480, 0.5).catch(() => dataUrl); // store a small copy — the 1200px went to the OCR call only
      setCjDraft({ jobId: jobId, vendor: String(d.vendor || ""), date: (typeof d.date === "string" && /^\d{4}-\d{2}-\d{2}/.test(d.date)) ? d.date.slice(0, 10) : new Date().toISOString().slice(0, 10), amount: num(d.total) || 0, category: CJ_CATS.indexOf(d.category) >= 0 ? d.category : "Materials", note: String(d.note || ""), source: "receipt", confidence: d.confidence === "low" ? "low" : "high", photo: thumb });
    } catch (e) { flash("Couldn't read the receipt — " + errMsg(e) + ". Add it manually instead."); }
    setCjReceiptBusy(false);
  };
  const cjOpenReceipt = (jobId) => { setCjDraft(null); if (cjReceiptRef.current) { cjReceiptRef.current.dataset.job = jobId; cjReceiptRef.current.click(); } };
  const cjManualEntry = (jobId) => setCjDraft({ jobId: jobId, vendor: "", date: new Date().toISOString().slice(0, 10), amount: 0, category: "Materials", note: "", source: "manual", confidence: "high", photo: null });
  const cjSaveDraft = () => {
    const d = cjDraft; if (!d || !(num(d.amount) > 0)) { flash("Enter the amount."); return; }
    const entry = { id: d.editId || ("cjc" + rid()), date: d.date, vendor: d.vendor, amount: Math.round(num(d.amount) * 100) / 100, category: d.category, note: d.note, source: d.source, photo: d.photo || null };
    cjUpdate(d.jobId, (j) => { j.costs = d.editId ? (j.costs || []).map((c) => (c.id === d.editId ? entry : c)) : [entry].concat(j.costs || []); });
    setCjDraft(null); flash("Cost saved.");
  };
  const cjDelCost = (jobId, cid) => cjUpdate(jobId, (j) => { j.costs = (j.costs || []).filter((c) => c.id !== cid); });
  // FROM PRICE BOOK — third intake: pick a material from the merged book (the same enginePB-first
  // list estimates use), qty × unit price. Price override applies to THIS entry only — never the book.
  const [cjPbPick, setCjPbPick] = useState(null);        // {jobId, q} list stage; + {item, qty, price} once picked
  const [cjEstPick, setCjEstPick] = useState(null);      // {jobId, checked:{}} — copy estimate lines as costs (explicit checkboxes only)
  // CHANGE ORDERS — mid-job scope changes; only APPROVED ones touch the math (drafts are parked).
  const [cjCoDraft, setCjCoDraft] = useState(null);      // CO being added/edited {jobId, id?, title, description, price, expMaterials, expLabor, expManHours, photo, status,...}
  const cjCoPhotoRef = useRef(null);                     // hidden input — condition photo / signed slip
  const cjSaveCo = () => {
    const d = cjCoDraft; if (!d) return;
    if (!String(d.title || "").trim()) { flash("Give the change order a title."); return; }
    if (!(num(d.price) > 0)) { flash("Enter the price charged for this change."); return; }
    const entry = { id: d.id || ("cjo" + rid()), date: d.date || new Date().toISOString().slice(0, 10), title: String(d.title).trim(), description: String(d.description || ""), price: Math.round(num(d.price) * 100) / 100, expMaterials: num(d.expMaterials) || 0, expLabor: num(d.expLabor) || 0, expManHours: num(d.expManHours) || 0, status: d.status || "draft", approvedDate: d.approvedDate || null, approvedNote: d.approvedNote || "", photo: d.photo || null };
    cjUpdate(d.jobId, (j) => { j.changeOrders = d.id ? (j.changeOrders || []).map((c) => (c.id === d.id ? entry : c)) : [entry].concat(j.changeOrders || []); });
    setCjCoDraft(null); flash("Change order saved" + (entry.status === "draft" ? " (draft — approve it to affect the numbers)." : "."));
  };
  const cjDelCo = (jobId, coid) => cjUpdate(jobId, (j) => { j.changeOrders = (j.changeOrders || []).filter((c) => c.id !== coid); });
  const cjApproveCo = (jobId, coid) => {
    const note = window.prompt("Approval note (optional) — e.g. “texted OK 7/18”", "");
    if (note === null) return; // cancelled — stay draft
    cjUpdate(jobId, (j) => { j.changeOrders = (j.changeOrders || []).map((c) => (c.id === coid ? { ...c, status: "approved", approvedDate: new Date().toISOString().slice(0, 10), approvedNote: String(note).trim() } : c)); });
  };
  const onCoPhotoFile = async (file) => {
    if (!file || !cjCoDraft) return;
    try { const dataUrl = await imageToJpeg(file, 800, 0.6); setCjCoDraft((d) => (d ? { ...d, photo: dataUrl } : d)); } // 800px — a signed slip must stay legible
    catch (e) { flash("Couldn't load the photo — " + errMsg(e)); }
  };
  const cjSavePbEntry = () => {
    const p = cjPbPick; if (!p || !p.item) return;
    const qty = num(p.qty), price = num(p.price);
    if (!(qty > 0) || !(price > 0)) { flash("Enter the quantity" + (price > 0 ? "." : " and unit price.")); return; }
    const amount = Math.round(qty * price * 100) / 100;
    cjUpdate(p.jobId, (j) => { j.costs = [{ id: "cjc" + rid(), date: new Date().toISOString().slice(0, 10), vendor: "", amount: amount, category: "Materials", note: qty + " " + (p.item.unit || "x") + " × " + p.item.name + " @ $" + price + (p.item.unit ? "/" + p.item.unit : ""), source: "pricebook", photo: null }].concat(j.costs || []); });
    flash("Cost saved — " + $0(amount) + ".");
    setCjPbPick({ jobId: p.jobId, q: p.q || "" }); // back to the list: several items in one session = one entry per item
  };
  const cjSaveEstPick = (job, rec) => {
    const picked = [];
    ((rec && rec.payload && rec.payload.trades) || []).forEach((t, ti) => (t.items || []).forEach((it, ii) => { if (cjEstPick && cjEstPick.checked[ti + ":" + ii] && num(it.cost) > 0) picked.push(it); }));
    if (!picked.length) { flash("Check at least one line."); return; }
    const today = new Date().toISOString().slice(0, 10);
    cjUpdate(job.id, (j) => { j.costs = picked.map((it) => ({ id: "cjc" + rid(), date: today, vendor: "", amount: Math.round(num(it.cost)), category: "Materials", note: (num(it.qty) || "") + " " + (it.unit || "") + " × " + it.name + " (from estimate — adjust to actual)", source: "estimate", photo: null })).concat(j.costs || []); });
    setCjEstPick(null); flash(picked.length + " line" + (picked.length === 1 ? "" : "s") + " copied — adjust them to actuals.");
  };
  const cjSaveHours = () => {
    const h = cjHoursDraft; if (!h) return;
    const mh = num(h.mh) > 0 ? num(h.mh) : (num(h.guys) || 0) * (num(h.hrs) || 0);
    if (!(mh > 0)) { flash("Enter guys × hours (or total MH)."); return; }
    cjUpdate(h.jobId, (j) => { j.hoursLog = [{ id: "cjh" + rid(), date: h.date, guys: num(h.guys) || 0, hrs: num(h.hrs) || 0, mh: Math.round(mh * 10) / 10 }].concat(j.hoursLog || []); });
    setCjHoursDraft(null);
  };
  const cjDelHours = (jobId, hid) => cjUpdate(jobId, (j) => { j.hoursLog = (j.hoursLog || []).filter((x) => x.id !== hid); });
  // AFTER-THE-FACT estimate: normal estimate flow, result attaches to THIS job flagged afterTheFact —
  // "what would CazBid have bid?" vs actuals measures the ENGINE's accuracy (the calibration data).
  const cjEstimateJob = async (job) => {
    await startNewEstimate();
    setEstCustomer(job.customerName || job.name || ""); setEstAddress(job.address || "");
    setCjLinkTarget(job.id); goTab("estimator");
    flash("Build the estimate — it attaches to “" + (job.name || "this job") + "” when it saves.");
  };
  // CREW APP LINK — register this job with the /crew endpoint (same site's new additive function)
  // so it appears in the CazBid Crew app under a crew code. job.id doubles as the crew-side id, so
  // everything the crew logs keys straight back to this job (the Crew Activity panel reads log:<id>).
  const cjCrewLink = async (job) => {
    const rec0 = job.estimateId ? estimates.find((e) => e.id === job.estimateId) : null;
    const ev = rec0 ? cjEstVals(rec0) : null;
    const suggested = job.crewPin || ((String(job.name || "JOB").replace(/[^a-zA-Z0-9]/g, "").slice(0, 6) || "JOB") + Math.floor(10 + Math.random() * 90)).toUpperCase();
    const pin = window.prompt("Crew code for this job — the crew joins with this (4+ characters):", suggested);
    if (pin == null) return;
    const p = String(pin).trim();
    if (p.length < 4) { flash("Crew code needs 4+ characters."); return; }
    try {
      const r = await fetch("/.netlify/functions/crew", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ op: "setup", currentPin: job.crewPin || undefined, job: { id: job.id, name: job.name, trade: job.trade || "", pin: p, estCost: ev ? ev.total : ((num(job.planned.mats) || 0) + (num(job.planned.labor) || 0)), estHours: ev ? ev.mh : (num(job.planned.mh) || 0) } }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "link failed");
      cjUpdate(job.id, (j) => { j.crewPin = p; });
      flash("Linked — crew joins with code “" + p + "” at cazbid-crew.netlify.app.");
    } catch (e) { flash("Couldn't link — " + errMsg(e) + (String(e && e.message || "").indexOf("404") >= 0 ? " (crew endpoint not deployed yet?)" : "")); }
  };
  // CREW ACTIVITY — read what the crew logged (GET ?op=log) and pull it into job costing.
  // "Synced" on the crew phone means it's IN the store; this panel is where it shows up.
  const [cjCrewLog, setCjCrewLog] = useState(null); // {jobId, entries, err, busy}
  const fetchCrewLog = async (job) => {
    if (!job || !job.crewPin) return;
    setCjCrewLog({ jobId: job.id, entries: [], busy: true });
    try {
      const r = await fetch("/.netlify/functions/crew?op=log&job=" + encodeURIComponent(job.id) + "&pin=" + encodeURIComponent(job.crewPin));
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "load failed");
      setCjCrewLog({ jobId: job.id, entries: Array.isArray(d.entries) ? d.entries : [], busy: false });
    } catch (e) { setCjCrewLog({ jobId: job.id, entries: [], err: errMsg(e), busy: false }); }
  };
  useEffect(() => { const j = costJobs.find((x) => x.id === cjOpen); if (j && j.crewPin) fetchCrewLog(j); else setCjCrewLog(null); }, [cjOpen]); // eslint-disable-line
  // Pull NEW crew entries into the job's actuals — dedup by crew entry id (j.crewImported), so
  // repeat pulls are safe. Costs -> costs[]; timers/hours -> hoursLog (task+qty kept for the
  // rate-book view); COs -> DRAFT change orders (Dustin approves via the existing CO flow).
  const cjPullCrew = (job) => {
    const log = (cjCrewLog && cjCrewLog.jobId === job.id) ? cjCrewLog.entries : [];
    const done = (job.crewImported || {});
    const fresh = log.filter((e) => e && e.id && !done[e.id]);
    if (!fresh.length) { flash("Nothing new from the crew."); return; }
    cjUpdate(job.id, (j) => {
      const imp = Object.assign({}, j.crewImported || {});
      const costs = (j.costs || []).slice(); const hoursL = (j.hoursLog || []).slice(); const cos = (j.changeOrders || []).slice();
      fresh.forEach((e) => {
        imp[e.id] = true;
        const day = String(e.date || e.at || "").slice(0, 10);
        if (e.kind === "cost") costs.unshift({ id: "cw-" + e.id, date: day, vendor: String(e.supplier || ""), amount: Math.round(num(e.amount) * 100) / 100, category: CJ_CATS.indexOf(e.category) >= 0 ? e.category : "Other", note: String(e.note || ""), crew: e.crewName || "crew", source: "crew", photo: null });
        else if (e.kind === "timer") hoursL.unshift({ id: "cw-" + e.id, date: day, guys: num(e.crewCount) || 1, hrs: num(e.hours) || 0, mh: num(e.manHours) || 0, task: String(e.task || ""), qty: num(e.qty) || 0, unit: String(e.unit || ""), crew: e.crewName || "crew", note: (e.task || "task") + (num(e.qty) > 0 ? " — " + e.qty + " " + e.unit : "") });
        else if (e.kind === "hours") hoursL.unshift({ id: "cw-" + e.id, date: day, guys: num(e.guys) || 1, hrs: num(e.hoursEach) || 0, mh: num(e.manHours) || 0, crew: e.crewName || "crew", note: String(e.note || "") });
        else if (e.kind === "co") cos.unshift({ id: "cw-" + e.id, date: day, title: String(e.description || "Crew change order").slice(0, 60), description: String(e.description || "") + " — submitted by " + (e.crewName || "crew"), price: num(e.estCost) || 0, expMaterials: 0, expLabor: 0, expManHours: 0, status: "draft", approvedDate: null, approvedNote: "", photo: null });
      });
      j.crewImported = imp; j.costs = costs; j.hoursLog = hoursL; j.changeOrders = cos;
    });
    flash(fresh.length + " crew entr" + (fresh.length === 1 ? "y" : "ies") + " pulled into job costing" + (fresh.some((e) => e.kind === "co") ? " — crew change orders land as DRAFTS for your review." : "."));
  };
  // CLOSE + CALIBRATE: actual MH per primary unit vs the rate book, and one tap feeds the EXISTING
  // logActuals loop (dampened blending) — this is how non-roofing rates finally get validated.
  const cjCloseJob = (job) => {
    const act = cjTotals(job);
    const rec = job.estimateId ? estimates.find((e) => e.id === job.estimateId) : null;
    const est = rec ? cjEstVals(rec) : null;
    let perUnit = null;
    if (rec && rec.payload && Array.isArray(rec.payload.trades) && rec.payload.trades[0]) {
      // PRIMARY trade only (whole-job MH / another trade's sq would corrupt the rate); sq ≠ sqft
      let sq = 0; (rec.payload.trades[0].items || []).forEach((it) => { const u = String(it.unit || "").toLowerCase(); const isSF = /sq\s*ft|sqft|\bsf\b/.test(u); if (!isSF && (u === "sq" || /\bsq\b|square/.test(u))) sq = Math.max(sq, num(it.qty) || 0); });
      if (sq > 0 && act.mh > 0) perUnit = { unit: "sq", qty: sq, mhPerUnit: Math.round((act.mh / sq) * 10) / 10, bidPerUnit: (est && est.mh > 0) ? Math.round((est.mh / sq) * 10) / 10 : null };
    }
    cjUpdate(job.id, (j) => { j.status = "closed"; j.closedAt = new Date().toISOString(); if (perUnit) j.actualPerUnit = perUnit; });
    flash("Job closed." + (perUnit ? " Ran " + perUnit.mhPerUnit + " MH/" + perUnit.unit + (perUnit.bidPerUnit ? " vs " + perUnit.bidPerUnit + " bid" : "") + "." : ""));
  };
  const persistCurrent = async (extra) => {
    if (!estResult || !(estResult.trades && estResult.trades.length)) return null;
    clearTimeout(estSaveTimer.current); // a manual save supersedes any pending auto-save (same closure would double-fire)
    const id = estIdRef.current || estId || ("est" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5));
    estIdRef.current = id;
    const price = sellOf(jobCostOf(estResult.trades), estMargin);
    const title = (estResult.trades.length === 1 ? estResult.trades[0].title : estResult.trades.length + " trades");
    const rec = Object.assign({
      id: id, customerName: estCustomer.trim(), jobAddress: estAddress.trim(), customerEmail: estEmail.trim(), status: estStatus,
      jobNimbusId: null, price: price, title: title, tradeCount: estResult.trades.length, payload: currentEstPayload(),
    }, extra || {});
    if (!estId) setEstId(id);
    const { all } = await estStore.save(rec);
    setEstimates(all);
    // JOB COSTING — every saved estimate attaches to a cost job (created if none). Idempotent by
    // estimateId + a session ref (auto-save fires every 600ms). An "Estimate this job" link target
    // attaches to THAT job flagged afterTheFact instead of creating a new one.
    try {
      if (!cjAttachedRef.current[id] && !cjDismissedRef.current[id] && !costJobs.some((j) => j.estimateId === id)) {
        cjAttachedRef.current[id] = true;
        const target = cjLinkTarget ? costJobs.find((j) => j.id === cjLinkTarget && !j.estimateId) : null;
        if (target) {
          cjUpdate(target.id, (j) => { j.estimateId = id; j.afterTheFact = true; if (!j.customerName) j.customerName = estCustomer.trim(); if (!j.address) j.address = estAddress.trim(); });
          setCjLinkTarget(null); flash("Estimate attached to “" + target.name + "”.");
        } else {
          const now = new Date().toISOString();
          const newJob = { id: "cj" + Date.now().toString(36) + rid().slice(0, 3), createdAt: now, updatedAt: now, name: (estCustomer.trim() || title), customerName: estCustomer.trim(), address: estAddress.trim(), trade: (estResult.trades[0] && estResult.trades[0].tradeKey) || "", planned: { mats: 0, labor: 0, mh: 0, contract: 0 }, costs: [], hoursLog: [], burdenRate: 0, laborFromHours: false, estimateId: id, afterTheFact: false, status: "active" };
          // dedupe INSIDE the updater — the outer .some() reads a possibly-stale snapshot
          saveCostJobs((prev) => prev.some((j) => j.estimateId === id) ? prev : [newJob, ...prev]);
        }
      }
    } catch (e) { /* job-cost attach never blocks an estimate save */ }
    return id;
  };
  // Reopen a saved estimate into the editor (result view).
  const openSavedEstimate = (rec) => {
    if (!rec || !rec.payload) return;
    const p = rec.payload;
    setEstId(rec.id); estIdRef.current = rec.id; setCjLinkTarget(null); setEstCustomer(rec.customerName || ""); setEstAddress(rec.jobAddress || ""); setEstEmail(rec.customerEmail || ""); setEstStatus(rec.status || "draft");
    setEstMargin(num(p.estMargin) || 30); setEstMiles(num(p.estMiles) || 0); setEstMobOn(p.estMobOn === true); setHouseScope(p.houseScope || {}); setHousePanelW(p.housePanelW || {});
    setWhDims(p.whDims || ""); setWhScopeLines(p.whScopeLines || {}); setWhPhotos(Array.isArray(p.whPhotos) ? p.whPhotos : []); setHouseView(p.houseView || "exterior");
    setEstNotes(p.jobNotes || ""); setEstJobPhotos(Array.isArray(p.jobPhotos) ? p.jobPhotos : []);
    setActiveTrade(null); setSelStep("ready"); setSavedOpen(false); setDiagLink("");
    setEstResult({ trades: p.trades || [], multi: !!p.multi, errors: p.errors || [], colors: p.colors || {}, proposalTier: p.proposalTier || "", diag: p.diag || null });
  };
  const deleteSavedEstimate = async (id) => {
    const all = await estStore.remove(id); setEstimates(all);
    if (estId === id) { setEstId(null); estIdRef.current = null; }
    // heal any cost job pointing at the deleted estimate: back to "no estimate" so re-linking works
    saveCostJobs((prev) => prev.some((j) => j.estimateId === id) ? prev.map((j) => j.estimateId === id ? { ...j, estimateId: null, afterTheFact: false, updatedAt: new Date().toISOString() } : j) : prev);
    delete cjAttachedRef.current[id];
    flash("Estimate deleted.");
  };
  const renameSavedEstimate = async (rec) => {
    const name = window.prompt("Customer name", rec.customerName || "");
    if (name == null) return;
    const addr = window.prompt("Job address", rec.jobAddress || "");
    const { all } = await estStore.save({ id: rec.id, customerName: String(name).trim(), jobAddress: String(addr == null ? rec.jobAddress || "" : addr).trim() });
    setEstimates(all);
    if (estId === rec.id) { setEstCustomer(String(name).trim()); if (addr != null) setEstAddress(String(addr).trim()); }
  };
  // "Start new": SAVE the current one first (never destroy work), then clear to a fresh scope.
  const startNewEstimate = async () => {
    await persistCurrent();
    setEstResult(null); setEstId(null); estIdRef.current = null; setCjLinkTarget(null); setEstCustomer(""); setEstAddress(""); setEstEmail(""); setEstStatus("draft");
    setEstMiles(0); setEstMobOn(true); setEstNotes(""); setEstJobPhotos([]);
    setHouseScope({}); setHousePanelW({}); setWhDims(""); setWhScopeLines({}); setWhPhotos([]); setActiveTrade(null); setSelStep("category"); setAlThread([]);
    flash("Saved. Starting a fresh estimate.");
  };
  const addDimRow = (label, unit) => setEstDimRows((d) => [...d, { id: rid(), label: label || "", value: "", unit: unit || "" }]);
  const upDimRow = (id, patch) => setEstDimRows((d) => d.map((x) => x.id === id ? { ...x, ...patch } : x));
  const rmDimRow = (id) => setEstDimRows((d) => d.filter((x) => x.id !== id));
  const dimsText = () => estDimRows.filter((d) => d.label && d.value !== "").map((d) => d.label + ": " + d.value + (d.unit ? " " + d.unit : "")).join(", ");
  const fetchCustomDims = async (workType) => {
    const wt = (workType || estScope || "").toString().trim();
    if (!wt || estBusy) return;
    setEstBusy("dims");
    try {
      const prompt = "A contractor is estimating this scope of work: \"" + wt + "\". List the key physical dimensions/quantities needed to price it. Respond ONLY with JSON, no prose: {\"dims\":[{\"label\":\"short name\",\"unit\":\"sqft|LF|ct|ft|ea|etc\"}]}. Give 3 to 7 of the most relevant measurable inputs a contractor would actually take off. Keep labels short.";
      const text = await callClaude([{ role: "user", content: prompt }]);
      const d = parseJSON(text);
      const dims = Array.isArray(d.dims) ? d.dims : [];
      if (!dims.length) { flash("Couldn't generate dimensions — add them manually below."); }
      else {
        setEstDimRows(dims.slice(0, 8).map((x) => ({ id: rid(), label: String(x.label || "").slice(0, 40), value: "", unit: String(x.unit || "").slice(0, 8) })));
      }
    } catch (e) { flash("Dimension lookup failed — add them manually below."); }
    setEstBusy("");
  };
  const savePriceBook = (next) => { setPriceBook(next); pSet(PRICEBOOK_KEY, next); };
  const saveRateBook = (next) => { setRateBook(next); pSet(RATEBOOK_KEY, next); };
  // RATE ENTRY direction toggle + draft buffer: canonical stored value stays MH/unit; "units/hr"
  // entries convert (1/value, 3 decimals) on blur. Entry aid only — engine/CSV unchanged.
  const [rtDraft, setRtDraft] = useState(null); // {id, raw, dir: "mh"|"upmh"} for the row being edited
  const [rtAuditOpen, setRtAuditOpen] = useState(false);
  const rtCommit = (r) => {
    const d = rtDraft; if (!d || d.id !== r.id) return;
    const v = num(d.raw);
    if (!(v > 0)) { if (String(d.raw).trim() !== "") flash("Rate must be greater than 0 — nothing saved."); setRtDraft(null); return; }
    const canonical = Math.round((d.dir === "upmh" ? 1 / v : v) * 1000) / 1000;
    saveRateBook(rateBook.map((x) => (x.id === r.id ? { ...x, rate: canonical } : x)));
    setRtDraft(null); // field re-displays canonical in hrs/unit mode
  };
  const rtAck = (id) => saveRateBook(rateBook.map((x) => (x.id === id ? { ...x, sanityAck: true } : x)));
  const rtUseRecip = (r) => saveRateBook(rateBook.map((x) => (x.id === r.id ? { ...x, rate: rateRecip(r.rate), sanityAck: false } : x)));
  // near-duplicate pairs (same unit, >=2 shared significant task tokens) — surfaced, never auto-deleted
  const rtDupPairs = () => {
    const toks = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((t) => t.length > 3 && ["layer", "install", "steep"].indexOf(t) < 0);
    const out = [];
    for (let i = 0; i < rateBook.length; i++) for (let j = i + 1; j < rateBook.length; j++) {
      const a = rateBook[i], b = rateBook[j];
      if (String(a.unit).toLowerCase() !== String(b.unit).toLowerCase()) continue;
      const bt = new Set(toks(b.task));
      if (toks(a.task).filter((t) => bt.has(t)).length >= 2) out.push([a, b]);
    }
    return out.slice(0, 8);
  };
  // contractor material-cost CSV: columns like name,unit,cost (header row auto-detected)
  const handleMatCsv = async (file) => {
    if (!file) return;
    setMatCostBusy(true);
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (!lines.length) throw new Error("empty file");
      const splitRow = (l) => l.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      let start = 0;
      const head = splitRow(lines[0]).map((h) => h.toLowerCase());
      const looksHeader = head.some((h) => /name|material|item|desc/.test(h)) || head.some((h) => /cost|price/.test(h));
      let ni = 0, ui = 1, ci = 2;
      if (looksHeader) {
        start = 1;
        const fi = (re) => head.findIndex((h) => re.test(h));
        const nn = fi(/name|material|item|desc/); if (nn >= 0) ni = nn;
        const uu = fi(/unit|uom|each|per/); if (uu >= 0) ui = uu;
        const cc2 = fi(/cost|price|rate|\$/); if (cc2 >= 0) ci = cc2;
      }
      const rows = [];
      for (let i = start; i < lines.length; i++) {
        const cols = splitRow(lines[i]);
        const name = (cols[ni] || "").trim();
        const cost = num((cols[ci] || "").replace(/[^0-9.\-]/g, ""));
        if (!name || !cost) continue;
        rows.push({ name, unit: (cols[ui] || "").trim(), cost });
      }
      if (!rows.length) throw new Error("no usable rows — need a name and a cost column");
      const next = rows.slice(0, 500);
      setMatCosts(next);
      pSet(MATCOST_KEY, next);
      flash("Loaded " + next.length + " material prices — your estimates will use these.");
    } catch (e) { flash("Couldn't read that CSV: " + errMsg(e) + ". Use columns: name, unit, cost."); }
    setMatCostBusy(false);
  };
  const clearMatCosts = () => { setMatCosts([]); pSet(MATCOST_KEY, []); flash("Material price list cleared."); };

  // ---- homeowner conversational estimate engine ----
  const CONV_SYS = (region, name, homeAddr) =>
    "You are AL, a warm, friendly local contractor's estimator for CazBid, chatting with a homeowner near " + region + " to price their project. You go by AL. ALWAYS write your name in all caps as \"AL\" (never \"Al\"), so people don't misread it as \"AI\". " +
    (name ? "The homeowner's first name is " + name + ". Greet them by name at the start, and use their first name naturally about three times total across the whole conversation (a warm hello, somewhere in the middle, and in your final wrap-up) — never more, and never force it where it sounds robotic. " : "") +
    "Talk like a knowledgeable friend texting them — relaxed, encouraging, plain English, NEVER clinical or robotic. " +
    "Be genuinely FUNNY in a dry, warm, job-site way — the kind of contractor who cracks a quick joke while measuring. Light teasing, self-deprecating quips, a little weather or roofing humor now and then. Keep it natural and SPARING: a clever line here and there, never forced, never a stand-up routine, and NEVER at the homeowner expense or about their budget. If the project is serious (storm damage, an active leak wrecking their living room), read the room and dial the jokes way back — warmth first. The humor should make them smile, never slow the estimate or undercut your credibility. " +
    "Affirm what they tell you (\"Got it — a 20-square asphalt roof, nice\"), reassure them when they're unsure (\"No worries, a rough guess is totally fine\"), and keep a little momentum (\"One more thing and I'll have a tight number for you\"). " +
    "Ask ONE question at a time — the single most useful next question to firm up the price. Keep questions short and answerable in a few words. Do not dump a list. " +
    "EARLY ON, confirm WHERE the work is: ask if it's at their home" + (homeAddr ? " (" + homeAddr + ")" : "") + " or a different property; if different, ask for that address. You need the work location to size the structure. " +
    "If the job size depends on the structure (roof, siding, square footage) and the homeowner does not know the measurements, USE THE WORK ADDRESS to make a reasonable BALLPARK of the structure size — search for or infer typical square footage for that property/home type/area, price from that, and clearly note in your message that it's an estimate from the address until they get exact measurements. A close ballpark beats asking them for numbers they don't have. " +
    "As you learn more, you build a BOTTOM-UP cost estimate (man-hours x burdened local labor + materials + material tax + equipment) and a price range using 28-35% gross margin. When info is thin, keep the range wide and your confidence low; as facts accumulate, tighten it. " +
    "When you have enough to price it solidly (usually after 3-6 exchanges), set done=true, stop asking, and give a friendly wrap-up. " +
    "Use web search when you genuinely need current local material or labor numbers. " +
    "EVERY reply MUST be ONLY raw JSON, no markdown: {\"message\": your friendly chat reply (1-3 sentences, may include the next question), \"options\": [if your message asks the homeowner to choose between specific answers, list 2-4 short tappable choices here, e.g. [\"Architectural shingles\",\"Basic 3-tab\"]; otherwise []], \"facts\": [array of ALL confirmed details so far as short strings], \"priceLow\": number, \"priceHigh\": number, \"days\": number, \"confidence\": \"low\"|\"medium\"|\"high\", \"primaryOptions\": [up to 3 {\"tier\":\"Good\"|\"Better\"|\"Best\", \"name\":product, \"why\":one line, \"url\":real link} ONLY once you know the material type, else []], \"done\": boolean}";

  const convHistoryText = (msgs) => msgs.map((m) => (m.role === "ai" ? "ESTIMATOR" : "HOMEOWNER") + ": " + m.text).join("\n");

  const convCall = async (msgs, withPhotos) => {
    const region = (profH.town || "upstate New York").trim();
    const firstName = ((profH.name || "").trim().split(/\s+/)[0] || "");
    const userText = CONV_SYS(region, firstName, (profH.address || "").trim()) + "\n\nCONVERSATION SO FAR:\n" + convHistoryText(msgs) +
      "\n\nReply now as the estimator. Output ONLY the raw JSON object described above — start your reply with { and end with } and put NOTHING else before or after it. Keep it warm and friendly, one question at a time.";
    const content = [];
    if (withPhotos && convPhotos.length) {
      for (const ph of convPhotos.slice(0, 3)) {
        const mt = ph.startsWith("data:") ? (ph.substring(5, ph.indexOf(";")) || "image/jpeg") : "image/jpeg";
        content.push({ type: "image", source: { type: "base64", media_type: mt, data: ph.split(",")[1] } });
      }
    }
    content.push({ type: "text", text: userText });
    // search only when there's enough context to actually price (later turns); early turns skip search for speed + reliable JSON
    const useSearch = msgs.length >= 4;
    const text = await callClaudeBackground([{ role: "user", content }], { search: useSearch, maxTokens: 1800 });
    // forgiving parse: try strict JSON, else salvage a friendly message so the chat never dead-ends
    try {
      return parseJSON(text);
    } catch (e) {
      const raw = (text || "").replace(/```json|```/g, "").trim();
      // 1) try to pull a "message" field out of partial/broken JSON
      const mm = raw.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (mm && mm[1]) {
        const msg = mm[1].replace(/\\"/g, '"').replace(/\\n/g, " ").trim();
        // also try to salvage facts/options if present, but a message alone is enough
        return { message: msg.slice(0, 400), facts: [], done: false };
      }
      // 2) if it's plain prose (no/!broken JSON), show it as the reply
      const stripped = raw.replace(/^[\[{]/, "").replace(/[\]}]$/, "").trim();
      if (raw && raw[0] !== "{" && raw[0] !== "[") return { message: raw.slice(0, 400), facts: [], done: false };
      if (stripped && stripped.length > 4 && !stripped.includes('"')) return { message: stripped.slice(0, 400), facts: [], done: false };
      throw e;
    }
  };

  const applyConvBid = (d) => {
    const lo = num(d.priceLow), hi = num(d.priceHigh);
    if (lo || hi) {
      const opts = Array.isArray(d.primaryOptions) ? d.primaryOptions.slice(0, 3).map((o) => ({
        tier: String(o.tier || ""), name: String(o.name || ""), why: String(o.why || ""), url: String(o.url || ""),
      })).filter((o) => o.name) : [];
      setConvBid((prev) => ({ priceLow: lo, priceHigh: hi, days: num(d.days) || 1, confidence: String(d.confidence || "low"), primaryOptions: opts, chosen: (prev && prev.chosen) || null }));
    }
    if (Array.isArray(d.facts)) setConvFacts(d.facts.map(String).slice(0, 12));
    setConvOptions(Array.isArray(d.options) ? d.options.slice(0, 4).map(String).filter(Boolean) : []);
  };

  // STAGE 4 — refine the homeowner range off the SAME deterministic engine the
  // contractor side uses. We send ONLY the description + confirmed facts; the
  // server classifies the job, extracts inputs, computes, and returns ONLY a
  // {scope, priceLow, priceHigh, disclaimer} range — never rates/line costs/
  // margins (that data never leaves the server). If the job isn't a deterministic
  // trade (roofing, landscaping, a repair, …) the server says usedEngine:false
  // and we keep AL's own LLM range. Fire-and-forget; never blocks the chat.
  const homeownerDesc = (msgs) => msgs.filter((m) => m.role === "me").map((m) => m.text).join("\n").trim();
  const maybeEngineRange = async (d, msgs) => {
    if (!(num(d.priceLow) || num(d.priceHigh))) return; // nothing to anchor yet
    const facts = (Array.isArray(d.facts) && d.facts.length) ? d.facts.map(String) : convFacts;
    if (!d.done && facts.length < 2) return; // too thin — let AL's wide early range stand
    const desc = homeownerDesc(msgs);
    if (!desc && !facts.length) return;
    const sig = JSON.stringify({ d: desc, f: facts, done: !!d.done });
    if (engineRangeSig.current === sig) return; // already requested this exact state
    engineRangeSig.current = sig;
    try {
      const res = await fetch("/.netlify/functions/estimate-range", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc, facts: facts }),
      });
      const j = await res.json();
      if (engineRangeSig.current !== sig) return; // a newer turn superseded this request
      if (j && j.usedEngine && (num(j.priceLow) || num(j.priceHigh))) {
        setConvBid((b) => b ? { ...b, priceLow: num(j.priceLow), priceHigh: num(j.priceHigh), engineBacked: true, engineScope: Array.isArray(j.scope) ? j.scope : [], disclaimer: j.disclaimer || "" } : b);
      } else {
        // engine declined (non-deterministic job) — drop any stale engine flag, keep AL's range
        setConvBid((b) => (b && b.engineBacked) ? { ...b, engineBacked: false } : b);
      }
    } catch (e) { /* keep AL's range on any failure */ }
  };

  // one shared submit path for typing, choice buttons, and material-tier picks
  const convSubmit = async (textArg) => {
    const text = (textArg != null ? textArg : convInput).trim();
    const firstUserTurn = !convMsgs.some((m) => m.role === "me");
    const sendPhotos = firstUserTurn && convPhotos.length > 0;
    if (!text && !sendPhotos) return;
    if (convBusy) return;
    const meMsg = { role: "me", text: text || "(see the photos I added)" };
    const msgs = [...convMsgs, meMsg];
    setConvMsgs(msgs);
    setConvInput("");
    setConvOptions([]); // clear old buttons once an answer is given
    setConvStarted(true);
    setConvBusy(true);
    // one automatic retry before we ever tell the user it failed (kills false "didn't go through")
    let d = null, err = null;
    for (let attempt = 0; attempt < 2 && !d; attempt++) {
      try { d = await convCall(msgs, sendPhotos); }
      catch (e) { err = e; if (attempt === 0) await new Promise((r) => setTimeout(r, 900)); }
    }
    if (d) {
      applyConvBid(d);
      setConvMsgs([...msgs, { role: "ai", text: String(d.message || "Got it — go on?") }]);
      if (d.done) setConvDone(true);
      maybeEngineRange(d, msgs); // refine range off the deterministic engine (fire-and-forget)
    } else {
      // genuine failure after a retry — keep the user's message, let them resend, don't wipe progress
      setConvMsgs([...msgs, { role: "ai", text: "I didn't quite catch that one — mind sending it again?" }]);
    }
    setConvBusy(false);
  };
  const convSend = () => convSubmit(convInput);
  const convPickOption = (opt) => { if (!convBusy) convSubmit(opt); };
  const convPickTier = (opt) => {
    if (convBusy) return;
    setConvBid((b) => b ? { ...b, chosen: { tier: opt.tier, name: opt.name } } : b);
    const label = (opt.tier ? opt.tier + " — " : "") + opt.name;
    convSubmit("I'd like the " + label + " option.");
  };

  const handleConvReport = async (file) => {
    if (!file) return;
    setConvBusy(true);
    try {
      const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
      let block;
      if (isPdf) {
        if (file.size > 28 * 1024 * 1024) throw new Error("PDF over 28MB");
        block = { type: "document", source: { type: "base64", media_type: "application/pdf", data: await fileToB64(file) } };
      } else {
        const b64 = (await imageToJpeg(file, 2000)).split(",")[1];
        block = { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } };
      }
      const text = await callClaude([{ role: "user", content: [block, { type: "text", text: EV_PROMPT }] }]);
      const d = parseJSON(text);
      if (!d.summary || !String(d.summary).trim()) throw new Error("No measurements found");
      const measure = "I uploaded a measurement report. Key numbers: " + String(d.summary).slice(0, 400);
      const msgs = [...convMsgs, { role: "me", text: measure }];
      setConvMsgs(msgs);
      flash("Report read — measurements added to the chat.");
      // let AL respond using the new measurements
      const dd = await convCall(msgs, false);
      applyConvBid(dd);
      setConvMsgs([...msgs, { role: "ai", text: String(dd.message || "Got those measurements, thanks!") }]);
      if (dd.done) setConvDone(true);
      maybeEngineRange(dd, msgs); // refine range off the deterministic engine (fire-and-forget)
    } catch (e) { flash("Couldn't read that report — try a screenshot of the summary page, or just tell me the numbers."); }
    setConvBusy(false);
  };
  const convReset = () => {
    setConvMsgs([]); setConvInput(""); setConvStarted(false); setConvBid(null);
    setConvFacts([]); setConvDone(false); setConvPhotos([]); setConvOptions([]); setConvConfirmReset(false); setAddrPublic(false); convGreeting.current = false; engineRangeSig.current = "";
  };
  const handleReport = async (file) => {
    if (!file) return;
    setBusy("report");
    try {
      const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
      let block;
      if (isPdf) {
        if (file.size > 28 * 1024 * 1024) throw new Error("PDF over 28MB");
        block = { type: "document", source: { type: "base64", media_type: "application/pdf", data: await fileToB64(file) } };
      } else {
        const b64 = (await imageToJpeg(file, 2000)).split(",")[1];
        block = { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } };
      }
      const text = await callClaude([{ role: "user", content: [block, { type: "text", text: EV_PROMPT }] }]);
      const d = parseJSON(text);
      if (!d.summary || !String(d.summary).trim()) throw new Error("No measurements found in that file");
      setRoofDims("Measurements: " + String(d.summary).slice(0, 400));
      flash("Report read — measurements attached to your job.");
    } catch (e) { flash("Report parse failed: " + errMsg(e) + ". Try the PDF or paste the numbers."); }
    setBusy("");
  };
  const parsePaste = async () => {
    if (!pasteText.trim()) { flash("Paste the report numbers first."); return; }
    setBusy("report");
    try {
      const text = await callClaude([{ role: "user", content: EV_PROMPT + "\n\nReport text:\n" + pasteText.trim() }]);
      const d = parseJSON(text);
      if (!d.summary || !String(d.summary).trim()) throw new Error("No measurements found");
      setRoofDims("Measurements: " + String(d.summary).slice(0, 400));
      setPasteOpen(false); setPasteText("");
      flash("Measurements attached to your job.");
    } catch (e) { flash("Parse failed: " + errMsg(e)); }
    setBusy("");
  };
  const tightenPrice = () => {
    const miss = (bidPreview && bidPreview.missing) || [];
    if (miss.length) {
      // turn each missing item into a plain question and jump straight to the answer form
      const qs = miss.map((m) => {
        const t = String(m).trim();
        return /\?$/.test(t) ? t : "What's the " + t.replace(/^the\s+/i, "") + "?";
      });
      setBidPreview(null);
      setAnswers({});
      setQuestions(qs);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      askQuestions();
    }
  };
  const askQuestions = async () => {
    if (!desc.trim() && !photos.length) { flash("Add a description or photos first."); return; }
    setBusy("ask");
    setBidPreview(null);
    setQuestions(null);
    setAnswers({});
    setPriorQA([]); // first-round questions = fresh estimate, clear any accumulated Q&A
    try {
      const qprompt =
        "You are an experienced contractor about to price a residential job. Before you quote, ask the homeowner the 2-3 MOST important questions whose answers would most change the price or scope for THIS specific job. Keep them short, plain-English, and answerable in a few words (e.g. material choice, square footage, number of layers, access, finish level). Do NOT ask things already answered.\n" +
        "HOMEOWNER REQUEST: " + (desc.trim() || "(see photos)") + "\n" +
        (roofDims ? "MEASUREMENTS ALREADY PROVIDED: " + roofDims + "\n" : "") +
        (photos.length ? "Photos are attached.\n" : "") +
        "Respond with ONLY raw JSON, no markdown: {\"questions\": [up to 3 short question strings]}. If you truly need nothing, return {\"questions\": []}.";
      const qcontent = [
        ...photos.slice(0, 2).map((p) => {
          const mt = p.startsWith("data:") ? (p.substring(5, p.indexOf(";")) || "image/jpeg") : "image/jpeg";
          return { type: "image", source: { type: "base64", media_type: mt, data: p.split(",")[1] } };
        }),
        { type: "text", text: qprompt },
      ];
      let qtext;
      try { qtext = await callClaude([{ role: "user", content: qcontent }]); }
      catch (e1) { qtext = await callClaude([{ role: "user", content: qprompt }]); }
      const qd = parseJSON(qtext);
      const qs = Array.isArray(qd.questions) ? qd.questions.slice(0, 3).map(String).filter((x) => x.trim()) : [];
      if (qs.length === 0) { setBusy(""); getBid(); return; }
      setQuestions(qs);
    } catch (e) {
      // if question step fails, just price directly
      setBusy(""); getBid(); return;
    }
    setBusy("");
  };
  const getBid = async () => {
    if (!desc.trim() && !photos.length) { flash("Add a description or photos first."); return; }
    setBusy("bid");
    setBidPreview(null);
    try {
      // fold this round's answered questions into the running list so later rounds never lose earlier facts
      const thisRound = (questions || []).map((q, i) => ({ q: String(q), a: (answers[i] || "").trim() }))
        .filter((x) => x.a);
      const allQA = [...priorQA, ...thisRound];
      const qa = allQA.length
        ? "HOMEOWNER-PROVIDED DETAILS (use ALL of these — they are confirmed facts, do not re-estimate anything already answered here):\n" + allQA.map((x) => "- " + x.q + " " + x.a).join("\n") + "\n"
        : "";
      const addr = (sameAddr ? profH.address : jobAddr).trim();
      // pull recent closed jobs from the local price library as real reference points
      const histRef = (() => {
        if (!priceLib.length) return "";
        const recent = priceLib.slice(0, 12)
          .map((h) => "- " + (h.title || "job") + (h.town ? " (" + h.town + ")" : "") + ": sold at " + $0(h.sold) + (h.mh ? ", " + h.mh + " MH" : ""))
          .join("\n");
        return "REAL LOCAL CLOSED-JOB HISTORY (actual prices similar jobs sold at near here — weight your estimate toward these real numbers when the scope matches):\n" + recent + "\n";
      })();
      const prompt =
        "You are an experienced general contractor estimator pricing residential work near " + (profH.town || "upstate New York") + ".\n" +
        histRef +
        "HOMEOWNER REQUEST: " + (desc.trim() || "(see photos)") + "\n" +
        qa +
        (roofDims ? "MEASUREMENTS PROVIDED: " + roofDims + "\n" : "") +
        (photos.length ? "Photos attached — judge scope, size, materials, and condition from them.\n" : "") +
        (addr ? "PROPERTY ADDRESS: " + addr + "\n" : "") +
        "STEP 1 - Decide if this scope is SIZE-DEPENDENT (full roof, whole-house siding, large deck — where square footage drives price) or NOT (faucet, one window, small leak).\n" +
        "STEP 2 - If size-dependent AND no measurements provided AND an address is given, use your best ROUGH estimate of the home's size from the address to inform the price and set usedEstimate true. Otherwise set usedEstimate false and ignore the address for sizing. Even with an estimate, keep the range tight — do not blow it out.\n" +
        (() => {
          // pull any FRESH cached cost data for this region so the AI can skip those searches
          const region = (profH.town || "").toLowerCase().trim() || "_region";
          const now = Date.now();
          const fresh = [];
          for (const k of Object.keys(costCache)) {
            const c = costCache[k];
            if (!c || c.region !== region) continue;
            const ageDays = (now - new Date(c.at).getTime()) / 86400000;
            if (ageDays <= CACHE_FRESH_DAYS) {
              if (c.kind === "labor") fresh.push("- Burdened labor rate for " + c.trade + ": $" + c.value + "/hr (cached " + Math.round(ageDays) + "d ago — reuse, do NOT search)");
              if (c.kind === "tax") fresh.push("- Local sales tax rate: " + c.value + " (cached — reuse, do NOT search)");
              if (c.kind === "material") fresh.push("- " + c.label + ": $" + c.value + " (cached " + Math.round(ageDays) + "d ago — reuse unless this job differs)");
            }
          }
          return fresh.length
            ? "CACHED LOCAL COST DATA (already verified recently — REUSE these and do NOT spend a search on them; only search for figures NOT listed here or that are job-specific):\n" + fresh.join("\n") + "\n"
            : "";
        })() +
        "STEP 3 - Build a BOTTOM-UP cost estimate. Use web search ONLY for figures not already provided as cached above. Verify CURRENT " + new Date().getFullYear() + " local figures for THIS region:\n" +
        "  a) BURDENED labor rate per man-hour for this trade — wage + payroll taxes + workers comp + insurance. IMPORTANT: use the rate a SMALL, RURAL/SMALL-MARKET contractor actually pays, NOT inflated metro, union, or big-city numbers. For most trades in a rural/small upstate market this burdened COST is roughly $45-70/hr, not $90-110. Pick a realistic figure in that lower band unless the trade is genuinely high-skill (electrical/HVAC can run higher). Do not overstate this — it is the single biggest source of over-pricing.\n" +
        "  b) Current MATERIAL cost for the full scope (quality materials an established contractor would use).\n" +
        "  c) Local SALES TAX rate on materials (as a decimal, e.g. 0.08).\n" +
        "  d) EQUIPMENT + DISPOSAL cost for the scope (dumpsters/haul-off, lifts, rentals). Heavy tear-offs (cedar shake, multiple layers) need MORE dumpster pulls and higher tonnage fees — scale this up for heavy/messy scopes, do not use a flat small number.\n" +
        "  e) Total MAN-HOURS the scope realistically takes an established crew (include tear-off/disposal, setup, install, cleanup).\n" +
        "  DIFFICULTY SCALING — this is critical: a simple single-layer asphalt strip on a low/medium pitch is FAST. But hard scopes take MUCH longer and you must scale hours and disposal UP accordingly:\n" +
        "    • Cedar shake / wood shake tear-off: very slow, heavy, labor-punishing — can be 1.5-2.5x the hours of an asphalt strip, plus far more disposal weight/dumpsters.\n" +
        "    • Multiple layers (2+): each extra layer adds significant tear-off hours and disposal.\n" +
        "    • Steep pitch (8/12+), complex/hipped/cut-up roofs, multiple stories, hard access: add hours for safety, staging, slower movement, more waste.\n" +
        "    • Full re-deck / sheathing replacement: a whole extra labor pass over the roof.\n" +
        "  Do NOT price a hard tear-off like an easy reroof. Match the hours and disposal to the REAL difficulty of THIS scope.\n" +
        "Estimate like an established, fully-insured contractor with a real crew — not a handyman. Be REALISTIC and accurate on hours and materials — do not pad them. The goal is a true cost basis, neither lowballed nor inflated.\n" +
        "Do NOT compute the final price yourself — just return the cost components. After searching, respond with ONLY raw JSON, no markdown, no commentary: {\"title\": short job name, \"summary\": 1-2 friendly sentences, \"includes\": [max 6 short bullets of scope], \"manHours\": number, \"laborRate\": burdened $/hr number, \"materials\": $ number, \"taxRate\": decimal, \"equipment\": $ number, \"days\": days on site, \"usedEstimate\": boolean, \"trade\": one-word trade like roofing/siding/decking/gutters, \"confidence\": \"high\" if you had clear measurements/photos/detail, \"medium\" if reasonable but some gaps, \"low\" if the description was vague or key facts (size, materials, condition) were missing, \"missing\": [up to 3 short specific things that would most improve the price, e.g. 'roof size or measurement report', 'number of layers to tear off', 'siding material preference'], \"note\": one line on what could change the price}";
      const content = [
        ...photos.slice(0, 3).map((p) => {
          const mt = p.startsWith("data:") ? (p.substring(5, p.indexOf(";")) || "image/jpeg") : "image/jpeg";
          return { type: "image", source: { type: "base64", media_type: mt, data: p.split(",")[1] } };
        }),
        { type: "text", text: prompt },
      ];
      let text, photosDropped = false;
      try {
        text = await callClaudeBackground([{ role: "user", content }], { search: true, maxTokens: 1600 });
      } catch (e1) {
        const m = (e1.message || "").toLowerCase();
        const flaky = m.includes("network") || m.includes("invalid response format") || m.includes("empty reply");
        if (photos.length && flaky) {
          photosDropped = true;
          text = await callClaudeBackground([{ role: "user", content: prompt + "\n(Photos could not be attached this time - price conservatively from the description alone and widen the range to cover the extra unknowns.)" }], { search: true, maxTokens: 1600 });
        } else throw e1;
      }
      const d = parseJSON(text);
      if (photosDropped) flash("Heads up: photos couldn't reach the AI this time, so this bid is from your description only.");
      const mh = num(d.manHours), rate = num(d.laborRate), mats = num(d.materials);
      const taxRate = num(d.taxRate) || 0.08, equip = num(d.equipment);
      const labor = mh * rate;
      const matTax = mats * taxRate;
      const costBase = labor + mats + matTax + equip;
      if (!costBase) throw new Error("Couldn't build a cost estimate — add more detail");
      // write reusable, slow-changing cost data back to the cache for future estimates
      (() => {
        const region = (profH.town || "").toLowerCase().trim() || "_region";
        const trade = String(d.trade || "general").toLowerCase().trim();
        const at = new Date().toISOString();
        const next = { ...costCache };
        if (rate) next["labor:" + trade + ":" + region] = { kind: "labor", trade, region, value: Math.round(rate), at };
        if (taxRate) next["tax:" + region] = { kind: "tax", region, value: taxRate, at };
        setCostCache(next);
        pSet(COSTCACHE_KEY, next);
      })();
      // gross margin range: price = cost / (1 - margin); 28% low end, 35% high end
      let priceLow = Math.round(costBase / (1 - 0.28) / 50) * 50;
      let priceHigh = Math.round(costBase / (1 - 0.35) / 50) * 50;
      // confidence-based widening: when the AI had thin info, widen the range to be honest about uncertainty
      const conf = String(d.confidence || "medium").toLowerCase();
      const photosDroppedNow = photosDropped;
      let widen = 0;
      if (conf === "low" || photosDroppedNow) widen = 0.18;
      else if (conf === "medium") widen = 0.07;
      if (widen > 0) {
        const mid = (priceLow + priceHigh) / 2;
        priceLow = Math.round((mid - (mid - priceLow) - mid * widen) / 50) * 50;
        priceHigh = Math.round((mid + (priceHigh - mid) + mid * widen) / 50) * 50;
        if (priceLow < 0) priceLow = 0;
      }
      const missing = Array.isArray(d.missing) ? d.missing.slice(0, 3).map(String) : [];
      setPriorQA(allQA); // remember everything answered so far for any further tightening round
      setBidPreview({
        title: String(d.title || "Your project"), summary: String(d.summary || ""),
        includes: Array.isArray(d.includes) ? d.includes.slice(0, 6).map(String) : [],
        priceLow, priceHigh,
        days: num(d.days) || 1, mh,
        cost: { labor: Math.round(labor), mats: Math.round(mats), matTax: Math.round(matTax), equip: Math.round(equip), base: Math.round(costBase), rate: Math.round(rate), taxRate },
        note: String(d.note || ""),
        usedEstimate: !!d.usedEstimate && !roofDims,
        confidence: conf, missing,
      });
      setQuestions(null);
    } catch (e) { flash("Bid failed: " + errMsg(e)); }
    setBusy("");
  };

  /* ----- post / apply / choose / complete / rate ----- */
  const postJob = async () => {
    if (!bidPreview) return;
    if (!profH.name || !profH.contact) { flash("Save your name and contact on the Profile tab first — the matched pro needs a way to reach you."); goTab("profile"); return; }
    if (photos.length > 0 && !privacyOk) { flash("Please check the box confirming your photos can be shared before posting."); return; }
    setBusy("post");
    try {
      await saveProfileQuiet("homeowner");
      const smallPhotos = [];
      for (const ph of photos.slice(0, 2)) {
        try { smallPhotos.push(await dataUrlResize(ph, 640, 0.55)); } catch (e) { /* skip photo */ }
      }
      const job = {
        id: rid(), createdAt: new Date().toISOString(), status: "open",
        homeownerUid: me.uidH, homeownerName: profH.name, contact: profH.contact, town: profH.town || "", address: (sameAddr ? profH.address : jobAddr).trim(), addrPublic,
        desc: desc.trim(), roofDims, photos: smallPhotos,
        ...bidPreview, price: Math.round((bidPreview.priceLow + bidPreview.priceHigh) / 2), usedEstimate: !!bidPreview.usedEstimate,
        applicants: [], chosen: null,
      };
      await sSet(JOB_KEY(job.id), job);
      const ids = (await sGet(JOB_INDEX)) || [];
      await sSet(JOB_INDEX, [job.id, ...ids.filter((x) => x !== job.id)].slice(0, 120));
      setMe((m) => ({ ...m, mine: [job.id, ...m.mine].slice(0, 30) }));
      setDesc(""); setPhotos([]); setRoofDims(""); setBidPreview(null); setQuestions(null); setAnswers({}); setPriorQA([]); setPrivacyOk(false); setJobAddr(""); setSameAddr(true);
      pSet(DRAFT_KEY, { desc: "", roofDims: "" });
      goTab("myjobs");
      await refreshBoard();
      flash("Job posted ✓ Interested pros will show up here — you pick who gets it.");
    } catch (e) { flash("Post failed: " + errMsg(e)); }
    setBusy("");
  };
  const postConvJob = async () => {
    if (!convBid) return;
    if (!profH.name || !profH.contact) { flash("Save your name and contact on the Profile tab first — the matched pro needs a way to reach you."); goTab("profile"); return; }
    if (convPhotos.length > 0 && !privacyOk) { flash("Please check the box confirming your photos can be shared before posting."); return; }
    setBusy("post");
    try {
      await saveProfileQuiet("homeowner");
      const smallPhotos = [];
      for (const ph of convPhotos.slice(0, 2)) {
        try { smallPhotos.push(await dataUrlResize(ph, 640, 0.55)); } catch (e) { /* skip */ }
      }
      const summary = convFacts.length ? convFacts.join("; ") : (convMsgs.find((m) => m.role === "me") || {}).text || "Project";
      const title = (convMsgs.find((m) => m.role === "me") || {}).text || "Project";
      const job = {
        id: rid(), createdAt: new Date().toISOString(), status: "open",
        homeownerUid: me.uidH, homeownerName: profH.name, contact: profH.contact, town: profH.town || "", address: (profH.address || "").trim(), addrPublic,
        desc: summary, roofDims: "", photos: smallPhotos,
        title: String(title).slice(0, 60), summary, includes: convFacts.slice(0, 6),
        priceLow: convBid.priceLow, priceHigh: convBid.priceHigh, days: convBid.days,
        price: Math.round((convBid.priceLow + convBid.priceHigh) / 2),
        confidence: convBid.confidence, usedEstimate: false,
        applicants: [], chosen: null,
      };
      await sSet(JOB_KEY(job.id), job);
      const ids = (await sGet(JOB_INDEX)) || [];
      await sSet(JOB_INDEX, [job.id, ...ids.filter((x) => x !== job.id)].slice(0, 120));
      setMe((m) => ({ ...m, mine: [job.id, ...m.mine].slice(0, 30) }));
      convReset(); setPrivacyOk(false);
      goTab("myjobs");
      await refreshBoard();
      flash("Estimate posted ✓ Local pros will apply — you pick who gets it.");
    } catch (e) { flash("Post failed: " + errMsg(e)); }
    setBusy("");
  };
  const myPlan = PLANS.find((pl) => pl.id === me.plan) || null;
  const monthApps = board.filter((j) => {
    const a = (j.applicants || []).find((x) => x.uid === me.uidC);
    if (!a) return false;
    const d = new Date(a.at || j.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const genMaterials = async (job) => {
    setMatBusy(job.id);
    try {
      const prompt =
        "You are a contractor estimator. For this residential job, list the main materials needed with rough quantities and any relevant dimensions, so a contractor can sanity-check their bid. Keep it practical and concise.\n" +
        "JOB: " + (job.title || "") + " — " + (job.summary || job.desc || "") + "\n" +
        (job.roofDims ? "MEASUREMENTS: " + job.roofDims + "\n" : "") +
        "Respond with ONLY raw JSON, no markdown: {\"items\": [{\"name\": material, \"qty\": \"quantity with unit, e.g. 32 squares or 8 sheets\"}], \"note\": one short line on dimensions or assumptions}. Max 12 items.";
      const text = await callClaude([{ role: "user", content: prompt }]);
      const d = parseJSON(text);
      const items = Array.isArray(d.items) ? d.items.slice(0, 12).map((x) => ({ name: String(x.name || ""), qty: String(x.qty || "") })).filter((x) => x.name) : [];
      setMatLists((m) => ({ ...m, [job.id]: { items, note: String(d.note || ""), open: true } }));
    } catch (e) { flash("Material list failed: " + errMsg(e)); }
    setMatBusy("");
  };
  const updateMat = (jobId, idx, field, val) => {
    setMatLists((m) => {
      const cur = m[jobId] || { items: [], note: "", open: true };
      const items = cur.items.map((it, i) => i === idx ? { ...it, [field]: val } : it);
      return { ...m, [jobId]: { ...cur, items } };
    });
  };
  const addMatRow = (jobId) => setMatLists((m) => {
    const cur = m[jobId] || { items: [], note: "", open: true };
    return { ...m, [jobId]: { ...cur, items: [...cur.items, { name: "", qty: "" }] } };
  });
  const removeMatRow = (jobId, idx) => setMatLists((m) => {
    const cur = m[jobId] || { items: [], note: "", open: true };
    return { ...m, [jobId]: { ...cur, items: cur.items.filter((_, i) => i !== idx) } };
  });
  const applyJob = async (job, myBid) => {
    if (!profC.company) { flash("Save your company profile first — homeowners pick from profiles."); goTab("profile"); return; }
    if (!myPlan) { flash("Pick a subscription on the Profile tab to start applying."); goTab("profile"); return; }
    if (myPlan.limit && monthApps >= myPlan.limit) { flash("You've used your " + myPlan.limit + " Starter applications this month — upgrade to Pro for unlimited."); goTab("profile"); return; }
    setBusy("apply-" + job.id);
    try {
      await saveProfileQuiet("contractor");
      const fresh = await sGet(JOB_KEY(job.id));
      if (!fresh || fresh.status !== "open") { flash("That job's already matched."); await refreshBoard(); setBusy(""); return; }
      if ((fresh.applicants || []).some((a) => a.uid === me.uidC)) { flash("You're already on the list for this one."); setBusy(""); return; }
      fresh.applicants = [...(fresh.applicants || []), { uid: me.uidC, company: profC.company, bid: myBid || job.price, at: new Date().toISOString() }];
      await sSet(JOB_KEY(fresh.id), fresh);
      await refreshBoard();
      flash("You're in ✓ The homeowner reviews interested pros and picks one.");
      demoHire(fresh);
    } catch (e) { flash("Apply failed: " + errMsg(e)); }
    setBusy("");
  };
  const demoHire = async (job) => {
    // if this is a demo job, the demo homeowner "hires" the real contractor after a moment
    const isDemoJob = job.demo || (job.homeownerUid && String(job.homeownerUid).startsWith("demo-"));
    if (!isDemoJob) return;
    setTimeout(async () => {
      try {
        const fresh = await sGet(JOB_KEY(job.id));
        if (!fresh || fresh.status !== "open") return;
        if (!(fresh.applicants || []).some((a) => a.uid === me.uidC)) return;
        fresh.chosen = me.uidC;
        fresh.status = "matched";
        fresh.matchedAt = new Date().toISOString();
        await sSet(JOB_KEY(fresh.id), fresh);
        await refreshBoard();
        setParty({ title: "You got the job!", sub: (fresh.homeownerName || "The homeowner") + " (demo) picked you — messaging is open" });
      } catch (e) { /* best effort */ }
    }, 4000 + Math.random() * 2000);
  };
  const passJob = (id) => setMe((m) => ({ ...m, passed: [...m.passed, id].slice(-100) }));

  const recordSoldPrice = (job, soldPrice) => {
    if (!soldPrice) return;
    const entry = {
      title: job.title || "", scope: (job.summary || job.desc || "").slice(0, 200),
      town: job.town || "", sold: soldPrice,
      low: num(job.priceLow), high: num(job.priceHigh),
      mh: num(job.mh), at: new Date().toISOString(),
    };
    setPriceLib((prev) => {
      const next = [entry, ...prev].slice(0, 200);
      pSet(PRICELIB_KEY, next);
      return next;
    });
  };
  const chooseContractor = async (job, uid) => {
    setBusy("choose-" + job.id + uid);
    try {
      const fresh = await sGet(JOB_KEY(job.id));
      if (!fresh || fresh.status !== "open") { flash("This job is already matched."); await refreshBoard(); setBusy(""); return; }
      fresh.chosen = uid;
      fresh.status = "matched";
      fresh.matchedAt = new Date().toISOString();
      const winner = (fresh.applicants || []).find((a) => a.uid === uid);
      const soldPrice = num(winner && winner.bid) || num(fresh.price);
      recordSoldPrice(fresh, soldPrice);
      await sSet(JOB_KEY(fresh.id), fresh);
      const u = users[uid];
      setParty({ title: "It's a match!", sub: (u ? u.company : "Your pro") + " is on the job — messaging is now open" });
      await refreshBoard();
    } catch (e) { flash("Couldn't match: " + errMsg(e)); }
    setBusy("");
  };
  const deleteJob = async (job) => {
    if (confirmDel !== job.id) {
      setConfirmDel(job.id);
      setTimeout(() => setConfirmDel((c) => (c === job.id ? "" : c)), 4000);
      return;
    }
    setConfirmDel("");
    setBusy("del-" + job.id);
    try {
      try { await window.storage.delete(JOB_KEY(job.id), true); } catch (e) { /* may already be gone */ }
      const ids = (await sGet(JOB_INDEX)) || [];
      await sSet(JOB_INDEX, ids.filter((x) => x !== job.id));
      setMe((m) => ({ ...m, mine: m.mine.filter((x) => x !== job.id) }));
      await refreshBoard();
      flash("Job deleted.");
    } catch (e) { flash("Delete failed: " + errMsg(e)); }
    setBusy("");
  };
  const openEdit = (job) => { setEditJob(job.id); setEditText(job.desc || ""); };
  const saveEdit = async (job) => {
    setBusy("edit-" + job.id);
    try {
      const fresh = await sGet(JOB_KEY(job.id));
      if (!fresh) throw new Error("job not found");
      fresh.desc = editText.trim();
      await sSet(JOB_KEY(fresh.id), fresh);
      setEditJob(null); setEditText("");
      await refreshBoard();
      flash("Job updated. (Price unchanged — delete and repost if the scope changed a lot.)");
    } catch (e) { flash("Update failed: " + errMsg(e)); }
    setBusy("");
  };
  const autoArchive = async (jobs) => {
    const mine = jobs.filter((j) =>
      (j.status === "matched" || j.status === "complete") &&
      (j.homeownerUid === me.uidH || j.chosen === me.uidC)
    );
    if (!mine.length) return;
    const snaps = [];
    for (const j of mine.slice(0, 30)) {
      let chat = [];
      try { chat = (await sGet(CHAT_KEY(j.id))) || []; } catch (e) { /* keep prior */ }
      snaps.push({ ...j, archivedChat: chat, archivedAt: new Date().toISOString() });
    }
    setArchived((prev) => {
      const byId = {};
      for (const a of prev) byId[a.id] = a;
      for (const sn of snaps) {
        // keep the richer chat if the live one is somehow empty
        const old = byId[sn.id];
        if (old && (!sn.archivedChat || !sn.archivedChat.length) && old.archivedChat && old.archivedChat.length) {
          sn.archivedChat = old.archivedChat;
        }
        byId[sn.id] = sn;
      }
      const next = Object.values(byId).sort((a, b) => (b.archivedAt || "").localeCompare(a.archivedAt || "")).slice(0, 150);
      pSet(ARCHIVE_KEY, next);
      return next;
    });
  };
  const archiveJob = async (job) => {
    try {
      const chat = (await sGet(CHAT_KEY(job.id))) || [];
      const snap = { ...job, archivedChat: chat, archivedAt: new Date().toISOString() };
      setArchived((prev) => {
        const next = [snap, ...prev.filter((x) => x.id !== job.id)].slice(0, 100);
        pSet(ARCHIVE_KEY, next);
        return next;
      });
    } catch (e) { /* best effort */ }
  };
  const markDone = async (job) => {
    try {
      const fresh = await sGet(JOB_KEY(job.id));
      if (!fresh) return;
      fresh.status = "complete";
      fresh.completedAt = new Date().toISOString();
      await sSet(JOB_KEY(fresh.id), fresh);
      await archiveJob(fresh);
      await refreshBoard();
      flash("Marked complete ✓ Saved to your job history. Leave a rating — reviews keep the board honest.");
      demoRate(fresh);
    } catch (e) { flash("Update failed: " + errMsg(e)); }
  };
  const demoRate = async (job) => {
    // if either party is a demo account, that demo party leaves the tester a believable rating + comment
    const hoDemo = job.homeownerUid && String(job.homeownerUid).startsWith("demo-");
    const coDemo = job.chosen && String(job.chosen).startsWith("demo-");
    // demo HO rates the real contractor (ofContractor); demo CO rates the real homeowner (ofHomeowner)
    const who = hoDemo ? "ofContractor" : coDemo ? "ofHomeowner" : null;
    if (!who) return;
    setTimeout(async () => {
      try {
        const fresh = await sGet(JOB_KEY(job.id));
        if (!fresh || (fresh.ratings && fresh.ratings[who])) return;
        const subject = who === "ofContractor" ? "the contractor's work on this job" : "the homeowner (communication, access, payment)";
        const prompt =
          "You just completed a home-contracting job through an app and are leaving the other party a short, believable review. Rate " + subject + ".\n" +
          "JOB: " + (fresh.title || "") + " — " + (fresh.summary || fresh.desc || "") + "\n" +
          "Respond with ONLY raw JSON, no markdown: {\"stars\": integer 4 or 5, \"comment\": one friendly sentence under 100 chars}.";
        let stars = 5, comment = "Great to work with — smooth job.";
        try {
          const text = await callClaude([{ role: "user", content: prompt }], { background: true });
          const d = parseJSON(text);
          if (d.stars) stars = Math.max(1, Math.min(5, num(d.stars)));
          if (d.comment) comment = String(d.comment).slice(0, 120);
        } catch (e) { /* use fallback */ }
        fresh.ratings = { ...(fresh.ratings || {}), [who]: { stars, comment, at: new Date().toISOString(), demo: true } };
        await sSet(JOB_KEY(fresh.id), fresh);
        await archiveJob(fresh);
        await refreshBoard();
        flash("⭐ " + (who === "ofContractor" ? (fresh.homeownerName || "The homeowner") : "The pro") + " (demo) left you a review!");
      } catch (e) { /* best effort */ }
    }, 3000 + Math.random() * 2000);
  };
  const submitRating = async (job, who, starsVal, comment) => {
    setBusy("rate-" + job.id + who);
    try {
      const fresh = await sGet(JOB_KEY(job.id));
      if (!fresh) throw new Error("job not found");
      fresh.ratings = { ...(fresh.ratings || {}), [who]: { stars: starsVal, comment: (comment || "").slice(0, 140), at: new Date().toISOString() } };
      await sSet(JOB_KEY(fresh.id), fresh);
      if (fresh.status === "complete") await archiveJob(fresh);
      await refreshBoard();
      flash("Rating saved ✓");
      demoRate(fresh);
    } catch (e) { flash("Rating failed: " + errMsg(e)); }
    setBusy("");
  };

  /* ----- messaging ----- */
  const markRead = (jobId, count) => {
    setMe((m) => ({ ...m, readMsgs: { ...(m.readMsgs || {}), [jobId]: count } }));
    setUnread((u) => { const c = { ...u }; delete c[jobId]; return c; });
  };
  const openChat = async (job) => {
    setChatJob(job);
    setViewing(null);
    let msgs = (await sGet(CHAT_KEY(job.id))) || [];
    if (!msgs.length && job.archivedChat) msgs = job.archivedChat;
    setChatMsgs(msgs);
    markRead(job.id, msgs.length);
    setTimeout(() => chatEnd.current && chatEnd.current.scrollIntoView({ block: "end" }), 80);
  };
  const refreshChat = async (manual) => {
    if (!chatJob) return;
    const msgs = (await sGet(CHAT_KEY(chatJob.id))) || [];
    setChatMsgs((prev) => {
      if (manual || msgs.length !== prev.length) {
        setTimeout(() => chatEnd.current && chatEnd.current.scrollIntoView({ block: "end" }), 80);
        markRead(chatJob.id, msgs.length);
        return msgs;
      }
      return prev;
    });
  };
  const sendMsg = async () => {
    if (!chatText.trim() || !chatJob) return;
    setBusy("send");
    try {
      const isCo = me.role === "contractor";
      const msg = {
        id: rid(), from: isCo ? me.uidC : me.uidH,
        name: isCo ? (profC.company || "Contractor") : (profH.name || "Homeowner"),
        text: chatText.trim().slice(0, 500), at: new Date().toISOString(),
      };
      const fresh = ((await sGet(CHAT_KEY(chatJob.id))) || []);
      const next = [...fresh, msg].slice(-100);
      await sSet(CHAT_KEY(chatJob.id), next);
      setChatMsgs(next);
      markRead(chatJob.id, next.length);
      setChatText("");
      setTimeout(() => chatEnd.current && chatEnd.current.scrollIntoView({ block: "end" }), 60);
      maybeDemoReply(chatJob, next);
    } catch (e) { flash("Send failed: " + errMsg(e)); }
    setBusy("");
  };
  const maybeDemoReply = async (job, history) => {
    // Is the OTHER party in this chat a demo account?
    const isCo = me.role === "contractor";
    const otherUid = isCo ? job.homeownerUid : job.chosen;
    const otherIsDemo = (otherUid && String(otherUid).startsWith("demo-")) || job.demo;
    if (!otherIsDemo) return;
    const otherUser = users[otherUid] || {};
    const otherName = isCo ? (job.homeownerName || "Homeowner") : (otherUser.company || "Contractor");
    const role = isCo ? "homeowner who posted this job" : "contractor hired for this job";
    setTimeout(async () => {
      try {
        const convo = history.slice(-8).map((m) => (m.from === otherUid ? otherName : "Other") + ": " + m.text).join("\n");
        const prompt =
          "You are " + otherName + ", a " + role + " on a home-contracting app, having a short text chat. Reply naturally and briefly (1-2 sentences), like a real person texting about scheduling, access, or the job. Stay practical and friendly.\n" +
          "JOB: " + (job.title || "") + " — " + (job.summary || job.desc || "") + "\n" +
          "CONVERSATION SO FAR:\n" + convo + "\n\n" +
          "Write only " + otherName + "'s next reply, no name prefix, no quotes.";
        const text = await callClaude([{ role: "user", content: prompt }], { background: true });
        const reply = (text || "").trim().replace(/^["']|["']$/g, "").slice(0, 400);
        if (!reply) return;
        const rmsg = { id: rid(), from: otherUid, name: otherName + " (demo)", text: reply, at: new Date().toISOString() };
        const cur = (await sGet(CHAT_KEY(job.id))) || [];
        const merged = [...cur, rmsg].slice(-100);
        await sSet(CHAT_KEY(job.id), merged);
        if (chatJob && chatJob.id === job.id) {
          setChatMsgs(merged);
          setTimeout(() => chatEnd.current && chatEnd.current.scrollIntoView({ block: "end" }), 60);
        }
      } catch (e) { /* demo reply is best-effort */ }
    }, 1800 + Math.random() * 1500);
  };

  /* ----- derived ----- */
  const feedRaw = board.filter((j) => j.status === "open" && !me.passed.includes(j.id));
  const feedJobs = (radiusOn && inRange) ? feedRaw.filter((j) => inRange[j.id] !== false) : feedRaw;
  const archMine = archived.filter((j) => j.homeownerUid === me.uidH || (j.applicants || []).some((a) => a.uid === me.uidC) || j.chosen === me.uidC);
  const mergeArch = (live) => {
    const ids = new Set(live.map((j) => j.id));
    return [...live, ...archMine.filter((a) => !ids.has(a.id))];
  };
  const myJobsHO = mergeArch(board.filter((j) => j.homeownerUid === me.uidH || me.mine.includes(j.id)));
  const myJobsCO = mergeArch(board.filter((j) => (j.applicants || []).some((a) => a.uid === me.uidC) || j.chosen === me.uidC));
  const activeUid = me.role === "contractor" ? me.uidC : me.uidH;
  const wonCount = myJobsCO.filter((j) => j.chosen === me.uidC).length;
  const hoOpen = myJobsHO.filter((j) => j.status === "open").length;
  const hoMatched = myJobsHO.filter((j) => j.status === "matched").length;
  const hoDone = myJobsHO.filter((j) => j.status === "complete").length;

  const tabs = me.role === "contractor"
? [["feed", "Feed", ClipboardList], ["myjobs", "My Jobs", Briefcase], ["estimator", "Estimate", Calculator], ["work", "My Work", Camera], ["settings", "Profile", User]]
    : [["chat", "Get Estimate", MessageCircle], ["myjobs", "My Jobs", Briefcase], ["pros", "Pros", Users], ["profile", "Profile", User]];

  const overlay = viewing || chatJob;
  const hoReady = !!(profH.name && profH.name.trim() && profH.contact && profH.contact.trim() && profH.address && profH.address.trim());
  const coReady = !!(profC.company && profC.company.trim());
  const needsSetup = me.role === "homeowner" ? !hoReady : me.role === "contractor" ? !coReady : false;
  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);
  const newNotifCount = notifs.filter((x) => x.at > (me.seenAt || 0)).length;
  const openNotifs = () => {
    setNotifOpen((o) => {
      const next = !o;
      if (next && notifs.length) setMe((m) => ({ ...m, seenAt: Math.max(m.seenAt || 0, notifs[0].at) }));
      return next;
    });
  };
  const tapNotif = (nt) => {
    setNotifOpen(false);
    const job = board.find((j) => j.id === nt.jobId);
    if (!job) return;
    if (nt.icon === "job") { goTab("feed"); return; }
    if (nt.icon === "msg") { openChat(job); return; }
    goTab("myjobs");
  };

  const JobPill = ({ j }) => {
    if (j.status === "open") return <Pill kind="open">Open</Pill>;
    if (j.status === "matched") return <Pill kind="match">Matched</Pill>;
    return <Pill kind="done">Complete</Pill>;
  };

  const estCatObj = estCat ? CATEGORIES.find((c) => c.cat === estCat) : null;
  const estSubs = estCatObj && estCatObj.subs ? estCatObj.subs : [];

  /* ============================ UI ============================ */
  return (
    <div className="app">
      <style>{CSS}</style>

      <header className="bar">
        {overlay ? (
          <button className="backbtn" onClick={() => { setViewing(null); setChatJob(null); }}>
            <ChevronLeft size={24} /> Back
          </button>
        ) : (
          <div className="mark">CAZ<span>BID</span><i className="ver">v4.08</i></div>
        )}
        {me.role && !overlay && (
          <div className="barright">
            <button className="iconbtn bellbtn" onClick={openNotifs} title="Notifications">
              <Bell size={18} />
              {newNotifCount > 0 && <span className="belldot">{newNotifCount}</span>}
            </button>
            <button className="iconbtn" onClick={shareApp} title="Share CazBid">
              <Share size={18} />
            </button>
            <button className="iconbtn" onClick={() => { refreshBoard(); if (tab === "pros") refreshPros(); }}>
              <RefreshCw size={18} className={busy === "board" || busy === "pros" ? "spin" : ""} />
            </button>
            <button className="rolepill" onClick={() => setMe((m) => ({ ...m, role: "" }))}>
              <ArrowLeftRight size={13} /> {me.role === "contractor" ? "Pro" : "Owner"}
            </button>
          </div>
        )}
        {overlay && chatJob && <div className="bartitle">{chatJob.title}</div>}
        {overlay && viewing && <div className="bartitle">Profile</div>}
      </header>

      {toast && <div className="toast">{toast}</div>}
      {notifOpen && (
        <div className="notifback" onClick={() => setNotifOpen(false)}>
          <div className="notifpanel" onClick={(e) => e.stopPropagation()}>
            <div className="notifhead">Notifications <button className="notifx" onClick={() => setNotifOpen(false)}><X size={16} /></button></div>
            {notifs.length === 0 && <p className="hint center" style={{ padding: "16px 0" }}>Nothing yet — new jobs, hires, accepted bids, and messages show up here.</p>}
            {notifs.map((nt) => (
              <button className={"notifrow" + (nt.at > (me.seenAt || 0) ? " unseen" : "")} key={nt.id} onClick={() => tapNotif(nt)}>
                <span className={"notifico " + nt.icon}>{nt.icon === "job" ? "🧰" : nt.icon === "bid" ? "✋" : nt.icon === "hired" ? "🤝" : "💬"}</span>
                <span className="notiftxt">{nt.text}<span className="notifwhen">{fmtDate(nt.at)}</span></span>
              </button>
            ))}
          </div>
        </div>
      )}
      {party && <Party data={party} onClose={() => setParty(null)} />}

      {svcPrompt && (
        <div className="svcwrap" onClick={() => setSvcPrompt(null)}>
          <div className="svccard" onClick={(e) => e.stopPropagation()}>
            <div className="svchead">Before you go to {svcPrompt.name}</div>
            <ol className="howtosteps">
              <li>{svcPrompt.name} opens in a new browser tab — get your measurement report there.</li>
              <li>On the page showing your numbers (total area, pitch, ridges, valleys…), <b>take a screenshot</b>.</li>
              <li><b>Come back to this CazBid tab</b> and tap <b>“📸 Upload screenshot.”</b> No files to download or hunt for.</li>
            </ol>
            <p className="howtoback">↩︎ <b>Getting back is easy:</b> CazBid stays open in this tab. Switch tabs or tap the back arrow to return — your job is saved as a draft, so nothing is lost.</p>
            <button className="btn primary full big" onClick={() => { const u = svcPrompt.url; setSvcPrompt(null); window.open(u, "_blank", "noopener,noreferrer"); }}>
              Continue to {svcPrompt.name} ↗
            </button>
            <button className="btn ghost full" onClick={() => setSvcPrompt(null)}>Cancel</button>
          </div>
        </div>
      )}

      {convConfirmReset && (
        <div className="svcwrap" onClick={() => setConvConfirmReset(false)}>
          <div className="svccard" onClick={(e) => e.stopPropagation()}>
            <div className="svchead">Start over?</div>
            <p className="body" style={{ marginTop: -4 }}>This clears your whole conversation and the running estimate. You can't undo it.</p>
            <button className="btn primary full big" onClick={convReset}>Yes, start over</button>
            <button className="btn ghost full" onClick={() => setConvConfirmReset(false)}>Cancel — keep chatting</button>
          </div>
        </div>
      )}

      {estSvcPrompt && (
        <div className="svcwrap" onClick={() => setEstSvcPrompt(null)}>
          <div className="svccard" onClick={(e) => e.stopPropagation()}>
            <div className="svchead">Before you go to {estSvcPrompt.name}</div>
            <ol className="howtosteps">
              <li>{estSvcPrompt.name} opens in a new tab — pull your measurement report there.</li>
              <li>On the page with your numbers, <b>take a screenshot</b> (or download the PDF).</li>
              <li><b>Come back to this CazBid tab</b> and tap <b>“📸 Upload report or screenshot.”</b></li>
            </ol>
            <p className="howtoback">↩︎ CazBid stays open in this tab — switch back when you're done.</p>
            <button className="btn primary full big" onClick={() => { const u = estSvcPrompt.url; setEstSvcPrompt(null); window.open(u, "_blank", "noopener,noreferrer"); }}>
              Continue to {estSvcPrompt.name} ↗
            </button>
            <button className="btn ghost full" onClick={() => setEstSvcPrompt(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ---------- profile viewer ---------- */}
      {viewing && (() => {
        const u = users[viewing];
        if (!u) return <main className="page"><section className="card"><p className="hint">Loading profile…</p></section></main>;
        const isCo = u.role === "contractor";
        return (
          <main className="page">
            <section className="card profhead">
              <Avatar user={u} size="xl" />
              <div className="grow">
                <div className="h1">{isCo ? u.company : u.name}</div>
                <div className="hint">{u.town}{isCo && u.trades ? " · " + u.trades : ""}</div>
                <div className="ratingline">{starsOf(isCo ? coStars : hoStars, u.uid) || "No ratings yet"}</div>
              </div>
            </section>
            {u.bio && <section className="card"><p className="body">{u.bio}</p></section>}
            {isCo && u.posts && u.posts.length > 0 && (
              <section className="card">
                <div className="h2">Recent work</div>
                {viewPosts.length === 0 && <p className="hint">Loading photos…</p>}
                <div className="postcol">
                  {viewPosts.map((p) => (
                    <figure className="postcard" key={p.id}>
                      {p.caption && <figcaption className="postcap">{p.caption}</figcaption>}
                      <div className="postimgwrap"><img src={p.photo} alt="" /></div>
                    </figure>
                  ))}
                </div>
              </section>
            )}
            <section className="card">
              <div className="h2">Reviews</div>
              <ReviewList uid={u.uid} role={u.role} emptyText="No written reviews yet." />
            </section>
          </main>
        );
      })()}

      {/* ---------- chat ---------- */}
      {chatJob && !viewing && (
        <main className="page chatpage">
          <div className="chat">
            {chatMsgs.length === 0 && <p className="hint center" style={{ marginTop: 24 }}>No messages yet — say hi and talk scheduling, access, and the final walkthrough price.</p>}
            {chatMsgs.map((m) => (
              <div key={m.id} className={"bubble" + (m.from === activeUid ? " mine" : "")}>
                <span className="who">{m.name}</span>
                {m.text}
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
          <div className="chatbar">
            <button className="iconbtn" onClick={refreshChat}><RefreshCw size={18} /></button>
            <input className="chatin" placeholder="Message…" value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMsg(); }} />
            <button className="sendbtn" disabled={busy === "send" || !chatText.trim()} onClick={sendMsg}>
              <Send size={18} />
            </button>
          </div>
        </main>
      )}

      {/* ---------- role chooser ---------- */}
      {!me.role && !overlay && (
        <main className="page chooser">
          <img className="heroav" src={CAZA_LOGO} alt="CazBid" />
          <h1 className="hero">One photo.<br />One price.<br />You pick the pro.</h1>
          <button className="rolebtn" onClick={() => { setMe((m) => ({ ...m, role: "homeowner" })); setTab("profile"); }}>
            🏠 I need work done
          </button>
          <button className="rolebtn dark" onClick={() => { setMe((m) => ({ ...m, role: "contractor" })); setTab("myjobs"); }}>
            🔧 I'm a contractor
          </button>
          <div className="howrow">
            <div className="howstep"><b>1</b>Snap or describe the job</div>
            <div className="howstep"><b>2</b>Get an instant AI price</div>
            <div className="howstep"><b>3</b>Pick your pro</div>
          </div>
          <div className="chooserbtns">
            <button className="btn ghost" onClick={shareApp}><Share size={15} /> Invite someone</button>
            <button className="btn ghost" onClick={sendFeedback}><MessageSquare size={15} /> Send feedback</button>
          </div>
          <p className="hint center">Prototype. CazBid takes no cut and never touches the money — homeowners pay contractors directly. Anything posted is visible to everyone using this app.</p>
        </main>
      )}

      {/* ---------- HOMEOWNER: new job ---------- */}
      {me.role === "homeowner" && tab === "post" && !overlay && (
        <main className="page">
          <div className="pagetitle">Get an instant price</div>
          <section className="card">
            <textarea className="desc" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)}
              placeholder="What do you need done? e.g. Replace the shingle roof on my 1,800 sqft ranch — some plywood feels soft near the chimney." />
            <label className="dropzone">
              <input type="file" accept="image/*" multiple style={{ display: "none" }}
                onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
              <Camera size={30} />
              <b>{busy === "photos" ? "Adding photos…" : "Add photos of the job"}</b>
              <span>a few photos = a much better price</span>
            </label>
            <p className="privacywarn"><AlertTriangle size={13} /> Photos you add are visible to every contractor on CazBid. Don't include faces, license plates, documents, or anything private.</p>
            {photos.length > 0 && (
              <>
                <div className="thumbs">
                  {photos.map((p, i) => (
                    <div className="thumb" key={i}>
                      <img src={p} alt={"photo " + (i + 1)} />
                      <button className="thumbrm" onClick={() => setPhotos(photos.filter((_, j) => j !== i))}><X size={12} /> Remove</button>
                    </div>
                  ))}
                </div>
                <p className="hint">Tap Remove on any photo to take it off before posting.</p>
              </>
            )}
          </section>

          <section className="card">
            <div className="card-h2">Where's the job?</div>
            <label className="addrtoggle">
              <button className={"toggleswitch" + (sameAddr ? " on" : "")} onClick={() => setSameAddr(!sameAddr)}><span /></button>
              <span>Job is at my home address{profH.address ? "" : " (add it in Profile)"}</span>
            </label>
            {!sameAddr && (
              <input className="in" style={{ marginTop: 10 }} value={jobAddr} onChange={(e) => setJobAddr(e.target.value)} placeholder="Job address — 123 Main St, Town, NY" />
            )}
            {sameAddr && profH.address && <p className="hint" style={{ marginTop: 8 }}>📍 {profH.address} · only shared with the pro you hire</p>}
          </section>

          <section className={"card measband" + (roofOpen ? " open" : "")}>
            <button className="rowtoggle" onClick={() => setRoofOpen(!roofOpen)}>
              <span className="measleft">
                <span className="measicon">📐</span>
                <span>
                  <span className="meastitle">Add exact measurements <span className="measrec">recommended</span></span>
                  <span className="meassub">Roof report or LiDAR room scan → a much tighter, more accurate price</span>
                </span>
              </span>
              <span className="chev">{roofOpen ? "▴" : "▾"}</span>
            </button>
            {roofOpen && (
              <div className="roofbody">
                <div className="seclabel">Roof — aerial reports</div>
                <div className="reportgrid">
                  <button className="report" onClick={() => setSvcPrompt({ name: "EagleView", url: "https://myev.eagleview.com/place-order" })}><b>EagleView</b><span>Aerial report, the industry standard. eagleview.com</span><span className="reportgo">Tap for steps ↗</span></button>
                  <button className="report" onClick={() => setSvcPrompt({ name: "GAF QuickMeasure", url: "https://quickmeasure.gaf.com" })}><b>GAF QuickMeasure</b><span>~$25-35 aerial report, ~1 hour. gaf.com</span><span className="reportgo">Tap for steps ↗</span></button>
                  <button className="report" onClick={() => setSvcPrompt({ name: "Hover", url: "https://hover.to/onboarding/login" })}><b>Hover</b><span>Free app — photos of your house build the measurements. hover.to</span><span className="reportgo">Tap for steps ↗</span></button>
                </div>
                <div className="seclabel">Indoor — scan the room with your phone</div>
                <div className="reportgrid">
                  <button className="report" onClick={() => setSvcPrompt({ name: "Polycam", url: "https://poly.cam/login" })}><b>Polycam</b><span>LiDAR room scans on Pro iPhones. poly.cam</span><span className="reportgo">Tap for steps ↗</span></button>
                  <button className="report" onClick={() => setSvcPrompt({ name: "magicplan", url: "https://cloud.magicplan.app" })}><b>magicplan</b><span>Floor plans straight from your phone. magicplan.app</span><span className="reportgo">Tap for steps ↗</span></button>
                  <button className="report" onClick={() => setSvcPrompt({ name: "Canvas", url: "https://canvas.io/login" })}><b>Canvas</b><span>Contractor-grade LiDAR home scans. canvas.io</span><span className="reportgo">Tap for steps ↗</span></button>
                </div>
                <p className="hint" style={{ textAlign: "center", margin: "4px 0 2px" }}>Tap a service above for simple phone steps. Already have your report?</p>
                <label className="dropzone shot">
                  <input type="file" accept="image/*" style={{ display: "none" }}
                    onChange={(e) => { handleReport(e.target.files[0]); e.target.value = ""; }} />
                  <b>{busy === "report" ? "Reading screenshot…" : "📸 Upload screenshot of measurements"}</b>
                  <span className="dzsub">Take a screenshot of the report, then tap here</span>
                </label>
                <div className="altrow">
                  <label className="altlink">
                    <input type="file" accept="application/pdf,image/*" style={{ display: "none" }}
                      onChange={(e) => { handleReport(e.target.files[0]); e.target.value = ""; }} />
                    Upload PDF instead
                  </label>
                  <button className="altlink" onClick={() => { setPasteOpen(!pasteOpen); setPasteText(""); }}>
                    {pasteOpen ? "Close paste box" : "Paste numbers instead"}
                  </button>
                </div>
                {pasteOpen && (
                  <div className="pastebox">
                    <textarea className="desc" rows={3} value={pasteText} onChange={(e) => setPasteText(e.target.value)}
                      placeholder="e.g. area 2450 sqft, pitch 8/12, eaves 120, ridges 45 — or: kitchen 14x18, living room 16x22, ceilings 8 ft" />
                    <button className="btn primary full" disabled={busy === "report"} onClick={parsePaste}>
                      {busy === "report" ? "Parsing…" : "Parse"}
                    </button>
                  </div>
                )}
              </div>
            )}
            {roofDims && <p className="ai-note">📐 {roofDims}</p>}
          </section>

          {!questions && (
            <button className="btn primary full big" disabled={busy === "ask" || busy === "bid"} onClick={askQuestions}>
              {busy === "ask" ? "Thinking…" : (busy === "bid" ? "Pricing your job…" : "✦ Get my instant bid")}
            </button>
          )}

          {questions && (
            <section className="card qcard">
              <div className="h2">A couple quick questions <span className="hint">helps nail the price — answer what you can</span></div>
              {questions.map((q, i) => (
                <label className="fld" key={i}><span>{q}</span>
                  <input className="in" value={answers[i] || ""} onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })} placeholder="Your answer (optional)" />
                </label>
              ))}
              <div className="btnrow">
                <button className="btn ghost grow1" disabled={busy === "bid"} onClick={getBid}>Skip</button>
                <button className="btn primary grow1" disabled={busy === "bid"} onClick={getBid}>
                  {busy === "bid" ? "Pricing…" : "Get my price"}
                </button>
              </div>
            </section>
          )}

          {bidPreview && (
            <section className="card bidcard">
              <div className="h1">{bidPreview.title}</div>
              <p className="body">{bidPreview.summary}</p>
              <div className="bid-price">{$0(bidPreview.priceLow)} – {$0(bidPreview.priceHigh)}</div>
              <div className="bid-days">≈ {bidPreview.days} day{bidPreview.days !== 1 ? "s" : ""} on site</div>
              {bidPreview.confidence && bidPreview.confidence !== "high" && (
                <div className="tighten">
                  <p className="tightentext">{bidPreview.confidence === "low"
                    ? "This is a rough range — there wasn't quite enough detail to price it tightly."
                    : "This range is solid, but a few more details would tighten it."}
                    {bidPreview.missing && bidPreview.missing.length > 0 && (
                      <span className="tightenmiss"> Most helpful: {bidPreview.missing.join(", ")}.</span>
                    )}
                  </p>
                  <button className="btn ghost full" disabled={busy === "ask" || busy === "bid"} onClick={tightenPrice}>
                    ✎ Answer a few questions for a tighter price
                  </button>
                </div>
              )}
              {/* homeowner sees only the price range above; cost breakdown is contractor-only on the feed card */}
              {bidPreview.includes.length > 0 && (
                <ul className="bid-inc">{bidPreview.includes.map((x, i) => <li key={i}>{x}</li>)}</ul>
              )}
              {bidPreview.usedEstimate && <p className="estflag">📍 Priced using a rough size estimate from the address — add a measurement report for an exact quote.</p>}
              {bidPreview.note && <p className="hint">⚠ {bidPreview.note}</p>}
              {photos.length > 0 && (
                <button className={"privacyaccept" + (privacyOk ? " on" : "")} onClick={() => setPrivacyOk(!privacyOk)}>
                  <span className="pacheck">{privacyOk ? <Check size={15} /> : null}</span>
                  <span className="patext"><b>I understand my photos will be visible to all contractors on CazBid</b> and don't contain faces, license plates, documents, or anything private.</span>
                </button>
              )}
              <button className="btn primary full" disabled={busy === "post"} onClick={postJob}>
                {busy === "post" ? "Posting…" : "Post to local contractors"}
              </button>
            </section>
          )}
        </main>
      )}

      {/* ---------- HOMEOWNER: conversational estimate ---------- */}
      {me.role === "homeowner" && tab === "chat" && !overlay && (
        <main className="page">
          <>
              <JobContextPanel photos={convPhotos} measurements={""} />
              {convBid && (
                <section className="card convbidcard">
                  <div className="convbidtop">
                    <span className="convbidlabel">Running estimate</span>
                    <span className={"convconf " + convBid.confidence}>{convBid.confidence === "high" ? "Dialed in" : convBid.confidence === "medium" ? "Getting close" : "Rough so far"}</span>
                  </div>
                  <div className="bid-price">{$0(convBid.priceLow)} – {$0(convBid.priceHigh)}</div>
                  <div className="bid-days">≈ {convBid.days} day{convBid.days !== 1 ? "s" : ""} on site</div>
                  {convBid.engineBacked && (
                    <div style={{ marginTop: 6 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#0a7d36" }}>✓ Priced by Caza’s estimating engine{convBid.engineScope && convBid.engineScope.length ? " · " + convBid.engineScope.join(", ") : ""}</div>
                      {convBid.disclaimer && <div style={{ fontSize: 11, color: "#667085", marginTop: 2 }}>{convBid.disclaimer}</div>}
                    </div>
                  )}
                  {convBid.chosen ? (
                    <div className="convchosen">
                      <span className="convchosenlbl">✓ Material</span>
                      <span className="convchosenval">{convBid.chosen.tier ? convBid.chosen.tier + " — " : ""}{convBid.chosen.name}</span>
                      <button className="convchosenchg" disabled={convBusy || convDone} onClick={() => setConvBid((b) => b ? { ...b, chosen: null } : b)}>change</button>
                    </div>
                  ) : convBid.primaryOptions && convBid.primaryOptions.length > 0 ? (
                    <div className="convopts">
                      <div className="seclabel">Popular options <span className="hint">tap to choose</span></div>
                      {convBid.primaryOptions.map((o, i) => (
                        <div className="convopt" key={i}>
                          <button className="convoptpick" disabled={convBusy || convDone} onClick={() => convPickTier(o)}>
                            <span className="convopttier">{o.tier}</span>
                            <span className="convoptname">{o.name}{o.why ? " — " + o.why : ""}</span>
                          </button>
                          {o.url && /^https?:\/\//.test(o.url) && <a className="convoptlink" href={o.url} target="_blank" rel="noopener noreferrer">↗</a>}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              )}

              <section className="card convchat">
                <div className="convmsgs">
                  {convMsgs.map((m, i) => (
                    m.role === "ai" ? (
                      <div className="convrow ai" key={i}>
                        <div className="convav"><img className="helperimg sm" src={AL_NOTEPAD} alt="" /></div>
                        <div className="convbubble ai">{m.text}</div>
                      </div>
                    ) : (
                      <div className="convbubble me" key={i}>{m.text}</div>
                    )
                  ))}
                  {convBusy && (
                    <div className="convrow ai">
                      <div className="convav"><img className="helperimg sm" src={AL_NOTEPAD} alt="" /></div>
                      <div className="convbubble ai typing"><span></span><span></span><span></span></div>
                    </div>
                  )}
                  <div ref={convEndRef} />
                </div>

                {!convDone ? (
                  <>
                    {convOptions.length > 0 && !convBusy && (
                      <div className="convchoices">
                        {convOptions.map((opt, i) => (
                          <button className="convchoice" key={i} onClick={() => convPickOption(opt)}>{opt}</button>
                        ))}
                      </div>
                    )}
                    {convPhotos.length > 0 && (
                      <div className="thumbrow">
                        {convPhotos.map((p, i) => (<div className="thumb" key={i}><img src={p} alt="" /><button onClick={() => setConvPhotos((a) => a.filter((_, idx) => idx !== i))}>×</button></div>))}
                      </div>
                    )}
                    <div className="convattach">
                      <label className="attachbtn">
                        <input type="file" accept="image/*" multiple style={{ display: "none" }}
                          onChange={async (e) => { const fs = [...e.target.files]; e.target.value = ""; for (const f of fs.slice(0, 3)) { try { const u = await imageToJpeg(f, 1400); setConvPhotos((p) => [...p, u].slice(0, 3)); } catch (er) { /* skip */ } } }} />
                        <Camera size={15} /> Photo
                      </label>
                      <label className="attachbtn">
                        <input type="file" accept="application/pdf,image/*" style={{ display: "none" }}
                          onChange={(e) => { handleConvReport(e.target.files[0]); e.target.value = ""; }} />
                        <ListChecks size={15} /> Report
                      </label>
                      <button className="attachbtn" onClick={() => setConvReportOpen(!convReportOpen)}><Sparkles size={15} /> Get measured</button>
                    </div>
                    {convReportOpen && (
                      <div className="convreports">
                        <p className="hint">Get an exact measurement report, then upload it with the Report button above:</p>
                        <button className="report" onClick={() => setEstSvcPrompt({ name: "EagleView", url: "https://myev.eagleview.com/place-order" })}><b>EagleView</b><span>Aerial roof report. eagleview.com</span><span className="reportgo">Tap for steps ↗</span></button>
                        <button className="report" onClick={() => setEstSvcPrompt({ name: "GAF QuickMeasure", url: "https://quickmeasure.gaf.com" })}><b>GAF QuickMeasure</b><span>~$25-35 aerial report. gaf.com</span><span className="reportgo">Tap for steps ↗</span></button>
                        <button className="report" onClick={() => setEstSvcPrompt({ name: "Polycam", url: "https://poly.cam/login" })}><b>Polycam</b><span>LiDAR room scans. poly.cam</span><span className="reportgo">Tap for steps ↗</span></button>
                      </div>
                    )}
                    <div className="convinputrow">
                      <input className="in" value={convInput} onChange={(e) => setConvInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") convSend(); }}
                        placeholder={convOptions.length ? "…or type a different answer" : "Type your answer…"} disabled={convBusy} />
                      <button className="convsend" disabled={convBusy || (!convInput.trim() && !(convPhotos.length && !convMsgs.some((m) => m.role === "me")))} onClick={convSend}><Send size={18} /></button>
                    </div>
                  </>
                ) : (
                  <div className="convdone">
                    <p className="hint center" style={{ marginBottom: 10 }}>Looks like I've got a solid price for you. Post it and local pros will apply — you pick who gets the job.</p>
                    <div className="addrvis">
                      <div className="addrvistitle">Address visibility</div>
                      <button className={"addropt" + (!addrPublic ? " on" : "")} onClick={() => setAddrPublic(false)}>
                        <b>Area only <span className="addrtag">private</span></b>
                        <span>Contractors see your town &amp; distance. Your exact address unlocks only for the pro you hire.</span>
                      </button>
                      <button className={"addropt" + (addrPublic ? " on" : "")} onClick={() => setAddrPublic(true)}>
                        <b>Show full address <span className="addrtag accuracy">better bids</span></b>
                        <span>All bidding contractors see your address, so they can check the property and bid more accurately. Visible to everyone who sees your job.</span>
                      </button>
                    </div>
                    {convPhotos.length > 0 && (
                      <button className={"privacyaccept" + (privacyOk ? " on" : "")} onClick={() => setPrivacyOk(!privacyOk)}>
                        <span className="pacheck">{privacyOk ? <Check size={15} /> : null}</span>
                        <span className="patext"><b>I understand my photos will be visible to all contractors on CazBid</b> and don't contain faces, license plates, documents, or anything private.</span>
                      </button>
                    )}
                    <button className="btn primary full" disabled={busy === "post"} onClick={postConvJob}>
                      {busy === "post" ? "Posting…" : "Post to local contractors"}
                    </button>
                    <button className="btn ghost full" onClick={() => setConvDone(false)}>Keep chatting / add detail</button>
                  </div>
                )}
              </section>
              <button className="btn ghost full" onClick={() => setConvConfirmReset(true)}>Start over</button>
            </>
        </main>
      )}

      {/* ---------- HOMEOWNER: my jobs ---------- */}
      {me.role === "homeowner" && tab === "myjobs" && !overlay && (
        <main className="page">
          <div className="pagetitle">My Jobs</div>
          <div className="stats">
            <div className="stat"><b>{hoOpen}</b><span>Open</span></div>
            <div className="stat"><b>{hoMatched}</b><span>Matched</span></div>
            <div className="stat"><b>{hoDone}</b><span>Done</span></div>
          </div>
          <div className="segtabs">
            <button className={"seg" + (jobView === "active" ? " on" : "")} onClick={() => setJobView("active")}>Active</button>
            <button className={"seg" + (jobView === "completed" ? " on" : "")} onClick={() => setJobView("completed")}>History</button>
          </div>
          {(() => { const shown = myJobsHO.filter((j) => jobView === "completed" ? j.status === "complete" : j.status !== "complete"); return (<>
          {shown.length === 0 && <section className="card"><p className="hint">{jobView === "completed" ? "No completed jobs yet — finished jobs and their messages are saved here." : "No active jobs — post one from the New Job tab."}</p></section>}
          {shown.map((j) => {
            const apps = j.applicants || [];
            const chosenU = j.chosen ? users[j.chosen] : null;
            return (
              <section className="card" key={j.id}>
                <div className="cardtop">
                  <div className="grow">
                    <div className="h2tight">{j.title}</div>
                    <div className="hint">{fmtDate(j.createdAt)} · {$0(j.priceLow)}–{$0(j.priceHigh)}</div>
                  </div>
                  <JobPill j={j} />
                </div>

                {j.status === "open" && editJob !== j.id && (
                  <div className="editrow">
                    <button className="linkbtn" onClick={() => openEdit(j)}><Pencil size={13} /> Edit</button>
                    <button className={"linkbtn del" + (confirmDel === j.id ? " arm" : "")} disabled={busy === "del-" + j.id} onClick={() => deleteJob(j)}>
                      <Trash2 size={13} /> {confirmDel === j.id ? "Tap again to delete" : "Delete"}
                    </button>
                  </div>
                )}
                {j.status === "open" && editJob === j.id && (
                  <div className="editbox">
                    <textarea className="desc" rows={3} value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <div className="btnrow">
                      <button className="btn ghost grow1" onClick={() => { setEditJob(null); setEditText(""); }}>Cancel</button>
                      <button className="btn primary grow1" disabled={busy === "edit-" + j.id} onClick={() => saveEdit(j)}>{busy === "edit-" + j.id ? "Saving…" : "Save changes"}</button>
                    </div>
                  </div>
                )}

                {j.status === "open" && apps.length === 0 && <p className="hint">Waiting for interested pros…</p>}
                {j.status === "open" && apps.length > 0 && <p className="good">{apps.length} pro{apps.length !== 1 ? "s" : ""} want{apps.length === 1 ? "s" : ""} this job — pick one:</p>}
                {j.status === "open" && apps.map((a) => {
                  const u = users[a.uid];
                  return (
                    <div className="applicant" key={a.uid}>
                      <Avatar user={u} />
                      <div className="grow" onClick={() => setViewing(a.uid)}>
                        <b>{u ? u.company : a.company}</b>
                        <div className="hint">{u && u.trades ? u.trades + " · " : ""}{appDist[j.id + a.uid] != null ? "~" + appDist[j.id + a.uid] + " mi away · " : ""}{starsOf(coStars, a.uid) || "no ratings yet"} · tap for profile</div>
                      </div>
                      <div className="appbid">
                        <span className="appbidnum">{$0(a.bid || j.price)}</span>
                        <button className="btn choose" disabled={busy === "choose-" + j.id + a.uid} onClick={() => chooseContractor(j, a.uid)}>
                          <Check size={15} /> Hire
                        </button>
                      </div>
                    </div>
                  );
                })}

                {(j.status === "matched" || j.status === "complete") && chosenU && (
                  <div className="applicant" onClick={() => setViewing(j.chosen)}>
                    <Avatar user={chosenU} />
                    <div className="grow">
                      <b>{chosenU.company}</b>
                      <div className="hint">{starsOf(coStars, j.chosen) || "no ratings yet"} · tap for profile</div>
                    </div>
                  </div>
                )}
                {(j.status === "matched" || j.status === "complete") && (
                  <div className="btnrow">
                    <button className={"btn ghost grow1" + (unread[j.id] ? " attn" : "")} onClick={() => openChat(j)}><MessageCircle size={16} /> Message{unread[j.id] ? " (" + unread[j.id] + ")" : ""}</button>
                    {j.status === "matched" && <button className="btn ghost grow1" onClick={() => markDone(j)}><Check size={16} /> Complete</button>}
                  </div>
                )}

                {j.status === "complete" && j.chosen && !(j.ratings && j.ratings.ofContractor) && (
                  <RateBox label={"How did " + (chosenU ? chosenU.company : "the contractor") + " do?"} busy={busy} busyKey={"rate-" + j.id + "ofContractor"}
                    onSubmit={(st, cm) => submitRating(j, "ofContractor", st, cm)} />
                )}
                {j.ratings && j.ratings.ofContractor && (
                  <div className="hint">You rated this pro: {"★".repeat(num(j.ratings.ofContractor.stars))}</div>
                )}
              </section>
            );
          })}
          </>); })()}
        </main>
      )}

      {/* ---------- HOMEOWNER: pros ---------- */}
      {me.role === "homeowner" && tab === "pros" && !overlay && (
        <main className="page">
          <div className="pagetitle">Local Pros</div>
          {pros.length === 0 && busy !== "pros" && (
            <section className="card"><p className="hint">No contractor profiles yet — tell a contractor about CazBid.</p></section>
          )}
          {pros.map((u) => (
            <section className="card prosrow" key={u.uid} onClick={() => setViewing(u.uid)}>
              <Avatar user={u} />
              <div className="grow">
                <b>{u.company}</b>
                <div className="hint">{u.trades}{u.town ? " · " + u.town : ""}</div>
                <div className="hint">{starsOf(coStars, u.uid) || "no ratings yet"}</div>
              </div>
              {u.thumb && <img className="prosthumb" src={u.thumb} alt="" />}
            </section>
          ))}
        </main>
      )}

      {/* ---------- HOMEOWNER: profile ---------- */}
      {me.role === "homeowner" && tab === "profile" && !overlay && (
        <main className="page">
          <div className="pagetitle">Your Profile</div>
          {needsSetup && (
            <section className="card setupbanner">
              <b>Welcome! Set up your profile first</b>
              <span>Add your name and contact below and tap Save profile. Then you can post a job — contractors need a way to reach you.</span>
            </section>
          )}
          <section className="card">
            <div className="profedit">
              <Avatar user={profH} size="xl" onTap={() => document.getElementById("avh").click()} />
              <input id="avh" type="file" accept="image/*" style={{ display: "none" }}
                onChange={(e) => { setAvatar("homeowner", e.target.files[0]); e.target.value = ""; }} />
              <div className="grow">
                <div className="ratingline">{starsOf(hoStars, me.uidH) || "No ratings yet"}</div>
                <div className="hint">Pros see this when you post. Tap the photo to change it.</div>
              </div>
            </div>
            <label className="fld"><span>Name</span>
              <input className="in" value={profH.name} onChange={(e) => setProfH({ ...profH, name: e.target.value })} /></label>
            <label className="fld"><span>Phone or email</span>
              <input className="in" value={profH.contact} onChange={(e) => setProfH({ ...profH, contact: e.target.value })} /></label>
            <label className="fld"><span>Town</span>
              <input className="in" value={profH.town} onChange={(e) => setProfH({ ...profH, town: e.target.value })} placeholder="e.g. Lowville, NY" /></label>
            <label className="fld"><span>Home address <span className="hint">only shared with a pro after you hire them</span></span>
              <input className="in" value={profH.address} onChange={(e) => setProfH({ ...profH, address: e.target.value })} placeholder="123 Maple St, Lowville, NY" /></label>
            <label className="fld"><span>About (optional)</span>
              <textarea className="desc" rows={2} value={profH.bio} onChange={(e) => setProfH({ ...profH, bio: e.target.value })} placeholder="e.g. Easy access, dogs are friendly, home most afternoons" /></label>
            <button className="btn primary full" disabled={busy === "prof"} onClick={() => saveProfile("homeowner")}>
              {busy === "prof" ? "Saving…" : "Save profile"}
            </button>
            <p className="hint center" style={{ marginTop: 8 }}>Edits auto-save as drafts on this phone; Save publishes them. Contact info is only shown to the pro you hire.</p>
          </section>
          <section className="card">
            <div className="h2">Reviews about you</div>
            <ReviewList uid={me.uidH} role="homeowner" emptyText="No reviews yet — pros rate you after completed jobs." />
          </section>
          <div className="chooserbtns">
            <button className="btn ghost grow1" onClick={shareApp}><Share size={15} /> Invite someone</button>
            <button className="btn ghost grow1" onClick={sendFeedback}><MessageSquare size={15} /> Send feedback</button>
          </div>
        </main>
      )}

      {/* ---------- CONTRACTOR: feed ---------- */}
      {me.role === "contractor" && tab === "feed" && !overlay && (
        <main className="page">
          <div className="pagetitle">Job Feed</div>
          {profC.base && profC.base.trim() && (
            <button className={"radpill" + (radiusOn ? " on" : "")} onClick={() => setRadiusOn(!radiusOn)}>
              {radiusOn ? "📍 Within " + (profC.radius || 30) + " mi of " + profC.base + " · tap to show all" : "🌐 Showing all jobs · tap to filter by radius"}
            </button>
          )}
          {diag && <p className="diagline">{diag}{feedJobs.length !== board.filter((j) => j.status === "open").length ? " · some filtered (your own / passed)" : ""}</p>}
          {feedJobs.length === 0 && busy !== "board" && (
            <section className="card emptyfeed">
              <ClipboardList size={34} />
              <b>No open jobs yet</b>
              <span className="hint">Homeowners post around the clock — tap ↻ up top to check again. Know a homeowner with a project? Invite them:</span>
              <button className="btn ghost" onClick={shareApp}><Share size={15} /> Invite a homeowner</button>
            </section>
          )}
          {feedJobs.map((j) => {
            const applied = (j.applicants || []).some((a) => a.uid === me.uidC);
            return (
              <section className="card jobcard" key={j.id}>
                {j.photos && j.photos[0] && <img className="jobimg" src={j.photos[0]} alt="job" />}
                <div className="jobbody">
                  <div className="cardtop">
                    <div className="h2tight grow">{j.title}{j.homeownerUid === me.uidH ? <span className="mine-tag">your post</span> : null}{j.demo ? <span className="mine-tag">demo</span> : null}</div>
                    <JobPill j={j} />
                  </div>
                  <div className="hint">📍 {j.addrPublic && j.address ? j.address : (j.town || "Local area")} · {fmtDate(j.createdAt)} · homeowner {starsOf(hoStars, j.homeownerUid) || "is new"} · {(j.applicants || []).length} interested</div>
                  <div className={"addrbadge " + (j.addrPublic ? "open" : "gated")}>{j.addrPublic ? "📍 Address visible — verify before bidding" : "📍 Area only — exact address shared on hire"}</div>
                  <p className="body">{j.summary || j.desc}</p>
                  {j.roofDims && <p className="ai-note">📐 {j.roofDims}</p>}
                  {j.usedEstimate && !j.roofDims && <p className="estflag">📍 Price based on a rough size estimate (no measurements) — confirm on site.</p>}
                  {(() => {
                    const ml = matLists[j.id];
                    return (
                      <div className="matwrap">
                        {!ml ? (
                          <button className="btn ghost full" disabled={matBusy === j.id} onClick={() => genMaterials(j)}>
                            <ListChecks size={16} /> {matBusy === j.id ? "Building list…" : "Build material list"}
                          </button>
                        ) : (
                          <div className="matlist">
                            <div className="matlhead"><ListChecks size={15} /> Materials & quantities <span className="hint">editable — your estimate</span></div>
                            {ml.items.map((it, i) => (
                              <div className="matrow" key={i}>
                                <input className="in matname" value={it.name} placeholder="Material" onChange={(e) => updateMat(j.id, i, "name", e.target.value)} />
                                <input className="in matqty" value={it.qty} placeholder="Qty" onChange={(e) => updateMat(j.id, i, "qty", e.target.value)} />
                                <button className="matx" onClick={() => removeMatRow(j.id, i)}><X size={14} /></button>
                              </div>
                            ))}
                            <button className="linkbtn" onClick={() => addMatRow(j.id)}>+ Add material</button>
                            {ml.note && <p className="hint">📐 {ml.note}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  {j.cost && (
                    <div className="costbox">
                      <div className="costhead">AI cost basis <span className="hint">(only contractors see this)</span></div>
                      <div className="costrow"><span>Labor — {j.mh || "?"} hrs @ {$0(j.cost.rate)}/hr</span><b>{$0(j.cost.labor)}</b></div>
                      <div className="costrow"><span>Materials</span><b>{$0(j.cost.mats)}</b></div>
                      <div className="costrow"><span>Material tax ({((j.cost.taxRate || 0) * 100).toFixed(1)}%)</span><b>{$0(j.cost.matTax)}</b></div>
                      <div className="costrow"><span>Equipment / disposal</span><b>{$0(j.cost.equip)}</b></div>
                      <div className="costrow total"><span>Est. total cost</span><b>{$0(j.cost.base)}</b></div>
                      <div className="costrow"><span>Suggested range (28–35% GM)</span><b>{$0(j.priceLow)}–{$0(j.priceHigh)}</b></div>
                      <p className="hint" style={{ marginTop: 6 }}>AI estimate{priceLib.length ? " · learning from " + priceLib.length + " past local job" + (priceLib.length !== 1 ? "s" : "") : ""} — trust your own read. Set any price below.</p>
                    </div>
                  )}
                  {(() => {
                    const lo = num(j.priceLow), hi = num(j.priceHigh) || j.price;
                    const ov = bidOverride[j.id];
                    const myBid = ov != null ? ov : (bidPrices[j.id] != null ? bidPrices[j.id] : j.price);
                    const inRangeBid = bidPrices[j.id] != null ? bidPrices[j.id] : j.price;
                    const pct = hi > lo ? Math.round(((inRangeBid - lo) / (hi - lo)) * 100) : 50;
                    return (
                      <>
                        <div className="bidset">
                          <div className="bidsethead">
                            <span className="hint">Your price for this job</span>
                            <span className="bidbig">{$0(myBid)}</span>
                          </div>
                          {!applied ? (
                            <>
                              {ov == null && (
                                <>
                                  <input className="bidslider" type="range" min={lo} max={hi} step="50" value={inRangeBid}
                                    style={{ ["--pct"]: pct + "%" }}
                                    onChange={(e) => setBidPrices({ ...bidPrices, [j.id]: num(e.target.value) })} />
                                  <div className="bidends"><span>{$0(lo)}</span><span className="hint">AI range · ≈{j.mh || "?"} MH · {j.days}d</span><span>{$0(hi)}</span></div>
                              <p className="hint" style={{ marginTop: 6 }}>{j.addrPublic && j.address ? "📍 " + j.address + " — you can verify this property before bidding." : "📍 " + (j.town || "Local area") + " — exact address shared once hired."}</p>
                                </>
                              )}
                              <div className="overriderow">
                                {ov == null ? (
                                  <button className="linkbtn" onClick={() => setBidOverride({ ...bidOverride, [j.id]: inRangeBid })}><Pencil size={13} /> Enter my own price (ignore range)</button>
                                ) : (
                                  <div className="ovbox">
                                    <span className="hint">Your price</span>
                                    <input className="in ovinput" type="number" inputMode="numeric" value={ov}
                                      onChange={(e) => setBidOverride({ ...bidOverride, [j.id]: num(e.target.value) })} />
                                    <button className="linkbtn" onClick={() => { const c = { ...bidOverride }; delete c[j.id]; setBidOverride(c); }}>Use range instead</button>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="hint">You bid {$0((j.applicants || []).find((a) => a.uid === me.uidC) ? (j.applicants.find((a) => a.uid === me.uidC).bid || myBid) : myBid)} — homeowner deciding.</div>
                          )}
                        </div>
                        <div className="btnrow">
                          <button className="btn pass" onClick={() => passJob(j.id)}><X size={16} /> Pass</button>
                          <button className={"btn accept" + (applied ? " did" : "")} disabled={applied || busy === "apply-" + j.id} onClick={() => applyJob(j, myBid)}>
                            {applied ? "✓ Applied" : (busy === "apply-" + j.id ? "Applying…" : "Apply at " + $0(myBid))}
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </section>
            );
          })}
        </main>
      )}

      {/* ---------- CONTRACTOR: my jobs ---------- */}
      {me.role === "contractor" && tab === "myjobs" && !overlay && (
        <main className="page">
          <div className="pagetitle">My Jobs</div>
          {/* ===== JOB COSTING — what each job REALLY cost vs what was figured (contractor-only) ===== */}
          {/* no `capture` attr — iOS then offers BOTH camera and photo library ("take/upload") */}
          <input ref={cjReceiptRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const jid = e.target.dataset.job; onReceiptFile(jid, e.target.files && e.target.files[0]); e.target.value = ""; }} />
          {!cjOpen && (
            <section className="card">
              <div className="h2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>💵 Job costing <button className="btn primary" style={{ padding: "4px 12px", fontSize: 13 }} onClick={cjNew}>＋ New Job</button></div>
              <p className="hint" style={{ marginTop: -2 }}>Receipts, labor, man-hours — compared against what you figured and what CazBid estimated.</p>
              {costJobs.length === 0 && <p className="hint">No jobs yet. Tap ＋ New Job — or build an estimate; every saved estimate creates its job here automatically.</p>}
              {costJobs.map((j) => { const a = cjTotals(j); return (
                <button type="button" key={j.id} style={{ display: "flex", width: "100%", textAlign: "left", alignItems: "center", gap: 8, background: "transparent", border: "none", borderBottom: "1px solid #f0f0f0", padding: "8px 2px", cursor: "pointer" }} onClick={() => { setCjDraft(null); setCjHoursDraft(null); setCjPbPick(null); setCjEstPick(null); setCjCoDraft(null); setCjOpen(j.id); }}>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <b style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: 13.5 }}>{j.name}{j.status === "closed" ? " · ✓ closed" : ""}</b>
                    <span className="hint" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[j.customerName, j.address, j.estimateId ? (j.afterTheFact ? "estimate (after the fact)" : "estimate ✓") : "no estimate"].filter(Boolean).join(" · ")}</span>
                  </span>
                  <b style={{ whiteSpace: "nowrap", fontSize: 13 }}>{a.total > 0 ? $0(a.total) : "—"}{a.contract > 0 ? <span className="hint"> / {$0(a.contract)}</span> : null}</b>
                </button>
              ); })}
            </section>
          )}
          {cjOpen && (() => {
            const job = costJobs.find((j) => j.id === cjOpen);
            if (!job) return null;
            const act = cjTotals(job);
            const rec = job.estimateId ? estimates.find((e) => e.id === job.estimateId) : null;
            const est = rec ? cjEstVals(rec) : null;
            const plan = cjPlanVals(job);
            const bid = plan || est;
            const cols = [plan ? { k: "My figures", note: plan.withCOs ? "incl. COs" : null, v: plan } : null, est ? { k: "CazBid est.", v: est } : null, { k: "Actual", v: act }].filter(Boolean);
            const vCell = (bidV, actV, k) => { const v = cjVar(bidV, actV); if (!v) return null; const mag = Math.abs(v.d).toLocaleString(); return <div style={{ color: v.d > 0 ? "#b3261e" : "#1B7A3D", fontWeight: 600, fontSize: 10.5 }}>{(v.d < 0 ? "-" : "+") + (k === "mh" ? mag + " MH" : "$" + mag)} ({v.pct > 0 ? "+" : ""}{v.pct}%)</div>; };
            const today = new Date().toISOString().slice(0, 10);
            return (
              <section className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button className="btn ghost" style={{ padding: "3px 9px" }} onClick={() => { setCjOpen(null); setCjDraft(null); setCjHoursDraft(null); setCjPbPick(null); setCjEstPick(null); setCjCoDraft(null); }}>←</button>
                  <b style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer" }} onClick={() => { const n = window.prompt("Job name", job.name); if (n && n.trim()) cjUpdate(job.id, (j) => { j.name = n.trim(); }); }}>{job.name} ✏️</b>
                  {job.status === "closed" && <span style={{ fontSize: 11.5, fontWeight: 700, color: "#1B7A3D" }}>✓ closed</span>}
                  <button className="btn ghost" style={{ padding: "3px 8px" }} title="Delete job" onClick={() => cjDelete(job.id)}>🗑</button>
                </div>
                <div className="estfields" style={{ marginTop: 8 }}>
                  <label className="estf"><span>Customer</span><input value={job.customerName || ""} onChange={(e) => cjUpdate(job.id, (j) => { j.customerName = e.target.value; })} placeholder="name" /></label>
                  <label className="estf"><span>Address / town</span><input value={job.address || ""} onChange={(e) => cjUpdate(job.id, (j) => { j.address = e.target.value; })} placeholder="address" /></label>
                  <label className="estf"><span>Trade</span>
                    <select value={job.trade || ""} onChange={(e) => cjUpdate(job.id, (j) => { j.trade = e.target.value; })}>
                      <option value="">—</option>
                      {PRICE_BOOK_TRADES.map((t) => <option key={t.trade} value={t.trade}>{t.label}</option>)}
                    </select>
                  </label>
                </div>
                {/* MY BID FIGURES — Dustin's own numbers, independent of any AI estimate */}
                <div className="seclabel" style={{ marginTop: 10 }}>My bid figures <span className="hint">your numbers — not the AI's</span></div>
                <div className="estfields">
                  <label className="estf"><span>Materials $</span><input {...cjNumField(job, "pmats", () => job.planned.mats, (j, v) => { j.planned.mats = v; })} /></label>
                  <label className="estf"><span>Labor $</span><input {...cjNumField(job, "plabor", () => job.planned.labor, (j, v) => { j.planned.labor = v; })} /></label>
                  <label className="estf"><span>Man-hours</span><input {...cjNumField(job, "pmh", () => job.planned.mh, (j, v) => { j.planned.mh = v; })} /></label>
                  <label className="estf"><span>Contract price $</span><input {...cjNumField(job, "pcontract", () => job.planned.contract, (j, v) => { j.planned.contract = v; })} /></label>
                </div>
                {/* CHANGE ORDERS — mid-job scope changes; only APPROVED ones touch the math (drafts parked) */}
                <div className="seclabel" style={{ marginTop: 10 }}>Change orders {act.coCount > 0 && <span className="hint">{act.coCount} approved · +{$0(act.coPrice)}</span>}</div>
                {(job.changeOrders || []).map((c) => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 2px", borderBottom: "1px solid #f0f0f0" }}>
                    {c.photo ? <img src={c.photo} alt="" style={{ width: 34, height: 34, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} /> : <span style={{ width: 34, textAlign: "center" }}>🔀</span>}
                    <span style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => setCjCoDraft({ jobId: job.id, ...c })}>
                      <b style={{ display: "block", fontSize: 12.5 }}>{c.title}</b>
                      <span className="hint" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[c.date, c.status === "approved" ? (c.approvedNote || "approved") : null, c.description].filter(Boolean).join(" · ")}</span>
                    </span>
                    <b style={{ whiteSpace: "nowrap" }}>+{$0(c.price)}</b>
                    {c.status === "approved"
                      ? <span style={{ fontSize: 10.5, fontWeight: 700, color: "#1B7A3D", background: "#EAF6EE", borderRadius: 7, padding: "1px 7px" }}>Approved</span>
                      : <button className="btn ghost" style={{ padding: "2px 8px", fontSize: 11.5 }} onClick={() => cjApproveCo(job.id, c.id)}>Mark approved</button>}
                    <button className="btn ghost" style={{ padding: "2px 6px" }} onClick={() => { if (window.confirm("Delete this change order?")) cjDelCo(job.id, c.id); }}>✕</button>
                  </div>
                ))}
                {cjCoDraft && cjCoDraft.jobId === job.id ? (
                  <div style={{ border: "1px solid #DCE8DF", background: "#F6F8F7", borderRadius: 10, padding: "8px 10px", margin: "6px 0" }}>
                    <input ref={cjCoPhotoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { onCoPhotoFile(e.target.files && e.target.files[0]); e.target.value = ""; }} />
                    <label className="estf"><span>Title</span><input value={cjCoDraft.title || ""} onChange={(e) => setCjCoDraft({ ...cjCoDraft, title: e.target.value })} placeholder="Replace rotted decking" /></label>
                    <div className="estfields" style={{ alignItems: "end", marginTop: 4 }}>
                      <label className="estf"><span>Price to customer $</span><input type="number" step="0.01" value={cjCoDraft.price || ""} onChange={(e) => setCjCoDraft({ ...cjCoDraft, price: e.target.value })} /></label>
                      <label className="estf"><span>Date</span><input type="date" value={cjCoDraft.date || new Date().toISOString().slice(0, 10)} onChange={(e) => setCjCoDraft({ ...cjCoDraft, date: e.target.value })} /></label>
                    </div>
                    <label className="estf" style={{ marginTop: 4 }}><span>Detail <span className="hint">optional</span></span><input value={cjCoDraft.description || ""} onChange={(e) => setCjCoDraft({ ...cjCoDraft, description: e.target.value })} placeholder={"12 sheets 1/2\" CDX, found on tear-off"} /></label>
                    <div className="estfields" style={{ alignItems: "end", marginTop: 4 }}>
                      <label className="estf"><span>Exp. materials $ <span className="hint">opt</span></span><input type="number" value={cjCoDraft.expMaterials || ""} onChange={(e) => setCjCoDraft({ ...cjCoDraft, expMaterials: e.target.value })} /></label>
                      <label className="estf"><span>Exp. labor $ <span className="hint">opt</span></span><input type="number" value={cjCoDraft.expLabor || ""} onChange={(e) => setCjCoDraft({ ...cjCoDraft, expLabor: e.target.value })} /></label>
                      <label className="estf"><span>Exp. MH <span className="hint">opt</span></span><input type="number" value={cjCoDraft.expManHours || ""} onChange={(e) => setCjCoDraft({ ...cjCoDraft, expManHours: e.target.value })} /></label>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
                      <button className="btn ghost" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => cjCoPhotoRef.current && cjCoPhotoRef.current.click()}>📷 {cjCoDraft.photo ? "Replace photo" : "Photo (condition / signed slip)"}</button>
                      {cjCoDraft.photo && <img src={cjCoDraft.photo} alt="" style={{ width: 30, height: 30, objectFit: "cover", borderRadius: 6 }} />}
                      {cjCoDraft.id && cjCoDraft.status === "approved" && <button className="btn ghost" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => setCjCoDraft({ ...cjCoDraft, status: "draft", approvedDate: null, approvedNote: "" })}>↩ Revert to draft</button>}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <button className="btn primary grow1" onClick={cjSaveCo}>✓ Save change order</button>
                      <button className="btn ghost" onClick={() => setCjCoDraft(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button className="btn ghost full" style={{ marginTop: 4 }} onClick={() => { setCjDraft(null); setCjPbPick(null); setCjEstPick(null); setCjCoDraft({ jobId: job.id, title: "", description: "", price: "", expMaterials: "", expLabor: "", expManHours: "", photo: null, status: "draft" }); }}>＋ Change order <span className="hint">approved COs adjust contract + figures</span></button>
                )}
                {/* ESTIMATE VS ACTUAL — the payoff: up to three columns, variance colored, verdict on top */}
                {(act.total > 0 || bid) && (
                  <div style={{ marginTop: 10, padding: "9px 11px", background: "#F4F8F5", border: "1px solid #DCE8DF", borderRadius: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: 12.5 }}>Estimate vs Actual</div>
                    {(() => { const v = cjVerdict(plan, est, act); return v ? <div style={{ fontSize: 12.5, margin: "3px 0 6px" }}>{v}</div> : null; })()}
                    {act.coPrice > 0 && <div style={{ fontSize: 12, margin: "0 0 6px" }}>Contract {$0(act.baseContract)} <span style={{ color: "#1B7A3D", fontWeight: 700 }}>(+{$0(act.coPrice)} COs)</span> = <b>{$0(act.contract)}</b></div>}
                    <div style={{ display: "grid", gridTemplateColumns: "1.1fr " + cols.map(() => "1fr").join(" "), gap: "3px 6px", fontSize: 12, alignItems: "start" }}>
                      <span></span>{cols.map((c) => <b key={c.k} style={{ textAlign: "right", fontSize: 11 }}>{c.k}{c.note ? <div className="hint" style={{ fontSize: 9.5, fontWeight: 400 }}>{c.note}</div> : null}</b>)}
                      {[["Materials", "mats", (v) => $0(v)], ["Labor", "labor", (v) => $0(v)], ["Man-hours", "mh", (v) => v + " MH"], ["Other costs", "other", (v) => $0(v)], ["Total cost", "total", (v) => $0(v)], ["Margin", "margin", (v) => v + "%"]].map(([lbl, k, fmt]) => (
                        <React.Fragment key={k}>
                          <span className="hint">{lbl}</span>
                          {cols.map((c, i) => { const v = c.v[k]; const isAct = i === cols.length - 1; const show = v != null && (k === "margin" ? true : (v > 0 || (isAct && (k === "total" || (bid && bid[k] > 0))))); return (
                            <span key={c.k} style={{ textAlign: "right" }}>{show ? fmt(v) : "—"}{isAct && bid && k !== "other" && k !== "margin" && show ? vCell(bid[k], v, k) : null}</span>
                          ); })}
                        </React.Fragment>
                      ))}
                    </div>
                    {act.marginSuspect && <div style={{ fontSize: 12, color: "#8A5A12", fontWeight: 600, marginTop: 5 }}>⚠️ Margin looks off — check the contract price ({$0(act.contract)} contract vs {$0(act.total)} cost).</div>}
                  </div>
                )}
                {/* COSTS — receipts + manual entries; per-category totals live in the comparison above */}
                <div className="seclabel" style={{ marginTop: 10 }}>Costs <span className="hint">{(job.costs || []).length} entr{(job.costs || []).length === 1 ? "y" : "ies"}{act.total > 0 ? " · " + $0(act.total) + " total" : ""}</span></div>
                {job.laborFromHours && act.laborComputed > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 2px", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ width: 34, textAlign: "center" }}>⚙</span>
                    <span style={{ flex: 1 }}><b style={{ fontSize: 12.5 }}>Labor — computed from hours</b><span className="hint" style={{ display: "block" }}>{act.mh} MH × {$0(job.burdenRate)}/hr{act.laborEntries > 0 ? " (Labor entries ignored: " + $0(act.laborEntries) + ")" : ""}</span></span>
                    <b>{$0(act.laborComputed)}</b>
                  </div>
                )}
                {(job.costs || []).map((c) => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 2px", borderBottom: "1px solid #f0f0f0" }}>
                    {c.photo ? <img src={c.photo} alt="" style={{ width: 34, height: 34, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} /> : <span style={{ width: 34, textAlign: "center" }}>{c.source === "receipt" ? "🧾" : "✎"}</span>}
                    <span style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => setCjDraft({ jobId: job.id, editId: c.id, vendor: c.vendor || "", date: c.date || today, amount: c.amount, category: c.category, note: c.note || "", source: c.source, confidence: "high", photo: c.photo || null })}>
                      <b style={{ display: "block", fontSize: 12.5 }}>{c.vendor || c.category}</b>
                      <span className="hint" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[c.date, c.category, c.note].filter(Boolean).join(" · ")}</span>
                    </span>
                    {c.crew && <span style={{ fontSize: 10.5, fontWeight: 800, background: "#E4F2E9", color: "#14532d", borderRadius: 8, padding: "2px 7px", whiteSpace: "nowrap" }}>👷 {c.crew}</span>}
                    <b style={{ whiteSpace: "nowrap" }}>{$0(c.amount)}</b>
                    <button className="btn ghost" style={{ padding: "2px 6px" }} onClick={() => cjDelCost(job.id, c.id)}>✕</button>
                  </div>
                ))}
                {cjDraft && cjDraft.jobId === job.id && (
                  <div style={{ border: "1px solid " + (cjDraft.confidence === "low" ? "#F2C98A" : "#DCE8DF"), background: cjDraft.confidence === "low" ? "#FFF7E6" : "#F6F8F7", borderRadius: 10, padding: "8px 10px", margin: "6px 0" }}>
                    {cjDraft.source === "receipt" && !cjDraft.editId && <div className="hint" style={{ fontWeight: 600, marginBottom: 4 }}>{cjDraft.confidence === "low" ? "⚠️ Hard to read — check everything before saving:" : "Read from the receipt — confirm:"}</div>}
                    <div className="estfields" style={{ alignItems: "end" }}>
                      <label className="estf"><span>Amount $</span><input type="number" step="0.01" value={cjDraft.amount || ""} onChange={(e) => setCjDraft({ ...cjDraft, amount: e.target.value })} /></label>
                      <label className="estf"><span>Category</span><select value={cjDraft.category} onChange={(e) => setCjDraft({ ...cjDraft, category: e.target.value })}>{CJ_CATS.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
                      <label className="estf"><span>Vendor</span><input value={cjDraft.vendor} onChange={(e) => setCjDraft({ ...cjDraft, vendor: e.target.value })} placeholder="ABC Supply" /></label>
                      <label className="estf"><span>Date</span><input type="date" value={cjDraft.date} onChange={(e) => setCjDraft({ ...cjDraft, date: e.target.value })} /></label>
                    </div>
                    <label className="estf" style={{ marginTop: 4 }}><span>Note</span><input value={cjDraft.note} onChange={(e) => setCjDraft({ ...cjDraft, note: e.target.value })} placeholder="what was bought" /></label>
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <button className="btn primary grow1" onClick={cjSaveDraft}>✓ Save cost</button>
                      <button className="btn ghost" onClick={() => setCjDraft(null)}>Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                  <button className="btn ghost grow1" disabled={cjReceiptBusy} onClick={() => { setCjPbPick(null); setCjEstPick(null); cjOpenReceipt(job.id); }}>{cjReceiptBusy ? "Reading receipt…" : "🧾 Receipt photo"}</button>
                  <button className="btn ghost grow1" onClick={() => { setCjPbPick(null); setCjEstPick(null); cjManualEntry(job.id); }}>＋ Manual entry</button>
                  <button className="btn ghost grow1" onClick={() => { setCjDraft(null); setCjEstPick(null); setCjPbPick({ jobId: job.id, q: "" }); }}>📗 From price book</button>
                  {rec && <button className="btn ghost grow1" onClick={() => { setCjDraft(null); setCjPbPick(null); setCjEstPick({ jobId: job.id, checked: {} }); }}>📄 From estimate</button>}
                </div>
                {/* FROM PRICE BOOK — search the merged book, qty × price (override = this entry only, never the book) */}
                {cjPbPick && cjPbPick.jobId === job.id && (
                  <div style={{ border: "1px solid #DCE8DF", background: "#F6F8F7", borderRadius: 10, padding: "8px 10px", margin: "6px 0" }}>
                    {!cjPbPick.item ? (
                      <div>
                        <input className="in" value={cjPbPick.q || ""} onChange={(e) => setCjPbPick({ ...cjPbPick, q: e.target.value })} placeholder="🔍 Search your price book… (e.g. hdz)" />
                        {(() => {
                          const book = contractorPriceBook();
                          if (!book.length) return <p className="hint" style={{ marginTop: 6 }}>Your price book is empty — add prices in Profile → Pricing.</p>;
                          const q = (cjPbPick.q || "").trim().toLowerCase();
                          const rows = (q ? book.filter((b) => b.name.toLowerCase().includes(q)) : book).slice(0, 30);
                          return (
                            <div style={{ maxHeight: 220, overflowY: "auto", marginTop: 6 }}>
                              {rows.map((b, i) => (
                                <button type="button" key={i} style={{ display: "flex", width: "100%", alignItems: "center", gap: 8, background: "transparent", border: "none", borderBottom: "1px solid #eceeed", padding: "6px 2px", cursor: "pointer", textAlign: "left", fontSize: 12.5 }} onClick={() => setCjPbPick({ ...cjPbPick, item: b, qty: "", price: b.cost })}>
                                  <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.name}</span>
                                  <b style={{ whiteSpace: "nowrap" }}>{$0(b.cost)}{b.unit ? <span className="hint">/{b.unit}</span> : null}</b>
                                </button>
                              ))}
                              {rows.length === 0 && <p className="hint">No match for “{cjPbPick.q}”.</p>}
                            </div>
                          );
                        })()}
                        <button className="btn ghost full" style={{ marginTop: 6, padding: "3px 8px", fontSize: 12 }} onClick={() => setCjPbPick(null)}>▴ Close</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 12.5 }}>{cjPbPick.item.name}</div>
                        <div className="estfields" style={{ alignItems: "end", marginTop: 4 }}>
                          <label className="estf"><span>Qty{cjPbPick.item.unit ? " (" + cjPbPick.item.unit + ")" : ""}</span><input type="number" step="0.1" value={cjPbPick.qty} onChange={(e) => setCjPbPick({ ...cjPbPick, qty: e.target.value })} /></label>
                          <label className="estf"><span>$/{cjPbPick.item.unit || "unit"} <span className="hint">this entry only</span></span><input type="number" step="0.01" value={cjPbPick.price} onChange={(e) => setCjPbPick({ ...cjPbPick, price: e.target.value })} /></label>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: 13.5, margin: "4px 0" }}>= {$0((num(cjPbPick.qty) || 0) * (num(cjPbPick.price) || 0))}</div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn primary grow1" onClick={cjSavePbEntry}>✓ Save cost</button>
                          <button className="btn ghost" onClick={() => setCjPbPick({ jobId: job.id, q: cjPbPick.q || "" })}>← Back</button>
                          <button className="btn ghost" onClick={() => setCjPbPick(null)}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* FROM ESTIMATE TAKEOFF — explicit checkboxes only; never auto-copied into actuals */}
                {cjEstPick && cjEstPick.jobId === job.id && rec && rec.payload && (
                  <div style={{ border: "1px solid #DCE8DF", background: "#F6F8F7", borderRadius: 10, padding: "8px 10px", margin: "6px 0" }}>
                    <div className="hint" style={{ fontWeight: 600 }}>Check estimate lines to copy as cost entries — then adjust each to what you actually paid:</div>
                    <div style={{ maxHeight: 220, overflowY: "auto", marginTop: 4 }}>
                      {(rec.payload.trades || []).map((t, ti) => (t.items || []).map((it, ii) => { const k = ti + ":" + ii; return (
                        <label key={k} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 2px", fontSize: 12.5, cursor: "pointer" }}>
                          <input type="checkbox" checked={!!cjEstPick.checked[k]} onChange={(e) => setCjEstPick({ ...cjEstPick, checked: { ...cjEstPick.checked, [k]: e.target.checked } })} />
                          <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name} <span className="hint">{it.qty} {it.unit}</span></span>
                          <b>{$0(it.cost)}</b>
                        </label>
                      ); }))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <button className="btn primary grow1" onClick={() => cjSaveEstPick(job, rec)}>✓ Copy {Object.values(cjEstPick.checked).filter(Boolean).length} checked</button>
                      <button className="btn ghost" onClick={() => setCjEstPick(null)}>Cancel</button>
                    </div>
                  </div>
                )}
                {/* MAN-HOURS LOG — the number that calibrates the rate book */}
                <div className="seclabel" style={{ marginTop: 10 }}>Man-hours log <span className="hint">total {act.mh} MH</span></div>
                {(job.hoursLog || []).map((h) => (
                  <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 2px", borderBottom: "1px solid #f0f0f0", fontSize: 12.5 }}>
                    <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.date}{h.guys > 0 && h.hrs > 0 ? " · " + h.guys + " guys × " + h.hrs + " hrs" : ""}{h.note ? " · " + h.note : ""}{h.crew ? <span style={{ fontSize: 10.5, fontWeight: 800, background: "#E4F2E9", color: "#14532d", borderRadius: 8, padding: "1px 7px", marginLeft: 6 }}>👷 {h.crew}</span> : null}</span>
                    <b>{h.mh} MH</b>
                    <button className="btn ghost" style={{ padding: "2px 6px" }} onClick={() => cjDelHours(job.id, h.id)}>✕</button>
                  </div>
                ))}
                {cjHoursDraft && cjHoursDraft.jobId === job.id ? (
                  <div style={{ marginTop: 4 }}>
                    <div className="estfields" style={{ alignItems: "end" }}>
                      <label className="estf"><span>Date</span><input type="date" value={cjHoursDraft.date} onChange={(e) => setCjHoursDraft({ ...cjHoursDraft, date: e.target.value })} /></label>
                      <label className="estf"><span>Guys</span><input type="number" value={cjHoursDraft.guys} onChange={(e) => setCjHoursDraft({ ...cjHoursDraft, guys: e.target.value })} placeholder="3" /></label>
                      <label className="estf"><span>Hrs each</span><input type="number" step="0.5" value={cjHoursDraft.hrs} onChange={(e) => setCjHoursDraft({ ...cjHoursDraft, hrs: e.target.value })} placeholder="8" /></label>
                      <label className="estf"><span>MH <span className="hint">auto or type</span></span><input type="number" step="0.5" value={cjHoursDraft.mh} onChange={(e) => setCjHoursDraft({ ...cjHoursDraft, mh: e.target.value })} placeholder={String((num(cjHoursDraft.guys) || 0) * (num(cjHoursDraft.hrs) || 0) || "")} /></label>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                      <button className="btn primary grow1" onClick={cjSaveHours}>✓ Log hours</button>
                      <button className="btn ghost" onClick={() => setCjHoursDraft(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button className="btn ghost full" style={{ marginTop: 4 }} onClick={() => setCjHoursDraft({ jobId: job.id, date: today, guys: "", hrs: "", mh: "" })}>＋ Log hours <span className="hint">e.g. 3 guys × 8 hrs = 24 MH</span></button>
                )}
                <div style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap", marginTop: 6 }}>
                  <label className="estf" style={{ maxWidth: 150 }}><span>Burdened $/hr</span><input {...cjNumField(job, "burdenRate", () => job.burdenRate, (j, v) => { j.burdenRate = v; })} placeholder={String(cazaCrewRate(job.trade || job.name, "", profC.cazaManual) || 50)} /></label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, paddingBottom: 6 }}>
                    <input type="checkbox" checked={!!job.laborFromHours} onChange={(e) => cjUpdate(job.id, (j) => { j.laborFromHours = e.target.checked; if (e.target.checked && !(num(j.burdenRate) > 0)) j.burdenRate = cazaCrewRate(j.trade || j.name, "", profC.cazaManual) || 50; })} />
                    Compute labor $ from hours
                  </label>
                </div>
                {/* ESTIMATE — attached (before or after the fact) or offered */}
                {rec ? (
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
                    <span className="hint" style={{ flex: 1, minWidth: 0 }}>📄 {job.afterTheFact ? "After-the-fact estimate" : "Estimate"} attached — {rec.title || ""} · {$0(rec.price || 0)}</span>
                    <button className="btn ghost" style={{ padding: "3px 10px" }} onClick={() => { openSavedEstimate(rec); goTab("estimator"); }}>Open</button>
                  </div>
                ) : (
                  <button className="btn ghost full" style={{ marginTop: 8 }} onClick={() => cjEstimateJob(job)}>🧮 Estimate this job <span className="hint">what would CazBid have bid?</span></button>
                )}
                {/* CREW APP — link this job so the crew's phones can log costs/hours/timers against it */}
                {job.crewPin ? (
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8, padding: "8px 11px", background: "#F2FBF5", border: "1px solid #BFE6CC", borderRadius: 10, fontSize: 12.5 }}>
                    <span style={{ flex: 1, minWidth: 0 }}>👷 Crew code: <b>{job.crewPin}</b> <span className="hint">— crew joins at cazbid-crew.netlify.app; their entries land on this job</span></span>
                    <button className="btn ghost" style={{ padding: "3px 9px" }} onClick={() => { try { navigator.clipboard.writeText(job.crewPin); flash("Code copied."); } catch (e) {} }}>Copy</button>
                    <button className="btn ghost" style={{ padding: "3px 9px" }} onClick={() => cjCrewLink(job)}>Change</button>
                  </div>
                ) : (
                  <button className="btn ghost full" style={{ marginTop: 8 }} onClick={() => cjCrewLink(job)}>👷 Link to crew app <span className="hint">make a crew code for this job</span></button>
                )}
                {/* CREW ACTIVITY — the crew log, live; Pull merges new entries into this job's actuals */}
                {job.crewPin && (() => {
                  const cl = (cjCrewLog && cjCrewLog.jobId === job.id) ? cjCrewLog : null;
                  const entries = (cl && cl.entries) || [];
                  const fresh = entries.filter((e) => e && e.id && !((job.crewImported || {})[e.id]));
                  return (
                    <div style={{ marginTop: 8, padding: "9px 11px", background: "#F4F8F5", border: "1px solid #DCE8DF", borderRadius: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <b style={{ flex: 1, fontSize: 12.5 }}>👷 Crew activity {cl && cl.busy ? <span className="hint">loading…</span> : <span className="hint">{entries.length} entr{entries.length === 1 ? "y" : "ies"}{fresh.length ? " · " + fresh.length + " new" : ""}</span>}</b>
                        <button className="btn ghost" style={{ padding: "2px 9px", fontSize: 11.5 }} onClick={() => fetchCrewLog(job)}>↻</button>
                      </div>
                      {cl && cl.err && <div className="hint" style={{ color: "#8A5A12", marginTop: 3 }}>Couldn't load: {cl.err}</div>}
                      {entries.slice(0, 25).map((e) => (
                        <div key={e.id} style={{ display: "flex", gap: 7, alignItems: "center", padding: "4px 0", borderBottom: "1px solid #e7ece8", fontSize: 12 }}>
                          <span style={{ width: 20, textAlign: "center" }}>{e.kind === "cost" ? "🧾" : e.kind === "timer" ? "⏱" : e.kind === "hours" ? "🕐" : "🔀"}</span>
                          <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <b>{e.crewName || "crew"}</b> — {e.kind === "cost" ? $0(e.amount) + " " + (e.category || "") + (e.supplier ? " · " + e.supplier : "") : e.kind === "timer" ? (e.task || "task") + " — " + (e.manHours || 0) + " MH" + (num(e.qty) > 0 ? " / " + e.qty + " " + e.unit : "") : e.kind === "hours" ? (e.manHours || 0) + " MH" : "CO: " + String(e.description || "").slice(0, 50)}
                            <span className="hint"> · {String(e.at || e.receivedAt || "").slice(5, 16).replace("T", " ")}</span>
                          </span>
                          {!((job.crewImported || {})[e.id]) && <span style={{ fontSize: 9.5, fontWeight: 700, color: "#8A5A12" }}>new</span>}
                        </div>
                      ))}
                      {entries.length === 0 && !(cl && cl.busy) && <div className="hint" style={{ marginTop: 3 }}>Nothing logged by the crew yet.</div>}
                      {fresh.length > 0 && <button className="btn primary full" style={{ marginTop: 6 }} onClick={() => cjPullCrew(job)}>⇩ Pull {fresh.length} new into job costing <span className="hint" style={{ color: "#fff", opacity: .85 }}>costs · hours · COs as drafts</span></button>}
                    </div>
                  );
                })()}
                {/* CLOSE + CALIBRATION — actuals flow into the EXISTING logActuals loop + rate-book blend */}
                {job.status !== "closed" ? (
                  <button className="btn primary full" style={{ marginTop: 8 }} onClick={() => cjCloseJob(job)}>✓ Close job{act.total > 0 ? " — lock in " + $0(act.total) + " actual" : ""}</button>
                ) : (() => {
                  const sys = ((rec && rec.payload && rec.payload.trades[0] && (rec.payload.trades[0].phaseSys || rec.payload.trades[0].title)) || job.trade || job.name || "").toLowerCase();
                  const task = (() => {
                    const kws = /standing.?seam|\blok\b/.test(sys) ? ["standing seam"] : /slate/.test(sys) ? ["slate"] : /shake/.test(sys) ? ["shake"] : /shingle|asphalt|roof/.test(sys) ? ["shingle install", "shingle"] : /vinyl|siding|hardie/.test(sys) ? ["siding install", "vinyl siding", "siding"] : /deck|trex/.test(sys) ? ["decking"] : null;
                    if (!kws) return null;
                    for (const r of rateBook) { const t = (r.task || "").toLowerCase(); for (const k of kws) { if (t.indexOf(k) >= 0) return r; } }
                    return null;
                  })();
                  const calibKeyJob = manualTradeKey((job.trade || "") + " " + (job.name || ""), (rec && rec.title) || "") || job.trade || "";
                  return (
                    <div style={{ marginTop: 8, padding: "9px 11px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5 }}>
                      <div style={{ fontWeight: 800 }}>📈 Calibration</div>
                      {job.actualPerUnit && <div style={{ marginTop: 3 }}>This job ran <b>{job.actualPerUnit.mhPerUnit} MH/{job.actualPerUnit.unit}</b> on {job.actualPerUnit.qty} {job.actualPerUnit.unit}{job.actualPerUnit.bidPerUnit ? <> — the bid figured <b>{job.actualPerUnit.bidPerUnit} MH/{job.actualPerUnit.unit}</b> all-in</> : null}{task ? <span className="hint"> (rate book task “{task.task}”: {task.rate} MH/{task.unit})</span> : null}.</div>}
                      {job.actualPerUnit && task && est && est.mh > 0 && act.mh > 0 && (() => {
                        // scale the task rate by the DAMPED actual/bid ratio (an on-bid job blends to no change) —
                        // never average whole-job MH/sq into a single-task rate (they're different denominators)
                        const nr = Math.round(num(task.rate) * ((2 + act.mh / est.mh) / 3) * 100) / 100;
                        return nr !== num(task.rate) ? (
                          <button className="btn ghost full" style={{ marginTop: 6 }} onClick={() => { saveRateBook(rateBook.map((r) => r.id === task.id ? { ...r, rate: nr } : r)); flash("“" + task.task + "” blended: " + task.rate + " → " + nr + " MH/" + task.unit + "."); }}>⇄ Blend into rate book ({task.rate} → {nr} MH/{task.unit})</button>
                        ) : <div className="hint" style={{ marginTop: 4 }}>✓ On the bid — no rate-book change needed.</div>;
                      })()}
                      {est && est.mh > 0 && act.mh > 0 && calibKeyJob && (
                        <button className="btn ghost full" style={{ marginTop: 6 }} onClick={() => logActuals(calibKeyJob, est.mh, act.mh, job.name)}>📊 Log to labor calibration <span className="hint">bid {est.mh} MH → actual {act.mh} MH ({calibKeyJob})</span></button>
                      )}
                      {!job.actualPerUnit && !(est && est.mh > 0) && <div className="hint" style={{ marginTop: 3 }}>Attach an estimate (or log hours before closing) to compare actual rates against the book.</div>}
                      <button className="btn ghost full" style={{ marginTop: 6 }} onClick={() => cjUpdate(job.id, (j) => { j.status = "active"; })}>↩ Reopen job</button>
                    </div>
                  );
                })()}
              </section>
            );
          })()}
          {needsSetup && (
            <section className="card setupbanner">
              <b>Welcome! Set up your profile first</b>
              <span>Head to the <b>Profile</b> tab, add your company name and trades, and Save — homeowners pick contractors from their profiles. Then browse the <b>Feed</b> to bid on jobs.</span>
            </section>
          )}
          <div className="stats">
            <button className={"stat" + (jobView === "applied" ? " on" : "")} onClick={() => setJobView("applied")}><b>{myJobsCO.length}</b><span>Applied</span></button>
            <button className={"stat" + (jobView === "won" ? " on" : "")} onClick={() => setJobView("won")}><b>{wonCount}</b><span>Won</span></button>
            <button className={"stat" + (jobView === "reviews" ? " on" : "")} onClick={() => setJobView("reviews")}><b>{(coStars[me.uidC] && coStars[me.uidC].n) ? (coStars[me.uidC].s / coStars[me.uidC].n).toFixed(1) : "—"}</b><span>Ratings</span></button>
          </div>
          <div className="segtabs">
            <button className={"seg" + (jobView === "active" ? " on" : "")} onClick={() => setJobView("active")}>Active</button>
            <button className={"seg" + (jobView === "completed" ? " on" : "")} onClick={() => setJobView("completed")}>History</button>
          </div>
          {jobView === "reviews" && (() => {
            const revs = [];
            // seed reviews on my own contractor profile
            const meU = users[me.uidC];
            if (meU && Array.isArray(meU.seedReviews)) for (const r of meU.seedReviews) revs.push({ stars: num(r.stars), comment: r.comment || "", by: "Verified homeowner", at: r.at });
            // reviews homeowners left on my completed jobs
            for (const j of myJobsCO) {
              if (j.chosen === me.uidC && j.ratings && j.ratings.ofContractor) {
                revs.push({ stars: num(j.ratings.ofContractor.stars), comment: j.ratings.ofContractor.comment || "", by: j.homeownerName || "Homeowner", at: j.completedAt || j.matchedAt, job: j.title });
              }
            }
            revs.sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0));
            return (
              <section className="card">
                <div className="h2">Your reviews</div>
                {revs.length === 0 ? <p className="hint">No reviews yet — finish a job and your homeowner can leave one.</p> : revs.map((r, i) => (
                  <div className="revitem" key={i}>
                    <div className="revtop"><span className="revstars">{"★".repeat(Math.max(1, Math.min(5, r.stars)))}<span className="revstarsoff">{"★".repeat(5 - Math.max(1, Math.min(5, r.stars)))}</span></span><span className="revby">{r.by}{r.job ? " · " + r.job : ""}</span></div>
                    {r.comment && <p className="revcomment">{r.comment}</p>}
                  </div>
                ))}
              </section>
            );
          })()}
          {jobView === "completed" && (() => {
            // monthly sales chart from won/completed jobs
            const done = myJobsCO.filter((j) => j.chosen === me.uidC && (j.status === "complete" || j.status === "matched"));
            if (!done.length) return null;
            const byMonth = {};
            for (const j of done) {
              const dt = new Date(j.completedAt || j.matchedAt || j.createdAt);
              const key = dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0");
              const win = (j.applicants || []).find((a) => a.uid === me.uidC);
              byMonth[key] = (byMonth[key] || 0) + (num(win && win.bid) || num(j.price));
            }
            const keys = Object.keys(byMonth).sort();
            const max = Math.max(...keys.map((k) => byMonth[k]), 1);
            const total = keys.reduce((a, k) => a + byMonth[k], 0);
            return (
              <section className="card">
                <div className="h2">Sales by month</div>
                <p className="hint" style={{ marginTop: -4 }}>Total won: {$0(total)} across {done.length} job{done.length !== 1 ? "s" : ""}</p>
                <div className="saleschart">
                  {keys.map((k) => (
                    <div className="salesbar" key={k}>
                      <div className="salesbarfill" style={{ height: Math.round((byMonth[k] / max) * 100) + "%" }} title={$0(byMonth[k])}></div>
                      <span className="salesval">{$0(byMonth[k])}</span>
                      <span className="saleslbl">{k.slice(2).replace("-", "/")}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}
          {(() => {
            const shown = jobView === "applied" ? myJobsCO.filter((j) => j.status === "open")
              : jobView === "won" ? myJobsCO.filter((j) => j.chosen === me.uidC)
              : jobView === "completed" ? myJobsCO.filter((j) => j.status === "complete")
              : jobView === "reviews" ? []
              : myJobsCO.filter((j) => j.status !== "complete");
            if (jobView === "reviews") return null;
            return (<>
          {shown.length === 0 && <section className="card"><p className="hint">{jobView === "completed" ? "No completed jobs yet — finished jobs and messages are saved here." : jobView === "won" ? "No jobs won yet — keep bidding on the Feed." : jobView === "applied" ? "No open applications right now." : "Nothing active yet."}</p></section>}
          {shown.map((j) => {
            const won = j.chosen === me.uidC;
            return (
              <section className="card" key={j.id}>
                <div className="cardtop">
                  <div className="grow">
                    <div className="h2tight">{j.title}</div>
                    <div className="hint">{$0(j.price)} · {fmtDate(j.createdAt)}</div>
                  </div>
                  <JobPill j={j} />
                </div>
                {j.status === "open" && <p className="hint">Applied · homeowner deciding · {(j.applicants || []).length} pros in</p>}
                {j.status === "matched" && won && <p className="good">✓ You got it! {j.homeownerName} · {j.contact}{j.address ? " · 📍 " + j.address : (j.town ? " · " + j.town : "")}</p>}
                {j.status === "matched" && !won && <p className="hint">Homeowner went with another pro on this one.</p>}
                {j.status === "complete" && won && <p className="good">✓ Complete</p>}
                {(j.status === "matched" || j.status === "complete") && won && (
                  <div className="btnrow">
                    <button className={"btn ghost grow1" + (unread[j.id] ? " attn" : "")} onClick={() => openChat(j)}><MessageCircle size={16} /> Message{unread[j.id] ? " (" + unread[j.id] + ")" : ""}</button>
                    {j.status === "matched" && <button className="btn ghost grow1" onClick={() => markDone(j)}><Check size={16} /> Complete</button>}
                  </div>
                )}
                {j.status === "complete" && won && !(j.ratings && j.ratings.ofHomeowner) && (
                  <RateBox label={"Rate " + j.homeownerName + " (payment, access, communication)"} busy={busy} busyKey={"rate-" + j.id + "ofHomeowner"}
                    onSubmit={(st, cm) => submitRating(j, "ofHomeowner", st, cm)} />
                )}
                {j.ratings && j.ratings.ofHomeowner && won && (
                  <div className="hint">You rated this homeowner: {"★".repeat(num(j.ratings.ofHomeowner.stars))}</div>
                )}
              </section>
            );
          })}
          </>); })()}
        </main>
      )}

      {/* ---------- CONTRACTOR: profile ---------- */}
      {me.role === "contractor" && tab === "settings" && !overlay && (
        <main className="page">
          <div className="pagetitle">Profile &amp; Settings</div>
          {/* FIX 2 — collapsible group accordions (chips removed). Tap a bar to expand; default collapsed. */}
          <p className="hint" style={{ marginTop: -2, marginBottom: 4 }}>Tap a section to expand.</p>
          {needsSetup && (
            <section className="card setupbanner">
              <b>Welcome! Set up your profile first</b>
              <span>Open <b>Business profile</b> below, add your company name and trades, and tap Save &amp; publish.</span>
            </section>
          )}
          <button type="button" className={"secgroup accord" + (gOpen.business ? " open" : "")} onClick={() => toggleGroup("business")}>Business profile <span className="hint">public — what homeowners see · Save &amp; publish</span><span className="accchev">{gOpen.business ? "▾" : "▸"}</span></button>
          <div id="prof-business" className="secbody" style={{ display: gOpen.business ? undefined : "none" }}>
          <section className="card">
            <div className="profedit">
              <Avatar user={profC} size="xl" onTap={() => document.getElementById("avc").click()} />
              <input id="avc" type="file" accept="image/*" style={{ display: "none" }}
                onChange={(e) => { setAvatar("contractor", e.target.files[0]); e.target.value = ""; }} />
              <div className="grow">
                <div className="ratingline">{starsOf(coStars, me.uidC) || "No ratings yet"}</div>
                <div className="hint">Your first impression. Tap the logo to change it.</div>
              </div>
            </div>
            <label className="fld"><span>Your name</span>
              <input className="in" value={profC.name} onChange={(e) => setProfC({ ...profC, name: e.target.value })} placeholder="Dustin" /></label>
            <label className="fld"><span>Company</span>
              <input className="in" value={profC.company} onChange={(e) => setProfC({ ...profC, company: e.target.value })} placeholder="Caza Contractors" /></label>
            <label className="fld"><span>Trades</span>
              <input className="in" value={profC.trades} onChange={(e) => setProfC({ ...profC, trades: e.target.value })} placeholder="Roofing, siding, decks" /></label>
            <label className="fld"><span>Service area <span className="hint">shown on your profile</span></span>
              <input className="in" value={profC.town} onChange={(e) => setProfC({ ...profC, town: e.target.value })} placeholder="Lewis & Oneida County, NY" /></label>
            <label className="fld"><span>Home base <span className="hint">town or address you travel from</span></span>
              <input className="in" value={profC.base} onChange={(e) => setProfC({ ...profC, base: e.target.value })} placeholder="e.g. Lyons Falls, NY" /></label>
            <label className="fld"><span>Travel radius — {profC.radius || 30} miles</span>
              <input className="radslider" type="range" min="5" max="100" step="5" value={profC.radius || 30}
                style={{ ["--pct"]: (((profC.radius || 30) - 5) / 95 * 100) + "%" }}
                onChange={(e) => setProfC({ ...profC, radius: num(e.target.value) })} />
              <div className="bidends"><span>5 mi</span><span className="hint">how far you'll travel for jobs</span><span>100 mi</span></div>
            </label>
            <label className="fld" style={{ marginTop: 8 }}><span>About your company</span>
              <textarea className="desc" rows={3} value={profC.bio} onChange={(e) => setProfC({ ...profC, bio: e.target.value })}
                placeholder="e.g. 15 years in business, fully insured, W-2 crews not day labor. We show up when we say we will." /></label>
            <button className="btn primary full" disabled={busy === "prof"} onClick={() => saveProfile("contractor")}>
              {busy === "prof" ? "Saving…" : "Save & publish"}
            </button>
            <p className="hint center" style={{ marginTop: 8 }}>This is your PUBLIC profile — Save &amp; publish updates what homeowners see. (Your private standards below auto-save on their own.)</p>
          </section>

          <section className="card">
            <div className="h2">Reviews about you</div>
            <ReviewList uid={me.uidC} role="contractor" emptyText="No written reviews yet — finish jobs and they'll show up here." />
          </section>

          </div>
          {/* PROFILE REORG Part 2 — Caza Manual split OUT of the Business card into its own private group. */}
          <button type="button" className={"secgroup accord" + (gOpen.manual ? " open" : "")} onClick={() => toggleGroup("manual")}>Caza Manual <span className="hint">private — your standards + cost book · auto-saves</span><span className="accchev">{gOpen.manual ? "▾" : "▸"}</span></button>
          <div id="prof-manual" className="secbody" style={{ display: gOpen.manual ? undefined : "none" }}>
          <section className="card">
            <p className="hint" style={{ marginTop: 0 }}>Private — never shown to homeowners. Edits here auto-save; there's no publish button.</p>
            {/* COST BOOK — delivery / mobilization rates (used by every estimate's auto charge) */}
            <div className="seclabel" style={{ marginTop: 6 }}>Delivery / mobilization rates <span className="hint">cost book — your real costs, margin lands on top</span></div>
            <div className="estfields">
              <label className="estf"><span>Mobilization base $</span><input type="number" min="0" value={profC.mobBase} onChange={(e) => setProfC({ ...profC, mobBase: num(e.target.value) })} placeholder="350" /></label>
              <label className="estf"><span>Truck $/mile</span><input type="number" min="0" step="0.05" value={profC.mobTruckPerMi} onChange={(e) => setProfC({ ...profC, mobTruckPerMi: num(e.target.value) })} placeholder="0.70" /></label>
            </div>
            <p className="hint" style={{ marginTop: 2 }}>Each estimate adds: base + round-trip miles × crew drive-time (at the job's burdened rate) + miles × truck $/mi. Enter round-trip miles per job on the estimate.</p>
            {/* BRANDS & TIERS (Part 3) — merged from the old "Your preferences" card. Dual-writes: tierPrefs
                (AL generation + proposal colors) AND cmManual brands (preflight flag) so they can't disagree. */}
            <div className="seclabel" style={{ marginTop: 12 }}>Brands &amp; tiers <span className="hint">AL builds good/better/best around these — one place, feeds generation + preflight</span></div>
            <textarea className="desc" rows={3} value={profC.prefMaterials} onChange={(e) => setProfC({ ...profC, prefMaterials: e.target.value })}
              placeholder="Preferred brands, plain text — e.g. Roofing: GAF Timberline HDZ · Siding: James Hardie · Decking: Trex" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 4px" }}>
              {TIER_CATS.map((c) => (
                <button key={c.key} className={"btn " + (prefCat === c.key ? "primary" : "ghost")} style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => setPrefCat(c.key)}>{c.label}</button>
              ))}
            </div>
            {["good", "better", "best"].map((tier) => {
              const cur = (profC.tierPrefs && profC.tierPrefs[prefCat] && profC.tierPrefs[prefCat][tier]) || "";
              const opts = TIER_OPTIONS[prefCat][tier];
              const setTier = (val) => setProfC((p) => ({ ...p, tierPrefs: Object.assign({}, p.tierPrefs, { [prefCat]: Object.assign({}, (p.tierPrefs || {})[prefCat], { [tier]: val }) }) }));
              return (
                <div key={tier} style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 700, textTransform: "capitalize", fontSize: 13 }}>{tier}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {opts.map((o) => (
                      <button key={o} className={"btn " + (cur === o ? "primary" : "ghost")} style={{ padding: "4px 9px", fontSize: 12 }} onClick={() => { const v = cur === o ? "" : o; setTier(v); if (v) cmBrandUpsert(v); }}>{cur === o ? "✓ " : ""}{o}</button>
                    ))}
                  </div>
                  <input className="in" style={{ marginTop: 4, width: "100%" }} value={opts.includes(cur) ? "" : cur} onChange={(e) => setTier(e.target.value)} onBlur={(e) => cmBrandUpsert(e.target.value)} placeholder="…or type your own line for this tier" />
                </div>
              );
            })}
            <p className="hint" style={{ marginTop: 6 }}>Set a category's three lines — AL builds your good/better/best around them, the proposal shows that brand's colors, AND the preflight treats them as your preferred brands. Auto-saves.</p>
            {/* CAZA MANUAL — your standard assemblies + material specs; the Opus preflight flags deviations. */}
            <button className="btn ghost full" style={{ marginTop: 12 }} onClick={() => setCmOpen((o) => !o)}>{cmOpen ? "▾ Hide Caza Manual" : "▸ Caza Manual — your standards"} <span className="hint">what AL checks the estimate against</span></button>
            {cmOpen && (() => { const man = cmManual(); return (
              <div style={{ marginTop: 6 }}>
                <p className="hint" style={{ marginTop: 0 }}>AL reasons freely during the conversation, then the Opus preflight checks each estimate against THIS — flagging anything off your standard for you to accept or override. Edit freely; adding a standard is just a new entry.</p>
                <div className="seclabel" style={{ marginTop: 8 }}>Standard assemblies <span className="hint">what a Caza job includes, by job type</span></div>
                {man.assemblies.map((a, i) => (
                  <div key={a.id || i} className="card" style={{ padding: 10, marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input className="in" style={{ flex: 1 }} value={a.match} onChange={(e) => cmAsmSet(i, "match", e.target.value)} placeholder="job-type match (e.g. cedar, shingle, soffit)" />
                      <button className="todel" onClick={() => cmAsmDel(i)}><X size={14} /></button>
                    </div>
                    <textarea className="desc" rows={2} style={{ marginTop: 6 }} value={(a.includes || []).join("; ")} onChange={(e) => cmAsmSet(i, "includes", cmList(e.target.value))} placeholder="includes (semicolon-separated): Tear-off; Synthetic underlayment; …" />
                    <input className="in" style={{ marginTop: 6 }} value={(a.excludes || []).join("; ")} onChange={(e) => cmAsmSet(i, "excludes", cmList(e.target.value))} placeholder="never includes (semicolon-separated): vinyl j-channel; …" />
                    <input className="in" style={{ marginTop: 6 }} value={a.note || ""} onChange={(e) => cmAsmSet(i, "note", e.target.value)} placeholder="note (e.g. Owens Corning Total Protection system)" />
                  </div>
                ))}
                <button className="btn ghost full" onClick={cmAsmAdd}><Plus size={14} /> Add standard assembly</button>
                <div className="seclabel" style={{ marginTop: 12 }}>Material specs &amp; subs <span className="hint">role → your standard (acceptable subs)</span></div>
                {man.materials.map((x, i) => (
                  <div key={x.id || i} className="card" style={{ padding: 10, marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input className="in" style={{ flex: 1 }} value={x.role} onChange={(e) => cmMatSet(i, "role", e.target.value)} placeholder="role (e.g. Shingle, Underlayment, Pipe flashing)" />
                      <button className="todel" onClick={() => cmMatDel(i)}><X size={14} /></button>
                    </div>
                    <input className="in" style={{ marginTop: 6 }} value={x.standard} onChange={(e) => cmMatSet(i, "standard", e.target.value)} placeholder="Caza standard (e.g. Owens Corning Duration)" />
                    <input className="in" style={{ marginTop: 6 }} value={(x.subs || []).join(", ")} onChange={(e) => cmMatSet(i, "subs", cmCsv(e.target.value))} placeholder="acceptable subs (comma-separated)" />
                    <input className="in" style={{ marginTop: 6 }} value={x.note || ""} onChange={(e) => cmMatSet(i, "note", e.target.value)} placeholder="note" />
                  </div>
                ))}
                <button className="btn ghost full" onClick={cmMatAdd}><Plus size={14} /> Add material spec</button>
                <div className="seclabel" style={{ marginTop: 12 }}>Labor — burdened crew rates <span className="hint">$/hr per trade; drives the estimate's rate floor + preflight flag</span></div>
                <label className="estf" style={{ maxWidth: 220 }}><span>Default burdened $/hr</span><input type="number" min="0" value={man.labor.defaultRate} onChange={(e) => cmLabDefault(e.target.value)} placeholder="50" /></label>
                {(man.labor.crewRates || []).map((c, i) => (
                  <div key={c.id || i} style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}>
                    <input className="in" style={{ flex: 1 }} value={c.trade} onChange={(e) => cmCrewSet(i, "trade", e.target.value)} placeholder="trade match (e.g. roof, standing seam, siding)" />
                    <span className="todollar" title="burdened $/hr">$<input className="tocost" type="number" min="0" value={c.rate} onChange={(e) => cmCrewSet(i, "rate", e.target.value)} /></span>
                    <button className="todel" onClick={() => cmCrewDel(i)}><X size={14} /></button>
                  </div>
                ))}
                <button className="btn ghost full" style={{ marginTop: 6 }} onClick={cmCrewAdd}><Plus size={14} /> Add crew rate</button>
                <p className="hint" style={{ marginTop: 4 }}>First matching trade wins (order specific → general). Production rates (man-hours/unit) live in your price/rate book and are already used; the calibration loop sharpens them from logged actuals.</p>
                <div className="seclabel" style={{ marginTop: 12 }}>Pricing rules <span className="hint">standard margin applies on build; the estimate flags below-floor / below-min</span></div>
                <div className="estfields">
                  <label className="estf"><span>Standard gross margin %</span><input type="number" min="0" max="90" value={man.pricing.marginStd} onChange={(e) => cmPriceSet("marginStd", e.target.value)} placeholder="30" /></label>
                  <label className="estf"><span>Margin floor % <span className="hint">never below</span></span><input type="number" min="0" max="90" value={man.pricing.marginFloor} onChange={(e) => cmPriceSet("marginFloor", e.target.value)} placeholder="22" /></label>
                  <label className="estf"><span>Job minimum $ <span className="hint">0 = none</span></span><input type="number" min="0" value={man.pricing.jobMin} onChange={(e) => cmPriceSet("jobMin", e.target.value)} placeholder="0" /></label>
                </div>
                <div className="seclabel" style={{ marginTop: 8 }}>Per-trade margin overrides <span className="hint">optional — matched to the primary trade</span></div>
                {(man.pricing.perTrade || []).map((o, i) => (
                  <div key={o.id || i} style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}>
                    <input className="in" style={{ flex: 1 }} value={o.trade} onChange={(e) => cmPtSet(i, "trade", e.target.value)} placeholder="trade match (e.g. standing seam, siding)" />
                    <span className="todollar" title="gross margin %"><input className="tocost" type="number" min="0" max="90" value={o.margin} onChange={(e) => cmPtSet(i, "margin", e.target.value)} />%</span>
                    <button className="todel" onClick={() => cmPtDel(i)}><X size={14} /></button>
                  </div>
                ))}
                <button className="btn ghost full" style={{ marginTop: 6 }} onClick={cmPtAdd}><Plus size={14} /> Add per-trade margin</button>
                <p className="hint" style={{ marginTop: 4 }}>Delivery / mobilization charge is set above (cost book); good/better/best tier pricing is automatic in the proposal.</p>
                <div className="seclabel" style={{ marginTop: 12 }}>Preferred vendors <span className="hint">who you buy from</span></div>
                {(man.vendors.preferred || []).map((v, i) => (
                  <div key={v.id || i} style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}>
                    <input className="in" style={{ flex: 1 }} value={v.name} onChange={(e) => cmVenSet(i, "name", e.target.value)} placeholder="vendor (e.g. ABC Supply)" />
                    <input className="in" style={{ flex: 1 }} value={v.note || ""} onChange={(e) => cmVenSet(i, "note", e.target.value)} placeholder="what they supply (optional)" />
                    <button className="todel" onClick={() => cmVenDel(i)}><X size={14} /></button>
                  </div>
                ))}
                <button className="btn ghost full" style={{ marginTop: 6 }} onClick={cmVenAdd}><Plus size={14} /> Add vendor</button>
                <div className="seclabel" style={{ marginTop: 12 }}>Preferred brands <span className="hint">the preflight flags a non-preferred brand</span></div>
                {(man.vendors.brands || []).map((b, i) => (
                  <div key={b.id || i} style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}>
                    <input className="in" style={{ flex: 1 }} value={b.name} onChange={(e) => cmBrandSet(i, "name", e.target.value)} placeholder="brand (e.g. Owens Corning)" />
                    <input className="in" style={{ flex: 1 }} value={b.note || ""} onChange={(e) => cmBrandSet(i, "note", e.target.value)} placeholder="for (optional, e.g. pipe flashing)" />
                    <button className="todel" onClick={() => cmBrandDel(i)}><X size={14} /></button>
                  </div>
                ))}
                <button className="btn ghost full" style={{ marginTop: 6 }} onClick={cmBrandAdd}><Plus size={14} /> Add brand</button>
              </div>
            ); })()}
          </section>
          {/* STANDING RULES ("Tell AL") — contractor-taught knowledge injected into every estimate.
              Precedence: rules > manual > model. Capture happens in the AL chat; this is management. */}
          <section className="card">
            <div className="h2">Standing rules <span className="hint">tell AL once — applies to every estimate</span></div>
            <p className="hint" style={{ marginTop: -2 }}>Teach AL new facts by talking to it ("From now on, flat roofs need 2 layers of 3-inch iso") — or add one here. Rules override the manual where they conflict. Knowledge only; math/app changes still need an update.</p>
            {(() => { const used = standingRules.filter((r) => r.active).reduce((a, r) => a + String(r.text || "").length, 0); const pct = Math.min(100, Math.round((used / RULES_CHAR_BUDGET) * 100)); return (
              <div className="hint" style={{ marginBottom: 6 }}>{standingRules.filter((r) => r.active).length} active · budget {pct}%{pct >= 80 ? <span style={{ color: "#8A5A12", fontWeight: 700 }}> — near the cap: merge or retire stale rules</span> : null}</div>
            ); })()}
            {standingRules.map((r) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 2px", borderBottom: "1px solid #f0f0f0", opacity: r.active ? 1 : 0.55 }}>
                <input type="checkbox" checked={!!r.active} title={r.active ? "Active — injected into estimates" : "Off — kept but not injected"} onChange={(e) => saveStandingRules((prev) => prev.map((x) => x.id === r.id ? { ...x, active: e.target.checked } : x))} />
                <span style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => { const n = window.prompt("Edit rule (max 400 chars)", r.text); if (!n || !n.trim()) return; const t = n.trim().slice(0, 400); if (activeRulesChars(standingRules) - String(r.text || "").length + t.length > RULES_CHAR_BUDGET) { flash("That edit exceeds the size cap — shorten it or retire another rule."); return; } saveStandingRules((prev) => prev.map((x) => x.id === r.id ? { ...x, text: t } : x)); }}>
                  <span style={{ display: "block", fontSize: 12.5 }}>{r.text}</span>
                  <span className="hint" style={{ display: "block" }}>{r.scope === "global" ? "all trades" : r.scope} · added {r.createdDate}</span>
                </span>
                <button className="btn ghost" style={{ padding: "2px 6px" }} onClick={() => { if (window.confirm("Delete this rule?")) saveStandingRules((prev) => prev.filter((x) => x.id !== r.id)); }}>✕</button>
              </div>
            ))}
            {standingRules.length === 0 && <p className="hint">No rules yet. Say one to AL ("from now on…") or add it here.</p>}
            {(() => { return (
              <div style={{ marginTop: 6 }}>
                <textarea className="desc" rows={2} id="srNewText" placeholder={'e.g. NY code: flat-roof insulation is 2 staggered layers of 3" polyiso (~R-34).'} />
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  <select id="srNewScope" className="in" style={{ maxWidth: 160 }} defaultValue="global">
                    <option value="global">All trades</option>
                    {SR_SCOPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                  <button className="btn primary grow1" onClick={() => { const ta = document.getElementById("srNewText"); const sc = document.getElementById("srNewScope"); if (ta && ta.value.trim() && srAdd(ta.value.trim(), sc ? sc.value : "global")) { ta.value = ""; flash("Standing rule saved."); } }}>＋ Add rule</button>
                </div>
              </div>
            ); })()}
          </section>
          </div>
          <button type="button" className={"secgroup accord" + (gOpen.al ? " open" : "")} onClick={() => toggleGroup("al")}>Assistant <span className="hint">private — your estimate voice · auto-saves</span><span className="accchev">{gOpen.al ? "▾" : "▸"}</span></button>
          <div id="prof-al" className="secbody" style={{ display: gOpen.al ? undefined : "none" }}>
          <section className="card">
            <div className="h2">Assistant voice <span className="hint">who talks &amp; helps you estimate</span></div>
            <p className="hint" style={{ marginTop: -2 }}>Pick who reads your estimates back. AL is the default. Tap ▶ to hear each one, set its speed, then Use.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {PERSONAS.map((p) => {
                const spd = personaSpeeds[p.name] || 1;
                return (
                <div key={p.name} style={{ display: "flex", flexDirection: "column", gap: 6, padding: "8px", borderRadius: 10, border: "1px solid " + (persona === p.name ? "#0a7d36" : "#e6e8ea"), background: persona === p.name ? "#f0faf3" : "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {personaFace(p, true)}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700 }}>{p.name} {p.name === "AL" && <span className="hint">· default</span>}</div>
                      <div className="hint">{p.sex === "f" ? "Female voice" : "Male voice"}</div>
                    </div>
                    <button className="btn ghost" style={{ padding: "4px 10px" }} onClick={() => previewPersona(p)} title={"Hear " + p.name + " at " + spd.toFixed(2) + "×"}>▶</button>
                    <button className={"btn " + (persona === p.name ? "primary" : "ghost")} style={{ padding: "4px 12px" }} onClick={() => { personaSet(p.name); flash(p.name + " is now your assistant."); }}>{persona === p.name ? "✓ Using" : "Use"}</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="hint" style={{ width: 44 }}>Speed</span>
                    <input type="range" min="0.7" max="1.2" step="0.05" value={spd} style={{ flex: 1 }} onChange={(e) => personaSpeedSet(p.name, e.target.value)} />
                    <span className="hint" style={{ width: 40, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{spd.toFixed(2)}×</span>
                  </div>
                </div>
                );
              })}
            </div>
            <p className="hint" style={{ marginTop: 8 }}>Speed 0.70–1.20× (1.00 = normal). Avatars are coming — names show initials until photos are added.</p>
          </section>

          </div>
          <button type="button" className={"secgroup accord" + (gOpen.pricing ? " open" : "")} onClick={() => toggleGroup("pricing")}>Pricing &amp; cost data <span className="hint">your real costs; homeowners see only a range · auto-saves</span>{(() => { const n = enginePB.filter(priceIsStale).length; return n ? <span style={{ background: "#F2C98A", color: "#5a4a2a", fontWeight: 700, fontSize: 11, borderRadius: 8, padding: "1px 7px", marginLeft: 6 }}>{n} stale</span> : null; })()}<span className="accchev">{gOpen.pricing ? "▾" : "▸"}</span></button>
          <div id="prof-pricing" className="secbody" style={{ display: gOpen.pricing ? undefined : "none" }}>
          {/* MATERIAL PRICING — governed book editor + ALL intakes (CSV · photo/PDF · supplier feed), moved here from the estimator (FIX 1). */}
          <section className="card">
            <div className="h2">Material Pricing <span className="hint">one book · all intakes</span></div>
            <p className="hint" style={{ marginTop: -2 }}>Your real material costs — used in every estimate; homeowners only ever see a range.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              <div className="matcount" style={{ marginBottom: 0 }}>{enginePB.length} price{enginePB.length === 1 ? "" : "s"} in your book</div>
              {(() => { const n = enginePB.filter(priceIsStale).length; return n ? <span style={{ background: "#F2C98A", color: "#5a4a2a", fontWeight: 700, fontSize: 12, borderRadius: 8, padding: "2px 9px" }}>{n} stale</span> : <span style={{ color: "#1B7A3D", fontWeight: 700, fontSize: 12.5 }}>✓ all fresh</span>; })()}
            </div>
            {/* FIX 1 — three intake tiles, each opening ITS OWN intake right here on the card face.
                Hidden inputs stay mounted so a tile tap can open the file picker in the same gesture. */}
            <input ref={pbPhotoInputRef} type="file" accept="image/*,application/pdf,.pdf" style={{ display: "none" }} onChange={(e) => { onPriceFile(e.target.files && e.target.files[0]); e.target.value = ""; }} />
            <input ref={pbCsvFileRef} type="file" accept=".csv,text/csv,text/plain" style={{ display: "none" }} onChange={(e) => { onCsvFile(e.target.files && e.target.files[0]); e.target.value = ""; }} />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button type="button" className="btn ghost grow1" style={pbIntakeMode === "csv" ? { borderColor: "#14a04a", fontWeight: 700 } : undefined} onClick={() => pbOpenIntake("csv", pbCsvFileRef)}>📄 CSV</button>
              <button type="button" className="btn ghost grow1" style={pbIntakeMode === "photo" ? { borderColor: "#14a04a", fontWeight: 700 } : undefined} onClick={() => pbOpenIntake("photo", pbPhotoInputRef)}>📷 Photo / PDF</button>
              <button type="button" className="btn ghost grow1" style={pbIntakeMode === "feed" ? { borderColor: "#14a04a", fontWeight: 700 } : undefined} onClick={() => pbOpenIntake("feed", null)}>🔗 Supplier feed</button>
            </div>
            {/* THE INTAKE — renders directly beneath the tiles (never below the book editor / off-screen). */}
            {pbIntakeMode && (
              <div ref={pbIntakeRef} style={{ marginTop: 8, borderTop: "1px solid #eee", paddingTop: 8 }}>
                {!csvReview && (
                  <div>
                    {(() => {
                      const ven = cazaManualOf(profC.cazaManual).vendors;
                      const list = [...new Set((((ven && ven.preferred) || []).map((v) => v.name).filter(Boolean)).concat(["ABC Supply", "SRS / Beacon", "Home Depot", "Lowe's"]))].slice(0, 8);
                      return list.length ? (
                        <div style={{ marginBottom: 6 }}>
                          <div className="hint">Supplier — tap yours or type below (tags these prices so the stale-export groups by supplier):</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                            {list.map((s) => (<button key={s} type="button" className="btn ghost" style={{ padding: "3px 10px", fontSize: 12, fontWeight: csvSupplier === s ? 700 : 400, borderColor: csvSupplier === s ? "#14a04a" : undefined }} onClick={() => setCsvSupplier(s)}>{csvSupplier === s ? "✓ " : ""}{s}</button>))}
                          </div>
                        </div>
                      ) : null;
                    })()}
                    <label className="estf"><span>Supplier (optional)</span><input value={csvSupplier} onChange={(e) => setCsvSupplier(e.target.value)} placeholder="ABC Supply" /></label>
                    {pbIntakeMode === "photo" && (
                      <div>
                        <button type="button" className="btn primary full" disabled={csvBusy} style={{ marginTop: 6 }} onClick={() => pbPhotoInputRef.current && pbPhotoInputRef.current.click()}>{csvBusy ? "Reading the price sheet…" : "📷 Choose a photo / PDF of a price sheet"}</button>
                        <p className="hint" style={{ marginTop: 4 }}>A supplier quote or price sheet — AI reads the prices, then you review before anything saves.</p>
                      </div>
                    )}
                    {pbIntakeMode === "csv" && (
                      <div>
                        <button type="button" className="btn primary full" disabled={csvBusy} style={{ marginTop: 6 }} onClick={() => pbCsvFileRef.current && pbCsvFileRef.current.click()}>📄 Choose a CSV file</button>
                        <label className="estf" style={{ marginTop: 6 }}><span>…or paste CSV</span><textarea rows={4} onChange={(e) => onCsvText(e.target.value)} placeholder={"material,unit,cost\n2x4x8 SPF,EA,5.85"} /></label>
                      </div>
                    )}
                    {pbIntakeMode === "feed" && (
                      <div>
                        <label className="estf"><span>Supplier API / feed URL</span><input value={csvUrl} onChange={(e) => setCsvUrl(e.target.value)} placeholder="https://supplier.example/prices.csv" /></label>
                        <button className="btn primary full" disabled={csvBusy} style={{ margin: "6px 0 2px" }} onClick={fetchSupplierUrl}>{csvBusy ? "Fetching feed…" : "Fetch from supplier feed (CSV or JSON)"}</button>
                      </div>
                    )}
                    {csvBusy && pbIntakeMode !== "photo" && <p className="hint">Working…</p>}
                    {csvParsed && csvParsed.headers.length > 0 && (
                      <div>
                        <p className="hint">Map your columns ({csvParsed.rows.length} rows found):</p>
                        <div className="estfields">
                          {[["material", "Material *"], ["cost", "Unit cost *"], ["unit", "Unit"], ["category", "Category"]].map(([k, lbl]) => (
                            <label className="estf" key={k}><span>{lbl}</span>
                              <select value={csvMap[k]} onChange={(e) => setCsvMap((m) => ({ ...m, [k]: num(e.target.value) }))}>
                                <option value={-1}>—</option>
                                {csvParsed.headers.map((h, i) => <option key={i} value={i}>{h || ("col " + (i + 1))}</option>)}
                              </select>
                            </label>
                          ))}
                        </div>
                        <button className="btn primary full" style={{ marginTop: 8 }} disabled={csvBusy} onClick={csvParseAndCategorize}>
                          {csvBusy ? "Auto-categorizing…" : "Parse & auto-categorize →"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {csvReview && (
                  <div>
                    <p className="hint">Review &amp; correct, then commit. ⚠️ low-confidence rows are highlighted — fix the trade before committing. Nothing saves to your book until you commit.</p>
                    {csvReview.map((r, i) => (
                      <div className="estfields" key={i} style={{ alignItems: "end", background: r.confidence < 0.6 ? "#fff6e6" : "transparent", borderRadius: 6, padding: 4 }}>
                        <label className="estf"><span>Material</span><input value={r.material} onChange={(e) => csvReviewSet(i, "material", e.target.value)} /></label>
                        <label className="estf"><span>Trade {r.confidence < 0.6 ? "⚠️" : ""}</span>
                          <select value={r.trade} onChange={(e) => csvReviewSet(i, "trade", e.target.value)}>
                            {PRICE_BOOK_TRADES.map((t) => <option key={t.trade} value={t.trade}>{t.label}</option>)}
                            <option value="other">other (skip)</option>
                          </select>
                        </label>
                        <label className="estf"><span>Category</span><input value={r.category} onChange={(e) => csvReviewSet(i, "category", e.target.value)} /></label>
                        <label className="estf"><span>Unit</span><input value={r.unit} onChange={(e) => csvReviewSet(i, "unit", e.target.value)} /></label>
                        <label className="estf"><span>$/unit</span><input type="number" step="0.01" value={r.cost} onChange={(e) => csvReviewSet(i, "cost", num(e.target.value))} /></label>
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <button className="btn primary grow1" onClick={csvCommit}>✓ Commit {csvReview.filter((r) => r.trade && r.trade !== "other").length} to price book</button>
                      <button className="btn ghost" onClick={csvResetImport}>Cancel</button>
                    </div>
                  </div>
                )}
                <button type="button" className="btn ghost full" style={{ marginTop: 6, padding: "3px 8px", fontSize: 12 }} onClick={() => setPbIntakeMode("")}>▴ Close</button>
              </div>
            )}
            <button className="btn ghost full" style={{ marginTop: 6 }} onClick={() => setWhPbOpen((o) => !o)}>{whPbOpen ? "▾ Hide price book" : "▸ View / edit price book"}</button>
            {/* FULL CSV EXPORTS — every material price (all stores, provenance + in-use) and all production rates */}
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <button className="btn ghost grow1" onClick={exportAllPricesCSV}>⬇ Materials CSV <span className="hint">all sources</span></button>
              <button className="btn ghost grow1" onClick={exportRatesCSV}>⬇ Production rates CSV</button>
            </div>
          </section>
          {whPbOpen && (
            <div className="card" style={{ marginTop: 10 }}>
              <p className="hint">Your material costs — matched per trade, override seed pricing. Homeowners never see these; they only get a range.</p>
              {enginePB.length === 0 && <p className="hint">No prices yet. Add your material costs below — the engine fuzzy-matches them to each trade's lines (scoped to the trade) and falls back to seed pricing for anything unmatched.</p>}
              {/* FIX 4 — two-level collapse (trade -> category), search, closed by default; collapsed rows
                  are NOT rendered (pbSet saves instantly, so there's no dirty local state to lose) — keeps a
                  500-row book fast on a phone. Search filters across the whole book + auto-expands matches. */}
              {enginePB.length > 0 && (() => {
                const q = pbSearch.trim().toLowerCase();
                const matchRow = (e) => !q || String(e.material || "").toLowerCase().includes(q) || String(e.category || "").toLowerCase().includes(q) || String(e.trade || "").toLowerCase().includes(q);
                const rows = enginePB.filter(matchRow);
                const order = PRICE_BOOK_TRADES.map((t) => t.trade);
                const tradeLabel = (tr) => { const f = PRICE_BOOK_TRADES.find((x) => x.trade === tr); return f ? f.label : (tr ? tr.charAt(0).toUpperCase() + tr.slice(1) : "Other"); };
                const badge = (n) => n ? <span style={{ background: "#F2C98A", color: "#5a4a2a", fontWeight: 700, fontSize: 10.5, borderRadius: 7, padding: "0 6px", marginLeft: 6 }}>{n} stale</span> : null;
                const barStyle = (sub) => ({ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", textAlign: "left", border: "1px solid #e6e6e6", background: sub ? "#fafafa" : "#f2f5f3", borderRadius: 8, padding: sub ? "5px 9px" : "7px 10px", marginBottom: 4, fontWeight: sub ? 600 : 700, fontSize: sub ? 12.5 : 13.5, cursor: "pointer" });
                const rowEditor = (e) => { const stale = priceIsStale(e); return (
                  <div key={e.id} style={stale ? { background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 8, padding: "6px 8px", marginBottom: 4 } : { marginBottom: 2 }}>
                    <div className="estfields" style={{ alignItems: "end" }}>
                      <label className="estf"><span>Material</span><input value={e.material} onChange={(ev) => pbSet(e.id, "material", ev.target.value)} placeholder="e.g. 2x4x8 SPF" /></label>
                      <label className="estf"><span>Trade</span>
                        <select value={e.trade} onChange={(ev) => pbSet(e.id, "trade", ev.target.value)}>
                          {PRICE_BOOK_TRADES.map((t) => <option key={t.trade} value={t.trade}>{t.label}</option>)}
                        </select>
                      </label>
                      <label className="estf"><span>Category</span><input value={e.category} onChange={(ev) => pbSet(e.id, "category", ev.target.value)} placeholder="lumber" /></label>
                      <label className="estf"><span>Unit</span><input value={e.unit} onChange={(ev) => pbSet(e.id, "unit", ev.target.value)} placeholder="EA" /></label>
                      <label className="estf"><span>$/unit</span><input type="number" step="0.01" value={e.unitCost} onChange={(ev) => pbSet(e.id, "unitCost", num(ev.target.value))} /></label>
                      <button className="btn ghost" style={{ alignSelf: "center" }} onClick={() => pbDel(e.id)}>✕</button>
                    </div>
                    <div className="hint" style={{ marginTop: 1, color: stale ? "#8A5A12" : undefined, fontWeight: stale ? 600 : 400 }}>{stale ? "⚠️ " : ""}{priceUpdatedLabel(e)}</div>
                  </div>
                ); };
                const byTrade = {};
                rows.forEach((e) => { const tr = e.trade || "other"; (byTrade[tr] = byTrade[tr] || []).push(e); });
                const trades = Object.keys(byTrade).sort((a, b) => { const ia = order.indexOf(a), ib = order.indexOf(b); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib); });
                return (
                  <div>
                    <input className="in" style={{ marginBottom: 8 }} value={pbSearch} onChange={(ev) => setPbSearch(ev.target.value)} placeholder="🔍 Search materials, category, or trade…" />
                    {!rows.length && <p className="hint">No prices match “{pbSearch}”.</p>}
                    {trades.map((tr) => {
                      const list = byTrade[tr];
                      const tKey = "t:" + tr, tOpen = !!pbGrpOpen[tKey] || !!q;
                      const byCat = {};
                      list.forEach((e) => { const c = (e.category || "").trim() || "Uncategorized"; (byCat[c] = byCat[c] || []).push(e); });
                      const cats = Object.keys(byCat).sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : (a.toLowerCase() > b.toLowerCase() ? 1 : 0));
                      return (
                        <div key={tr}>
                          <button type="button" onClick={() => togglePbGrp(tKey)} style={barStyle(false)}>
                            <span>{tOpen ? "▾ " : "▸ "}{tradeLabel(tr)}</span>
                            <span className="hint" style={{ fontWeight: 600 }}>{list.length}{badge(list.filter(priceIsStale).length)}</span>
                          </button>
                          {tOpen && (
                            <div style={{ marginLeft: 8 }}>
                              {cats.map((c) => {
                                const clist = byCat[c].slice().sort((a, b) => String(a.material || "").toLowerCase() < String(b.material || "").toLowerCase() ? -1 : 1);
                                const cKey = "c:" + tr + "|" + c, cOpen = !!pbGrpOpen[cKey] || !!q;
                                return (
                                  <div key={c}>
                                    <button type="button" onClick={() => togglePbGrp(cKey)} style={barStyle(true)}>
                                      <span>{cOpen ? "▾ " : "▸ "}{c}</span>
                                      <span className="hint" style={{ fontWeight: 600 }}>{clist.length}{badge(clist.filter(priceIsStale).length)}</span>
                                    </button>
                                    {cOpen && <div style={{ marginLeft: 6, marginBottom: 6 }}>
                                      {clist.map(rowEditor)}
                                      <button className="btn ghost full" onClick={() => pbAdd(tr, c === "Uncategorized" ? "" : c)}>+ add to {c === "Uncategorized" ? tradeLabel(tr) : c}</button>
                                    </div>}
                                  </div>
                                );
                              })}
                              <button className="btn ghost full" style={{ marginBottom: 6 }} onClick={() => pbAdd(tr, "")}>+ add to {tradeLabel(tr)}</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              <button className="btn ghost full" style={{ marginTop: 8 }} onClick={() => pbAdd()}>+ Add a price</button>
              {(() => { const n = enginePB.filter(priceIsStale).length; return n > 0 ? (
                <div style={{ marginTop: 10, padding: "9px 11px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 10 }}>
                  <div style={{ fontWeight: 700, color: "#8A5A12", fontSize: 12.5 }}>⚠️ {n} price{n === 1 ? "" : "s"} stale <span className="hint" style={{ fontWeight: 400 }}>(no date or over {PRICE_STALE_DAYS} days) — your reprice-run list</span></div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <button className="btn ghost grow1" onClick={exportStalePricesCSV}>⬇ Export CSV</button>
                    <button className="btn ghost grow1" onClick={openStaleSheet}>🖨 Print / PDF</button>
                  </div>
                </div>
              ) : (enginePB.length ? <p className="hint" style={{ marginTop: 8, color: "#1B7A3D", fontWeight: 600 }}>✓ All prices fresh (updated within {PRICE_STALE_DAYS} days).</p> : null); })()}
            </div>
          )}
          {/* FIX 1 (demote) — legacy matCosts card: only appears while a legacy list exists; leads with the
              consolidate action and no longer invites NEW legacy uploads (the governed card above is the intake).
              Once consolidated/cleared to empty, matCosts is gone and this card disappears (retirement). */}
          {matCosts.length > 0 && (
          <section className="card">
            <div className="h2">Older flat price list <span className="hint">legacy — being retired</span></div>
            <p className="hint" style={{ marginTop: -2 }}>An older CSV list with no trades or dates. Consolidate it into your governed price book (above) so these prices get trades, dedup, and staleness tracking — then this card goes away.</p>
            <div className="matsummary">
              <div className="matcount">✓ {matCosts.length} legacy price{matCosts.length !== 1 ? "s" : ""}</div>
              <div style={{ padding: "8px 11px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 12.5, color: "#8A5A12" }}>These are an <b>older flat list</b> (no trade, no dates). Consolidate them into your governed price book so they get trades, dedup, and staleness tracking.</div>
                <button className="btn primary full" style={{ marginTop: 6 }} disabled={csvBusy} onClick={migrateLegacyPrices}>{csvBusy ? "Sorting…" : "⇪ Consolidate into my price book"}</button>
              </div>
              <div className="matpreview">
                {matCosts.slice(0, 5).map((m, i) => (
                  <div className="matrow" key={i}><span>{m.name}{m.unit ? " (" + m.unit + ")" : ""}</span><b>{$0(m.cost)}</b></div>
                ))}
                {matCosts.length > 5 && <div className="hint">…and {matCosts.length - 5} more</div>}
              </div>
              <div className="btnrow">
                <button className="btn ghost grow1" onClick={clearMatCosts}>Clear list</button>
              </div>
            </div>
          </section>
          )}

          <section className="card">
            <button className="bookhead" onClick={() => setBookOpen(bookOpen === "price" ? "" : "price")}>
              <span className="h2" style={{ margin: 0 }}>Seed defaults <span className="hint">fallback prices · {priceBook.length} items</span></span>
              <span className="bookchev">{bookOpen === "price" ? "▲" : "▼"}</span>
            </button>
            {bookOpen === "price" && (
              <div className="bookbody">
                <p className="hint">Built-in fallback unit costs — used only when a takeoff line has no match in <b>your</b> Material Pricing book above. Edit any price toward your market, or add your real costs above so these are never reached.</p>
                {[...new Set(priceBook.map((m) => m.cat))].map((cat) => (
                  <div key={cat} className="bookcat">
                    <div className="bookcathd">{cat}</div>
                    {priceBook.filter((m) => m.cat === cat).map((m) => (
                      <div className="bookrow" key={m.id}>
                        <input className="in bkname" value={m.name} onChange={(e) => savePriceBook(priceBook.map((x) => x.id === m.id ? { ...x, name: e.target.value } : x))} />
                        <input className="in bkunit" value={m.unit} onChange={(e) => savePriceBook(priceBook.map((x) => x.id === m.id ? { ...x, unit: e.target.value } : x))} />
                        <input className="in bkval" type="number" inputMode="decimal" value={m.price} onChange={(e) => savePriceBook(priceBook.map((x) => x.id === m.id ? { ...x, price: num(e.target.value) } : x))} />
                        <button className="dimx" onClick={() => savePriceBook(priceBook.filter((x) => x.id !== m.id))}>×</button>
                      </div>
                    ))}
                  </div>
                ))}
                <button className="btn ghost full" onClick={() => savePriceBook([...priceBook, { id: "u-" + rid(), cat: "Custom", name: "New item", unit: "ea", price: 0 }])}>+ Add item</button>
              </div>
            )}
          </section>

          <section className="card">
            <button className="bookhead" onClick={() => setBookOpen(bookOpen === "rate" ? "" : "rate")}>
              <span className="h2" style={{ margin: 0 }}>Production rates <span className="hint">{rateBook.length} tasks</span></span>
              <span className="bookchev">{bookOpen === "rate" ? "▲" : "▼"}</span>
            </button>
            {bookOpen === "rate" && (
              <div className="bookbody">
                <p className="hint">Man-hours per unit of installed work (sq = 100 sqft). These drive the labor hours the estimator builds. Tune to YOUR crews.</p>
                {/* RATE AUDIT — persistent until every flag is resolved/acked; duplicates surfaced, never auto-deleted */}
                {(() => { const flags = rateBook.filter(rateOutOfRange); const dups = rtAuditOpen ? rtDupPairs() : []; return (flags.length > 0 || rtAuditOpen) ? (
                  <div style={{ marginBottom: 8, padding: "8px 11px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 12.5, color: "#8A5A12" }}>📋 Rate review{flags.length ? " — " + flags.length + " unusual rate" + (flags.length === 1 ? "" : "s") : " — no unusual rates"} <button className="btn ghost" style={{ padding: "1px 8px", fontSize: 11.5, marginLeft: 6 }} onClick={() => setRtAuditOpen((o) => !o)}>{rtAuditOpen ? "hide" : "review"}</button></div>
                    {rtAuditOpen && flags.map((r) => { const s = rateSanityOf(r.unit, r.task); return (
                      <div key={r.id} style={{ fontSize: 11.5, marginTop: 4 }}>
                        <b>{r.task}</b> — {r.rate} MH/{r.unit} (typical {s[0]}–{s[1]}) · reciprocal {rateRecip(r.rate)}
                        <button className="btn ghost" style={{ padding: "1px 8px", fontSize: 11, marginLeft: 6 }} onClick={() => rtUseRecip(r)}>Use {rateRecip(r.rate)}</button>
                        <button className="btn ghost" style={{ padding: "1px 8px", fontSize: 11, marginLeft: 4 }} onClick={() => rtAck(r.id)}>✓ Keep</button>
                      </div>
                    ); })}
                    {rtAuditOpen && dups.length > 0 && (
                      <div style={{ marginTop: 6, fontSize: 11.5 }}>
                        <b>Possible duplicates</b> <span className="hint">— pick which survives (delete via × in the list; nothing auto-deletes):</span>
                        {dups.map(([x, y], i) => (<div key={i} style={{ marginTop: 2 }}>• “{x.task}” ({x.rate}/{x.unit}) ↔ “{y.task}” ({y.rate}/{y.unit})</div>))}
                      </div>
                    )}
                  </div>
                ) : null; })()}
                {[...new Set(rateBook.map((r) => r.cat))].map((cat) => (
                  <div key={cat} className="bookcat">
                    <div className="bookcathd">{cat}</div>
                    {rateBook.filter((r) => r.cat === cat).map((r) => {
                      const ed = rtDraft && rtDraft.id === r.id ? rtDraft : null;
                      const rawV = ed ? num(ed.raw) : 0;
                      const mh = ed && rawV > 0 ? (ed.dir === "upmh" ? 1 / rawV : rawV) : 0;
                      const s = rateSanityOf(r.unit, r.task);
                      const flagged = rateOutOfRange(r);
                      return (
                      <React.Fragment key={r.id}>
                      <div className="bookrow">
                        <input className="in bkname" value={r.task} onChange={(e) => saveRateBook(rateBook.map((x) => x.id === r.id ? { ...x, task: e.target.value } : x))} />
                        <input className="in bkunit" value={r.unit} onChange={(e) => saveRateBook(rateBook.map((x) => x.id === r.id ? { ...x, unit: e.target.value } : x))} />
                        {/* DIRECTION TOGGLE — entry aid only; stored value is ALWAYS canonical MH/unit */}
                        <button type="button" className="btn ghost" style={{ padding: "1px 6px", fontSize: 10, fontWeight: (!ed || ed.dir === "mh") ? 700 : 400, borderColor: (!ed || ed.dir === "mh") ? "#14a04a" : undefined }} title="the number you type = hours per unit (stored as-is)" onClick={() => setRtDraft({ id: r.id, raw: ed ? ed.raw : String(r.rate), dir: "mh" })}>hrs/{r.unit || "unit"}</button>
                        <button type="button" className="btn ghost" style={{ padding: "1px 6px", fontSize: 10, fontWeight: (ed && ed.dir === "upmh") ? 700 : 400, borderColor: (ed && ed.dir === "upmh") ? "#14a04a" : undefined }} title="the number you type = units per hour (converted to hrs/unit on save)" onClick={() => setRtDraft({ id: r.id, raw: ed ? ed.raw : "", dir: "upmh" })}>{r.unit || "unit"}/hr</button>
                        <input className="in bkval" type="number" inputMode="decimal" step="0.01" value={ed ? ed.raw : r.rate} onFocus={() => { if (!ed) setRtDraft({ id: r.id, raw: String(r.rate), dir: "mh" }); }} onChange={(e) => setRtDraft({ id: r.id, raw: e.target.value, dir: ed ? ed.dir : "mh" })} onBlur={() => rtCommit(r)} />
                        <button className="dimx" onClick={() => saveRateBook(rateBook.filter((x) => x.id !== r.id))}>×</button>
                      </div>
                      {/* LIVE PREVIEW — reads back both directions + a 100-unit gut check, so an inverted entry is obvious */}
                      {ed && rawV > 0 && (() => { const mh3 = Math.round(mh * 1000) / 1000; const uph = Math.round((1 / mh) * 100) / 100; const h100 = Math.round(mh * 100); return (
                        <div className="hint" style={{ margin: "-2px 0 4px 2px", fontSize: 11.5 }}>= {mh3} hrs per {r.unit || "unit"} · {uph} {r.unit || "unit"} per hr · 100 {r.unit || "unit"} ≈ {h100} hrs (~{Math.round(h100 / 8)} man-days)</div>
                      ); })()}
                      {/* SANITY (warn only): out of the plausible range for this unit — offer the reciprocal, allow ack */}
                      {flagged && !ed && (
                        <div style={{ margin: "-2px 0 6px 2px", padding: "6px 9px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 8, fontSize: 11.5, color: "#8A5A12" }}>
                          ⚠️ {r.rate} is unusual for {r.unit} tasks (typical {s[0]}–{s[1]} MH/{r.unit}). Double-check direction — did you mean {rateRecip(r.rate)}?
                          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                            <button className="btn ghost" style={{ padding: "2px 9px", fontSize: 11.5 }} onClick={() => rtUseRecip(r)}>Use {rateRecip(r.rate)}</button>
                            <button className="btn ghost" style={{ padding: "2px 9px", fontSize: 11.5 }} onClick={() => rtAck(r.id)}>✓ Keep — it's right</button>
                          </div>
                        </div>
                      )}
                      </React.Fragment>
                    ); })}
                  </div>
                ))}
                <button className="btn ghost full" onClick={() => saveRateBook([...rateBook, { id: "u-" + rid(), cat: "Custom", task: "New task", unit: "sq", rate: 1 }])}>+ Add task</button>
              </div>
            )}
          </section>

          </div>
          {/* ACCOUNT & APP — Subscription + Invite/feedback, at the bottom (out of the estimating-setup flow). */}
          <button type="button" className={"secgroup accord" + (gOpen.app ? " open" : "")} onClick={() => toggleGroup("app")}>Account &amp; app <span className="hint">plan, invite, feedback</span><span className="accchev">{gOpen.app ? "▾" : "▸"}</span></button>
          <div id="prof-app" className="secbody" style={{ display: gOpen.app ? undefined : "none" }}>
          <section className="card">
            <div className="h2">Subscription <span className="hint">demo — no real billing</span></div>
            <div className="plangrid">
              {PLANS.map((pl) => (
                <button key={pl.id} className={"plan" + (me.plan === pl.id ? " on" : "")} onClick={() => setMe({ ...me, plan: pl.id })}>
                  <b>{pl.name}</b>
                  <span className="planprice">${pl.price}<i>/mo</i></span>
                  <span className="hint">{pl.blurb}</span>
                  {me.plan === pl.id && <span className="planon">✓ Active</span>}
                </button>
              ))}
            </div>
            {myPlan && myPlan.limit > 0 && <p className="hint" style={{ marginTop: 8 }}>{monthApps} of {myPlan.limit} applications used this month.</p>}
            <p className="hint" style={{ marginTop: 6 }}>Flat fee, no cut of your jobs — homeowners pay you directly.</p>
          </section>
          <div className="chooserbtns">
            <button className="btn ghost grow1" onClick={shareApp}><Share size={15} /> Invite someone</button>
            <button className="btn ghost grow1" onClick={sendFeedback}><MessageSquare size={15} /> Send feedback</button>
          </div>
          </div>{/* /prof-app secbody */}
        </main>
      )}

      {me.role === "contractor" && tab === "estimator" && !overlay && (
        <main className="page">
          {(!myPlan || me.plan !== "pro") ? (
            <section className="card">
              <div className="h1">Pro Estimator <span className="propill">PRO</span></div>
              <p className="body">Build full itemized estimates — material takeoff, labor hours, equipment, and a live margin slider — right from a photo, a description, or an EagleView/LiDAR report.</p>
              <ul className="bid-inc">
                <li>AI material takeoff with editable quantities &amp; costs</li>
                <li>Burdened labor + equipment + tax, priced bottom-up</li>
                <li>Drag-a-margin slider — watch your price move live</li>
                <li>Same aerial &amp; LiDAR report tools as the homeowner side</li>
              </ul>
              <button className="btn primary full" onClick={() => { setMe({ ...me, plan: "pro" }); flash("Pro unlocked — estimator ready."); }}>Upgrade to Pro ($149/mo)</button>
              <button className="btn ghost full" onClick={() => goTab("profile")}>See all plans</button>
            </section>
          ) : !estResult ? (
            <>
              {/* SAVED ESTIMATES library (build-set #3) */}
              {/* pending after-the-fact link — visible + cancellable so it can never silently hijack an unrelated estimate */}
              {cjLinkTarget && (() => { const t = costJobs.find((j) => j.id === cjLinkTarget); return t ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 11px", background: "#F4F8F5", border: "1px solid #DCE8DF", borderRadius: 10, marginBottom: 8, fontSize: 12.5 }}>
                  <span style={{ flex: 1 }}>🔗 This estimate will attach to <b>{t.name}</b> (after the fact)</span>
                  <button className="btn ghost" style={{ padding: "2px 9px" }} onClick={() => { setCjLinkTarget(null); flash("Link cancelled — the estimate will create its own job."); }}>✕ cancel</button>
                </div>
              ) : null; })()}
              {estimates.length > 0 && (
                <section className="card">
                  <button className="btn ghost full" style={{ justifyContent: "space-between", display: "flex" }} onClick={() => setSavedOpen((o) => !o)}>
                    <span>📁 Saved estimates</span><span className="hint">{estimates.length} · {savedOpen ? "hide" : "show"}</span>
                  </button>
                  {savedOpen && (
                    <div style={{ marginTop: 8 }}>
                      {estimates.slice().sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""))).map((rec) => (
                        <div key={rec.id} className="costrow" style={{ alignItems: "center", gap: 6 }}>
                          <span style={{ flex: 1, minWidth: 0 }}>
                            <b style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{rec.customerName || "(no name)"}{rec.status && rec.status !== "draft" ? " · " + rec.status : ""}{rec.payload && rec.payload.jobNotes ? " 📝" : ""}{rec.payload && rec.payload.jobPhotos && rec.payload.jobPhotos.length ? " 📷" + rec.payload.jobPhotos.length : ""}</b>
                            <span className="hint" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[rec.jobAddress, rec.title, (rec.updatedAt || "").slice(0, 10)].filter(Boolean).join(" · ")}</span>
                          </span>
                          <b style={{ whiteSpace: "nowrap" }}>{$0(rec.price || 0)}</b>
                          <button className="btn ghost" style={{ padding: "2px 8px" }} onClick={() => openSavedEstimate(rec)}>Open</button>
                          <button className="btn ghost" style={{ padding: "2px 6px" }} title="Rename" onClick={() => renameSavedEstimate(rec)}>✏️</button>
                          <button className="btn ghost" style={{ padding: "2px 6px" }} title="Delete" onClick={() => { if (window.confirm("Delete this saved estimate?")) deleteSavedEstimate(rec.id); }}>🗑</button>
                        </div>
                      ))}
                      <p className="hint" style={{ marginTop: 6 }}>Saved on this device only — not a backup yet (cache clear / new phone = gone). Export/PDF anything you send.</p>
                    </div>
                  )}
                </section>
              )}
              {whSpecs ? <HouseVisual view={houseView} selected={houseScope} activeTrade={activeTrade}
                onChipTap={(t) => { setActiveTrade(t); const v = (HOUSE_HOTSPOTS.find((h) => h.trade === t) || {}).state; if (v) setHouseView(v); if (HOUSE_TYPES[t] && houseScope[t] === true) setSelStep("type"); }}
                onChipRemove={(t) => { houseDeselect(t); if (activeTrade === t) setActiveTrade(null); }}
                onAddMore={() => setSelStep("trades")} /> : <section className="card"><p className="hint">Loading the house…</p></section>}

              <section className="card">
                <div className="convhead">{personaFace(curPersona)}<div className="h1" style={{ margin: 0 }}>{curPersona.name}</div>
                  <button className={"btn " + (voiceMode ? "primary" : "ghost")} style={{ marginLeft: "auto", padding: "4px 10px", fontSize: 13 }} onClick={toggleVoice} title={"Talk to " + curPersona.name + " — reads replies aloud and confirms numbers back"}>{voiceMode ? "🔊 Voice on" : "🔈 Voice"}</button>
                </div>
                <div className="convmsgs" style={{ maxHeight: 220, overflowY: "auto", marginTop: 6 }}>
                  {alMsgs.length === 0 && (
                    <div className="convrow ai"><div className="convav">{personaFace(curPersona, true)}</div><div className="convbubble ai">Hey, I'm {curPersona.name} — let's build this estimate. First: are we working outside, inside, or on the systems?</div></div>
                  )}
                  {alMsgs.map((m, i) => (
                    m.role === "ai"
                      ? <div className="convrow ai" key={i}><div className="convav">{personaFace(curPersona, true)}</div><div className="convbubble ai">{m.text}</div></div>
                      : <div className="convbubble me" key={i}>{m.text}</div>
                  ))}
                  {alBusy && (<div className="convrow ai"><div className="convav">{personaFace(curPersona, true)}</div><div className="convbubble ai typing"><span></span><span></span><span></span></div></div>)}
                </div>

                {(() => {
                  const tradesHere = HOUSE_HOTSPOTS.filter((h) => h.state === houseView);
                  const selKeys = Object.keys(houseScope);
                  const needType = selKeys.filter((t) => HOUSE_TYPES[t] && houseScope[t] === true);
                  return (
                    <div className="popin" style={{ marginTop: 8 }}>
                      {selStep === "category" && (
                        <>
                          <div className="convbubble ai" style={{ marginBottom: 6 }}>Outside, inside, or systems?</div>
                          <div style={{ display: "flex", gap: 6 }}>
                            {HOUSE_STATES.map((s) => (
                              <button key={s.key} className={"btn " + (houseView === s.key ? "primary" : "ghost")} style={{ flex: 1 }} onClick={() => { setHouseView(s.key); setSelStep("trades"); }}>{CAT_LABEL[s.key]}</button>
                            ))}
                          </div>
                        </>
                      )}
                      {selStep === "trades" && (
                        <>
                          <div className="convbubble ai" style={{ marginBottom: 6 }}>In {CAT_LABEL[houseView]}, what are you doing? Tap all that apply.</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {tradesHere.map((h) => {
                              const on = !!houseScope[h.trade];
                              return (
                                <button key={h.trade} className={"btn " + (on ? "primary" : "ghost")} style={{ padding: "6px 10px", fontSize: 13 }} onClick={() => { if (on) { houseDeselect(h.trade); if (activeTrade === h.trade) setActiveTrade(null); } else { houseSelect(h.trade, true); setActiveTrade(h.trade); } }}>{on ? "✓ " : ""}{h.label}</button>
                              );
                            })}
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                            <input value={customTrade} onChange={(e) => setCustomTrade(e.target.value)} placeholder="Something else? type a trade…" style={{ flex: 1 }} />
                            <button className="btn ghost" disabled={!customTrade.trim()} onClick={() => { houseSelect(customTrade.trim(), true); setActiveTrade(customTrade.trim()); setCustomTrade(""); }}>+ Add</button>
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                            <button className="btn ghost" onClick={() => setSelStep("category")}>← Change area</button>
                            <button className="btn primary grow1" disabled={!selKeys.length} onClick={() => setSelStep(needType.length ? "type" : "ready")}>{selKeys.length ? "Continue →" : "Pick a trade"}</button>
                          </div>
                        </>
                      )}
                      {selStep === "type" && needType.length > 0 && (() => {
                        const t = needType[0];
                        return (
                          <>
                            <div className="convbubble ai" style={{ marginBottom: 6 }}>{TRADE_LABEL(t)} — which type / system? <span className="hint">locks the takeoff so systems don't mix</span></div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {HOUSE_TYPES[t].map((ty) => (
                                <button key={ty} className="btn ghost" style={{ padding: "6px 10px", fontSize: 13 }} onClick={() => { houseSelect(t, ty); setActiveTrade(t); const rem = needType.filter((x) => x !== t); setSelStep(rem.length ? "type" : "ready"); }}>{ty}</button>
                              ))}
                            </div>
                            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                              <input value={customType} onChange={(e) => setCustomType(e.target.value)} placeholder="or type another system…" style={{ flex: 1 }} />
                              <button className="btn ghost" disabled={!customType.trim()} onClick={() => { houseSelect(t, customType.trim()); setActiveTrade(t); setCustomType(""); const rem = needType.filter((x) => x !== t); setSelStep(rem.length ? "type" : "ready"); }}>Use</button>
                            </div>
                            <p className="hint" style={{ marginTop: 6 }}>“Mixed” combines systems — AL sizes each part separately so the bid stays accurate.</p>
                          </>
                        );
                      })()}
                      {selStep === "ready" && (
                        <div className="convbubble ai">Scope locked in (pinned on the house above). Add measurements or photos below if you've got them, fill any blanks, then Build.</div>
                      )}
                      {/* selected-scope chips now live pinned on the house (the visual anchor), not here */}
                    </div>
                  );
                })()}

                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button className={"btn " + (voiceSession ? "primary" : "ghost")} style={{ padding: "0 12px", animation: listening ? "pulse 1s infinite" : "none" }} onClick={startVoiceInput} title={voiceSession ? "End hands-free conversation" : "Start a hands-free conversation"}>{voiceSession ? "■ Stop" : "🎤"}</button>
                  <input value={alInput} onChange={(e) => setAlInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") alSend(); }} placeholder={voiceSession ? (listening ? "Listening… just talk" : transcribing ? "Got it — one sec…" : "AL is talking…") : "e.g. “west slope is 8/12” or “what do you still need?”"} style={{ flex: 1 }} />
                  <button className="btn primary" disabled={alBusy || !alInput.trim()} onClick={() => alSend()}>Send</button>
                </div>
                {voiceSession
                  ? <p className="hint" style={{ marginTop: 4 }}>🎙️ Hands-free — just talk. Pause and {curPersona.name} takes the turn, reads it back, then listens again. No tapping until you hit ■ Stop.</p>
                  : voiceMode && <p className="hint" style={{ marginTop: 4 }}>🔊 Tap 🎤 once to start a hands-free conversation — say it (e.g. “standing seam, eight twelve, valley into the dormer”), pause, and {curPersona.name} fills it in and reads it back. iPhone needs the one tap to allow the mic.</p>}
              </section>

              <div style={{ display: "flex", gap: 6 }}>
                {/* No capture attr + multiple → the OS offers Camera AND Photo Library, and lets you pick several. */}
                <label className="btn ghost" style={{ flex: 1, cursor: "pointer", textAlign: "center" }}>📷 Photos
                  <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { const fs = e.target.files; e.target.value = ""; onWhPhotos(fs); }} />
                </label>
                <label className="btn ghost" style={{ flex: 1, cursor: "pointer", textAlign: "center", opacity: whReportBusy ? 0.6 : 1 }}>📄 Report
                  <input type="file" accept="image/*,application/pdf,.pdf" disabled={whReportBusy} style={{ display: "none" }} onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ""; handleWhReport(f); }} />
                </label>
                <button className="btn ghost" style={{ flex: 1 }} onClick={() => setWhMeasuredOpen((o) => !o)}>📐 Measure</button>
              </div>
              {whMeasuredOpen && (
                <section className="card"><p className="hint">Order or upload measurements: <a href="https://www.eagleview.com" target="_blank" rel="noopener noreferrer">EagleView</a> / <a href="https://hover.to" target="_blank" rel="noopener noreferrer">Hover</a> (roof &amp; exterior) · <a href="https://poly.cam" target="_blank" rel="noopener noreferrer">Polycam</a> (interior). Then tap 📄 Report to upload it and AL reads the numbers.</p></section>
              )}
              {(whPhotos.length > 0 || whDims) && (
                <section className="card">
                  {whPhotos.length > 0 && (<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{whPhotos.map((p, i) => (<div className="thumb" key={i}><img src={p} alt="" /><button onClick={() => setWhPhotos((a) => a.filter((_, idx) => idx !== i))}>×</button></div>))}</div>)}
                  {whReportBusy && <p className="hint">Reading the report…</p>}
                  {whDims && <p className="ai-note" style={{ marginTop: 6 }}>📐 {whDims} <button className="btn ghost" style={{ padding: "0 6px", marginLeft: 6 }} onClick={() => setWhDims("")}>✕</button></p>}
                </section>
              )}

              {Object.keys(houseScope).length > 0 && (
                <section className="card">
                  <div className="seclabel">Details <span className="hint">fill any blanks — AL pre-fills from your files</span></div>
                  {Object.keys(houseScope).map((ht) => {
                    const pbk = PB_TRADE_KEY[ht];
                    const spec = pbk ? (whSpecs || []).find((s) => s.trade === pbk) : null;
                    const own = pbk ? (enginePB || []).filter((e) => e && String(e.trade) === pbk && String(e.material || "").trim()).map((e) => String(e.material).trim()) : [];
                    const ownUniq = own.filter((m, i) => own.indexOf(m) === i);
                    const mats = ownUniq.concat((MATERIAL_SUGGESTIONS[ht] || []).filter((m) => !ownUniq.includes(m)));
                    const curMat = houseScope[ht];
                    const isSS = /standing seam|snap.?lock|\blok\b|metal panel/i.test(String(curMat || "") + " " + ht);
                    return (
                      <div className="card" style={{ marginTop: 10, borderColor: activeTrade === ht ? "#0a7d36" : undefined }} key={ht} onClick={() => setActiveTrade(ht)}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span className="seclabel">✓ {TRADE_LABEL(ht)}{curMat && curMat !== true ? " · " + curMat : ""}</span>
                          <button className="btn ghost" style={{ padding: "2px 8px" }} onClick={(e) => { e.stopPropagation(); houseDeselect(ht); if (activeTrade === ht) setActiveTrade(null); }}>remove</button>
                        </div>
                        <label className="estf" style={{ marginTop: 6 }}><span>Material{HOUSE_TYPES[ht] ? " / system" : ""}</span>
                          <select value={(curMat && curMat !== true) ? curMat : ""} onChange={(e) => houseSelect(ht, e.target.value)}>
                            <option value="">— choose —</option>
                            {curMat && curMat !== true && !(HOUSE_TYPES[ht] || mats).includes(curMat) && <option value={curMat}>{curMat}</option>}
                            {(HOUSE_TYPES[ht] || mats).map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </label>
                        {isSS && (
                          <label className="estf" style={{ marginTop: 6 }}><span>Panel width (in)</span>
                            <select value={num(housePanelW[ht]) || 0} onChange={(e) => setHousePanelW((p) => ({ ...p, [ht]: num(e.target.value) }))}>
                              <option value={0}>default</option>{[12, 16, 18].map((w) => <option key={w} value={w}>{w}"</option>)}
                            </select>
                          </label>
                        )}
                        {spec ? (
                          <div className="estfields" style={{ marginTop: 6 }}>
                            {spec.inputs.map((inp) => (
                              <label className="estf" key={inp.name}>
                                <span>{inp.label}{inp.unit ? " (" + inp.unit + ")" : ""}{inp.required ? " *" : ""}</span>
                                {inp.type === "enum"
                                  ? <select value={(whInputs[pbk] && whInputs[pbk][inp.name] != null) ? whInputs[pbk][inp.name] : inp.default} onChange={(e) => whSet(pbk, inp.name, e.target.value)}>{(inp.enumValues || []).map((ev) => <option key={ev} value={ev}>{ev}</option>)}</select>
                                  : <input type="number" value={(whInputs[pbk] && whInputs[pbk][inp.name] != null) ? whInputs[pbk][inp.name] : ""} onChange={(e) => whSet(pbk, inp.name, num(e.target.value))} />}
                              </label>
                            ))}
                          </div>
                        ) : (
                          <p className="hint" style={{ marginTop: 6 }}>No fixed dimensions — AL prices this from your description, photos, and measurements.</p>
                        )}
                      </div>
                    );
                  })}
                </section>
              )}

              <button className="btn primary full big" disabled={estBusy === "run" || !Object.keys(houseScope).length} style={{ marginTop: 4 }} onClick={buildUnifiedEstimate}>
                {estBusy === "run" ? "Building takeoff…" : (Object.keys(houseScope).length ? "✦ Build Estimate (" + Object.keys(houseScope).length + " trade" + (Object.keys(houseScope).length === 1 ? "" : "s") + ")" : "Add a trade to build")}
              </button>
              {/* PREFLIGHT WAIT — the build runs the Opus pre-flight pass (verify takeoff + labor +
                  catch errors). Show an honest single-message spinner so the screen never looks frozen. */}
              {estBusy === "run" && (
                <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                  <span className="spin" style={{ width: 22, height: 22, borderRadius: "50%", border: "3px solid #d8e0e8", borderTopColor: "#14a04a", flex: "0 0 auto" }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>Finalizing your estimate…</div>
                    <div className="hint">AL is double-checking the takeoff, labor, and price before it's saved — a few seconds.</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            (() => {
              const trades = estResult.trades || [];
              const tradeCost = (t) => { const matTotal = t.items.reduce((a, b) => a + (num(b.cost) || 0), 0); const matTax = Math.round(matTotal * t.taxRate); const labor = Math.round(t.laborHours * t.laborRate); return { matTotal, matTax, labor, cost: labor + matTotal + matTax + t.equipment }; };
              const tradesCost = trades.reduce((a, t) => a + tradeCost(t).cost, 0);
              const mob = mobilizeCostOf(trades);
              const combined = tradesCost + mob;
              const sell = Math.round(combined / (1 - estMargin / 100) / 25) * 25;
              const profit = sell - combined;
              const mr = mobRates();
              const mobMiles = Math.max(0, num(estMiles) || 0);
              const mobCrew = trades.reduce((m, t) => Math.max(m, num(t.crew) || 1), 1);
              return (
                <>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                    <button className="btn ghost grow1" onClick={() => { persistCurrent(); setEstResult(null); }}>← Back to scope</button>
                    <button className="btn ghost grow1" onClick={startNewEstimate}>Start new estimate</button>
                  </div>
                  <button className="btn primary full" style={{ marginBottom: 4 }} onClick={openProposal}>📄 Present proposal to homeowner</button>
                  <button className="btn ghost full" style={{ marginBottom: 4 }} onClick={() => { persistCurrent(); openTimer(); }}>⏱ Track time on this job <span className="hint">log actual hours per phase</span></button>
                  {/* DIAGNOSTICS ("flight recorder") — export the build trail, or a fetchable link for an advisor. */}
                  {estResult && estResult.diag && (
                    <section className="card" style={{ marginBottom: 4 }}>
                      <div className="h2">Diagnostics <span className="hint">flight recorder</span></div>
                      <p className="hint" style={{ marginTop: -2 }}>Captures HOW this bid was built — the raw AI output, the final takeoff, and each line's price provenance — for debugging or diffing two runs.</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button className="btn ghost grow1" onClick={exportDiagnostics}>⬇ Export diagnostics</button>
                        <button className="btn ghost grow1" disabled={diagBusy} onClick={copyDiagLink}>{diagBusy ? "Linking…" : "🔗 Copy diagnostic link"}</button>
                      </div>
                      {diagLink && (
                        <div style={{ marginTop: 8 }}>
                          <div className="hint mono" style={{ wordBreak: "break-all" }}>{diagLink}</div>
                          <p className="hint" style={{ color: "#8A5A12", marginTop: 4 }}>⚠️ Anyone with this link can read this bundle (your costs + margin). Unguessable, not private — auto-expires in ~30 days.</p>
                          <button className="btn ghost" style={{ marginTop: 4 }} onClick={deleteDiagLink}>Delete link</button>
                        </div>
                      )}
                    </section>
                  )}
                  {/* customer + address — identify the saved estimate (auto-saves) */}
                  <section className="card" style={{ marginBottom: 4 }}>
                    <div className="estfields">
                      <label className="estf"><span>Customer</span><input value={estCustomer} onChange={(e) => setEstCustomer(e.target.value)} placeholder="name" /></label>
                      <label className="estf"><span>Job address</span><input value={estAddress} onChange={(e) => setEstAddress(e.target.value)} placeholder="address" /></label>
                      <label className="estf"><span>Customer email</span><input type="email" value={estEmail} onChange={(e) => setEstEmail(e.target.value)} placeholder="name@email.com" /></label>
                      <label className="estf"><span>Status</span>
                        <select value={estStatus} onChange={(e) => setEstStatus(e.target.value)}>
                          {["draft", "sent", "won", "lost"].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </label>
                    </div>
                    <p className="hint" style={{ marginTop: 4 }}>💾 Auto-saved on this device. Local only — not a backup yet; export/PDF anything you send.</p>
                  </section>
                  {/* JOB NOTES & PHOTOS — saved with this job (auto-saves). Photos: library or camera, multi-select. */}
                  <section className="card" style={{ marginBottom: 4 }}>
                    <div className="seclabel">📝 Job notes &amp; photos <span className="hint">saved with this job</span></div>
                    <textarea className="desc" rows={3} value={estNotes} onChange={(e) => setEstNotes(e.target.value)} placeholder="Notes on this job — access, colors, change orders, punch list, reminders…" />
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <label className="btn ghost" style={{ flex: 1, cursor: "pointer", textAlign: "center" }}>📷 Add job photos
                        <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { const fs = e.target.files; e.target.value = ""; onJobPhotos(fs); }} />
                      </label>
                    </div>
                    {estJobPhotos.length > 0 && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                        {estJobPhotos.map((p, i) => (<div className="thumb" key={i}><img src={p} alt={"Job photo " + (i + 1)} /><button onClick={() => setEstJobPhotos((a) => a.filter((_, idx) => idx !== i))}>×</button></div>))}
                      </div>
                    )}
                    <p className="hint" style={{ marginTop: 6 }}>{estJobPhotos.length} photo{estJobPhotos.length === 1 ? "" : "s"} · from your library or the camera.</p>
                  </section>
                  <div className="h1" style={{ marginBottom: 2 }}>{trades.length === 1 ? trades[0].title : "Combined estimate — " + trades.length + " trades"}</div>
                  {estResult.errors && estResult.errors.length > 0 && <p className="hint">Couldn't build: {estResult.errors.map((e) => e.label).join(", ")} — tap Back to retry.</p>}

                  {trades.map((t, ti) => {
                    const c = tradeCost(t);
                    return (
                      <section className="card" key={ti}>
                        {trades.length > 1 && <div className="h2" style={{ marginBottom: 4 }}>{t.label || t.title}</div>}
                        {/* OFF-MANUAL — bid from general knowledge (no Caza standard assembly). Flag lower confidence, surface assumptions/questions, offer to graduate it into the manual. */}
                        {t.offManual && !t.addedToManual && (
                          <div style={{ margin: "4px 0 8px", padding: "10px 12px", background: "#FFF4E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5, color: "#8A5A12" }}>
                            <div style={{ fontWeight: 800 }}>⚠️ Off-manual — bid from general knowledge</div>
                            <div style={{ marginTop: 2 }}>This isn't a standardized scope in your Caza Manual. I built the assembly from general knowledge — materials &amp; approach should be sound, but the labor and pricing are my best estimate for this job type, <b>not a verified Caza standard</b>. Review closely before you bid.</div>
                            {Array.isArray(t.assumptions) && t.assumptions.length > 0 && (
                              <div style={{ marginTop: 6 }}><b>Assumptions:</b>{t.assumptions.map((a, i) => (<div key={i}>• {a}</div>))}</div>
                            )}
                            {Array.isArray(t.questions) && t.questions.length > 0 && (
                              <div style={{ marginTop: 6 }}><b>Your real numbers would verify this:</b>{t.questions.map((q, i) => (<div key={i}>• {q}</div>))}<div className="hint" style={{ marginTop: 2 }}>Enter them in the labor &amp; takeoff fields below.</div></div>
                            )}
                            {(profC.offManualSeen && profC.offManualSeen[t.offManualKey] >= 2) && (
                              <div style={{ marginTop: 8, fontWeight: 700 }}>You've bid this {profC.offManualSeen[t.offManualKey]} times — add it so it's verified next time.</div>
                            )}
                            <button className="btn primary" style={{ marginTop: 8, padding: "4px 12px", fontSize: 12.5 }} onClick={() => addOffManualToManual(ti)}>➕ Add “{cmMatchKey(t) || (t.label || "this scope")}” to your Caza Manual</button>
                          </div>
                        )}
                        {t.addedToManual && (<div style={{ fontSize: 12, color: "#1B7A3D", margin: "4px 0 8px", fontWeight: 600 }}>✓ Added to your Caza Manual — verify the assembly + rate in Profile.</div>)}
                        {/* F12 — advisory market-sanity band (catches template-fiction bids + fat-finger inputs; never blocks) */}
                        {t.sanityFlag && (<div style={{ margin: "4px 0 8px", padding: "8px 11px", background: "#FFF4E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5, color: "#8A5A12", fontWeight: 600 }}>📉 {t.sanityFlag}</div>)}
                        {t.aiBuilt && !(t.calibN > 0) && (<div style={{ margin: "4px 0 8px", padding: "8px 11px", background: "#FFF4E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5, color: "#8A5A12", fontWeight: 600 }}>🤖 AI-built trade — VERIFY before bidding.</div>)}
                        {t.calibN > 0
                          ? <div style={{ margin: "4px 0 8px", padding: "8px 11px", background: "#F0FAF3", border: "1px solid #BFE6CC", borderRadius: 10, fontSize: 12.5, color: "#1B7A3D", fontWeight: 600 }}>✓ Calibrated from {t.calibN} job{t.calibN === 1 ? "" : "s"} — labor ×{t.calibFactor}.</div>
                          : (t.calibKey ? <p className="hint" style={{ marginBottom: 6 }}>Uncalibrated — log this job's real hours when it's done to dial in “{t.calibKey}”.</p> : null)}
                        {t.manualLoaded
                          ? <div className="manualbadge on">📘 Caza {t.manualKey} manual loaded</div>
                          : (t.manualKey ? <div className="manualbadge off">⚪ No manual loaded ({t.manualKey}) — built-in trade logic</div> : null)}
                        {/* ASSEMBLY WALK — install order at a glance (doubles as a crew brief); coherence flags below. */}
                        {Array.isArray(t.assemblyWalk) && t.assemblyWalk.length > 0 && (
                          <details style={{ margin: "4px 0 8px", padding: "8px 11px", background: "#F4F8F5", border: "1px solid #DCE8DF", borderRadius: 10 }}>
                            <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 12.5 }}>🔧 Assembly <span className="hint">{t.assemblyWalk.length} steps · install order</span></summary>
                            <ol style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 12.5 }}>
                              {t.assemblyWalk.map((s, i) => (
                                <li key={i} style={{ marginBottom: 3 }}><b>{s.layer}</b>{s.sitsOn ? <span className="hint"> — on {s.sitsOn}</span> : null}{s.lappedBy ? <span className="hint"> · lapped by {s.lappedBy}</span> : null}{s.fastenedWith ? <span className="hint"> · fastened: {s.fastenedWith}</span> : null}</li>
                              ))}
                            </ol>
                          </details>
                        )}
                        {Array.isArray(t.walkFlags) && t.walkFlags.length > 0 && (
                          <div style={{ margin: "4px 0 8px", padding: "8px 11px", background: "#FFF4E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5, color: "#8A5A12" }}>
                            <b>⚠️ Assembly check:</b>{t.walkFlags.map((f, i) => (<div key={i}>• {f}</div>))}
                          </div>
                        )}
                        {t.notes && <p className="hint">{t.notes}</p>}
                        {t.checks && t.checks.length > 0 && (
                          <div style={{ margin: "9px 0 5px", padding: "9px 11px", background: "#F0FAF3", border: "1px solid #BFE6CC", borderRadius: 10 }}>
                            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1B7A3D", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 4 }}>✓ Opus pre-flight check</div>
                            {t.checks.map((c2, i) => (<div key={i} style={{ fontSize: 12.5, color: "#2F4A39", lineHeight: 1.45 }}>• {c2}</div>))}
                          </div>
                        )}
                        {/* CAZA MANUAL — preflight deviations flagged vs the company standard; accept (conform) or override (keep). */}
                        {Array.isArray(t.cazaDeviations) && (t.cazaDeviations.length > 0 ? (
                          <div style={{ margin: "9px 0 5px", padding: "9px 11px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 10 }}>
                            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#8A5A12", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 4 }}>⚑ Caza Manual — {t.cazaDeviations.length} flagged vs your standard</div>
                            {t.cazaDeviations.map((dv, di) => (
                              <div key={di} style={{ fontSize: 12.5, color: "#5a4a2a", lineHeight: 1.4, padding: "5px 0", borderTop: di ? "1px solid #f0e2c4" : "none" }}>
                                <div><b>{dv.kind === "missing" ? "Missing: " : dv.kind === "extra" ? "Shouldn't be here: " : dv.kind === "labor" ? "Labor rate: " : dv.kind === "vendor" ? "Non-preferred brand: " : "Off-spec: "}</b>{dv.found && dv.found !== "—" ? dv.found + " → " : ""}<b>{dv.kind === "labor" && dv.standard && !/\$|hr/.test(dv.standard) ? "$" + dv.standard + "/hr" : (dv.standard || dv.item)}</b></div>
                                {dv.note && <div className="hint" style={{ marginTop: 1 }}>{dv.note}</div>}
                                {dv.status ? (
                                  <div style={{ fontSize: 12, fontWeight: 700, color: dv.status === "accepted" ? "#1B7A3D" : "#8A5A12", marginTop: 3 }}>{dv.status === "accepted" ? "✓ Conformed to Caza standard" : "↪ Kept as-is (override)"}</div>
                                ) : (
                                  <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                                    <button className="btn primary" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => estManualResolve(ti, di, "accepted")}>Use Caza standard</button>
                                    <button className="btn ghost" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => estManualResolve(ti, di, "overridden")}>Keep custom</button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ fontSize: 12, color: "#1B7A3D", margin: "6px 0 2px", fontWeight: 600 }}>✓ Matches your Caza standard</div>
                        ))}
                        {t.primaryOptions && t.primaryOptions.length > 0 && (
                          <>
                            <div className="seclabel">Popular local options <span className="hint">good · better · best — tap to use</span></div>
                            <div className="tiergrid">
                              {t.primaryOptions.map((o, i) => (
                                <div className={"tiercard" + (t.chosenTier === o.tier ? " on" : "")} key={i} style={o.offFamily ? { borderColor: "#F2C98A", background: "#FFF7E6" } : undefined}>
                                  <div className="tiertop"><span className="tierbadge">{o.tier}</span><span className="tiercost">{$0(o.cost)}</span></div>
                                  <div className="tiername">{o.name}</div>
                                  {o.offFamily && <div style={{ fontSize: 11.5, color: "#8A5A12", fontWeight: 700, marginTop: 2 }}>⚠️ Off-family — not the job's material. Verify before offering.</div>}
                                  {o.why && <div className="tierwhy">{o.why}</div>}
                                  <div className="tieract">
                                    <button className={"btn " + (t.chosenTier === o.tier ? "primary" : "ghost") + " grow1"} onClick={() => estPickTier(ti, o)}>{t.chosenTier === o.tier ? "✓ Using" : "Use this"}</button>
                                    {o.url && /^https?:\/\//.test(o.url) && (<a className="btn ghost grow1" href={o.url} target="_blank" rel="noopener noreferrer">View ↗</a>)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        <div className="seclabel">Material takeoff <span className="hint">tap any field to edit</span></div>
                        <div className="takeoff">
                          {t.items.map((it, i) => (
                            <React.Fragment key={i}>
                            <div className="toitem">
                              <input className="toname" value={it.name} onChange={(e) => estItemSet(ti, i, "name", e.target.value)} />
                              <input className="toqty" type="number" value={it.qty} onChange={(e) => estItemSet(ti, i, "qty", e.target.value)} />
                              <input className="tounit" value={it.unit} onChange={(e) => estItemSet(ti, i, "unit", e.target.value)} placeholder="unit" />
                              {it.fabMetal ? <span className="todollar" title="cut width — inches of flat stock (incl. hems); $/LF derives from 4x10 sheet yield">✂<input className="tocost" type="number" step="0.5" value={it.cutW || ""} onChange={(e) => estItemSet(ti, i, "cutW", e.target.value)} /></span> : null}
                              <span className="todollar" title="unit price">$<input className="tocost" type="number" value={it.unitPrice != null ? Math.round(num(it.unitPrice) * 100) / 100 : 0} onChange={(e) => estItemSet(ti, i, "unitPrice", e.target.value)} /></span>
                              <b className="tolinecost" title={(it.priceNote ? it.priceNote + " · " : "") + (it.unpriced ? "No price in your cost book — add this material's price" : (it.placeholder || it.priceTier === "seed") ? "Placeholder/seed price — not your real cost yet; tune it before this rolls into a sell price" : it.priceTier === "pricebook" ? "Priced from your price book" : it.priceTier === "retail" ? "HD/Lowe's retail — verify" : "")}>{it.unpriced ? "⚠️ " : (it.placeholder || it.priceTier === "seed") ? "⚠️ " : it.priceTier === "pricebook" ? "📗 " : it.priceTier === "retail" ? "🏷️ " : ""}{$0(it.cost)}</b>
                              <button className="todel" onClick={() => estItemDel(ti, i)}><X size={14} /></button>
                            </div>
                            {it.priceNote ? <div className="tonote" style={{ fontSize: 11, lineHeight: 1.3, margin: "-2px 0 4px 2px", color: /tap to set/.test(it.priceNote) ? "#8A5A12" : "#6b7280" }}>{/tap to set/.test(it.priceNote) ? "⚠️ " : "≈ "}{it.priceNote}</div> : null}
                            </React.Fragment>
                          ))}
                          <button className="btn ghost full" onClick={() => estItemAdd(ti)}><Plus size={14} /> Add material line</button>
                        </div>
                        <div className="seclabel" style={{ marginTop: 12 }}>Labor &amp; site</div>
                        <div className="estfields">
                          <label className="estf"><span>Man-hours</span><input type="number" value={t.laborHours} onChange={(e) => estTradeField(ti, "laborHours", num(e.target.value))} /></label>
                          <label className="estf"><span>Burdened $/hr</span><input type="number" value={t.laborRate} onChange={(e) => estTradeField(ti, "laborRate", num(e.target.value))} /></label>
                          <label className="estf"><span>Crew</span><input type="number" value={t.crew} onChange={(e) => estTradeField(ti, "crew", num(e.target.value))} /></label>
                          <label className="estf"><span>Days on site</span><input type="number" value={t.days} onChange={(e) => estTradeField(ti, "days", num(e.target.value))} /></label>
                          <label className="estf"><span>Equipment $</span><input type="number" value={t.equipment} onChange={(e) => estTradeField(ti, "equipment", num(e.target.value))} /></label>
                          <label className="estf"><span>Tax rate</span><input type="number" step="0.001" value={t.taxRate} onChange={(e) => estTradeField(ti, "taxRate", num(e.target.value))} /></label>
                        </div>
                        {Array.isArray(t.phases) && t.phases.length > 0 && (
                          <div style={{ marginTop: 10 }}>
                            <div className="seclabel">Phase bid <span className="hint">man-hours per phase — what the on-site timer compares against</span></div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                              {t.phases.map((ph, pi) => (
                                <span key={pi} style={{ fontSize: 12, background: "#eef2f6", color: "#33414f", border: "1px solid #dde3ea", borderRadius: 12, padding: "3px 10px" }}><b>{ph.name}</b> {ph.bidHours} hr</span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="costbox" style={{ marginTop: 12 }}>
                          <div className="costrow"><span>Materials ({t.items.length} lines)</span><b>{$0(c.matTotal)}</b></div>
                          <div className="costrow"><span>Material tax ({(t.taxRate * 100).toFixed(1)}%)</span><b>{$0(c.matTax)}</b></div>
                          <div className="costrow"><span>Labor — {t.laborHours} hrs @ {$0(t.laborRate)}/hr <span className="labtag book" title="Burdened rate: base wage + comp/insurance + payroll taxes + overhead (not bare wage)">burdened</span>{t.laborSource === "ratebook" ? <span className="labtag book">rate book</span> : t.laborSource === "engine" ? <span className="labtag book">engine</span> : <span className="labtag est">AI est. · verify</span>}</span><b>{$0(c.labor)}</b></div>
                          {t.rateFloored && <div className="costrow"><span className="hint">↳ raised to the {$0(t.rateFloor)}/hr burdened minimum for this trade — override above if your loaded cost differs</span><b></b></div>}
                          <div className="costrow"><span>Equipment / disposal</span><b>{$0(t.equipment)}</b></div>
                          {t.equipFloored && <div className="costrow"><span className="hint">↳ raised to the $1,000 30-yd roofing-dumpster standard — override above if your hauler differs</span><b></b></div>}
                          <div className="costrow total"><span>{(t.label || "Trade")} cost</span><b>{$0(c.cost)}</b></div>
                        </div>
                        {t.calibKey && (logOpen === t.calibKey ? (
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
                            <input type="number" value={logMH} onChange={(e) => setLogMH(e.target.value)} placeholder={"Actual MH (est " + t.laborHours + ")"} style={{ flex: 1 }} />
                            <button className="btn primary" onClick={() => { logActuals(t.calibKey, t.laborHours, num(logMH), t.title); }}>Save</button>
                            <button className="btn ghost" onClick={() => { setLogOpen(false); setLogMH(""); }}>✕</button>
                          </div>
                        ) : (
                          <button className="btn ghost" style={{ marginTop: 8, fontSize: 12 }} onClick={() => setLogOpen(t.calibKey)}>📋 Log job actuals (calibrate)</button>
                        ))}
                      </section>
                    );
                  })}

                  <section className="card">
                    <div className="costbox">
                      {trades.length > 1 && trades.map((t, ti) => (<div className="costrow" key={ti}><span>{t.label || t.title}</span><b>{$0(tradeCost(t).cost)}</b></div>))}
                      {trades.length > 1 && <div className="costrow"><span>Trades subtotal</span><b>{$0(tradesCost)}</b></div>}
                      {/* Delivery / mobilization — one round trip; cost-true, gross margin lands on top */}
                      <div className="costrow" style={{ alignItems: "center", flexWrap: "wrap", rowGap: 4 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <input type="checkbox" checked={estMobOn} onChange={(e) => setEstMobOn(e.target.checked)} title="Include the delivery / mobilization charge on this job" />
                          Delivery / mobilization
                          <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            · round-trip <input type="number" min="0" value={estMiles} disabled={!estMobOn} onChange={(e) => setEstMiles(num(e.target.value))} style={{ width: 56, padding: "2px 6px", border: "1px solid #dde3ea", borderRadius: 6, opacity: estMobOn ? 1 : 0.5 }} /> mi
                          </span>
                        </span>
                        <b>{$0(mob)}</b>
                      </div>
                      {estMobOn && (
                        <div className="costrow"><span className="hint">↳ {$0(mr.base)} base + {mobMiles} mi × {mobCrew} crew drive-time + {mobMiles} mi × ${mr.truck.toFixed(2)}/mi truck · rates in Profile → cost book</span><b></b></div>
                      )}
                      <div className="costrow total"><span>{trades.length > 1 ? "Total job cost" : "Job cost"}</span><b>{$0(combined)}</b></div>
                    </div>
                    <div className="marginbox" style={{ marginTop: 12 }}>
                      <div className="marginhead"><span>Gross margin</span><span className="marginpct">{estMargin}%</span></div>
                      <input className="bidslider" type="range" min="15" max="50" step="1" value={estMargin} style={{ ["--pct"]: ((estMargin - 15) / 35 * 100) + "%" }} onChange={(e) => setEstMargin(num(e.target.value))} />
                      <div className="bidends"><span>15%</span><span className="hint">profit {$0(profit)}</span><span>50%</span></div>
                      <div className="sellprice"><span>Your price</span><b>{$0(sell)}</b></div>
                      {/* PART 4 — Caza pricing check: flag margin below the floor / price below the job minimum. */}
                      {(() => {
                        const floor = cazaMarginFloor(profC.cazaManual), jobMin = cazaJobMin(profC.cazaManual), std = cazaMarginStd(trades, profC.cazaManual);
                        const belowFloor = floor > 0 && estMargin < floor, belowMin = jobMin > 0 && sell < jobMin;
                        if (!belowFloor && !belowMin) return <div style={{ marginTop: 6, fontSize: 12, color: "#1B7A3D", fontWeight: 600 }}>✓ Within your Caza pricing rules — {std}% standard{floor ? ", " + floor + "% floor" : ""}{jobMin ? ", " + $0(jobMin) + " min" : ""}</div>;
                        return (
                          <div style={{ marginTop: 8, padding: "8px 11px", background: "#FFF7E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5, color: "#8A5A12" }}>
                            {belowFloor && <div>⚑ Margin {estMargin}% is below your Caza floor of {floor}%. <button className="linkbtn" style={{ color: "#8A5A12", fontWeight: 700 }} onClick={() => setEstMargin(std)}>Use {std}% standard</button></div>}
                            {belowMin && <div style={{ marginTop: belowFloor ? 4 : 0 }}>⚑ Price {$0(sell)} is below your Caza job minimum of {$0(jobMin)}.</div>}
                          </div>
                        );
                      })()}
                    </div>
                  </section>
                </>
              );
            })()
          )}
          {/* FIX 1 — the price book + all intakes moved to Profile → Pricing; estimator keeps a deep-link (auto-opens that group). */}
          <button className="btn ghost full" style={{ marginTop: 10 }} onClick={() => { setGOpen((o) => ({ ...o, pricing: true })); goTab("settings"); }}>💲 Manage prices in Profile → Pricing <span className="hint">{enginePB.length} item{enginePB.length === 1 ? "" : "s"}{(() => { const n = enginePB.filter(priceIsStale).length; return n ? " · " + n + " stale" : ""; })()}</span></button>
        </main>
      )}

      {me.role === "contractor" && tab === "estimator" && timerView && estResult && estResult.trades && (
        <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "#fff", overflowY: "auto" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", padding: 14, paddingBottom: 40 }}>
            {timerView === "timer" ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="h1" style={{ flex: 1, margin: 0 }}>⏱ Time audit{estCustomer.trim() ? " — " + estCustomer.trim() : ""}</div>
                  <button className="btn ghost" onClick={closeTimer}>✕</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                  <span className="hint">Job crew</span>
                  <button className="btn ghost" style={{ padding: "2px 10px" }} onClick={() => setJobCrew(Math.max(1, jobCrew - 1))}>−</button>
                  <b style={{ minWidth: 16, textAlign: "center" }}>{jobCrew}</b>
                  <button className="btn ghost" style={{ padding: "2px 10px" }} onClick={() => setJobCrew(jobCrew + 1)}>+</button>
                  <span className="hint">each phase defaults to this</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className={"btn " + (timerRec ? "primary" : "ghost")} style={{ flex: 1, animation: timerRec ? "pulse 1s infinite" : "none" }} onClick={() => timerRecOnce(timerVoiceCommand)}>{timerRec ? "● Listening… tap to send" : "🎤 “starting dry-in, two guys”"}</button>
                  <button className="btn ghost" onClick={() => { commitAllRunning(); flash("Paused all phases."); }}>⏸ Pause all</button>
                </div>
                {(() => {
                  const running = []; let totMh = 0;
                  estResult.trades.forEach((t) => (t.phases || []).forEach((ph) => { totMh += phaseManHours(ph); if (ph.running) running.push(ph.name + " · " + phaseCrew(ph) + " guys"); }));
                  totMh = Math.round(totMh * 10) / 10;
                  return (
                    <div style={{ marginTop: 8, padding: "8px 11px", borderRadius: 10, background: running.length ? "#eafaf0" : "#f3f4f6", border: "1px solid " + (running.length ? "#36e07a" : "#e6e8ea"), fontWeight: 700 }}>
                      {running.length
                        ? <span style={{ color: "#0a7d36" }}>● Running: {running.join("  ·  ")}</span>
                        : <span className="hint">No phase running — tap ▶ Start on a phase below.</span>}
                      <span style={{ float: "right" }}>{totMh} mh so far</span>
                    </div>
                  );
                })()}
                {estResult.trades.map((t, ti) => (
                  <section className="card" key={ti} style={{ marginTop: 10 }}>
                    <div className="seclabel">{t.label || t.title}</div>
                    {(t.phases || []).map((ph, pi) => {
                      const mh = phaseManHours(ph);
                      return (
                        <div key={pi} style={{ marginTop: pi ? 6 : 0, padding: "8px", borderRadius: 8, background: ph.running ? "#eafaf0" : "transparent", border: ph.running ? "1px solid #36e07a" : "1px solid #eef0f2" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <button className={"btn " + (ph.running ? "primary" : "ghost")} style={{ padding: "8px 14px", animation: ph.running ? "pulse 1s infinite" : "none" }} onClick={() => ph.running ? phasePause(ti, pi) : phaseStart(ti, pi)}>{ph.running ? "⏸ Stop" : "▶ Start"}</button>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>{ph.name}{ph.running && <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", background: "#e0392b", borderRadius: 6, padding: "1px 7px" }}>● RUNNING</span>}</div>
                              <div className="hint">bid {ph.bidHours} hr</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                            <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 800, fontSize: 18, color: ph.running ? "#0a7d36" : "#33414f" }}>⏱ {fmtClock(phaseLiveMin(ph))}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                              <span className="hint">×</span>
                              <button className="btn ghost" style={{ padding: "2px 9px" }} onClick={() => phaseSetCrew(ti, pi, phaseCrew(ph) - 1)}>−</button>
                              <b style={{ minWidth: 14, textAlign: "center" }}>{phaseCrew(ph)}</b>
                              <button className="btn ghost" style={{ padding: "2px 9px" }} onClick={() => phaseSetCrew(ti, pi, phaseCrew(ph) + 1)}>+</button>
                              <span className="hint">guys</span>
                            </span>
                            <span style={{ marginLeft: "auto", fontWeight: 800, fontSize: 16 }}>= {mh} mh</span>
                          </div>
                          {(ph.subs && ph.subs.length > 0) && (<div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>{ph.subs.map((sb, si) => (<span key={si} className="hint" style={{ background: "#eef2f6", borderRadius: 10, padding: "2px 8px" }}>{sb.name} {Math.round(sb.min)}m</span>))}</div>)}
                          <button className="btn ghost" style={{ padding: "2px 8px", fontSize: 12, marginTop: 4 }} onClick={() => { const n = window.prompt("Precise task inside " + ph.name + " (e.g. chimney flashing)"); if (!n) return; const m = window.prompt("Minutes on " + n, "30"); if (m == null) return; phaseAddSub(ti, pi, n, num(m)); }}>+ precise task <span className="hint">slice of this phase</span></button>
                        </div>
                      );
                    })}
                  </section>
                ))}
                <button className="btn primary full big" style={{ marginTop: 12 }} onClick={() => { commitAllRunning(); setTimerView("closeout"); }}>End &amp; review →</button>
                <p className="hint" style={{ marginTop: 6 }}>Actuals are man-hours (clock × that phase's crew). Overlap is fine — each phase keeps its own crew so they don't double-count. Time persists across days.</p>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="h1" style={{ flex: 1, margin: 0 }}>Closeout — approve each phase</div>
                  <button className="btn ghost" onClick={() => setTimerView("timer")}>← Timer</button>
                </div>
                <p className="hint">Bid vs actual man-hours. Approve the ones that look right; fix the one that's off. Only approved values save.</p>
                {(() => { const anyLoud = estResult.trades.some((t) => (t.phases || []).some((ph) => { const b = ph.bidHours, a = ph.actualManHours != null ? ph.actualManHours : phaseManHours(ph); return b > 0 && Math.abs((a - b) / b * 100) > 75; })); return anyLoud ? <div style={{ padding: "8px 11px", background: "#fde7e7", border: "1px solid #f5a9a3", borderRadius: 10, color: "#b3261e", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>⚠️ A phase is way off the bid — check it (timer left running?) before saving.</div> : null; })()}
                <div style={{ display: "flex", gap: 6, margin: "8px 0" }}>
                  <button className={"btn " + (timerRec ? "primary" : "ghost")} style={{ flex: 1, animation: timerRec ? "pulse 1s infinite" : "none" }} onClick={() => timerRecOnce(closeoutVoice)}>{timerRec ? "● Listening…" : "🎤 Fix by voice (e.g. “set details to four hours”)"}</button>
                </div>
                {estResult.trades.map((t, ti) => (
                  <section className="card" key={ti} style={{ marginTop: 10 }}>
                    <div className="seclabel">{t.label || t.title}</div>
                    {(t.phases || []).map((ph, pi) => {
                      const bid = ph.bidHours; const actual = ph.actualManHours != null ? ph.actualManHours : phaseManHours(ph);
                      const diff = Math.round((actual - bid) * 10) / 10; const pct = bid > 0 ? Math.round((diff / bid) * 100) : (actual > 0 ? 999 : 0);
                      const loud = Math.abs(pct) > 75; const warn = !loud && Math.abs(pct) > 25;
                      const col = loud ? "#b3261e" : warn ? "#8A5A12" : "#1B7A3D"; const bg = loud ? "#fde7e7" : warn ? "#FFF4E6" : "#F0FAF3";
                      const key = ti + "-" + pi; const draft = tcorr[key];
                      return (
                        <div key={pi} style={{ borderTop: pi ? "1px solid #eef0f2" : "none", padding: "8px 0" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700 }}>{ph.name} {ph.approved && <span style={{ color: "#1B7A3D" }}>✓ saved</span>}</div>
                              <div style={{ fontSize: 12.5, color: col, fontWeight: 700, background: bg, display: "inline-block", padding: "1px 8px", borderRadius: 8, marginTop: 2 }}>{loud ? "⚠️ " : ""}bid {bid} · actual {actual} · {diff >= 0 ? "+" : ""}{diff} ({pct >= 0 ? "+" : ""}{pct}%)</div>
                            </div>
                            <label className="estf" style={{ width: 84 }}><span>Actual mh</span><input type="number" value={actual} onChange={(e) => phaseCorrectManHours(ti, pi, num(e.target.value))} /></label>
                            <button className={"btn " + (ph.approved ? "ghost" : "primary")} style={{ padding: "6px 12px" }} onClick={() => phaseApprove(ti, pi)}>{ph.approved ? "Approved" : "Approve"}</button>
                          </div>
                          {draft && (<div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, background: "#FFFBF4", border: "1px solid #F2C98A", borderRadius: 8, padding: "6px 8px" }}><span className="hint" style={{ flex: 1 }}>Set <b>{draft.name}</b> to <b>{draft.mh}</b> man-hours?</span><button className="btn primary" style={{ padding: "2px 10px" }} onClick={() => { phaseCorrectManHours(ti, pi, draft.mh); setTcorr({}); }}>Apply</button><button className="btn ghost" style={{ padding: "2px 8px" }} onClick={() => setTcorr({})}>✕</button></div>)}
                        </div>
                      );
                    })}
                  </section>
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  <button className="btn ghost grow1" onClick={() => setTimerView("timer")}>← Back to timer</button>
                  <button className="btn primary grow1" onClick={() => { persistCurrent({ auditClosedAt: new Date().toISOString() }); flash("Saved — approved phases recorded."); setTimerView(""); }}>Save audit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* STALE PRICES "reprice run" print view — grouped supplier → trade; @media print isolates .stalesheet. */}
      {staleSheetOpen && (
        <div className="stalesheet" style={{ position: "fixed", inset: 0, zIndex: 80, background: "#f4f6f8", overflowY: "auto" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: 16 }}>
            <div className="no-print" style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <button className="btn primary grow1" onClick={printStaleSheet}>🖨 Print / Save as PDF</button>
              <button className="btn ghost grow1" onClick={exportStalePricesCSV}>⬇ CSV</button>
              <button className="btn ghost" onClick={() => setStaleSheetOpen(false)}>Done</button>
            </div>
            <div className="h1" style={{ margin: 0 }}>Prices to reprice</div>
            <p className="hint">{(profC.company || "Caza Contractors")} · {new Date().toISOString().slice(0, 10)} · {staleRows().length} stale (no date or over {PRICE_STALE_DAYS} days)</p>
            {(() => {
              const rows = staleRows(); const groups = {};
              rows.forEach((e) => { const s = priceSupplier(e) || "(unknown supplier)"; (groups[s] = groups[s] || []).push(e); });
              return Object.keys(groups).map((sup) => (
                <section className="card" key={sup} style={{ marginTop: 10 }}>
                  <div className="h2">{sup}</div>
                  {groups[sup].map((e) => (
                    <div key={e.id} className="costrow"><span>{e.material}{e.trade ? " · " + e.trade : ""}{e.unit ? " · " + e.unit : ""}</span><b>{$0(e.unitCost)} <span className="hint">· {priceDate(e) || "age unknown"}</span></b></div>
                  ))}
                </section>
              ));
            })()}
          </div>
        </div>
      )}
      {me.role === "contractor" && tab === "estimator" && propOpen && estResult && estResult.trades && (() => {
        const tiers = proposalTiers();
        const chosen = estResult.proposalTier || (tiers.length === 3 ? tiers[1].tier : (tiers[0] && tiers[0].tier));
        const who = estCustomer.trim() || "the homeowner";
        return (
          <div className="propsheet" style={{ position: "fixed", inset: 0, zIndex: 80, background: "#f4f6f8", overflowY: "auto" }}>
            <div style={{ maxWidth: 560, margin: "0 auto", padding: 14, paddingBottom: 40 }}>
              {/* COMPANY LOGO spot (tap to add/replace — saved to your profile) */}
              <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: -8 }}>
                <button className="btn ghost" style={{ padding: "2px 8px" }} onClick={() => setPropOpen(false)}>✕</button>
              </div>
              <label style={{ display: "block", textAlign: "center", marginBottom: 8, cursor: "pointer" }}>
                {profC.avatar
                  ? <img src={profC.avatar} alt="Company logo" style={{ maxHeight: 72, maxWidth: "70%", objectFit: "contain" }} />
                  : <span className="no-print" style={{ display: "inline-block", padding: "16px 22px", border: "2px dashed #c2c8ce", borderRadius: 12, color: "#8a929a", fontWeight: 700 }}>+ Add your company logo</span>}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={async (e) => { const f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) return; try { const u = await imageToJpeg(f, 600); setProfC((p) => ({ ...p, avatar: u })); flash("Logo saved to your profile."); } catch (err) { flash("Couldn't add that image."); } }} />
              </label>
              <div style={{ textAlign: "center", marginBottom: 4 }}>
                <div className="h1" style={{ margin: 0 }}>Your Roofing Proposal</div>
                <div className="hint">{(profC.company || "Caza Contractors")} · prepared for {who}{estAddress.trim() ? " · " + estAddress.trim() : ""}</div>
              </div>

              {/* INSPECTION PHOTOS — first-class */}
              <section className="card" style={{ marginTop: 10 }}>
                <div className="h2">What we found on your roof</div>
                {whPhotos.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                    {whPhotos.map((p, i) => (<div key={i}><img src={p} alt={"Inspection " + (i + 1)} style={{ width: "100%", borderRadius: 10, display: "block" }} /></div>))}
                    <p className="hint">Photos of your actual roof taken at inspection.</p>
                  </div>
                ) : <p className="hint">Add inspection photos on the job (📷 Photo) to show the homeowner the real condition.</p>}
              </section>

              {/* TIERS — big, value + price, middle highlighted */}
              <section className="card" style={{ marginTop: 10 }}>
                <div className="h2">Choose your option</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                  {tiers.map((tr, i) => {
                    const popular = tiers.length === 3 && i === 1;
                    const on = chosen === tr.tier;
                    return (
                      <div key={i} style={{ border: "2px solid " + (on ? "#0a7d36" : popular ? "#d8b24a" : "#e0e4e8"), borderRadius: 14, padding: 14, background: on ? "#f0faf3" : "#fff", position: "relative" }}>
                        {popular && <div style={{ position: "absolute", top: -10, left: 14, background: "#d8b24a", color: "#3a2c00", fontSize: 11, fontWeight: 800, padding: "2px 10px", borderRadius: 8 }}>MOST POPULAR</div>}
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".5px", color: "#6a737d" }}>{tr.tier}</div>
                          <div style={{ marginLeft: "auto", fontSize: 26, fontWeight: 800 }}>{$0(tr.price)}</div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{tr.name}</div>
                        {tr.why && <div className="hint" style={{ marginTop: 2 }}>{tr.why}</div>}
                        <div style={{ fontSize: 12.5, color: "#2F4A39", marginTop: 6 }}>🛡 {tr.warranty}</div>
                        <button className={"btn " + (on ? "primary" : "ghost") + " full no-print"} style={{ marginTop: 10 }} onClick={() => setProposalTier(tr.tier)}>{on ? "✓ Selected" : "Choose this"}</button>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* COLOR SELECTORS — one per trade; palette follows the CHOSEN TIER'S brand/line (Duration/GAF/CertainTeed/Kynar/SMP) */}
              {(() => {
                const lines = estResult.trades.map((t, ti) => {
                  // primary trade uses the picked tier's product name → its manufacturer's colors
                  const chosenTierObj = (ti === 0 && chosen) ? tiers.find((x) => x.tier === chosen) : null;
                  const product = (chosenTierObj && chosenTierObj.name) || (t.items && t.items[0] && t.items[0].name) || (houseScope[t.tradeKey] !== true ? houseScope[t.tradeKey] : "");
                  return { t, line: colorLineForProduct(product, t.tradeKey, houseScope[t.tradeKey]) };
                }).filter((x) => x.line);
                if (!lines.length) return null;
                const colors = estResult.colors || {};
                return (
                  <section className="card" style={{ marginTop: 10 }}>
                    <div className="h2">Pick your color{lines.length > 1 ? "s" : ""}</div>
                    {lines.map(({ t, line }, li) => {
                      const sel = colors[t.tradeKey];
                      return (
                        <div key={li} style={{ marginTop: li ? 12 : 4 }}>
                          <div className="seclabel">{lines.length > 1 ? (t.label || t.title) + " · " : ""}{line.label}{sel ? " · " + sel : ""}</div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 6 }}>
                            {line.colors.map((c) => {
                              const on = sel === c.name;
                              return (
                                <button key={c.name} onClick={() => setProposalColor(t.tradeKey, c.name)} style={{ border: on ? "3px solid #0a7d36" : "1px solid #ccd2d8", borderRadius: 10, padding: 0, overflow: "hidden", cursor: "pointer", background: "#fff" }}>
                                  <div style={{ height: 40, background: c.hex }} />
                                  <div style={{ fontSize: 10.5, padding: "3px 2px", fontWeight: on ? 800 : 500 }}>{on ? "✓ " : ""}{c.name}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })()}

              {/* SCOPE — plain language, itemized expandable (no costs) */}
              <section className="card" style={{ marginTop: 10 }}>
                <div className="h2">What's included</div>
                <ul className="bid-inc" style={{ marginTop: 4 }}>
                  {proposalScopeBullets().map((b, i) => (<li key={i}>{b}</li>))}
                  <li>Full tear-off and haul-away, site protection, and complete cleanup (magnetic nail sweep).</li>
                  <li>Licensed &amp; insured · workmanship guaranteed.</li>
                </ul>
                <button className="btn ghost full no-print" onClick={() => setPropScopeOpen((o) => !o)}>{propScopeOpen ? "▾ Hide itemized detail" : "▸ See itemized detail"}</button>
                {propScopeOpen && (
                  <div style={{ marginTop: 8 }}>
                    {estResult.trades.map((t, ti) => (
                      <div key={ti} style={{ marginBottom: 8 }}>
                        <div className="seclabel">{t.label || t.title}</div>
                        {(t.items || []).map((it, i) => (<div key={i} className="costrow"><span>{it.name}</span><b className="hint">{it.qty} {it.unit}</b></div>))}
                      </div>
                    ))}
                    <p className="hint">Quantities shown for transparency. Final materials per the selected option.</p>
                  </div>
                )}
              </section>

              {/* TRUST */}
              <section className="card" style={{ marginTop: 10 }}>
                <div className="h2">Why Caza Contractors</div>
                <p className="body" style={{ marginTop: 2 }}>A family roofing business — named for AL, the grandfather who started it. Fully licensed and insured, with a workmanship guarantee behind every job. We use full manufacturer systems (not just shingles) so your warranty actually holds.</p>
              </section>

              {/* SIGN — deferred behind the legal-review gate */}
              <div className="no-print" style={{ marginTop: 12, padding: "10px 12px", background: "#FFF4E6", border: "1px solid #F2C98A", borderRadius: 10, fontSize: 12.5, color: "#8A5A12" }}>
                ✍️ On-the-spot e-sign (DocuSign) is coming next — it's held until the NY contract terms + right-to-cancel notice are legal-reviewed, so what gets signed is compliant. For now, present and capture the homeowner's choice; the selected option{Object.keys(estResult.colors || {}).length ? " and color" + (Object.keys(estResult.colors).length > 1 ? "s" : "") + " (" + Object.values(estResult.colors).join(", ") + ")" : ""} are saved with the estimate.
              </div>
              <button className="btn primary full no-print" style={{ marginTop: 12 }} onClick={exportProposalPDF}>📄 Save / print as PDF</button>
              <button className="btn ghost full no-print" style={{ marginTop: 8 }} onClick={() => { persistCurrent(); setPropOpen(false); }}>Done</button>
            </div>
          </div>
        );
      })()}

      {me.role === "contractor" && tab === "work" && !overlay && (
        <main className="page">
          <div className="pagetitle">My Work</div>
          <section className="card">
            <div className="h2">Your portfolio <span className="hint">homeowners browse these when picking a pro</span></div>
            <AddPost onAdd={addPost} busy={busy} />
            {profC.posts.length > 0 && (
              <div className="postcol">
                {profC.posts.map((p) => (
                  <figure className="postcard" key={p.id}>
                    {p.caption && <figcaption className="postcap">{p.caption}</figcaption>}
                    <div className="postimgwrap">
                      <img src={p.photo} alt="" />
                      <button className="tx" onClick={() => setProfC({ ...profC, posts: profC.posts.filter((x) => x.id !== p.id) })}><X size={13} /></button>
                    </div>
                  </figure>
                ))}
              </div>
            )}
            <p className="hint">Up to 6 posts, newest on top. Each photo keeps its own caption.</p>
            <button className="btn primary full" disabled={busy === "prof"} onClick={() => saveProfile("contractor")}>
              {busy === "prof" ? "Saving…" : "Save & publish portfolio"}
            </button>
          </section>
        </main>
      )}

      {/* ---------- bottom nav ---------- */}
      {me.role && (
        <nav className="bnav">
          {tabs.map(([k, lbl, Icon]) => (
            <button key={k} className={"bitem" + (tab === k && !overlay ? " on" : "")} onClick={() => goTab(k)}>
              <Icon size={22} />
              <span>{lbl}</span>
              {k === "myjobs" && totalUnread > 0 && <span className="navdot">{totalUnread}</span>}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

/* ---------- add-post widget ---------- */
function AddPost({ onAdd, busy }) {
  const [caption, setCaption] = useState("");
  const [staged, setStaged] = useState(null);
  const stage = async (file) => {
    if (!file) return;
    try {
      const url = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = () => rej(new Error("read failed"));
        r.readAsDataURL(file);
      });
      setStaged({ file, url });
    } catch (e) { /* ignore */ }
  };
  const post = () => {
    if (!staged) return;
    onAdd(staged.file, caption);
    setStaged(null);
    setCaption("");
  };
  return (
    <div className="addpost">
      {!staged ? (
        <label className="dropzone">
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={(e) => { stage(e.target.files[0]); e.target.value = ""; }} />
          <Camera size={28} />
          <b>Choose a work photo</b>
          <span>then add a caption and post it</span>
        </label>
      ) : (
        <div className="stagecard">
          <div className="postimgwrap"><img src={staged.url} alt="" /></div>
          <label className="caplabel">Caption for this photo
            <input className="in" placeholder="e.g. Standing seam in Boonville, 10/12 pitch" value={caption}
              onChange={(e) => setCaption(e.target.value)} autoFocus />
          </label>
          <div className="btnrow">
            <button className="btn ghost grow1" onClick={() => { setStaged(null); setCaption(""); }}>Cancel</button>
            <button className="btn primary grow1" disabled={busy === "prof"} onClick={post}>Post photo</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ CSS ============================ */
const CSS = `
*{box-sizing:border-box;margin:0;-webkit-tap-highlight-color:transparent}
html,body{background:#F2F3F5}
.app{min-height:100vh;background:#F2F3F5;font-family:Inter,system-ui,sans-serif;color:#15181C;font-size:15px;-webkit-font-smoothing:antialiased}

/* header */
.bar{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:10px;background:#15181C;padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top));border-bottom:3px solid #FF6A13;min-height:52px}
.mark{font-family:'Barlow Condensed';font-weight:700;font-size:25px;letter-spacing:1px;color:#fff}
.mark span{color:#FF6A13}
.ver{font-style:normal;font-family:Inter;font-size:10px;font-weight:700;color:#9AA1AB;margin-left:7px;letter-spacing:.5px;vertical-align:super}
.bartitle{color:#fff;font-weight:600;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.barright{margin-left:auto;display:flex;align-items:center;gap:8px}
.iconbtn{background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.bar .iconbtn{background:rgba(255,255,255,.12)}
.rolepill{display:flex;align-items:center;gap:5px;background:#FF6A13;color:#fff;border:none;border-radius:999px;padding:7px 13px;font-weight:700;font-size:13px;cursor:pointer}
.backbtn{display:flex;align-items:center;gap:2px;background:none;border:none;color:#FF8A47;font-weight:600;font-size:16px;cursor:pointer;padding:4px 4px 4px 0}
.spin{animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* layout */
.page{padding:16px;padding-bottom:calc(96px + env(safe-area-inset-bottom));max-width:640px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.pagetitle{font-family:'Barlow Condensed';font-weight:700;font-size:30px;text-transform:uppercase;letter-spacing:.5px;margin:2px 0 -2px}
.card{background:#fff;border:1px solid #E7E9ED;border-radius:16px;padding:16px;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.cardtop{display:flex;align-items:flex-start;gap:10px;margin-bottom:6px}
.h1{font-family:'Barlow Condensed';font-weight:700;font-size:25px;line-height:1.08}
.h2{font-family:'Barlow Condensed';font-weight:700;font-size:19px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.h2tight{font-family:'Barlow Condensed';font-weight:700;font-size:20px;line-height:1.1}
.body{color:#3A414B;margin:6px 0;line-height:1.45}
.hint{font-size:12.5px;color:#737B86;font-weight:400;text-transform:none;letter-spacing:0;line-height:1.4}
.center{text-align:center}
.good{color:#157F3D;font-weight:600;font-size:14px;margin:6px 0}
.grow{flex:1;min-width:0}
.grow1{flex:1}
button{cursor:pointer;font:inherit}

/* pills & stats */
.pill{border-radius:999px;padding:4px 11px;font-size:12px;font-weight:700;white-space:nowrap}
.pill.open{background:#FFF1E7;color:#C2410C}
.pill.match{background:#EAFAF0;color:#157F3D}
.pill.done{background:#EFF1F4;color:#4B5563}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.stat{background:#fff;border:1px solid #E7E9ED;border-radius:16px;padding:12px 8px;text-align:center;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.stat b{display:block;font-family:'JetBrains Mono',monospace;font-size:22px;color:#FF6A13}
.stat span{font-size:11.5px;color:#737B86;font-weight:600;text-transform:uppercase;letter-spacing:.5px}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:13px;border:none;padding:13px 18px;font-weight:700;font-size:15px}
.btn.primary{background:#FF6A13;color:#fff;font-family:'Barlow Condensed';font-size:19px;letter-spacing:.6px;text-transform:uppercase}
.btn.primary:disabled{opacity:.55}
.btn.primary.big{padding:16px;font-size:21px;box-shadow:0 4px 14px rgba(255,106,19,.3)}
.btn.ghost{background:#fff;border:1.5px solid #D7DBE0;color:#15181C;font-weight:600}
.btn.full{width:100%}
.btn.pass{flex:1;background:#fff;border:1.5px solid #D7DBE0;color:#737B86}
.btn.accept{flex:2;background:#157F3D;color:#fff;font-family:'Barlow Condensed';font-size:18px;letter-spacing:.5px;text-transform:uppercase}
.btn.accept:disabled{opacity:.75}
.btn.accept.did{background:#15181C}
.btn.choose{background:#157F3D;color:#fff;padding:10px 15px;border-radius:11px;font-size:14px}
.btnrow{display:flex;gap:10px;margin-top:10px}

/* inputs */
.in{width:100%;padding:13px 14px;border:1.5px solid #D7DBE0;border-radius:12px;font-size:16px;font-family:Inter;background:#fff}
.in:focus,.desc:focus,.chatin:focus{outline:none;border-color:#FF6A13}
.desc{width:100%;border:1.5px solid #D7DBE0;border-radius:12px;padding:12px 14px;font:inherit;font-size:16px;resize:vertical;background:#fff;line-height:1.45}
.fld{display:block;margin-top:12px}
.fld span{display:block;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#737B86;margin-bottom:5px}

/* dropzones */
.dropzone{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;border:2px dashed #C9CED6;border-radius:16px;background:#FAFBFC;padding:26px 14px;margin-top:12px;cursor:pointer;color:#FF6A13;text-align:center}
.dropzone b{color:#15181C;font-size:15.5px}
.dropzone span{font-size:12.5px;color:#737B86}
.dropzone.slim{padding:15px 14px;flex-direction:row;gap:9px}
.dropzone:active{border-color:#FF6A13;background:#FFF6F0}

/* photos */
.thumbs{display:flex;gap:9px;flex-wrap:wrap;margin-top:12px}
.thumb{position:relative;width:78px;height:78px;border-radius:12px;overflow:hidden;border:1px solid #E7E9ED}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.tx{position:absolute;top:4px;right:4px;background:rgba(21,24,28,.85);color:#fff;border:none;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;padding:0}
.post .tx{top:6px;right:6px}

/* roof section */
.measband{border:2px solid #FF6A13;background:#FFF6F0}.measband.open{background:#fff}.rowtoggle{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;background:none;border:none;text-align:left;font:inherit;padding:2px 0}.measleft{display:flex;align-items:center;gap:12px}.measicon{font-size:26px;line-height:1;flex-shrink:0}.meastitle{display:block;font-family:'Barlow Condensed';font-weight:700;font-size:19px;text-transform:uppercase;letter-spacing:.4px;color:#15181C}.measrec{display:inline-block;background:#FF6A13;color:#fff;font-family:Inter;font-size:10px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;padding:2px 7px;border-radius:999px;vertical-align:middle;margin-left:4px}.meassub{display:block;font-size:12.5px;color:#6B7280;margin-top:2px;line-height:1.35}.chev{color:#FF6A13;font-size:20px;flex-shrink:0}
.roofbody{margin-top:12px;display:flex;flex-direction:column;gap:10px}
.reportgrid{display:grid;grid-template-columns:1fr;gap:8px}
.svcwrap{position:fixed;inset:0;background:rgba(21,24,28,.55);display:flex;align-items:center;justify-content:center;padding:22px;z-index:90}
.svccard{background:#fff;border-radius:18px;padding:20px 20px 16px;max-width:420px;width:100%;box-shadow:0 18px 50px rgba(0,0,0,.3)}
.svchead{font-family:'Barlow Condensed';font-weight:700;font-size:23px;text-transform:uppercase;letter-spacing:.5px;color:#15181C;margin-bottom:12px}
.svccard .howtosteps{margin:0 0 10px;padding-left:20px;font-size:14px;color:#2A3038;line-height:1.55}
.svccard .howtosteps li{margin-bottom:6px}
.svccard .howtoback{font-size:12.5px;color:#3A414B;background:#F0F7F2;border:1px solid #CDE6D6;border-radius:9px;padding:9px 11px;margin:0 0 14px;line-height:1.45}
.svccard .btn.big{margin-bottom:8px}
.propill{display:inline-block;background:#FF6A13;color:#fff;font-family:'Barlow Condensed';font-size:13px;font-weight:700;letter-spacing:1px;padding:2px 9px;border-radius:20px;vertical-align:middle;margin-left:8px}
.takeoff{display:flex;flex-direction:column;gap:6px}
.toitem{display:flex;align-items:center;gap:6px}
.toname{flex:1 1 auto;min-width:0;border:1px solid #D7DBE0;border-radius:8px;padding:8px;font-size:13px;font-family:inherit}
.toqty{width:52px;border:1px solid #D7DBE0;border-radius:8px;padding:8px 6px;font-size:13px;font-family:'JetBrains Mono',monospace;text-align:center}
.tounit{width:64px;border:1px solid #D7DBE0;border-radius:8px;padding:8px 6px;font-size:12px;font-family:inherit}
.todollar{display:flex;align-items:center;font-size:13px;color:#6B7280}
.tocost{width:58px;border:1px solid #D7DBE0;border-radius:8px;padding:8px 5px;font-size:13px;font-family:'JetBrains Mono',monospace;text-align:right;margin-left:2px}
.tolinecost{width:66px;flex:0 0 auto;text-align:right;font-size:13px;font-weight:700;font-family:'JetBrains Mono',monospace;color:#15181C}
.todel{background:none;border:none;color:#C2410C;cursor:pointer;padding:4px;display:flex}
.estfields{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.estf{display:flex;flex-direction:column;gap:3px;font-size:12px;color:#6B7280}
.estf input{border:1px solid #D7DBE0;border-radius:8px;padding:8px;font-size:14px;font-family:'JetBrains Mono',monospace}
.marginbox{background:#15181C;color:#fff;border-radius:14px;padding:14px 16px;margin-top:14px}
.marginhead{display:flex;justify-content:space-between;align-items:center;font-family:'Barlow Condensed';text-transform:uppercase;letter-spacing:.5px;font-size:16px}
.marginpct{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:#FF8A43}
.marginbox .bidslider{margin:12px 0 4px}
.marginbox .bidends{color:#9AA1AB}
.sellprice{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #2A2F36;margin-top:10px;padding-top:10px}
.sellprice span{font-family:'Barlow Condensed';text-transform:uppercase;letter-spacing:.5px;font-size:16px}
.sellprice b{font-family:'JetBrains Mono',monospace;font-size:26px;color:#fff}
.convbidcard{position:sticky;top:64px;z-index:20}
.convbidtop{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.convbidlabel{font-family:'Barlow Condensed';text-transform:uppercase;letter-spacing:.6px;font-size:14px;color:#6B7280}
.convconf{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;padding:3px 9px;border-radius:20px}
.convconf.low{background:#FEF0E6;color:#C2410C}
.convconf.medium{background:#FEF7E0;color:#9A6700}
.convconf.high{background:#EAFAF0;color:#157F3D}
.convopts{margin-top:10px;border-top:1px solid #EEF0F3;padding-top:8px}
.convopt{display:flex;align-items:center;gap:8px;font-size:12.5px;padding:3px 0}
.convoptpick{flex:1;display:flex;align-items:center;gap:8px;background:#F7F8FA;border:1px solid #E2E5EA;border-radius:10px;padding:8px 10px;cursor:pointer;text-align:left;font-family:inherit}
.convoptpick:active{background:#FFF1E8;border-color:#FF6A13}
.convoptpick:disabled{opacity:.5;cursor:default}
.convchoices{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
.convchoice{background:#fff;border:1.5px solid #FF6A13;color:#C2410C;border-radius:20px;padding:9px 15px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit}
.convchoice:active{background:#FF6A13;color:#fff}
.convopttier{font-family:'Barlow Condensed';font-weight:700;text-transform:uppercase;font-size:12px;color:#157F3D;min-width:42px}
.convoptname{flex:1;color:#3A414B;line-height:1.35}
.convoptlink{color:#FF6A13;text-decoration:none;font-weight:700}
.convchosen{display:flex;align-items:center;gap:8px;margin-top:10px;border-top:1px solid #EEF0F3;padding-top:8px;font-size:13px}
.convchosenlbl{font-family:'Barlow Condensed';font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#157F3D;font-size:13px}
.convchosenval{flex:1;color:#15181C;font-weight:600}
.convchosenchg{background:none;border:none;color:#FF6A13;font-size:12.5px;text-decoration:underline;cursor:pointer;font-family:inherit;padding:0}
.convchosenchg:disabled{opacity:.4;cursor:default}
.convchat{display:flex;flex-direction:column}
.convmsgs{display:flex;flex-direction:column;gap:9px;max-height:48vh;overflow-y:auto;padding:4px 2px 10px}
.convbubble{max-width:84%;padding:10px 13px;border-radius:16px;font-size:14.5px;line-height:1.45;white-space:pre-wrap}
.convhead{display:flex;align-items:center;gap:10px;margin-bottom:6px}
.convrow{display:flex;align-items:flex-end;gap:7px;max-width:90%}
.convrow.ai{align-self:flex-start}
.convav{flex-shrink:0;border-radius:50%;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.helperimg{width:84px;height:84px;border-radius:50%;object-fit:cover;background:#fff;border:1px solid #E2E5EA}
.heroav{width:150px;height:150px;border-radius:50%;object-fit:cover;display:block;margin:4px auto 14px;box-shadow:0 4px 14px rgba(0,0,0,.12)}
.helperimg.sm{width:52px;height:52px;border:none}
.convbubble.ai{background:#F0F2F5;color:#15181C;border-bottom-left-radius:5px}
.convbubble.me{align-self:flex-end;background:#FF6A13;color:#fff;border-bottom-right-radius:5px}
.convbubble.typing{display:flex;gap:4px;align-items:center;min-height:20px}
.convbubble.typing span{width:7px;height:7px;border-radius:50%;background:#B4BAC2;display:inline-block;animation:caztyp 1.2s infinite ease-in-out}
.convbubble.typing span:nth-child(2){animation-delay:.18s}
.convbubble.typing span:nth-child(3){animation-delay:.36s}
.addrvis{border:1px solid #E2E5EA;border-radius:12px;padding:11px;margin-bottom:12px;text-align:left}
.addrvistitle{font-family:'Barlow Condensed';font-weight:700;text-transform:uppercase;letter-spacing:.4px;font-size:15px;margin-bottom:8px}
.addropt{display:block;width:100%;text-align:left;border:1.5px solid #E2E5EA;border-radius:10px;padding:10px;margin-bottom:8px;background:#fff;cursor:pointer;font-family:inherit}
.addropt.on{border-color:#FF6A13;background:#FFF6F0}
.addropt b{display:block;font-size:14px;margin-bottom:3px}
.addropt span{font-size:12px;color:#6B7280;line-height:1.4}
.addrtag{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;background:#EEF0F3;color:#6B7280;border-radius:10px;padding:2px 7px;margin-left:6px;vertical-align:middle}
.addrtag.accuracy{background:#EAFAF0;color:#157F3D}
.addrbadge{font-size:11.5px;font-weight:600;border-radius:8px;padding:5px 9px;margin-top:7px;display:inline-block}
.addrbadge.open{background:#EAFAF0;color:#157F3D}
.addrbadge.gated{background:#F4F6F8;color:#6B7280}
.dimrows{display:flex;flex-direction:column;gap:6px;margin-bottom:8px}
.dimrow{display:flex;gap:6px;align-items:center}
.dimlabel{flex:1}
.dimval{width:74px;text-align:right}
.dimunit{width:62px}
.dimx{width:30px;height:30px;flex-shrink:0;border:none;background:#F4F6F8;border-radius:8px;color:#9AA1AB;font-size:16px;cursor:pointer}
.dimx:active{background:#FFE0E0;color:#C2410C}
.dimchips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px}
.dimchip{background:#F4F6F8;border:1px solid #E2E5EA;border-radius:16px;padding:6px 11px;font-size:12.5px;color:#3A414B;cursor:pointer;font-family:inherit}
.panelw{margin-top:10px}
.panelwlbl{display:block;font-size:11.5px;color:#6B7280;margin-bottom:5px;font-weight:600}
.panelwrow{display:flex;gap:7px}
.panelwbtn{flex:0 0 auto;background:#F4F6F8;border:1px solid #E2E5EA;border-radius:9px;padding:7px 15px;font-size:13px;font-weight:700;color:#3A414B;cursor:pointer;font-family:inherit}
.panelwbtn.on{background:#15181C;color:#fff;border-color:#15181C}
.dimchip:active{background:#FFF1E8;border-color:#FF6A13}
.dimchip.custom{background:#fff;border-style:dashed}
.measgroup{border:1px solid #EEF0F3;border-radius:10px;padding:10px;margin-bottom:8px}
.measlbl{font-size:12.5px;font-weight:700;color:#3A414B;margin-bottom:6px}
.uploadrow{display:flex;gap:8px;margin-top:8px}
.camerabtn{display:inline-flex;align-items:center;gap:6px;background:#F4F6F8;border:1px solid #E2E5EA;border-radius:10px;padding:9px 14px;cursor:pointer;color:#3A414B}
.upbtnlbl{font-size:13px;font-weight:600}
.camerabtn:active{background:#FFF1E8;border-color:#FF6A13}
.camcount{background:#FF6A13;color:#fff;border-radius:10px;font-size:12px;font-weight:700;padding:1px 7px}
.meashead{display:flex;width:100%;align-items:center;justify-content:space-between;background:#F7F8FA;border:1px solid #E2E5EA;border-radius:9px;padding:9px 12px;margin-bottom:8px;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:700;color:#3A414B}
.scopegrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.scopebtn{display:flex;flex-direction:column;align-items:center;gap:5px;background:#F7F8FA;border:1.5px solid #E2E5EA;border-radius:12px;padding:14px 8px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;color:#15181C;text-align:center}
.scopebtn:active{background:#FFF1E8;border-color:#FF6A13}
.scopelist{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.scopebtn.wide{flex-direction:column;align-items:flex-start;gap:2px;text-align:left;padding:13px 14px}
.scopemain{font-size:14px;font-weight:700;color:#15181C}
.scopehint{font-size:11.5px;font-weight:500;color:#9AA1AB}
.scopeemoji{font-size:24px}
.oratext{text-align:center;color:#9AA1AB;font-size:12px;margin:14px 0 8px;position:relative}
.oratext::before,.oratext::after{content:"";position:absolute;top:50%;width:30%;height:1px;background:#E2E5EA}
.oratext::before{left:0}.oratext::after{right:0}
.scopepick{display:flex;width:100%;align-items:center;justify-content:space-between;background:#FFF6F0;border:1.5px solid #FF6A13;border-radius:10px;padding:10px 13px;margin:10px 0;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;color:#15181C}
.scopechg{font-size:12px;font-weight:600;color:#FF6A13;text-decoration:underline}
.dimsliders{display:flex;flex-direction:column;gap:14px;margin-bottom:6px}
.dimslider{}
.dimsliderhd{display:flex;justify-content:space-between;align-items:center;font-size:13.5px;font-weight:600;color:#3A414B;margin-bottom:5px}
.dimsliderval{display:flex;align-items:center;gap:4px}
.dsnum{width:72px;text-align:right;padding:5px 7px;font-family:'JetBrains Mono',monospace;font-size:13px}
.dsunit{font-size:12px;color:#9AA1AB;min-width:24px}
.dsrange{width:100%;accent-color:#FF6A13;height:4px}
.measmenu{border:1px solid #EEF0F3;border-radius:10px;padding:10px;margin-bottom:8px;display:flex;flex-direction:column;gap:8px}
.bookhead{display:flex;width:100%;align-items:center;justify-content:space-between;background:none;border:none;padding:0;cursor:pointer;font-family:inherit}
.bookchev{color:#9AA1AB;font-size:12px}
.bookbody{margin-top:10px}
.bookcat{margin-bottom:10px}
.bookcathd{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#FF6A13;margin-bottom:5px}
.bookrow{display:flex;gap:5px;align-items:center;margin-bottom:5px}
.bkname{flex:1;min-width:0}
.bkunit{width:54px;flex-shrink:0}
.bkval{width:72px;text-align:right;flex-shrink:0}
.matsummary{margin-top:6px}
.matcount{font-weight:600;color:#157F3D;font-size:14px;margin-bottom:8px}
/* Profile reorg — group headers + jump-nav chips */
.secgroup{font-family:'Barlow Condensed';font-weight:700;text-transform:uppercase;letter-spacing:.5px;font-size:19px;color:#0a7d36;margin:18px 2px 4px;scroll-margin-top:12px}
.secgroup .hint{text-transform:none;letter-spacing:0;font-weight:400;font-size:12.5px;color:#667085;display:block}
/* FIX 2 — accordion group bars */
.secgroup.accord{display:block;width:100%;text-align:left;background:#fff;border:1.5px solid #cfe6d8;border-radius:12px;padding:11px 14px;margin:10px 0 0;cursor:pointer;position:relative}
.secgroup.accord.open{border-color:#0a7d36;border-bottom-left-radius:0;border-bottom-right-radius:0;margin-bottom:0}
.secgroup.accord .accchev{position:absolute;right:14px;top:11px;color:#0a7d36;font-size:16px}
.secbody{border:1.5px solid #0a7d36;border-top:none;border-radius:0 0 12px 12px;padding:10px 12px 4px;margin-bottom:6px}
.profchip:active{background:#0a7d36;color:#fff}
.matpreview{border:1px solid #EEF0F3;border-radius:10px;padding:8px 10px;margin-bottom:10px}
.matrow{display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:3px 0}
.matrow b{font-family:'JetBrains Mono',monospace}
.mono{font-family:'JetBrains Mono',monospace;font-size:12px;background:#F4F6F8;padding:2px 6px;border-radius:5px}
.stat{cursor:pointer;border:1.5px solid transparent;background:#fff;font-family:inherit}
.stat.on{border-color:#FF6A13;background:#FFF6F0}
.revitem{border-top:1px solid #EEF0F3;padding:9px 0}
.revitem:first-of-type{border-top:none}
.revtop{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.revstars{color:#FF6A13;font-size:14px;letter-spacing:1px}
.revstarsoff{color:#E2E5EA}
.revby{font-size:12px;color:#6B7280;text-align:right}
.revcomment{font-size:13.5px;color:#2A3038;line-height:1.45;margin:4px 0 0}
.saleschart{display:flex;align-items:flex-end;gap:8px;height:150px;margin-top:10px;overflow-x:auto;padding-bottom:4px}
.salesbar{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;min-width:46px;height:100%}
.salesbarfill{width:30px;background:linear-gradient(#FF8A43,#FF6A13);border-radius:6px 6px 0 0;min-height:3px}
.salesval{font-family:'JetBrains Mono',monospace;font-size:10px;color:#3A414B}
.saleslbl{font-size:11px;color:#6B7280}
@keyframes caztyp{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}
.popin{animation:cazpop .32s ease-out both}
.scopegrid.popin .scopebtn{animation:cazpop .32s ease-out both}
@keyframes cazpop{0%{opacity:0;transform:translateY(8px) scale(.98)}100%{opacity:1;transform:translateY(0) scale(1)}}
.convattach{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
.attachbtn{display:inline-flex;align-items:center;gap:5px;background:#F4F6F8;border:1px solid #E2E5EA;border-radius:18px;padding:7px 12px;font-size:12.5px;color:#3A414B;cursor:pointer;font-family:inherit}
.attachbtn:active{background:#FFF1E8;border-color:#FF6A13}
.convreports{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
.convinputrow{display:flex;gap:8px;align-items:center;border-top:1px solid #EEF0F3;padding-top:10px}
.convinputrow .in{flex:1}
.convsend{background:#FF6A13;color:#fff;border:none;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.convsend:disabled{background:#D7DBE0;cursor:default}
.convdone{border-top:1px solid #EEF0F3;padding-top:12px}
.tiergrid{display:flex;flex-direction:column;gap:8px;margin-bottom:6px}
.tiercard{border:1.5px solid #D7DBE0;border-radius:12px;padding:11px 12px;background:#fff}
.tiercard.on{border-color:#FF6A13;background:#FFF6F0}
.tiertop{display:flex;justify-content:space-between;align-items:center}
.tierbadge{font-family:'Barlow Condensed';font-weight:700;text-transform:uppercase;letter-spacing:.6px;font-size:14px;color:#157F3D}
.tiercard.on .tierbadge{color:#C2410C}
.tiercost{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:16px}
.tiername{font-weight:600;font-size:14px;margin-top:3px}
.tierwhy{font-size:12px;color:#6B7280;line-height:1.4;margin-top:2px}
.tieract{display:flex;gap:8px;margin-top:9px}
.tieract .btn{padding:8px;font-size:13px;text-align:center;text-decoration:none}
.report{border:1px solid #E7E9ED;border-radius:12px;padding:11px 12px;font-size:12.5px;display:flex;flex-direction:column;gap:2px;background:#FAFBFC;text-decoration:none;color:inherit;-webkit-tap-highlight-color:rgba(255,106,19,.1)}
.report:active{border-color:#FF6A13;background:#FFF6F0}
.reportgo{color:#FF6A13;font-weight:700;font-size:12px;margin-top:2px}
.report b{font-family:'Barlow Condensed';font-size:15px;letter-spacing:.4px;text-transform:uppercase}
.report span{color:#737B86}
.pastebox{display:flex;flex-direction:column;gap:8px}
.ai-note{font-size:13px;color:#3A414B;background:#FFF6F0;border-left:3px solid #FF6A13;border-radius:0 10px 10px 0;padding:9px 11px;margin-top:10px}

/* bid card */
.bidcard{border:2px solid #FF6A13;box-shadow:0 8px 24px rgba(255,106,19,.18)}
.bid-price{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:29px;color:#FF6A13;margin:8px 0 0}
.bid-days{font-weight:600;color:#157F3D;margin:2px 0 8px}
.bid-inc{margin:6px 0 12px 18px;color:#3A414B;font-size:14px}
.bid-inc li{margin-bottom:4px}

/* job feed cards */
.jobcard{padding:0;overflow:hidden}
.jobimg{width:100%;max-height:220px;object-fit:cover;display:block}
.jobbody{padding:14px 16px 16px}
.payrow{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-top:10px;flex-wrap:wrap}
.payout{text-align:right;display:flex;flex-direction:column}
.payout span{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#737B86;font-weight:700}
.payout b{font-family:'JetBrains Mono',monospace;font-size:22px;color:#157F3D}

/* applicants & pros */
.applicant{display:flex;align-items:center;gap:11px;background:#FAFBFC;border:1px solid #E7E9ED;border-radius:13px;padding:10px 12px;margin-top:8px;cursor:pointer}
.prosrow{display:flex;align-items:center;gap:12px;cursor:pointer}
.prosthumb{width:58px;height:58px;object-fit:cover;border-radius:12px;border:1px solid #E7E9ED;flex-shrink:0}

/* avatars */
.avatar{width:44px;height:44px;border-radius:50%;background:#15181C;color:#fff;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;position:relative;border:none;padding:0}
.avatar img{width:100%;height:100%;object-fit:cover}
.avinit{font-family:'Barlow Condensed';font-weight:700;font-size:16px}
.avatar.lg{width:60px;height:60px}
.avatar.lg .avinit{font-size:21px}
.avatar.xl{width:74px;height:74px}
.avatar.xl .avinit{font-size:26px}
.avbtn{cursor:pointer}
.avcam{position:absolute;bottom:0;right:0;background:#FF6A13;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
.profedit{display:flex;align-items:center;gap:14px;margin-bottom:4px}
.ratingline{font-weight:700;color:#FF6A13;font-size:15px}

/* reviews */
.revlist{display:flex;flex-direction:column;gap:10px}
.rev{border:1px solid #E7E9ED;border-radius:13px;padding:11px 13px;background:#FAFBFC}
.revtop{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.starline{display:inline-flex;gap:1px}
.stf{color:#FF6A13;fill:#FF6A13}
.ste{color:#D7DBE0}
.revby{font-weight:700;font-size:13.5px}
.revat{font-size:12px;color:#9AA1AB;margin-left:auto}
.revtxt{margin-top:5px;color:#3A414B;font-size:14px;line-height:1.45}
.revjob{margin-top:4px;font-size:12px;color:#737B86}

/* rate box */
.ratebox{border-top:1px dashed #D7DBE0;margin-top:12px;padding-top:10px;display:flex;flex-direction:column;gap:8px}
.rblabel{font-weight:600;font-size:14px}
.starsrow{display:flex;gap:2px}
.starbtn{font-size:31px;background:none;border:none;color:#D7DBE0;padding:2px 5px;line-height:1}
.starbtn.on{color:#FF6A13}

/* work feed posts */
.postcol{display:flex;flex-direction:column;gap:14px;margin-top:12px}
.postcard{border:1px solid #E7E9ED;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.postcap{font-size:16.5px;font-weight:700;color:#15181C;padding:12px 14px 10px;line-height:1.35}
.stagecard{border:1px solid #E7E9ED;border-radius:14px;overflow:hidden;background:#fff}
.stagecard .caplabel{display:block;padding:12px 14px 0}
.stagecard .btnrow{padding:12px 14px}
.stagecard .postimgwrap img{width:100%;display:block;max-height:360px;object-fit:cover}
.postimgwrap{position:relative}
.postcard img{width:100%;display:block;max-height:420px;object-fit:cover}
.postcard .tx{top:8px;right:8px}
.addpost{display:flex;flex-direction:column;gap:8px}

/* chat */
.chatpage{padding-bottom:0;min-height:calc(100vh - 60px);display:flex;flex-direction:column}
.chat{flex:1;display:flex;flex-direction:column;gap:8px;padding:4px 0 12px;overflow-y:auto}
.bubble{max-width:82%;background:#fff;border:1px solid #E7E9ED;border-radius:16px 16px 16px 5px;padding:9px 13px;font-size:14.5px;align-self:flex-start;box-shadow:0 1px 2px rgba(16,24,40,.04);line-height:1.4}
.bubble.mine{align-self:flex-end;background:#FF6A13;border-color:#FF6A13;color:#fff;border-radius:16px 16px 5px 16px}
.bubble .who{display:block;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;opacity:.65;margin-bottom:2px}
.chatbar{position:sticky;bottom:0;display:flex;gap:8px;align-items:center;background:#F2F3F5;padding:10px 0 calc(86px + env(safe-area-inset-bottom))}
.chatbar .iconbtn{background:#fff;border:1.5px solid #D7DBE0;color:#15181C}
.chatin{flex:1;border:1.5px solid #D7DBE0;border-radius:999px;padding:12px 17px;font:inherit;font-size:16px;background:#fff}
.sendbtn{background:#FF6A13;color:#fff;border:none;border-radius:50%;width:46px;height:46px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sendbtn:disabled{opacity:.45}

/* bottom nav */
.bnav{position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-top:1px solid #E7E9ED;padding:7px 6px calc(7px + env(safe-area-inset-bottom))}
.bitem{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;color:#9AA1AB;padding:5px 2px;border-radius:12px}
.bitem span{font-size:10.5px;font-weight:700;letter-spacing:.2px}
.bitem.on{color:#FF6A13}
.bitem{position:relative}
.navdot{position:absolute;top:1px;right:16%;background:#FF6A13;color:#fff;border-radius:999px;min-width:17px;height:17px;font-size:10.5px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 4px}
.btn.attn{border-color:#FF6A13;color:#FF6A13}
.mine-tag{display:inline-block;background:#EFF1F4;color:#6B7280;font-family:Inter;font-size:10px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;padding:2px 7px;border-radius:999px;margin-left:8px;vertical-align:middle}
.howrow{display:flex;gap:8px;max-width:380px;margin:0 auto 16px}
.howstep{flex:1;background:#fff;border:1px solid #E7E9ED;border-radius:13px;padding:12px 8px;font-size:12px;font-weight:600;color:#3A414B;display:flex;flex-direction:column;align-items:center;gap:5px;line-height:1.25}
.howstep b{width:24px;height:24px;border-radius:50%;background:#FF6A13;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px}
.chooserbtns{display:flex;gap:10px;max-width:380px;margin:0 auto;width:100%}
.emptyfeed{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;color:#9AA1AB;padding:28px 18px}
.emptyfeed b{color:#15181C;font-size:16px}
.emptyfeed .btn{margin-top:4px}
.qcard{border:2px solid #FF6A13;box-shadow:0 8px 24px rgba(255,106,19,.15)}
.diagline{font-size:11.5px;color:#9AA1AB;margin:-6px 0 2px;font-family:'JetBrains Mono',monospace}
.setupbanner{border:2px solid #FF6A13;background:#FFF6F0;display:flex;flex-direction:column;gap:4px}
.setupbanner b{font-family:'Barlow Condensed';font-size:19px;text-transform:uppercase;letter-spacing:.4px;color:#15181C}
.setupbanner span{font-size:13px;color:#6B7280;line-height:1.4}
.bidset{margin-top:12px;background:#FAFBFC;border:1px solid #E7E9ED;border-radius:13px;padding:11px 13px}
.bidsethead{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.bidbig{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:26px;color:#FF6A13}
.bidslider{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:999px;margin:12px 0 6px;background:linear-gradient(90deg,#FF6A13 var(--pct,50%),#E2E5EA var(--pct,50%));outline:none}
.bidslider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:28px;height:28px;border-radius:50%;background:#fff;border:3px solid #FF6A13;box-shadow:0 2px 6px rgba(0,0,0,.2);cursor:pointer}
.bidslider::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:#fff;border:3px solid #FF6A13;box-shadow:0 2px 6px rgba(0,0,0,.2);cursor:pointer}
.bidends{display:flex;justify-content:space-between;align-items:center;font-family:'JetBrains Mono',monospace;font-size:12px;color:#6B7280}
.bidends .hint{font-family:Inter}
.appbid{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0}
.appbidnum{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:16px;color:#157F3D}
.editrow{display:flex;gap:14px;margin-top:8px}
.linkbtn{display:inline-flex;align-items:center;gap:5px;background:none;border:none;color:#6B7280;font-weight:600;font-size:13px;padding:4px 0;cursor:pointer}
.linkbtn.del{color:#C2410C}
.linkbtn.del.arm{color:#fff;background:#DC2626;border-radius:8px;padding:5px 10px}
.editbox{margin-top:10px}
.privacywarn{display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#C2410C;background:#FFF4EC;border-radius:10px;padding:8px 10px;margin-top:10px;line-height:1.4}
.thumbrm{position:absolute;bottom:0;left:0;right:0;background:rgba(21,24,28,.82);color:#fff;border:none;font-size:11px;font-weight:700;padding:5px;display:flex;align-items:center;justify-content:center;gap:4px;cursor:pointer}
.thumb{height:auto}
.thumb img{height:74px}
.estflag{font-size:12.5px;color:#C2410C;background:#FFF4EC;border-radius:10px;padding:8px 10px;margin-top:8px;line-height:1.4}
.tighten{background:#F4F6F8;border:1px solid #DFE3E8;border-radius:12px;padding:11px 12px;margin:10px 0}
.tightentext{font-size:13px;color:#3A414B;line-height:1.5;margin:0 0 9px}
.tightenmiss{color:#15181C;font-weight:600}
.howto{background:#F0F7F2;border:1px solid #CDE6D6;border-radius:12px;padding:12px 14px;margin:10px 0}
.howtohead{font-family:'Barlow Condensed';font-weight:700;font-size:17px;text-transform:uppercase;letter-spacing:.4px;color:#157F3D;margin-bottom:6px}
.howtosteps{margin:0;padding-left:20px;font-size:13.5px;color:#2A3038;line-height:1.55}
.howtosteps li{margin-bottom:4px}
.howtoback{font-size:12.5px;color:#3A414B;background:#FFFFFF;border-radius:9px;padding:8px 10px;margin-top:9px;line-height:1.45}
.dropzone.shot{display:flex;flex-direction:column;align-items:center;gap:3px;border:2px solid #FF6A13;background:#FFF4EC;border-radius:13px;padding:15px;text-align:center;cursor:pointer}
.dropzone.shot b{font-size:16px;color:#15181C}
.dzsub{font-size:12px;color:#6B7280}
.altrow{display:flex;gap:18px;justify-content:center;margin-top:10px}
.altlink{background:none;border:none;color:#6B7280;font-size:12.5px;text-decoration:underline;cursor:pointer;padding:0;font-family:inherit}
.costbox{margin-top:12px;border:1px dashed #B8BEC8;border-radius:12px;padding:11px 13px;background:#FAFBFC}
.costhead{font-family:'Barlow Condensed';font-weight:700;font-size:16px;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px}
.costrow{display:flex;justify-content:space-between;gap:12px;font-size:13px;color:#3A414B;padding:3px 0}
.labtag{display:inline-block;margin-left:7px;padding:1px 7px;border-radius:8px;font-size:10.5px;font-weight:700;vertical-align:middle;letter-spacing:.2px}
.labtag.book{background:#E6F4EA;color:#157F3D}
.labtag.est{background:#FFF1E8;color:#C2540A}
.manualbadge{display:inline-block;margin:2px 0 8px;padding:3px 10px;border-radius:9px;font-size:11.5px;font-weight:700;letter-spacing:.2px}
.manualbadge.on{background:#E6F4EA;color:#157F3D}
.manualbadge.off{background:#F1F1F2;color:#6B7076}
.costrow b{font-family:'JetBrains Mono',monospace;color:#15181C}
.costrow.total{border-top:1px solid #E2E5EA;margin-top:4px;padding-top:7px;font-weight:700}
.costrow.total b{color:#15181C}
.overriderow{margin-top:10px}
.ovbox{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.ovinput{width:140px;font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600}
.radslider{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:999px;margin:10px 0 6px;background:linear-gradient(90deg,#FF6A13 var(--pct,30%),#E2E5EA var(--pct,30%));outline:none}
.radslider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:28px;height:28px;border-radius:50%;background:#fff;border:3px solid #FF6A13;box-shadow:0 2px 6px rgba(0,0,0,.2);cursor:pointer}
.radslider::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:#fff;border:3px solid #FF6A13;cursor:pointer}
.radpill{width:100%;text-align:center;border:1.5px solid #D7DBE0;background:#fff;border-radius:12px;padding:10px;font-weight:600;font-size:13px;color:#6B7280;cursor:pointer;margin-bottom:2px}
.radpill.on{border-color:#FF6A13;background:#FFF6F0;color:#C2410C}
.segtabs{display:flex;gap:6px;background:#EFF1F4;border-radius:12px;padding:4px}
.seg{flex:1;border:none;background:none;padding:9px;border-radius:9px;font-weight:700;font-size:13.5px;color:#6B7280;cursor:pointer}
.seg.on{background:#fff;color:#15181C;box-shadow:0 1px 3px rgba(0,0,0,.1)}
.privacyaccept{display:flex;align-items:flex-start;gap:10px;width:100%;text-align:left;background:#FFF4EC;border:1.5px solid #F0A878;border-radius:12px;padding:12px;margin:4px 0 10px;cursor:pointer}
.privacyaccept.on{border-color:#157F3D;background:#EAFAF0}
.pacheck{flex-shrink:0;width:24px;height:24px;border-radius:7px;border:2px solid #C2410C;background:#fff;display:flex;align-items:center;justify-content:center;color:#157F3D}
.privacyaccept.on .pacheck{border-color:#157F3D;background:#157F3D;color:#fff}
.patext{font-size:12.5px;color:#15181C;line-height:1.4}
.patext b{font-weight:700}
.card-h2{font-family:'Barlow Condensed';font-weight:700;font-size:19px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}
.addrtoggle{display:flex;align-items:center;gap:11px;cursor:pointer}
.addrtoggle span{font-size:14px;color:#15181C}
.toggleswitch{width:46px;height:27px;border-radius:999px;background:#D7DBE0;border:none;position:relative;flex-shrink:0;cursor:pointer;transition:background .15s;padding:0}
.toggleswitch.on{background:#157F3D}
.toggleswitch span{position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:50%;background:#fff;transition:left .15s;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.toggleswitch.on span{left:22px}
.nudgetxt{display:flex;align-items:flex-start;gap:7px;font-size:13.5px;color:#15181C;line-height:1.45;margin-bottom:10px}
.matwrap{margin-top:12px}
.matlist{border:1px solid #E7E9ED;border-radius:13px;padding:11px 12px;background:#FAFBFC}
.matlhead{display:flex;align-items:center;gap:7px;font-family:'Barlow Condensed';font-weight:700;font-size:16px;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;flex-wrap:wrap}
.matrow{display:flex;gap:6px;align-items:center;margin-bottom:6px}
.matname{flex:2;padding:8px 10px}
.matqty{flex:1;padding:8px 10px}
.matx{background:none;border:none;color:#9AA1AB;padding:4px;flex-shrink:0;cursor:pointer}
.bellbtn{position:relative}
.belldot{position:absolute;top:-3px;right:-3px;background:#FF6A13;color:#fff;border-radius:999px;min-width:17px;height:17px;font-size:10.5px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 4px;border:2px solid #15181C}
.notifback{position:fixed;inset:0;z-index:70;background:rgba(21,24,28,.35)}
.notifpanel{position:absolute;top:calc(54px + env(safe-area-inset-top));right:10px;width:min(360px,92vw);max-height:70vh;overflow-y:auto;background:#fff;border:1px solid #E7E9ED;border-radius:16px;box-shadow:0 14px 40px rgba(0,0,0,.25)}
.notifhead{display:flex;align-items:center;justify-content:space-between;font-family:'Barlow Condensed';font-weight:700;font-size:19px;text-transform:uppercase;letter-spacing:.5px;padding:13px 15px;border-bottom:1px solid #E7E9ED;position:sticky;top:0;background:#fff}
.notifx{background:none;border:none;color:#9AA1AB;cursor:pointer;padding:2px}
.notifrow{display:flex;align-items:flex-start;gap:10px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #F1F2F5;padding:12px 15px;cursor:pointer}
.notifrow.unseen{background:#FFF6F0}
.notifico{font-size:18px;flex-shrink:0;line-height:1.2}
.notiftxt{font-size:13.5px;color:#15181C;line-height:1.4}
.notifwhen{display:block;font-size:11px;color:#9AA1AB;margin-top:2px}
.seclabel{font-size:11px;font-weight:800;letter-spacing:.7px;text-transform:uppercase;color:#FF6A13;margin-top:2px}

/* chooser */
.chooser{padding-top:52px;text-align:center}
.hero{font-family:'Barlow Condensed';font-weight:700;font-size:46px;line-height:1.02;text-transform:uppercase}
.herosub{color:#4B5563;max-width:440px;margin:14px auto 24px;line-height:1.5}
.rolebtn{display:block;width:100%;max-width:380px;margin:0 auto 12px;background:#FF6A13;color:#fff;border:none;border-radius:16px;padding:18px;font-family:'Barlow Condensed';font-weight:700;font-size:22px;letter-spacing:.8px;text-transform:uppercase;box-shadow:0 6px 18px rgba(255,106,19,.3)}
.rolebtn.dark{background:#15181C;box-shadow:0 6px 18px rgba(21,24,28,.25)}

/* toast & party */
.toast{position:fixed;bottom:calc(96px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);background:#15181C;color:#fff;padding:11px 18px;border-radius:13px;border-left:4px solid #FF6A13;z-index:60;max-width:90vw;box-shadow:0 8px 24px rgba(0,0,0,.3);font-size:14px;line-height:1.4}
.party{position:fixed;inset:0;z-index:80;background:rgba(21,24,28,.55);display:flex;align-items:center;justify-content:center;overflow:hidden}
.confetti{position:absolute;top:-20px;border-radius:2px;animation:fall linear forwards}
@keyframes fall{to{transform:translateY(112vh) rotate(var(--rot,540deg))}}
.partycard{background:#fff;border-radius:22px;padding:30px 28px;text-align:center;max-width:320px;margin:0 18px;box-shadow:0 20px 60px rgba(0,0,0,.35);display:flex;flex-direction:column;align-items:center;gap:8px;animation:pop .35s cubic-bezier(.2,1.4,.4,1)}
@keyframes pop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}
.partytitle{font-family:'Barlow Condensed';font-weight:700;font-size:30px;text-transform:uppercase;line-height:1.05}
.partysub{color:#4B5563;font-size:14.5px;line-height:1.45}
.partyhint{color:#9AA1AB;font-size:11.5px;margin-top:6px}

/* plans */
.plangrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px}
.plan{position:relative;text-align:left;background:#fff;border:1.5px solid #D7DBE0;border-radius:14px;padding:13px;display:flex;flex-direction:column;gap:3px;cursor:pointer}
.plan.on{border-color:#FF6A13;background:#FFF6F0}
.plan b{font-family:'Barlow Condensed';font-size:18px;letter-spacing:.5px;text-transform:uppercase}
.planprice{font-family:'JetBrains Mono',monospace;font-weight:600;font-size:22px}
.planprice i{font-style:normal;font-size:12px;color:#737B86}
.planon{position:absolute;top:9px;right:11px;color:#FF6A13;font-weight:700;font-size:12px;text-transform:uppercase}

@media (min-width:560px){.reportgrid{grid-template-columns:repeat(3,1fr)}}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}.confetti{display:none}}
/* PROPOSAL PDF EXPORT — native print → Save as PDF. The .propsheet is a direct child of .app,
   so hide its siblings (header/screens/nav) and let the proposal flow from the top across pages. */
@media print {
  @page { margin: 12mm; }
  html, body { background:#fff !important; }
  .app > *:not(.propsheet):not(.stalesheet) { display:none !important; }
  .propsheet, .stalesheet { position:static !important; inset:auto !important; width:auto !important; background:#fff !important; overflow:visible !important; z-index:auto !important; }
  .propsheet .no-print, .stalesheet .no-print { display:none !important; }
  .propsheet .card, .stalesheet .card { box-shadow:none !important; border:1px solid #e0e4e8 !important; break-inside:avoid; }
  .propsheet img { max-width:100% !important; }
  * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
}
`;


// ---- mount the app (Netlify/browser; the artifact relay used to do this automatically) ----
const __root = ReactDOM.createRoot(document.getElementById("root"));
__root.render(React.createElement(App));
