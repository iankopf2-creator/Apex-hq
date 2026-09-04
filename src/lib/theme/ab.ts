import { promises as fs } from "fs";
import path from "path";
import { appendActionLog } from "@/lib/action-log";
import type { ThemeNicheId } from "./configs";

/** A/B variant experiment stub — 7-day default window, winner optional. */
export type AbVariant = "A" | "B";

export type AbExperiment = {
  id: string;
  niche: ThemeNicheId;
  businessSlug?: string;
  variantAId: string;
  variantBId: string;
  startDate: string;
  endDate?: string;
  winner?: AbVariant | null;
  status: "running" | "completed" | "cancelled";
};

export type ThemeActionRecord = {
  id: string;
  timestamp: string;
  action: string;
  confidence: number;
  notes?: string;
  experimentId?: string;
  variant?: AbVariant;
};

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const THEME_ACTIONS_FILE = path.join(DATA_DIR, "theme-actions.json");

async function ensureThemeActions(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(THEME_ACTIONS_FILE);
  } catch {
    await fs.writeFile(THEME_ACTIONS_FILE, "[]\n", "utf8");
  }
}

/** Log a theme action with timestamp + confidence to data/theme-actions.json and shared action log. */
export async function logThemeAction(
  action: string,
  confidence: number,
  notes?: string,
  extra?: { experimentId?: string; variant?: AbVariant }
): Promise<ThemeActionRecord> {
  await ensureThemeActions();
  const record: ThemeActionRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    action,
    confidence: Math.max(0, Math.min(1, confidence)),
    notes,
    experimentId: extra?.experimentId,
    variant: extra?.variant,
  };
  const raw = await fs.readFile(THEME_ACTIONS_FILE, "utf8");
  const list = JSON.parse(raw) as ThemeActionRecord[];
  list.push(record);
  await fs.writeFile(THEME_ACTIONS_FILE, JSON.stringify(list, null, 2) + "\n", "utf8");

  await appendActionLog({
    agent: "theme-ai",
    action,
    confidence: record.confidence,
    notes,
    meta: { experimentId: extra?.experimentId, variant: extra?.variant },
  });

  return record;
}

/** Stub: start a 7-day A/B experiment between two theme package ids. */
export async function startAbExperiment(input: {
  niche: ThemeNicheId;
  variantAId: string;
  variantBId: string;
  businessSlug?: string;
  days?: number;
}): Promise<AbExperiment> {
  const days = input.days ?? 7;
  const start = new Date();
  const end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
  const experiment: AbExperiment = {
    id: crypto.randomUUID(),
    niche: input.niche,
    businessSlug: input.businessSlug,
    variantAId: input.variantAId,
    variantBId: input.variantBId,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    winner: null,
    status: "running",
  };
  await logThemeAction("ab_start", 0.7, `Started ${days}-day A/B for ${input.niche}`, {
    experimentId: experiment.id,
  });
  return experiment;
}

/** Stub: declare a winner (no live traffic routing yet). */
export async function declareAbWinner(
  experiment: AbExperiment,
  winner: AbVariant
): Promise<AbExperiment> {
  const next: AbExperiment = { ...experiment, winner, status: "completed" };
  await logThemeAction("ab_winner", 0.8, `Winner ${winner}`, {
    experimentId: experiment.id,
    variant: winner,
  });
  return next;
}
