import Link from "next/link";
import { FreeAuditForm } from "@/components/audit/free-audit-form";
import { NICHE_TEMPLATES } from "@/templates/niches";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const niche = NICHE_TEMPLATES.find((t) => t.id === params.slug);
  const label = niche?.label ?? params.slug;
  return {
    title: `Free Audit · ${label} | Apex HQ`,
    description: `Public free missed-call audit for ${label} — ESTIMATE-labeled, no live outreach.`,
  };
}

export default function AuditSlugPage({ params }: Props) {
  const nicheMatch = NICHE_TEMPLATES.find((t) => t.id === params.slug);
  const defaultNiche = nicheMatch?.id ?? "";

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">Apex HQ · Lead magnet</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Free audit{nicheMatch ? ` · ${nicheMatch.label}` : ""}
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Niche-aware entry for later voice flow. ESTIMATES only — no live SMS or email from
            this page.
            {!nicheMatch ? (
              <>
                {" "}
                Unknown slug <code className="text-xs">{params.slug}</code> — form still works
                without a niche prefill.
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-sm">
          <Link className="underline-offset-4 hover:underline" href="/audit">
            All niches
          </Link>
          <Link
            className="text-muted-foreground underline-offset-4 hover:underline"
            href="/"
          >
            Home
          </Link>
        </div>
      </div>
      <FreeAuditForm defaultNiche={defaultNiche} />
    </main>
  );
}
