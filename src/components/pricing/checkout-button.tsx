"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  tierId: string;
  tierName: string;
  businessSlug?: string;
  email?: string;
  stripeConfigured: boolean;
  className?: string;
};

export function CheckoutButton({
  tierId,
  tierName,
  businessSlug,
  email,
  stripeConfigured,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId,
          businessSlug: businessSlug || undefined,
          email: email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const missing =
          Array.isArray(data.missing) && data.missing.length
            ? ` Missing: ${data.missing.join(", ")}.`
            : "";
        throw new Error((data.error || "Checkout failed") + missing);
      }
      if (!data.url) throw new Error("No checkout URL returned");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  if (!stripeConfigured) {
    return (
      <div className="space-y-2">
        <Button type="button" className={className} disabled variant="secondary">
          Stripe not configured
        </Button>
        <p className="text-xs text-muted-foreground">
          Set STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
          STRIPE_PRICE_STARTER, NEXT_PUBLIC_APP_URL in Vercel, then redeploy.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        className={className}
        disabled={loading}
        onClick={startCheckout}
      >
        {loading ? "Redirecting…" : `Choose ${tierName}`}
      </Button>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
