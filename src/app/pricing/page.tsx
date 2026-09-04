import Link from "next/link";
import {
  STRIPE_TIERS,
  isStripeConfigured,
  missingStripeEnvVars,
  REQUIRED_STRIPE_ENV_VARS,
  OPTIONAL_STRIPE_ENV_VARS,
} from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutButton } from "@/components/pricing/checkout-button";

type Props = {
  searchParams?: {
    checkout?: string;
    tier?: string;
    slug?: string;
  };
};

export default function PricingPage({ searchParams }: Props) {
  const stripeReady = isStripeConfigured();
  const missing = missingStripeEnvVars();
  const checkoutStatus = searchParams?.checkout;
  const slug = searchParams?.slug;

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
        <p className="text-muted-foreground">
          Starter $49 · Growth $99 · Pro $199 / month. Payments go through Stripe Checkout only.
        </p>
        <p className="text-sm">
          {stripeReady
            ? "Stripe configured — checkout sessions create live Stripe subscriptions."
            : "Stripe not configured — checkout disabled until Ian sets Vercel env vars and redeploys."}
        </p>
        {!stripeReady && (
          <div
            role="status"
            className="rounded-md border border-dashed bg-muted/40 px-3 py-3 text-sm space-y-2"
          >
            <p className="font-medium">Required Vercel env vars</p>
            <ul className="list-disc pl-5 text-muted-foreground">
              {REQUIRED_STRIPE_ENV_VARS.map((k) => (
                <li key={k}>
                  <code>{k}</code>
                  {missing.includes(k) ? " (missing)" : ""}
                </li>
              ))}
            </ul>
            <p className="font-medium pt-1">Optional</p>
            <ul className="list-disc pl-5 text-muted-foreground">
              {OPTIONAL_STRIPE_ENV_VARS.map((k) => (
                <li key={k}>
                  <code>{k}</code>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              Create recurring Price IDs in Stripe Dashboard (Products → Prices), paste them into
              env, set <code>NEXT_PUBLIC_APP_URL</code> to the deploy URL, then redeploy.
            </p>
          </div>
        )}
        {checkoutStatus === "success" && (
          <p role="status" className="rounded-md bg-secondary px-3 py-2 text-sm">
            Payment received via Stripe
            {searchParams?.tier ? ` (${searchParams.tier})` : ""}.
            {slug ? (
              <>
                {" "}
                Site:{" "}
                <Link href={`/s/${slug}`} className="underline-offset-4 hover:underline">
                  /s/{slug}
                </Link>
              </>
            ) : null}
          </p>
        )}
        {checkoutStatus === "cancel" && (
          <p role="status" className="rounded-md bg-muted px-3 py-2 text-sm">
            Checkout canceled. You can try again when ready.
          </p>
        )}
      </header>

      <ul className="grid gap-4 md:grid-cols-3">
        {STRIPE_TIERS.map((tier) => (
          <li key={tier.id}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>${tier.priceMonthly}/mo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {tier.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <CheckoutButton
                  tierId={tier.id}
                  tierName={tier.name}
                  businessSlug={slug}
                  stripeConfigured={stripeReady}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm">
        <Link href="/" className="underline-offset-4 hover:underline">
          ← Home
        </Link>
        {" · "}
        <Link href="/onboarding" className="underline-offset-4 hover:underline">
          Onboarding
        </Link>
      </p>
    </main>
  );
}
