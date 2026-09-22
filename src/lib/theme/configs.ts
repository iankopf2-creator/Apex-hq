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

export type ThemeNicheId = "hvac" | "plumber" | "salon" | "trucking" | "electrician" | "roofing" | "landscaping" | "auto_detail" | "cleaning" | "pest_control" | "moving" | "painting" | "garage" | "locksmith" | "janitorial" | "towing" | "water_damage" | "fire_smoke" | "mold_remediation" | "tree_service" | "slab_leak" | "junk_removal" | "pressure_washing" | "gutter_cleaning" | "window_cleaning" | "carpet_cleaning" | "appliance_repair" | "handyman" | "flooring" | "fencing" | "concrete" | "siding" | "decking" | "masonry" | "drywall" | "insulation" | "tile" | "cabinets" | "countertops" | "foundation_repair" | "solar" | "epoxy_flooring" | "grease_trap_cleaning";

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
   * quote_first = commercial janitorial / junk_removal / pressure_washing / gutter_cleaning / window_cleaning / carpet_cleaning / flooring / fencing / concrete / siding / decking / masonry / drywall / insulation / tile / cabinets / countertops / landscaping / auto_detail / foundation_repair / solar / epoxy_flooring / grease_trap_cleaning (quote primary + call beside).
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


  grease_trap_cleaning: {
    niche: "grease_trap_cleaning",
    label: "Grease trap cleaning",
    palette: {
      // FOG interceptor deep slate-ink + muted trap brass — #141c26 + #a68b4b — not kitchen_hood #171412/#b87333, dryer_vent #292524/#f59e0b, duct_cleaning #334155/#14b8a6, foundation #1c1917/#b45309, janitorial teal, fire_smoke #b91c1c/#1c1917, hvac sky/ocean, chimney #1f1a17/#c2410c, appliance_repair #1e293b/#ea580c, epoxy #0c0a09/#0d9488, pressure_washing sky
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
      voice: "honest trap size / FOG load / indoor vs outdoor / interceptor type / access / pumping frequency / restaurant after-hours schedule assess-first for commercial grease trap and FOG interceptor cleaning, quote before pump — grease traps only, not kitchen hood exhaust cleaning, not HVAC air duct cleaning, not general janitorial mop work; local FOG / wastewater rules educational only (not legal advice); licensed or permitted when true",
      heroStyle: "quote-first grease trap cleaning LP — trap-size/FOG-load/indoor-outdoor/interceptor-type/access/pumping-frequency/after-hours chips when true, no bait flat $/trap, no fake same-day clear, FOG/wastewater educational only",
      ctaStyle: "get a grease trap cleaning quote (call beside form)",
      ctaPriority: "quote_first",
      avoid: [...baseAvoid, "bait flat $/trap as Apex benchmark", "fake same-day clear guarantees", "competitor brand cloning", "fake 24/7", "scare copy / fake emergency urgency", "firm price before trap size/FOG load/indoor vs outdoor/interceptor type/access/pumping frequency/after-hours schedule assessment", "kitchen hood exhaust cleaning confusion", "HVAC air duct cleaning confusion", "janitorial mop / floor cleaning confusion", "pressure washing confusion", "scare fake emergency urgency as grease-trap sales", "legal advice on FOG / wastewater rules"],
    },
    cssVars: {
      "--theme-primary": "#141c26",
      "--theme-primary-fg": "#f8fafc",
      "--theme-accent": "#a68b4b",
      "--theme-bg": "#f8fafc",
      "--theme-fg": "#0f172a",
    },
    trustBadges: ["Trap size/FOG load/indoor vs outdoor/interceptor type/access assessed before firm price", "Quote before pump — after-hours schedule honesty", "Local FOG / wastewater rules educational only — not legal advice; licensed/permitted when true", "No bait flat $/trap — not kitchen hood exhaust, HVAC duct, or janitorial mop work"],
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



};

export function getNicheThemeConfig(niche: string): NicheThemeConfig | undefined {
  if (niche in NICHE_THEME_CONFIGS) {
    return NICHE_THEME_CONFIGS[niche as ThemeNicheId];
  }
  return undefined;
}

export const THEME_NICHES = Object.keys(NICHE_THEME_CONFIGS) as ThemeNicheId[];
