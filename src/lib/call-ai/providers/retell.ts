/** Retell client — no-op until CALL_AI_LIVE + keys are set by Ian. */
export function getRetellClient(): null {
  return null;
}

export function assertRetellLive(): never {
  throw new Error(
    "Retell Call AI is not armed. CALL_AI_LIVE must be true and Retell env vars set (Ian only)."
  );
}
