import { promises as fs } from "fs";
import path from "path";
import type { BusinessProfile } from "@/lib/types";
import { getTemplate } from "@/templates/niches";

const PREFERRED_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const TMP_DIR = path.join("/tmp", "apex-hq-data");
const BUSINESSES_FILENAME = "businesses.json";

/** In-memory fallback when no writable directory is available (e.g. Vercel read-only FS). */
const memoryStore = new Map<string, BusinessProfile>();
let backend: "fs" | "memory" | null = null;
let dataDir: string = PREFERRED_DIR;
let seeded = false;

/**
 * Fictional Dallas HVAC demo built from niche templates.
 * Always available without a prior POST — used on cold start / store miss.
 */
export function getDemoBusiness(): BusinessProfile {
  const template = getTemplate("hvac");
  const now = "2026-09-04T00:00:00.000Z";
  return {
    id: "demo-dallas-hvac-id",
    slug: "demo-dallas-hvac",
    name: "Demo Dallas HVAC",
    niche: "hvac",
    city: "Dallas",
    hours: template?.defaultHours ?? {
      mon: "8:00 AM – 6:00 PM",
      tue: "8:00 AM – 6:00 PM",
      wed: "8:00 AM – 6:00 PM",
      thu: "8:00 AM – 6:00 PM",
      fri: "8:00 AM – 6:00 PM",
      sat: "9:00 AM – 2:00 PM",
      sun: "Closed",
    },
    services: (template?.defaultServices ?? []).map((s, i) => ({
      id: "svc-hvac-" + i,
      name: s.name,
      description: s.description,
      priceFrom: s.priceFrom,
    })),
    photos: ["/placeholders/storefront.svg"],
    tagline: template?.defaultTagline ?? "Reliable heating & cooling for your home",
    primaryColor: template?.accentHint ?? "sky",
    phone: "(555) 010-2000",
    email: "demo@example.com",
    createdAt: now,
    updatedAt: now,
  };
}

/** Fictional Midwest trucking demo — template-only, always available on cold start. */
export function getDemoTruckingBusiness(): BusinessProfile {
  const template = getTemplate("trucking");
  const now = "2026-09-04T00:00:00.000Z";
  return {
    id: "demo-midwest-trucking-id",
    slug: "demo-midwest-trucking",
    name: "Demo Midwest Trucking",
    niche: "trucking",
    city: "Kansas City",
    hours: template?.defaultHours ?? {
      mon: "6:00 AM – 6:00 PM",
      tue: "6:00 AM – 6:00 PM",
      wed: "6:00 AM – 6:00 PM",
      thu: "6:00 AM – 6:00 PM",
      fri: "6:00 AM – 6:00 PM",
      sat: "7:00 AM – 12:00 PM",
      sun: "Closed",
    },
    services: (template?.defaultServices ?? []).map((s, i) => ({
      id: "svc-truck-" + i,
      name: s.name,
      description: s.description,
      priceFrom: s.priceFrom,
    })),
    photos: ["/placeholders/storefront.svg"],
    tagline: template?.defaultTagline ?? "On-time freight you can count on",
    primaryColor: template?.accentHint ?? "amber",
    phone: "(555) 010-4000",
    email: "demo-trucking@example.com",
    createdAt: now,
    updatedAt: now,
  };
}

async function dirIsWritable(dir: string): Promise<boolean> {
  try {
    await fs.mkdir(dir, { recursive: true });
    const probe = path.join(dir, ".write-probe");
    await fs.writeFile(probe, "ok", "utf8");
    await fs.unlink(probe);
    return true;
  } catch {
    return false;
  }
}

async function resolveBackend(): Promise<"fs" | "memory"> {
  if (backend) return backend;

  if (await dirIsWritable(PREFERRED_DIR)) {
    dataDir = PREFERRED_DIR;
    backend = "fs";
    return backend;
  }
  if (await dirIsWritable(TMP_DIR)) {
    dataDir = TMP_DIR;
    backend = "fs";
    return backend;
  }
  backend = "memory";
  return backend;
}

function businessesPath(): string {
  return path.join(dataDir, BUSINESSES_FILENAME);
}

function seedDemoIntoMemory(): void {
  if (seeded) return;
  for (const demo of [getDemoBusiness(), getDemoTruckingBusiness()]) {
    if (!memoryStore.has(demo.slug)) {
      memoryStore.set(demo.slug, demo);
    }
  }
  seeded = true;
}

async function ensureStore(): Promise<void> {
  const mode = await resolveBackend();
  if (mode === "memory") {
    seedDemoIntoMemory();
    return;
  }

  await fs.mkdir(dataDir, { recursive: true });
  const file = businessesPath();
  try {
    await fs.access(file);
  } catch {
    const demo = getDemoBusiness();
    await fs.writeFile(file, JSON.stringify([demo], null, 2) + "\n", "utf8");
  }

  // Ensure demo is present even if file exists but is empty / missing demo
  try {
    const all = JSON.parse(await fs.readFile(file, "utf8")) as BusinessProfile[];
    if (!all.some((b) => b.slug === "demo-dallas-hvac")) {
      all.push(getDemoBusiness());
      await fs.writeFile(file, JSON.stringify(all, null, 2) + "\n", "utf8");
    }
  } catch {
    // If read/parse fails, rewrite with demo seed
    await fs.writeFile(
      file,
      JSON.stringify([getDemoBusiness()], null, 2) + "\n",
      "utf8"
    );
  }
}

async function readAll(): Promise<BusinessProfile[]> {
  await ensureStore();
  if (backend === "memory") {
    return Array.from(memoryStore.values());
  }
  const raw = await fs.readFile(businessesPath(), "utf8");
  return JSON.parse(raw) as BusinessProfile[];
}

async function writeAll(all: BusinessProfile[]): Promise<void> {
  await ensureStore();
  if (backend === "memory") {
    memoryStore.clear();
    for (const b of all) memoryStore.set(b.slug, b);
    return;
  }
  await fs.writeFile(businessesPath(), JSON.stringify(all, null, 2) + "\n", "utf8");
}

export async function listBusinesses(): Promise<BusinessProfile[]> {
  return readAll();
}

export async function getBusinessBySlug(slug: string): Promise<BusinessProfile | null> {
  try {
    const all = await listBusinesses();
    const found = all.find((b) => b.slug === slug) ?? null;
    if (found) return found;
  } catch {
    // Fall through to demo / null — never throw to the page (avoids 500 on Vercel)
  }

  if (slug === "demo-dallas-hvac") {
    return getDemoBusiness();
  }
  if (slug === "demo-midwest-trucking") {
    return getDemoTruckingBusiness();
  }
  return null;
}

export async function upsertBusiness(profile: BusinessProfile): Promise<BusinessProfile> {
  const all = await readAll();
  const idx = all.findIndex((b) => b.id === profile.id || b.slug === profile.slug);
  const next = { ...profile, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...next };
  } else {
    all.push(next);
  }
  await writeAll(all);
  return next;
}

export async function deleteBusinessBySlug(slug: string): Promise<void> {
  const all = await readAll();
  const next = all.filter((b) => b.slug !== slug);
  await writeAll(next);
}

/** Test/helper: current persistence backend after first ensure. */
export async function getStoreBackend(): Promise<"fs" | "memory"> {
  return resolveBackend();
}
