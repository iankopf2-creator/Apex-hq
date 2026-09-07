import { NextResponse } from "next/server";
import { z } from "zod";
import { isCallAiLive, isLiveArmed } from "@/lib/call-ai/config";
import { runStubInbound } from "@/lib/call-ai/providers/stub";

const bodySchema = z.object({
  provider: z.enum(["stub", "twilio", "bland", "retell"]).optional(),
  businessSlug: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  intentHint: z
    .enum([
      "EMERGENCY_NO_COOL",
      "EMERGENCY_NO_HEAT",
      "SAME_DAY_REPAIR",
      "MAINTENANCE_PLAN",
      "INSTALL_QUOTE",
      "BILLING_OTHER",
      "SPAM_WRONG",
    ])
    .optional(),
  liveArmed: z.boolean().optional(),
  callerName: z.string().optional(),
  issueSummary: z.string().optional(),
});

/**
 * Inbound webhook stub. Never dials vendors while CALL_AI_LIVE is false.
 */
export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = bodySchema.parse(json);

    if (!isCallAiLive() || !isLiveArmed()) {
      const result = await runStubInbound({
        ...parsed,
        provider: "stub",
        liveArmed: false,
      });
      return NextResponse.json({
        ok: true,
        mode: "dry-run",
        reason: "CALL_AI_LIVE is false or provider keys not armed",
        callId: result.callId,
        record: result.record,
      });
    }

    // Live path not implemented — refuse rather than invent vendor calls
    return NextResponse.json(
      {
        ok: false,
        error:
          "Live Call AI path not implemented yet. Keep CALL_AI_LIVE=false until Ian arms + Builder wires providers.",
      },
      { status: 501 }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
