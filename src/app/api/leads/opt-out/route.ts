import { NextResponse } from "next/server";
import { z } from "zod";
import { getLead, upsertLead } from "@/lib/leads/store";
import { appendActionLog } from "@/lib/action-log";

const bodySchema = z.object({
  leadId: z.string().uuid(),
});

/** POST /api/leads/opt-out — mark lead optedOut (compliance). */
export async function POST(req: Request) {
  try {
    const parsed = bodySchema.parse(await req.json());
    const lead = await getLead(parsed.leadId);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    const updated = await upsertLead({
      ...lead,
      optedOut: true,
      status: "opted_out",
      updatedAt: new Date().toISOString(),
    });
    await appendActionLog({
      agent: "lead-magnet",
      action: "opt_out",
      confidence: 1,
      notes: `Lead ${lead.id} opted out`,
    });
    return NextResponse.json({ ok: true, lead: updated });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
