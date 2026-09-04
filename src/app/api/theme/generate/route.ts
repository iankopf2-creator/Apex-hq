import { NextResponse } from "next/server";
import { z } from "zod";
import { generateThemePackage, isThemeNiche } from "@/lib/theme";
import { startAbExperiment } from "@/lib/theme/ab";

const bodySchema = z.object({
  niche: z.enum(["hvac","plumber","salon","trucking","electrician","roofing","landscaping"]),
  variant: z.enum(["A", "B"]).optional().default("A"),
  /** If true, also stub-start a 7-day A/B with A+B packages */
  startAb: z.boolean().optional().default(false),
  businessSlug: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);
    if (!isThemeNiche(parsed.niche)) {
      return NextResponse.json({ error: "Unsupported niche" }, { status: 400 });
    }

    const theme = await generateThemePackage(parsed.niche, parsed.variant);

    let experiment = null;
    if (parsed.startAb) {
      const themeB = await generateThemePackage(parsed.niche, "B");
      experiment = await startAbExperiment({
        niche: parsed.niche,
        variantAId: theme.id,
        variantBId: themeB.id,
        businessSlug: parsed.businessSlug,
      });
    }

    return NextResponse.json({
      ok: true,
      theme,
      experiment,
      demoUrl: "https://apex-hq-five.vercel.app",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
