/* CazBid Trade Manual — TRIM / FINISH CARPENTRY (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 *
 * *** LABOR BASIS IS DIFFERENT HERE ***
 *   Trim does NOT bill by area/day like framing/drywall. It bills by
 *   linear foot of running trim PLUS per-opening hours for doors/windows.
 *   This is intentional — matching the trade, not the framing template.
 *
 * INPUTS expected from takeoff:
 *   roomPerimeterLF   total wall base length (sum of rooms)
 *   doorCount         interior doors (openings to case + hang)
 *   windowCount       windows to case
 *   crownLF           optional crown molding length (0 if none)
 */
export const trimManual = {
  trade: "trim",
  version: "0.1-template",
  basis: "base, casing, interior doors, optional crown",

  defaults: { casingPerDoorLF: 17, casingPerWindowLF: 15 },

  lineItems: [
    {
      id: "baseboard",
      name: "Baseboard",
      unit: "LF",
      // perimeter less ~3 LF per door opening, +10% waste
      takeoff: "((roomPerimeterLF - (doorCount * 3)) * 1.10)",
      rounding: "round up to whole stick",
      materialUnitCost: 1.95,   // TUNE $/LF
    },
    {
      id: "door_casing",
      name: "Door casing",
      unit: "LF",
      takeoff: "(doorCount * casingPerDoorLF) * 1.10",
      rounding: "round up to whole stick",
      materialUnitCost: 1.75,   // TUNE $/LF
    },
    {
      id: "window_casing",
      name: "Window casing",
      unit: "LF",
      takeoff: "(windowCount * casingPerWindowLF) * 1.10",
      rounding: "round up to whole stick",
      materialUnitCost: 1.75,   // TUNE $/LF
    },
    {
      id: "interior_doors",
      name: "Interior doors (prehung)",
      unit: "EA",
      takeoff: "doorCount",
      rounding: "none",
      materialUnitCost: 145.0,  // TUNE $/door (slab+jamb); hardware separate
    },
    {
      id: "door_hardware",
      name: "Door hardware (knob/hinges)",
      unit: "SET",
      takeoff: "doorCount",
      rounding: "none",
      materialUnitCost: 28.0,   // TUNE $/set
    },
    {
      id: "crown",
      name: "Crown molding (optional)",
      unit: "LF",
      takeoff: "crownLF * 1.12",   // higher waste — mitered/coped
      rounding: "round up to whole stick",
      materialUnitCost: 2.85,   // TUNE $/LF
    },
  ],

  // Labor basis: hours per LF of running trim + flat hours per opening.
  labor: {
    laborBasis: "lf_plus_per_opening",
    crewHourlyRate: 42.0,          // TUNE finish carpenter rate
    hoursPerLF_running: 0.05,      // TUNE base + crown install per LF
    hoursPerDoor: 1.5,             // TUNE hang prehung + case both sides
    hoursPerWindow: 0.75,          // TUNE case a window
    complexityFactor: 1.2,         // TUNE stain-grade/paint-grade, joins, returns
    // total hours = (runningTrimLF * hoursPerLF_running)
    //             + (doorCount * hoursPerDoor)
    //             + (windowCount * hoursPerWindow), then * complexityFactor
    note: "Stain-grade work runs much slower than paint-grade — tune up for fine finish.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
