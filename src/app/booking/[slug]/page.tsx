import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/store";
import { getTemplate } from "@/templates/niches";
import { BookingForm } from "@/components/booking/booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props) {
  return {
    title: `Book · ${params.slug} | Apex HQ`,
    description: "Booking stub — request intake only, no calendar sync or payments.",
  };
}

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
          <BookingForm
            businessSlug={business.slug}
            businessName={business.name}
            services={business.services.map((s) => ({ id: s.id, name: s.name }))}
            ctaLabel={template?.ctaLabel ?? "Request appointment"}
          />
        </CardContent>
      </Card>
    </main>
  );
}
