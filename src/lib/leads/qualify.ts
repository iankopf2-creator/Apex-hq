import type { Lead, QualifyInput } from "./types";
import { upsertLead } from "./store";
import { appendActionLog } from "@/lib/action-log";

/** Heuristic fit score 0–100 (scaffold — not ML). */
export function scoreLeadFit(input: QualifyInput): number {
  let score = 40;
  if (!input.website || input.website.trim() === "") score += 25;
  if (input.listingNote?.toLowerCase().includes("call for hours")) score += 15;
  if (input.phone || input.email) score += 10;
  if (input.city) score += 5;
  if (input.niche) score += 5;
  return Math.min(100, score);
}

export async function qualifyLead(input: QualifyInput): Promise<Lead> {
  const now = new Date().toISOString();
  const fitScore = scoreLeadFit(input);
  const lead: Lead = {
    id: crypto.randomUUID(),
    businessName: input.businessName.trim(),
    niche: input.niche,
    city: input.city,
    phone: input.phone,
    email: input.email,
    website: input.website ?? null,
    listingNote: input.listingNote,
    source: input.source ?? "manual",
    isFixture: input.source === "fixture",
    fitScore,
    status: fitScore >= 50 ? "qualified" : "new",
    optedOut: false,
    createdAt: now,
    updatedAt: now,
  };
  await upsertLead(lead);
  await appendActionLog({
    agent: "lead-magnet",
    action: "qualify",
    confidence: fitScore / 100,
    notes: `Qualified ${lead.businessName} fit=${fitScore}`,
    meta: { leadId: lead.id },
  });
  return lead;
}
