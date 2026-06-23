/* CazBid Trade Manual — ELECTRICAL (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 * Labor basis: PER-DEVICE / PER-FIXTURE + flat panel hours.
 *
 * *** HONEST CAVEAT — READ THIS ***
 *   This is an ALLOWANCE-level takeoff (rough + trim per device/fixture).
 *   It is NOT a code-compliant electrical design or load calculation.
 *   If you sub electrical out, treat the output as a sanity-check budget
 *   number and compare it against your electrician's actual quote — the
 *   sub quote wins. Only rely on this for ballpark/early-bid pricing.
 *
 * INPUTS expected from takeoff:
 *   deviceCount    receptacles + switches (boxes)
 *   fixtureCount   light fixtures / fans
 *   circuitCount   number of branch circuits / breakers
 *   floorAreaSF    conditioned floor area (for rough wire allowance)
 *   panelType      "new_panel" | "subpanel" | "none"
 */
export const electricalManual = {
  trade: "electrical",
  version: "0.1-template",
  basis: "allowance-level residential rough + trim",

  defaults: { romexLFperSF: 1.2 },   // rough wire allowance per SF of floor

  lineItems: [
    {
      id: "rough_wire",
      name: "Branch wiring (Romex) allowance",
      unit: "LF",
      takeoff: "floorAreaSF * romexLFperSF",
      rounding: "round up to whole roll",
      materialUnitCost: 0.55,   // TUNE $/LF (gauge-dependent)
    },
    {
      id: "devices",
      name: "Devices (receptacle/switch + box + plate)",
      unit: "EA",
      takeoff: "deviceCount",
      rounding: "none",
      materialUnitCost: 6.50,   // TUNE $/device assembly
    },
    {
      id: "fixtures",
      name: "Light fixtures / fans (allowance)",
      unit: "EA",
      takeoff: "fixtureCount",
      rounding: "none",
      materialUnitCost: 65.0,   // TUNE $/fixture allowance — set per job
    },
    {
      id: "breakers",
      name: "Breakers",
      unit: "EA",
      takeoff: "circuitCount",
      rounding: "none",
      materialUnitCost: 12.0,   // TUNE $/breaker
    },
    {
      id: "panel",
      name: "Panel / subpanel",
      unit: "EA",
      takeoff: "panelType === 'none' ? 0 : 1",
      rounding: "none",
      materialUnitCost: 350.0,  // TUNE $/panel (new service costs more)
    },
    {
      id: "misc",
      name: "Misc (staples, connectors, wire nuts)",
      unit: "LS",
      takeoff: "1",
      rounding: "none",
      materialUnitCost: 120.0,  // TUNE lump allowance
    },
  ],

  // Labor: hours per device + per fixture + flat panel hours.
  labor: {
    laborBasis: "per_device_per_fixture",
    crewHourlyRate: 65.0,         // TUNE electrician rate
    hoursPerDevice: 1.0,          // TUNE rough + trim per device
    hoursPerFixture: 0.75,        // TUNE
    hoursPerPanel: 8.0,           // TUNE new panel/service hours
    complexityFactor: 1.25,       // TUNE old work/fishing walls runs much higher
    // total = (deviceCount*hoursPerDevice)+(fixtureCount*hoursPerFixture)
    //       + (panel? hoursPerPanel:0), then * complexityFactor
    note: "Old-work/retrofit (fishing existing walls) can double these — new construction is the low end.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
