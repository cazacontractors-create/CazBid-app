/* CazBid Trade Manual — DRYWALL (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 * Labor basis: AREA/DAY (hang + finish). Values marked // TUNE are placeholders.
 *
 * INPUTS expected from takeoff:
 *   boardAreaSF   total drywall area = wall area + ceiling area to be covered
 *   openingCount  doors + windows (for deductions)
 *   outsideCornerLF  linear feet of outside corners (for corner bead)
 */
export const drywallManual = {
  trade: "drywall",
  version: "0.1-template",
  basis: "1/2in & 5/8in board, taped to Level 4 finish",

  defaults: { sheetSF: 32, doorDeductSF: 21, windowDeductSF: 14 },

  lineItems: [
    {
      id: "drywall_sheets",
      name: "Drywall sheets (4x8)",
      unit: "EA",
      // net area after opening deductions, +10% waste, divided by sheet size
      takeoff: "(((boardAreaSF - (openingCount * 17)) * 1.10) / sheetSF)",
      rounding: "round up to whole sheet",
      materialUnitCost: 14.0,   // TUNE $/sheet
      note: "Use 15-20% waste instead of 10% on cut-heavy rooms; 17 SF = blended door/window deduct.",
    },
    {
      id: "joint_compound",
      name: "Joint compound",
      unit: "LB",
      takeoff: "boardAreaSF * 0.053",   // ~0.053 lb mud per SF of board
      rounding: "round up to whole bucket",
      materialUnitCost: 0.45,   // TUNE $/lb (or price per bucket)
    },
    {
      id: "joint_tape",
      name: "Joint tape",
      unit: "LF",
      takeoff: "boardAreaSF * 0.5",     // ~0.5 LF tape per SF of board
      rounding: "round up to whole roll",
      materialUnitCost: 0.03,   // TUNE $/LF
    },
    {
      id: "drywall_screws",
      name: "Drywall screws",
      unit: "LB",
      takeoff: "boardAreaSF / 300",     // ~1 lb per 300 SF
      rounding: "round up to whole box",
      materialUnitCost: 2.50,   // TUNE $/lb
    },
    {
      id: "corner_bead",
      name: "Corner bead",
      unit: "LF",
      takeoff: "outsideCornerLF * 1.05",
      rounding: "round up to whole stick",
      materialUnitCost: 0.85,   // TUNE $/LF
    },
  ],

  // Labor basis: SF of board HUNG + FINISHED per person per day (blended).
  labor: {
    laborBasis: "area_per_day",
    productionRateSFPerDay: 250,  // TUNE blended hang+finish to Level 4
    hoursPerDay: 8,
    crewHourlyRate: 38.0,         // TUNE
    complexityFactor: 1.3,        // TUNE 1.0 open walls -> 1.6 lots of cuts/soffits
    note: "Hanging is fast (~1200 SF/day); finishing is the slow part. Tune the blended rate from your jobs.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
