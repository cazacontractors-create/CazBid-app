// =============================================================================
// CazBid — DETERMINISTIC MULTI-TRADE ESTIMATING ENGINE  (runtime, CommonJS)
// =============================================================================
// Generalization of the original framing calculator. For any trade with a spec
// registered in SPECS below, the LLM only EXTRACTS the takeoff inputs; THIS
// engine computes every quantity/cost/labor number deterministically.
//
// A trade spec (see SPECS) declares:
//   inputs[]   - what the LLM must extract (drives the extraction tool + typing)
//   lineItems[]- material lines: { id, name, unit, takeoff(string formula),
//                rounding(string), materialUnitCost, params? }
//   labor      - { laborBasis, ...basis params..., complexityFactor }
//   calibration- { laborMultiplier, materialMultiplier }
//
// laborBasis is THE per-trade method and is NOT normalized to one model:
//   area_per_day            framing, drywall, siding, insulation
//   lf_plus_per_opening     trim
//   forming_plus_placement  concrete
//   per_device_per_fixture  electrical
//   per_fixture             plumbing
//   per_system_per_register hvac
//
// SYNC: the ESM source-of-truth specs live in ~/Desktop/files/cazbid/engine/*.js
// (the 8 trade files + framingManual.js). The specs embedded here are the runtime
// CJS mirror — keep seed costs/rates/formulas identical across both.
//
// Safety: takeoff formulas are OUR OWN trusted strings, evaluated in a scoped
// `new Function` whose only identifiers are the named inputs/defaults/params;
// any identifier outside that scope (i.e. a global) is rejected before eval.
// =============================================================================

// ---------------------------------------------------------------------------
// TRADE SPECS (runtime mirror)
// ---------------------------------------------------------------------------
const SPECS = {};

// ---- FRAMING (migrated from framingManual.js; area_per_day) ----------------
SPECS.framing = {
  trade: "framing",
  version: "0.1-template",
  basis: "wood platform framing — addition / new shell",
  defaults: { ocSpacingIN: 16, trussSpacingIN: 24, stockPlateLF: 16, sheetSF: 32 },
  inputs: [
    { name: "wallLF", label: "Wall length (all stories)", unit: "LF", type: "number", required: true, description: "Total wall length, summed across all stories, LF." },
    { name: "wallAreaSF", label: "Wall area", unit: "SF", type: "number", required: true, description: "Wall area = perimeter × wall height × stories, SF." },
    { name: "floorAreaSF", label: "Floor area (all stories)", unit: "SF", type: "number", required: true, description: "Total framed floor area = footprint × stories, SF." },
    { name: "floorPerimeterLF", label: "Floor perimeter", unit: "LF", type: "number", required: true, description: "Floor/building perimeter, LF (drives rim joist)." },
    { name: "roofAreaSF", label: "Roof area (pitch-adjusted)", unit: "SF", type: "number", required: true, description: "Pitch-adjusted roof surface area, SF." },
    { name: "buildingLengthLF", label: "Building length (truss run)", unit: "LF", type: "number", required: true, description: "Longest building run, LF (drives truss/rafter count)." },
    { name: "ocSpacingIN", label: "Stud spacing OC", unit: "in", type: "number", default: 16, description: "Stud on-center spacing in inches (default 16)." },
    { name: "trussSpacingIN", label: "Truss spacing OC", unit: "in", type: "number", default: 24, description: "Truss/rafter on-center spacing in inches (default 24)." },
    { name: "openingCount", label: "Openings (doors + windows)", unit: "", type: "number", required: true, description: "Count of doors + windows (drives header quantity)." },
    { name: "stories", label: "Stories", unit: "", type: "number", default: 1, description: "Number of stories." },
  ],
  lineItems: [
    { id: "wall_studs", name: "Wall studs (2x studs)", unit: "EA", takeoff: "(((wallLF * 12) / ocSpacingIN) + 1) * 1.15", rounding: "round up to whole stud", materialUnitCost: 4.25, priceMatch: "2x4 2x6 stud spf" },
    { id: "wall_plates", name: "Plates (1 bottom + double top)", unit: "LF", takeoff: "wallLF * 3", rounding: "round up to whole stock length (stockPlateLF)", materialUnitCost: 0.95, priceMatch: "2x4 2x6 plate spf" },
    { id: "headers", name: "Headers over openings", unit: "BF", takeoff: "openingCount * 12", rounding: "round up to whole board", materialUnitCost: 1.85, priceMatch: "header lvl 2x10 2x12" },
    { id: "wall_sheathing", name: "Wall sheathing (OSB/CDX)", unit: "EA", takeoff: "(wallAreaSF * 1.10) / sheetSF", rounding: "round up to whole sheet", materialUnitCost: 18.0, priceMatch: "osb cdx sheathing 7/16 4x8" },
    { id: "housewrap", name: "House wrap", unit: "ROLL", takeoff: "(wallAreaSF * 1.10) / rollCoverageSF", rounding: "round up to whole roll", materialUnitCost: 165.0, params: { rollCoverageSF: 1000 }, priceMatch: "housewrap tyvek wrb wrap" },
    { id: "floor_joists", name: "Floor joists (priced per SF)", unit: "SF", takeoff: "floorAreaSF * 1.05", rounding: "none", materialUnitCost: 2.40, priceMatch: "floor joist 2x10 i-joist" },
    { id: "rim_joist", name: "Rim / band joist", unit: "LF", takeoff: "floorPerimeterLF", rounding: "round up to whole stock length", materialUnitCost: 2.10, priceMatch: "rim band joist" },
    { id: "subfloor", name: "Subfloor (3/4 T&G OSB)", unit: "EA", takeoff: "(floorAreaSF * 1.10) / sheetSF", rounding: "round up to whole sheet", materialUnitCost: 32.0, priceMatch: "3/4 tongue groove osb subfloor 4x8" },
    { id: "roof_trusses", name: "Roof trusses / rafters", unit: "EA", takeoff: "((buildingLengthLF * 12) / trussSpacingIN) + 1", rounding: "round up to whole truss", materialUnitCost: 145.0, priceMatch: "roof truss rafter" },
    { id: "roof_sheathing", name: "Roof sheathing (OSB/CDX)", unit: "EA", takeoff: "(roofAreaSF * 1.10) / sheetSF", rounding: "round up to whole sheet", materialUnitCost: 18.0, priceMatch: "osb cdx roof sheathing 7/16 4x8" },
    { id: "fasteners", name: "Framing nails / structural screws", unit: "SF", takeoff: "(wallAreaSF + floorAreaSF + roofAreaSF)", rounding: "none", materialUnitCost: 0.12, priceMatch: "framing nails screws fasteners" },
  ],
  labor: {
    laborBasis: "area_per_day",
    areaInputs: ["wallAreaSF", "floorAreaSF", "roofAreaSF"], areaUnit: "SF", areaLabel: "framed area",
    productionRateSFPerDay: 350, hoursPerDay: 8, crewHourlyRate: 40.0, complexityFactor: 1.4,
  },
  complexity: { min: 1.0, max: 1.8, default: 1.4, guide: "1.0 simple box → 1.4 typical → 1.8 cut-up / addition tie-in to existing structure." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- DRYWALL (area_per_day: hang + finish) ---------------------------------
SPECS.drywall = {
  trade: "drywall",
  version: "0.1-template",
  basis: "1/2in & 5/8in board, taped to Level 4 finish",
  defaults: { sheetSF: 32, doorDeductSF: 21, windowDeductSF: 14 },
  inputs: [
    { name: "boardAreaSF", label: "Board area (walls + ceilings)", unit: "SF", type: "number", required: true, description: "Total drywall area = wall area + ceiling area to be covered, SF (gross; the formula deducts openings)." },
    { name: "openingCount", label: "Openings (doors + windows)", unit: "", type: "number", default: 0, description: "Doors + windows, for area deductions (~17 SF each blended)." },
    { name: "outsideCornerLF", label: "Outside corners", unit: "LF", type: "number", default: 0, description: "Linear feet of outside corners (drives corner bead)." },
  ],
  lineItems: [
    { id: "drywall_sheets", name: "Drywall sheets (4x8)", unit: "EA", takeoff: "(((boardAreaSF - (openingCount * 17)) * 1.10) / sheetSF)", rounding: "round up to whole sheet", materialUnitCost: 14.0, note: "17 SF = blended door/window deduct." },
    { id: "joint_compound", name: "Joint compound", unit: "LB", takeoff: "boardAreaSF * 0.053", rounding: "round up to whole bucket", materialUnitCost: 0.45 },
    { id: "joint_tape", name: "Joint tape", unit: "LF", takeoff: "boardAreaSF * 0.5", rounding: "round up to whole roll", materialUnitCost: 0.03 },
    { id: "drywall_screws", name: "Drywall screws", unit: "LB", takeoff: "boardAreaSF / 300", rounding: "round up to whole box", materialUnitCost: 2.50 },
    { id: "corner_bead", name: "Corner bead", unit: "LF", takeoff: "outsideCornerLF * 1.05", rounding: "round up to whole stick", materialUnitCost: 0.85 },
  ],
  labor: {
    laborBasis: "area_per_day",
    areaInputs: ["boardAreaSF"], areaUnit: "SF", areaLabel: "board area",
    productionRateSFPerDay: 250, hoursPerDay: 8, crewHourlyRate: 38.0, complexityFactor: 1.3,
  },
  complexity: { min: 1.0, max: 1.6, default: 1.3, guide: "1.0 open walls → 1.6 lots of cuts/soffits/high ceilings." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- INSULATION (area_per_day; attic uses FOOTPRINT, cathedral uses PITCHED) -
SPECS.insulation = {
  trade: "insulation",
  version: "0.1-template",
  basis: "batts in walls, blown-in attic, optional cathedral batts",
  defaults: { wasteWall: 1.10, wasteCathedral: 1.15 },
  inputs: [
    { name: "wallCavityAreaSF", label: "Wall cavity area", unit: "SF", type: "number", required: true, description: "Net stud-cavity wall area to insulate, SF." },
    { name: "atticFloorSF", label: "Attic floor footprint", unit: "SF", type: "number", default: 0, description: "Floor footprint under the attic for blown-in — use FOOTPRINT, not roof area, SF." },
    { name: "cathedralAreaSF", label: "Cathedral / sloped area", unit: "SF", type: "number", default: 0, description: "Pitched ceiling (rafter cavity) area — uses PITCHED rafter area, SF." },
    { name: "rimJoistLF", label: "Rim joist length", unit: "LF", type: "number", default: 0, description: "Rim/band joist length, LF." },
    { name: "rValueWall", label: "Target wall R-value", unit: "", type: "number", default: 0, description: "Target wall R-value (context; drives $/SF in real pricing)." },
    { name: "rValueAttic", label: "Target attic R-value", unit: "", type: "number", default: 0, description: "Target attic R-value (context; drives bag coverage in real pricing)." },
  ],
  lineItems: [
    { id: "wall_batts", name: "Wall batts (faced)", unit: "SF", takeoff: "wallCavityAreaSF * 1.10", rounding: "round up to whole bag coverage", materialUnitCost: 0.85 },
    { id: "attic_blown", name: "Attic blown-in (uses FLOOR footprint)", unit: "BAG", takeoff: "atticFloorSF / coveragePerBagSF", rounding: "round up to whole bag", materialUnitCost: 38.0, params: { coveragePerBagSF: 40 } },
    { id: "cathedral_batts", name: "Cathedral / sloped ceiling batts (uses PITCHED area)", unit: "SF", takeoff: "cathedralAreaSF * 1.15", rounding: "round up to whole bag coverage", materialUnitCost: 1.10 },
    { id: "rim_joist", name: "Rim joist insulation", unit: "LF", takeoff: "rimJoistLF", rounding: "none", materialUnitCost: 3.50 },
  ],
  labor: {
    laborBasis: "area_per_day",
    areaInputs: ["wallCavityAreaSF", "atticFloorSF", "cathedralAreaSF"], areaUnit: "SF", areaLabel: "insulated area",
    productionRateSFPerDay: 700, hoursPerDay: 8, crewHourlyRate: 36.0, complexityFactor: 1.2,
  },
  complexity: { min: 1.0, max: 1.6, default: 1.2, guide: "1.0 straight runs → 1.6 cut-up / cold-climate detailing." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- TRIM / FINISH CARPENTRY (lf_plus_per_opening — NOT area/day) -----------
SPECS.trim = {
  trade: "trim",
  version: "0.1-template",
  basis: "base, casing, interior doors, optional crown",
  defaults: { casingPerDoorLF: 17, casingPerWindowLF: 15 },
  inputs: [
    { name: "roomPerimeterLF", label: "Room perimeter (base run)", unit: "LF", type: "number", required: true, description: "Total wall base length summed across rooms, LF." },
    { name: "doorCount", label: "Interior doors", unit: "", type: "number", default: 0, description: "Interior doors to hang + case." },
    { name: "windowCount", label: "Windows to case", unit: "", type: "number", default: 0, description: "Windows to case." },
    { name: "crownLF", label: "Crown molding", unit: "LF", type: "number", default: 0, description: "Crown molding length, LF (0 if none)." },
  ],
  lineItems: [
    { id: "baseboard", name: "Baseboard", unit: "LF", takeoff: "((roomPerimeterLF - (doorCount * 3)) * 1.10)", rounding: "round up to whole stick", materialUnitCost: 1.95 },
    { id: "door_casing", name: "Door casing", unit: "LF", takeoff: "(doorCount * casingPerDoorLF) * 1.10", rounding: "round up to whole stick", materialUnitCost: 1.75 },
    { id: "window_casing", name: "Window casing", unit: "LF", takeoff: "(windowCount * casingPerWindowLF) * 1.10", rounding: "round up to whole stick", materialUnitCost: 1.75 },
    { id: "interior_doors", name: "Interior doors (prehung)", unit: "EA", takeoff: "doorCount", rounding: "none", materialUnitCost: 145.0 },
    { id: "door_hardware", name: "Door hardware (knob/hinges)", unit: "SET", takeoff: "doorCount", rounding: "none", materialUnitCost: 28.0 },
    { id: "crown", name: "Crown molding (optional)", unit: "LF", takeoff: "crownLF * 1.12", rounding: "round up to whole stick", materialUnitCost: 2.85 },
  ],
  labor: {
    laborBasis: "lf_plus_per_opening",
    runningLFInputs: ["roomPerimeterLF", "crownLF"],
    crewHourlyRate: 42.0, hoursPerLF_running: 0.05, hoursPerDoor: 1.5, hoursPerWindow: 0.75, complexityFactor: 1.2,
  },
  complexity: { min: 1.0, max: 1.6, default: 1.2, guide: "paint-grade 1.0 → stain-grade / fine finish 1.6." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- SIDING (area_per_day in SQUARES; house-wrap is owned by FRAMING) -------
// OVERLAP NOTE: siding does NOT count house-wrap (framing.housewrap owns it).
// soffit/fascia default 0 — set them only when siding's scope includes them and
// no separate gutters/soffit/fascia trade covers them (avoids double-count).
SPECS.siding = {
  trade: "siding",
  version: "0.1-template",
  basis: "lap/vinyl/fiber-cement field + accessories",
  defaults: { sqSF: 100, wasteField: 1.10 },
  inputs: [
    { name: "wallAreaSF", label: "Gross exterior wall area", unit: "SF", type: "number", required: true, description: "Gross exterior wall area, SF (the formula deducts openings)." },
    { name: "openingCount", label: "Openings (doors + windows)", unit: "", type: "number", default: 0, description: "Doors + windows (deductions + J-channel)." },
    { name: "outsideCornerLF", label: "Outside corners", unit: "LF", type: "number", default: 0, description: "Outside corner length, LF (corner posts)." },
    { name: "soffitAreaSF", label: "Soffit area", unit: "SF", type: "number", default: 0, description: "Soffit area, SF. Set 0 if a separate soffit/fascia/gutter trade covers it (avoid double-count)." },
    { name: "fasciaLF", label: "Fascia length", unit: "LF", type: "number", default: 0, description: "Fascia length, LF. Set 0 if a separate soffit/fascia/gutter trade covers it." },
    { name: "starterLF", label: "Starter (wall base perimeter)", unit: "LF", type: "number", default: 0, description: "Perimeter at base of walls, LF (starter strip)." },
  ],
  lineItems: [
    { id: "siding_field", name: "Siding field", unit: "SQ", takeoff: "(((wallAreaSF - (openingCount * 17)) * 1.10) / sqSF)", rounding: "round up to whole square", materialUnitCost: 185.0 },
    { id: "starter_strip", name: "Starter strip", unit: "LF", takeoff: "starterLF * 1.05", rounding: "round up", materialUnitCost: 0.65 },
    { id: "j_channel", name: "J-channel (openings)", unit: "LF", takeoff: "(openingCount * 17) * 1.10", rounding: "round up to whole stick", materialUnitCost: 0.75 },
    { id: "corner_posts", name: "Outside corner posts", unit: "LF", takeoff: "outsideCornerLF * 1.05", rounding: "round up to whole post", materialUnitCost: 2.25 },
    { id: "soffit", name: "Soffit", unit: "SF", takeoff: "soffitAreaSF * 1.10", rounding: "none", materialUnitCost: 2.40 },
    { id: "fascia", name: "Fascia", unit: "LF", takeoff: "fasciaLF * 1.05", rounding: "round up to whole stick", materialUnitCost: 2.10 },
  ],
  labor: {
    laborBasis: "area_per_day",
    areaInputs: ["wallAreaSF"], areaUnit: "SQ", areaLabel: "wall area",
    productionRateSQPerDay: 4, hoursPerDay: 8, crewHourlyRate: 40.0, complexityFactor: 1.3,
  },
  complexity: { min: 1.0, max: 1.6, default: 1.3, guide: "1.0 simple walls → 1.6 cut-up / multi-story / dormers." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- CONCRETE / FOUNDATION (forming_plus_placement; split labor) ------------
SPECS.concrete = {
  trade: "concrete",
  version: "0.1-template",
  basis: "footings, poured walls, slab-on-grade + base",
  defaults: { cfPerCY: 27, wasteConcrete: 1.10 },
  inputs: [
    { name: "footingLF", label: "Footing length", unit: "LF", type: "number", default: 0, description: "Footing run, LF." },
    { name: "footingWidthIN", label: "Footing width", unit: "in", type: "number", default: 0, description: "Footing width, inches." },
    { name: "footingDepthIN", label: "Footing depth", unit: "in", type: "number", default: 0, description: "Footing depth, inches." },
    { name: "wallLF", label: "Foundation wall length", unit: "LF", type: "number", default: 0, description: "Poured foundation wall length, LF (0 if none)." },
    { name: "wallHeightFT", label: "Wall height", unit: "ft", type: "number", default: 0, description: "Foundation wall height, ft." },
    { name: "wallThicknessIN", label: "Wall thickness", unit: "in", type: "number", default: 0, description: "Foundation wall thickness, inches." },
    { name: "slabAreaSF", label: "Slab area", unit: "SF", type: "number", default: 0, description: "Slab-on-grade area, SF." },
    { name: "slabThicknessIN", label: "Slab thickness", unit: "in", type: "number", default: 0, description: "Slab thickness, inches." },
    { name: "gravelDepthIN", label: "Gravel base depth", unit: "in", type: "number", default: 0, description: "Gravel base depth under slab, inches." },
    { name: "formContactSF", label: "Form contact area", unit: "SF", type: "number", default: 0, description: "Total form face (contact) area, SF — drives forming labor." },
    { name: "anchorBoltSpacingFT", label: "Anchor bolt spacing", unit: "ft", type: "number", default: 6, min: 0.1, description: "Anchor bolt spacing, ft (default 6)." },
  ],
  lineItems: [
    { id: "footing_concrete", name: "Footing concrete", unit: "CY", takeoff: "((footingLF * (footingWidthIN/12) * (footingDepthIN/12)) / 27) * 1.10", rounding: "round up to 0.5 CY", materialUnitCost: 165.0 },
    { id: "wall_concrete", name: "Foundation wall concrete", unit: "CY", takeoff: "((wallLF * wallHeightFT * (wallThicknessIN/12)) / 27) * 1.10", rounding: "round up to 0.5 CY", materialUnitCost: 165.0 },
    { id: "slab_concrete", name: "Slab concrete", unit: "CY", takeoff: "((slabAreaSF * (slabThicknessIN/12)) / 27) * 1.10", rounding: "round up to 0.5 CY", materialUnitCost: 165.0 },
    { id: "gravel_base", name: "Gravel base under slab", unit: "CY", takeoff: "((slabAreaSF * (gravelDepthIN/12)) / 27) * 1.10", rounding: "round up to 0.5 CY", materialUnitCost: 45.0 },
    { id: "rebar", name: "Rebar", unit: "LF", takeoff: "(footingLF * 2) + (slabAreaSF * 0.5)", rounding: "round up to whole stick", materialUnitCost: 0.55 },
    { id: "wire_mesh", name: "Welded wire mesh (slab)", unit: "SF", takeoff: "slabAreaSF * 1.10", rounding: "round up to whole sheet/roll", materialUnitCost: 0.35 },
    { id: "vapor_barrier", name: "Under-slab vapor barrier", unit: "SF", takeoff: "slabAreaSF * 1.15", rounding: "round up to whole roll", materialUnitCost: 0.18 },
    { id: "anchor_bolts", name: "Anchor bolts", unit: "EA", takeoff: "(wallLF / anchorBoltSpacingFT) + 1", rounding: "round up", materialUnitCost: 2.75 },
  ],
  labor: {
    laborBasis: "forming_plus_placement",
    placementCYLineIds: ["footing_concrete", "wall_concrete", "slab_concrete"],
    crewHourlyRate: 40.0, hoursPerFormSF: 0.10, hoursPerCY_place: 1.2, hoursPerSlabSF_finish: 0.015, complexityFactor: 1.3,
  },
  complexity: { min: 1.0, max: 1.8, default: 1.3, guide: "1.0 easy access/broom finish → 1.8 tight access / weather / stamped-exposed." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- ELECTRICAL (per_device_per_fixture; ALLOWANCE-level — sub quote wins) --
SPECS.electrical = {
  trade: "electrical",
  version: "0.1-template",
  basis: "allowance-level residential rough + trim",
  defaults: { romexLFperSF: 1.2 },
  inputs: [
    { name: "deviceCount", label: "Devices (receptacles + switches)", unit: "", type: "number", required: true, description: "Receptacles + switches (boxes)." },
    { name: "fixtureCount", label: "Light fixtures / fans", unit: "", type: "number", default: 0, description: "Light fixtures / fans." },
    { name: "circuitCount", label: "Branch circuits", unit: "", type: "number", default: 0, description: "Branch circuits / breakers." },
    { name: "floorAreaSF", label: "Conditioned floor area", unit: "SF", type: "number", default: 0, description: "Conditioned floor area, SF (rough-wire allowance)." },
    { name: "panelType", label: "Panel type", unit: "", type: "enum", enumValues: ["new_panel", "subpanel", "none"], default: "none", description: "new_panel | subpanel | none." },
  ],
  lineItems: [
    { id: "rough_wire", name: "Branch wiring (Romex) allowance", unit: "LF", takeoff: "floorAreaSF * romexLFperSF", rounding: "round up to whole roll", materialUnitCost: 0.55 },
    { id: "devices", name: "Devices (receptacle/switch + box + plate)", unit: "EA", takeoff: "deviceCount", rounding: "none", materialUnitCost: 6.50 },
    { id: "fixtures", name: "Light fixtures / fans (allowance)", unit: "EA", takeoff: "fixtureCount", rounding: "none", materialUnitCost: 65.0 },
    { id: "breakers", name: "Breakers", unit: "EA", takeoff: "circuitCount", rounding: "none", materialUnitCost: 12.0 },
    { id: "panel", name: "Panel / subpanel", unit: "EA", takeoff: "panelType === 'none' ? 0 : 1", rounding: "none", materialUnitCost: 350.0 },
    { id: "misc", name: "Misc (staples, connectors, wire nuts)", unit: "LS", takeoff: "1", rounding: "none", materialUnitCost: 120.0 },
  ],
  labor: {
    laborBasis: "per_device_per_fixture",
    crewHourlyRate: 65.0, hoursPerDevice: 1.0, hoursPerFixture: 0.75, hoursPerPanel: 8.0, complexityFactor: 1.25,
  },
  complexity: { min: 1.0, max: 2.0, default: 1.25, guide: "1.0 new construction → 2.0 old-work / fishing existing walls." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- PLUMBING (per_fixture; ALLOWANCE-level — sub quote wins) ---------------
SPECS.plumbing = {
  trade: "plumbing",
  version: "0.1-template",
  basis: "allowance-level residential rough + set + trim",
  defaults: { supplyLFperFixture: 25, dwvLFperFixture: 12 },
  inputs: [
    { name: "toiletCount", label: "Toilets", unit: "", type: "number", default: 0, description: "Toilets." },
    { name: "sinkCount", label: "Sinks / lavatories", unit: "", type: "number", default: 0, description: "Sinks / lavatories." },
    { name: "tubShowerCount", label: "Tubs / showers", unit: "", type: "number", default: 0, description: "Tubs / showers." },
    { name: "otherFixtureCount", label: "Other fixtures", unit: "", type: "number", default: 0, description: "Hose bibs, washer box, etc." },
    { name: "waterHeaterCount", label: "Water heaters", unit: "", type: "number", default: 0, description: "Water heaters." },
    { name: "supplyRunLF", label: "Explicit supply run (optional)", unit: "LF", type: "number", default: 0, description: "Explicit PEX supply run, LF; 0 to use the per-fixture allowance." },
  ],
  lineItems: [
    { id: "toilets", name: "Toilets (fixture + rough + trim)", unit: "EA", takeoff: "toiletCount", rounding: "none", materialUnitCost: 240.0 },
    { id: "sinks", name: "Sinks / lavatories", unit: "EA", takeoff: "sinkCount", rounding: "none", materialUnitCost: 210.0 },
    { id: "tubs_showers", name: "Tubs / showers", unit: "EA", takeoff: "tubShowerCount", rounding: "none", materialUnitCost: 520.0 },
    { id: "other_fixtures", name: "Other fixtures (hose bibs, washer box, etc.)", unit: "EA", takeoff: "otherFixtureCount", rounding: "none", materialUnitCost: 95.0 },
    { id: "water_heater", name: "Water heater", unit: "EA", takeoff: "waterHeaterCount", rounding: "none", materialUnitCost: 850.0 },
    { id: "supply_pipe", name: "Supply pipe (PEX) allowance", unit: "LF", takeoff: "supplyRunLF > 0 ? supplyRunLF : ((toiletCount+sinkCount+tubShowerCount+otherFixtureCount) * supplyLFperFixture)", rounding: "round up to whole roll", materialUnitCost: 0.85 },
    { id: "dwv_pipe", name: "DWV pipe allowance", unit: "LF", takeoff: "(toiletCount+sinkCount+tubShowerCount+otherFixtureCount) * dwvLFperFixture", rounding: "round up to whole length", materialUnitCost: 2.40 },
  ],
  labor: {
    laborBasis: "per_fixture",
    crewHourlyRate: 70.0, hoursPerFixture: 6.0, hoursPerWaterHeater: 4.0, complexityFactor: 1.25,
  },
  complexity: { min: 1.0, max: 1.8, default: 1.25, guide: "1.0 open new construction → 1.8 slab/retrofit / long runs." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---- HVAC (per_system_per_register; tonnage is a CRUDE rule, not Manual J) --
SPECS.hvac = {
  trade: "hvac",
  version: "0.1-template",
  basis: "allowance-level residential single-system",
  defaults: { sfPerTon: 500 },
  inputs: [
    { name: "conditionedSF", label: "Conditioned floor area", unit: "SF", type: "number", required: true, description: "Conditioned floor area, SF." },
    { name: "registerCount", label: "Registers / grilles", unit: "", type: "number", default: 0, description: "Supply + return registers / grilles." },
    { name: "systemType", label: "System type", unit: "", type: "enum", enumValues: ["furnace_ac", "heat_pump", "mini_split", "none"], default: "furnace_ac", description: "furnace_ac | heat_pump | mini_split | none." },
    { name: "tonsOverride", label: "Tonnage override (Manual J)", unit: "ton", type: "number", default: 0, description: "If a load calc exists, tons here; else 0 to use the SF/500 rule." },
  ],
  lineItems: [
    { id: "equipment", name: "Equipment (furnace/AC or heat pump) by tonnage", unit: "TON", takeoff: "tonsOverride > 0 ? tonsOverride : (conditionedSF / sfPerTon)", rounding: "round up to 0.5 ton", materialUnitCost: 1400.0 },
    { id: "ductwork", name: "Ductwork (trunk + branches) allowance", unit: "EA", takeoff: "registerCount", rounding: "none", materialUnitCost: 85.0 },
    { id: "registers", name: "Registers / grilles", unit: "EA", takeoff: "registerCount", rounding: "none", materialUnitCost: 22.0 },
    { id: "lineset_misc", name: "Lineset / condensate / misc", unit: "LS", takeoff: "systemType === 'none' ? 0 : 1", rounding: "none", materialUnitCost: 280.0 },
    { id: "thermostat", name: "Thermostat", unit: "EA", takeoff: "systemType === 'none' ? 0 : 1", rounding: "none", materialUnitCost: 120.0 },
  ],
  labor: {
    laborBasis: "per_system_per_register",
    crewHourlyRate: 65.0, hoursPerSystem: 24.0, hoursPerRegister: 1.5, complexityFactor: 1.3,
  },
  complexity: { min: 1.0, max: 1.8, default: 1.3, guide: "1.0 simple swap → 1.8 new ducting in existing house / multi-zone." },
  calibration: { laborMultiplier: 1.0, materialMultiplier: 1.0 },
};

// ---------------------------------------------------------------------------
// SAFE FORMULA EVALUATION
//   - allows arithmetic, comparison, ternary, and string literals
//   - rejects any identifier that is not a key of the scope (no globals)
//   - passes scope values in their natural type (numbers as numbers, enum
//     inputs as strings) so `panelType === 'none'` works
// ---------------------------------------------------------------------------
const STRING_LITERAL_RE = /'[^']*'|"[^"]*"/g;
const IDENT_RE = /[A-Za-z_$][A-Za-z0-9_$]*/g;
const ALLOWED_KEYWORDS = new Set(["true", "false", "null"]);

function evalFormula(formula, scope) {
  const allowed = new Set(Object.keys(scope));
  // Validate identifiers AFTER removing string-literal contents.
  const stripped = String(formula).replace(STRING_LITERAL_RE, "''");
  let m;
  IDENT_RE.lastIndex = 0;
  while ((m = IDENT_RE.exec(stripped)) !== null) {
    if (!allowed.has(m[0]) && !ALLOWED_KEYWORDS.has(m[0])) {
      throw new Error(`formula references unknown identifier "${m[0]}": ${formula}`);
    }
  }
  const names = Object.keys(scope);
  const fn = new Function(...names, `"use strict"; return (${formula});`);
  const out = fn(...names.map((n) => scope[n]));
  if (typeof out !== "number" || !isFinite(out)) {
    throw new Error(`formula did not produce a finite number: ${formula} => ${out}`);
  }
  return out;
}

// Translate the spec's english `rounding` string into actual math.
// EPS absorbs float error so e.g. 1800*1.10 = 1980.0000000000002 ceils to 1980,
// not 1981 — without letting a real fractional quantity round down.
const ROUND_EPS = 1e-9;
function applyRounding(qty, roundingStr, scope) {
  const r = String(roundingStr || "").toLowerCase();
  if (r.includes("none")) return qty;
  if (r.includes("0.5")) return Math.ceil(qty / 0.5 - ROUND_EPS) * 0.5;  // CY / ton to nearest 0.5
  if (r.includes("stock")) {                                            // buy in stock lengths
    const stock = Number(scope.stockPlateLF) || 16;
    return Math.ceil(qty / stock - ROUND_EPS) * stock;
  }
  return Math.ceil(qty - ROUND_EPS);                                    // whole sheet/stick/box/...
}

// ---------------------------------------------------------------------------
// INPUT COERCION (typed, per spec.inputs)
// ---------------------------------------------------------------------------
function coerceInputs(spec, raw) {
  raw = raw || {};
  const inputs = {};
  for (const def of spec.inputs) {
    if (def.type === "enum" || def.type === "string") {
      const v = raw[def.name];
      inputs[def.name] = (v === undefined || v === null || v === "") ? (def.default != null ? def.default : "") : String(v);
    } else {
      // `min` guards denominators (e.g. anchorBoltSpacingFT must be > 0): an
      // extracted value below min falls back to the spec default.
      const minv = def.min != null ? def.min : 0;
      const v = Number(raw[def.name]);
      inputs[def.name] = (isFinite(v) && v >= minv)
        ? v
        : (def.default != null ? def.default : (minv > 0 ? minv : 0));
    }
  }
  // complexityFactor: LLM may propose one; clamp to the spec's range.
  const c = spec.complexity || { min: 1.0, max: 1.8, default: spec.labor.complexityFactor };
  let cf = Number(raw.complexityFactor);
  if (!isFinite(cf)) cf = c.default != null ? c.default : spec.labor.complexityFactor;
  cf = Math.min(c.max, Math.max(c.min, cf));
  inputs.complexityFactor = cf;
  return inputs;
}

// ---------------------------------------------------------------------------
// LABOR-BASIS DISPATCH
//   Each handler returns { laborHours, laborCost, breakdown:[md lines] }.
//   Numbers only depend on inputs + computed line items, so they're reproducible.
// ---------------------------------------------------------------------------
function fmtHr(n) { return num(n, 1); }

const LABOR_HANDLERS = {
  area_per_day: function (L, inputs, lineItems, cal, cf) {
    const areaSF = (L.areaInputs || []).reduce((s, k) => s + (Number(inputs[k]) || 0), 0);
    const perDayUnit = L.areaUnit === "SQ" ? "SQ" : "SF";
    const areaUnits = L.areaUnit === "SQ" ? areaSF / 100 : areaSF;
    const rate = L.areaUnit === "SQ" ? L.productionRateSQPerDay : L.productionRateSFPerDay;
    const days = rate > 0 ? areaUnits / rate : 0;
    const rawHours = days * L.hoursPerDay;
    const adjHours = rawHours * cf;
    const laborCost = adjHours * L.crewHourlyRate * cal.laborMultiplier;
    const areaExpr = (L.areaInputs || []).map((k) => num(inputs[k], 0)).join(" + ");
    const breakdown = [
      `- Total ${L.areaLabel || "area"} = ${areaExpr} = **${num(areaSF, 0)} SF**` + (L.areaUnit === "SQ" ? ` = **${num(areaUnits, 2)} SQ**` : ""),
      `- Crew-days = ${num(areaUnits, 2)} ${perDayUnit} ÷ ${num(rate, 0)} ${perDayUnit}/day = **${num(days, 2)} days**`,
      `- Raw hours = ${num(days, 2)} × ${num(L.hoursPerDay, 0)} hr/day = **${fmtHr(rawHours)} hr**`,
      `- Adjusted hours = ${fmtHr(rawHours)} × ${num(cf, 2)} complexity = **${fmtHr(adjHours)} hr**`,
      laborCostLine(adjHours, L.crewHourlyRate, cal.laborMultiplier, laborCost),
    ];
    return { laborHours: adjHours, laborCost: laborCost, breakdown: breakdown };
  },

  lf_plus_per_opening: function (L, inputs, lineItems, cal, cf) {
    const runningLF = (L.runningLFInputs || []).reduce((s, k) => s + (Number(inputs[k]) || 0), 0);
    const doors = Number(inputs.doorCount) || 0;
    const windows = Number(inputs.windowCount) || 0;
    const hRun = runningLF * L.hoursPerLF_running;
    const hDoor = doors * L.hoursPerDoor;
    const hWin = windows * L.hoursPerWindow;
    const adjHours = (hRun + hDoor + hWin) * cf;
    const laborCost = adjHours * L.crewHourlyRate * cal.laborMultiplier;
    const breakdown = [
      `- Running trim = ${num(runningLF, 0)} LF × ${num(L.hoursPerLF_running, 3)} hr/LF = **${fmtHr(hRun)} hr**`,
      `- Doors = ${num(doors, 0)} × ${num(L.hoursPerDoor, 2)} hr = **${fmtHr(hDoor)} hr**`,
      `- Windows = ${num(windows, 0)} × ${num(L.hoursPerWindow, 2)} hr = **${fmtHr(hWin)} hr**`,
      `- Adjusted hours = (${fmtHr(hRun)} + ${fmtHr(hDoor)} + ${fmtHr(hWin)}) × ${num(cf, 2)} = **${fmtHr(adjHours)} hr**`,
      laborCostLine(adjHours, L.crewHourlyRate, cal.laborMultiplier, laborCost),
    ];
    return { laborHours: adjHours, laborCost: laborCost, breakdown: breakdown };
  },

  forming_plus_placement: function (L, inputs, lineItems, cal, cf) {
    const formSF = Number(inputs.formContactSF) || 0;
    const slabSF = Number(inputs.slabAreaSF) || 0;
    const ids = L.placementCYLineIds || [];
    const totalCY = lineItems.filter((li) => ids.indexOf(li.id) >= 0).reduce((s, li) => s + li.qty, 0);
    const hForm = formSF * L.hoursPerFormSF;
    const hPlace = totalCY * L.hoursPerCY_place;
    const hFinish = slabSF * L.hoursPerSlabSF_finish;
    const adjHours = (hForm + hPlace + hFinish) * cf;
    const laborCost = adjHours * L.crewHourlyRate * cal.laborMultiplier;
    const breakdown = [
      `- Forming = ${num(formSF, 0)} SF × ${num(L.hoursPerFormSF, 3)} hr/SF = **${fmtHr(hForm)} hr**`,
      `- Placement = ${num(totalCY, 2)} CY × ${num(L.hoursPerCY_place, 2)} hr/CY = **${fmtHr(hPlace)} hr**`,
      `- Slab finish = ${num(slabSF, 0)} SF × ${num(L.hoursPerSlabSF_finish, 3)} hr/SF = **${fmtHr(hFinish)} hr**`,
      `- Adjusted hours = (${fmtHr(hForm)} + ${fmtHr(hPlace)} + ${fmtHr(hFinish)}) × ${num(cf, 2)} = **${fmtHr(adjHours)} hr**`,
      laborCostLine(adjHours, L.crewHourlyRate, cal.laborMultiplier, laborCost),
    ];
    return { laborHours: adjHours, laborCost: laborCost, breakdown: breakdown };
  },

  per_device_per_fixture: function (L, inputs, lineItems, cal, cf) {
    const devices = Number(inputs.deviceCount) || 0;
    const fixtures = Number(inputs.fixtureCount) || 0;
    const hasPanel = inputs.panelType && inputs.panelType !== "none" ? 1 : 0;
    const hDev = devices * L.hoursPerDevice;
    const hFix = fixtures * L.hoursPerFixture;
    const hPanel = hasPanel * L.hoursPerPanel;
    const adjHours = (hDev + hFix + hPanel) * cf;
    const laborCost = adjHours * L.crewHourlyRate * cal.laborMultiplier;
    const breakdown = [
      `- Devices = ${num(devices, 0)} × ${num(L.hoursPerDevice, 2)} hr = **${fmtHr(hDev)} hr**`,
      `- Fixtures = ${num(fixtures, 0)} × ${num(L.hoursPerFixture, 2)} hr = **${fmtHr(hFix)} hr**`,
      `- Panel = ${hasPanel ? num(L.hoursPerPanel, 1) + " hr" : "none"}`,
      `- Adjusted hours = (${fmtHr(hDev)} + ${fmtHr(hFix)} + ${fmtHr(hPanel)}) × ${num(cf, 2)} = **${fmtHr(adjHours)} hr**`,
      laborCostLine(adjHours, L.crewHourlyRate, cal.laborMultiplier, laborCost),
    ];
    return { laborHours: adjHours, laborCost: laborCost, breakdown: breakdown };
  },

  per_fixture: function (L, inputs, lineItems, cal, cf) {
    const fixtureTotal = (Number(inputs.toiletCount) || 0) + (Number(inputs.sinkCount) || 0) +
      (Number(inputs.tubShowerCount) || 0) + (Number(inputs.otherFixtureCount) || 0);
    const wh = Number(inputs.waterHeaterCount) || 0;
    const hFix = fixtureTotal * L.hoursPerFixture;
    const hWH = wh * L.hoursPerWaterHeater;
    const adjHours = (hFix + hWH) * cf;
    const laborCost = adjHours * L.crewHourlyRate * cal.laborMultiplier;
    const breakdown = [
      `- Fixtures = ${num(fixtureTotal, 0)} × ${num(L.hoursPerFixture, 1)} hr = **${fmtHr(hFix)} hr**`,
      `- Water heaters = ${num(wh, 0)} × ${num(L.hoursPerWaterHeater, 1)} hr = **${fmtHr(hWH)} hr**`,
      `- Adjusted hours = (${fmtHr(hFix)} + ${fmtHr(hWH)}) × ${num(cf, 2)} = **${fmtHr(adjHours)} hr**`,
      laborCostLine(adjHours, L.crewHourlyRate, cal.laborMultiplier, laborCost),
    ];
    return { laborHours: adjHours, laborCost: laborCost, breakdown: breakdown };
  },

  per_system_per_register: function (L, inputs, lineItems, cal, cf) {
    const active = inputs.systemType && inputs.systemType !== "none" ? 1 : 0;
    const registers = Number(inputs.registerCount) || 0;
    const hSystem = active * L.hoursPerSystem;
    const hReg = active * registers * L.hoursPerRegister;
    const adjHours = (hSystem + hReg) * cf;
    const laborCost = adjHours * L.crewHourlyRate * cal.laborMultiplier;
    const breakdown = [
      active
        ? `- System install = **${fmtHr(hSystem)} hr** + registers ${num(registers, 0)} × ${num(L.hoursPerRegister, 2)} hr = **${fmtHr(hReg)} hr**`
        : `- System type is "none" → 0 install hours`,
      `- Adjusted hours = (${fmtHr(hSystem)} + ${fmtHr(hReg)}) × ${num(cf, 2)} = **${fmtHr(adjHours)} hr**`,
      laborCostLine(adjHours, L.crewHourlyRate, cal.laborMultiplier, laborCost),
    ];
    return { laborHours: adjHours, laborCost: laborCost, breakdown: breakdown };
  },
};

function laborCostLine(adjHours, rate, mult, laborCost) {
  let s = `- **Labor cost = ${fmtHr(adjHours)} hr × ${money(rate)}/hr`;
  if (mult !== 1) s += ` × ${num(mult, 2)}`;
  s += ` = ${money(laborCost)}**`;
  return s;
}

// ---------------------------------------------------------------------------
// PRICE BOOK — per-line lookup waterfall (Stage 2)
//   priceBook = { entries: [ { trade, category, material, unit, unitCost,
//                              source:{method,supplier,date} } ] }
//   Per estimate line, try (scoped to the line's TRADE): a matching builder
//   price-book entry (fuzzy) -> seed materialUnitCost. (A best-effort HD/Lowe's
//   tier will slot between price-book and seed later — entries whose source is
//   HD/Lowe's are tagged tier "retail".) Pure JS, deterministic.
// ---------------------------------------------------------------------------
const PRICE_STOP = new Set(["the", "a", "an", "of", "for", "per", "and", "or", "with", "in", "to", "by", "ea", "each", "x", "in"]);
function priceTokens(s) {
  const raw = String(s == null ? "" : s)
    .toLowerCase()
    .replace(/[''"]/g, "")
    .replace(/(\d)\s*[x×]\s*(\d)/g, "$1x$2") // "2 x 4" -> "2x4"
    .replace(/[^a-z0-9.\/x-]+/g, " ")
    .split(/\s+/)
    .filter((t) => t && t.length > 1 && !PRICE_STOP.has(t));
  // Expand dimension tokens so "2x4x8" also yields "2x4"/"4x8" (matches "2x4").
  const out = [];
  for (const tok of raw) {
    out.push(tok);
    const m = tok.match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)(?:x(\d+(?:\.\d+)?))?$/);
    if (m && m[3]) { out.push(m[1] + "x" + m[2]); out.push(m[2] + "x" + m[3]); }
  }
  return out;
}
// Overlap coefficient: shared tokens ÷ the SMALLER token set. Matches a short
// supplier SKU ("2x4x8 SPF") against a verbose line ("Wall studs (2x studs)…")
// without the verbose side tanking the score (Jaccard's union would).
function priceMatchScore(aSet, bSet) {
  if (!aSet.size || !bSet.size) return { score: 0, inter: 0 };
  const small = aSet.size <= bSet.size ? aSet : bSet;
  const big = small === aSet ? bSet : aSet;
  let inter = 0;
  for (const t of small) if (big.has(t)) inter++;
  return { score: inter / small.size, inter: inter };
}
// Returns { unitCost, tier, matchType, matchScore, material, source } or null.
function lookupLinePrice(trade, line, priceBook) {
  if (!priceBook || !Array.isArray(priceBook.entries)) return null;
  const t = String(trade).toLowerCase();
  const cand = priceBook.entries.filter((e) => e && String(e.trade).toLowerCase() === t && isFinite(Number(e.unitCost)) && Number(e.unitCost) > 0);
  if (!cand.length) return null;
  const isFrac = (x) => /^\d+\/\d+$/.test(x);
  const lineSet = new Set(priceTokens(line.name + " " + (line.priceMatch || "")));
  const lineFracs = [...lineSet].filter(isFrac);
  let best = null, bestScore = 0;
  for (const e of cand) {
    const eTok = priceTokens(e.material);
    const eFracs = eTok.filter(isFrac);
    // thickness/size conflict: both name a fraction (e.g. 7/16 vs 3/4) but share
    // none -> different product, skip (avoids a 7/16 OSB price on 3/4 subfloor).
    if (eFracs.length && lineFracs.length && !eFracs.some((f) => lineSet.has(f))) continue;
    const m = priceMatchScore(new Set(eTok), lineSet);
    // require >=2 shared meaningful tokens to avoid spurious single-token hits
    if (m.inter >= 2 && m.score > bestScore) { bestScore = m.score; best = e; }
  }
  if (!best || bestScore < 0.5) return null; // too weak -> fall through to seed
  const srcStr = best.source ? String(best.source.method || best.source.supplier || "") : "";
  const isRetail = /hd|lowe|home.?depot|retail/i.test(srcStr);
  const exact = priceTokens(line.name).slice().sort().join(" ") === priceTokens(best.material).slice().sort().join(" ");
  return {
    unitCost: Number(best.unitCost),
    tier: isRetail ? "retail" : "pricebook",
    matchType: exact ? "exact" : "fuzzy",
    matchScore: Math.round(bestScore * 100) / 100,
    material: best.material,
    source: best.source || null,
  };
}

// ---------------------------------------------------------------------------
// THE DETERMINISTIC COMPUTE
// ---------------------------------------------------------------------------
function computeTrade(spec, rawInputs, priceBook) {
  const inputs = coerceInputs(spec, rawInputs);
  const cal = spec.calibration;

  const lineItems = spec.lineItems.map((li) => {
    const scope = Object.assign({}, spec.defaults, inputs, li.params || {});
    const rawQty = evalFormula(li.takeoff, scope);
    let qty = applyRounding(rawQty, li.rounding, scope);
    if (qty < 0) qty = 0;
    // PRICE WATERFALL: builder price-book entry (fuzzy, per-trade) -> seed.
    const pb = lookupLinePrice(spec.trade, li, priceBook);
    const unitCost = pb ? pb.unitCost : li.materialUnitCost;
    const lineCost = qty * unitCost;
    return {
      id: li.id, name: li.name, unit: li.unit, rawQty, qty,
      materialUnitCost: unitCost, seedUnitCost: li.materialUnitCost, lineCost,
      priceTier: pb ? pb.tier : "seed",
      priceMatch: pb ? { matchType: pb.matchType, score: pb.matchScore, material: pb.material, source: pb.source } : null,
    };
  });

  const materialSubtotal = lineItems.reduce((s, li) => s + li.lineCost, 0);
  const materialTotal = materialSubtotal * cal.materialMultiplier;

  const handler = LABOR_HANDLERS[spec.labor.laborBasis];
  if (!handler) throw new Error(`unknown laborBasis "${spec.labor.laborBasis}" for trade ${spec.trade}`);
  const laborOut = handler(spec.labor, inputs, lineItems, cal, inputs.complexityFactor);

  const grandTotal = materialTotal + laborOut.laborCost;

  return {
    trade: spec.trade,
    inputs,
    lineItems,
    materialSubtotal, materialMultiplier: cal.materialMultiplier, materialTotal,
    labor: {
      laborBasis: spec.labor.laborBasis,
      complexityFactor: inputs.complexityFactor,
      laborMultiplier: cal.laborMultiplier,
      laborHours: laborOut.laborHours,
      laborCost: laborOut.laborCost,
      breakdown: laborOut.breakdown,
    },
    grandTotal,
  };
}

// ---------------------------------------------------------------------------
// FORMATTING (deterministic — numbers only; byte-identical for identical inputs)
// ---------------------------------------------------------------------------
function money(n) {
  const r = Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  return "$" + r.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function num(n, dp) {
  const f = Math.pow(10, dp);
  const r = Math.round((Number(n) + Number.EPSILON) * f) / f;
  return Number.isInteger(r) ? String(r) : r.toFixed(dp);
}
function titleCase(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

function placeholderDisclosure(spec) {
  return (
    "> ⚠️ **PLACEHOLDER PRICING.** Material unit costs, the crew rate, and the production/labor " +
    "rates for " + titleCase(spec.trade) + " are seed placeholders pending Caza's real ABC Supply " +
    "pricing and crew-history calibration. Treat the total as a rough order of magnitude until tuned."
  );
}

function formatTradeNumericBlock(spec, result) {
  const i = result.inputs;
  const lines = [];
  lines.push(`## ${titleCase(spec.trade)} takeoff — deterministic calculation`);
  lines.push("");
  lines.push("**Takeoff inputs used** (computed by Caza's estimating engine, not estimated by the AI):");
  lines.push("");
  lines.push("| Input | Value |");
  lines.push("|---|---|");
  for (const def of spec.inputs) {
    const v = i[def.name];
    const shown = (def.type === "enum" || def.type === "string") ? String(v) : num(v, def.unit === "in" || def.unit === "" ? 0 : 1);
    lines.push(`| ${def.label || def.name} | ${shown}${def.unit ? " " + def.unit : ""} |`);
  }
  lines.push(`| Complexity factor | ${num(i.complexityFactor, 2)} |`);
  lines.push("");

  lines.push("### Materials (seed/placeholder pricing)");
  lines.push("");
  lines.push("| Item | Unit | Qty | Unit cost | Line cost |");
  lines.push("|---|---|---:|---:|---:|");
  for (const li of result.lineItems) {
    lines.push(`| ${li.name} | ${li.unit} | ${num(li.qty, 2)} | ${money(li.materialUnitCost)} | ${money(li.lineCost)} |`);
  }
  lines.push(`| **Material subtotal** | | | | **${money(result.materialSubtotal)}** |`);
  if (result.materialMultiplier !== 1) {
    lines.push(`| Material multiplier | | | ×${num(result.materialMultiplier, 2)} | |`);
    lines.push(`| **Material total** | | | | **${money(result.materialTotal)}** |`);
  }
  lines.push("");

  lines.push(`### Labor (${result.labor.laborBasis.replace(/_/g, " ")})`);
  lines.push("");
  for (const b of result.labor.breakdown) lines.push(b);
  lines.push("");

  lines.push("### Total");
  lines.push("");
  lines.push("| | |");
  lines.push("|---|---:|");
  lines.push(`| Material | ${money(result.materialTotal)} |`);
  lines.push(`| Labor | ${money(result.labor.laborCost)} |`);
  lines.push(`| **Grand total** | **${money(result.grandTotal)}** |`);
  lines.push("");
  lines.push(placeholderDisclosure(spec));
  return lines.join("\n");
}

// Model-authored basis notes (vary run-to-run) — rendered OUTSIDE the numeric
// block so that block stays byte-identical for identical inputs.
function formatAssumptions(assumptions) {
  if (!Array.isArray(assumptions) || !assumptions.length) return "";
  const lines = ["**Basis & assumptions (engine inputs):**"];
  for (const a of assumptions) lines.push(`- ${a}`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// LLM EXTRACTION CONTRACT (generic, built from spec.inputs)
// ---------------------------------------------------------------------------
function buildExtractionTool(spec) {
  const properties = {};
  const required = [];
  for (const def of spec.inputs) {
    const p = { description: def.description || def.label || def.name };
    if (def.type === "enum") { p.type = "string"; if (def.enumValues) p.enum = def.enumValues; }
    else if (def.type === "string") { p.type = "string"; }
    else { p.type = "number"; }
    properties[def.name] = p;
    if (def.required) required.push(def.name);
  }
  const c = spec.complexity || {};
  properties.complexityFactor = {
    type: "number",
    description: `Labor complexity ${c.min != null ? c.min : 1.0}–${c.max != null ? c.max : 1.8}: ${c.guide || "higher = more cut-up / harder access. Default " + (c.default != null ? c.default : spec.labor.complexityFactor) + "."}`,
  };
  properties.assumptions = {
    type: "array", items: { type: "string" },
    description: "One short note per input you had to estimate/assume rather than read directly.",
  };
  return {
    name: `report_${spec.trade}_takeoff_inputs`,
    description:
      `Report the structured ${spec.trade} takeoff inputs extracted from the user's project description ` +
      `and any photo. Do NOT compute costs, quantities, or labor — Caza's deterministic engine does all ` +
      `arithmetic. Your only job is the dimensional/count inputs below. All areas in SF, lengths in LF. ` +
      `For any value not directly given, estimate it conservatively from what IS given and record it in 'assumptions'.`,
    input_schema: { type: "object", properties: properties, required: required },
  };
}

function buildExtractionSystem(spec) {
  return (
    `You are the takeoff-input extractor for Caza Contractors' ${spec.trade} estimator. Read the user's ` +
    `project description and any attached photo and call report_${spec.trade}_takeoff_inputs with the ` +
    `inputs. Compute geometry as needed. DO NOT compute material quantities, costs, hours, or totals — ` +
    `Caza's deterministic engine does all of that from your inputs. If a value is not stated, estimate it ` +
    `conservatively from what is given and note it in 'assumptions'. Basis: ${spec.basis}.`
  );
}

function buildNarrativeSystem(spec, manualSystemPrompt) {
  return (
    (manualSystemPrompt ? manualSystemPrompt + "\n\n" : "") +
    "===== OUTPUT MODE: DETERMINISTIC " + spec.trade.toUpperCase() + " =====\n" +
    "Caza's engine has ALREADY computed the authoritative takeoff, labor, and totals from the project " +
    "inputs. That numeric block is fixed and will be appended verbatim AFTER your text — you do NOT need " +
    "to and MUST NOT reproduce, restate, or recompute any quantity, cost, hour, or total.\n\n" +
    "Write ONLY the surrounding professional estimate prose:\n" +
    "1. A 2–4 sentence scope summary of the " + spec.trade + " work (what's included, key drivers).\n" +
    "2. Any ⚠️ flags: never invent structural sizes; for licensed trades (electrical/plumbing/HVAC) note " +
    "this is an allowance-level budget and the sub's quote governs; apply Climate-Zone-6 cautions where " +
    "relevant.\n" +
    "3. Brief notes on what would tighten the estimate.\n" +
    "Do NOT write a price, a quantity, or an hours figure — the engine block carries those. Do NOT write " +
    "your own placeholder-pricing disclaimer; the engine block already includes it."
  );
}

function buildNarrativeUserText(numericBlock) {
  return (
    "Here is the engine-computed block that will be shown to the client (final — do not alter or restate " +
    "its numbers). Write the scope summary and ⚠️ flags that should appear ABOVE it.\n\n" +
    "----- ENGINE BLOCK (for your context; do not reproduce) -----\n" + numericBlock +
    "\n----- END ENGINE BLOCK -----"
  );
}

// Map a deterministic compute into the app's `estResult` JSON shape so the app's
// existing parseJSON + itemized UI render it natively. `deterministic:true` tells
// the app to use these numbers as-is and skip its own labor/roof overrides.
function buildEstResult(spec, result, narrative, numericBlock) {
  const round0 = (n) => Math.round(Number(n) || 0);
  const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  const L = result.labor;
  // priceTier transparency (Stage 2f): each line carries where its $ came from.
  const items = result.lineItems.map((li) => ({
    name: li.name, qty: round2(li.qty), unit: li.unit, cost: round0(li.lineCost),
    unitCost: Math.round((Number(li.materialUnitCost) + Number.EPSILON) * 100) / 100,
    priceTier: li.priceTier || "seed",
    matchType: li.priceMatch ? li.priceMatch.matchType : null,
  }));
  const priceSummary = { pricebook: 0, retail: 0, seed: 0 };
  result.lineItems.forEach((li) => { const t = li.priceTier || "seed"; priceSummary[t] = (priceSummary[t] || 0) + 1; });
  const laborHours = round0(L.laborHours);
  const laborRate = round0(spec.labor.crewHourlyRate * (L.laborMultiplier || 1));
  const crew = 2;
  const days = Math.max(1, Math.ceil((laborHours || 1) / (crew * 8)));
  return {
    title: titleCase(spec.trade) + " estimate",
    trade: spec.trade,
    deterministic: true,
    engine: "deterministic-trade",
    laborBasis: L.laborBasis,
    items: items,
    primaryOptions: [],
    laborHours: laborHours,
    laborRate: laborRate,
    laborSource: "engine",
    equipment: 0,
    taxRate: 0.08,
    crew: crew,
    days: days,
    complexityFactor: result.inputs.complexityFactor,
    materialTotal: round0(result.materialTotal),
    laborCost: round0(L.laborCost),
    grandTotal: round0(result.grandTotal),
    notes: (narrative || "").trim(),
    checks: [
      "Quantities + labor computed deterministically by Caza's engine (basis: " + L.laborBasis.replace(/_/g, " ") + ")",
      priceSummary.pricebook > 0
        ? (priceSummary.pricebook + " of " + items.length + " material lines priced from your price book; " + priceSummary.seed + " on seed pricing")
        : "Seed/placeholder pricing — tune unit costs + crew rate to your ABC Supply + job history",
    ],
    priceSummary: priceSummary,
    numericBlock: numericBlock,
  };
}

// ---------------------------------------------------------------------------
// ORCHESTRATION (shared by estimate.js + estimate-background.js)
// ---------------------------------------------------------------------------
async function callAnthropic(apiKey, payload) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = (data && data.error && data.error.message) ? data.error.message : ("Anthropic API error " + res.status);
    throw new Error(msg);
  }
  return data;
}

// NOTE: claude-opus-4-8 deprecates `temperature` (sending it 400s). Determinism
// of the NUMBERS does not depend on it — the numeric block is JS-computed.
async function runDeterministicTrade(spec, opts) {
  const apiKey = opts.apiKey;
  const messages = opts.messages;
  const maxTokens = opts.maxTokens || 4000;
  const manualSystem = opts.manualSystem || null;

  // 1. EXTRACT structured inputs (forced tool use; no arithmetic).
  const tool = buildExtractionTool(spec);
  const exData = await callAnthropic(apiKey, {
    model: "claude-opus-4-8",
    max_tokens: 1500,
    system: buildExtractionSystem(spec),
    tools: [tool],
    tool_choice: { type: "tool", name: tool.name },
    messages: messages,
  });
  let raw = null;
  if (Array.isArray(exData.content)) {
    for (const b of exData.content) {
      if (b && b.type === "tool_use" && b.name === tool.name) { raw = b.input; break; }
    }
  }
  if (!raw || typeof raw !== "object") throw new Error(spec.trade + " extraction returned no tool input");

  // 2. COMPUTE + 3. FORMAT (numbers only; byte-identical for identical inputs).
  const result = computeTrade(spec, raw, opts.priceBook);
  const numericBlock = formatTradeNumericBlock(spec, result);
  const assumptionsBlock = formatAssumptions(raw.assumptions);

  // 4. NARRATIVE — prose/flags around the fixed numbers.
  let narrative = "";
  try {
    const naData = await callAnthropic(apiKey, {
      model: "claude-opus-4-8",
      max_tokens: maxTokens,
      system: buildNarrativeSystem(spec, manualSystem),
      messages: messages.concat([{ role: "user", content: buildNarrativeUserText(numericBlock) }]),
    });
    if (Array.isArray(naData.content)) {
      naData.content.forEach(function (b) { if (b && b.type === "text" && b.text) narrative += b.text; });
    }
  } catch (e) {
    console.error(spec.trade + " narrative call failed; emitting numeric block only:", e && e.message);
  }

  // 5. ASSEMBLE — markdown (for direct/debug) + structured estResult (for the app).
  const proseAndAssumptions = [narrative.trim(), assumptionsBlock].filter(Boolean).join("\n\n");
  const text = [proseAndAssumptions, numericBlock].filter(Boolean).join("\n\n");
  const estResult = buildEstResult(spec, result, proseAndAssumptions, numericBlock);
  return { text: text, estResult: estResult, inputs: result.inputs, result: result, numericBlock: numericBlock };
}

module.exports = {
  SPECS,
  evalFormula, applyRounding, coerceInputs, lookupLinePrice, priceTokens,
  computeTrade, formatTradeNumericBlock, formatAssumptions, buildEstResult,
  buildExtractionTool, buildExtractionSystem, buildNarrativeSystem, buildNarrativeUserText,
  callAnthropic, runDeterministicTrade,
  money, num,
};
