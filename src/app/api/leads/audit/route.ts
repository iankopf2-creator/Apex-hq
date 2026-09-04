import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAuditReport } from "@/lib/leads/audit";
import { getLead, upsertLead } from "@/lib/leads/store";
import { qualifyLead } from "@/lib/leads/qualify";
import type { Lead } from "@/lib/leads/types";

const bodySchema = z.object({
  leadId: z.string().uuid().optional(),
  /** Or provide public lead fields to qualify+audit in one call */
  businessName: z.string().min(2).optional(),
  niche: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().nullable().optional(),
  listingNote: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);

    let lead: Lead | null = null;
    if (parsed.leadId) {
      lead = await getLead(parsed.leadId);
      if (!lead) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }
    } else if (parsed.businessName) {
      lead = await qualifyLead({
        businessName: parsed.businessName,
        niche: parsed.niche,
        city: parsed.city,
        phone: parsed.phone,
        email: parsed.email,
        website: parsed.website ?? null,
        listingNote: parsed.listingNote,
        source: "manual",
      });
    } else {
      return NextResponse.json(
        { error: "Provide leadId or businessName" },
        { status: 400 }
      );
    }

    const report = await generateAuditReport(lead);
    // refresh lead after audit side-effects
    const updated = (await getLead(lead.id)) ?? lead;
    await upsertLead(updated);

    return NextResponse.json({
      ok: true,
      report,
      estimatesLabel: "ESTIMATES ONLY",
      disclaimer: report.disclaimer,
      lead: updated,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
