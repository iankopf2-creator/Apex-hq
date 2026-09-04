import { NextResponse } from "next/server";
import { z } from "zod";
import { qualifyLead } from "@/lib/leads/qualify";

const bodySchema = z.object({
  businessName: z.string().min(2),
  niche: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().nullable().optional(),
  listingNote: z.string().optional(),
  source: z
    .enum(["fixture", "manual", "google_maps_stub", "yelp_stub", "facebook_stub", "bbb_stub"])
    .optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);
    const lead = await qualifyLead({
      ...parsed,
      email: parsed.email || undefined,
      website: parsed.website === undefined ? null : parsed.website,
    });
    return NextResponse.json({ ok: true, lead, fitScore: lead.fitScore });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
