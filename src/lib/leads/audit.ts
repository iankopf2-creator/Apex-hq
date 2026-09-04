import type { AuditReport, Lead } from "./types";
import { saveAudit, upsertLead } from "./store";
import { appendActionLog } from "@/lib/action-log";

const PROD_DEMO = "https://apex-hq-five.vercel.app";

function resolveDemoLink(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";
  if (!raw || /localhost|127\.0\.0\.1/i.test(raw)) return PROD_DEMO;
  return raw;
}

/**
 * ESTIMATES ONLY — illustrative scaffold math.
 * Miss-rate band informed by public vendor summaries often citing ~25–62%
 * unanswered for SMBs (widely circulated 411 Locals / BIA-style figures
 * republished by call-tracking vendors). CONSERVATIVE 30% miss rate —
 * NOT measured Apex HQ data. Job values are niche placeholders for demos.
 */
const DISCLAIMER =
  "ESTIMATES ONLY — illustrative projections using a conservative ~30% missed-call assumption within commonly cited public SMB ranges (~25–62%), not Apex HQ measurements or guarantees. Sources are vendor-republished industry summaries, not audited studies we independently verified.";

const NICHE_FIX: Record<string, string> = {
  hvac:
    "Put emergency/service hours + same-day booking online so after-hours AC calls don't die on 'call for hours.'",
  plumber:
    "Ship a mobile-first booking page for leaks/clog emergencies with clear hours — stop losing night-time jobs to whoever answers first.",
  salon:
    "Add online booking + real hours so walk-ins and Instagram DMs convert without phone tag.",
  trucking:
    "Stand up a simple Front Door with lanes/coverage, quote request, and phone fallback so brokers aren't guessing from a Maps pin.",
  electrician:
    "Publish clear service hours + emergency booking so panel/outage calls don't bounce to whoever picks up first.",
  roofing:
    "Add storm/estimate request form + real hours — stop losing insurance jobs to the contractor with a form.",
};

const NICHE_JOB_USD: Record<string, number> = {
  hvac: 275,
  plumber: 225,
  salon: 85,
  trucking: 150,
  electrician: 200,
  roofing: 350,
};

function personalizedFix(lead: Lead, demoLink: string): string {
  const niche = (lead.niche || "").toLowerCase();
  const tip =
    NICHE_FIX[niche] ||
    "Add an online booking page + clear hours so customers can reach you without calling.";
  return `${tip} Apex HQ demo: ${demoLink}/s/demo-dallas-hvac · start yours: ${demoLink}/onboarding`;
}

export async function generateAuditReport(lead: Lead): Promise<AuditReport> {
  const demoLink = resolveDemoLink();
  const niche = (lead.niche || "").toLowerCase();
  const inboundAssumed = 28 + Math.round(lead.fitScore / 5);
  const missRate = 0.3;
  const estimatedMissedCallsPerMonth = Math.max(
    6,
    Math.round(inboundAssumed * missRate)
  );
  const job = NICHE_JOB_USD[niche] ?? 120;
  const estimatedLostRevenueUsd = estimatedMissedCallsPerMonth * job;

  const report: AuditReport = {
    id: crypto.randomUUID(),
    leadId: lead.id,
    estimatedMissedCallsPerMonth,
    estimatedLostRevenueUsd,
    personalizedFix: personalizedFix(lead, demoLink),
    demoLink,
    confidence: Math.min(0.72, 0.38 + lead.fitScore / 220),
    disclaimer: DISCLAIMER,
    createdAt: new Date().toISOString(),
  };

  await saveAudit(report);
  await upsertLead({
    ...lead,
    status: "audited",
    auditReportId: report.id,
    updatedAt: new Date().toISOString(),
  });

  await appendActionLog({
    agent: "lead-magnet",
    action: "audit_generate",
    confidence: report.confidence,
    notes: `Audit for ${lead.businessName} (estimates; missRate=${missRate})`,
    meta: {
      leadId: lead.id,
      auditId: report.id,
      niche: lead.niche,
      inboundAssumed,
      missRate,
      jobUsd: job,
    },
  });

  return report;
}
