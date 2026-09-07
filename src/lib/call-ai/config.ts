/**
 * Call AI config — env names only. Never invent keys.
 * Master kill switch: CALL_AI_LIVE must be exactly "true" to leave dry-run.
 */

export type CallAiMode = "stub" | "twilio" | "bland" | "retell";

function envFlag(name: string): boolean {
  return process.env[name]?.trim() === "true";
}

export function isCallAiLive(): boolean {
  return envFlag("CALL_AI_LIVE");
}

export function allowCallAiSms(): boolean {
  return isCallAiLive() && envFlag("CALL_AI_ALLOW_SMS");
}

export function allowCallAiOutbound(): boolean {
  return isCallAiLive() && envFlag("CALL_AI_ALLOW_OUTBOUND");
}

export function getCallAiMode(): CallAiMode {
  if (!isCallAiLive()) return "stub";
  const mode = (process.env.CALL_AI_MODE || process.env.VOICE_PROVIDER || "stub")
    .trim()
    .toLowerCase();
  if (mode === "twilio" || mode === "bland" || mode === "retell" || mode === "stub") {
    return mode;
  }
  return "stub";
}

export function getDefaultBusinessSlug(): string {
  return (
    process.env.CALL_AI_DEFAULT_BUSINESS_SLUG?.trim() || "demo-dallas-hvac"
  );
}

/** True only when live flag on AND required keys for the selected mode are non-empty. */
export function isLiveArmed(): boolean {
  if (!isCallAiLive()) return false;
  const mode = getCallAiMode();
  if (mode === "stub") return false;
  if (mode === "twilio") {
    return Boolean(
      process.env.TWILIO_ACCOUNT_SID?.trim() &&
        process.env.TWILIO_AUTH_TOKEN?.trim() &&
        process.env.TWILIO_PHONE_NUMBER?.trim()
    );
  }
  if (mode === "bland") {
    return Boolean(
      process.env.BLAND_API_KEY?.trim() && process.env.BLAND_AGENT_ID?.trim()
    );
  }
  if (mode === "retell") {
    return Boolean(
      process.env.RETELL_API_KEY?.trim() && process.env.RETELL_AGENT_ID?.trim()
    );
  }
  return false;
}
