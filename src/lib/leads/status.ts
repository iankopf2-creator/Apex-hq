import type { CrmStatus, Lead } from "./types";
import { getLead, upsertLead } from "./store";
import { appendActionLog } from "@/lib/action-log";

const ALLOWED: Record<CrmStatus, CrmStatus[]> = {
  new: ["qualified", "disqualified", "opted_out"],
  qualified: ["audited", "disqualified", "opted_out", "contacted"],
  audited: ["contacted", "opted_out", "disqualified"],
  contacted: ["replied", "closed", "opted_out", "disqualified"],
  replied: ["closed", "opted_out"],
  opted_out: [],
  closed: [],
  disqualified: [],
};

export async function setLeadStatus(
  leadId: string,
  status: CrmStatus,
  note?: string
): Promise<Lead> {
  const lead = await getLead(leadId);
  if (!lead) throw new Error("Lead not found");
  if (lead.optedOut && status !== "opted_out") {
    throw new Error("Lead opted out — status locked");
  }
  const allowed = ALLOWED[lead.status] ?? [];
  if (status !== lead.status && !allowed.includes(status)) {
    throw new Error(`Illegal CRM transition ${lead.status} → ${status}`);
  }
  const updated = await upsertLead({
    ...lead,
    status,
    optedOut: status === "opted_out" ? true : lead.optedOut,
    updatedAt: new Date().toISOString(),
    notes: [lead.notes, note].filter(Boolean).join(" | ") || lead.notes,
  });
  await appendActionLog({
    agent: "lead-magnet",
    action: "crm_status",
    confidence: 0.95,
    notes: `${lead.businessName}: ${lead.status} → ${status}`,
    meta: { leadId, from: lead.status, to: status },
  });
  return updated;
}
