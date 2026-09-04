"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { NICHE_TEMPLATES } from "@/templates/niches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEMO_URL = "https://apex-hq-five.vercel.app";

/** Extra niches for lead-magnet audits (may not have full site templates yet). */
const LEAD_MAGNET_EXTRA_NICHES: { id: string; label: string }[] = [
  { id: "electrician", label: "Electrician" },
  { id: "roofing", label: "Roofing" },
  { id: "trucking", label: "Trucking" },
];

type AuditReportResponse = {
  ok: boolean;
  estimatesLabel?: string;
  disclaimer?: string;
  error?: string;
  report?: {
    id: string;
    estimatedMissedCallsPerMonth: number;
    estimatedLostRevenueUsd: number;
    personalizedFix: string;
    demoLink: string;
    disclaimer: string;
    confidence: number;
  };
  lead?: {
    businessName: string;
    niche?: string;
    city?: string;
    fitScore: number;
  };
};

type Props = {
  /** Optional niche id prefill from /audit/[slug] */
  defaultNiche?: string;
  defaultCity?: string;
};

export function FreeAuditForm({ defaultNiche = "", defaultCity = "" }: Props) {
  const formId = useId();
  const [businessName, setBusinessName] = useState("");
  const [niche, setNiche] = useState(defaultNiche);
  const [city, setCity] = useState(defaultCity);
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [listingNote, setListingNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditReportResponse | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/leads/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          niche: niche || undefined,
          city: city.trim() || undefined,
          phone: phone.trim() || undefined,
          website: website.trim() ? website.trim() : null,
          listingNote: listingNote.trim() || undefined,
        }),
      });
      const data = (await res.json()) as AuditReportResponse;
      if (!res.ok || !data.ok || !data.report) {
        throw new Error(data.error || "Could not generate audit");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.report) {
    const report = result.report;
    return (
      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            ESTIMATE report
          </p>
          <CardTitle className="text-xl sm:text-2xl">
            Missed-call snapshot for {result.lead?.businessName ?? "your business"}
          </CardTitle>
          <CardDescription>
            Figures below are labeled ESTIMATES — illustrative projections, not measured
            lost revenue or guarantees.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            role="status"
            aria-live="polite"
            className="grid gap-3 sm:grid-cols-2"
          >
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                ESTIMATE · missed calls / month
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums">
                {report.estimatedMissedCallsPerMonth}
              </p>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                ESTIMATE · lost revenue / month
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums">
                ${report.estimatedLostRevenueUsd.toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold">Personalized fix (scaffold)</h2>
            <p className="text-sm text-muted-foreground">{report.personalizedFix}</p>
          </div>

          <p className="rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
            {report.disclaimer || result.disclaimer}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="min-h-11">
              <Link href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                See Front Door demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-11">
              <Link href="/pricing">View pricing</Link>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="min-h-11"
              onClick={() => {
                setResult(null);
                setError(null);
              }}
            >
              Run another ESTIMATE
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Free missed-call audit</CardTitle>
        <CardDescription>
          Enter a few public details. We return an ESTIMATE-labeled report — no live SMS or
          email outreach from this page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={formId}
          onSubmit={onSubmit}
          className="space-y-5"
          noValidate
          aria-describedby={error ? `${formId}-error` : undefined}
        >
          <div className="space-y-2">
            <Label htmlFor={`${formId}-business`}>Business name</Label>
            <Input
              id={`${formId}-business`}
              name="businessName"
              autoComplete="organization"
              required
              minLength={2}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Acme Heating & Cooling"
              className="min-h-11"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${formId}-niche`}>Niche</Label>
              <Select value={niche || undefined} onValueChange={setNiche}>
                <SelectTrigger
                  id={`${formId}-niche`}
                  className="min-h-11"
                  aria-label="Business niche"
                >
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  {NICHE_TEMPLATES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                  {LEAD_MAGNET_EXTRA_NICHES.filter(
                    (n) => !NICHE_TEMPLATES.some((t) => t.id === n.id)
                  ).map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other / general</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${formId}-city`}>City</Label>
              <Input
                id={`${formId}-city`}
                name="city"
                autoComplete="address-level2"
                required
                minLength={2}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="St. Louis"
                className="min-h-11"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${formId}-phone`}>
                Phone <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 555-0100"
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${formId}-website`}>
                Website <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id={`${formId}-website`}
                name="website"
                type="url"
                autoComplete="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="min-h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${formId}-note`}>Listing note</Label>
            <Input
              id={`${formId}-note`}
              name="listingNote"
              value={listingNote}
              onChange={(e) => setListingNote(e.target.value)}
              placeholder='e.g. "call for hours" or no website listed'
              className="min-h-11"
            />
            <p id={`${formId}-note-hint`} className="text-xs text-muted-foreground">
              Optional public listing hint used only for ESTIMATE scoring — not sent outbound.
            </p>
          </div>

          {error ? (
            <p
              id={`${formId}-error`}
              role="alert"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm"
            >
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="min-h-11 w-full sm:w-auto"
            disabled={submitting || businessName.trim().length < 2 || city.trim().length < 2}
          >
            {submitting ? "Generating ESTIMATE…" : "Get free ESTIMATE audit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
