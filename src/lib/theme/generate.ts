import {
  getNicheThemeConfig,
  type NicheThemeConfig,
  type ThemeNicheId,
  THEME_NICHES,
} from "./configs";
import { logThemeAction } from "./ab";

export type ThemePackage = {
  id: string;
  niche: ThemeNicheId;
  label: string;
  variant: "A" | "B";
  config: NicheThemeConfig;
  tweaks: {
    heroEmphasis: string;
    ctaVerb: string;
  };
  generatedAt: string;
  notes: string[];
};

const DEFAULT_VARIANT_TWEAKS: Record<
  "A" | "B",
  { heroEmphasis: string; ctaVerb: string }
> = {
  A: { heroEmphasis: "clarity-first hero", ctaVerb: "Book" },
  B: { heroEmphasis: "benefit-led hero", ctaVerb: "Get started" },
};

const NICHE_VARIANT_TWEAKS: Record<
  ThemeNicheId,
  Record<"A" | "B", { heroEmphasis: string; ctaVerb: string }>
> = {
  hvac: {
    A: { heroEmphasis: "call-first comfort + trust strip", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led same-day reliability", ctaVerb: "Book a visit" },
  },
  plumber: {
    A: { heroEmphasis: "emergency call-first help", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led free estimate", ctaVerb: "Free estimate" },
  },
  salon: {
    A: { heroEmphasis: "book-first starting prices", ctaVerb: "Book now" },
    B: { heroEmphasis: "portfolio-led look & feel", ctaVerb: "Book appointment" },
  },
  trucking: {
    A: { heroEmphasis: "clarity-first lanes + coverage", ctaVerb: "Request a quote" },
    B: { heroEmphasis: "benefit-led on-time freight", ctaVerb: "Get a quote" },
  },
  electrician: {
    A: { heroEmphasis: "call-first licensed emergency", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led planned electrical", ctaVerb: "Get an estimate" },
  },
  roofing: {
    A: { heroEmphasis: "call-first storm damage", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led planned roof work", ctaVerb: "Get a roof estimate" },
  },
  landscaping: {
    A: { heroEmphasis: "quote-first lawn-size/access/beds/irrigation/season assess", ctaVerb: "Get a landscaping quote" },
    B: { heroEmphasis: "quote-first seasonal / recurring honesty", ctaVerb: "Request a landscaping quote" },
  },
  auto_detail: {
    A: { heroEmphasis: "quote-first vehicle-size/condition/location/package assess", ctaVerb: "Get a detail quote" },
    B: { heroEmphasis: "quote-first interior/exterior + ceramic-vs-wash honesty", ctaVerb: "Request a detailing quote" },
  },
  cleaning: {
    A: { heroEmphasis: "book-first residential recurring", ctaVerb: "Book recurring" },
    B: { heroEmphasis: "book-first one-time deep clean", ctaVerb: "Book deep clean" },
  },
  pest_control: {
    A: { heroEmphasis: "call-first panic pests", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led inspection plan", ctaVerb: "Book inspection" },
  },
  moving: {
    A: { heroEmphasis: "clarity-first timeline", ctaVerb: "Get a quote" },
    B: { heroEmphasis: "benefit-led low-stress move", ctaVerb: "Plan my move" },
  },
  painting: {
    A: { heroEmphasis: "hybrid estimate path", ctaVerb: "Request estimate" },
    B: { heroEmphasis: "hybrid schedule path", ctaVerb: "Schedule paint job" },
  },
  garage: {
    A: { heroEmphasis: "call-first stuck door", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led repair estimate", ctaVerb: "Get a repair quote" },
  },
  locksmith: {
    A: { heroEmphasis: "call-first lockout", ctaVerb: "Call now" },
    B: { heroEmphasis: "benefit-led rekey visit", ctaVerb: "Request lockout help" },
  },
  janitorial: {
    A: { heroEmphasis: "quote-first facility scope", ctaVerb: "Request commercial quote" },
    B: { heroEmphasis: "quote-first recurring contract", ctaVerb: "Get a facility quote" },
  },
  towing: {
    A: { heroEmphasis: "extreme call-first roadside", ctaVerb: "Call now" },
    B: { heroEmphasis: "ETA honesty + coverage text", ctaVerb: "Call for dispatch" },
  },
  water_damage: {
    A: { heroEmphasis: "panic call-first + insurance trust", ctaVerb: "Call now" },
    B: { heroEmphasis: "IICRC trust + optional photo path", ctaVerb: "Emergency call" },
  },
  fire_smoke: {
    A: { heroEmphasis: "board-up call-first + FSRT trust", ctaVerb: "Call now" },
    B: { heroEmphasis: "soot+water honesty + insurance docs", ctaVerb: "Emergency call" },
  },
  mold_remediation: {
    A: { heroEmphasis: "calm call-first + IICRC process trust", ctaVerb: "Call now" },
    B: { heroEmphasis: "inspection honesty + insurance docs", ctaVerb: "Request callback" },
  },
  tree_service: {
    A: { heroEmphasis: "storm call-first + powerline honesty", ctaVerb: "Call now" },
    B: { heroEmphasis: "ISA/TRAQ when true + HOA/insurance education", ctaVerb: "Emergency call" },
  },
  slab_leak: {
    A: { heroEmphasis: "detection-first call + prove-before-cut", ctaVerb: "Call to schedule detection" },
    B: { heroEmphasis: "TSBPE/RMP when true + insurance education", ctaVerb: "Call now" },
  },
  junk_removal: {
    A: { heroEmphasis: "quote-first load scope + dump-fee honesty", ctaVerb: "Request a junk quote" },
    B: { heroEmphasis: "quote-first cleanout / debris haul", ctaVerb: "Get a haul quote" },
  },
  pressure_washing: {
    A: { heroEmphasis: "quote-first wash scope + surface-safe honesty", ctaVerb: "Request a wash quote" },
    B: { heroEmphasis: "quote-first driveway / soft wash / patio", ctaVerb: "Get a wash quote" },
  },
  gutter_cleaning: {
    A: { heroEmphasis: "quote-first clogged downspout + soft-wash honesty", ctaVerb: "Request a gutter quote" },
    B: { heroEmphasis: "quote-first roof-edge / downspout flush", ctaVerb: "Get a gutter quote" },
  },
  window_cleaning: {
    A: { heroEmphasis: "quote-first clear glass + glass-safe honesty", ctaVerb: "Request a window quote" },
    B: { heroEmphasis: "quote-first storefront / interior-exterior panes", ctaVerb: "Get a window quote" },
  },
  carpet_cleaning: {
    A: { heroEmphasis: "quote-first room/rug scope + pet-safe honesty", ctaVerb: "Request a carpet quote" },
    B: { heroEmphasis: "quote-first steam / spot / area-rug honesty", ctaVerb: "Get a carpet quote" },
  },
  appliance_repair: {
    A: { heroEmphasis: "call-first broken appliance + diagnose-before-parts", ctaVerb: "Call now" },
    B: { heroEmphasis: "licensed tech when true + honest diagnostic", ctaVerb: "Emergency call" },
  },
  handyman: {
    A: { heroEmphasis: "hybrid estimate / punch-list path", ctaVerb: "Request a handyman quote" },
    B: { heroEmphasis: "hybrid schedule path", ctaVerb: "Schedule handyman visit" },
  },
  flooring: {
    A: { heroEmphasis: "quote-first material/subfloor assess + no bait sqft", ctaVerb: "Request a flooring quote" },
    B: { heroEmphasis: "quote-first LVP / hardwood / tile honesty", ctaVerb: "Get a flooring quote" },
  },
  fencing: {
    A: { heroEmphasis: "quote-first length/height/terrain + HOA assess", ctaVerb: "Get a fence quote" },
    B: { heroEmphasis: "quote-first wood / vinyl / chain-link / ornamental honesty", ctaVerb: "Request a fencing quote" },
  },
  concrete: {
    A: { heroEmphasis: "quote-first sqft/access/thickness/prep + drainage assess", ctaVerb: "Get a concrete quote" },
    B: { heroEmphasis: "quote-first driveway / patio / flatwork honesty", ctaVerb: "Request a concrete quote" },
  },
  siding: {
    A: { heroEmphasis: "quote-first material/grade/sqft/stories + access/substrate assess", ctaVerb: "Get a siding quote" },
    B: { heroEmphasis: "quote-first vinyl / fiber-cement / wood / engineered honesty", ctaVerb: "Request a siding quote" },
  },
  decking: {
    A: { heroEmphasis: "quote-first sqft/height/access/footing + material assess", ctaVerb: "Get a deck quote" },
    B: { heroEmphasis: "quote-first wood / composite / PVC honesty", ctaVerb: "Request a decking quote" },
  },
  masonry: {
    A: { heroEmphasis: "quote-first sqft/access/material/mortar/height assess", ctaVerb: "Get a masonry quote" },
    B: { heroEmphasis: "quote-first brick / stone / block honesty", ctaVerb: "Request a masonry quote" },
  },
  drywall: {
    A: { heroEmphasis: "quote-first sqft/access/rooms/texture/damage/height assess", ctaVerb: "Get a drywall quote" },
    B: { heroEmphasis: "quote-first hang / finish / repair honesty", ctaVerb: "Request a drywall quote" },
  },
  insulation: {
    A: { heroEmphasis: "quote-first sqft/access/attic-vs-wall-vs-crawl/R-value/moisture/height assess", ctaVerb: "Get an insulation quote" },
    B: { heroEmphasis: "quote-first blow-in / batts / spray-foam honesty", ctaVerb: "Request an insulation quote" },
  },

  tile: {
    A: { heroEmphasis: "quote-first sqft/access/substrate/material/grout/height/waterproofing assess", ctaVerb: "Get a tile quote" },
    B: { heroEmphasis: "quote-first porcelain / ceramic / natural-stone honesty", ctaVerb: "Request a tile quote" },
  },
  cabinets: {
    A: { heroEmphasis: "quote-first linear-ft/access/existing-vs-new/material/layout measure", ctaVerb: "Get a cabinet quote" },
    B: { heroEmphasis: "quote-first install / refacing honesty", ctaVerb: "Request a cabinet quote" },
  },
  countertops: {
    A: { heroEmphasis: "quote-first sqft/linear/edge/sink-cutout/access/stories/material assess", ctaVerb: "Get a countertop quote" },
    B: { heroEmphasis: "quote-first quartz / granite / marble / laminate honesty", ctaVerb: "Request a countertop quote" },
  },

  foundation_repair: {
    A: { heroEmphasis: "quote-first soil/drainage/crack/pier-vs-slab/access/stories assess", ctaVerb: "Get a foundation quote" },
    B: { heroEmphasis: "quote-first inspection before firm price honesty", ctaVerb: "Request a foundation inspection quote" },
  },


  solar: {
    A: { heroEmphasis: "quote-first roof size/condition/orientation/shading + utility/net-metering/interconnect/battery/HOA assess", ctaVerb: "Get a solar quote" },
    B: { heroEmphasis: "quote-first roof/utility assess before firm price honesty", ctaVerb: "Request a solar quote" },
  },


  epoxy_flooring: {
    A: { heroEmphasis: "quote-first sqft/prep/moisture/existing-coating/access assess for garage & commercial epoxy", ctaVerb: "Get an epoxy flooring quote" },
    B: { heroEmphasis: "quote-first prep/moisture assess before firm price honesty", ctaVerb: "Request an epoxy flooring quote" },
  },


  chimney: {
    A: { heroEmphasis: "quote-first flue type/height/creosote/liner/cap/access/stories / wood-stove-vs-fireplace assess", ctaVerb: "Get a chimney quote" },
    B: { heroEmphasis: "quote-first inspection before firm price honesty", ctaVerb: "Request a chimney inspection quote" },
  },



  window_replacement: {
    A: { heroEmphasis: "quote-first count/size/stories/access / existing-vs-new / vinyl-vs-wood-vs-fiberglass-vs-aluminum / energy-rating assess", ctaVerb: "Get a window replacement quote" },
    B: { heroEmphasis: "quote-first measure before firm price honesty", ctaVerb: "Request a window measure quote" },
  },

  generator: {
    A: { heroEmphasis: "quote-first whole-home load / fuel NG-LP-diesel / automatic transfer switch / pad-setback / permit-HOA assess", ctaVerb: "Get a generator install quote" },
    B: { heroEmphasis: "quote-first backup power assess before firm price honesty", ctaVerb: "Request a backup power assess quote" },
  },

  ev_charger: {
    A: { heroEmphasis: "quote-first assess panel/amperage/garage-driveway/hardwired-NEMA/permit-HOA", ctaVerb: "Get an EV charger install quote" },
    B: { heroEmphasis: "quote-first site/load evaluation before firm price honesty", ctaVerb: "Request an EV charger site quote" },
  },


  patio_cover: {
    A: { heroEmphasis: "quote-first assess sqft/attached-freestanding/material/footings/drainage/access/stories/HOA-permit", ctaVerb: "Get a patio cover quote" },
    B: { heroEmphasis: "quote-first shade structure site evaluation before firm price honesty", ctaVerb: "Request a patio cover assess quote" },
  },







  irrigation: {
    A: { heroEmphasis: "quote-first assess lot/zone-count/head-types/controller-age/backflow/water-pressure/dig-access/winterize-vs-repair-vs-new/HOA-permit", ctaVerb: "Get an irrigation quote" },
    B: { heroEmphasis: "quote-first sprinkler system evaluation before firm price honesty", ctaVerb: "Request an irrigation assess quote" },
  },


  pergola: {
    A: { heroEmphasis: "quote-first assess footprint/sqft/attached-vs-freestanding/material/post-footing-depth/roof-style/height-stories-access/HOA-permit", ctaVerb: "Get a pergola quote" },
    B: { heroEmphasis: "quote-first outdoor pergola evaluation before firm price honesty", ctaVerb: "Request a pergola assess quote" },
  },


  gazebo: {
    A: { heroEmphasis: "quote-first assess footprint/sqft/roof-style full-hip-octagon/screen-rail kit/foundation-floor/material/height-access/HOA-permit", ctaVerb: "Get a gazebo quote" },
    B: { heroEmphasis: "quote-first outdoor gazebo / pavilion evaluation before firm price honesty", ctaVerb: "Request a gazebo assess quote" },
  },


  carport: {
    A: { heroEmphasis: "quote-first assess bay count/footprint/sqft/attached-vs-freestanding/material/roof pitch-panels/post-footing/pad/vehicle height clearance/wind-snow/access/HOA-permit", ctaVerb: "Get a carport quote" },
    B: { heroEmphasis: "quote-first open-sided carport / vehicle shelter evaluation before firm price honesty", ctaVerb: "Request a carport assess quote" },
  },

  awning: {
    A: { heroEmphasis: "quote-first assess width/projection lf-ft/retractable-vs-fixed/fabric-vs-aluminum-vs-vinyl/mount wall-vs-roof/motorized-vs-manual/sun-wind rating/stories-access/HOA-permit", ctaVerb: "Get an awning quote" },
    B: { heroEmphasis: "quote-first building-attached fabric or aluminum awning evaluation before firm price honesty", ctaVerb: "Request an awning assess quote" },
  },

  dumpster_rental: {
    A: { heroEmphasis: "quote-first assess size 10/20/30/40 yd when true/rental duration/debris type/delivery access/driveway protection/permit-HOA educational only", ctaVerb: "Get a dumpster rental quote" },
    B: { heroEmphasis: "quote-first dumpster / roll-off size and duration evaluation before firm price honesty", ctaVerb: "Request a roll-off size quote" },
  },
  porta_potty_rental: {
    A: { heroEmphasis: "quote-first unit-count/event-days-vs-jobsite/delivery-access/ADA/restock/pump-out assess for porta potty rental", ctaVerb: "Get a porta potty rental quote" },
    B: { heroEmphasis: "quote-first porta potty honesty before firm price — not dumpster, junk removal, septic pumping, or grease trap; permit/HOA educational only", ctaVerb: "Request a porta potty rental quote" },
  },
  storage_container_rental: {
    A: { heroEmphasis: "quote-first size/access/crane-tilt-bed/ground/duration/lock/residential-vs-jobsite assess for storage container rental", ctaVerb: "Get a storage container rental quote" },
    B: { heroEmphasis: "quote-first storage container honesty before firm price — not dumpster, porta potty, junk removal, moving, septic, or grease trap; permit/HOA educational only", ctaVerb: "Request a storage container rental quote" },
  },

  gutter_guards: {
    A: { heroEmphasis: "quote-first assess linear-ft/stories/pitch/existing-gutter/material/debris/downspouts/HOA-permit for gutter guards", ctaVerb: "Get a gutter guards quote" },
    B: { heroEmphasis: "quote-first gutter guards honesty before firm price — not gutter cleaning, roofing, pressure washing, siding, or fascia alone; no brand cloning; permit/HOA educational only", ctaVerb: "Request a gutter guards assess quote" },
  },

  stump_grinding: {
    A: { heroEmphasis: "quote-first stump-count/diameter/root-flare/access/utilities/grind-depth/chips assess for stump grinding", ctaVerb: "Get a stump grinding quote" },
    B: { heroEmphasis: "quote-first stump grinding honesty before firm price — not tree_service storm, landscaping, lawn care, junk removal, concrete, or excavation; permit/HOA educational only", ctaVerb: "Request a stump grinding quote" },
  },
  retaining_wall: {
    A: { heroEmphasis: "quote-first height/lf/soil/drainage/footing/material/surcharge/access assess for retaining wall", ctaVerb: "Get a retaining wall quote" },
    B: { heroEmphasis: "quote-first retaining wall honesty before firm price — not concrete flatwork, masonry, fencing, landscaping, foundation_repair, or stump_grinding; permit/HOA educational only", ctaVerb: "Request a retaining wall quote" },
  },

  french_drain: {
    A: { heroEmphasis: "quote-first length/depth/soil/daylight-vs-sump/yard-access/utilities/pipe-gravel assess for french drain", ctaVerb: "Get a french drain quote" },
    B: { heroEmphasis: "quote-first french drain honesty before firm price — not retaining_wall, foundation_repair, concrete, landscaping, irrigation, gutter work, basement waterproofing, sump_pump, water_damage, slab_leak, or plumber; permit/HOA educational only", ctaVerb: "Request a french drain quote" },
  },

  basement_waterproofing: {
    A: { heroEmphasis: "quote-first sqft/wall-height/interior-vs-exterior/drainage/sump/vapor + crawl-vs-poured-vs-block assess for basement waterproofing", ctaVerb: "Get a basement waterproofing quote" },
    B: { heroEmphasis: "quote-first basement waterproofing honesty before firm price — not french_drain yard-only, retaining_wall, foundation_repair, concrete, water_damage, crawl_space, sump_pump, mold remediation, plumber, or slab_leak; permit/HOA educational only", ctaVerb: "Request a basement waterproofing quote" },
  },


  crawl_space_encapsulation: {
    A: { heroEmphasis: "quote-first sqft/height/access/dirt-vs-concrete/moisture/vapor-barrier/insulation-vents/HVAC-duct/pest-referral/radon-edu/rim-joist/sump-dehumidifier/permit assess for encapsulation", ctaVerb: "Get a crawl space encapsulation quote" },
    B: { heroEmphasis: "quote-first crawl encapsulation honesty before firm price — not basement_waterproofing, french_drain, retaining_wall, foundation_repair, sump_pump, mold_remediation, water_damage, insulation, radon_mitigation, wildlife_removal, plumber, concrete, or landscaping; no bait $/sqft or fake same-day dry crawl", ctaVerb: "Request a crawl space encapsulation quote" },
  },

  sump_pump: {
    A: { heroEmphasis: "quote-first pit/basin size & condition/existing pump age-HP/type pedestal vs submersible/backup battery vs water-powered/check valve/discharge freeze/alarm/crawl-vs-basement/power/flood-history/permit-HOA assess for sump pump", ctaVerb: "Get a sump pump quote" },
    B: { heroEmphasis: "quote-first sump pump honesty before firm price — not basement_waterproofing, crawl_space_encapsulation, french_drain, retaining_wall, foundation_repair, water_damage, mold_remediation, plumber, slab_leak, radon_mitigation, wildlife_removal, insulation, concrete, landscaping, gutter_cleaning, or gutter_guards; no bait $/pump or fake never-flood/same-day dry basement/scare 24/7", ctaVerb: "Request a sump pump quote" },
  },

  radon_mitigation: {
    A: { heroEmphasis: "quote-first home age/foundation type slab-vs-basement-vs-crawl/existing system age-fan-piping-manometer/post-mitigation test levels/entry points/HVAC interaction/sealed cracks/sump covers/test-first short-long-continuous/suction vs membrane/discharge/electrical/permit-HOA assess for radon mitigation", ctaVerb: "Get a radon mitigation quote" },
    B: { heroEmphasis: "quote-first radon mitigation honesty before firm price — not crawl_space_encapsulation, basement_waterproofing, sump_pump, french_drain, foundation_repair, insulation, mold_remediation, wildlife_removal, water_damage, plumber, HVAC general, or pest_control; no bait $/system or fake pass guaranteed/same-day certify/scare 24/7; EPA/action levels educational only", ctaVerb: "Request a radon mitigation quote" },
  },




  wildlife_removal: {
    A: { heroEmphasis: "quote-first species-ID/entry-points/attic-crawl access/exclusion-vs-live-trap-vs-one-way-door/cleanup-sanitation/seasonal-nesting/permit-rehab educational assess for wildlife removal", ctaVerb: "Get a wildlife removal quote" },
    B: { heroEmphasis: "quote-first wildlife removal honesty before firm price — not pest_control spray, tree_service, stump_grinding, junk_removal, mold_remediation, water_damage, handyman, crawl_space_encapsulation, radon_mitigation, basement_waterproofing, or sump_pump; no bait $/animal or fake same-day/scare 24/7; permit/rehab educational only", ctaVerb: "Request a wildlife removal quote" },
  },



  septic_pumping: {
    A: { heroEmphasis: "quote-first tank-size/access/last-pump-date/system-type/distance/after-hours assess for septic pumping", ctaVerb: "Get a septic pumping quote" },
    B: { heroEmphasis: "quote-first septic honesty before firm price — not plumber, slab leak, water damage, junk removal, or grease trap; septic rules educational only", ctaVerb: "Request a septic pumping quote" },
  },



  grease_trap_cleaning: {
    A: { heroEmphasis: "quote-first trap-size/FOG-load/indoor-outdoor/interceptor-type/access/pumping-frequency/after-hours assess for grease traps", ctaVerb: "Get a grease trap cleaning quote" },
    B: { heroEmphasis: "quote-first grease-trap honesty before firm price — not kitchen hood, HVAC duct, janitorial, septic, dumpster, or porta potty; FOG/wastewater educational only", ctaVerb: "Request a grease trap cleaning quote" },
  },



};

export function isThemeNiche(value: string): value is ThemeNicheId {
  return (THEME_NICHES as string[]).includes(value);
}

export async function generateThemePackage(
  niche: ThemeNicheId,
  variant: "A" | "B" = "A"
): Promise<ThemePackage> {
  const config = getNicheThemeConfig(niche);
  if (!config) {
    throw new Error("Unknown niche: " + niche);
  }
  const tweaks = NICHE_VARIANT_TWEAKS[niche][variant] ?? DEFAULT_VARIANT_TWEAKS[variant];
  const pkg: ThemePackage = {
    id: crypto.randomUUID(),
    niche,
    label: config.label,
    variant,
    config,
    tweaks,
    generatedAt: new Date().toISOString(),
    notes: [
      "Mobile-first layout expected on /s/[slug]",
      "WCAG AA contrast targets for primary text",
      "No hardcoded business data in theme package",
    ],
  };
  await logThemeAction(
    "theme_generate",
    0.9,
    `Generated variant ${variant} for ${niche}`,
    { variant }
  );
  return pkg;
}
