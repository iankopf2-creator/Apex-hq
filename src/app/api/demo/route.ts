import { NextResponse } from "next/server";
import { upsertBusiness, getDemoBusiness } from "@/lib/store";

/**
 * Demo seed: fictional Dallas HVAC site built ONLY from niche templates + wizard-shaped data.
 * No hardcoded real business identity beyond the fictional demo label.
 * On Vercel, getBusinessBySlug("demo-dallas-hvac") also returns getDemoBusiness() without POST.
 */
export async function POST() {
  const profile = getDemoBusiness();
  profile.updatedAt = new Date().toISOString();
  await upsertBusiness(profile);
  return NextResponse.redirect(
    new URL("/s/" + profile.slug, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    303
  );
}

export async function GET() {
  return POST();
}
