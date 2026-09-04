import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/store";
import { PublicSite } from "@/components/site/public-site";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) return { title: "Not found" };
  return {
    title: business.name + " | " + business.city,
    description: business.tagline || business.name + " in " + business.city,
  };
}

export default async function PublicBusinessPage({ params }: Props) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) notFound();
  return <PublicSite business={business} />;
}
