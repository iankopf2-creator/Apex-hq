import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/store";
import { getTemplate } from "@/templates/niches";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { params: { slug: string } };

export default async function BookingPage({ params }: Props) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) notFound();
  const template = getTemplate(business.niche);

  return (
    <main id="main" className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <p className="text-sm text-muted-foreground">
        <Link href={"/s/" + business.slug} className="underline-offset-4 hover:underline">
          ← Back to {business.name}
        </Link>
      </p>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Book with {business.name}</CardTitle>
          <CardDescription>
            Booking stub — calendar sync (Google) and payments not wired yet.{" "}
            {template?.ctaLabel}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="#" method="post" aria-describedby="booking-stub-note">
            <p id="booking-stub-note" className="text-sm text-muted-foreground">
              Submitting shows a confirmation message only (no backend booking yet).
            </p>
            <div className="space-y-2">
              <Label htmlFor="customer-name">Your name</Label>
              <Input id="customer-name" name="name" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Phone</Label>
              <Input id="customer-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferred">Preferred time</Label>
              <Input id="preferred" name="preferred" placeholder="e.g. Tomorrow afternoon" />
            </div>
            <Button type="submit">Request appointment (stub)</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
