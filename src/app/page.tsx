import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6">
      <header className="space-y-4">
        <p className="text-sm font-medium text-primary">Apex HQ · Module 0.1</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Local Business Front Door
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Spin up a mobile-first branded site, capture leads, and take booking requests for HVAC,
          plumbers, salons, and more — templated, not hardcoded.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/audit">Free ESTIMATE audit</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/onboarding">Start onboarding</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View pricing</Link>
          </Button>
          <form action="/api/demo" method="post">
            <Button type="submit" variant="secondary" size="lg">
              Seed Dallas HVAC demo
            </Button>
          </form>
        </div>
      </header>

      <section aria-labelledby="routes-heading" className="grid gap-4 sm:grid-cols-2">
        <h2 id="routes-heading" className="sr-only">Key routes</h2>
        {[
          { href: "/audit", title: "Free ESTIMATE audit", desc: "Illustrative missed-call / revenue snapshot — no live outreach" },
          { href: "/onboarding", title: "Onboarding wizard", desc: "Name, niche, city, hours, services, photos" },
          { href: "/pricing", title: "Starter from $49/mo", desc: "Intended plans; checkout only when payments are configured" },
          { href: "/s/demo-dallas-hvac", title: "Public Front Door", desc: "Branded /s/[slug] preview" },
          { href: "/booking/demo-dallas-hvac", title: "Booking", desc: "Stub booking flow per slug" },
          { href: "/dashboard", title: "Dashboard", desc: "Owner stub — Module 0.1 shell only" },
        ].map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <CardTitle className="text-lg">
                <Link className="hover:underline" href={item.href}>{item.title}</Link>
              </CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-muted-foreground">{item.href}</code>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
