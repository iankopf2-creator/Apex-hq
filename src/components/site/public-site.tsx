import type { CSSProperties } from "react";
import Link from "next/link";
import type { BusinessProfile } from "@/lib/types";
import { getTemplate } from "@/templates/niches";
import { getNicheThemeConfig } from "@/lib/theme/configs";
import {
  getPublicPhoneDigits,
  getPublicPhoneDisplay,
  isCallFirstNiche,
} from "@/lib/public-phone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { business: BusinessProfile };

/**
 * Public Front Door page. Optional Theme AI tokens applied via CSS vars when
 * a niche theme config exists (mobile-first / WCAG-minded contrast pairs).
 *
 * CTA rules (Research + QA):
 * - Call-first niches (HVAC/plumber/electrical/roofing/pest): sticky Call primary.
 * - Salon: Book primary, Call secondary when a public number exists.
 * - tel: uses trackingPhone || phone only — never lsaPhone.
 * - No CallRail snippet unless callTrackingOptIn.
 */
export function PublicSite({ business }: Props) {
  const template = getTemplate(business.niche);
  const theme = getNicheThemeConfig(business.niche);
  const bookLabel = template?.ctaLabel ?? "Book now";
  const hints = template?.heroHints ?? [];
  const cssVars = (theme?.cssVars ?? {}) as CSSProperties;
  const callFirst = isCallFirstNiche(business.niche);
  const phoneDigits = getPublicPhoneDigits(business);
  const phoneDisplay = getPublicPhoneDisplay(business);
  const telHref = phoneDigits ? "tel:" + phoneDigits : null;
  const bookHref = "/booking/" + business.slug;
  // lsaPhone must never appear in HTML (ops/LSA destination only).
  // CallRail JS snippet intentionally omitted unless callTrackingOptIn — not injected here.

  const callButton = telHref ? (
    <Button asChild size="lg" className="min-h-12 min-w-[48px] flex-1 sm:flex-none">
      <a href={telHref}>Call now</a>
    </Button>
  ) : null;

  const bookButton = (
    <Button
      asChild
      size="lg"
      variant={callFirst && telHref ? "secondary" : "default"}
      className="min-h-12 min-w-[48px] flex-1 sm:flex-none"
    >
      <Link href={bookHref}>{bookLabel}</Link>
    </Button>
  );

  const heroPrimary = callFirst && callButton ? callButton : bookButton;
  const heroSecondary =
    callFirst && callButton
      ? bookButton
      : callButton
        ? (
            <Button asChild size="lg" variant="secondary" className="min-h-12 min-w-[48px] flex-1 sm:flex-none">
              <a href={telHref!}>Call now</a>
            </Button>
          )
        : null;

  return (
    <div className="min-h-screen pb-24" style={cssVars}>
      {/* scroll-padding so sticky CTA does not obscure focused controls */}
      <style>{`html { scroll-padding-bottom: 6rem; }`}</style>
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{business.city}</p>
            <p className="text-lg font-semibold">{business.name}</p>
          </div>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-3 text-sm">
              <li>
                <a className="hover:underline" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#hours">
                  Hours
                </a>
              </li>
              <li className="hidden sm:block">
                {callFirst && telHref ? (
                  <Button asChild size="sm" className="min-h-11">
                    <a href={telHref}>Call</a>
                  </Button>
                ) : (
                  <Button asChild size="sm" className="min-h-11">
                    <Link href={bookHref}>{bookLabel}</Link>
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section
          className="text-white"
          style={{
            backgroundColor: theme?.palette.accent ?? "#0f172a",
            color: theme?.palette.accentForeground ?? "#ffffff",
          }}
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6">
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ fontFamily: theme?.fonts.heading }}
              >
                {business.name}
              </h1>
              <p className="text-lg opacity-90">{business.tagline || template?.defaultTagline}</p>
              <ul className="space-y-1 text-sm opacity-80" aria-label="Highlights">
                {hints.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {heroPrimary}
                {heroSecondary}
              </div>
            </div>
            <div
              className="flex min-h-[180px] items-end rounded-lg p-4 text-sm opacity-90"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              role="img"
              aria-label="Business photo placeholder"
            >
              {(business.photos[0] || "/placeholders/storefront.svg").replace(/^\//, "")}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-5xl px-4 py-12 sm:px-6"
          aria-labelledby="services-heading"
        >
          <h2 id="services-heading" className="mb-6 text-2xl font-semibold">
            Services
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {business.services.map((svc) => (
              <li key={svc.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{svc.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-muted-foreground">
                    <p>{svc.description}</p>
                    {typeof svc.priceFrom === "number" && svc.priceFrom > 0 && (
                      <p>From ${svc.priceFrom}</p>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section id="hours" className="border-t bg-white" aria-labelledby="hours-heading">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <h2 id="hours-heading" className="mb-4 text-2xl font-semibold">
              Hours
            </h2>
            <dl className="grid max-w-md grid-cols-2 gap-2 text-sm">
              {Object.entries(business.hours).map(([day, value]) => (
                <div key={day} className="contents">
                  <dt className="capitalize font-medium">{day}</dt>
                  <dd className="text-muted-foreground">{value || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <p>
            {business.name} · {business.city}
          </p>
          {phoneDisplay && telHref ? (
            <p>
              <a className="hover:underline" href={telHref}>
                {phoneDisplay}
              </a>
            </p>
          ) : null}
          <p>
            <Link className="underline-offset-4 hover:underline" href="/">
              Powered by Apex HQ
            </Link>
          </p>
        </div>
      </footer>

      {/* Sticky mobile dual CTA — max 2 actions, ~48px taps, reserves bottom space via pb-24 */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:hidden"
        role="region"
        aria-label="Quick actions"
      >
        <div className="mx-auto flex max-w-5xl gap-3">
          {callFirst && telHref ? (
            <>
              <Button asChild className="min-h-12 min-w-[48px] flex-1">
                <a href={telHref}>Call now</a>
              </Button>
              <Button asChild variant="secondary" className="min-h-12 min-w-[48px] flex-1">
                <Link href={bookHref}>{bookLabel}</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="min-h-12 min-w-[48px] flex-1">
                <Link href={bookHref}>{bookLabel}</Link>
              </Button>
              {telHref ? (
                <Button asChild variant="secondary" className="min-h-12 min-w-[48px] flex-1">
                  <a href={telHref}>Call now</a>
                </Button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
