import Link from "next/link";
import { listBusinesses } from "@/lib/store";
import { listAiLogs } from "@/lib/ai-log";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const businesses = await listBusinesses();
  const logs = listAiLogs();

  return (
    <main id="main" className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Module 0.1 shell — AI receptionist / calls live elsewhere later.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/onboarding">New business</Link>
        </Button>
      </header>

      <section aria-labelledby="biz-heading">
        <h2 id="biz-heading" className="mb-3 text-lg font-semibold">Businesses</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {businesses.length === 0 && (
            <li className="text-sm text-muted-foreground">No businesses yet. Run onboarding or seed demo.</li>
          )}
          {businesses.map((b) => (
            <li key={b.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{b.name}</CardTitle>
                  <CardDescription>{b.city} · {b.niche}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2 text-sm">
                  <Link className="text-primary underline-offset-4 hover:underline" href={"/s/" + b.slug}>
                    View site
                  </Link>
                  <Link className="underline-offset-4 hover:underline" href={"/booking/" + b.slug}>
                    Booking
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ai-heading">
        <h2 id="ai-heading" className="mb-3 text-lg font-semibold">AI response logs (stub)</h2>
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            {logs.length === 0
              ? "No AI logs yet. Helper at src/lib/ai-log.ts — wire after receptionist module."
              : logs.slice(-5).map((l) => (
                  <p key={l.id}>{l.createdAt}: [{l.source}] {l.promptSummary}</p>
                ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
