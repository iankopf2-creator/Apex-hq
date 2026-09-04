import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createCheckoutSession,
  getTier,
  isStripeConfigured,
  missingStripeEnvVars,
  REQUIRED_STRIPE_ENV_VARS,
  OPTIONAL_STRIPE_ENV_VARS,
} from "@/lib/stripe";

const bodySchema = z.object({
  tierId: z.enum(["starter", "growth", "pro"]).default("starter"),
  businessSlug: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          error: "Stripe not configured",
          requiredEnvVars: [...REQUIRED_STRIPE_ENV_VARS],
          optionalEnvVars: [...OPTIONAL_STRIPE_ENV_VARS],
          missing: missingStripeEnvVars(),
        },
        { status: 503 }
      );
    }

    const json = await req.json().catch(() => ({}));
    const parsed = bodySchema.parse(json);

    const tier = getTier(parsed.tierId);
    if (!tier) {
      return NextResponse.json({ error: "Unknown tier" }, { status: 400 });
    }

    const { url, sessionId } = await createCheckoutSession({
      tierId: parsed.tierId,
      businessSlug: parsed.businessSlug,
      email: parsed.email,
    });

    return NextResponse.json({ ok: true, url, sessionId, tier: parsed.tierId });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: e.flatten() },
        { status: 400 }
      );
    }
    const message = e instanceof Error ? e.message : "Checkout failed";
    const status = message.includes("not configured") || message.includes("Missing price")
      ? 503
      : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

/** GET returns configuration status for the Pricing UI. */
export async function GET() {
  const configured = isStripeConfigured();
  return NextResponse.json({
    configured,
    missing: missingStripeEnvVars(),
    requiredEnvVars: [...REQUIRED_STRIPE_ENV_VARS],
    optionalEnvVars: [...OPTIONAL_STRIPE_ENV_VARS],
  });
}
