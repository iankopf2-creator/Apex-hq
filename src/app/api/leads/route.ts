import { NextResponse } from "next/server";
import { listAudits, listLeads } from "@/lib/leads/store";
import { mockFixtureAdapter } from "@/lib/leads/sources/adapter";

/** GET /api/leads — list CRM leads (+ optional fixtures preview). */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const includeFixturesPreview = url.searchParams.get("fixtures") === "1";

  const leads = await listLeads();
  const audits = await listAudits();
  const payload: Record<string, unknown> = {
    ok: true,
    count: leads.length,
    leads,
    audits,
  };

  if (includeFixturesPreview) {
    payload.fixturePreview = await mockFixtureAdapter.fetchCandidates();
    payload.fixtureNote =
      "Fixtures are mock public-style samples only — not scraped, not for live outreach.";
  }

  return NextResponse.json(payload);
}
