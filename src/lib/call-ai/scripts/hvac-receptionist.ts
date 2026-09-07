import type { CallIntent, CallOutcome, CallUrgency } from "../types";

/**
 * Dallas HVAC receptionist script pack (dry-run encoding).
 * Source: notes/call-ai-hvac-receptionist-2026-09-06.md
 * Never invents ETAs, licenses, 24/7, or pricing.
 */

export const HVAC_RECEPTIONIST_PACK_ID = "hvac-receptionist-2026-09-06";

export const HVAC_GREETING =
  "Thanks for calling Demo Dallas HVAC — this is Alex. How can I help you today?";

export const HVAC_AFTER_HOURS_GREETING =
  "Thanks for calling Demo Dallas HVAC — you’ve reached the after-hours line with Alex. I can take a few details and have the team call you back. What’s going on with your heating or cooling?";

export const HVAC_AI_DISCLOSE =
  "Yep — I’m an AI receptionist for Demo Dallas HVAC. I can take your info and make sure a human follows up. Want me to keep going, or prefer a callback from the team only?";

export const HVAC_NO_PAYMENT =
  "I can’t take card payments on this call; if we need a diagnostic fee later, that goes through the office or the website checkout.";

export type ScriptState =
  | "GREETING"
  | "INTENT_TRIAGE"
  | "CAPTURE_DISPATCH"
  | "CAPTURE_PLAN"
  | "CAPTURE_QUOTE"
  | "HUMAN_HANDOFF"
  | "CONFIRM_CALLBACK"
  | "OFFER_WEB_BOOK"
  | "CLOSE"
  | "CLOSE_FAST";

export function urgencyForIntent(intent: CallIntent): CallUrgency {
  if (intent === "EMERGENCY_NO_COOL" || intent === "EMERGENCY_NO_HEAT") {
    return "emergency";
  }
  if (intent === "SAME_DAY_REPAIR") return "same_day";
  return "planned";
}

export function outcomeForIntent(intent: CallIntent): CallOutcome {
  switch (intent) {
    case "EMERGENCY_NO_COOL":
    case "EMERGENCY_NO_HEAT":
    case "SAME_DAY_REPAIR":
      return "callback_logged";
    case "MAINTENANCE_PLAN":
    case "INSTALL_QUOTE":
      return "web_offered";
    case "BILLING_OTHER":
      return "human_handoff";
    case "SPAM_WRONG":
      return "wrong_number";
    default:
      return "callback_logged";
  }
}

export function nextStatesForIntent(intent: CallIntent): ScriptState[] {
  switch (intent) {
    case "EMERGENCY_NO_COOL":
    case "EMERGENCY_NO_HEAT":
    case "SAME_DAY_REPAIR":
      return ["CAPTURE_DISPATCH", "CONFIRM_CALLBACK", "CLOSE"];
    case "MAINTENANCE_PLAN":
      return ["CAPTURE_PLAN", "OFFER_WEB_BOOK", "CLOSE"];
    case "INSTALL_QUOTE":
      return ["CAPTURE_QUOTE", "OFFER_WEB_BOOK", "CLOSE"];
    case "BILLING_OTHER":
      return ["HUMAN_HANDOFF", "CLOSE"];
    case "SPAM_WRONG":
      return ["CLOSE_FAST"];
    default:
      return ["CAPTURE_DISPATCH", "CLOSE"];
  }
}
