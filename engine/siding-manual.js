/* CazBid Trade Manual — SIDING (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 * Labor basis: AREA/DAY (squares/day). Values marked // TUNE are placeholders.
 *
 * *** OVERLAP CHECK ***
 *   You may already have siding logic in your existing exterior/roofing
 *   manuals, and house-wrap may already be counted in framing-manual.js.
 *   Have the agent diff this against existing manuals before wiring, so
 *   house-wrap and accessories aren't double-counted.
 *
 * INPUTS expected from takeoff:
 *   wallAreaSF       gross exterior wall area
 *   openingCount     doors + windows (deductions + J-channel)
 *   outsideCornerLF  outside corner length (corner posts)
 *   soffitAreaSF     soffit area (0 if separate scope)
 *   fasciaLF         fascia length
 *   starterLF        perimeter at base of walls
 */
export const sidingManual = {
  trade: "siding",
  version: "0.1-template",
  basis: "lap/vinyl/fiber-cement field + accessories",

  defaults: { sqSF: 100, wasteField: 1.10 },

  lineItems: [
    {
      id: "siding_field",
      name: "Siding field",
      unit: "SQ",
      // net wall area after openings, +10% waste, in squares (100 SF)
      takeoff: "(((wallAreaSF - (openingCount * 17)) * 1.10) / sqSF)",
      rounding: "round up to whole square",
      materialUnitCost: 185.0,  // TUNE $/square (varies hugely by product)
      note: "Cedar/board-and-batten/complex patterns need 12-15% waste, not 10%.",
    },
    {
      id: "starter_strip",
      name: "Starter strip",
      unit: "LF",
      takeoff: "starterLF * 1.05",
      rounding: "round up",
      materialUnitCost: 0.65,   // TUNE $/LF
    },
    {
      id: "j_channel",
      name: "J-channel (openings)",
      unit: "LF",
      takeoff: "(openingCount * 17) * 1.10",
      rounding: "round up to whole stick",
      materialUnitCost: 0.75,   // TUNE $/LF
    },
    {
      id: "corner_posts",
      name: "Outside corner posts",
      unit: "LF",
      takeoff: "outsideCornerLF * 1.05",
      rounding: "round up to whole post",
      materialUnitCost: 2.25,   // TUNE $/LF
    },
    {
      id: "soffit",
      name: "Soffit",
      unit: "SF",
      takeoff: "soffitAreaSF * 1.10",
      rounding: "none",
      materialUnitCost: 2.40,   // TUNE $/SF
    },
    {
      id: "fascia",
      name: "Fascia",
      unit: "LF",
      takeoff: "fasciaLF * 1.05",
      rounding: "round up to whole stick",
      materialUnitCost: 2.10,   // TUNE $/LF
    },
  ],

  labor: {
    laborBasis: "area_per_day",
    productionRateSQPerDay: 4,    // TUNE squares per crew per day
    hoursPerDay: 8,
    crewHourlyRate: 40.0,         // TUNE
    complexityFactor: 1.3,        // TUNE cut-up walls, multi-story, dormers
    note: "Soffit/fascia and accessories slow the squares/day rate — tune from real jobs.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
