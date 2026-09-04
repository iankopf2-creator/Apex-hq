/**
 * CAN-SPAM / TCPA helpers (scaffold).
 * See docs/THEME_LEAD_MAGNET_PROTOCOL.md checklist.
 */

export type BusinessHoursWindow = {
  /** Local hour 0–23 inclusive start */
  startHour?: number;
  /** Local hour 0–23 exclusive end */
  endHour?: number;
  /** IANA timezone — default America/Chicago for Ian */
  timeZone?: string;
};

const DEFAULT_WINDOW = {
  startHour: 9,
  endHour: 17,
  timeZone: "America/Chicago",
} as const;

/** Returns true if `now` falls inside weekday business hours in the given TZ. */
export function isWithinBusinessHours(
  now: Date = new Date(),
  window: BusinessHoursWindow = {}
): boolean {
  const cfg = { ...DEFAULT_WINDOW, ...window };
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: cfg.timeZone,
    weekday: "short",
    hour: "numeric",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
  let hour = parseInt(hourStr, 10);
  // Some engines emit "24" for midnight
  if (hour === 24) hour = 0;
  if (weekday === "Sat" || weekday === "Sun") return false;
  return hour >= cfg.startHour && hour < cfg.endHour;
}

export type ComplianceCheck = {
  ok: boolean;
  reasons: string[];
};

export function checkOutboundCompliance(opts: {
  optedOut: boolean;
  channel: "email" | "sms";
  hasPhysicalAddressInFooter?: boolean;
  hasOptOutLanguage?: boolean;
  withinBusinessHours?: boolean;
}): ComplianceCheck {
  const reasons: string[] = [];
  if (opts.optedOut) reasons.push("Lead has opted out");
  if (opts.withinBusinessHours === false) {
    reasons.push("Outside business hours (TCPA-minded quiet hours)");
  }
  if (opts.channel === "email") {
    if (!opts.hasOptOutLanguage) reasons.push("CAN-SPAM: missing opt-out language");
    if (!opts.hasPhysicalAddressInFooter) {
      reasons.push("CAN-SPAM: missing physical postal address in footer");
    }
  }
  if (opts.channel === "sms" && !opts.hasOptOutLanguage) {
    reasons.push("TCPA: missing SMS opt-out (STOP) language");
  }
  return { ok: reasons.length === 0, reasons };
}
