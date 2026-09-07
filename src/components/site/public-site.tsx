import type { CSSProperties } from "react";
import Link from "next/link";
import type { BusinessProfile } from "@/lib/types";
import { getTemplate } from "@/templates/niches";
import { getNicheThemeConfig } from "@/lib/theme/configs";
import {
  getPublicPhoneDigits,
  getPublicPhoneDisplay,
} from "@/lib/public-phone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { business: BusinessProfile };

const TAP = "min-h-12 min-w-[48px]";

/**
 * Public Front Door. Theme tokens via CSS vars; credited niche stock when no
 * custom photos. Sticky dual CTA uses theme ctaPriority (call_first / book_first /
 * hybrid). tel: uses trackingPhone || phone only — never lsaPhone.
 */
export function PublicSite({ business }: Props) {
  const template = getTemplate(business.niche);
  const theme = getNicheThemeConfig(business.niche);
  const bookLabel = template?.ctaLabel ?? "Book now";
  const hints = template?.heroHints ?? [];
  const cssVars = (theme?.cssVars ?? {}) as CSSProperties;
  const customPhoto = business.photos[0];
  const hero = theme?.heroImages?.[0];
  const showStock = !customPhoto || customPhoto.includes("placeholders/");
  const phoneDigits = getPublicPhoneDigits(business);
  const phoneDisplay = getPublicPhoneDisplay(business);
  const telHref = phoneDigits ? "tel:" + phoneDigits : null;
  const bookHref = "/booking/" + business.slug;
  const mode = theme?.copyTone.ctaPriority ?? "book_first";
  const callPrimary = mode === "call_first";
  // hybrid + book_first: book leads; call secondary when present
  const bookPrimary = !callPrimary;

  const primaryStyle = theme
    ? {
        backgroundColor: theme.palette.primary,
        color: theme.palette.primaryForeground,
      }
    : undefined;
  const accentStyle = theme
    ? {
        backgroundColor: theme.palette.accent,
        color: theme.palette.accentForeground,
      }
    : undefined;

  const callBtn = telHref ? (
    <Button
      asChild
      size="lg"
      className={`${TAP} flex-1 sm:flex-none`}
      style={callPrimary ? primaryStyle : undefined}
      variant={callPrimary ? "default" : "secondary"}
    >
      <a href={telHref}>Call now</a>
    </Button>
  ) : null;

  const bookBtn = (
    <Button
      asChild
      size="lg"
      className={`${TAP} flex-1 sm:flex-none`}
      style={bookPrimary || !telHref ? primaryStyle : undefined}
      variant={bookPrimary || !telHref ? "default" : "secondary"}
    >
      <Link href={bookHref}>{bookLabel}</Link>
    </Button>
  );

  const heroPrimary = callPrimary && callBtn ? callBtn : bookBtn;
  const heroSecondary =
    callPrimary && callBtn
      ? bookBtn
      : callBtn
        ? callBtn
        : null;

  return (
    <div className="min-h-screen pb-24" style={cssVars}>
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
              {business.city?.trim() ? (
                <li>
                  <a className="hover:underline" href="#service-area">
                    Service area
                  </a>
                </li>
              ) : null}
              <li className="hidden sm:block">
                {callPrimary && telHref ? (
                  <Button asChild size="sm" className="min-h-11" style={primaryStyle}>
                    <a href={telHref}>Call</a>
                  </Button>
                ) : (
                  <Button asChild size="sm" className="min-h-11" style={primaryStyle}>
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
          style={
            accentStyle ?? {
              backgroundColor: "#0f172a",
              color: "#ffffff",
            }
          }
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
              <ul className="flex flex-wrap gap-2 text-xs" aria-label="Trust">
                {hints.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="rounded-full bg-black/25 px-3 py-1 opacity-95"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {heroPrimary}
                {heroSecondary && heroSecondary !== heroPrimary ? heroSecondary : null}
              </div>
            </div>
            <div
              className="relative flex min-h-[180px] items-end overflow-hidden rounded-lg text-sm"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
            >
              {showStock && hero?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hero.src}
                  alt={hero.alt || `${business.niche} trade photo`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <p className="relative z-10 p-4 opacity-90">
                  {(customPhoto || "/placeholders/storefront.svg").replace(/^\//, "")}
                </p>
              )}
              {showStock && hero?.credit ? (
                <p className="relative z-10 w-full bg-black/50 p-2 text-[10px] opacity-90">
                  {hero.sourceUrl ? (
                    <a
                      className="underline-offset-2 hover:underline"
                      href={hero.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hero.credit}
                    </a>
                  ) : (
                    hero.credit
                  )}
                </p>
              ) : null}
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

        {business.city?.trim() ? (
          <section
            id="service-area"
            className="border-t bg-slate-50"
            aria-labelledby="service-area-heading"
          >
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <h2 id="service-area-heading" className="mb-4 text-2xl font-semibold">
                Service area
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Serving {business.city.trim()} and nearby areas. Call or book a visit to
                confirm we cover your address.
              </p>
            </div>
          </section>
        ) : null}

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

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:hidden"
        role="region"
        aria-label="Quick actions"
      >
        <div className="mx-auto flex max-w-5xl gap-3">
          {callPrimary && telHref ? (
            <>
              <Button asChild className={`${TAP} flex-1`} style={primaryStyle}>
                <a href={telHref}>Call now</a>
              </Button>
              <Button asChild variant="secondary" className={`${TAP} flex-1`}>
                <Link href={bookHref}>{bookLabel}</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className={`${TAP} flex-1`} style={primaryStyle}>
                <Link href={bookHref}>{bookLabel}</Link>
              </Button>
              {telHref ? (
                <Button asChild variant="secondary" className={`${TAP} flex-1`}>
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
