import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook stub.
 * Verifies signature when STRIPE_WEBHOOK_SECRET is set.
 * Logs subscription-related events; does not fake success or mutate billing.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured (STRIPE_SECRET_KEY)" },
      { status: 503 }
    );
  }

  const body = await req.text();
  let event: Stripe.Event;

  if (webhookSecret) {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid signature";
      console.error("[stripe/webhook] signature verification failed:", message);
      return NextResponse.json({ error: message }, { status: 400 });
    }
  } else {
    // No secret → refuse to trust unsigned payloads (no fake success).
    console.warn(
      "[stripe/webhook] STRIPE_WEBHOOK_SECRET unset — rejecting unsigned body"
    );
    return NextResponse.json(
      {
        error:
          "Stripe webhook not configured. Set STRIPE_WEBHOOK_SECRET (from Stripe Dashboard → Webhooks).",
      },
      { status: 503 }
    );
  }

  const subscriptionEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.paid",
    "invoice.payment_failed",
  ]);

  if (subscriptionEvents.has(event.type)) {
    console.info("[stripe/webhook] subscription event", {
      type: event.type,
      id: event.id,
      created: event.created,
    });
  } else {
    console.info("[stripe/webhook] ignored event", { type: event.type, id: event.id });
  }

  return NextResponse.json({ received: true, type: event.type });
}
