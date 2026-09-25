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


  panel_upgrade: {
    A: { heroEmphasis: "quote-first existing panel amperage + main breaker size + bus rating / available slots / service entrance / NEC load calc (EV / battery / solar / generator / HVAC when true) / indoor vs outdoor / Al vs Cu service / permit assess for residential panel upgrade", ctaVerb: "Get a panel upgrade quote" },
    B: { heroEmphasis: "quote-first panel upgrade honesty before firm price — not electrician emergency, battery_storage, ev_charger, solar, generator, or hvac; no bait $/amp or $/slot or fake same-day upgrade; NEC educational only", ctaVerb: "Request a panel upgrade quote" },
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
