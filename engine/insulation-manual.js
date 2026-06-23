/* CazBid Trade Manual — INSULATION (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 * Labor basis: AREA/DAY. Values marked // TUNE are placeholders.
 *
 * *** CRITICAL AREA RULE (baked into formulas below) ***
 *   - ATTIC blown-in uses the FLOOR FOOTPRINT below the roof, NOT roof area.
 *     Using roof area overestimates ~12% on a 6/12 pitch.
 *   - CATHEDRAL/sloped ceilings DO use the pitched rafter area.
 *
 * INPUTS expected from takeoff:
 *   wallCavityAreaSF   net stud-cavity wall area to insulate
 *   atticFloorSF       floor footprint under the attic (for blown-in)
 *   cathedralAreaSF    pitched ceiling area (rafter cavities), if any
 *   rimJoistLF         rim/band joist length
 *   rValueWall, rValueAttic   target R-values
 */
export const insulationManual = {
  trade: "insulation",
  version: "0.1-template",
  basis: "batts in walls, blown-in attic, optional cathedral batts",

  defaults: { wasteWall: 1.10, wasteCathedral: 1.15 },

  lineItems: [
    {
      id: "wall_batts",
      name: "Wall batts (faced)",
      unit: "SF",
      takeoff: "wallCavityAreaSF * 1.10",
      rounding: "round up to whole bag coverage",
      materialUnitCost: 0.85,   // TUNE $/SF at target R (price changes with R-value)
    },
    {
      id: "attic_blown",
      name: "Attic blown-in (uses FLOOR footprint)",
      unit: "BAG",
      // bags = footprint / coverage-per-bag-at-target-R
      takeoff: "atticFloorSF / coveragePerBagSF",
      rounding: "round up to whole bag",
      materialUnitCost: 38.0,   // TUNE $/bag
      params: { coveragePerBagSF: 40 }, // TUNE coverage drops as target R rises
      note: "DO NOT use roof area here — footprint only.",
    },
    {
      id: "cathedral_batts",
      name: "Cathedral / sloped ceiling batts (uses PITCHED area)",
      unit: "SF",
      takeoff: "cathedralAreaSF * 1.15",
      rounding: "round up to whole bag coverage",
      materialUnitCost: 1.10,   // TUNE $/SF
      note: "This one DOES use pitched rafter area, unlike the attic line above.",
    },
    {
      id: "rim_joist",
      name: "Rim joist insulation",
      unit: "LF",
      takeoff: "rimJoistLF",
      rounding: "none",
      materialUnitCost: 3.50,   // TUNE $/LF
    },
  ],

  labor: {
    laborBasis: "area_per_day",
    productionRateSFPerDay: 700,  // TUNE batts install fast; blown-in faster with machine
    hoursPerDay: 8,
    crewHourlyRate: 36.0,         // TUNE
    complexityFactor: 1.2,        // TUNE
    note: "Batts waste only 3-7% on straight runs; bump to 15% for cut-up/cold-climate work.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
