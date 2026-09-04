import { promises as fs } from "fs";
import path from "path";
import type { AuditReport, Lead } from "./types";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const AUDITS_FILE = path.join(DATA_DIR, "audits.json");

type LeadsStore = { leads: Lead[]; audits: AuditReport[] };

async function ensureFiles(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  for (const file of [LEADS_FILE, AUDITS_FILE]) {
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(file, "[]\n", "utf8");
    }
  }
}

export async function listLeads(): Promise<Lead[]> {
  await ensureFiles();
  const raw = await fs.readFile(LEADS_FILE, "utf8");
  return JSON.parse(raw) as Lead[];
}

export async function getLead(id: string): Promise<Lead | null> {
  const all = await listLeads();
  return all.find((l) => l.id === id) ?? null;
}

export async function upsertLead(lead: Lead): Promise<Lead> {
  await ensureFiles();
  const all = await listLeads();
  const idx = all.findIndex((l) => l.id === lead.id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...lead, updatedAt: new Date().toISOString() };
  } else {
    all.push(lead);
  }
  await fs.writeFile(LEADS_FILE, JSON.stringify(all, null, 2) + "\n", "utf8");
  return lead;
}

export async function listAudits(): Promise<AuditReport[]> {
  await ensureFiles();
  const raw = await fs.readFile(AUDITS_FILE, "utf8");
  return JSON.parse(raw) as AuditReport[];
}

export async function saveAudit(report: AuditReport): Promise<AuditReport> {
  await ensureFiles();
  const all = await listAudits();
  all.push(report);
  await fs.writeFile(AUDITS_FILE, JSON.stringify(all, null, 2) + "\n", "utf8");
  return report;
}

export async function readLeadsStore(): Promise<LeadsStore> {
  return { leads: await listLeads(), audits: await listAudits() };
}
