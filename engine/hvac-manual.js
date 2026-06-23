/* CazBid Trade Manual — HVAC (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 * Labor basis: PER-SYSTEM install + PER-REGISTER.
 *
 * *** STRONGEST CAVEAT IN THE SET — READ THIS ***
 *   The tonnage estimate below is a CRUDE rule of thumb (SF / 500). It is
 *   NOT a Manual J load calculation. Real equipment sizing depends on
 *   insulation, windows, orientation, climate, and infiltration. Under- or
 *   over-sizing HVAC causes real comfort and equipment-life problems.
 *   Use this for early BUDGET pricing only. For an actual install, get a
 *   proper load calc / the HVAC sub's sizing. The sub quote wins.
 *
 * INPUTS expected from takeoff:
 *   conditionedSF   conditioned floor area
 *   registerCount   supply + return registers/grilles
 *   systemType      "furnace_ac" | "heat_pump" | "mini_split" | "none"
 *   tonsOverride    if you already have a load calc, pass tons here (else 0)
 */
export const hvacManual = {
  trade: "hvac",
  version: "0.1-template",
  basis: "allowance-level residential single-system",

  defaults: { sfPerTon: 500 },   // CRUDE rule of thumb only — see caveat

  lineItems: [
    {
      id: "equipment",
      name: "Equipment (furnace/AC or heat pump) by tonnage",
      unit: "TON",
      // use override if a real load calc exists, else crude SF/500
      takeoff: "tonsOverride > 0 ? tonsOverride : (conditionedSF / sfPerTon)",
      rounding: "round up to 0.5 ton",
      materialUnitCost: 1400.0, // TUNE $/ton of equipment (system-type dependent)
      note: "Replace SF/500 with a Manual J result the moment you have one.",
    },
    {
      id: "ductwork",
      name: "Ductwork (trunk + branches) allowance",
      unit: "EA",
      // allowance scaled by register count
      takeoff: "registerCount",
      rounding: "none",
      materialUnitCost: 85.0,   // TUNE $/run allowance (trunk + branch)
    },
    {
      id: "registers",
      name: "Registers / grilles",
      unit: "EA",
      takeoff: "registerCount",
      rounding: "none",
      materialUnitCost: 22.0,   // TUNE $/register
    },
    {
      id: "lineset_misc",
      name: "Lineset / condensate / misc",
      unit: "LS",
      takeoff: "systemType === 'none' ? 0 : 1",
      rounding: "none",
      materialUnitCost: 280.0,  // TUNE lump allowance
    },
    {
      id: "thermostat",
      name: "Thermostat",
      unit: "EA",
      takeoff: "systemType === 'none' ? 0 : 1",
      rounding: "none",
      materialUnitCost: 120.0,  // TUNE
    },
  ],

  // Labor: flat system-install hours + per-register hours.
  labor: {
    laborBasis: "per_system_per_register",
    crewHourlyRate: 65.0,         // TUNE HVAC tech rate
    hoursPerSystem: 24.0,         // TUNE base install (equipment + lineset + startup)
    hoursPerRegister: 1.5,        // TUNE duct run + register set
    complexityFactor: 1.3,        // TUNE retrofit ducting, multi-zone, tight access
    // total = hoursPerSystem + (registerCount * hoursPerRegister),
    //         then * complexityFactor   (0 if systemType === 'none')
    note: "New ductwork in an existing house is the expensive case — tune up hard for retrofit.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
