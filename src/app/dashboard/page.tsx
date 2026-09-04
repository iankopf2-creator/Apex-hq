import Link from "next/link";
import { getDemoBusiness, listBusinesses } from "@/lib/store";
import { listAiLogs } from "@/lib/ai-log";
import { listBookingRequests } from "@/lib/booking/store";
import { isStripeConfigured, missingStripeEnvVars } from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Apex HQ",
  description: "Owner shell — businesses, stub bookings, and AI log helper.",
};

export default async function DashboardPage() {
  const stored = await listBusinesses();
  const demo = getDemoBusiness();
  const businesses =
    stored.some((b) => b.slug === demo.slug) ? stored : [demo, ...stored];
  const logs = listAiLogs();
  const allBookings = await listBookingRequests();
  const bookings = allBookings.slice(-8).reverse();
  const stripeOk = isStripeConfigured();
  const missingStripe = missingStripeEnvVars();

  return (
    <main id="main" className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Apex HQ · Owner shell</p>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Module 0.1 — stub bookings + AI log helper. Live receptionist later.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost" className="min-h-11">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-11">
            <Link href="/audit">Free audit</Link>
          </Button>
          <Button asChild variant="outline" className="min-h-11">
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button asChild className="min-h-11">
            <Link href="/onboarding">New business</Link>
          </Button>
        </div>
      </header>

      <section aria-labelledby="stats-heading" className="grid gap-3 sm:grid-cols-3">
        <h2 id="stats-heading" className="sr-only">Snapshot</h2>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Businesses</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{businesses.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Includes always-on demo Dallas HVAC when store is empty.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Stub booking requests</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{allBookings.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Intake only — no calendar or SMS sent.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Stripe checkout</CardDescription>
            <CardTitle className="text-xl">
              {stripeOk ? "Configured" : "Not configured"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            {stripeOk
              ? "Starter checkout env present. Ian still owns Production verification."
              : "Missing env names: " + missingStripe.join(", ") + " (values never shown)."}
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="biz-heading">
        <h2 id="biz-heading" className="mb-3 text-lg font-semibold">Businesses</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {businesses.map((b) => (
            <li key={b.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{b.name}</CardTitle>
                  <CardDescription>
                    {b.city} · {b.niche}
                    {b.slug === "demo-dallas-hvac" ? " · demo" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3 text-sm">
                  <Link
                    className="min-h-11 text-primary underline-offset-4 hover:underline"
                    href={"/s/" + b.slug}
                  >
                    View site
                  </Link>
                  <Link
                    className="min-h-11 underline-offset-4 hover:underline"
                    href={"/booking/" + b.slug}
                  >
                    Booking
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="booking-heading">
        <h2 id="booking-heading" className="mb-3 text-lg font-semibold">
          Recent booking requests (stub)
        </h2>
        <Card>
          <CardContent className="space-y-3 pt-6 text-sm">
            {bookings.length === 0 ? (
              <p className="text-muted-foreground">
                No stub requests yet. Try{" "}
                <Link
                  className="underline-offset-4 hover:underline"
                  href="/booking/demo-dallas-hvac"
                >
                  /booking/demo-dallas-hvac
                </Link>
                .
              </p>
            ) : (
              <ul className="space-y-3">
                {bookings.map((r) => (
                  <li
                    key={r.id}
                    className="border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <p className="font-medium">
                      {r.customerName}{" "}
                      <span className="font-normal text-muted-foreground">
                        → {r.businessName}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      {r.serviceName ? r.serviceName + " · " : ""}
                      {r.preferredTime}
                      {" · "}
                      <time dateTime={r.createdAt}>
                        {new Date(r.createdAt).toLocaleString()}
                      </time>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="ai-heading">
        <h2 id="ai-heading" className="mb-3 text-lg font-semibold">
          AI response logs (stub)
        </h2>
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            {logs.length === 0
              ? "No AI logs yet. Helper at src/lib/ai-log.ts — wire after receptionist module."
              : logs.slice(-5).map((l) => (
                  <p key={l.id}>
                    {l.createdAt}: [{l.source}] {l.promptSummary}
                  </p>
                ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
