import type { AuditReport, Lead } from "./types";

export const POSTAL_FOOTER_PLACEHOLDER =
  "Apex HQ LLC · Missouri, USA — [POSTAL ADDRESS PENDING IAN]";

export const POSTAL_ADDRESS_READY = false;

export function buildAuditEmail(opts: {
  lead: Lead;
  report: AuditReport;
}): { subject: string; body: string } {
  const { lead, report } = opts;
  const name = lead.businessName.replace(/^\[FIXTURE\]\s*/, "");
  const subject = `Free Front Door estimate for ${name} (ESTIMATES ONLY — not measured)`;
  const body = [
    `Hi — this is Apex HQ's AI lead magnet (not a human).`,
    ``,
    `Quick ESTIMATE for ${name} in ${lead.city || "your city"}:`,
    `• ~${report.estimatedMissedCallsPerMonth} missed calls/month (illustrative)`,
    `• ~$${report.estimatedLostRevenueUsd.toLocaleString("en-US")}/month lost revenue (illustrative)`,
    ``,
    report.personalizedFix,
    ``,
    `This message is a commercial advertisement for Apex HQ Front Door.`,
    `Demo: ${report.demoLink}/s/demo-dallas-hvac`,
    `Onboarding: ${report.demoLink}/onboarding`,
    ``,
    `Unsubscribe: reply STOP or email opt-out@apex-hq.example with this lead id ${lead.id}.`,
    `We honor opt-outs within 10 business days.`,
    ``,
    POSTAL_FOOTER_PLACEHOLDER,
    ``,
    report.disclaimer,
  ].join("\n");
  return { subject, body };
}

export function buildAuditSms(opts: {
  lead: Lead;
  report: AuditReport;
}): { body: string } {
  const { lead, report } = opts;
  const name = lead.businessName.replace(/^\[FIXTURE\]\s*/, "");
  const body =
    `Apex HQ AI (not a human): ESTIMATE for ${name} — ~${report.estimatedMissedCallsPerMonth} missed calls/mo (~$${report.estimatedLostRevenueUsd}). ` +
    `Demo ${report.demoLink}/s/demo-dallas-hvac Reply STOP to opt out.`;
  return { body };
}
