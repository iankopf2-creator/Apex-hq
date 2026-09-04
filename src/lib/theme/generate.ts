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
    A: { heroEmphasis: "clarity-first comfort", ctaVerb: "Book a visit" },
    B: { heroEmphasis: "benefit-led reliability", ctaVerb: "Schedule service" },
  },
  plumber: {
    A: { heroEmphasis: "clarity-first help", ctaVerb: "Schedule help" },
    B: { heroEmphasis: "benefit-led fast fix", ctaVerb: "Get help" },
  },
  salon: {
    A: { heroEmphasis: "clarity-first booking", ctaVerb: "Book" },
    B: { heroEmphasis: "benefit-led look & feel", ctaVerb: "Book now" },
  },
  trucking: {
    A: { heroEmphasis: "clarity-first lanes + coverage", ctaVerb: "Request a quote" },
    B: { heroEmphasis: "benefit-led on-time freight", ctaVerb: "Get a quote" },
  },
  electrician: {
    A: { heroEmphasis: "clarity-first licensed work", ctaVerb: "Book a visit" },
    B: { heroEmphasis: "benefit-led safe + scheduled", ctaVerb: "Schedule service" },
  },
  roofing: {
    A: { heroEmphasis: "clarity-first inspection", ctaVerb: "Request inspection" },
    B: { heroEmphasis: "benefit-led protection", ctaVerb: "Get a roof quote" },
  },
  landscaping: {
    A: { heroEmphasis: "clarity-first curb appeal", ctaVerb: "Request estimate" },
    B: { heroEmphasis: "benefit-led tidy yard", ctaVerb: "Get a yard quote" },
  },
  auto_detail: {
    A: { heroEmphasis: "clarity-first clean finish", ctaVerb: "Book a detail" },
    B: { heroEmphasis: "benefit-led showroom shine", ctaVerb: "Schedule detailing" },
  },
  cleaning: {
    A: { heroEmphasis: "clarity-first schedule", ctaVerb: "Book a cleaning" },
    B: { heroEmphasis: "benefit-led fresh space", ctaVerb: "Schedule cleaning" },
  },
  pest_control: {
    A: { heroEmphasis: "clarity-first inspection", ctaVerb: "Book inspection" },
    B: { heroEmphasis: "benefit-led prevention", ctaVerb: "Schedule treatment" },
  },
  moving: {
    A: { heroEmphasis: "clarity-first timeline", ctaVerb: "Get a quote" },
    B: { heroEmphasis: "benefit-led low-stress move", ctaVerb: "Plan my move" },
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
