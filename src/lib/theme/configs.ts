/**
 * Niche theme configs — templated palettes/fonts/copy tone + credited hero imagery.
 * No hardcoded business names, phones, or addresses.
 * Imagery is stock trade/job reference (Unsplash License) — not competitor brand cloning.
 *
 * Mobile-first / WCAG notes:
 * - Prefer contrast-safe primary/onPrimary pairs (aim AA: 4.5:1 body text).
 * - Keep touch targets ≥ 44px via site components; avoid tiny CTA text.
 * - Font stacks include system fallbacks for fast load (<2s target).
 * - Hero/copy tone must not use fake urgency or impersonation.
 */

export type ThemeNicheId = "hvac" | "plumber" | "salon" | "trucking" | "electrician" | "roofing" | "landscaping" | "auto_detail";

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
      heroStyle: "comfort you can schedule — clear next step",
      ctaStyle: "book a service visit",
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
      heroStyle: "fast help without the mess — clear price, clear next step",
      ctaStyle: "schedule plumbing help",
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
      heroStyle: "look your best — book with ease, no pressure",
      ctaStyle: "book an appointment",
      avoid: [...baseAvoid, "body-shaming language", "FOMO booking pressure"],
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
      primary: "#f59e0b",
      primaryForeground: "#1c1917",
      accent: "#b45309",
      accentForeground: "#fffbeb",
      background: "#fffbeb",
      foreground: "#1c1917",
      muted: "#fef3c7",
      mutedForeground: "#78350f",
      border: "#fcd34d",
    },
    fonts: {
      heading: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    copyTone: {
      voice: "direct, dependable, no-nonsense",
      heroStyle: "on-time freight you can count on",
      ctaStyle: "request a quote",
      avoid: [...baseAvoid],
    },
    cssVars: {
      "--theme-primary": "#f59e0b",
      "--theme-primary-fg": "#1c1917",
      "--theme-accent": "#b45309",
      "--theme-bg": "#fffbeb",
      "--theme-fg": "#1c1917",
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
      heroStyle: "a roof that holds — inspect, repair, replace",
      ctaStyle: "request a roof inspection",
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
      primary: "#65a30d",
      primaryForeground: "#14532d",
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
      heroStyle: "yards that look cared for — mow, mulch, maintain",
      ctaStyle: "request a yard estimate",
      avoid: [...baseAvoid, "overselling overnight makeovers"],
    },
    cssVars: {
      "--theme-primary": "#65a30d",
      "--theme-primary-fg": "#14532d",
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
};

export function getNicheThemeConfig(niche: string): NicheThemeConfig | undefined {
  if (niche in NICHE_THEME_CONFIGS) {
    return NICHE_THEME_CONFIGS[niche as ThemeNicheId];
  }
  return undefined;
}

export const THEME_NICHES = Object.keys(NICHE_THEME_CONFIGS) as ThemeNicheId[];
