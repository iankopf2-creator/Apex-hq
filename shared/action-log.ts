/**
 * Shared action log for Theme AI + Lead Magnet Engine.
 * Persists to data/action-log.json with /tmp + memory fallback (Vercel-safe).
 */
import { readJsonArray, writeJsonArray } from "./json-store";

export type ActionAgent = "theme-ai" | "lead-magnet" | "system";

export type ActionLogEntry = {
  id: string;
  timestamp: string;
  agent: ActionAgent;
  action: string;
  confidence: number;
  notes?: string;
  meta?: Record<string, unknown>;
};

const LOG_FILENAME = "action-log.json";

export async function appendActionLog(
  entry: Omit<ActionLogEntry, "id" | "timestamp"> & { id?: string; timestamp?: string }
): Promise<ActionLogEntry> {
  const full: ActionLogEntry = {
    id: entry.id ?? crypto.randomUUID(),
    timestamp: entry.timestamp ?? new Date().toISOString(),
    agent: entry.agent,
    action: entry.action,
    confidence: Math.max(0, Math.min(1, entry.confidence)),
    notes: entry.notes,
    meta: entry.meta,
  };
  const list = await readJsonArray<ActionLogEntry>(LOG_FILENAME);
  list.push(full);
  const trimmed = list.length > 500 ? list.slice(-500) : list;
  await writeJsonArray(LOG_FILENAME, trimmed);
  return full;
}

export async function listActionLogs(limit = 50): Promise<ActionLogEntry[]> {
  const list = await readJsonArray<ActionLogEntry>(LOG_FILENAME);
  return list.slice(-limit).reverse();
}
