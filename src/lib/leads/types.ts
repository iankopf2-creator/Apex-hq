/** Lead Magnet Engine data model (scaffold — local JSON CRM). */

export type CrmStatus =
  | "new"
  | "qualified"
  | "audited"
  | "contacted"
  | "replied"
  | "opted_out"
  | "closed"
  | "disqualified";

export type LeadSource =
  | "fixture"
  | "manual"
  | "google_maps_stub"
  | "yelp_stub"
  | "facebook_stub"
  | "bbb_stub";

export type Lead = {
  id: string;
  businessName: string;
  niche?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string | null;
  /** Public listing hint, e.g. "call for hours" */
  listingNote?: string;
  source: LeadSource;
  /** True when row is a mock fixture — not a real scraped lead */
  isFixture: boolean;
  fitScore: number;
  status: CrmStatus;
  optedOut: boolean;
  auditReportId?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
};

export type AuditReport = {
  id: string;
  leadId: string;
  /** All numeric projections are ESTIMATES — labeled in API responses */
  estimatedMissedCallsPerMonth: number;
  estimatedLostRevenueUsd: number;
  personalizedFix: string;
  demoLink: string;
  confidence: number;
  disclaimer: string;
  createdAt: string;
};

export type QualifyInput = {
  businessName: string;
  niche?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string | null;
  listingNote?: string;
  source?: LeadSource;
};
