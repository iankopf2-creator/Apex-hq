/**
 * Lead source adapter — NO real Google/Yelp scraping yet.
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
  label: string;
  fetchCandidates(): Promise<RawLeadCandidate[]>;
}

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
  {
    businessName: "[FIXTURE] Sample Trucking LLC — Maps Pin Only",
    niche: "trucking",
    city: "Kansas City",
    phone: "+1-555-0104",
    email: "fixture-trucking@example.com",
    website: null,
    listingNote: "call for hours · no quote form",
    source: "fixture",
    isFixture: true,
  },
  {
    businessName: "[FIXTURE] Sample Electrician — Call for Hours",
    niche: "electrician",
    city: "St. Louis",
    phone: "+1-555-0106",
    email: "fixture-electric@example.com",
    website: null,
    listingNote: "call for hours",
    source: "fixture",
    isFixture: true,
  },
  {
    businessName: "[FIXTURE] Sample Roofing Co — Maps Only",
    niche: "roofing",
    city: "Springfield",
    phone: "+1-555-0107",
    website: null,
    listingNote: "call for hours · no online estimate",
    source: "fixture",
    isFixture: true,
  },
  {
    businessName: "[FIXTURE] Already-Has-Site HVAC",
    niche: "hvac",
    city: "Dallas",
    phone: "+1-555-0105",
    email: "fixture-hassite@example.com",
    website: "https://example-hvac.example",
    listingNote: "full website + online booking",
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

function stubAdapter(id: LeadSource, label: string): LeadSourceAdapter {
  return {
    id,
    label,
    async fetchCandidates() {
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

export async function loadFixtureCandidatesAsLeads(): Promise<
  Omit<Lead, "id" | "fitScore" | "status" | "optedOut" | "createdAt" | "updatedAt">[]
> {
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
