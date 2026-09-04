"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServiceOption = { id: string; name: string };

type Props = {
  businessSlug: string;
  businessName: string;
  services: ServiceOption[];
  ctaLabel?: string;
};

type SubmitResult = {
  ok: boolean;
  message?: string;
  error?: string;
  request?: { id: string; preferredTime: string; serviceName?: string };
};

export function BookingForm({
  businessSlug,
  businessName,
  services,
  ctaLabel = "Request appointment",
}: Props) {
  const formId = useId();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceName, setServiceName] = useState(services[0]?.name ?? "");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSlug,
          customerName: customerName.trim(),
          phone: phone.trim() || undefined,
          email: email.trim() || undefined,
          serviceName: serviceName || undefined,
          preferredTime: preferredTime.trim(),
          notes: notes.trim() || undefined,
        }),
      });
      const data = (await res.json()) as SubmitResult;
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not save booking request");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="space-y-4" role="status">
        <p className="text-sm font-medium text-primary">Request received (stub)</p>
        <p className="text-sm text-muted-foreground">
          Thanks, {customerName}. {businessName} would see this request in a later
          dashboard. No calendar invite, SMS, or email was sent.
        </p>
        <ul className="space-y-1 text-sm">
          {result.request?.serviceName ? (
            <li>
              <span className="text-muted-foreground">Service: </span>
              {result.request.serviceName}
            </li>
          ) : null}
          <li>
            <span className="text-muted-foreground">Preferred: </span>
            {result.request?.preferredTime ?? preferredTime}
          </li>
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setResult(null);
              setCustomerName("");
              setPhone("");
              setEmail("");
              setPreferredTime("");
              setNotes("");
            }}
          >
            Submit another
          </Button>
          <Button asChild variant="secondary">
            <Link href={"/s/" + businessSlug}>Back to site</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={onSubmit}
      aria-describedby={formId + "-note"}
    >
      <p id={formId + "-note"} className="text-sm text-muted-foreground">
        Stub intake only — saves a request for the demo dashboard. No Google Calendar,
        payments, or live outreach.
      </p>
      <div className="space-y-2">
        <Label htmlFor={formId + "-name"}>Your name</Label>
        <Input
          id={formId + "-name"}
          name="name"
          required
          autoComplete="name"
          className="min-h-11"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={formId + "-phone"}>Phone</Label>
        <Input
          id={formId + "-phone"}
          name="phone"
          type="tel"
          autoComplete="tel"
          className="min-h-11"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={formId + "-email"}>Email (optional)</Label>
        <Input
          id={formId + "-email"}
          name="email"
          type="email"
          autoComplete="email"
          className="min-h-11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {services.length > 0 ? (
        <div className="space-y-2">
          <Label htmlFor={formId + "-service"}>Service</Label>
          <Select value={serviceName} onValueChange={setServiceName}>
            <SelectTrigger id={formId + "-service"} className="min-h-11">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor={formId + "-preferred"}>Preferred time</Label>
        <Input
          id={formId + "-preferred"}
          name="preferred"
          required
          placeholder="e.g. Tomorrow afternoon"
          className="min-h-11"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={formId + "-notes"}>Notes (optional)</Label>
        <Input
          id={formId + "-notes"}
          name="notes"
          className="min-h-11"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="min-h-11" disabled={submitting}>
        {submitting ? "Saving…" : ctaLabel + " (stub)"}
      </Button>
    </form>
  );
}
