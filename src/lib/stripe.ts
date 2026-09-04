/** Stripe pricing tiers — scaffold/stub only. */
export const STRIPE_TIERS = [
  { id: "starter", name: "Starter", priceMonthly: 49, priceEnv: "STRIPE_PRICE_STARTER", features: ["Branded site", "Basic booking form", "Email leads"] },
  { id: "growth", name: "Growth", priceMonthly: 99, priceEnv: "STRIPE_PRICE_GROWTH", features: ["Everything in Starter", "AI chat receptionist (stub)", "SMS notifications (stub)"] },
  { id: "pro", name: "Pro", priceMonthly: 199, priceEnv: "STRIPE_PRICE_PRO", features: ["Everything in Growth", "Voice AI (stub)", "Priority onboarding"] },
] as const;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

/** Checkout stub — returns a local success URL until Stripe is wired. */
export function createCheckoutStub(tierId: string, slug?: string): { url: string; stub: true } {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const q = new URLSearchParams({ tier: tierId, stub: "1" });
  if (slug) q.set("slug", slug);
  return { url: `${base}/pricing?checkout=${q.toString()}`, stub: true };
}
