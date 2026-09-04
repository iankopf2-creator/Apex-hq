/**
 * Shared action log for Theme AI + Lead Magnet Engine.
 * Persists to data/action-log.json (same JSON-store pattern as businesses).
 */
import { promises as fs } from "fs";
import path from "path";

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

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const LOG_FILE = path.join(DATA_DIR, "action-log.json");

async function ensureLog(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LOG_FILE);
  } catch {
    await fs.writeFile(LOG_FILE, "[]\n", "utf8");
  }
}

export async function appendActionLog(
  entry: Omit<ActionLogEntry, "id" | "timestamp"> & { id?: string; timestamp?: string }
): Promise<ActionLogEntry> {
  await ensureLog();
  const full: ActionLogEntry = {
    id: entry.id ?? crypto.randomUUID(),
    timestamp: entry.timestamp ?? new Date().toISOString(),
    agent: entry.agent,
    action: entry.action,
    confidence: Math.max(0, Math.min(1, entry.confidence)),
    notes: entry.notes,
    meta: entry.meta,
  };
  const raw = await fs.readFile(LOG_FILE, "utf8");
  const list = JSON.parse(raw) as ActionLogEntry[];
  list.push(full);
  // Cap growth for local JSON store
  const trimmed = list.length > 500 ? list.slice(-500) : list;
  await fs.writeFile(LOG_FILE, JSON.stringify(trimmed, null, 2) + "\n", "utf8");
  return full;
}

export async function listActionLogs(limit = 50): Promise<ActionLogEntry[]> {
  await ensureLog();
  const raw = await fs.readFile(LOG_FILE, "utf8");
  const list = JSON.parse(raw) as ActionLogEntry[];
  return list.slice(-limit).reverse();
}
