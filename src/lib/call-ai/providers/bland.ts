/** Bland.ai client — no-op until CALL_AI_LIVE + keys are set by Ian. */
export function getBlandClient(): null {
  return null;
}

export function assertBlandLive(): never {
  throw new Error(
    "Bland Call AI is not armed. CALL_AI_LIVE must be true and Bland env vars set (Ian only)."
  );
}
