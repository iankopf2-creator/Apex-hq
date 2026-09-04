export type AiLogEntry = {
  id: string;
  businessId?: string;
  source: "chat" | "voice" | "sms" | "system";
  promptSummary: string;
  responseSummary: string;
  model?: string;
  createdAt: string;
};

const memory: AiLogEntry[] = [];

/** In-memory AI response log helper (stub until Supabase ai_response_logs). */
export function logAiResponse(entry: Omit<AiLogEntry, "id" | "createdAt"> & { id?: string }): AiLogEntry {
  const full: AiLogEntry = {
    id: entry.id ?? crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    businessId: entry.businessId,
    source: entry.source,
    promptSummary: entry.promptSummary,
    responseSummary: entry.responseSummary,
    model: entry.model,
  };
  memory.push(full);
  if (memory.length > 200) memory.shift();
  return full;
}

export function listAiLogs(): AiLogEntry[] {
  return [...memory];
}
