import { NextResponse } from "next/server";
import { z } from "zod";
import { setLeadStatus } from "@/lib/leads/status";

const bodySchema = z.object({
  leadId: z.string().uuid(),
  status: z.enum([
    "new",
    "qualified",
    "audited",
    "contacted",
    "replied",
    "opted_out",
    "closed",
    "disqualified",
  ]),
  note: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const parsed = bodySchema.parse(await req.json());
    const lead = await setLeadStatus(parsed.leadId, parsed.status, parsed.note);
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    const status = message.includes("not found")
      ? 404
      : message.includes("Illegal") || message.includes("opted out")
        ? 409
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
