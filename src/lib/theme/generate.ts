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
    A: { heroEmphasis: "hybrid seasonal recurring", ctaVerb: "Get a lawn quote" },
    B: { heroEmphasis: "hybrid one-off project", ctaVerb: "Schedule service" },
  },
  auto_detail: {
    A: { heroEmphasis: "clarity-first clean finish", ctaVerb: "Book a detail" },
    B: { heroEmphasis: "benefit-led showroom shine", ctaVerb: "Schedule detailing" },
  },
  cleaning: {
    A: { heroEmphasis: "hybrid recurring-first", ctaVerb: "Book recurring" },
    B: { heroEmphasis: "hybrid one-time deep clean", ctaVerb: "Get a quote" },
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
