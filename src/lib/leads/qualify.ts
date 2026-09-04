import type { CrmStatus, Lead, QualifyInput } from "./types";
import { upsertLead } from "./store";
import { appendActionLog } from "@/lib/action-log";

function hasWebsite(input: QualifyInput): boolean {
  return Boolean(input.website && input.website.trim());
}

export function scoreLeadFit(input: QualifyInput): number {
  let score = 40;
  if (!hasWebsite(input)) score += 25;
  else score -= 25;
  if (input.listingNote?.toLowerCase().includes("call for hours")) score += 15;
  if (input.phone || input.email) score += 10;
  if (input.city) score += 5;
  if (input.niche) score += 5;
  return Math.max(0, Math.min(100, score));
}

function initialStatus(input: QualifyInput, fitScore: number): CrmStatus {
  if (hasWebsite(input)) return "disqualified";
  if (fitScore >= 50) return "qualified";
  return "new";
}

export async function qualifyLead(input: QualifyInput): Promise<Lead> {
  const now = new Date().toISOString();
  const fitScore = scoreLeadFit(input);
  const status = initialStatus(input, fitScore);
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
    status,
    optedOut: false,
    createdAt: now,
    updatedAt: now,
    notes: status === "disqualified" ? "Has website — outside lead-magnet ICP" : undefined,
  };
  await upsertLead(lead);
  await appendActionLog({
    agent: "lead-magnet",
    action: status === "disqualified" ? "disqualify" : "qualify",
    confidence: fitScore / 100,
    notes: `${status} ${lead.businessName} fit=${fitScore}`,
    meta: { leadId: lead.id, status },
  });
  return lead;
}
