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

export type ThemeNicheId = "hvac" | "plumber" | "salon" | "trucking" | "electrician" | "roofing" | "landscaping" | "auto_detail" | "cleaning" | "pest_control" | "moving" | "painting" | "garage" | "locksmith" | "janitorial";

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
   * call_first = emergency/home-service; book_first = salon/beauty;
   * hybrid = seasonal/recurring (quote vs schedule vs call).
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
      primary: "#4d7c0f",
      primaryForeground: "#f7fee7",
      accent: "#14532d",
      accentForeground: "#f7fee7",
      background: "#f7fee7",
      foreground: "#14532d",
      muted: "#d9f99d",
      mutedForeground: "#3f6212",
      border: "#bef264",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "fresh, reliable, outdoor-ready",
      heroStyle: "seasonal curb appeal — recurring care or one-off projects",
      ctaStyle: "get a lawn quote or schedule service",
      ctaPriority: "hybrid",
      avoid: [...baseAvoid, "overselling overnight makeovers"],
    },
    cssVars: {
      "--theme-primary": "#4d7c0f",
      "--theme-primary-fg": "#f7fee7",
      "--theme-accent": "#14532d",
      "--theme-bg": "#f7fee7",
      "--theme-fg": "#14532d",
    },
    heroImages: [
      {
        src: "/niches/landscaping.jpg",
        alt: "Maintained lawn and landscaping",
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
      primary: "#3b82f6",
      primaryForeground: "#eff6ff",
      accent: "#111827",
      accentForeground: "#f9fafb",
      background: "#f9fafb",
      foreground: "#111827",
      muted: "#e5e7eb",
      mutedForeground: "#4b5563",
      border: "#d1d5db",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "sharp, clean, proud of the finish",
      heroStyle: "showroom-clean without the showroom price",
      ctaStyle: "book a detail",
      ctaPriority: "book_first",
      avoid: [...baseAvoid, "fake limited-time flash sales"],
    },
    cssVars: {
      "--theme-primary": "#3b82f6",
      "--theme-primary-fg": "#eff6ff",
      "--theme-accent": "#111827",
      "--theme-bg": "#f9fafb",
      "--theme-fg": "#111827",
    },
    heroImages: [
      {
        src: "/niches/auto-detail.jpg",
        alt: "Clean car exterior detailing finish",
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
      voice: "fresh, careful, easy to trust — residential",
      heroStyle: "recurring-first home clean — weekly savings vs one-time deep clean",
      ctaStyle: "book recurring (default) or one-time",
      ctaPriority: "book_first",
      avoid: [...baseAvoid, "guilt-trip mess shaming", "emergency-orange panic chrome"],
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

};

export function getNicheThemeConfig(niche: string): NicheThemeConfig | undefined {
  if (niche in NICHE_THEME_CONFIGS) {
    return NICHE_THEME_CONFIGS[niche as ThemeNicheId];
  }
  return undefined;
}

export const THEME_NICHES = Object.keys(NICHE_THEME_CONFIGS) as ThemeNicheId[];
