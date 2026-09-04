"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NICHE_TEMPLATES, getTemplate } from "@/templates/niches";
import type { BusinessHours, NicheId, ServiceItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckoutButton } from "@/components/pricing/checkout-button";

const STEPS = ["Business", "Niche & city", "Hours", "Services", "Photos", "Review"] as const;

const emptyHours: BusinessHours = {
  mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "",
};

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState<NicheId | "">("");
  const [city, setCity] = useState("");
  const [hours, setHours] = useState<BusinessHours>(emptyHours);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [photos, setPhotos] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [stripeConfigured, setStripeConfigured] = useState(false);

  const template = useMemo(() => (niche ? getTemplate(niche) : undefined), [niche]);

  function applyTemplateDefaults(nextNiche: NicheId) {
    const t = getTemplate(nextNiche);
    if (!t) return;
    setHours(t.defaultHours);
    setServices(
      t.defaultServices.map((s, i) => ({
        id: "svc-" + nextNiche + "-" + i,
        name: s.name,
        description: s.description,
        priceFrom: s.priceFrom,
      }))
    );
  }

  function updateService(index: number, patch: Partial<ServiceItem>) {
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function canContinue(): boolean {
    if (step === 0) return name.trim().length >= 2;
    if (step === 1) return Boolean(niche) && city.trim().length >= 2;
    if (step === 2) return Object.values(hours).some((v) => v.trim().length > 0);
    if (step === 3) return services.some((s) => s.name.trim().length > 0);
    return true;
  }

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          niche,
          city,
          hours,
          services: services.filter((s) => s.name.trim()),
          photos: photos.filter((p) => p.trim()),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      let configured = false;
      try {
        const status = await fetch("/api/stripe/checkout");
        const statusJson = await status.json();
        configured = Boolean(statusJson.configured);
      } catch {
        configured = false;
      }
      setStripeConfigured(configured);
      setPublishedSlug(data.slug);
      setSaving(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSaving(false);
    }
  }

  if (publishedSlug) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Site published</CardTitle>
          <CardDescription>
            Your front door is live at /s/{publishedSlug}. Start Starter ($49/mo) via Stripe when ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href={"/s/" + publishedSlug}>View public site</Link>
          </Button>
          <CheckoutButton
            tierId="starter"
            tierName="Starter ($49/mo)"
            businessSlug={publishedSlug}
            stripeConfigured={stripeConfigured}
            className="w-full"
          />
          <Button asChild variant="outline" className="w-full">
            <Link href={"/pricing?slug=" + encodeURIComponent(publishedSlug)}>
              See all plans
            </Link>
          </Button>
          {!stripeConfigured && (
            <p className="text-xs text-muted-foreground">
              Stripe not configured. Ian must set STRIPE_SECRET_KEY,
              NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_PRICE_STARTER,
              NEXT_PUBLIC_APP_URL in Vercel, then redeploy.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </CardDescription>
        <ol className="flex flex-wrap gap-2 pt-2" aria-label="Progress">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={
                "rounded-full px-2 py-0.5 text-xs " +
                (i === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground")
              }
              aria-current={i === step ? "step" : undefined}
            >
              {label}
            </li>
          ))}
        </ol>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 0 && (
          <div className="space-y-2">
            <Label htmlFor="business-name">Business name</Label>
            <Input
              id="business-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your business name"
              autoComplete="organization"
              required
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="niche">Niche</Label>
              <Select
                value={niche}
                onValueChange={(v) => {
                  const n = v as NicheId;
                  setNiche(n);
                  applyTemplateDefaults(n);
                }}
              >
                <SelectTrigger id="niche" aria-label="Select niche">
                  <SelectValue placeholder="Choose a niche" />
                </SelectTrigger>
                <SelectContent>
                  {NICHE_TEMPLATES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City served"
                autoComplete="address-level2"
                required
              />
            </div>
            {template && (
              <p className="text-sm text-muted-foreground">
                Template: {template.label} — {template.defaultTagline}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Hours</legend>
            {(Object.keys(hours) as (keyof BusinessHours)[]).map((day) => (
              <div key={day} className="grid grid-cols-[4rem_1fr] items-center gap-2">
                <Label htmlFor={"hours-" + day} className="capitalize">
                  {day}
                </Label>
                <Input
                  id={"hours-" + day}
                  value={hours[day]}
                  onChange={(e) => setHours((h) => ({ ...h, [day]: e.target.value }))}
                  placeholder="Closed or 9:00 AM – 5:00 PM"
                />
              </div>
            ))}
          </fieldset>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {services.map((svc, i) => (
              <div key={svc.id} className="space-y-2 rounded-md border p-3">
                <Label htmlFor={"svc-name-" + i}>Service name</Label>
                <Input
                  id={"svc-name-" + i}
                  value={svc.name}
                  onChange={(e) => updateService(i, { name: e.target.value })}
                />
                <Label htmlFor={"svc-desc-" + i}>Description</Label>
                <Input
                  id={"svc-desc-" + i}
                  value={svc.description || ""}
                  onChange={(e) => updateService(i, { description: e.target.value })}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setServices((s) => [
                  ...s,
                  { id: "svc-custom-" + s.length, name: "", description: "" },
                ])
              }
            >
              Add service
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Photo URLs or local placeholders (storage stub). Leave blank for defaults.
            </p>
            {photos.map((p, i) => (
              <div key={i} className="space-y-1">
                <Label htmlFor={"photo-" + i}>Photo {i + 1}</Label>
                <Input
                  id={"photo-" + i}
                  value={p}
                  onChange={(e) =>
                    setPhotos((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))
                  }
                  placeholder="/placeholders/storefront.svg"
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => setPhotos((p) => [...p, ""])}>
              Add photo field
            </Button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {name}</p>
            <p><span className="font-medium">Niche:</span> {niche}</p>
            <p><span className="font-medium">City:</span> {city}</p>
            <p><span className="font-medium">Services:</span> {services.filter((s) => s.name).length}</p>
            <p className="text-muted-foreground">
              After publish you can start Starter checkout ($49/mo) via Stripe, or view the public site.
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0 || saving}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" disabled={!canContinue()} onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          ) : (
            <Button type="button" disabled={saving || !canContinue()} onClick={submit}>
              {saving ? "Publishing…" : "Publish site"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
