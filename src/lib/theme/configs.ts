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

export type ThemeNicheId = "hvac" | "plumber" | "salon" | "trucking";

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
      primary: "#0ea5e9",
      primaryForeground: "#0f172a",
      accent: "#0369a1",
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
      voice: "trustworthy, practical, calm",
      heroStyle: "reliability + comfort at home",
      ctaStyle: "clear service booking",
      avoid: [...baseAvoid, "scare tactics about broken AC"],
    },
    cssVars: {
      "--theme-primary": "#0ea5e9",
      "--theme-primary-fg": "#0f172a",
      "--theme-accent": "#0369a1",
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
      primary: "#06b6d4",
      primaryForeground: "#083344",
      accent: "#0e7490",
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
      heroStyle: "fast help without the mess",
      ctaStyle: "schedule plumbing help",
      avoid: [...baseAvoid],
    },
    cssVars: {
      "--theme-primary": "#06b6d4",
      "--theme-primary-fg": "#083344",
      "--theme-accent": "#0e7490",
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
      primary: "#f43f5e",
      primaryForeground: "#fff1f2",
      accent: "#be123c",
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
      heroStyle: "look your best — book with ease",
      ctaStyle: "book an appointment",
      avoid: [...baseAvoid, "body-shaming language"],
    },
    cssVars: {
      "--theme-primary": "#f43f5e",
      "--theme-primary-fg": "#fff1f2",
      "--theme-accent": "#be123c",
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
};

export function getNicheThemeConfig(niche: string): NicheThemeConfig | undefined {
  if (niche in NICHE_THEME_CONFIGS) {
    return NICHE_THEME_CONFIGS[niche as ThemeNicheId];
  }
  return undefined;
}

export const THEME_NICHES = Object.keys(NICHE_THEME_CONFIGS) as ThemeNicheId[];
