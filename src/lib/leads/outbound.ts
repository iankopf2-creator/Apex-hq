/**
 * Outbound send stub — DOES NOT send real SMS/email.
 * Default dryRun:true. Live send refused without feature flag + Ian approval.
 *
 * Feature flag: LEAD_MAGNET_LIVE_SEND=true
 * Ian approval comment required in request body when attempting live send.
 */
import { appendActionLog } from "@/lib/action-log";
import { checkOutboundCompliance, isWithinBusinessHours } from "./compliance";
import { getLead, upsertLead } from "./store";
import type { Lead } from "./types";

export type OutboundChannel = "email" | "sms";

export type OutboundRequest = {
  leadId: string;
  channel: OutboundChannel;
  subject?: string;
  body: string;
  /** Defaults to true — must be explicitly false to attempt live path */
  dryRun?: boolean;
  /**
   * Required for any non-dryRun attempt. Must reference Ian approval.
   * Example: "Ian approved live send 2026-09-04 for fixture test only"
   */
  ianApprovalComment?: string;
};

export type OutboundResult = {
  ok: boolean;
  dryRun: boolean;
  sent: false;
  loggedAt: string;
  intendedMessage: {
    channel: OutboundChannel;
    to?: string;
    subject?: string;
    body: string;
  };
  reason?: string;
  compliance?: { ok: boolean; reasons: string[] };
};

const LIVE_FLAG = "LEAD_MAGNET_LIVE_SEND";

export async function sendOutboundStub(req: OutboundRequest): Promise<OutboundResult> {
  const dryRun = req.dryRun !== false; // default true
  const lead = await getLead(req.leadId);
  if (!lead) {
    return {
      ok: false,
      dryRun,
      sent: false,
      loggedAt: new Date().toISOString(),
      intendedMessage: { channel: req.channel, body: req.body, subject: req.subject },
      reason: "Lead not found",
    };
  }

  if (lead.optedOut) {
    await appendActionLog({
      agent: "lead-magnet",
      action: "outbound_blocked_optout",
      confidence: 1,
      notes: `Blocked outbound to opted-out lead ${lead.id}`,
    });
    return {
      ok: false,
      dryRun,
      sent: false,
      loggedAt: new Date().toISOString(),
      intendedMessage: intendedFor(lead, req),
      reason: "Lead opted out",
    };
  }

  const withinHours = isWithinBusinessHours();
  const compliance = checkOutboundCompliance({
    optedOut: lead.optedOut,
    channel: req.channel,
    hasPhysicalAddressInFooter: true,
    hasOptOutLanguage: true,
    withinBusinessHours: withinHours,
  });

  // LIVE path: refuse unless flag + Ian approval comment
  if (!dryRun) {
    const flagOn = process.env[LIVE_FLAG] === "true";
    const approval =
      typeof req.ianApprovalComment === "string" &&
      /ian/i.test(req.ianApprovalComment) &&
      req.ianApprovalComment.trim().length >= 12;

    if (!flagOn || !approval) {
      const reason =
        "Live send refused: requires LEAD_MAGNET_LIVE_SEND=true feature flag AND ianApprovalComment referencing Ian approval. Scaffold defaults to dry-run only.";
      await appendActionLog({
        agent: "lead-magnet",
        action: "outbound_live_refused",
        confidence: 1,
        notes: reason,
        meta: { leadId: lead.id, flagOn, hasApproval: approval },
      });
      return {
        ok: false,
        dryRun: false,
        sent: false,
        loggedAt: new Date().toISOString(),
        intendedMessage: intendedFor(lead, req),
        reason,
        compliance,
      };
    }

    // Even with flag+approval, this scaffold NEVER actually sends.
    await appendActionLog({
      agent: "lead-magnet",
      action: "outbound_live_not_implemented",
      confidence: 1,
      notes:
        "Live path acknowledged but transporter not implemented — message logged only. No SMS/email sent.",
      meta: { leadId: lead.id, approval: req.ianApprovalComment },
    });
    return {
      ok: false,
      dryRun: false,
      sent: false,
      loggedAt: new Date().toISOString(),
      intendedMessage: intendedFor(lead, req),
      reason:
        "Live transporter not implemented. Message logged only; nothing was sent.",
      compliance,
    };
  }

  // Dry-run: log intended message with timestamp
  const loggedAt = new Date().toISOString();
  await appendActionLog({
    agent: "lead-magnet",
    action: "outbound_dry_run",
    confidence: 0.9,
    notes: `Dry-run ${req.channel} to ${lead.businessName}`,
    meta: {
      leadId: lead.id,
      channel: req.channel,
      subject: req.subject,
      body: req.body,
      withinBusinessHours: withinHours,
      compliance,
    },
  });

  if (compliance.ok) {
    await upsertLead({
      ...lead,
      status: lead.status === "contacted" ? lead.status : "contacted",
      updatedAt: loggedAt,
      notes: [lead.notes, "dry-run outbound logged " + loggedAt].filter(Boolean).join(" | "),
    });
  }

  return {
    ok: true,
    dryRun: true,
    sent: false,
    loggedAt,
    intendedMessage: intendedFor(lead, req),
    compliance,
  };
}

function intendedFor(lead: Lead, req: OutboundRequest) {
  return {
    channel: req.channel,
    to: req.channel === "email" ? lead.email : lead.phone,
    subject: req.subject,
    body: req.body,
  };
}
