import type { CallCapture, CallIntent, InboundStubBody } from "../types";
import { getDefaultBusinessSlug, isLiveArmed } from "../config";
import { saveCallAiDryRun } from "../store";
import {
  HVAC_RECEPTIONIST_PACK_ID,
  outcomeForIntent,
  urgencyForIntent,
} from "../scripts/hvac-receptionist";

export async function runStubInbound(
  body: InboundStubBody
): Promise<{ callId: string; record: CallCapture; mode: "dry-run" }> {
  const intent: CallIntent = body.intentHint || "SAME_DAY_REPAIR";
  const record: CallCapture = {
    id: "dry_" + crypto.randomUUID(),
    businessSlug: body.businessSlug || getDefaultBusinessSlug(),
    direction: "inbound",
    intent,
    callerName: body.callerName,
    callbackPhone: body.from,
    issueSummary: body.issueSummary,
    urgency: urgencyForIntent(intent),
    aiDisclosed: false,
    outcome: outcomeForIntent(intent),
    transcriptSnippet: `[stub] pack=${HVAC_RECEPTIONIST_PACK_ID} intent=${intent}`,
    provider: "stub",
    liveArmed: false,
    createdAt: new Date().toISOString(),
  };
  // Hard gate: never mark live from inbound body
  void isLiveArmed;
  void body.liveArmed;
  await saveCallAiDryRun(record);
  return { callId: record.id, record, mode: "dry-run" };
}
