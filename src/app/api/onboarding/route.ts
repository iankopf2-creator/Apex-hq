import { NextResponse } from "next/server";
import { z } from "zod";
import { slugify } from "@/lib/utils";
import { upsertBusiness, getBusinessBySlug } from "@/lib/store";
import { getTemplate } from "@/templates/niches";
import type { BusinessProfile, NicheId } from "@/lib/types";

const bodySchema = z.object({
  name: z.string().min(2),
  niche: z.enum(["hvac", "plumber", "salon", "trucking", "electrician"]),
  city: z.string().min(2),
  hours: z.object({
    mon: z.string(),
    tue: z.string(),
    wed: z.string(),
    thu: z.string(),
    fri: z.string(),
    sat: z.string(),
    sun: z.string(),
  }),
  services: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      priceFrom: z.number().optional(),
    })
  ),
  photos: z.array(z.string()).default([]),
});

async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base) || "business";
  let n = 0;
  while (await getBusinessBySlug(n ? slug + "-" + n : slug)) n += 1;
  return n ? slug + "-" + n : slug;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);
    const template = getTemplate(parsed.niche as NicheId);
    const slug = await uniqueSlug(parsed.name + "-" + parsed.city);
    const now = new Date().toISOString();
    const photos =
      parsed.photos.length > 0
        ? parsed.photos
        : ["/placeholders/storefront.svg"];

    const profile: BusinessProfile = {
      id: crypto.randomUUID(),
      slug,
      name: parsed.name.trim(),
      niche: parsed.niche,
      city: parsed.city.trim(),
      hours: parsed.hours,
      services: parsed.services,
      photos,
      tagline: template?.defaultTagline,
      primaryColor: template?.accentHint,
      createdAt: now,
      updatedAt: now,
    };

    await upsertBusiness(profile);
    return NextResponse.json({ ok: true, slug: profile.slug, id: profile.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
