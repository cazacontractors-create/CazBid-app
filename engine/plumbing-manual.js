/* CazBid Trade Manual — PLUMBING (template / v0)
 * Methodology + conventions: see framing-manual.js header.
 * Labor basis: PER-FIXTURE (rough + set + trim).
 *
 * *** HONEST CAVEAT — READ THIS ***
 *   Allowance-level takeoff driven by fixture count. NOT a code DWV/supply
 *   design. If subbed out, use as a budget sanity-check and defer to the
 *   plumber's quote. Good for early-bid ballpark only.
 *
 * INPUTS expected from takeoff:
 *   toiletCount, sinkCount, tubShowerCount, otherFixtureCount
 *   waterHeaterCount
 *   supplyRunLF   (optional explicit PEX run; else allowance per fixture)
 */
export const plumbingManual = {
  trade: "plumbing",
  version: "0.1-template",
  basis: "allowance-level residential rough + set + trim",

  defaults: { supplyLFperFixture: 25, dwvLFperFixture: 12 },

  lineItems: [
    {
      id: "toilets",
      name: "Toilets (fixture + rough + trim)",
      unit: "EA",
      takeoff: "toiletCount",
      rounding: "none",
      materialUnitCost: 240.0,  // TUNE $/fixture allowance
    },
    {
      id: "sinks",
      name: "Sinks / lavatories",
      unit: "EA",
      takeoff: "sinkCount",
      rounding: "none",
      materialUnitCost: 210.0,  // TUNE $/fixture allowance
    },
    {
      id: "tubs_showers",
      name: "Tubs / showers",
      unit: "EA",
      takeoff: "tubShowerCount",
      rounding: "none",
      materialUnitCost: 520.0,  // TUNE $/fixture allowance
    },
    {
      id: "other_fixtures",
      name: "Other fixtures (hose bibs, washer box, etc.)",
      unit: "EA",
      takeoff: "otherFixtureCount",
      rounding: "none",
      materialUnitCost: 95.0,   // TUNE
    },
    {
      id: "water_heater",
      name: "Water heater",
      unit: "EA",
      takeoff: "waterHeaterCount",
      rounding: "none",
      materialUnitCost: 850.0,  // TUNE $/unit (tank vs tankless varies)
    },
    {
      id: "supply_pipe",
      name: "Supply pipe (PEX) allowance",
      unit: "LF",
      // explicit run if provided, else allowance per fixture
      takeoff: "supplyRunLF > 0 ? supplyRunLF : ((toiletCount+sinkCount+tubShowerCount+otherFixtureCount) * supplyLFperFixture)",
      rounding: "round up to whole roll",
      materialUnitCost: 0.85,   // TUNE $/LF
    },
    {
      id: "dwv_pipe",
      name: "DWV pipe allowance",
      unit: "LF",
      takeoff: "(toiletCount+sinkCount+tubShowerCount+otherFixtureCount) * dwvLFperFixture",
      rounding: "round up to whole length",
      materialUnitCost: 2.40,   // TUNE $/LF blended
    },
  ],

  // Labor: hours per fixture (rough + set + trim) + water heater hours.
  labor: {
    laborBasis: "per_fixture",
    crewHourlyRate: 70.0,         // TUNE plumber rate
    hoursPerFixture: 6.0,         // TUNE blended rough+set+trim per fixture
    hoursPerWaterHeater: 4.0,     // TUNE
    complexityFactor: 1.25,       // TUNE slab vs crawl access, retrofit, long runs
    // total = (fixtureTotal * hoursPerFixture)
    //       + (waterHeaterCount * hoursPerWaterHeater), then * complexityFactor
    note: "Fixture-hours is the industry standard basis. Retrofit/slab work pushes it up.",
  },

  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};
