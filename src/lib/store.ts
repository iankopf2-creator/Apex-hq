import { promises as fs } from "fs";
import path from "path";
import type { BusinessProfile } from "@/lib/types";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const BUSINESSES_FILE = path.join(DATA_DIR, "businesses.json");

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(BUSINESSES_FILE);
  } catch {
    await fs.writeFile(BUSINESSES_FILE, "[]\n", "utf8");
  }
}

export async function listBusinesses(): Promise<BusinessProfile[]> {
  await ensureStore();
  const raw = await fs.readFile(BUSINESSES_FILE, "utf8");
  return JSON.parse(raw) as BusinessProfile[];
}

export async function getBusinessBySlug(slug: string): Promise<BusinessProfile | null> {
  const all = await listBusinesses();
  return all.find((b) => b.slug === slug) ?? null;
}

export async function upsertBusiness(profile: BusinessProfile): Promise<BusinessProfile> {
  await ensureStore();
  const all = await listBusinesses();
  const idx = all.findIndex((b) => b.id === profile.id || b.slug === profile.slug);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...profile, updatedAt: new Date().toISOString() };
  } else {
    all.push(profile);
  }
  await fs.writeFile(BUSINESSES_FILE, JSON.stringify(all, null, 2) + "\n", "utf8");
  return profile;
}

export async function deleteBusinessBySlug(slug: string): Promise<void> {
  const all = await listBusinesses();
  const next = all.filter((b) => b.slug !== slug);
  await fs.writeFile(BUSINESSES_FILE, JSON.stringify(next, null, 2) + "\n", "utf8");
}
