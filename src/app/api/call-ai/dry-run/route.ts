import { NextResponse } from "next/server";
import { z } from "zod";
import { runStubInbound } from "@/lib/call-ai/providers/stub";
import { nextStatesForIntent } from "@/lib/call-ai/scripts/hvac-receptionist";

const bodySchema = z.object({
  businessSlug: z.string().optional(),
  from: z.string().optional(),
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
    .optional()
    .default("EMERGENCY_NO_COOL"),
  callerName: z.string().optional(),
  issueSummary: z.string().optional(),
});

/**
 * Dev dry-run: GREETING→CAPTURE path with fixture payload. Never hits vendors.
 */
export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = bodySchema.parse(json);
    const result = await runStubInbound({
      provider: "stub",
      businessSlug: parsed.businessSlug || "demo-dallas-hvac",
      from: parsed.from || "+15550102000",
      to: "+15550102099",
      intentHint: parsed.intentHint,
      callerName: parsed.callerName || "Dry Run Caller",
      issueSummary: parsed.issueSummary || "AC not cooling",
      liveArmed: false,
    });
    return NextResponse.json({
      ok: true,
      mode: "dry-run",
      flow: ["GREETING", "INTENT_TRIAGE", ...nextStatesForIntent(result.record.intent)],
      callId: result.callId,
      record: result.record,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
