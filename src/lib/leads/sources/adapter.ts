/**
 * Lead source adapter interface — NO real Google/Yelp scraping yet.
 * Mock fixture adapter returns 2–3 sample public-style leads marked as fixtures.
 */
import type { Lead, LeadSource } from "../types";

export type RawLeadCandidate = {
  businessName: string;
  niche?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string | null;
  listingNote?: string;
  source: LeadSource;
  isFixture: boolean;
};

export interface LeadSourceAdapter {
  id: LeadSource;
  /** Human-readable name */
  label: string;
  /** Fetch candidates — real adapters not implemented */
  fetchCandidates(): Promise<RawLeadCandidate[]>;
}

/** Fixture samples — clearly marked; not scraped; not real outreach targets. */
export const FIXTURE_LEADS: RawLeadCandidate[] = [
  {
    businessName: "[FIXTURE] Sample HVAC Co — No Website",
    niche: "hvac",
    city: "Dallas",
    phone: "+1-555-0101",
    email: "fixture-hvac@example.com",
    website: null,
    listingNote: "call for hours",
    source: "fixture",
    isFixture: true,
  },
  {
    businessName: "[FIXTURE] Sample Salon — Listing Only",
    niche: "salon",
    city: "Austin",
    phone: "+1-555-0102",
    website: null,
    listingNote: "call for hours · no online booking",
    source: "fixture",
    isFixture: true,
  },
  {
    businessName: "[FIXTURE] Sample Plumber LLC",
    niche: "plumber",
    city: "Fort Worth",
    phone: "+1-555-0103",
    email: "fixture-plumber@example.com",
    website: null,
    listingNote: "Google listing placeholder — FIXTURE ONLY",
    source: "fixture",
    isFixture: true,
  },
];

export const mockFixtureAdapter: LeadSourceAdapter = {
  id: "fixture",
  label: "Mock fixtures (not scraped)",
  async fetchCandidates() {
    return FIXTURE_LEADS.map((f) => ({ ...f }));
  },
};

/** Stub adapters for future sources — throw / empty until implemented. */
function stubAdapter(id: LeadSource, label: string): LeadSourceAdapter {
  return {
    id,
    label,
    async fetchCandidates() {
      // NO real scraping — return empty and rely on fixtures for demos
      return [];
    },
  };
}

export const googleMapsStubAdapter = stubAdapter(
  "google_maps_stub",
  "Google Maps (stub — not implemented)"
);
export const yelpStubAdapter = stubAdapter("yelp_stub", "Yelp (stub — not implemented)");

export const SOURCE_ADAPTERS: LeadSourceAdapter[] = [
  mockFixtureAdapter,
  googleMapsStubAdapter,
  yelpStubAdapter,
];

export async function loadFixtureCandidatesAsLeads(): Promise<Omit<Lead, "id" | "fitScore" | "status" | "optedOut" | "createdAt" | "updatedAt">[]> {
  const candidates = await mockFixtureAdapter.fetchCandidates();
  return candidates.map((c) => ({
    businessName: c.businessName,
    niche: c.niche,
    city: c.city,
    phone: c.phone,
    email: c.email,
    website: c.website ?? null,
    listingNote: c.listingNote,
    source: c.source,
    isFixture: true,
  }));
}
