import Link from "next/link";
import { FreeAuditForm } from "@/components/audit/free-audit-form";

export const metadata = {
  title: "Free Audit | Apex HQ",
  description:
    "Public free missed-call audit — ESTIMATE-labeled report for local businesses. No live outreach.",
};

export default function AuditPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">Apex HQ · Lead magnet</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Free audit</h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            See an ESTIMATE of missed calls and lost revenue, then try the Front Door demo.
            This page never sends SMS or email.
          </p>
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
