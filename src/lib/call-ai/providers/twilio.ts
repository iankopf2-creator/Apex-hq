/** Twilio voice client — no-op until CALL_AI_LIVE + keys are set by Ian. */
export function getTwilioClient(): null {
  return null;
}

export function assertTwilioLive(): never {
  throw new Error(
    "Twilio Call AI is not armed. CALL_AI_LIVE must be true and Twilio env vars set (Ian only)."
  );
}
