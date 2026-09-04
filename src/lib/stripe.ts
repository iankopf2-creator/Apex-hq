import Stripe from "stripe";

/** Stripe pricing tiers — Starter $49 / Growth $99 / Pro $199. */
export const STRIPE_TIERS = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 49,
    priceEnv: "STRIPE_PRICE_STARTER",
    features: ["Branded site", "Basic booking form", "Email leads"],
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 99,
    priceEnv: "STRIPE_PRICE_GROWTH",
    features: [
      "Everything in Starter",
      "AI chat receptionist (stub)",
      "SMS notifications (stub)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 199,
    priceEnv: "STRIPE_PRICE_PRO",
    features: ["Everything in Growth", "Voice AI (stub)", "Priority onboarding"],
  },
] as const;

export type StripeTierId = (typeof STRIPE_TIERS)[number]["id"];

/** Env vars Ian must set in Vercel for live checkout. */
export const REQUIRED_STRIPE_ENV_VARS = [
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_PRICE_STARTER",
  "NEXT_PUBLIC_APP_URL",
] as const;

export const OPTIONAL_STRIPE_ENV_VARS = [
  "STRIPE_PRICE_GROWTH",
  "STRIPE_PRICE_PRO",
  "STRIPE_WEBHOOK_SECRET",
] as const;

export function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
      process.env.STRIPE_PRICE_STARTER
  );
}

export function missingStripeEnvVars(): string[] {
  return REQUIRED_STRIPE_ENV_VARS.filter((k) => !process.env[k]?.trim());
}

export function getTier(tierId: string) {
  return STRIPE_TIERS.find((t) => t.id === tierId);
}

export function getPriceIdForTier(tierId: string): string | undefined {
  const tier = getTier(tierId);
  if (!tier) return undefined;
  const value = process.env[tier.priceEnv];
  return value?.trim() || undefined;
}

let stripeClient: Stripe | null = null;

/** Server-only Stripe client. Returns null when secret key unset. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: "2026-08-26.dahlia",
      typescript: true,
    });
  }
  return stripeClient;
}

export type CreateCheckoutParams = {
  tierId: StripeTierId | string;
  businessSlug?: string;
  email?: string;
};

/**
 * Create a Stripe Checkout Session in subscription mode.
 * Never invents keys or price IDs — requires env.
 */
export async function createCheckoutSession(
  params: CreateCheckoutParams
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error(
      "Stripe not configured. Set STRIPE_SECRET_KEY (and related env vars)."
    );
  }

  const tier = getTier(params.tierId);
  if (!tier) {
    throw new Error(`Unknown tier: ${params.tierId}`);
  }

  const priceId = getPriceIdForTier(params.tierId);
  if (!priceId) {
    throw new Error(
      `Missing price ID for ${tier.name}. Set ${tier.priceEnv} in env (create Price in Stripe Dashboard).`
    );
  }

  const base = getAppUrl();
  const success = new URL("/pricing", base);
  success.searchParams.set("checkout", "success");
  success.searchParams.set("tier", tier.id);
  if (params.businessSlug) success.searchParams.set("slug", params.businessSlug);

  const cancel = new URL("/pricing", base);
  cancel.searchParams.set("checkout", "cancel");
  cancel.searchParams.set("tier", tier.id);
  if (params.businessSlug) cancel.searchParams.set("slug", params.businessSlug);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: success.toString(),
    cancel_url: cancel.toString(),
    customer_email: params.email?.trim() || undefined,
    metadata: {
      tier: tier.id,
      businessSlug: params.businessSlug?.trim() || "",
    },
    subscription_data: {
      metadata: {
        tier: tier.id,
        businessSlug: params.businessSlug?.trim() || "",
      },
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL");
  }

  return { url: session.url, sessionId: session.id };
}

/** Legacy stub helper — only used when Stripe is not configured (UI messaging). */
export function createCheckoutStub(
  tierId: string,
  slug?: string
): { url: string; stub: true } {
  const base = getAppUrl();
  const q = new URLSearchParams({ tier: tierId, stub: "1" });
  if (slug) q.set("slug", slug);
  return { url: `${base}/pricing?checkout=${q.toString()}`, stub: true };
}
