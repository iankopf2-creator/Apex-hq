import { NextResponse } from "next/server";
import { getTemplate } from "@/templates/niches";
import { upsertBusiness, getBusinessBySlug } from "@/lib/store";
import type { BusinessProfile } from "@/lib/types";

/**
 * Demo seed: fictional Dallas HVAC site built ONLY from niche templates + wizard-shaped data.
 * No hardcoded real business identity beyond the fictional demo label.
 */
export async function POST() {
  const template = getTemplate("hvac");
  if (!template) {
    return NextResponse.json({ error: "HVAC template missing" }, { status: 500 });
  }

  const slug = "demo-dallas-hvac";
  const existing = await getBusinessBySlug(slug);
  const now = new Date().toISOString();

  const profile: BusinessProfile = {
    id: existing?.id ?? crypto.randomUUID(),
    slug,
    name: "Demo Dallas HVAC",
    niche: "hvac",
    city: "Dallas",
    hours: template.defaultHours,
    services: template.defaultServices.map((s, i) => ({
      id: "svc-hvac-" + i,
      name: s.name,
      description: s.description,
      priceFrom: s.priceFrom,
    })),
    photos: ["/placeholders/storefront.svg"],
    tagline: template.defaultTagline,
    primaryColor: template.accentHint,
    phone: "(555) 010-2000",
    email: "demo@example.com",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await upsertBusiness(profile);
  return NextResponse.redirect(new URL("/s/" + slug, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), 303);
}

export async function GET() {
  return POST();
}
