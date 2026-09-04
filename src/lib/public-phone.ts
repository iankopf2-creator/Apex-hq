import type { BusinessProfile } from "@/lib/types";

/**
 * Public Front Door phone rules (QA / Research):
 * - Page `tel:` and sticky CTAs use CallRail *website* swap-target (`trackingPhone`)
 *   or the business line (`phone`) — never an LSA-only number.
 * - `lsaPhone` may exist on the profile for ops config but must never appear in HTML.
 * - No CallRail JS snippet without explicit tenant opt-in (`callTrackingOptIn`).
 */

const CALL_FIRST_NICHES = new Set([
  "hvac",
  "plumber",
  "electrician",
  "electrical",
  "roofing",
  "pest",
]);

export function isCallFirstNiche(niche: string): boolean {
  return CALL_FIRST_NICHES.has(niche.toLowerCase());
}

/** Digits for tel: href. Returns null if nothing safe to publish. */
export function getPublicPhoneDigits(business: BusinessProfile): string | null {
  const raw = (business.trackingPhone || business.phone || "").trim();
  if (!raw) return null;
  const digits = raw.replace(/[^\d+]/g, "");
  return digits.length >= 7 ? digits : null;
}

export function getPublicPhoneDisplay(business: BusinessProfile): string | null {
  const raw = (business.trackingPhone || business.phone || "").trim();
  return raw || null;
}

/** Never use this on /s/[slug] — ops/LSA destination only. */
export function getLsaPhoneForOpsOnly(business: BusinessProfile): string | undefined {
  return business.lsaPhone;
}

export function shouldLoadCallTrackingSnippet(business: BusinessProfile): boolean {
  return Boolean(business.callTrackingOptIn);
}
