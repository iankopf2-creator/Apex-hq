import type { MetadataRoute } from "next";

const PROD_BASE = "https://apex-hq-five.vercel.app";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || PROD_BASE;
}

/**
 * Public Front Door crawl rules.
 * Allow marketing + demo surfaces; keep API and owner dashboard out of indexes.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/onboarding", "/audit", "/pricing", "/s/", "/booking/"],
      disallow: ["/api/", "/dashboard"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
