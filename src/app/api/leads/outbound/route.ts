import { NextResponse } from "next/server";
import { z } from "zod";
import { sendOutboundStub } from "@/lib/leads/outbound";

const bodySchema = z.object({
  leadId: z.string().uuid(),
  channel: z.enum(["email", "sms"]),
  subject: z.string().optional(),
  body: z.string().min(1),
  /** Defaults true — live send refused without flag + Ian approval */
  dryRun: z.boolean().optional().default(true),
  ianApprovalComment: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);
    const result = await sendOutboundStub(parsed);
    const status = result.ok ? 200 : 403;
    return NextResponse.json(result, { status: result.reason?.includes("not found") ? 404 : status });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
