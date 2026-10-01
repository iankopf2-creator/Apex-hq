/**
 * Niche theme configs — templated palettes/fonts/copy tone + credited hero imagery.
 * No hardcoded business names, phones, or addresses.
 * Imagery is stock trade/job reference (Unsplash License) — not competitor brand cloning.
 *
 * Mobile-first / WCAG notes:
 * - Prefer contrast-safe primary/onPrimary pairs (aim AA: 4.5:1 body text).
 * - Keep touch targets ≥ 48px via site components; avoid tiny CTA text.
 * - Font stacks include system fallbacks for fast load (<2s target).
 * - Hero/copy tone must not use fake urgency or impersonation.
 */

export type ThemeNicheId = "hvac" | "plumber" | "salon" | "trucking" | "electrician" | "roofing" | "landscaping" | "auto_detail" | "cleaning" | "pest_control" | "moving" | "painting" | "garage" | "locksmith" | "janitorial" | "towing" | "water_damage" | "fire_smoke" | "mold_remediation" | "tree_service" | "slab_leak" | "junk_removal" | "pressure_washing" | "gutter_cleaning" | "window_cleaning" | "carpet_cleaning" | "appliance_repair" | "handyman" | "flooring" | "fencing" | "concrete" | "siding" | "decking" | "masonry" | "drywall" | "insulation" | "tile" | "cabinets" | "countertops" | "foundation_repair" | "solar" | "epoxy_flooring" | "chimney" | "window_replacement" | "generator" | "ev_charger" | "patio_cover" | "irrigation" | "pergola" | "gazebo" | "carport" | "awning" | "dumpster_rental" | "porta_potty_rental" | "storage_container_rental" | "gutter_guards" | "stump_grinding" | "retaining_wall" | "french_drain" | "basement_waterproofing" | "crawl_space_encapsulation" | "sump_pump" | "radon_mitigation" | "wildlife_removal" | "septic_pumping" | "grease_trap_cleaning" | "kitchen_hood_cleaning" | "dryer_vent_cleaning" | "duct_cleaning" | "snow_removal" | "lawn_care" | "roof_cleaning" | "sealcoating" | "asphalt_paving" | "line_striping" | "crack_sealing";

export type ThemePalette = {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
};

export type ThemeFonts = {
  heading: string;
  body: string;
};

export type CopyTone = {
  voice: string;
  heroStyle: string;
  ctaStyle: string;
  avoid: string[];
  /**
   * Sticky CTA mode (Apex Research feed 2026-09-04):
   * call_first = emergency/home-service; book_first = salon/beauty/residential cleaning;
   * hybrid = seasonal/recurring (quote vs schedule vs call);
   * quote_first = commercial janitorial / junk_removal / pressure_washing / gutter_cleaning / window_cleaning / carpet_cleaning / flooring / fencing / concrete / siding / decking / masonry / drywall / insulation / tile / cabinets / countertops / landscaping / auto_detail / foundation_repair / solar / epoxy_flooring / chimney / window_replacement / generator / ev_charger / patio_cover / irrigation / pergola / gazebo / carport / awning / dumpster_rental / porta_potty_rental / storage_container_rental / gutter_guards / stump_grinding / retaining_wall / french_drain / basement_waterproofing / crawl_space_encapsulation / sump_pump / radon_mitigation / wildlife_removal / septic_pumping / grease_trap_cleaning / kitchen_hood_cleaning / dryer_vent_cleaning / duct_cleaning / snow_removal / lawn_care / roof_cleaning / sealcoating / asphalt_paving / line_striping / crack_sealing (quote primary + call beside).
   */
  ctaPriority: "call_first" | "book_first" | "hybrid" | "quote_first";
};

/** Credited stock hero — local path for <2s load; sourceUrl is the public reference. */
export type ThemeHeroImage = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  license: "unsplash";
};

export type NicheThemeConfig = {
  niche: ThemeNicheId;
  label: string;
  palette: ThemePalette;
  fonts: ThemeFonts;
  copyTone: CopyTone;
  /** CSS custom-property map for optional /s/[slug] wiring */
  cssVars: Record<string, string>;
  /** Trade/job reference photos with attribution (not business-specific). */
  heroImages: ThemeHeroImage[];
  /** Optional badge/slot labels near CTA (e.g. IICRC, TX TDLR) — fill with real #s per business later. */
  trustBadges?: string[];
};

const baseAvoid = ["fake urgency", "impersonating a human", "guaranteed results claims"];

export const NICHE_THEME_CONFIGS: Record<ThemeNicheId, NicheThemeConfig> = {
  hvac: {
    niche: "hvac",
    label: "HVAC",
    palette: {
      // Cool sky CTA on deeper ocean hero — calm trust
      primary: "#38bdf8",
      primaryForeground: "#0c4a6e",
      accent: "#0c4a6e",
      accentForeground: "#f0f9ff",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e0f2fe",
      mutedForeground: "#0369a1",
      border: "#bae6fd",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "trustworthy, practical, calm",
      heroStyle: "same-day comfort help — licensed, insured, clear next step",
      ctaStyle: "call now or book a visit",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "scare tactics about broken AC"],
    },
    cssVars: {
      "--theme-primary": "#38bdf8",
      "--theme-primary-fg": "#0c4a6e",
      "--theme-accent": "#0c4a6e",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    heroImages: [
      {
        src: "/niches/hvac.jpg",
        alt: "Technician working with electronics and tools",
        credit: "ThisisEngineering on Unsplash",
        sourceUrl: "https://unsplash.com/photos/32PpagSzeGs",
        license: "unsplash",
      },
    ],
  },
  plumber: {
    niche: "plumber",
    label: "Plumber",
    palette: {
      // Deep water navy hero + bright cyan CTA — distinct from HVAC sky
      primary: "#22d3ee",
      primaryForeground: "#083344",
      accent: "#164e63",
      accentForeground: "#ecfeff",
      background: "#f0fdfa",
      foreground: "#083344",
      muted: "#cffafe",
      mutedForeground: "#155e75",
      border: "#a5f3fc",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "straightforward, clean, respectful",
      heroStyle: "fast help without the mess — call for emergencies, book for planned work",
      ctaStyle: "call now — free estimate",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "flood scare tactics"],
    },
    cssVars: {
      "--theme-primary": "#22d3ee",
      "--theme-primary-fg": "#083344",
      "--theme-accent": "#164e63",
      "--theme-bg": "#f0fdfa",
      "--theme-fg": "#083344",
    },
    heroImages: [
      {
        src: "/niches/plumber.jpg",
        alt: "Plumbing tools and pipes at a job site",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1607472586893-edb57bdc0e39",
        license: "unsplash",
      },
    ],
  },
  salon: {
    niche: "salon",
    label: "Salon",
    palette: {
      // Soft blush CTA on deep rose hero — polished, not neon
      primary: "#fb7185",
      primaryForeground: "#4c0519",
      accent: "#881337",
      accentForeground: "#fff1f2",
      background: "#fff7f8",
      foreground: "#4c0519",
      muted: "#ffe4e6",
      mutedForeground: "#9f1239",
      border: "#fecdd3",
    },
    fonts: {
      heading: "Georgia, 'Times New Roman', ui-serif, serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "warm, polished, welcoming",
      heroStyle: "look your best — Book Now with clear starting prices, no pressure",
      ctaStyle: "book now",
      ctaPriority: "book_first",
      avoid: [...baseAvoid, "body-shaming language", "FOMO booking pressure", "call-for-pricing as the only path"],
    },
    cssVars: {
      "--theme-primary": "#fb7185",
      "--theme-primary-fg": "#4c0519",
      "--theme-accent": "#881337",
      "--theme-bg": "#fff7f8",
      "--theme-fg": "#4c0519",
    },
    heroImages: [
      {
        src: "/niches/salon.jpg",
        alt: "Salon chairs and styling stations",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1560066984-138dadb4c035",
        license: "unsplash",
      },
    ],
  },
  trucking: {
    niche: "trucking",
    label: "Trucking",
    palette: {
      // Fleet navy hero + highway amber CTA (aligns with PR #2 refine)
      primary: "#f59e0b",
      primaryForeground: "#1c1917",
      accent: "#0f172a",
      accentForeground: "#f8fafc",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "direct, dependable, no-nonsense",
      heroStyle: "lanes you can count on — clear coverage, clear next step",
      ctaStyle: "request a freight quote",
      ctaPriority: "book_first",
      avoid: [...baseAvoid, "fake on-time guarantees", "broker scare tactics"],
    },
    cssVars: {
      "--theme-primary": "#f59e0b",
      "--theme-primary-fg": "#1c1917",
      "--theme-accent": "#0f172a",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    heroImages: [
      {
        src: "/niches/trucking.jpg",
        alt: "Semi truck on the highway",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1601584115197-04ecc0da31d7",
        license: "unsplash",
      },
    ],
  },
  electrician: {
    niche: "electrician",
    label: "Electrician",
    palette: {
      primary: "#facc15",
      primaryForeground: "#1c1917",
      accent: "#1e293b",
      accentForeground: "#f8fafc",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "precise, safety-minded, clear",
      heroStyle: "licensed work you can schedule — no guesswork",
      ctaStyle: "book an electrical visit",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "scare tactics about fire risk"],
    },
    cssVars: {
      "--theme-primary": "#facc15",
      "--theme-primary-fg": "#1c1917",
      "--theme-accent": "#1e293b",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    heroImages: [
      {
        src: "/niches/electrician.jpg",
        alt: "Electrical tools and wiring work",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1621905252507-b35492cc74b4",
        license: "unsplash",
      },
    ],
  },
  roofing: {
    niche: "roofing",
    label: "Roofing",
    palette: {
      primary: "#ea580c",
      primaryForeground: "#fff7ed",
      accent: "#292524",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "solid, protective, plain-spoken",
      heroStyle: "storm-ready roofing — call for damage, estimate for planned work",
      ctaStyle: "call now or get a roof estimate",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "storm-chaser scare tactics"],
    },
    cssVars: {
      "--theme-primary": "#ea580c",
      "--theme-primary-fg": "#fff7ed",
      "--theme-accent": "#292524",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    heroImages: [
      {
        src: "/niches/roofing.jpg",
        alt: "Residential home exterior and roof line",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1600585154340-be6161a56a0c",
        license: "unsplash",
      },
    ],
  },
  landscaping: {
    niche: "landscaping",
    label: "Landscaping",
    palette: {
      // Outdoor forest green + warm earth — not fencing cedar/sage, junk lime, decking teak, pressure sky
      primary: "#2f4a35",
      primaryForeground: "#f4f7f2",
      accent: "#a67c52",
      accentForeground: "#1c140c",
      background: "#f6f3ee",
      foreground: "#1a211c",
      muted: "#e8e4db",
      mutedForeground: "#4a5548",
      border: "#d4cfc4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest lawn-size/access/existing-beds/irrigation/season-first, assess before firm price, quote before mow or install; seasonal and recurring honesty",
      heroStyle: "quote-first landscaping LP — lawn care / beds / seasonal cleanup chips when true, no bait flat $/visit or $/acre, no fake same-day",
      ctaStyle: "get a landscaping quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/visit or $/acre fees", "fake same-day guarantees", "competitor brand cloning", "fake 24/7", "overselling overnight makeovers", "firm price before lawn size/access/existing beds/irrigation/season assessment"],
    },
    cssVars: {
      "--theme-primary": "#2f4a35",
      "--theme-primary-fg": "#f4f7f2",
      "--theme-accent": "#a67c52",
      "--theme-bg": "#f6f3ee",
      "--theme-fg": "#1a211c",
    },
    trustBadges: ["Lawn size/access/beds/irrigation/season assessed before firm price", "Quote before mow or install", "Seasonal & recurring honesty", "No bait flat $/visit or $/acre fees"],
    heroImages: [
      {
        src: "/niches/landscaping.jpg",
        alt: "Maintained lawn and landscaping with green grass and garden beds",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1558904541-efa843a96f01",
        license: "unsplash",
      },
    ],
  },
  auto_detail: {
    niche: "auto_detail",
    label: "Auto detailing",
    palette: {
      // Deep automotive graphite + cool chrome — not pressure sky, cleaning teal, landscaping forest
      primary: "#1c2433",
      primaryForeground: "#f4f6f9",
      accent: "#a8b4c4",
      accentForeground: "#12161e",
      background: "#f3f4f6",
      foreground: "#12161e",
      muted: "#e5e7eb",
      mutedForeground: "#4b5563",
      border: "#d1d5db",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest vehicle-size/condition/location/package-first, assess before firm price, quote before wash or ceramic; interior/exterior and ceramic-vs-wash honesty",
      heroStyle: "quote-first auto detail LP — interior / exterior / full package chips when true, no bait flat package fees, no fake same-day, ceramic is not a wash",
      ctaStyle: "get a detail quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat package fees", "fake same-day guarantees", "competitor brand cloning", "fake 24/7", "calling ceramic coating a wash", "firm price before vehicle size/condition/location/package assessment"],
    },
    cssVars: {
      "--theme-primary": "#1c2433",
      "--theme-primary-fg": "#f4f6f9",
      "--theme-accent": "#a8b4c4",
      "--theme-bg": "#f3f4f6",
      "--theme-fg": "#12161e",
    },
    trustBadges: ["Vehicle size/condition/location/package assessed before firm price", "Quote before wash or ceramic", "Interior/exterior honesty", "Ceramic ≠ wash — no bait flat package fees"],
    heroImages: [
      {
        src: "/niches/auto-detail.jpg",
        alt: "Clean car exterior detailing finish with polished paint",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1601362840469-51e4d8d58785",
        license: "unsplash",
      },
    ],
  },
  cleaning: {
    niche: "cleaning",
    label: "Cleaning",
    palette: {
      primary: "#0f766e",
      primaryForeground: "#f0fdfa",
      accent: "#134e4a",
      accentForeground: "#f0fdfa",
      background: "#f0fdfa",
      foreground: "#134e4a",
      muted: "#ccfbf1",
      mutedForeground: "#0f766e",
      border: "#99f6e4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "fresh, careful, easy to trust",
      heroStyle: "recurring-first clean — weekly savings vs one-time deep clean",
      ctaStyle: "book recurring residential clean",
      ctaPriority: "book_first",
      avoid: [...baseAvoid, "guilt-trip mess shaming", "commercial facility assumptions"],
    },
    cssVars: {
      "--theme-primary": "#0f766e",
      "--theme-primary-fg": "#f0fdfa",
      "--theme-accent": "#134e4a",
      "--theme-bg": "#f0fdfa",
      "--theme-fg": "#134e4a",
    },
    heroImages: [
      {
        src: "/niches/cleaning.jpg",
        alt: "Clean bright interior after professional cleaning",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1581578731548-c64695cc6952",
        license: "unsplash",
      },
    ],
  },
  pest_control: {
    niche: "pest_control",
    label: "Pest control",
    palette: {
      primary: "#84cc16",
      primaryForeground: "#1a2e05",
      accent: "#365314",
      accentForeground: "#f7fee7",
      background: "#f7fee7",
      foreground: "#1a2e05",
      muted: "#ecfccb",
      mutedForeground: "#4d7c0f",
      border: "#bef264",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "calm, factual, protective",
      heroStyle: "keep pests out — inspect, treat, prevent",
      ctaStyle: "book a pest inspection",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "gross-out scare photos", "fake infestation panic"],
    },
    cssVars: {
      "--theme-primary": "#84cc16",
      "--theme-primary-fg": "#1a2e05",
      "--theme-accent": "#365314",
      "--theme-bg": "#f7fee7",
      "--theme-fg": "#1a2e05",
    },
    heroImages: [
      {
        src: "/niches/pest-control.jpg",
        alt: "Clean home exterior and property care",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1563453392212-326f5e854473",
        license: "unsplash",
      },
    ],
  },
  moving: {
    niche: "moving",
    label: "Moving",
    palette: {
      primary: "#6366f1",
      primaryForeground: "#eef2ff",
      accent: "#312e81",
      accentForeground: "#eef2ff",
      background: "#eef2ff",
      foreground: "#1e1b4b",
      muted: "#e0e7ff",
      mutedForeground: "#4338ca",
      border: "#c7d2fe",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "organized, careful, low-stress",
      heroStyle: "moves that stay on plan — pack, load, deliver",
      ctaStyle: "get a moving quote",
      ctaPriority: "book_first",
      avoid: [...baseAvoid, "fake same-day guarantees"],
    },
    cssVars: {
      "--theme-primary": "#6366f1",
      "--theme-primary-fg": "#eef2ff",
      "--theme-accent": "#312e81",
      "--theme-bg": "#eef2ff",
      "--theme-fg": "#1e1b4b",
    },
    heroImages: [
      {
        src: "/niches/moving.jpg",
        alt: "Moving boxes and careful packing",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1600518464441-9154a4dea21b",
        license: "unsplash",
      },
    ],
  },
  painting: {
    niche: "painting",
    label: "Painting",
    palette: {
      primary: "#a855f7",
      primaryForeground: "#faf5ff",
      accent: "#4c1d95",
      accentForeground: "#faf5ff",
      background: "#faf5ff",
      foreground: "#2e1065",
      muted: "#f3e8ff",
      mutedForeground: "#6b21a8",
      border: "#e9d5ff",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "clean, careful, finish-focused",
      heroStyle: "fresh walls, clean lines — estimate, prep, paint",
      ctaStyle: "request a painting estimate",
      ctaPriority: "hybrid",
      avoid: [...baseAvoid, "overselling overnight whole-house flips"],
    },
    cssVars: {
      "--theme-primary": "#a855f7",
      "--theme-primary-fg": "#faf5ff",
      "--theme-accent": "#4c1d95",
      "--theme-bg": "#faf5ff",
      "--theme-fg": "#2e1065",
    },
    heroImages: [
      {
        src: "/niches/painting.jpg",
        alt: "Paint supplies and freshly finished walls",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1562259949-e8e7689d7828",
        license: "unsplash",
      },
    ],
  },

  garage: {
    niche: "garage",
    label: "Garage door",
    palette: {
      // High-urgency outdoor contrast — emergency OK for panic trades
      primary: "#f97316",
      primaryForeground: "#431407",
      accent: "#1c1917",
      accentForeground: "#fff7ed",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#ffedd5",
      mutedForeground: "#9a3412",
      border: "#fed7aa",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "urgent, clear, honest about hours",
      heroStyle: "stuck door help — open-now if true, service area in seconds",
      ctaStyle: "call now — hours honesty over fake 24/7",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "fake 24/7", "guaranteed ETA claims"],
    },
    cssVars: {
      "--theme-primary": "#f97316",
      "--theme-primary-fg": "#431407",
      "--theme-accent": "#1c1917",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    heroImages: [
      {
        src: "/niches/garage.jpg",
        alt: "Residential garage door and driveway",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1558618666-fcd25c85cd64",
        license: "unsplash",
      },
    ],
  },
  locksmith: {
    niche: "locksmith",
    label: "Locksmith",
    palette: {
      primary: "#f59e0b",
      primaryForeground: "#451a03",
      accent: "#0c0a09",
      accentForeground: "#fffbeb",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#fef3c7",
      mutedForeground: "#92400e",
      border: "#fde68a",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "calm under pressure, credible, no scam cues",
      heroStyle: "locked out help — sticky call, service area, real license when required",
      ctaStyle: "call now — show TX DPS PSB # when licensed",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "fake 24/7", "bait flat fees", "invented MO locksmith license"],
    },
    cssVars: {
      "--theme-primary": "#f59e0b",
      "--theme-primary-fg": "#451a03",
      "--theme-accent": "#0c0a09",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    heroImages: [
      {
        src: "/niches/locksmith.jpg",
        alt: "Lock and key hardware close-up",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1582139329536-e7284fece509",
        license: "unsplash",
      },
    ],
  },
  janitorial: {
    niche: "janitorial",
    label: "Commercial cleaning",
    palette: {
      // Softer trust chrome — not trades panic orange
      primary: "#0e7490",
      primaryForeground: "#ecfeff",
      accent: "#164e63",
      accentForeground: "#ecfeff",
      background: "#f0f9ff",
      foreground: "#0c4a6e",
      muted: "#e0f2fe",
      mutedForeground: "#0369a1",
      border: "#bae6fd",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "professional, bonded, facility-ready",
      heroStyle: "commercial quote-first — facility type, sqft, frequency",
      ctaStyle: "request a commercial quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "emergency-orange panic chrome", "residential-only booking assumptions"],
    },
    cssVars: {
      "--theme-primary": "#0e7490",
      "--theme-primary-fg": "#ecfeff",
      "--theme-accent": "#164e63",
      "--theme-bg": "#f0f9ff",
      "--theme-fg": "#0c4a6e",
    },
    heroImages: [
      {
        src: "/niches/janitorial.jpg",
        alt: "Commercial cleaning supplies in a facility",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1628177142898-93e36e4e3a50",
        license: "unsplash",
      },
    ],
  },
  towing: {
    niche: "towing",
    label: "Towing / roadside",
    palette: {
      primary: "#ef4444",
      primaryForeground: "#450a0a",
      accent: "#171717",
      accentForeground: "#fafafa",
      background: "#fafafa",
      foreground: "#171717",
      muted: "#fee2e2",
      mutedForeground: "#b91c1c",
      border: "#fecaca",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "direct, roadside-calm, no fluff",
      heroStyle: "stranded help — sticky text tel:, ETA honesty, mile-marker/ZIP coverage in text",
      ctaStyle: "call now — phone is the product",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "fake 24/7", "guaranteed ETA minutes", "phone-only-in-image"],
    },
    cssVars: {
      "--theme-primary": "#ef4444",
      "--theme-primary-fg": "#450a0a",
      "--theme-accent": "#171717",
      "--theme-bg": "#fafafa",
      "--theme-fg": "#171717",
    },
    trustBadges: ["TX TDLR # when licensed", "Insured trucks", "Dispatch quotes ETA on call"],
    heroImages: [
      {
        src: "/niches/towing.jpg",
        alt: "Vehicle on the road — roadside assistance context",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1449965408869-eaa3f722e40d",
        license: "unsplash",
      },
    ],
  },
  water_damage: {
    niche: "water_damage",
    label: "Water damage",
    palette: {
      primary: "#dc2626",
      primaryForeground: "#fef2f2",
      accent: "#0c4a6e",
      accentForeground: "#e0f2fe",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#fee2e2",
      mutedForeground: "#991b1b",
      border: "#fecaca",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "urgent, reassuring, insurance-aware",
      heroStyle: "panic water help — call-first, insurance-trust near CTA, IICRC slot, 24/7 honesty",
      ctaStyle: "call now — optional photo upload later, never required",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "coverage guarantees", "required photo upload", "fake response times"],
    },
    cssVars: {
      "--theme-primary": "#dc2626",
      "--theme-primary-fg": "#fef2f2",
      "--theme-accent": "#0c4a6e",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["IICRC credential slot", "We work with your insurance", "24/7 honesty — say who answers"],
    heroImages: [
      {
        src: "/niches/water-damage.jpg",
        alt: "Restoration and construction work context",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1541888946425-d81bb19240f5",
        license: "unsplash",
      },
    ],
  },


  fire_smoke: {
    niche: "fire_smoke",
    label: "Fire / smoke restoration",
    palette: {
      primary: "#b91c1c",
      primaryForeground: "#fef2f2",
      accent: "#1c1917",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#fee2e2",
      mutedForeground: "#991b1b",
      border: "#fecaca",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "urgent, calm, insurance-aware — board-up first",
      heroStyle: "post-fire call-first — board-up / secure, soot+water honesty, FSRT slot when true",
      ctaStyle: "call now — secondary free inspection never equals the emergency line",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "coverage guarantees", "fake 24/7", "DIY soot wipe advice as substitute for call", "required photo upload"],
    },
    cssVars: {
      "--theme-primary": "#b91c1c",
      "--theme-primary-fg": "#fef2f2",
      "--theme-accent": "#1c1917",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["IICRC FSRT slot when current", "Board-up / secure Day-1", "Insurance docs help — not claim approval"],
    heroImages: [
      {
        src: "/niches/fire-smoke.jpg",
        alt: "Construction and restoration work context after structural damage",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1503387762-592deb58ef4e",
        license: "unsplash",
      },
    ],
  },


  mold_remediation: {
    niche: "mold_remediation",
    label: "Mold remediation",
    palette: {
      primary: "#0f766e",
      primaryForeground: "#f0fdfa",
      accent: "#334155",
      accentForeground: "#f8fafc",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#ccfbf1",
      mutedForeground: "#115e59",
      border: "#99f6e4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "calm, educational, insurance-aware — process over panic",
      heroStyle: "call-first trust LP — IICRC when true, moisture+process honesty, no scare heroes",
      ctaStyle: "call now — secondary free inspection never equals the emergency line",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "scare tactics", "health/medical guarantees", "coverage guarantees", "fake spore stats", "same-visit inspect and remediate", "fake 24/7", "required photo upload"],
    },
    cssVars: {
      "--theme-primary": "#0f766e",
      "--theme-primary-fg": "#f0fdfa",
      "--theme-accent": "#334155",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["IICRC credential slot when current", "Insurance docs help — not claim approval", "TX: assessor vs remediator separation when licensed"],
    heroImages: [
      {
        src: "/niches/mold-remediation.jpg",
        alt: "Calm interior construction / moisture restoration work context",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1541888946425-d81bb19240f5",
        license: "unsplash",
      },
    ],
  },


  tree_service: {
    niche: "tree_service",
    label: "Tree service",
    palette: {
      primary: "#44403c",
      primaryForeground: "#fafaf9",
      accent: "#c2410c",
      accentForeground: "#fff7ed",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#ffedd5",
      mutedForeground: "#9a3412",
      border: "#fed7aa",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "storm-honest, safety-first, outdoor-calm — no fake ETAs",
      heroStyle: "call-first storm LP — sticky tel:, powerline honesty, ISA/TRAQ only when true",
      ctaStyle: "call now — secondary quote never equals the emergency line",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "fake ETA minutes", "powerline DIY claims", "ISA/TRAQ when not credentialed", "coverage guarantees", "HOA approval guarantees", "fake 24/7"],
    },
    cssVars: {
      "--theme-primary": "#44403c",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#c2410c",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["ISA / TRAQ slot when current", "Powerline — call utility first when lines involved", "Insurance / HOA docs educational only"],
    heroImages: [
      {
        src: "/niches/tree-service.jpg",
        alt: "Forest canopy / tree care outdoor work context",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1448375240586-882707db888b",
        license: "unsplash",
      },
    ],
  },



  slab_leak: {
    niche: "slab_leak",
    label: "Slab leak detection",
    palette: {
      // Cool slate + detection cyan — distinct from plumber navy / water_damage / mold teal
      primary: "#475569",
      primaryForeground: "#f8fafc",
      accent: "#06b6d4",
      accentForeground: "#083344",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#cffafe",
      mutedForeground: "#0e7490",
      border: "#a5f3fc",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "detection-first, calm proof-before-cut — no sight-unseen jackhammer",
      heroStyle: "call-first detection LP — sticky tel:, prove leak before cut; method cards educational after",
      ctaStyle: "call to schedule detection — secondary form never equals the sticky tel:",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "sight-unseen cut CTAs", "invented flat detection prices as Apex benchmarks", "coverage / claim approval guarantees", "fake 24/7", "TX clay-soil/copper copy as universal", "method cards as competing primary CTAs"],
    },
    cssVars: {
      "--theme-primary": "#475569",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#06b6d4",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["TSBPE + RMP # slot when true (TX)", "Verify-license link idea", "Insurance educational only — not claim approval", "Locate / prove before you cut"],
    heroImages: [
      {
        src: "/niches/slab-leak.jpg",
        alt: "Construction / floor work context for slab leak detection",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1504307651254-35680f356dfd",
        license: "unsplash",
      },
    ],
  },




  junk_removal: {
    niche: "junk_removal",
    label: "Junk removal",
    palette: {
      // Charcoal/slate canvas + lime CTA — not towing red/black, not landscaping olive
      primary: "#a3e635",
      primaryForeground: "#14532d",
      accent: "#1e293b",
      accentForeground: "#f8fafc",
      background: "#f1f5f9",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "straightforward, load-honest, dump-fee transparent",
      heroStyle: "quote-first haul LP — item/volume scope, dump fees up front, no fake same-day",
      ctaStyle: "request a junk quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "fake same-day guarantees", "bait flat fees", "competitor brand cloning", "fake 24/7"],
    },
    cssVars: {
      "--theme-primary": "#a3e635",
      "--theme-primary-fg": "#14532d",
      "--theme-accent": "#1e293b",
      "--theme-bg": "#f1f5f9",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Insured trucks", "Dump fees quoted up front", "No fake same-day promises"],
    heroImages: [
      {
        src: "/niches/junk-removal.jpg",
        alt: "Crane truck loading debris into a haul bin",
        credit: "Photo by Alethia Briones on Unsplash",
        sourceUrl: "https://unsplash.com/photos/mKn6ZSztAT4",
        license: "unsplash",
      },
    ],
  },


  pressure_washing: {
    niche: "pressure_washing",
    label: "Pressure washing",
    palette: {
      // Wet-concrete slate + sky-spray CTA — not landscaping olive, cleaning teal, junk lime, or auto blue
      primary: "#0284c7",
      primaryForeground: "#f0f9ff",
      accent: "#334155",
      accentForeground: "#f8fafc",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e0f2fe",
      mutedForeground: "#0369a1",
      border: "#bae6fd",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "clean, surface-safe, quote-honest",
      heroStyle: "quote-first wash LP — driveway/house/patio scope, surface-safe methods, no bait flat fees",
      ctaStyle: "request a wash quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "fake same-day guarantees", "bait flat fees", "competitor brand cloning", "fake 24/7"],
    },
    cssVars: {
      "--theme-primary": "#0284c7",
      "--theme-primary-fg": "#f0f9ff",
      "--theme-accent": "#334155",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Insured crew", "Surface-safe methods", "Quote before wash"],
    heroImages: [
      {
        src: "/niches/pressure-washing.jpg",
        alt: "Person pressure washing a patio with a spray wand",
        credit: "Photo by Kyle E on Unsplash",
        sourceUrl: "https://unsplash.com/photos/gSVlcoE_ES0",
        license: "unsplash",
      },
    ],
  },


  gutter_cleaning: {
    niche: "gutter_cleaning",
    label: "Gutter cleaning",
    palette: {
      // Zinc roof-edge + deep copper leaf — not pressure sky, junk lime, landscaping olive, cleaning teal
      primary: "#78350f",
      primaryForeground: "#fef3c7",
      accent: "#57534e",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#fef3c7",
      mutedForeground: "#92400e",
      border: "#fde68a",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "roof-edge honest, soft-wash vs power clear, height/insurance when true",
      heroStyle: "quote-first gutter LP — clogged downspouts, soft-wash vs power honesty, no fake same-day",
      ctaStyle: "request a gutter quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "fake same-day guarantees", "bait flat fees", "competitor brand cloning", "fake 24/7"],
    },
    cssVars: {
      "--theme-primary": "#78350f",
      "--theme-primary-fg": "#fef3c7",
      "--theme-accent": "#57534e",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Insured height work when true", "Soft-wash vs power honesty", "Quote before climb"],
    heroImages: [
      {
        src: "/niches/gutter-cleaning.jpg",
        alt: "Dirty residential rain gutter and roof edge against a clear sky",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/kBc9SXXjezA",
        license: "unsplash",
      },
    ],
  },











  window_cleaning: {
    niche: "window_cleaning",
    label: "Window cleaning",
    palette: {
      // Clear-glass cool blue-gray + daylight ice — not gutter copper, pressure sky, junk lime
      primary: "#334155",
      primaryForeground: "#f8fafc",
      accent: "#0891b2",
      accentForeground: "#ecfeff",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e0f2fe",
      mutedForeground: "#0e7490",
      border: "#bae6fd",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "daylight-honest, glass-safe methods, quote before climb",
      heroStyle: "quote-first window LP — clear glass, soft vs aggressive honesty, no fake same-day",
      ctaStyle: "request a window quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "fake same-day guarantees", "bait flat fees", "competitor brand cloning", "fake 24/7", "fake insurance claims"],
    },
    cssVars: {
      "--theme-primary": "#334155",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#0891b2",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Insured height work when true", "Glass-safe methods", "Quote before climb"],
    heroImages: [
      {
        src: "/niches/window-cleaning.jpg",
        alt: "Worker cleaning exterior windows on a modern building in daylight",
        credit: "Photo by Jimmy Phillips on Unsplash",
        sourceUrl: "https://unsplash.com/photos/_yEbjgmV3ww",
        license: "unsplash",
      },
    ],
  },




  carpet_cleaning: {
    niche: "carpet_cleaning",
    label: "Carpet cleaning",
    palette: {
      // Warm soft-gray + seafoam/teal — not window ice-cyan, gutter copper, pressure sky, junk lime
      primary: "#57534e",
      primaryForeground: "#fafaf9",
      accent: "#0f766e",
      accentForeground: "#f0fdfa",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#ccfbf1",
      mutedForeground: "#115e59",
      border: "#99f6e4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "warm-honest, pet/kid-safe methods when true, quote before steam",
      heroStyle: "quote-first carpet LP — room/rug scope, no fake same-day, no bait flat fees",
      ctaStyle: "request a carpet quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "fake same-day guarantees", "bait flat fees", "competitor brand cloning", "fake 24/7", "fake insurance claims"],
    },
    cssVars: {
      "--theme-primary": "#57534e",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#0f766e",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Pet/kid-safe methods when true", "Quote before steam", "Room & rug honesty"],
    heroImages: [
      {
        src: "/niches/carpet-cleaning.jpg",
        alt: "Person vacuuming a carpet in a bright home interior",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/cpIgNaazQ6w",
        license: "unsplash",
      },
    ],
  },




  appliance_repair: {
    niche: "appliance_repair",
    label: "Appliance repair",
    palette: {
      // Slate + orange CTA — distinct from HVAC sky, electrician yellow, locksmith steel
      primary: "#1e293b",
      primaryForeground: "#f8fafc",
      accent: "#ea580c",
      accentForeground: "#fff7ed",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#ffedd5",
      mutedForeground: "#9a3412",
      border: "#fed7aa",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "calm licensed-honest, diagnose-before-parts, no fake OEM claims",
      heroStyle: "call-first appliance LP — broken fridge/washer urgency, honest diagnostic",
      ctaStyle: "call for appliance repair (sticky tel primary)",
      ctaPriority: "call_first",
      avoid: [...baseAvoid, "fake OEM certification", "bait flat diagnostic fees", "competitor brand cloning", "fake 24/7", "fake same-day guarantees"],
    },
    cssVars: {
      "--theme-primary": "#1e293b",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#ea580c",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Licensed tech when true", "Diagnose before parts", "Honest diagnostic fee"],
    heroImages: [
      {
        src: "/niches/appliance-repair.jpg",
        alt: "Washer and dryer in a bright laundry room ready for service",
        credit: "Photo via Unsplash",
        sourceUrl: "https://unsplash.com/photos/FXpJW_wdMdk",
        license: "unsplash",
      },
    ],
  },

  handyman: {
    niche: "handyman",
    label: "Handyman",
    palette: {
      // Warm workbench — taupe/slate neutrals + amber/gold CTA (not painting lilac, appliance orange, garage steel)
      primary: "#ca8a04",
      primaryForeground: "#422006",
      accent: "#57534e",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#e7e5e4",
      mutedForeground: "#78716c",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "practical, reliable, no-overpromise — estimate then schedule",
      heroStyle: "hybrid quote/schedule — odd jobs and punch lists without fake same-day",
      ctaStyle: "request a handyman quote or schedule (call secondary)",
      ctaPriority: "hybrid",
      avoid: [...baseAvoid, "fake same-day guarantees", "licensed/insured claims unless true", "competitor brand cloning", "LSA numbers on public pages"],
    },
    cssVars: {
      "--theme-primary": "#ca8a04",
      "--theme-primary-fg": "#422006",
      "--theme-accent": "#57534e",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Licensed & insured when true", "Written scope before work", "No fake same-day"],
    heroImages: [
      {
        src: "/niches/handyman.jpg",
        alt: "Assorted handyman tools laid out on a wooden workbench",
        credit: "Bermix Studio on Unsplash",
        sourceUrl: "https://unsplash.com/photos/iwz5tmhjl7o",
        license: "unsplash",
      },
    ],
  },

  flooring: {
    niche: "flooring",
    label: "Flooring",
    palette: {
      // Warm oak / charcoal slate + copper/bronze CTA — not carpet seafoam, handyman gold, gutter copper-roof
      primary: "#292524",
      primaryForeground: "#fafaf9",
      accent: "#b45309",
      accentForeground: "#fffbeb",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#fef3c7",
      mutedForeground: "#92400e",
      border: "#fde68a",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest materials-first, assess subfloor before firm price, quote before install",
      heroStyle: "quote-first flooring LP — LVP/hardwood/tile scope, no bait flat sqft, no fake same-day",
      ctaStyle: "request a flooring quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat sqft fees", "fake same-day guarantees", "competitor brand cloning", "fake 24/7", "firm price before material/subfloor assessment"],
    },
    cssVars: {
      "--theme-primary": "#292524",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#b45309",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Subfloor assessed before firm price", "Quote before install", "No bait flat sqft fees"],
    heroImages: [
      {
        src: "/niches/flooring.jpg",
        alt: "Close-up of warm hardwood flooring boards",
        credit: "Maria Kovalets on Unsplash",
        sourceUrl: "https://unsplash.com/photos/l3qaat24Cv4",
        license: "unsplash",
      },
    ],
  },

  fencing: {
    niche: "fencing",
    label: "Fencing",
    palette: {
      // Cedar/fence-stain warm brown + charcoal slate + forest sage CTA — not flooring copper, handyman gold, junk lime
      primary: "#3f2e1f",
      primaryForeground: "#faf8f5",
      accent: "#3f6b4f",
      accentForeground: "#f0fdf4",
      background: "#faf8f5",
      foreground: "#1c1917",
      muted: "#ecf3ee",
      mutedForeground: "#3d5a45",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest length/height/terrain-first, assess posts and HOA before firm price, quote before build",
      heroStyle: "quote-first fencing LP — wood/vinyl/chain-link/ornamental chips when true, no bait flat $/ft, no fake same-day",
      ctaStyle: "get a fence quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/ft fees", "fake same-day guarantees", "competitor brand cloning", "fake 24/7", "firm price before length/height/terrain/HOA assessment"],
    },
    cssVars: {
      "--theme-primary": "#3f2e1f",
      "--theme-primary-fg": "#faf8f5",
      "--theme-accent": "#3f6b4f",
      "--theme-bg": "#faf8f5",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Length/height/terrain assessed before firm price", "Quote before build", "No bait flat $/ft fees"],
    heroImages: [
      {
        src: "/niches/fencing.jpg",
        alt: "Close-up of warm cedar wooden fence panels",
        credit: "Lisa McIntyre on Unsplash",
        sourceUrl: "https://unsplash.com/photos/fg4YC5tGaGo",
        license: "unsplash",
      },
    ],
  },

  concrete: {
    niche: "concrete",
    label: "Concrete",
    palette: {
      // Wet-concrete cool gray/slate + warm amber CTA — not pressure_washing sky-spray, fencing sage, flooring oak-copper
      primary: "#475569",
      primaryForeground: "#f8fafc",
      accent: "#d97706",
      accentForeground: "#fffbeb",
      background: "#f1f5f9",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/access/prep-first, assess thickness and drainage before firm price, quote before pour",
      heroStyle: "quote-first concrete LP — driveway/patio/flatwork chips when true, no bait flat $/sqft, no fake same-day pour",
      ctaStyle: "get a concrete quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft fees", "fake same-day pour guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/access/thickness/prep/drainage assessment"],
    },
    cssVars: {
      "--theme-primary": "#475569",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#d97706",
      "--theme-bg": "#f1f5f9",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Sqft/access/prep assessed before firm price", "Quote before pour", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/concrete.jpg",
        alt: "Construction worker smoothing a wet concrete slab with hand tools",
        credit: "TROY ALLEN on Unsplash",
        sourceUrl: "https://unsplash.com/photos/GNClKls4ok8",
        license: "unsplash",
      },
    ],
  },

  siding: {
    niche: "siding",
    label: "Siding",
    palette: {
      // Cool clapboard slate/gray + soft coastal blue-gray CTA — not fencing sage, concrete amber, painting, roofing
      primary: "#556370",
      primaryForeground: "#f8fafc",
      accent: "#6b8fa3",
      accentForeground: "#f0f7fa",
      background: "#f3f5f7",
      foreground: "#1e293b",
      muted: "#e6ecf0",
      mutedForeground: "#556370",
      border: "#c5d0d8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest material/grade/sqft-first, assess stories access and substrate before firm price, quote before install",
      heroStyle: "quote-first siding LP — vinyl/fiber-cement/wood/engineered chips when true, no bait flat $/sqft, no fake same-day install",
      ctaStyle: "get a siding quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft fees", "fake same-day install guarantees", "competitor brand cloning", "fake 24/7", "firm price before material/grade/sqft/stories/access/substrate assessment"],
    },
    cssVars: {
      "--theme-primary": "#556370",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#6b8fa3",
      "--theme-bg": "#f3f5f7",
      "--theme-fg": "#1e293b",
    },
    trustBadges: ["Material/grade/sqft assessed before firm price", "Quote before install", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/siding.jpg",
        alt: "White and brown wooden clapboard house exterior near green trees under blue sky",
        credit: "Wayne Darden on Unsplash",
        sourceUrl: "https://unsplash.com/photos/6KG7tDW2mNc",
        license: "unsplash",
      },
    ],
  },

  decking: {
    niche: "decking",
    label: "Decking",
    palette: {
      // Warm deck-board teak + charcoal slate + soft sage accent — not fencing forest-sage, siding coastal, concrete amber, flooring oak-copper
      primary: "#2d3439",
      primaryForeground: "#f8fafc",
      accent: "#7a9e8a",
      accentForeground: "#f0fdf4",
      background: "#f5f2ed",
      foreground: "#1c1917",
      muted: "#ebe4d9",
      mutedForeground: "#5c5348",
      border: "#d4cbbf",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/height/access/footing-first, assess material (wood/composite/PVC) before firm price, quote before build",
      heroStyle: "quote-first decking LP — wood/composite/PVC chips when true, no bait flat $/sqft or $/lf, no fake same-day build",
      ctaStyle: "get a deck quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/lf fees", "fake same-day build guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/height/access/footing/material assessment"],
    },
    cssVars: {
      "--theme-primary": "#2d3439",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#7a9e8a",
      "--theme-bg": "#f5f2ed",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Sqft/height/access/footing assessed before firm price", "Quote before build", "HOA/permit honesty when required", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/decking.jpg",
        alt: "Wooden deck with chairs and plants overlooking a backyard",
        credit: "Masood Aslami on Unsplash",
        sourceUrl: "https://unsplash.com/photos/UNhrUkdivWs",
        license: "unsplash",
      },
    ],
  },

  masonry: {
    niche: "masonry",
    label: "Masonry",
    palette: {
      // Kiln brick + limestone/sand — not decking teak-sage, concrete amber-slate, fencing forest-sage, siding coastal, flooring oak-copper
      primary: "#5a3428",
      primaryForeground: "#faf7f2",
      accent: "#c9b896",
      accentForeground: "#2c2416",
      background: "#f6f1e8",
      foreground: "#1f1914",
      muted: "#ebe3d6",
      mutedForeground: "#6b5d4d",
      border: "#d9cebc",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/access/material/mortar/height-first, assess brick/stone/block before firm price, quote before build or repair",
      heroStyle: "quote-first masonry LP — brick/stone/block chips when true, no bait flat $/sqft, no fake same-day build",
      ctaStyle: "get a masonry quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft fees", "fake same-day build guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/access/material/mortar/height assessment"],
    },
    cssVars: {
      "--theme-primary": "#5a3428",
      "--theme-primary-fg": "#faf7f2",
      "--theme-accent": "#c9b896",
      "--theme-bg": "#f6f1e8",
      "--theme-fg": "#1f1914",
    },
    trustBadges: ["Sqft/access/material/mortar/height assessed before firm price", "Quote before build or repair", "HOA/permit honesty when required", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/masonry.jpg",
        alt: "Mason applying mortar to a brick wall during construction",
        credit: "Solømen on Unsplash",
        sourceUrl: "https://unsplash.com/photos/i6V6diaf71A",
        license: "unsplash",
      },
    ],
  },






  drywall: {
    niche: "drywall",
    label: "Drywall",
    palette: {
      // Cool gypsum / joint-compound white-gray + soft paper-tape beige — not masonry kiln-brick/limestone, concrete amber-slate, flooring oak-copper, decking teak-sage
      primary: "#5e6a73",
      primaryForeground: "#f8fafb",
      accent: "#d8c9b0",
      accentForeground: "#2a2418",
      background: "#f7f6f4",
      foreground: "#1c2126",
      muted: "#ebe9e5",
      mutedForeground: "#5c6570",
      border: "#d5d1cb",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/access/rooms/texture/damage/height-first, assess smooth/orange-peel/knockdown and water/nail pops/seam before firm price, quote before hang/finish/repair",
      heroStyle: "quote-first drywall LP — hang/finish/repair chips when true, no bait flat $/sqft, no fake same-day",
      ctaStyle: "get a drywall quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft fees", "fake same-day hang or finish guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/access/rooms/texture/damage/height assessment"],
    },
    cssVars: {
      "--theme-primary": "#5e6a73",
      "--theme-primary-fg": "#f8fafb",
      "--theme-accent": "#d8c9b0",
      "--theme-bg": "#f7f6f4",
      "--theme-fg": "#1c2126",
    },
    trustBadges: ["Sqft/access/rooms/texture/damage/height assessed before firm price", "Quote before hang, finish, or repair", "HOA/permit honesty when required", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/drywall.jpg",
        alt: "Room under construction with metal studs and drywall sheets",
        credit: "Olek Buzunov on Unsplash",
        sourceUrl: "https://unsplash.com/photos/GIubG5JhDV4",
        license: "unsplash",
      },
    ],
  },

  insulation: {
    niche: "insulation",
    label: "Insulation",
    palette: {
      // Warm cellulose/attic taupe-slate + soft insulation-pink — not drywall gypsum/tape-beige, masonry kiln-brick/limestone, concrete amber-slate, flooring oak-copper, siding coastal blue-gray
      primary: "#6a5f56",
      primaryForeground: "#faf8f6",
      accent: "#e0b8bc",
      accentForeground: "#3a2428",
      background: "#f6f3f0",
      foreground: "#241f1c",
      muted: "#ebe6e1",
      mutedForeground: "#6a615a",
      border: "#d4cbc4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/access/attic-vs-wall-vs-crawl/existing R-value/moisture-ventilation/height-first, assess blow-in/batts/spray-foam before firm price, quote before install",
      heroStyle: "quote-first insulation LP — attic/wall/crawl chips when true, no bait flat $/sqft, no fake same-day",
      ctaStyle: "get an insulation quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft fees", "fake same-day blow-in or spray-foam guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/access/attic-vs-wall-vs-crawl/existing R-value/moisture-ventilation/height assessment"],
    },
    cssVars: {
      "--theme-primary": "#6a5f56",
      "--theme-primary-fg": "#faf8f6",
      "--theme-accent": "#e0b8bc",
      "--theme-bg": "#f6f3f0",
      "--theme-fg": "#241f1c",
    },
    trustBadges: ["Sqft/access/attic-vs-wall-vs-crawl/R-value/moisture/height assessed before firm price", "Quote before blow-in, batts, or spray foam", "HOA/permit honesty when required", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/insulation.jpg",
        alt: "Attic insulation under roof framing with two skylights",
        credit: "Brett Jordan on Unsplash",
        sourceUrl: "https://unsplash.com/photos/1_l6uH9lcJ0",
        license: "unsplash",
      },
    ],
  },




  tile: {
    niche: "tile",
    label: "Tile",
    palette: {
      // Cool porcelain gray/slate + soft grout-beige — not flooring oak-copper, insulation attic-pink, drywall gypsum/tape-beige
      primary: "#3d4f5f",
      primaryForeground: "#f7f9fb",
      accent: "#cbbba3",
      accentForeground: "#2c261c",
      background: "#f3f5f7",
      foreground: "#1a2229",
      muted: "#e8ebef",
      mutedForeground: "#5a6672",
      border: "#cdd2d8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/access/substrate/material porcelain-ceramic-natural-stone/grout/height/waterproofing-first, assess before firm price, quote before install/repair",
      heroStyle: "quote-first tile LP — floor/wall/shower chips when true, no bait flat $/sqft, no fake same-day",
      ctaStyle: "get a tile quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft fees", "fake same-day install or repair guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/access/substrate/material/grout/height/waterproofing assessment"],
    },
    cssVars: {
      "--theme-primary": "#3d4f5f",
      "--theme-primary-fg": "#f7f9fb",
      "--theme-accent": "#cbbba3",
      "--theme-bg": "#f3f5f7",
      "--theme-fg": "#1a2229",
    },
    trustBadges: ["Sqft/access/substrate/material/grout/height/waterproofing assessed before firm price", "Quote before install or repair", "HOA/permit honesty when required", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/tile.jpg",
        alt: "Polished white porcelain floor tiles with natural light and sheer curtains",
        credit: "Glen Ardi on Unsplash",
        sourceUrl: "https://unsplash.com/photos/yg-nrRoZcw0",
        license: "unsplash",
      },
    ],
  },

  cabinets: {
    niche: "cabinets",
    label: "Cabinets",
    palette: {
      // Warm walnut/charcoal + soft brass — not tile porcelain/grout, flooring oak-copper, drywall gypsum/tape-beige, insulation attic-pink
      primary: "#3f2e24",
      primaryForeground: "#faf6f1",
      accent: "#c4a574",
      accentForeground: "#2a2118",
      background: "#f7f3ee",
      foreground: "#1f1814",
      muted: "#ebe4db",
      mutedForeground: "#6b5d52",
      border: "#d4c8b8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest linear-ft/access/existing-vs-new/material paint-stain-soft-close-hardware/layout kitchen-bath-laundry-first, measure before firm price, quote before install/refacing",
      heroStyle: "quote-first cabinets LP — kitchen/bath/refacing chips when true, no bait flat $/lf or $/cabinet, no fake same-day",
      ctaStyle: "get a cabinet quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf or $/cabinet fees", "fake same-day install or refacing guarantees", "competitor brand cloning", "fake 24/7", "firm price before linear-ft/access/existing-vs-new/material/layout measure"],
    },
    cssVars: {
      "--theme-primary": "#3f2e24",
      "--theme-primary-fg": "#faf6f1",
      "--theme-accent": "#c4a574",
      "--theme-bg": "#f7f3ee",
      "--theme-fg": "#1f1814",
    },
    trustBadges: ["Linear-ft/access/existing-vs-new/material/layout measured before firm price", "Quote before install or refacing", "HOA/permit honesty when required", "No bait flat $/lf or $/cabinet fees"],
    heroImages: [
      {
        src: "/niches/cabinets.jpg",
        alt: "Bright white kitchen cabinets with wood counters and open shelving",
        credit: "Sidekix Media on Unsplash",
        sourceUrl: "https://unsplash.com/photos/photo-1556912173-46c336c7fd55",
        license: "unsplash",
      },
    ],
  },

  countertops: {
    niche: "countertops",
    label: "Countertops",
    palette: {
      // Cool quartz/stone gray-slate + soft warm veining/brass — not cabinets walnut, tile porcelain/grout
      primary: "#364554",
      primaryForeground: "#f7f9fb",
      accent: "#c9a882",
      accentForeground: "#2a2318",
      background: "#f2f4f6",
      foreground: "#1a1f26",
      muted: "#e6e9ed",
      mutedForeground: "#5c6670",
      border: "#c8ced6",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/linear/edge-profile/sink-cutout/existing-vs-new/access-stories/material quartz-granite-marble-laminate-butcher-block-first, measure/assess before firm price, quote before install",
      heroStyle: "quote-first countertops LP — quartz/granite/marble chips when true, no bait flat $/sqft or $/lf, no fake same-day",
      ctaStyle: "get a countertop quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/lf fees", "fake same-day install guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/linear/edge/sink-cutout/existing-vs-new/access/stories/material assessment"],
    },
    cssVars: {
      "--theme-primary": "#364554",
      "--theme-primary-fg": "#f7f9fb",
      "--theme-accent": "#c9a882",
      "--theme-bg": "#f2f4f6",
      "--theme-fg": "#1a1f26",
    },
    trustBadges: ["Sqft/linear/edge/sink-cutout/access/stories/material assessed before firm price", "Quote before install", "HOA/permit honesty when required", "No bait flat $/sqft or $/lf fees"],
    heroImages: [
      {
        src: "/niches/countertops.jpg",
        alt: "Kitchen with marble countertops and warm gold accents",
        credit: "Lisa Anna on Unsplash",
        sourceUrl: "https://unsplash.com/photos/B8VF4-1Krbs",
        license: "unsplash",
      },
    ],
  },

  foundation_repair: {
    niche: "foundation_repair",
    label: "Foundation repair",
    palette: {
      // Deep foundation charcoal/slate + warm structural copper — not concrete wet-gray+amber, slab_leak detection blue, masonry brick
      primary: "#1c1917",
      primaryForeground: "#fafaf9",
      accent: "#b45309",
      accentForeground: "#fffbeb",
      background: "#f5f5f4",
      foreground: "#1c1917",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest soil/drainage/crack-pattern/pier-vs-slab/access/stories assess-first, inspection before firm price, quote before repair",
      heroStyle: "quote-first foundation LP — structural assess chips when true, no bait flat $/lf or $/pier, no fake same-day fix",
      ctaStyle: "get a foundation quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf or $/pier package fees", "fake same-day foundation fix guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before soil/drainage/crack-pattern/pier-vs-slab/access/stories assessment"],
    },
    cssVars: {
      "--theme-primary": "#1c1917",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#b45309",
      "--theme-bg": "#f5f5f4",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Soil/drainage/crack/pier-vs-slab/access assessed before firm price", "Quote before repair", "Licensed contractor / engineer honesty when true", "No bait flat $/lf or $/pier fees"],
    heroImages: [
      {
        src: "/niches/foundation-repair.jpg",
        alt: "Construction worker inspecting structural concrete and foundation forms",
        credit: "Unsplash contributor",
        sourceUrl: "https://unsplash.com/photos/photo-1581094794329-c8112a89af12",
        license: "unsplash",
      },
    ],
  },


  solar: {
    niche: "solar",
    label: "Solar",
    palette: {
      // Deep slate + solar gold/amber CTA — not landscaping forest+earth, electrician yellow-primary, foundation charcoal+copper
      primary: "#0f172a",
      primaryForeground: "#f8fafc",
      accent: "#f59e0b",
      accentForeground: "#1c1917",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest roof size/condition/orientation/shading + utility/net-metering/interconnect + existing vs new + battery storage + HOA/permit assess-first, quote before install",
      heroStyle: "quote-first solar LP — roof/utility assess chips when true, no bait flat $/watt, no fake same-day install",
      ctaStyle: "get a solar quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/watt as Apex benchmark", "fake same-day install guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before roof/utility/net-metering/interconnect/battery/HOA assessment"],
    },
    cssVars: {
      "--theme-primary": "#0f172a",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#f59e0b",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Roof/utility/net-metering/battery assessed before firm price", "Quote before install", "HOA/permit & licensed electrician/solar contractor honesty when required", "No bait flat $/watt fees"],
    heroImages: [
      {
        src: "/niches/solar.jpg",
        alt: "Solar panels on a green field under clear sky",
        credit: "American Public Power Association on Unsplash",
        sourceUrl: "https://unsplash.com/photos/513dBrMJ_5w",
        license: "unsplash",
      },
    ],
  },


  epoxy_flooring: {
    niche: "epoxy_flooring",
    label: "Epoxy flooring",
    palette: {
      // Deep epoxy charcoal + gloss resin teal/cyan — not solar gold, concrete cool-gray, flooring oak, garage door chrome
      primary: "#0c0a09",
      primaryForeground: "#fafaf9",
      accent: "#0d9488",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#0c0a09",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/prep/moisture/existing-coating/access assess-first for garage and commercial epoxy floor coating, quote before coat",
      heroStyle: "quote-first epoxy LP — sqft/prep/moisture chips when true, no bait flat $/sqft, no fake same-day cure",
      ctaStyle: "get an epoxy flooring quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft as Apex benchmark", "fake same-day cure guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before sqft/prep/moisture/existing-coating/access assessment"],
    },
    cssVars: {
      "--theme-primary": "#0c0a09",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#0d9488",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#0c0a09",
    },
    trustBadges: ["Sqft/prep/moisture/existing-coating/access assessed before firm price", "Quote before coat", "Garage & commercial epoxy honesty — no fake same-day cure", "No bait flat $/sqft fees"],
    heroImages: [
      {
        src: "/niches/epoxy-flooring.jpg",
        alt: "Glossy polished industrial floor coating in a modern commercial space",
        credit: "Shahabudin Ibragimov on Unsplash",
        sourceUrl: "https://unsplash.com/photos/seEumFkina8",
        license: "unsplash",
      },
    ],
  },



  chimney: {
    niche: "chimney",
    label: "Chimney",
    palette: {
      // Flue soot charcoal + creosote copper-orange — not fire_smoke emergency, masonry kiln brick, foundation copper #b45309, roofing, appliance orange
      primary: "#1f1a17",
      primaryForeground: "#fafaf9",
      accent: "#c2410c",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#1f1a17",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest flue type / height / creosote / liner / cap / access / stories / wood-stove-vs-fireplace assess-first for chimney sweep and fireplace repair, quote before sweep or repair",
      heroStyle: "quote-first chimney LP — flue/creosote/liner/cap chips when true, no bait flat $/sweep, no fake same-day, no scare copy",
      ctaStyle: "get a chimney quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sweep as Apex benchmark", "fake same-day sweep or repair", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before flue type/height/creosote/liner/cap/access/stories/wood-stove-vs-fireplace assessment"],
    },
    cssVars: {
      "--theme-primary": "#1f1a17",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#c2410c",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1f1a17",
    },
    trustBadges: ["Flue type/height/creosote/liner/cap/access assessed before firm price", "Quote before sweep or repair", "CSIA/NFI / licensed honesty when true", "No bait flat $/sweep fees"],
    heroImages: [
      {
        src: "/niches/chimney.jpg",
        alt: "brick chimney on a residential roof",
        credit: "Hanna Theresia Pitter on Unsplash",
        sourceUrl: "https://unsplash.com/photos/a-brick-chimney-on-top-of-a-roof-QadP_RXFHSs",
        license: "unsplash",
      },
    ],
  },




  window_replacement: {
    niche: "window_replacement",
    label: "Window Replacement",
    palette: {
      // Window frame slate + sky-blue accent — distinct from window_cleaning ice blue-gray; not roofing, siding, or solar
      primary: "#1e293b",
      primaryForeground: "#f8fafc",
      accent: "#0ea5e9",
      accentForeground: "#f8fafc",
      background: "#f8fafc",
      foreground: "#1e293b",
      muted: "#e2e8f0",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest count / size / stories / access / existing-vs-new / vinyl-vs-wood-vs-fiberglass-vs-aluminum / energy-rating assess-first for window replacement, quote before install",
      heroStyle: "quote-first window replacement LP — count/size/stories/access/material/energy chips when true, no bait flat $/window, no fake same-day, not window cleaning",
      ctaStyle: "get a window replacement quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/window as Apex benchmark", "fake same-day install", "competitor brand cloning", "fake 24/7", "window cleaning confusion", "firm price before count/size/stories/access/existing-vs-new/vinyl-vs-wood-vs-fiberglass-vs-aluminum/energy-rating assessment"],
    },
    cssVars: {
      "--theme-primary": "#1e293b",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#0ea5e9",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#1e293b",
    },
    trustBadges: ["Count/size/stories/access/material/energy assessed before firm price", "Quote before install", "Licensed honesty when true", "No bait flat $/window fees"],
    heroImages: [
      {
        src: "/niches/window-replacement.jpg",
        alt: "residential house corner with window against blue sky",
        credit: "Griffin Wooldridge on Unsplash",
        sourceUrl: "https://unsplash.com/photos/corner-of-a-house-with-a-window-against-blue-sky-RBEn2oo_TyU",
        license: "unsplash",
      },
    ],
  },

  generator: {
    niche: "generator",
    label: "Generator",
    palette: {
      // Deep charcoal/slate + safety amber — distinct from solar gold and electrician; standby backup power not portable camping
      primary: "#0f172a",
      primaryForeground: "#f8fafc",
      accent: "#f59e0b",
      accentForeground: "#0f172a",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest whole-home load / fuel NG-LP-diesel / automatic transfer switch / pad-setback / permit-HOA assess-first for standby generator install, quote before install",
      heroStyle: "quote-first standby generator LP — load/fuel/ATS/pad/permit chips when true, no bait flat $/kW, no fake same-day, not solar-only or portable camping batteries",
      ctaStyle: "get a generator install quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/kW as Apex benchmark", "fake same-day install", "competitor brand cloning", "Generac/Kohler/Atlas Copco cloning", "fake 24/7", "solar-only confusion", "portable camping power station confusion", "firm price before load/fuel/transfer-switch/pad/permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#0f172a",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#f59e0b",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Load/fuel/ATS/pad/permit assessed before firm price", "Quote before install", "Licensed electrician honesty when true", "No bait flat $/kW"],
    heroImages: [
      {
        src: "/niches/generator.jpg",
        alt: "power lines and transformers on a utility pole (backup power / outage context)",
        credit: "Alivia Alva on Unsplash",
        sourceUrl: "https://unsplash.com/photos/power-lines-and-transformers-on-a-utility-pole-88Chc9OJ3sg",
        license: "unsplash",
      },
    ],
  },

  ev_charger: {
    niche: "ev_charger",
    label: "EV Charger",
    palette: {
      // Deep electrical slate + EV electric green — distinct from solar gold/amber, generator amber, electrician
      primary: "#0b1220",
      primaryForeground: "#f8fafc",
      accent: "#22c55e",
      accentForeground: "#0b1220",
      background: "#f8fafc",
      foreground: "#0b1220",
      muted: "#e2e8f0",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest panel capacity / amperage (30–60A typical L2) / garage-vs-driveway / hardwired-vs-NEMA / permit-HOA / load calculation assess-first for Level 2 home EVSE install, quote before install",
      heroStyle: "quote-first home EV charger LP — panel/amperage/garage-driveway/hardwired-NEMA/permit chips when true, no bait flat $/charger, no fake same-day, not solar-only or standby generator",
      ctaStyle: "get an EV charger install quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/charger or $/port as Apex benchmark", "fake same-day install", "competitor brand cloning", "Tesla Wall Connector/ChargePoint/JuiceBox/Wallbox/Enphase cloning", "fake 24/7", "solar-only confusion", "standby generator confusion", "firm price before panel/amperage/location/permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#0b1220",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#22c55e",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0b1220",
    },
    trustBadges: ["Panel/amperage/location/permit assessed before firm price", "Quote before install", "Licensed electrician honesty when true", "No bait flat $/charger"],
    heroImages: [
      {
        src: "/niches/ev-charger.jpg",
        alt: "electric vehicle charger plugged into a car (home Level 2 EVSE context)",
        credit: "CHUTTERSNAP on Unsplash",
        sourceUrl: "https://unsplash.com/photos/electric-vehicle-charger-plugged-into-car-xfaYAsMV1p8",
        license: "unsplash",
      },
    ],
  },


  patio_cover: {
    niche: "patio_cover",
    label: "Patio Cover",
    palette: {
      // Deep shade charcoal + warm bronze — distinct from generator amber #f59e0b, decking sage, concrete amber, fencing sage
      primary: "#1c1917",
      primaryForeground: "#fafaf9",
      accent: "#b45309",
      accentForeground: "#fafaf9",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#e7e5e4",
      mutedForeground: "#78716c",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft / attached-vs-freestanding / material aluminum-wood-insulated-fabric-shade / footings / drainage / access / stories / HOA-permit assess-first for patio cover install, quote before build",
      heroStyle: "quote-first patio cover LP — sqft/attached-freestanding/material/footings/drainage/access/stories/HOA-permit chips when true, no bait flat $/sqft or $/lf, no fake same-day, not decking or concrete flatwork or gutter cleaning or fencing",
      ctaStyle: "get a patio cover quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/lf as Apex benchmark", "fake same-day install", "competitor brand cloning", "Alumawood/Lattice/StruXure cloning", "fake 24/7", "decking confusion", "concrete flatwork confusion", "gutter_cleaning confusion", "fencing confusion", "firm price before sqft/attachment/material/footings/drainage/access/stories/HOA-permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#1c1917",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#b45309",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Sqft/attachment/material/footings/permit assessed before firm price", "Quote before build", "Licensed contractor honesty when true", "No bait flat $/sqft"],
    heroImages: [
      {
        src: "/niches/patio-cover.jpg",
        alt: "wooden patio cover / pergola shade structure over outdoor dining (home patio cover context)",
        credit: "Dominik on Unsplash",
        sourceUrl: "https://unsplash.com/photos/wooden-pergola-with-dining-table-and-chairs-outdoors-ACA92yjUKpg",
        license: "unsplash",
      },
    ],
  },







  irrigation: {
    niche: "irrigation",
    label: "Irrigation",
    palette: {
      // Deep turf charcoal/slate + bright sprinkler-sky/teal — distinct from landscaping forest green, decking sage, concrete amber, patio_cover bronze, generator amber
      primary: "#0f1f17",
      primaryForeground: "#ecfdf5",
      accent: "#2dd4bf",
      accentForeground: "#042f2e",
      background: "#f0fdfa",
      foreground: "#0f1f17",
      muted: "#ccfbf1",
      mutedForeground: "#115e59",
      border: "#99f6e4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest lot/zone-count / head-types / controller-age / backflow / water-pressure / dig-access / winterize-vs-repair-vs-new-install / HOA-permit assess-first for lawn sprinkler irrigation, quote before dig or rewire",
      heroStyle: "quote-first irrigation LP — zone/head/controller/backflow/pressure/dig-access/winterize chips when true, no bait flat $/zone or $/head, no fake same-day, not landscaping beds/mow, licensed plumber/irrigation contractor honesty when true",
      ctaStyle: "get an irrigation quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/zone or $/head as Apex benchmark", "fake same-day install", "competitor brand cloning", "Rain Bird/Hunter/Toro brand cloning", "fake 24/7", "landscaping beds/mow confusion", "firm price before lot/zone count/head types/controller age/backflow/water pressure/dig access/winterize-vs-repair-vs-new/HOA-permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#0f1f17",
      "--theme-primary-fg": "#ecfdf5",
      "--theme-accent": "#2dd4bf",
      "--theme-bg": "#f0fdfa",
      "--theme-fg": "#0f1f17",
    },
    trustBadges: ["Zones/heads/controller/backflow/pressure assessed before firm price", "Quote before dig or rewire", "Licensed plumber/irrigation contractor honesty when true", "No bait flat $/zone or $/head"],
    heroImages: [
      {
        src: "/niches/irrigation.jpg",
        alt: "Lawn sprinkler watering green grass during daytime (irrigation repair & install context)",
        credit: "Maxim Tolchinskiy on Unsplash",
        sourceUrl: "https://unsplash.com/photos/rCQfBD2Yg0k",
        license: "unsplash",
      },
    ],
  },



  pergola: {
    niche: "pergola",
    label: "Pergola",
    palette: {
      // Deep timber/charcoal + soft cedar/amber — distinct from patio_cover bronze #b45309, generator amber #f59e0b, irrigation teal #2dd4bf, landscaping forest green, decking sage, concrete amber
      primary: "#1a1510",
      primaryForeground: "#fffbeb",
      accent: "#d97706",
      accentForeground: "#1a1510",
      background: "#fffbeb",
      foreground: "#1a1510",
      muted: "#fef3c7",
      mutedForeground: "#78350f",
      border: "#fcd34d",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest footprint/sqft / attached-vs-freestanding / material wood-vinyl-aluminum-composite / post-footing-depth / roof-style open-beam-vs-lattice-vs-solid-roof-kit / height-stories-access / HOA-permit assess-first for outdoor pergola & shade structure, quote before build",
      heroStyle: "quote-first pergola LP — footprint/attached-vs-freestanding/material/post-footing/roof-style/height-access/HOA-permit chips when true, no bait flat $/sqft or $/lf, no fake same-day, not patio_cover solid shade canopy / decking floor / fencing / landscaping beds/mow / irrigation zones, licensed contractor honesty when true",
      ctaStyle: "get a pergola quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/lf as Apex benchmark", "fake same-day build", "competitor brand cloning", "fake 24/7", "patio_cover solid shade canopy confusion", "decking floor platform confusion", "fencing confusion", "landscaping beds/mow confusion", "irrigation zones confusion", "firm price before footprint/sqft/attached-vs-freestanding/material/post-footing-depth/roof-style/height-stories-access/HOA-permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#1a1510",
      "--theme-primary-fg": "#fffbeb",
      "--theme-accent": "#d97706",
      "--theme-bg": "#fffbeb",
      "--theme-fg": "#1a1510",
    },
    trustBadges: ["Footprint/material/roof style/footings assessed before firm price", "Quote before build", "Licensed contractor honesty when true", "No bait flat $/sqft or $/lf"],
    heroImages: [
      {
        src: "/niches/pergola.jpg",
        alt: "Freestanding open-beam wooden pergola with posts and rafters in a garden (pergola build & repair context)",
        credit: "Naoki Suzuki on Unsplash",
        sourceUrl: "https://unsplash.com/photos/m8ZGnv4J1SM",
        license: "unsplash",
      },
    ],
  },



  gazebo: {
    niche: "gazebo",
    label: "Gazebo",
    palette: {
      // Deep pavilion green/slate + soft copper/brass — distinct from pergola timber #1a1510/#d97706, patio_cover bronze #b45309, irrigation teal #2dd4bf, generator amber #f59e0b, landscaping forest green
      primary: "#14241c",
      primaryForeground: "#faf6f1",
      accent: "#c2410c",
      accentForeground: "#faf6f1",
      background: "#faf6f1",
      foreground: "#14241c",
      muted: "#ffedd5",
      mutedForeground: "#7c2d12",
      border: "#fdba74",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest footprint/sqft / roof-style full-hip-octagon / screen-rail kit / foundation-floor optional / material / height-access / HOA-permit assess-first for freestanding outdoor gazebo & pavilion, quote before build",
      heroStyle: "quote-first gazebo LP — footprint/roof-style/screen-rail/foundation-floor/material/height-access/HOA-permit chips when true, no bait flat $/sqft or $/lf, no fake same-day, not pergola open-beam/lattice shade / patio_cover attached solid canopy / decking floor platforms / fencing / landscaping beds/mow / irrigation zones, licensed contractor honesty when true",
      ctaStyle: "get a gazebo quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/lf as Apex benchmark", "fake same-day build", "competitor brand cloning", "fake 24/7", "pergola open-beam/lattice shade confusion", "patio_cover attached solid shade canopy confusion", "decking floor platform confusion", "fencing confusion", "landscaping beds/mow confusion", "irrigation zones confusion", "firm price before footprint/sqft/roof-style/screen-rail/foundation-floor/material/height-access/HOA-permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#14241c",
      "--theme-primary-fg": "#faf6f1",
      "--theme-accent": "#c2410c",
      "--theme-bg": "#faf6f1",
      "--theme-fg": "#14241c",
    },
    trustBadges: ["Footprint/roof style/screen-rail/foundation assessed before firm price", "Quote before build", "Licensed contractor honesty when true", "No bait flat $/sqft or $/lf"],
    heroImages: [
      {
        src: "/niches/gazebo.jpg",
        alt: "Freestanding outdoor wooden gazebo / pavilion with roof in a wooded setting (gazebo build & repair context)",
        credit: "Jakub Pabis on Unsplash",
        sourceUrl: "https://unsplash.com/photos/5Tr8rfs4em8",
        license: "unsplash",
      },
    ],
  },

  carport: {
    niche: "carport",
    label: "Carport",
    palette: {
      // Deep asphalt charcoal/slate + cool zinc/steel — distinct from gazebo #14241c/#c2410c, pergola #1a1510/#d97706, patio_cover #1c1917/#b45309, irrigation #0f1f17/#2dd4bf, generator #0f172a/#f59e0b, garage orange
      primary: "#0f1419",
      primaryForeground: "#f8fafc",
      accent: "#64748b",
      accentForeground: "#f8fafc",
      background: "#f8fafc",
      foreground: "#0f1419",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#94a3b8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest bay count / footprint/sqft / attached-vs-freestanding / material metal-wood-poly when true / roof pitch-panels / post-footing / pad existing-vs-new / vehicle height clearance / wind-snow load when true / access / HOA-permit assess-first for open-sided carport vehicle shelter, quote before build",
      heroStyle: "quote-first carport LP — bay/footprint/attached-vs-freestanding/material/roof panels/post-footing/pad/height clearance/wind-snow/access/HOA-permit chips when true, no bait flat $/sqft or $/lf or $/bay, no fake same-day, not gazebo pavilion/people outdoor room / pergola open-beam/lattice shade / patio_cover solid patio canopy / decking floor platforms / garage enclosed door/opener / fencing / landscaping / irrigation / concrete flatwork alone, licensed contractor honesty when true",
      ctaStyle: "get a carport quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/lf or $/bay as Apex benchmark", "fake same-day build", "competitor brand cloning", "fake 24/7", "gazebo pavilion/people outdoor room confusion", "pergola open-beam/lattice shade confusion", "patio_cover solid patio shade canopy confusion", "decking floor platform confusion", "garage enclosed door/opener confusion", "fencing confusion", "landscaping confusion", "irrigation confusion", "concrete flatwork alone confusion", "firm price before bay/footprint/attached-vs-freestanding/material/roof/post-footing/pad/height/wind-snow/access/HOA-permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#0f1419",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#64748b",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f1419",
    },
    trustBadges: ["Bay/footprint/material/pad/height assessed before firm price", "Quote before build", "Licensed contractor honesty when true", "No bait flat $/sqft or $/bay"],
    heroImages: [
      {
        src: "/niches/carport.jpg",
        alt: "Cars parked under a modern open-sided carport / vehicle shelter on a sunny day (carport build & repair context)",
        credit: "MAK on Unsplash",
        sourceUrl: "https://unsplash.com/photos/3u5Lco_0gPQ",
        license: "unsplash",
      },
    ],
  },

  awning: {
    niche: "awning",
    label: "Awning",
    palette: {
      // Deep canopy charcoal/slate + soft awning canvas/terracotta — distinct from carport #0f1419/#64748b, gazebo #14241c/#c2410c, pergola #1a1510/#d97706, patio_cover #1c1917/#b45309
      primary: "#14181f",
      primaryForeground: "#f8fafc",
      accent: "#c45c26",
      accentForeground: "#f8fafc",
      background: "#faf7f5",
      foreground: "#14181f",
      muted: "#ebe4de",
      mutedForeground: "#5c534c",
      border: "#d6c7bb",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest width/projection lf-ft / retractable-vs-fixed / fabric-vs-aluminum-vs-vinyl when true / mount wall-vs-roof / motorized-vs-manual when true / sun-wind rating when true / stories-access / HOA-permit assess-first for building-attached fabric or aluminum awning, quote before install",
      heroStyle: "quote-first awning LP — width/projection/retractable-vs-fixed/fabric-aluminum-vinyl/mount wall-vs-roof/motorized-vs-manual/sun-wind rating/stories-access/HOA-permit chips when true, no bait flat $/lf or $/sqft, no fake same-day, not patio_cover solid permanent canopy / pergola open-beam freestanding-attached shade frame / gazebo pavilion / carport vehicle shelter / decking / fencing / landscaping / irrigation / concrete flatwork alone, licensed contractor honesty when true",
      ctaStyle: "get an awning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf or $/sqft as Apex benchmark", "fake same-day install", "competitor brand cloning", "fake 24/7", "patio_cover solid permanent canopy confusion", "pergola open-beam freestanding/attached shade frame confusion", "gazebo pavilion confusion", "carport vehicle shelter confusion", "decking confusion", "fencing confusion", "landscaping confusion", "irrigation confusion", "concrete flatwork alone confusion", "firm price before width/projection/retractable-vs-fixed/fabric-aluminum-vinyl/mount/motorized/sun-wind/stories-access/HOA-permit assessment"],
    },
    cssVars: {
      "--theme-primary": "#14181f",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#c45c26",
      "--theme-bg": "#faf7f5",
      "--theme-fg": "#14181f",
    },
    trustBadges: ["Width/projection/retractable-vs-fixed assessed before firm price", "Quote before install", "Licensed contractor honesty when true", "No bait flat $/lf or $/sqft"],
    heroImages: [
      {
        src: "/niches/awning.jpg",
        alt: "Red scalloped fabric awning over a residential window with flowers (awning install & repair context)",
        credit: "Maximilian Bungart on Unsplash",
        sourceUrl: "https://unsplash.com/photos/aj3KXG8Ytds",
        license: "unsplash",
      },
    ],
  },



  dumpster_rental: {
    niche: "dumpster_rental",
    label: "Dumpster / roll-off",
    palette: {
      // Deep dumpster iron charcoal + caution yellow/amber — distinct from junk_removal lime #a3e635, awning #14181f/#c45c26, carport #0f1419/#64748b, gazebo #14241c/#c2410c, pergola #1a1510/#d97706, patio_cover #1c1917/#b45309, irrigation teal #2dd4bf, epoxy teal, generator #f59e0b
      primary: "#1f1b16",
      primaryForeground: "#fafaf9",
      accent: "#eab308",
      accentForeground: "#1f1b16",
      background: "#fafaf9",
      foreground: "#1f1b16",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest size 10/20/30/40 yd when true / rental duration / debris type / delivery access / driveway protection / permit-HOA educational only assess-first for dumpster and roll-off rental, quote before delivery",
      heroStyle: "quote-first dumpster / roll-off rental LP — size yd/duration/debris/access/driveway-protection/permit-HOA chips when true, no bait flat $/day, no fake same-day drop, not junk_removal hauling labor / porta_potty_rental / storage_container_rental / septic_pumping / grease_trap_cleaning / concrete debris alone, licensed/hauler honesty when true",
      ctaStyle: "get a dumpster rental quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/day as Apex benchmark", "fake same-day drop", "competitor brand cloning", "fake 24/7", "junk_removal hauling labor confusion", "porta_potty_rental confusion", "storage_container_rental confusion", "septic_pumping confusion", "grease_trap_cleaning confusion", "concrete debris alone confusion", "firm price before size/duration/debris/access/driveway-protection/permit-HOA assessment"],
    },
    cssVars: {
      "--theme-primary": "#1f1b16",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#eab308",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1f1b16",
    },
    trustBadges: ["Size/duration/debris/access/driveway assessed before firm price", "Quote before delivery", "Permit/HOA educational only when true", "No bait flat $/day"],
    heroImages: [
      {
        src: "/niches/dumpster-rental.jpg",
        alt: "Crane lifts a roll-off dumpster onto a truck on a city street (dumpster rental context)",
        credit: "Danial Dez on Unsplash",
        sourceUrl: "https://unsplash.com/photos/crane-lifts-dumpster-onto-truck-on-city-street-lvCMOl6LHEk",
        license: "unsplash",
      },
    ],
  },
  porta_potty_rental: {
    niche: "porta_potty_rental",
    label: "Porta Potty Rental",
    palette: {
      // Portable-unit plastic slate + soft sanitation mint — #2c3542 + #5eead4 — not dumpster #1f1b16/#eab308, irrigation #0f1f17/#2dd4bf, awning #14181f/#c45c26, carport #0f1419/#64748b, gazebo #14241c/#c2410c, pergola #1a1510/#d97706, patio_cover #1c1917/#b45309, junk_removal lime, septic #252e2a/#86a373, storage_container #3f3f46/#c2410c, grease_trap #141c26/#a68b4b, plumber #22d3ee, epoxy teal
      primary: "#2c3542",
      primaryForeground: "#f0fdfa",
      accent: "#5eead4",
      accentForeground: "#134e4a",
      background: "#f8fafc",
      foreground: "#1e293b",
      muted: "#eef2f7",
      mutedForeground: "#475569",
      border: "#d0d7e2",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest unit count / event days vs jobsite duration / delivery access / ADA unit need / restock-service cadence / waste pump-out schedule assess-first for portable restroom (porta potty) rental, quote before delivery — event and construction portable toilets only, not dumpster roll-off, not junk removal hauling, not septic tank pumping, not restaurant grease trap FOG cleaning, not storage container rental; local permit/HOA educational only (not legal advice); licensed/hauler when true",
      heroStyle: "quote-first porta potty rental LP — unit-count/event-days-vs-jobsite/delivery-access/ADA/restock/pump-out chips when true, no bait flat $/day or $/weekend, no fake same-day drop, permit/HOA educational only",
      ctaStyle: "get a porta potty rental quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/day as Apex benchmark", "bait flat $/weekend as Apex benchmark", "fake same-day drop guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before unit count/event days vs jobsite duration/delivery access/ADA unit need/restock-service cadence/waste pump-out schedule assessment", "dumpster roll-off confusion", "junk removal hauling confusion", "septic tank pumping confusion", "grease trap FOG cleaning confusion", "storage container rental confusion", "legal advice on local permit/HOA rules"],
    },
    cssVars: {
      "--theme-primary": "#2c3542",
      "--theme-primary-fg": "#f0fdfa",
      "--theme-accent": "#5eead4",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#1e293b",
    },
    trustBadges: ["Unit count/event days vs jobsite/delivery access/ADA/restock/pump-out assessed before firm price", "Quote before delivery — event & construction portable toilets", "Local permit/HOA educational only — not legal advice; licensed/hauler when true", "No bait flat $/day or $/weekend — not dumpster, junk removal, septic pumping, grease trap, or storage container"],
    heroImages: [
      {
        src: "/niches/porta-potty-rental.jpg",
        alt: "Blue portable toilet at a construction site — unit count and delivery access assessed before quote",
        credit: "Vadym Alyekseyenko on Unsplash",
        sourceUrl: "https://unsplash.com/photos/loybh0-sGwI",
        license: "unsplash",
      },
    ],
  },

  storage_container_rental: {
    niche: "storage_container_rental",
    label: "Storage Container Rental",
    palette: {
      // Weathered steel / container corrugation zinc + muted rust — #3f3f46 + #c2410c — not dumpster #1f1b16/#eab308, porta_potty #2c3542/#5eead4, awning #14181f/#c45c26, carport #0f1419/#64748b, gazebo #14241c/#c2410c (accent overlap OK — primary zinc differs), irrigation #0f1f17/#2dd4bf, junk lime, septic #252e2a/#86a373, grease #141c26/#a68b4b
      primary: "#3f3f46",
      primaryForeground: "#fafafa",
      accent: "#c2410c",
      accentForeground: "#fff7ed",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#f5f5f4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest container size (10/20/40 ft) / delivery-pickup access & crane-tilt-bed needs / ground-surface conditions / rental duration (days/weeks/months) / lock-security options / residential vs jobsite use assess-first for shipping-container / conex / portable storage rental, quote before delivery — temporary on-site storage only, not dumpster roll-off waste, not porta potty toilets, not junk removal haul-away, not moving labor, not septic pumping, not grease trap FOG cleaning; local permit/HOA educational only (not legal advice)",
      heroStyle: "quote-first storage container rental LP — size/access/crane-tilt-bed/ground/duration/lock/residential-vs-jobsite chips when true, no bait flat $/day or $/month, no fake same-day delivery, permit/HOA educational only",
      ctaStyle: "get a storage container rental quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/day as Apex benchmark", "bait flat $/month as Apex benchmark", "fake same-day delivery guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before container size/delivery-pickup access/crane-tilt-bed/ground-surface/rental duration/lock-security/residential-vs-jobsite assessment", "dumpster roll-off confusion", "porta potty toilet confusion", "junk removal haul-away confusion", "moving labor confusion", "septic pumping confusion", "grease trap FOG cleaning confusion", "legal advice on local permit/HOA rules"],
    },
    cssVars: {
      "--theme-primary": "#3f3f46",
      "--theme-primary-fg": "#fafafa",
      "--theme-accent": "#c2410c",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Size/access/crane-tilt-bed/ground/duration/lock/use assessed before firm price", "Quote before delivery — shipping container / conex / portable storage", "Local permit/HOA educational only — not legal advice", "No bait flat $/day or $/month — not dumpster, porta potty, junk removal, moving, septic, or grease trap"],
    heroImages: [
      {
        src: "/niches/storage-container-rental.jpg",
        alt: "Shipping containers on a dirt field — size, delivery access, and ground conditions assessed before quote",
        credit: "Markus Winkler on Unsplash",
        sourceUrl: "https://unsplash.com/photos/-BXq7U-Yuxw",
        license: "unsplash",
      },
    ],
  },

  gutter_guards: {
    niche: "gutter_guards",
    label: "Gutter Guards",
    palette: {
      // Deep zinc/gutter-metal + leaf-guard forest green — #27272a + #15803d — not gutter_cleaning #78350f/#57534e, fencing sage, landscaping forest olive, irrigation #0f1f17/#2dd4bf, patio_cover #1c1917/#b45309, storage_container #3f3f46/#c2410c, roofing, siding
      primary: "#27272a",
      primaryForeground: "#fafafa",
      accent: "#15803d",
      accentForeground: "#f0fdf4",
      background: "#fafaf9",
      foreground: "#18181b",
      muted: "#f4f4f5",
      mutedForeground: "#52525b",
      border: "#d4d4d8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest linear-ft / stories-height / roof pitch-access / existing gutter type (K-style/half-round/box) / guard material (micro-mesh/brush/screen/helmet-style when true — no competitor brand names) / debris-leaf load / downspout count / HOA-permit educational assess-first for gutter guards / leaf protection covers, quote before install — protection covers only, not gutter cleaning flush service, not roofing tear-off, not pressure washing, not siding, not fascia alone; local permit/HOA educational only (not legal advice)",
      heroStyle: "quote-first gutter guards LP — linear-ft/stories/pitch/existing-gutter/material/debris/downspouts chips when true, no bait flat $/lf, no fake same-day install, no competitor brand cloning, permit/HOA educational only",
      ctaStyle: "get a gutter guards quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf as Apex benchmark", "fake same-day install guarantees", "competitor brand cloning", "LeafFilter / Gutter Helmet / LeafGuard brand names", "fake 24/7", "scare copy / fake emergency urgency", "firm price before linear-ft/stories/pitch/existing-gutter/material/debris/downspout assessment", "gutter cleaning flush-only confusion", "roofing tear-off confusion", "pressure washing confusion", "siding/fascia-alone confusion", "legal advice on local permit/HOA rules"],
    },
    cssVars: {
      "--theme-primary": "#27272a",
      "--theme-primary-fg": "#fafafa",
      "--theme-accent": "#15803d",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#18181b",
    },
    trustBadges: ["Linear-ft/stories/pitch/existing gutter/material/debris/downspouts assessed before firm price", "Quote before install — gutter guards / leaf protection covers", "Local permit/HOA educational only — not legal advice", "No bait flat $/lf — not gutter cleaning, roofing, pressure washing, siding, or fascia alone"],
    heroImages: [
      {
        src: "/niches/gutter-guards.jpg",
        alt: "Close-up of a residential rain gutter on a shingle roof edge — linear feet, height, and existing gutter type assessed before quote",
        credit: "Luke Southern on Unsplash",
        sourceUrl: "https://unsplash.com/photos/ZzZouwiQWV0",
        license: "unsplash",
      },
    ],
  },

  stump_grinding: {
    niche: "stump_grinding",
    label: "Stump grinding",
    palette: {
      // Deep bark charcoal + warm stump/mulch amber — #292524 + #b45309 — not gutter_guards #27272a/#15803d, storage_container_rental #3f3f46/#c2410c, porta_potty_rental #2c3542/#5eead4, dumpster_rental #1f1b16/#eab308, tree_service #44403c/#c2410c, landscaping #2f4a35/#a67c52, lawn_care, junk_removal #a3e635/#1e293b, concrete #475569/#d97706
      primary: "#292524",
      primaryForeground: "#fafaf9",
      accent: "#b45309",
      accentForeground: "#fffbeb",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#f5f5f4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest stump-count/diameter/root-flare/access/utilities/grind-depth/chips assess-first, quote before grind; distinct from tree_service storm call-first, landscaping, lawn care, junk removal, concrete, excavation, gutter_guards, storage/porta/dumpster rentals",
      heroStyle: "quote-first stump grinding LP — stump count/diameter/access/utilities/grind-depth/haul-vs-mulch chips when true, no bait flat $/stump, no fake same-day",
      ctaStyle: "get a stump grinding quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/stump as Apex benchmark", "fake same-day grind guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before stump count/diameter/root flare/access/utilities/grind-depth/chips assessment", "impersonating tree_service storm/emergency call-first", "landscaping/lawn care mow confusion", "junk removal haul confusion", "concrete/excavation confusion", "gutter_guards confusion", "storage/porta/dumpster rental confusion"],
    },
    cssVars: {
      "--theme-primary": "#292524",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#b45309",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Stump count/diameter/root flare/access assessed before firm price", "Quote before grind", "Grind depth + haul-away vs leave-mulch honesty", "Buried utilities & permit/HOA educational only — not legal advice", "No bait flat $/stump — not tree_service storm call-first"],
    heroImages: [
      {
        src: "/niches/stump-grinding.jpg",
        alt: "Close-up of tree bark and fresh wood chips after outdoor grinding work",
        credit: "Haberdoedas on Unsplash",
        sourceUrl: "https://unsplash.com/photos/xFH7QN2LejE",
        license: "unsplash",
      },
    ],
  },

  retaining_wall: {
    niche: "retaining_wall",
    label: "Retaining wall",
    palette: {
      // Deep basalt slate + warm sandstone gold — #1e293b + #ca8a04 — not stump_grinding #292524/#b45309, gutter_guards #27272a/#15803d, storage_container_rental #3f3f46/#c2410c, concrete #475569/#d97706, masonry, landscaping, fencing, foundation_repair
      primary: "#1e293b",
      primaryForeground: "#f8fafc",
      accent: "#ca8a04",
      accentForeground: "#422006",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#f1f5f9",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest height/lf/soil/drainage/footing/material/surcharge/access assess-first, quote before dig; distinct from concrete flatwork, masonry, fencing, landscaping, foundation_repair, stump_grinding",
      heroStyle: "quote-first retaining wall LP — height/lf/drainage/footing/material/surcharge when true, no bait flat $/lf or $/sqft, no fake same-day",
      ctaStyle: "get a retaining wall quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf or $/sqft as Apex benchmark", "fake same-day wall guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before height/lf/soil/drainage/footing/material/surcharge/access assessment", "impersonating concrete flatwork-only", "impersonating general masonry veneer-only", "fencing or landscaping beds/mow as retaining wall", "foundation_repair scare copy", "engineer stamp claims when not true"],
    },
    cssVars: {
      "--theme-primary": "#1e293b",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#ca8a04",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Height/lf/soil/drainage/footing assessed before firm price", "Quote before dig", "Material + surcharge honesty", "Permit/HOA educational only — not legal advice", "No bait flat $/lf — not concrete flatwork or fencing"],
    heroImages: [
      {
        src: "/niches/retaining-wall.jpg",
        alt: "Dry stone retaining wall in a grassy field under a cloudy sky",
        credit: "Unsplash contributor",
        sourceUrl: "https://unsplash.com/photos/9tCs0D3dYCc",
        license: "unsplash",
      },
    ],
  },


  french_drain: {
    niche: "french_drain",
    label: "French drain",
    palette: {
      // Deep drainage slate + soft trench copper — #1e3a4c + #b87333 — not retaining_wall #1e293b/#ca8a04, stump_grinding #292524/#b45309, gutter_guards #27272a/#15803d, storage_container_rental #3f3f46/#c2410c, concrete #475569/#d97706, foundation_repair, landscaping, irrigation
      primary: "#1e3a4c",
      primaryForeground: "#f8fafc",
      accent: "#b87333",
      accentForeground: "#fff7ed",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#f1f5f9",
      mutedForeground: "#64748b",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest length/depth/soil/daylight-vs-sump/yard-access-slope/buried-utilities/existing-vs-new-trench/gravel-pipe-sizing when true/surface-vs-subsurface/HOA-permit educational assess-first, quote before dig; outdoor yard drainage — not retaining_wall, foundation_repair, concrete flatwork, landscaping, irrigation, gutter_cleaning, gutter_guards, basement waterproofing / crawl_space, sump_pump, water_damage, slab_leak, plumber",
      heroStyle: "quote-first french drain LP — length/depth/soil/daylight-vs-sump/access/utilities/pipe-gravel when true, no bait flat $/lf, no fake same-day dig",
      ctaStyle: "get a french drain quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf as Apex benchmark", "fake same-day dig guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before length/depth/soil type/daylight vs sump daylighting/yard access/slope/buried utilities/existing vs new trench/gravel-pipe sizing when true/surface vs subsurface/HOA-permit assessment", "impersonating retaining_wall grade-hold", "impersonating foundation_repair structural", "impersonating concrete flatwork pour", "impersonating landscaping mow/beds", "impersonating irrigation zones", "impersonating gutter_cleaning or gutter_guards", "impersonating basement waterproofing / crawl_space interior systems", "impersonating sump_pump install-only", "impersonating water_damage call-first emergency", "impersonating plumber or slab_leak detection", "claiming licensed contractor when not true", "HOA/permit as legal advice"],
    },
    cssVars: {
      "--theme-primary": "#1e3a4c",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#b87333",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Length/depth + soil type assessed before firm price", "Daylight vs sump daylighting honesty", "Yard access/slope + buried utilities before dig", "Existing vs new trench + gravel/pipe sizing when true", "Surface drainage vs subsurface honesty", "Permit/HOA educational only — not legal advice", "No bait flat $/lf — quote before dig"],
    heroImages: [
      {
        src: "/niches/french-drain.jpg",
        alt: "Corrugated perforated drainage pipe on excavated soil and gravel in a residential yard — french drain trench reference",
        credit: "Unsplash contributor",
        sourceUrl: "https://unsplash.com/photos/j_S43VViMB8",
        license: "unsplash",
      },
    ],
  },


  basement_waterproofing: {
    niche: "basement_waterproofing",
    label: "Basement waterproofing",
    palette: {
      // Deep damp basement slate + waterproof teal — #0f172a + #14b8a6 — not french_drain #1e3a4c/#b87333, retaining_wall #1e293b/#ca8a04, stump_grinding #292524/#b45309, foundation_repair #1c1917/#b45309, water_damage/plumber/slab_leak cyan family, mold_remediation
      primary: "#0f172a",
      primaryForeground: "#f8fafc",
      accent: "#14b8a6",
      accentForeground: "#042f2e",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/wall-height/crawl-vs-poured-vs-block/interior-vs-exterior/existing-drainage-sump-vapor-barrier/access/weather assess-first for basement waterproofing; french drain / sump only after assess when relevant; mold-adjacent referral only (NOT mold remediation claims); quote before dig/install — waterproofing only, not emergency water_damage dry-out or foundation_repair piers/slabs; not french_drain yard-only, retaining_wall, concrete, crawl_space encapsulation alone, sump_pump install-only, gutter_cleaning, gutter_guards, irrigation, landscaping, stump_grinding, plumber, slab_leak",
      heroStyle: "quote-first basement waterproofing LP — sqft/wall-height/interior-exterior/drainage/sump/vapor/crawl-poured-block chips when true, no bait flat $/lf or $/sqft, no fake same-day dry-out",
      ctaStyle: "get a basement waterproofing quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf or $/sqft as Apex benchmark", "fake same-day dry-out guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before sqft/wall-height/crawl vs poured vs block/interior vs exterior/existing drainage/sump/vapor barrier/access/weather assessment", "emergency water_damage restoration / call-first dry-out claims as waterproofing", "structural foundation_repair pier/slab repair confusion", "mold remediation claims — referral only when mold-adjacent", "impersonating french_drain yard-only outdoor trench", "impersonating retaining_wall grade-hold", "impersonating concrete flatwork", "impersonating crawl_space encapsulation alone", "impersonating sump_pump install-only", "impersonating gutter_cleaning or gutter_guards", "impersonating irrigation or landscaping", "impersonating stump_grinding", "impersonating plumber or slab_leak detection", "claiming licensed contractor when not true", "HOA/permit as legal advice"],
    },
    cssVars: {
      "--theme-primary": "#0f172a",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#14b8a6",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Sqft/wall-height/interior-vs-exterior/drainage/sump/vapor/access assessed before firm price", "Quote before dig/install — french drain / sump when relevant after assess", "Crawl vs poured vs block honesty — not emergency dry-out or foundation piers", "Mold-adjacent referral only — not mold remediation claims", "Permit/HOA educational only — not legal advice", "No bait flat $/lf or $/sqft — licensed contractor honesty when true"],
    heroImages: [
      {
        src: "/niches/basement-waterproofing.jpg",
        alt: "Crawlspace or basement interior with vapor barrier lining and sealed floor penetrations",
        credit: "Brett Jordan on Unsplash",
        sourceUrl: "https://unsplash.com/photos/Upd68AjFQ9Y",
        license: "unsplash",
      },
    ],
  },


  crawl_space_encapsulation: {
    niche: "crawl_space_encapsulation",
    label: "Crawl space encapsulation",
    palette: {
      // Deep crawl olive charcoal + vapor-barrier lime — #1c2416 + #65a30d — not basement_waterproofing #0f172a/#14b8a6, french_drain #1e3a4c/#b87333, retaining_wall #1e293b/#ca8a04, stump_grinding #292524/#b45309 (old #81 primary #292524 collided), foundation_repair #1c1917/#b45309, mold_remediation, insulation, radon_mitigation, wildlife_removal, water_damage, plumber, concrete, landscaping
      primary: "#1c2416",
      primaryForeground: "#f7fee7",
      accent: "#65a30d",
      accentForeground: "#1a2e05",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#f5f5f4",
      mutedForeground: "#3f6212",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/height/access (hatches, vents, debris)/dirt-vs-concrete floor/moisture-standing-water-vs-humidity/existing vapor barrier-insulation-vents/HVAC-ducts in crawl/pest-wildlife evidence referral-only (NOT wildlife_removal claims)/radon educational-only (NOT radon_mitigation install claims)/rim-joist-sill sealing/sump-dehumidifier need/permit-HOA assess-first, quote before encapsulate; vapor barrier encapsulation product — not basement_waterproofing interior walls/floors, french_drain exterior yard trench, retaining_wall, foundation_repair structural, sump_pump install-only, mold_remediation call-first, water_damage emergency restoration, insulation attic R-value, radon_mitigation, wildlife_removal, plumber, concrete, landscaping",
      heroStyle: "quote-first crawl space encapsulation LP — sqft/height/access/dirt-vs-concrete/moisture/vapor-barrier/insulation-vents/HVAC-duct/pest-referral/radon-edu chips when true, no bait flat $/sqft, no fake same-day dry crawl guarantee",
      ctaStyle: "get a crawl space encapsulation quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft as Apex benchmark", "fake same-day dry crawl guarantee", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before sqft/height/access/dirt vs concrete floor/moisture-standing water vs humidity/existing vapor barrier/insulation/vents/HVAC ducts/pest-wildlife evidence/radon educational/rim-joist-sill/sump-dehumidifier/permit-HOA assessment", "claiming radon mitigation niche or install (educational only)", "wildlife_removal / pest control claims — referral only when evidence", "impersonating basement_waterproofing interior systems", "impersonating french_drain exterior yard trench", "impersonating retaining_wall grade-hold", "impersonating foundation_repair structural", "impersonating sump_pump install-only", "impersonating water_damage call-first emergency", "impersonating mold_remediation call-first", "impersonating insulation attic R-value blow-in", "impersonating plumber or concrete or landscaping", "claiming licensed contractor when not true", "HOA/permit as legal advice"],
    },
    cssVars: {
      "--theme-primary": "#1c2416",
      "--theme-primary-fg": "#f7fee7",
      "--theme-accent": "#65a30d",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Sqft/height/access + dirt vs concrete floor assessed before firm price", "Moisture/standing water + existing vapor barrier/insulation/vents honesty", "HVAC ducts in crawl honesty — pest/wildlife referral only (not wildlife_removal)", "Radon educational only — not radon_mitigation install claims", "Permit/HOA educational only — quote before encapsulate", "No bait flat $/sqft — no fake same-day dry crawl — licensed contractor honesty when true"],
    heroImages: [
      {
        src: "/niches/crawl-space-encapsulation.jpg",
        alt: "Building under construction with protective plastic sheeting — vapor barrier / encapsulation reference",
        credit: "Sebastian Schuster on Unsplash",
        sourceUrl: "https://unsplash.com/photos/T-ERO0eoI8I",
        license: "unsplash",
      },
    ],
  },

  sump_pump: {
    niche: "sump_pump",
    label: "Sump pump",
    palette: {
      // Deep water-slate + bright pump cyan — #164e63 + #22d3ee — not basement_waterproofing #0f172a/#14b8a6, crawl_space_encapsulation #1c2416/#65a30d, french_drain #1e3a4c/#b87333, retaining_wall #1e293b/#ca8a04, stump_grinding #292524/#b45309; inverted roles vs plumber primary #22d3ee / accent #164e63; not foundation_repair, water_damage, mold_remediation, slab_leak, radon_mitigation, wildlife_removal, insulation, concrete, landscaping, gutter_cleaning, gutter_guards
      primary: "#164e63",
      primaryForeground: "#f8fafc",
      accent: "#22d3ee",
      accentForeground: "#083344",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#f1f5f9",
      mutedForeground: "#155e75",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest assess-first sump pump install/replace — pit/basin size & condition / existing pump age-HP/type (pedestal vs submersible) / backup battery vs water-powered need / check valve / discharge line length & freeze risk / alarm / crawl vs basement location / power availability / water table/flood history / float switch / crock condition / effluent route / permit-HOA educational only (not legal advice) / licensed contractor honesty when true; quote before install; sump pump product — not basement_waterproofing full systems, crawl_space_encapsulation vapor barrier, french_drain exterior trench, retaining_wall, foundation_repair structural, water_damage call-first emergency, mold_remediation (referral only), plumber general, slab_leak, radon_mitigation, wildlife_removal, insulation, concrete, landscaping, gutter_cleaning, gutter_guards",
      heroStyle: "quote-first sump pump LP — pit/basin/pump age-HP/type/backup/check valve/discharge freeze/alarm/crawl-vs-basement/power/flood-history chips when true, no bait flat $/pump, no fake never-flood or same-day dry basement, no scare fake 24/7",
      ctaStyle: "get a sump pump quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/pump as Apex benchmark", "fake never-flood guarantees", "fake same-day dry basement guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before pit/basin size & condition/existing pump age-HP/type pedestal vs submersible/backup battery vs water-powered/check valve/discharge line length & freeze risk/alarm/crawl vs basement location/power availability/water table/flood history/float switch/crock/effluent/permit-HOA assessment", "claiming licensed contractor when not true", "HOA/permit as legal advice", "impersonating basement_waterproofing full systems", "impersonating crawl_space_encapsulation vapor barrier", "impersonating french_drain exterior yard trench", "impersonating retaining_wall grade-hold", "impersonating foundation_repair structural", "impersonating water_damage call-first emergency", "impersonating mold_remediation — referral only", "impersonating plumber general service", "impersonating slab_leak", "impersonating radon_mitigation", "impersonating wildlife_removal", "impersonating insulation attic R-value", "impersonating concrete or landscaping", "impersonating gutter_cleaning or gutter_guards"],
    },
    cssVars: {
      "--theme-primary": "#164e63",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#22d3ee",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Pit/basin size & condition + existing pump age-HP/type (pedestal vs submersible) assessed before firm price", "Check valve + discharge line length & freeze risk + effluent route honesty", "Battery vs water-powered backup + alarm + crawl vs basement location honesty", "Power availability + water table/flood history honesty", "Permit/HOA educational only — quote before install — licensed contractor honesty when true", "No bait flat $/pump — no fake never-flood or same-day dry basement — no scare fake 24/7"],
    heroImages: [
      {
        src: "/niches/sump-pump.jpg",
        alt: "Utility pipe on concrete floor — sump pump pit, discharge, and backup assess reference",
        credit: "Miquel Parera on Unsplash",
        sourceUrl: "https://unsplash.com/photos/EBkB8zWMwIA",
        license: "unsplash",
      },
    ],
  },

  radon_mitigation: {
    niche: "radon_mitigation",
    label: "Radon mitigation",
    palette: {
      // Deep basement charcoal + radon amber/gold — #1a1625 + #d97706 — not sump_pump #164e63/#22d3ee, crawl_space_encapsulation #1c2416/#65a30d, basement_waterproofing #0f172a/#14b8a6, french_drain #1e3a4c/#b87333, retaining_wall #1e293b/#ca8a04, stump_grinding #292524/#b45309, foundation_repair #1c1917/#b45309, gutter_guards #27272a/#15803d, pergola #1a1510/#d97706 (near but purple-charcoal primary), concrete #475569/#d97706 (cool gray primary); not plumber inverted cyan/slate
      primary: "#1a1625",
      primaryForeground: "#fafafa",
      accent: "#d97706",
      accentForeground: "#fffbeb",
      background: "#fafafa",
      foreground: "#18181b",
      muted: "#f4f4f5",
      mutedForeground: "#92400e",
      border: "#d4d4d8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest assess-first radon mitigation — home age / foundation type (slab vs basement vs crawl) / existing mitigation system age / fan / piping / manometer / post-mitigation test levels / entry points / soil gas / HVAC interaction / sealed cracks / sump covers / short-term vs long-term vs continuous monitor test-first before mitigation design / suction pit vs crawl membrane fan / discharge height & neighbor setbacks / electrical for fan / permit-HOA educational only (not legal advice) / licensed mitigator (NRPP/NRSB or state) honesty when true; educational on EPA/action levels — not medical or legal advice; quote before install; radon mitigation product — not crawl_space_encapsulation vapor barrier, basement_waterproofing full systems, sump_pump install-only, french_drain exterior trench, foundation_repair structural, insulation attic R-value, mold_remediation (referral only), wildlife_removal (referral only), water_damage call-first, plumber general, HVAC general, pest_control",
      heroStyle: "quote-first radon mitigation LP — home age/foundation type/existing system age-fan-piping-manometer/test levels/entry points/HVAC interaction/sealed cracks/sump covers/permit-HOA chips when true, no bait flat $/system, no fake pass guaranteed or same-day certify, no scare fake 24/7",
      ctaStyle: "get a radon mitigation quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/system as Apex benchmark", "fake pass guaranteed / guaranteed zero radon claims", "fake same-day certify / same-day cure guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "medical claims about radon health risk (EPA/action levels educational only — not medical advice)", "legal advice claims (permit/HOA educational only)", "firm price before home age/foundation type slab vs basement vs crawl/existing mitigation system age/fan/piping/manometer/post-mitigation test levels/entry points/soil gas/HVAC interaction/sealed cracks/sump covers/test type short vs long vs continuous/suction vs membrane/discharge height/neighbor setbacks/electrical/permit-HOA assessment", "claiming licensed mitigator / NRPP/NRSB or state radon cert when not true", "impersonating crawl_space_encapsulation vapor barrier", "impersonating basement_waterproofing full systems", "impersonating sump_pump install-only", "impersonating french_drain exterior yard trench", "impersonating foundation_repair structural", "impersonating insulation attic R-value", "impersonating mold_remediation — referral only", "impersonating wildlife_removal — referral only", "impersonating water_damage call-first emergency", "impersonating plumber general service", "impersonating HVAC general / duct work", "impersonating pest_control"],
    },
    cssVars: {
      "--theme-primary": "#1a1625",
      "--theme-primary-fg": "#fafafa",
      "--theme-accent": "#d97706",
      "--theme-bg": "#fafafa",
      "--theme-fg": "#18181b",
    },
    trustBadges: ["Home age + foundation type (slab vs basement vs crawl) assessed before firm price", "Existing system age / fan / piping / manometer + post-mitigation test levels honesty", "Entry points / soil gas / HVAC interaction / sealed cracks / sump covers honesty", "Test-first (short-term / long-term / continuous) before mitigation design", "Permit/HOA educational only — quote before install — licensed mitigator honesty when true", "No bait flat $/system — no fake pass guaranteed or same-day certify — no scare fake 24/7 — EPA/action levels educational only (not medical/legal advice)"],
    heroImages: [
      {
        src: "/niches/radon-mitigation.jpg",
        alt: "Ventilation pipe / discharge stack reference for radon mitigation system design",
        credit: "Mitchell Luo on Unsplash",
        sourceUrl: "https://unsplash.com/photos/RAliDqgJKbE",
        license: "unsplash",
      },
    ],
  },



  wildlife_removal: {
    niche: "wildlife_removal",
    label: "Wildlife removal",
    palette: {
      // Night-attic slate + lantern/caution amber — #121a2b + #f59e0b — primary changed from old #79 #0f172a which collided with basement_waterproofing #0f172a/#14b8a6; distinct from radon_mitigation #1a1625/#d97706, pest_control lime, tree_service, stump_grinding #292524/#b45309, junk_removal, mold_remediation, water_damage, crawl_space_encapsulation #1c2416/#65a30d, sump_pump #164e63/#22d3ee, french_drain #1e3a4c/#b87333, retaining_wall #1e293b/#ca8a04, foundation_repair #1c1917/#b45309
      primary: "#121a2b",
      primaryForeground: "#f8fafc",
      accent: "#f59e0b",
      accentForeground: "#422006",
      background: "#fafaf9",
      foreground: "#0f172a",
      muted: "#fef3c7",
      mutedForeground: "#92400e",
      border: "#fde68a",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest assess-first wildlife removal / exclusion (attic-crawl critters — not pest_control spray) — species ID / entry points / attic-crawl access / exclusion vs live-trap vs one-way door / cleanup-sanitation need / seasonal nesting / local permit-wildlife rehab educational only (not legal advice) / licensed wildlife control honesty when true; quote before trap/exclude; wildlife removal product — not pest_control insects call-first spray programs, tree_service storm, stump_grinding, junk_removal haul, mold_remediation (referral only), water_damage call-first, handyman, crawl_space_encapsulation vapor barrier, radon_mitigation install (referral only), basement_waterproofing full systems (referral only), sump_pump install-only; structural repair / mold remediation / full waterproofing / radon install / pest_control spray programs referral only",
      heroStyle: "quote-first wildlife removal LP — species/entry/attic-crawl access/exclusion vs trap vs one-way door/cleanup/seasonal nesting/permit-rehab chips when true, no bait flat $/animal, no fake same-day guarantee, no scare fake 24/7",
      ctaStyle: "get a wildlife removal quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/animal or $/attic as Apex benchmark", "fake same-day guaranteed catch for every species", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before species ID/entry points/attic-crawl access/exclusion vs live-trap vs one-way door/cleanup-sanitation/seasonal nesting/permit-rehab assessment", "claiming licensed/insured/state wildlife permit when not true", "legal advice on local wildlife laws — educational only", "impersonating pest_control insects/general pests spray programs call-first", "impersonating tree_service storm", "impersonating stump_grinding", "impersonating junk_removal haul", "impersonating mold_remediation — referral only", "impersonating water_damage call-first emergency", "impersonating handyman general", "impersonating crawl_space_encapsulation vapor barrier", "impersonating radon_mitigation install — referral only", "impersonating basement_waterproofing full systems — referral only", "impersonating sump_pump install-only"],
    },
    cssVars: {
      "--theme-primary": "#121a2b",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#f59e0b",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Species ID + entry points + attic/crawl access assessed before firm price", "Exclusion vs live-trap vs one-way door honesty — quote before trap/exclude", "Cleanup/sanitation + seasonal nesting honesty", "Local permit/wildlife rehab educational only — not legal advice", "Licensed wildlife control honesty when true — structural/mold/waterproofing/radon/pest spray referral only", "No bait flat $/animal — no fake same-day guarantee — no scare fake 24/7"],
    heroImages: [
      {
        src: "/niches/wildlife-removal.jpg",
        alt: "Raccoon sitting on a residential roof near attic entry — wildlife exclusion reference",
        credit: "Pascal on Unsplash",
        sourceUrl: "https://unsplash.com/photos/NqcZoF6BFkw",
        license: "unsplash",
      },
    ],
  },



  septic_pumping: {
    niche: "septic_pumping",
    label: "Septic pumping",
    palette: {
      // Earthy tank-slate + soft algae/moss — #252e2a + #86a373 — not wildlife_removal #121a2b/#f59e0b, radon_mitigation #1a1625/#d97706, sump_pump #164e63/#22d3ee, crawl_space_encapsulation #1c2416/#65a30d, basement_waterproofing #0f172a/#14b8a6, grease_trap #141c26/#a68b4b, plumber cyan #22d3ee/#164e63, water_damage #dc2626/#0c4a6e, slab_leak #475569/#06b6d4, junk_removal #a3e635/#1e293b, foundation #1c1917/#b45309, epoxy #0c0a09/#0d9488, landscaping #2f4a35/#a67c52
      primary: "#252e2a",
      primaryForeground: "#f4f7f4",
      accent: "#86a373",
      accentForeground: "#142018",
      background: "#f7faf7",
      foreground: "#1a221c",
      muted: "#e4ebe3",
      mutedForeground: "#4d5c50",
      border: "#c9d4c6",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest tank size / access / last pump date / system type (tank vs aerobic) / distance / after-hours schedule assess-first for residential septic pumping, quote before pump — septic pump-outs only, not plumber emergencies, not slab leak detection, not water damage restoration, not junk removal hauling, not restaurant grease trap FOG cleaning; local septic rules educational only (not legal advice); licensed or permitted when true",
      heroStyle: "quote-first septic pumping LP — tank-size/access/last-pump-date/system-type/distance/after-hours chips when true, no bait flat $/tank, no fake same-day clear, septic rules educational only",
      ctaStyle: "get a septic pumping quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/tank as Apex benchmark", "fake same-day clear guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before tank size/access/last pump date/system type/distance/after-hours schedule assessment", "plumber emergency confusion", "slab leak detection confusion", "water damage restoration confusion", "junk removal hauling confusion", "grease trap FOG cleaning confusion", "scare fake emergency urgency as septic sales", "legal advice on local septic rules"],
    },
    cssVars: {
      "--theme-primary": "#252e2a",
      "--theme-primary-fg": "#f4f7f4",
      "--theme-accent": "#86a373",
      "--theme-bg": "#f7faf7",
      "--theme-fg": "#1a221c",
    },
    trustBadges: ["Tank size/access/last pump date/system type/distance assessed before firm price", "Quote before pump — tank vs aerobic honesty", "Local septic rules educational only — not legal advice; licensed/permitted when true", "No bait flat $/tank — not plumber, slab leak, water damage, junk removal, or grease trap FOG"],
    heroImages: [
      {
        src: "/niches/septic-pumping.jpg",
        alt: "Rural residential house with a large lawn — septic tank access and pump-out assess before quote",
        credit: "Unsplash contributor on Unsplash",
        sourceUrl: "https://unsplash.com/photos/yCmA1T4Y3r4",
        license: "unsplash",
      },
    ],
  },



  grease_trap_cleaning: {
    niche: "grease_trap_cleaning",
    label: "Grease trap cleaning",
    palette: {
      // FOG interceptor deep slate-ink + muted trap brass — #141c26 + #a68b4b — not septic_pumping #252e2a/#86a373, wildlife_removal #121a2b/#f59e0b, radon #1a1625/#d97706, kitchen_hood #171412/#b87333, dryer_vent #292524/#f59e0b, duct_cleaning #334155/#14b8a6, foundation #1c1917/#b45309, janitorial teal, fire_smoke #b91c1c/#1c1917, hvac sky/ocean, chimney #1f1a17/#c2410c, appliance_repair #1e293b/#ea580c, epoxy #0c0a09/#0d9488, pressure_washing sky, dumpster #1f1b16/#eab308, porta_potty #2c3542/#5eead4, junk_removal lime
      primary: "#141c26",
      primaryForeground: "#f8fafc",
      accent: "#a68b4b",
      accentForeground: "#0f172a",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#ebe6da",
      mutedForeground: "#5c5346",
      border: "#d4cbb8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest trap size / FOG load / indoor vs outdoor / interceptor type / access / pumping frequency / restaurant after-hours schedule assess-first for commercial grease trap and FOG interceptor cleaning, quote before pump — grease traps only, not kitchen hood exhaust cleaning, not HVAC air duct cleaning, not general janitorial mop work, not pressure washing, not residential septic pumping, not dumpster or porta potty rental, not plumber emergencies, not junk removal hauling; local FOG / wastewater rules educational only (not legal advice); licensed or permitted when true",
      heroStyle: "quote-first grease trap cleaning LP — trap-size/FOG-load/indoor-outdoor/interceptor-type/access/pumping-frequency/after-hours chips when true, no bait flat $/trap, no fake same-day clear, FOG/wastewater educational only",
      ctaStyle: "get a grease trap cleaning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/trap as Apex benchmark", "fake same-day clear guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before trap size/FOG load/indoor vs outdoor/interceptor type/access/pumping frequency/after-hours schedule assessment", "kitchen hood exhaust cleaning confusion", "HVAC air duct cleaning confusion", "janitorial mop / floor cleaning confusion", "pressure washing confusion", "septic pumping confusion", "dumpster rental confusion", "porta potty rental confusion", "plumber emergency confusion", "junk removal hauling confusion", "scare fake emergency urgency as grease-trap sales", "legal advice on FOG / wastewater rules"],
    },
    cssVars: {
      "--theme-primary": "#141c26",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#a68b4b",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Trap size/FOG load/indoor vs outdoor/interceptor type/access assessed before firm price", "Quote before pump — after-hours schedule honesty", "Local FOG / wastewater rules educational only — not legal advice; licensed/permitted when true", "No bait flat $/trap — not kitchen hood, HVAC duct, janitorial, septic, dumpster, or porta potty"],
    heroImages: [
      {
        src: "/niches/grease-trap-cleaning.jpg",
        alt: "Chef working a commercial restaurant kitchen line — FOG grease trap and interceptor cleaning assess before quote",
        credit: "Louis Hansel on Unsplash",
        sourceUrl: "https://unsplash.com/photos/ce391730fb2c",
        license: "unsplash",
      },
    ],
  },




  kitchen_hood_cleaning: {
    niche: "kitchen_hood_cleaning",
    label: "Kitchen hood cleaning",
    palette: {
      // Commercial-kitchen grease charcoal + copper brass — deep grease charcoal #171412 + hood copper-brass #b87333 — not grease_trap_cleaning #141c26/#a68b4b, septic_pumping #252e2a/#86a373, wildlife_removal #121a2b/#f59e0b, dryer_vent #292524/#f59e0b, duct_cleaning #334155/#14b8a6, foundation #1c1917/#b45309, janitorial teal, fire_smoke #b91c1c/#1c1917, hvac sky/ocean, chimney #1f1a17/#c2410c, appliance_repair #1e293b/#ea580c, epoxy #0c0a09/#0d9488, pressure_washing sky, junk_removal lime
      primary: "#171412",
      primaryForeground: "#fafaf9",
      accent: "#b87333",
      accentForeground: "#1c1917",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#f5e6d3",
      mutedForeground: "#78350f",
      border: "#e7d3b8",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest hood type (canopy vs island vs pizza oven) / grease load / stories or roof access / fan & duct path / after-hours schedule assess-first for commercial restaurant kitchen exhaust hood cleaning, quote before clean — grease hoods only, not grease trap / FOG interceptor pumping, not HVAC air duct cleaning, not dryer vent cleaning, not general janitorial mop work, not pressure washing, not fire/smoke restoration, not appliance repair, not HVAC install, not chimney sweeping, not septic pumping, not plumber emergencies, not junk removal hauling; NFPA-96 / fire-code educational only (no scare fake emergency); licensed or certified when true",
      heroStyle: "quote-first kitchen hood cleaning LP — hood-type/grease-load/roof-access/fan-duct/after-hours chips when true, no bait flat $/hood, no fake same-day clear, NFPA-96 educational only",
      ctaStyle: "get a kitchen hood cleaning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/hood as Apex benchmark", "fake same-day clear guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before hood type/grease load/stories-or-roof access/fan & duct path/after-hours schedule assessment", "grease trap / FOG interceptor cleaning confusion", "HVAC air duct cleaning confusion", "dryer vent cleaning confusion", "janitorial floor cleaning confusion", "pressure washing confusion", "fire/smoke restoration confusion", "appliance repair confusion", "HVAC install confusion", "chimney sweeping confusion", "septic pumping confusion", "plumber emergency confusion", "junk removal hauling confusion", "scare fake fire emergency / fake emergency urgency as kitchen-hood sales"],
    },
    cssVars: {
      "--theme-primary": "#171412",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#b87333",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Hood type/grease load/roof access/fan & duct path assessed before firm price", "Quote before clean — after-hours schedule honesty", "NFPA-96 / fire-code educational only — not scare fake emergency; licensed/certified when true", "No bait flat $/hood — not grease trap, HVAC duct, dryer vent, janitorial, or chimney"],
    heroImages: [
      {
        src: "/niches/kitchen-hood-cleaning.jpg",
        alt: "Chef plating in a commercial restaurant kitchen — exhaust hood grease cleaning assess before quote",
        credit: "Louis Hansel on Unsplash",
        sourceUrl: "https://unsplash.com/photos/man-preparing-food-v3OlBE6-fhU",
        license: "unsplash",
      },
    ],
  },




  dryer_vent_cleaning: {
    niche: "dryer_vent_cleaning",
    label: "Dryer vent cleaning",
    palette: {
      // Lint-safe warm slate + hazard-amber — deep lint/duct charcoal-slate #292524 + warm safety amber #f59e0b — pair unique vs stump_grinding #292524/#b45309 (same primary, different accent), wildlife_removal #121a2b/#f59e0b (same accent, different primary), generator #0f172a/#f59e0b; not kitchen_hood_cleaning #171412/#b87333, grease_trap_cleaning #141c26/#a68b4b, duct_cleaning #334155/#14b8a6, chimney #1f1a17/#c2410c, hvac sky/ocean, fire_smoke #b91c1c/#1c1917, appliance_repair #1e293b/#ea580c, janitorial teal, pressure_washing sky, septic_pumping #252e2a/#86a373
      primary: "#292524",
      primaryForeground: "#fafaf9",
      accent: "#f59e0b",
      accentForeground: "#1c1917",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#fef3c7",
      mutedForeground: "#92400e",
      border: "#fde68a",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest stories/floors / vent length / exterior termination access / roof vs wall / bird nest/lint load / gas vs electric dryer / crawl or attic access / weather assess-first for dryer exhaust vent cleaning, quote before clean — dryer exhaust vents only, not HVAC air duct cleaning, not chimney sweeping, not commercial kitchen hood cleaning, not grease trap / FOG interceptor pumping, not general janitorial mop work, not pressure washing, not fire/smoke restoration, not appliance repair (dryer machine), not HVAC install, not septic pumping; fire-risk / fire-code educational only (no scare fake emergency); licensed when true",
      heroStyle: "quote-first dryer vent cleaning LP — stories/floors/vent-length/termination/roof-vs-wall/lint-load/gas-vs-electric/access chips when true, no bait flat $/vent, no fake same-day clear, fire-risk educational only",
      ctaStyle: "get a dryer vent cleaning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/vent as Apex benchmark", "fake same-day clear guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before stories/floors/vent length/exterior termination access/roof-vs-wall/bird nest/lint load/gas-vs-electric/crawl-or-attic access/weather assessment", "HVAC air duct cleaning confusion", "chimney sweeping confusion", "kitchen hood cleaning confusion", "grease trap / FOG interceptor cleaning confusion", "janitorial floor cleaning confusion", "pressure washing confusion", "fire/smoke restoration confusion", "appliance repair / dryer machine repair confusion", "HVAC install confusion", "septic pumping confusion", "scare fake fire emergency / fake emergency urgency as dryer-vent sales"],
    },
    cssVars: {
      "--theme-primary": "#292524",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#f59e0b",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Stories/floors/vent length/termination/access assessed before firm price", "Quote before clean — gas vs electric & roof vs wall honesty", "Fire-risk / fire-code educational only — not scare fake emergency; licensed when true", "No bait flat $/vent — not HVAC duct, chimney, kitchen hood, grease trap, or appliance repair"],
    heroImages: [
      {
        src: "/niches/dryer-vent-cleaning.jpg",
        alt: "Laundry room with stacked washer and dryer — dryer exhaust vent cleaning assess before quote",
        credit: "Lisa Anna on Unsplash",
        sourceUrl: "https://unsplash.com/photos/a-laundry-room-with-a-washer-and-dryer-49NwSDtEsuw",
        license: "unsplash",
      },
    ],
  },





  duct_cleaning: {
    niche: "duct_cleaning",
    label: "Air duct cleaning",
    palette: {
      // Cool duct-metal slate + soft HVAC teal — #334155 + #14b8a6 — pair unique vs basement_waterproofing #0f172a/#14b8a6 (same accent, different primary), epoxy #0c0a09/#0d9488, sump_pump #164e63/#22d3ee; not dryer_vent_cleaning #292524/#f59e0b, kitchen_hood_cleaning #171412/#b87333, grease_trap_cleaning #141c26/#a68b4b, chimney #1f1a17/#c2410c, hvac sky/ocean, fire_smoke #b91c1c/#1c1917, appliance_repair #1e293b/#ea580c, janitorial soft trust, pressure_washing sky, mold_remediation, insulation
      primary: "#334155",
      primaryForeground: "#f8fafc",
      accent: "#14b8a6",
      accentForeground: "#042f2e",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest home size / system age / supply-return access / contamination load assess-first for residential and light-commercial HVAC air duct cleaning, quote before clean — whole-home supply/return ducts only, not dryer exhaust vent cleaning, not chimney sweeping, not commercial kitchen hood cleaning, not grease trap / FOG interceptor pumping, not HVAC install or repair, not mold remediation, not fire/smoke restoration, not general janitorial, not pressure washing, not appliance repair; indoor-air educational only (no medical cure claims); licensed when true",
      heroStyle: "quote-first air duct cleaning LP — home-size/system-age/access/contamination chips when true, no bait flat per-vent, no fake same-day sanitize, not medical/mold claims",
      ctaStyle: "get an air duct cleaning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat per-vent or whole-house fees as Apex benchmark", "fake same-day sanitize guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before home size/system age/supply-return access/contamination assessment", "medical cure or mold remediation claims", "guarantee indoor air quality medical outcomes", "dryer vent cleaning confusion", "chimney sweeping confusion", "kitchen hood cleaning confusion", "grease trap / FOG interceptor cleaning confusion", "HVAC install/repair confusion", "fire/smoke restoration confusion", "janitorial floor cleaning confusion", "pressure washing confusion", "appliance repair confusion"],
    },
    cssVars: {
      "--theme-primary": "#334155",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#14b8a6",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Home size/system age/access/contamination assessed before firm price", "Quote before clean — not medical or mold claims", "No bait flat per-vent fees", "Not dryer vent, chimney, kitchen hood, grease trap, or HVAC install"],
    heroImages: [
      {
        src: "/niches/duct-cleaning.jpg",
        alt: "Close photography of industrial metal air duct and vent hardware — air duct cleaning assess before quote",
        credit: "Taylor Vick on Unsplash",
        sourceUrl: "https://unsplash.com/photos/qVXFewdVWn4",
        license: "unsplash",
      },
    ],
  },




  snow_removal: {
    niche: "snow_removal",
    label: "Snow removal",
    palette: {
      // Deep winter night slate + ice/sky — #0c1929 + #38bdf8 — pair unique vs landscaping forest green, pressure_washing sky-spray, irrigation #0f1f17/#2dd4bf, concrete amber, junk_removal charcoal/lime, tree_service call_first, duct_cleaning #334155/#14b8a6, basement_waterproofing #0f172a/#14b8a6, sump_pump #164e63/#22d3ee, wildlife_removal #121a2b/#f59e0b, handyman hybrid
      primary: "#0c1929",
      primaryForeground: "#f0f9ff",
      accent: "#38bdf8",
      accentForeground: "#082f49",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest driveway/sidewalk/lot sqft or linear-ft / storm depth / ice melt vs plow vs shovel / access/parking / recurring contract vs one-time storm assess-first for residential and commercial snow removal, quote before plow — equipment honesty (plow truck / skid / blower capacity when true); not landscaping mow/beds, not pressure washing, not concrete flatwork, not irrigation, not junk removal, not tree service storm work, not handyman; local ordinance/HOA educational only (not legal advice)",
      heroStyle: "quote-first snow removal LP — sqft/linear-ft/storm-depth/ice-melt-vs-plow chips when true, no bait flat $/push, no fake same-day clear guarantee",
      ctaStyle: "get a snow removal quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/push or per-driveway fees as Apex benchmark", "fake same-day clear guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before driveway/sidewalk/lot size/storm depth/access assessment", "legal advice on ordinance or HOA rules", "landscaping mow/beds confusion", "pressure washing confusion", "concrete flatwork confusion", "irrigation confusion", "junk removal confusion", "tree service confusion", "handyman confusion"],
    },
    cssVars: {
      "--theme-primary": "#0c1929",
      "--theme-primary-fg": "#f0f9ff",
      "--theme-accent": "#38bdf8",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Driveway/sidewalk/lot size & storm depth assessed before firm price", "Quote before plow — ice melt vs plow honesty", "No bait flat $/push fees", "Not landscaping, pressure washing, concrete, irrigation, junk, or tree service"],
    heroImages: [
      {
        src: "/niches/snow-removal.jpg",
        alt: "Man pushing snowblower to clear snow at a residential driveway — snow removal assess before quote",
        credit: "Stephen H on Unsplash",
        sourceUrl: "https://unsplash.com/photos/53ozS5kjXOQ",
        license: "unsplash",
      },
    ],
  },



  lawn_care: {
    niche: "lawn_care",
    label: "Lawn care",
    palette: {
      // Fresh lawn green + soft lime/sun — #14532d + #a3e635 — pair unique vs landscaping forest #2f4a35/earth, snow frost #0c1929/#38bdf8, irrigation #0f1f17/#2dd4bf, pressure_washing sky-spray, junk_removal charcoal/lime, tree_service call_first, stump_grinding bark/amber, handyman hybrid
      primary: "#14532d",
      primaryForeground: "#f7fee7",
      accent: "#a3e635",
      accentForeground: "#14532d",
      background: "#f7fee7",
      foreground: "#14532d",
      muted: "#ecfccb",
      mutedForeground: "#3f6212",
      border: "#d9f99d",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest lot size/turf condition/access/obstacles/mow frequency (weekly/biweekly) assess-first for residential and commercial mow / lawn care, quote before schedule — not landscaping beds/plantings/design, not irrigation, not snow removal, not tree service, not stump grinding, not pressure washing, not junk removal, not handyman",
      heroStyle: "quote-first lawn care LP — lot size/turf/access/obstacles/frequency chips when true, no bait flat $/visit or $/acre, no overnight makeover / fake same-day",
      ctaStyle: "get a lawn care quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/visit or $/acre fees as Apex benchmark", "fake same-day guarantees", "overnight lawn makeover promises", "competitor brand cloning", "fake 24/7", "firm price before lot size/turf condition/access/obstacles/frequency assessment", "landscaping beds/plantings/design confusion", "irrigation confusion", "snow removal confusion", "tree service confusion", "stump grinding confusion", "pressure washing confusion", "junk removal confusion", "handyman confusion"],
    },
    cssVars: {
      "--theme-primary": "#14532d",
      "--theme-primary-fg": "#f7fee7",
      "--theme-accent": "#a3e635",
      "--theme-bg": "#f7fee7",
      "--theme-fg": "#14532d",
    },
    trustBadges: ["Lot size/turf condition/access/obstacles/frequency assessed before firm price", "Quote before schedule", "Residential & commercial mow honesty — no overnight makeovers", "Not landscaping, irrigation, snow removal, tree service, stump grinding, pressure washing, junk, or handyman"],
    heroImages: [
      {
        src: "/niches/lawn-care.jpg",
        alt: "Person mowing a residential lawn with a push mower on a sunny day — lawn care assess before quote",
        credit: "arh Lee on Unsplash",
        sourceUrl: "https://unsplash.com/photos/zFdZJp_hpKo",
        license: "unsplash",
      },
    ],
  },




  roof_cleaning: {
    niche: "roof_cleaning",
    label: "Roof cleaning",
    palette: {
      // Cool wet-roof slate/charcoal + soft algae/moss green — #1e293b + #65a30d — unique vs pressure_washing sky-spray, gutter zinc/copper, lawn lime #14532d/#a3e635, snow frost #0c1929/#38bdf8, roofing call_first, solar, siding, chimney, window_cleaning
      primary: "#1e293b",
      primaryForeground: "#f8fafc",
      accent: "#65a30d",
      accentForeground: "#f7fee7",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#ecfccb",
      mutedForeground: "#3f6212",
      border: "#d9f99d",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest stories/access/algae-vs-granule-loss/soft-wash-vs-pressure/weather assess-first for residential soft-wash roof cleaning, quote before wash — soft-wash only, not gutter cleaning, not full roof replacement, not pressure washing as default, not lawn care, not solar install, not chimney, not siding, not window cleaning",
      heroStyle: "quote-first roof soft-wash LP — stories/access/algae chips when true, no bait flat $/sqft, no fake same-day, pressure can damage granules",
      ctaStyle: "get a roof cleaning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft as Apex benchmark", "fake same-day guarantees", "competitor brand cloning", "fake 24/7", "firm price before stories/access/algae-vs-granule-loss/soft-wash-vs-pressure/weather assessment", "pressure-wash roofs as default", "gutter cleaning as roof cleaning", "full roof replacement claims as soft-wash", "lawn care confusion", "solar confusion", "chimney confusion", "siding confusion", "window cleaning confusion"],
    },
    cssVars: {
      "--theme-primary": "#1e293b",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#65a30d",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Stories/access/algae vs granule loss/soft-wash vs pressure/weather assessed before firm price", "Quote before wash", "Soft-wash honesty — pressure can damage granules", "Not gutter cleaning, roof replacement, pressure washing default, lawn care, solar, chimney, siding, or window cleaning", "No bait flat $/sqft or fake same-day"],
    heroImages: [
      {
        src: "/niches/roof-cleaning.jpg",
        alt: "Mossy residential roof tiles needing soft-wash cleaning — roof cleaning assess before quote",
        credit: "Alvaro Araoz on Unsplash",
        sourceUrl: "https://unsplash.com/photos/ug4M0QlUhiM",
        license: "unsplash",
      },
    ],
  },





  sealcoating: {
    niche: "sealcoating",
    label: "Sealcoating",
    palette: {
      // Warm asphalt charcoal + amber/orange road-crew — #14110f + #ea580c — unique PAIR vs patio_cover #1c1917/#b45309 (shifted primary off patio charcoal), kitchen_hood #171412/#b87333, epoxy #0c0a09/#0d9488, appliance_repair #1e293b/#ea580c, roofing #ea580c/#292524, roof_cleaning #1e293b/#65a30d, lawn_care #14532d/#a3e635, snow #0c1929/#38bdf8, pressure_washing sky-spray, concrete cool-slate+amber, asphalt paving confusion
      primary: "#14110f",
      primaryForeground: "#fafaf9",
      accent: "#ea580c",
      accentForeground: "#fff7ed",
      background: "#fafaf9",
      foreground: "#14110f",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/access/cracks/oil stains/weather/cure time assess-first for asphalt driveway and parking-lot sealcoating, quote before coat — sealcoat only, not full paving or concrete resurfacing; also not pressure washing, roof cleaning, epoxy flooring, lawn care",
      heroStyle: "quote-first sealcoating LP — driveway/parking-lot chips when true, no bait flat $/sqft, no fake same-day drive-on",
      ctaStyle: "get a sealcoating quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft as Apex benchmark", "fake same-day drive-on guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/access/cracks/oil stains/weather/cure assessment", "full paving or concrete resurfacing claims as sealcoat", "pressure washing confusion", "roof cleaning confusion", "epoxy flooring confusion", "lawn care confusion", "asphalt paving confusion"],
    },
    cssVars: {
      "--theme-primary": "#14110f",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#ea580c",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#14110f",
    },
    trustBadges: ["Sqft/access/cracks/oil stains/weather/cure assessed before firm price", "Quote before coat", "Sealcoat only — not full paving or concrete resurfacing", "Not pressure washing, roof cleaning, epoxy flooring, or lawn care", "No bait flat $/sqft or fake same-day drive-on"],
    heroImages: [
      {
        src: "/niches/sealcoating.jpg",
        alt: "Fresh asphalt parking lot surface after rain with painted lines — sealcoating assess before quote",
        credit: "Nikhilesh Boppana on Unsplash",
        sourceUrl: "https://unsplash.com/photos/LsCshtzQCUU",
        license: "unsplash",
      },
    ],
  },




  asphalt_paving: {
    niche: "asphalt_paving",
    label: "Asphalt paving",
    palette: {
      // Wet-asphalt charcoal + traffic-amber — #1c1917 + #f59e0b — unique PAIR vs sealcoating #14110f/#ea580c, patio_cover #1c1917/#b45309 (accent differentiates), epoxy #0c0a09/#0d9488, concrete cool-slate+amber, roof_cleaning #1e293b/#65a30d, lawn_care #14532d/#a3e635, pressure_washing sky-spray
      primary: "#1c1917",
      primaryForeground: "#fafaf9",
      accent: "#f59e0b",
      accentForeground: "#451a03",
      background: "#fafaf9",
      foreground: "#1c1917",
      muted: "#e7e5e4",
      mutedForeground: "#57534e",
      border: "#d6d3d1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest sqft/linear-ft/thickness/existing condition mill-overlay-full-replace/access/equipment/weather-cure/base-prep assess-first for driveway and parking-lot asphalt paving, quote before mill/overlay/pave — pave/overlay/mill, not sealcoat-only coat, concrete flatwork, epoxy flooring, pressure washing, roof cleaning, or lawn care",
      heroStyle: "quote-first asphalt paving LP — driveway/parking-lot mill/overlay/replace chips when true, no bait flat $/sqft or $/ton, no fake same-day pave",
      ctaStyle: "get an asphalt paving quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/sqft or $/ton as Apex benchmark", "fake same-day pave guarantees", "competitor brand cloning", "fake 24/7", "firm price before sqft/thickness/condition/access/equipment/weather/base-prep assessment", "sealcoating-only claims as paving", "concrete flatwork confusion", "epoxy flooring confusion", "pressure washing confusion", "roof cleaning confusion", "lawn care confusion"],
    },
    cssVars: {
      "--theme-primary": "#1c1917",
      "--theme-primary-fg": "#fafaf9",
      "--theme-accent": "#f59e0b",
      "--theme-bg": "#fafaf9",
      "--theme-fg": "#1c1917",
    },
    trustBadges: ["Sqft/thickness/condition/access/weather/base prep assessed before firm price", "Quote before mill, overlay, or pave", "Pave/overlay/mill — not sealcoat-only or concrete flatwork", "Not epoxy flooring, pressure washing, roof cleaning, or lawn care", "No bait flat $/sqft or $/ton — HOA/permit honesty when true"],
    heroImages: [
      {
        src: "/niches/asphalt-paving.jpg",
        alt: "Workers paving a road with an asphalt paving machine",
        credit: "Brian J. Tromp on Unsplash",
        sourceUrl: "https://unsplash.com/photos/AYak7Oq4Ejw",
        license: "unsplash",
      },
    ],
  },




  line_striping: {
    niche: "line_striping",
    label: "Line striping",
    palette: {
      // Deep marking charcoal + safety-yellow CTA — #0f172a + #eab308 — unique PAIR vs asphalt_paving #1c1917/#f59e0b, sealcoating #14110f/#ea580c, concrete cool-slate+amber
      primary: "#0f172a",
      primaryForeground: "#f8fafc",
      accent: "#eab308",
      accentForeground: "#422006",
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#e2e8f0",
      mutedForeground: "#475569",
      border: "#cbd5e1",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest linear-ft/stall-count/surface condition fresh-asphalt-vs-faded-oil/paint-vs-thermoplastic/layout arrows-crosswalks-ADA/access/weather-cure/striping-over-new-sealcoat-pave wait assess-first for parking-lot and road line striping & pavement markings, quote before stripe — markings only, not mill/overlay/pave, sealcoat-only, or concrete flatwork",
      heroStyle: "quote-first line striping LP — stall/lf/layout/ADA chips when true, no bait flat $/lf or $/stall, no fake same-day striping",
      ctaStyle: "get a line striping quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf or $/stall as Apex benchmark", "fake same-day striping guarantees", "competitor brand cloning", "fake 24/7", "firm price before linear-ft/stall/surface/paint-vs-thermoplastic/layout/ADA/access/weather assessment", "asphalt paving mill/overlay claims as striping", "sealcoating-only claims as striping", "concrete flatwork confusion"],
    },
    cssVars: {
      "--theme-primary": "#0f172a",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#eab308",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Linear-ft/stalls/surface/layout/ADA/access/weather assessed before firm price", "Quote before stripe — paint or thermoplastic after assess", "Markings only — not pave, sealcoat-only, or concrete flatwork", "No bait flat $/lf or $/stall — HOA/permit/municipal honesty when true"],
    heroImages: [
      {
        src: "/niches/line-striping.jpg",
        alt: "Parking lot asphalt with painted white stall lines",
        credit: "ALEKSEY ALYPOV on Unsplash",
        sourceUrl: "https://unsplash.com/photos/fFSum8_ZOLY",
        license: "unsplash",
      },
    ],
  },


  crack_sealing: {
    niche: "crack_sealing",
    label: "Crack sealing",
    palette: {
      // Near-black crack charcoal + bright hot-pour amber — #171717 + #fbbf24 — unique PAIR vs line_striping #0f172a/#eab308, asphalt_paving #1c1917/#f59e0b, sealcoating #14110f/#ea580c
      primary: "#171717",
      primaryForeground: "#fafafa",
      accent: "#fbbf24",
      accentForeground: "#422006",
      background: "#fafafa",
      foreground: "#171717",
      muted: "#e5e5e5",
      mutedForeground: "#525252",
      border: "#d4d4d4",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "honest linear-ft of cracks/width-depth hairline-vs-alligator/surface age fresh-pave-vs-oxidized/routing-cleaning before fill/hot-pour-vs-cold-pour when true/weather-cure/traffic-reopen/whether sealcoat-after referral-or-pave-needed-instead/access-lot-size assess-first for asphalt driveway & parking-lot crack fill & seal, quote before fill — crack fill/seal only, not full pave, sealcoat-only blanket, line striping, or concrete flatwork",
      heroStyle: "quote-first crack sealing LP — lf/width-depth/surface/method chips when true, no bait flat $/lf, no fake same-day drive-on",
      ctaStyle: "get a crack sealing quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/lf as Apex benchmark", "fake same-day crack fill or drive-on guarantees", "competitor brand cloning", "fake 24/7", "firm price before linear-ft/width-depth/surface/routing/hot-pour-vs-cold-pour/weather/access assessment", "full asphalt paving mill/overlay claims as crack sealing", "sealcoating-only blanket claims as crack sealing", "line striping / pavement marking confusion", "concrete flatwork confusion"],
    },
    cssVars: {
      "--theme-primary": "#171717",
      "--theme-primary-fg": "#fafafa",
      "--theme-accent": "#fbbf24",
      "--theme-bg": "#fafafa",
      "--theme-fg": "#171717",
    },
    trustBadges: ["Linear-ft/width-depth/surface age/weather assessed before firm price", "Quote before fill — route/clean then hot-pour or cold-pour after assess", "Crack fill & seal only — not pave, sealcoat-only, striping, or concrete", "No bait flat $/lf — sealcoat-after as referral/add-on honesty when true"],
    heroImages: [
      {
        src: "/niches/crack-sealing.jpg",
        alt: "Cracked asphalt pavement on a paved road showing wear needing crack fill",
        credit: "Tim Oun on Unsplash",
        sourceUrl: "https://unsplash.com/photos/UW6F5jUfCC0",
        license: "unsplash",
      },
    ],
  },

};

export function getNicheThemeConfig(niche: string): NicheThemeConfig | undefined {
  if (niche in NICHE_THEME_CONFIGS) {
    return NICHE_THEME_CONFIGS[niche as ThemeNicheId];
  }
  return undefined;
}

export const THEME_NICHES = Object.keys(NICHE_THEME_CONFIGS) as ThemeNicheId[];
