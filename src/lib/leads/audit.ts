import type { AuditReport, Lead } from "./types";
import { saveAudit, upsertLead } from "./store";
import { appendActionLog } from "@/lib/action-log";

const DEMO_LINK =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://apex-hq-five.vercel.app";

const DISCLAIMER =
  "ESTIMATES ONLY — figures are illustrative projections for demo/scaffold purposes, not measured lost revenue or guarantees.";

/** Generate an audit report from lead inputs. All money/call numbers are estimates. */
export async function generateAuditReport(lead: Lead): Promise<AuditReport> {
  // Deterministic-ish stub estimates from fit score — clearly labeled as estimates
  const baseCalls = 8 + Math.round(lead.fitScore / 10);
  const estimatedMissedCallsPerMonth = baseCalls;
  const estimatedLostRevenueUsd = estimatedMissedCallsPerMonth * 75; // ESTIMATE

  const report: AuditReport = {
    id: crypto.randomUUID(),
    leadId: lead.id,
    estimatedMissedCallsPerMonth,
    estimatedLostRevenueUsd,
    personalizedFix:
      "Add an online booking page + clear hours so customers can reach you without calling. Apex HQ Front Door demo: " +
      DEMO_LINK +
      " · pricing: " +
      DEMO_LINK +
      "/pricing.",
    demoLink: DEMO_LINK,
    confidence: Math.min(0.75, 0.4 + lead.fitScore / 200),
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
    notes: `Audit for ${lead.businessName} (estimates)`,
    meta: { leadId: lead.id, auditId: report.id },
  });

  return report;
}
