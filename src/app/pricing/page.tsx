import Link from "next/link";
import { STRIPE_TIERS, createCheckoutStub, isStripeConfigured } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { searchParams?: { checkout?: string; tier?: string } };

export default function PricingPage({ searchParams }: Props) {
  const stripeReady = isStripeConfigured();
  const checkoutNote = searchParams?.checkout;

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
        <p className="text-muted-foreground">
          Starter $49 · Growth $99 · Pro $199 / month. Stripe checkout is stubbed until keys are set.
        </p>
        <p className="text-sm">{stripeReady ? "Stripe env detected." : "Stripe not configured — using local stubs."}</p>
        {checkoutNote && (
          <p role="status" className="rounded-md bg-secondary px-3 py-2 text-sm">
            Checkout stub received: {checkoutNote}
          </p>
        )}
      </header>

      <ul className="grid gap-4 md:grid-cols-3">
        {STRIPE_TIERS.map((tier) => {
          const stub = createCheckoutStub(tier.id);
          return (
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
                  <Button asChild className="w-full">
                    <Link href={stub.url}>Choose {tier.name} (stub)</Link>
                  </Button>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-sm">
        <Link href="/" className="underline-offset-4 hover:underline">← Home</Link>
      </p>
    </main>
  );
}
