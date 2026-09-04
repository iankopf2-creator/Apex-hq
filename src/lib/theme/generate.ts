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
  /** Slight A/B tweak labels (templated — not business-specific) */
  tweaks: {
    heroEmphasis: string;
    ctaVerb: string;
  };
  generatedAt: string;
  notes: string[];
};

const VARIANT_TWEAKS: Record<
  "A" | "B",
  { heroEmphasis: string; ctaVerb: string }
> = {
  A: { heroEmphasis: "clarity-first hero", ctaVerb: "Book" },
  B: { heroEmphasis: "benefit-led hero", ctaVerb: "Get started" },
};

export function isThemeNiche(value: string): value is ThemeNicheId {
  return (THEME_NICHES as string[]).includes(value);
}

/** Build a theme package for a niche (templated configs only). */
export async function generateThemePackage(
  niche: ThemeNicheId,
  variant: "A" | "B" = "A"
): Promise<ThemePackage> {
  const config = getNicheThemeConfig(niche);
  if (!config) {
    throw new Error("Unknown niche: " + niche);
  }
  const pkg: ThemePackage = {
    id: crypto.randomUUID(),
    niche,
    label: config.label,
    variant,
    config,
    tweaks: VARIANT_TWEAKS[variant],
    generatedAt: new Date().toISOString(),
    notes: [
      "Mobile-first layout expected on /s/[slug]",
      "WCAG AA contrast targets for primary text",
      "No hardcoded business data in theme package",
    ],
  };
  await logThemeAction(
    "theme_generate",
    0.85,
    `Generated variant ${variant} for ${niche}`,
    { variant }
  );
  return pkg;
}
