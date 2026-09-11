import type { MetadataRoute } from "next";

const PROD_BASE = "https://apex-hq-five.vercel.app";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || PROD_BASE;
}

/** Stable public Front Door routes (no dynamic customer inventory). */
const PUBLIC_PATHS = [
  "/",
  "/onboarding",
  "/audit",
  "/pricing",
  "/s/demo-dallas-hvac",
  "/booking/demo-dallas-hvac",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return PUBLIC_PATHS.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/s/") ? 0.8 : 0.7,
  }));
}
