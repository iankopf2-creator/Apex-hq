import type { CSSProperties } from "react";
import Link from "next/link";
import type { BusinessProfile } from "@/lib/types";
import { getTemplate } from "@/templates/niches";
import { getNicheThemeConfig } from "@/lib/theme/configs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { business: BusinessProfile };

/**
 * Public Front Door page. Optional Theme AI tokens applied via CSS vars when
 * a niche theme config exists (mobile-first / WCAG-minded contrast pairs).
 * Hero uses credited niche stock imagery when the business has no custom photos.
 */
export function PublicSite({ business }: Props) {
  const template = getTemplate(business.niche);
  const theme = getNicheThemeConfig(business.niche);
  const cta = template?.ctaLabel ?? "Book now";
  const hints = template?.heroHints ?? [];
  const cssVars = (theme?.cssVars ?? {}) as CSSProperties;
  const customPhoto = business.photos[0];
  const hero = theme?.heroImages?.[0];
  const showStock = !customPhoto || customPhoto.includes("placeholders/");

  return (
    <div className="min-h-screen" style={cssVars}>
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{business.city}</p>
            <p className="text-lg font-semibold">{business.name}</p>
          </div>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-3 text-sm">
              <li><a className="hover:underline" href="#services">Services</a></li>
              <li><a className="hover:underline" href="#hours">Hours</a></li>
              <li>
                <Button
                  asChild
                  size="sm"
                  style={
                    theme
                      ? {
                          backgroundColor: theme.palette.primary,
                          color: theme.palette.primaryForeground,
                          minHeight: 44,
                        }
                      : { minHeight: 44 }
                  }
                >
                  <Link href={"/booking/" + business.slug}>{cta}</Link>
                </Button>
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
              <ul className="space-y-1 text-sm opacity-80">
                {hints.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                style={
                  theme
                    ? {
                        backgroundColor: theme.palette.primary,
                        color: theme.palette.primaryForeground,
                        minHeight: 44,
                      }
                    : { minHeight: 44 }
                }
              >
                <Link href={"/booking/" + business.slug}>{cta}</Link>
              </Button>
            </div>
            <figure className="relative min-h-[180px] overflow-hidden rounded-lg bg-black/25">
              {showStock && hero ? (
                <>
                  {/* Local niche JPEG — no remote hop for <2s target */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hero.src}
                    alt={hero.alt}
                    className="h-full min-h-[180px] w-full object-cover"
                    width={960}
                    height={640}
                    loading="eager"
                    decoding="async"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-black/55 px-3 py-1.5 text-[11px] leading-snug text-white/90">
                    Photo:{" "}
                    <a
                      className="underline underline-offset-2 hover:text-white"
                      href={hero.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hero.credit}
                    </a>
                    {" · "}reference only
                  </figcaption>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={customPhoto || "/placeholders/storefront.svg"}
                  alt=""
                  className="h-full min-h-[180px] w-full object-cover"
                  width={960}
                  height={640}
                />
              )}
            </figure>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-5xl px-4 py-12 sm:px-6" aria-labelledby="services-heading">
          <h2 id="services-heading" className="mb-6 text-2xl font-semibold">Services</h2>
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
            <h2 id="hours-heading" className="mb-4 text-2xl font-semibold">Hours</h2>
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
          <p>{business.name} · {business.city}</p>
          {business.phone && <p><a className="hover:underline" href={"tel:" + business.phone.replace(/[^\d+]/g, "")}>{business.phone}</a></p>}
          <p>
            <Link className="underline-offset-4 hover:underline" href="/">Powered by Apex HQ</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
