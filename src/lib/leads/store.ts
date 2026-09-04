import { readJsonArray, writeJsonArray } from "../../../shared/json-store";
import type { AuditReport, Lead } from "./types";

const LEADS_FILENAME = "leads.json";
const AUDITS_FILENAME = "audits.json";

type LeadsStore = { leads: Lead[]; audits: AuditReport[] };

export async function listLeads(): Promise<Lead[]> {
  return readJsonArray<Lead>(LEADS_FILENAME);
}

export async function getLead(id: string): Promise<Lead | null> {
  const all = await listLeads();
  return all.find((l) => l.id === id) ?? null;
}

export async function upsertLead(lead: Lead): Promise<Lead> {
  const all = await listLeads();
  const idx = all.findIndex((l) => l.id === lead.id);
  const next: Lead = {
    ...lead,
    updatedAt: new Date().toISOString(),
  };
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...next };
  } else {
    all.push(next);
  }
  await writeJsonArray(LEADS_FILENAME, all);
  return all[idx >= 0 ? idx : all.length - 1];
}

export async function listAudits(): Promise<AuditReport[]> {
  return readJsonArray<AuditReport>(AUDITS_FILENAME);
}

export async function saveAudit(report: AuditReport): Promise<AuditReport> {
  const all = await listAudits();
  all.push(report);
  await writeJsonArray(AUDITS_FILENAME, all);
  return report;
}

export async function getAudit(id: string): Promise<AuditReport | null> {
  const all = await listAudits();
  return all.find((a) => a.id === id) ?? null;
}

export async function readLeadsStore(): Promise<LeadsStore> {
  return { leads: await listLeads(), audits: await listAudits() };
}
