export type CallIntent =
  | "EMERGENCY_NO_COOL"
  | "EMERGENCY_NO_HEAT"
  | "SAME_DAY_REPAIR"
  | "MAINTENANCE_PLAN"
  | "INSTALL_QUOTE"
  | "BILLING_OTHER"
  | "SPAM_WRONG";

export type CallUrgency = "emergency" | "same_day" | "planned";

export type CallOutcome =
  | "callback_logged"
  | "web_offered"
  | "human_handoff"
  | "stopped"
  | "wrong_number";

export type CallProvider = "stub" | "twilio" | "bland" | "retell";

/** Capture schema for receptionist intake — no payment fields, no secrets. */
export type CallCapture = {
  id: string;
  businessSlug: string;
  direction: "inbound";
  intent: CallIntent;
  callerName?: string;
  callbackPhone?: string;
  address?: string;
  zip?: string;
  issueSummary?: string;
  urgency?: CallUrgency;
  preferredWindow?: string;
  aiDisclosed: boolean;
  outcome: CallOutcome;
  transcriptSnippet?: string;
  provider: CallProvider;
  liveArmed: boolean;
  createdAt: string;
};

export type InboundStubBody = {
  provider?: CallProvider;
  businessSlug?: string;
  from?: string;
  to?: string;
  intentHint?: CallIntent;
  liveArmed?: boolean;
  callerName?: string;
  issueSummary?: string;
};
