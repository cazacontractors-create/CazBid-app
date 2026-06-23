/* CazBid Trade Manual — CONCRETE / FOUNDATION (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 *
 * *** LABOR BASIS IS SPLIT ***
 *   Concrete bills two ways at once: FORMING by contact area/LF, and
 *   PLACEMENT + FINISHING by cubic yard (and slab finishing by SF).
 *   Both are modeled separately below — intentional, not framing's model.
 *
 * UNITS: CY = cubic yards (concrete), LF = linear feet, SF = square feet
 *
 * INPUTS expected from takeoff:
 *   footingLF, footingWidthIN, footingDepthIN
 *   wallLF, wallHeightFT, wallThicknessIN     (poured foundation walls; 0 if none)
 *   slabAreaSF, slabThicknessIN
 *   gravelDepthIN                              (base under slab)
 *   formContactSF                              (total form face area)
 *   anchorBoltSpacingFT
 */
export const concreteManual = {
  trade: "concrete",
  version: "0.1-template",
  basis: "footings, poured walls, slab-on-grade + base",

  defaults: { cfPerCY: 27, wasteConcrete: 1.10 },

  lineItems: [
    {
      id: "footing_concrete",
      name: "Footing concrete",
      unit: "CY",
      // (LF * widthFT * depthFT) / 27, +10% waste
      takeoff: "((footingLF * (footingWidthIN/12) * (footingDepthIN/12)) / 27) * 1.10",
      rounding: "round up to 0.5 CY",
      materialUnitCost: 165.0,  // TUNE $/CY delivered
    },
    {
      id: "wall_concrete",
      name: "Foundation wall concrete",
      unit: "CY",
      takeoff: "((wallLF * wallHeightFT * (wallThicknessIN/12)) / 27) * 1.10",
      rounding: "round up to 0.5 CY",
      materialUnitCost: 165.0,  // TUNE $/CY
    },
    {
      id: "slab_concrete",
      name: "Slab concrete",
      unit: "CY",
      takeoff: "((slabAreaSF * (slabThicknessIN/12)) / 27) * 1.10",
      rounding: "round up to 0.5 CY",
      materialUnitCost: 165.0,  // TUNE $/CY
    },
    {
      id: "gravel_base",
      name: "Gravel base under slab",
      unit: "CY",
      takeoff: "((slabAreaSF * (gravelDepthIN/12)) / 27) * 1.10",
      rounding: "round up to 0.5 CY",
      materialUnitCost: 45.0,   // TUNE $/CY (or price per ton)
    },
    {
      id: "rebar",
      name: "Rebar",
      unit: "LF",
      // rough grid allowance; refine with actual spacing
      takeoff: "(footingLF * 2) + (slabAreaSF * 0.5)",
      rounding: "round up to whole stick",
      materialUnitCost: 0.55,   // TUNE $/LF
    },
    {
      id: "wire_mesh",
      name: "Welded wire mesh (slab)",
      unit: "SF",
      takeoff: "slabAreaSF * 1.10",
      rounding: "round up to whole sheet/roll",
      materialUnitCost: 0.35,   // TUNE $/SF
    },
    {
      id: "vapor_barrier",
      name: "Under-slab vapor barrier",
      unit: "SF",
      takeoff: "slabAreaSF * 1.15",
      rounding: "round up to whole roll",
      materialUnitCost: 0.18,   // TUNE $/SF
    },
    {
      id: "anchor_bolts",
      name: "Anchor bolts",
      unit: "EA",
      takeoff: "(wallLF / anchorBoltSpacingFT) + 1",
      rounding: "round up",
      materialUnitCost: 2.75,   // TUNE $/each
    },
  ],

  // Two labor models, summed.
  labor: {
    laborBasis: "forming_plus_placement",
    crewHourlyRate: 40.0,           // TUNE
    hoursPerFormSF: 0.10,           // TUNE set + strip forms, per SF of form face
    hoursPerCY_place: 1.2,          // TUNE place + consolidate, per CY
    hoursPerSlabSF_finish: 0.015,   // TUNE float/trowel finish, per SF of slab
    complexityFactor: 1.3,          // TUNE site access, weather, stamped/exposed
    // total = (formContactSF * hoursPerFormSF)
    //       + (totalCY * hoursPerCY_place)
    //       + (slabAreaSF * hoursPerSlabSF_finish), then * complexityFactor
    note: "Pump rental, weather, and finish type (broom vs stamped) swing this a lot.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
