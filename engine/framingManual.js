/* =============================================================================
 * CazBid Trade Manual — FRAMING (template / v0)
 * =============================================================================
 * SOURCE OF TRUTH for the framing takeoff/labor engine (documented ESM spec).
 *
 * STATUS: the DETERMINISTIC CALCULATOR is now LIVE. The LLM extracts dimensions
 *   and `netlify/functions/framingCalculator.js` computes every quantity/cost/
 *   labor number exactly (wired into estimate-background.js for trade==="framing").
 *
 * THREE COPIES MUST STAY IN SYNC (same seeds + formulas):
 *   1. THIS FILE                                        — documented spec (ESM)
 *   2. netlify/functions/framingCalculator.js           — runtime mirror (CJS, bundled)
 *   3. Section 0 of Caza_Framing_Estimating_Manual.md   — what the LLM reads
 *   If you change a seed cost/rate or a formula, change it in all three.
 *
 * SEED VALUES marked // TUNE are placeholders -> replace with real ABC Supply
 * pricing and crew-history calibration.
 *
 * UNITS: EA, LF, SF, BF.  Inputs the takeoff supplies: wallLF, wallAreaSF,
 *   floorAreaSF, floorPerimeterLF, roofAreaSF, buildingLengthLF, ocSpacingIN,
 *   trussSpacingIN, openingCount, stories.
 * ========================================================================== */

export const framingManual = {
  trade: "framing",
  version: "0.1-template",
  basis: "wood platform framing — addition / new shell",

  defaults: {
    ocSpacingIN: 16,
    trussSpacingIN: 24,
    stockPlateLF: 16,        // length of plate stock you buy
    sheetSF: 32,             // 4x8 OSB/CDX
  },

  // MATERIAL LINE ITEMS — qty formula -> rounding -> unit cost (TUNE from ABC Supply)
  lineItems: [
    // ---- WALLS ----
    {
      id: "wall_studs",
      name: "Wall studs (2x studs)",
      unit: "EA",
      takeoff: "(((wallLF * 12) / ocSpacingIN) + 1) * 1.15",
      rounding: "round up to whole stud",
      materialUnitCost: 4.25,   // TUNE  $/stud
      note: "Quick rule cross-check: total studs ~= wallLF * 1.2 including extras.",
    },
    {
      id: "wall_plates",
      name: "Plates (1 bottom + double top)",
      unit: "LF",
      takeoff: "wallLF * 3",     // 3 plate-runs for load-bearing walls
      rounding: "round up to whole stock length (stockPlateLF)",
      materialUnitCost: 0.95,   // TUNE  $/LF of plate stock
      note: "Drop to *2 for non-load-bearing interior partitions.",
    },
    {
      id: "headers",
      name: "Headers over openings",
      unit: "BF",
      takeoff: "openingCount * 12",  // ~12 BF avg header; refine per opening size
      rounding: "round up to whole board",
      materialUnitCost: 1.85,   // TUNE  $/BF
      note: "Avg only. Big spans (garage, sliders) should be itemized separately.",
    },
    {
      id: "wall_sheathing",
      name: "Wall sheathing (OSB/CDX)",
      unit: "EA",
      takeoff: "(wallAreaSF * 1.10) / sheetSF",
      rounding: "round up to whole sheet",
      materialUnitCost: 18.0,   // TUNE  $/sheet
    },
    {
      id: "housewrap",
      name: "House wrap",
      unit: "ROLL",
      takeoff: "(wallAreaSF * 1.10) / rollCoverageSF",
      rounding: "round up to whole roll",
      materialUnitCost: 165.0,  // TUNE  $/roll
      params: { rollCoverageSF: 1000 }, // TUNE coverage of the roll you buy
    },

    // ---- FLOOR STRUCTURE ----
    {
      id: "floor_joists",
      name: "Floor joists (priced per SF of floor)",
      unit: "SF",
      takeoff: "floorAreaSF * 1.05",
      rounding: "none",
      materialUnitCost: 2.40,   // TUNE  $/SF (joist material at your spacing/span)
    },
    {
      id: "rim_joist",
      name: "Rim / band joist",
      unit: "LF",
      takeoff: "floorPerimeterLF",
      rounding: "round up to whole stock length",
      materialUnitCost: 2.10,   // TUNE  $/LF
    },
    {
      id: "subfloor",
      name: "Subfloor (3/4 T&G OSB)",
      unit: "EA",
      takeoff: "(floorAreaSF * 1.10) / sheetSF",
      rounding: "round up to whole sheet",
      materialUnitCost: 32.0,   // TUNE  $/sheet
    },

    // ---- ROOF STRUCTURE (structure only; roofing felt/shingles live in ROOFING manual) ----
    {
      id: "roof_trusses",
      name: "Roof trusses / rafters",
      unit: "EA",
      takeoff: "((buildingLengthLF * 12) / trussSpacingIN) + 1",
      rounding: "round up to whole truss",
      materialUnitCost: 145.0,  // TUNE  $/truss (varies hard by span/pitch — quote it)
      note: "For an addition, trusses are usually quoted by the supplier — treat seed as placeholder.",
    },
    {
      id: "roof_sheathing",
      name: "Roof sheathing (OSB/CDX)",
      unit: "EA",
      takeoff: "(roofAreaSF * 1.10) / sheetSF",
      rounding: "round up to whole sheet",
      materialUnitCost: 18.0,   // TUNE  $/sheet
      note: "Skip this line if your ROOFING manual already counts roof sheathing.",
    },

    // ---- FASTENERS ----
    {
      id: "fasteners",
      name: "Framing nails / structural screws",
      unit: "SF",
      takeoff: "(wallAreaSF + floorAreaSF + roofAreaSF)",
      rounding: "none",
      materialUnitCost: 0.12,   // TUNE  $/SF fastener allowance
    },
  ],

  // LABOR — crew-production model (THE method; overrides per-unit MH).
  //   framerDays    = totalFramedAreaSF / productionRateSFPerDay
  //   rawHours      = framerDays * hoursPerDay
  //   adjustedHours = rawHours * complexityFactor
  //   laborCost     = adjustedHours * crewHourlyRate
  //   totalFramedAreaSF = wallAreaSF + floorAreaSF + roofAreaSF
  labor: {
    productionRateSFPerDay: 350,  // TUNE  SF per framer per day
    hoursPerDay: 8,
    crewHourlyRate: 40.0,         // TUNE  blended framer rate (Lewis County)
    complexityFactor: 1.4,        // TUNE  1.0 simple box -> 1.8 cut-up/addition tie-in
    note:
      "Two-story + tie-in to existing structure runs slower; complexity 40-80% over " +
      "a straightforward layout is normal. Back productionRateSFPerDay out of 3-4 past jobs.",
  },

  // GLOBAL CALIBRATION — one knob to scale all labor/material vs. actuals.
  calibration: {
    laborMultiplier: 1.0,   // TUNE from job-cost history
    materialMultiplier: 1.0 // TUNE (regional/markup adjustment)
  },
};
