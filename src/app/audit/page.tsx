import Link from "next/link";
import { FreeAuditForm } from "@/components/audit/free-audit-form";

export const metadata = {
  title: "Free Missed-Call ESTIMATE | Apex HQ",
  description:
    "Get an ESTIMATE of what missed calls may be costing your local business. Assumptions visible. No credit card. No SMS or email from this page.",
};

export default function AuditPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary">Apex HQ · Free ESTIMATE</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How much revenue might missed calls be costing you?
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            In about two minutes, we&apos;ll show an{" "}
            <span className="font-medium text-foreground">ESTIMATE</span> of
            missed-call leakage and illustrative revenue impact for your niche and
            city — then a soft path to a Front Door demo. Every number is labeled
            ESTIMATE. Assumptions stay visible. No credit card. This page never
            sends SMS or email.
          </p>
          <ul className="max-w-xl list-disc space-y-1 pl-5 text-xs text-muted-foreground">
            <li>Few fields — business name, niche, city (phone and website optional)</li>
            <li>ESTIMATE labels on every figure — not measured Apex customer data</li>
            <li>Report is yours either way; demo and pricing are optional next steps</li>
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
      <p className="mt-8 text-xs text-muted-foreground">
        Apex HQ LLC · Missouri · Free audit = ESTIMATE snapshot only · No SMS/email
        from this page · Checkout separate on /pricing
      </p>
    </main>
  );
}
