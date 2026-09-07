import Link from "next/link";
import { FreeAuditForm } from "@/components/audit/free-audit-form";

export const metadata = {
  title: "Free Missed-Call Audit | Apex HQ",
  description:
    "Free ESTIMATE of missed calls and lost revenue for local service businesses. No live SMS or email from this page.",
};

export default function AuditPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary">Apex HQ · Lead magnet</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How much revenue did missed calls cost you this month?
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Get a free <span className="font-medium text-foreground">ESTIMATE</span> snapshot —
            illustrative missed-call and revenue math, then a Front Door demo. No credit card.
            This page never sends SMS or email.
          </p>
          <ul className="max-w-xl list-disc space-y-1 pl-5 text-xs text-muted-foreground">
            <li>Few fields — name, niche, city (phone/website optional)</li>
            <li>ESTIMATE labels on every number — not measured Apex data</li>
            <li>Report is yours either way; soft path to demo and pricing after</li>
          </ul>
        </div>
        <Link
          className="min-h-11 text-sm text-muted-foreground underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>
      </div>
      <FreeAuditForm />
    </main>
  );
}
