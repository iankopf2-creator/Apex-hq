import type { AuditReport, Lead } from "./types";
import { saveAudit, upsertLead } from "./store";
import { appendActionLog } from "@/lib/action-log";

const PROD_DEMO = "https://apex-hq-five.vercel.app";

/** Conservative miss-rate used for ESTIMATES ONLY projections. */
export const AUDIT_MISS_RATE = 0.3;

/**
 * Niche placeholder job USD for demo math (not Apex measurements).
 * Unknown niches fall back to DEFAULT_JOB_USD.
 */
export const NICHE_JOB_USD: Record<string, number> = {
  hvac: 275,
  plumber: 225,
  salon: 85,
  trucking: 150,
  electrician: 200,
  roofing: 350,
  landscaping: 225,
  auto_detail: 175,
  slab_leak: 450,
  junk_removal: 275,
  pressure_washing: 225,
  gutter_cleaning: 185,
  window_cleaning: 175,
  carpet_cleaning: 185,
  appliance_repair: 195,
  handyman: 175,
  flooring: 375,
  fencing: 450,
  concrete: 475,
  siding: 550,
  decking: 650,
  masonry: 600,
  drywall: 375,
  insulation: 450,
  tile: 425,
  cabinets: 550,
  countertops: 650,
  foundation_repair: 2200,
  solar: 450,
  epoxy_flooring: 850,
  chimney: 285,
  window_replacement: 650,
  generator: 1200,
  ev_charger: 550,
  patio_cover: 900,
  irrigation: 275,
  pergola: 850,
  gazebo: 900,
  carport: 900,
  awning: 750,
  dumpster_rental: 450,
  porta_potty_rental: 275,
};

export const DEFAULT_JOB_USD = 120;

function resolveDemoLink(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";
  if (!raw || /localhost|127\.0\.0\.1/i.test(raw)) return PROD_DEMO;
  return raw;
}

/**
 * ESTIMATES ONLY — illustrative scaffold math.
 * Miss-rate band informed by public vendor summaries often citing ~25–62%
 * unanswered for SMBs (widely circulated 411 Locals / BIA-style figures
 * republished by call-tracking vendors). CONSERVATIVE 30% miss rate —
 * NOT measured Apex HQ data. Job values are niche placeholders for demos.
 */
export const AUDIT_DISCLAIMER =
  "ESTIMATES ONLY — illustrative projections using a conservative ~30% missed-call assumption within commonly cited public SMB ranges (~25–62%), not Apex HQ measurements or guarantees. Sources are vendor-republished industry summaries, not audited studies we independently verified.";

const NICHE_FIX: Record<string, string> = {
  hvac:
    "Put emergency/service hours + same-day booking online so after-hours AC calls don't die on 'call for hours.'",
  plumber:
    "Ship a mobile-first booking page for leaks/clog emergencies with clear hours — stop losing night-time jobs to whoever answers first.",
  salon:
    "Add online booking + real hours so walk-ins and Instagram DMs convert without phone tag.",
  trucking:
    "Stand up a simple Front Door with lanes/coverage, quote request, and phone fallback so brokers aren't guessing from a Maps pin.",
  electrician:
    "Publish clear service hours + emergency booking so panel/outage calls don't bounce to whoever picks up first.",
  roofing:
    "Add storm/estimate request form + real hours — stop losing insurance jobs to the contractor with a form.",
  landscaping:
    "Add a quote-first landscaping page (lawn/beds/seasonal + lawn size/access/existing beds/irrigation/season assess before firm price) so callers get a real quote — not bait flat $/visit or $/acre or fake same-day.",
  auto_detail:
    "Add a quote-first auto detail page (interior/exterior/package + vehicle size/condition/location assess before firm price; ceramic ≠ wash) so callers get a real quote — not bait flat package fees or fake same-day.",
  slab_leak:
    "Ship a detection-first call page (sticky tel:) so warm-floor / bill-spike callers book locate-before-cut — not a form maze.",
  junk_removal:
    "Add a quote-first haul page (volume/item + dump fees up front) so cleanout callers get a real load quote — not bait flat fees.",
  pressure_washing:
    "Add a quote-first wash page (driveway/house/patio + surface-safe methods) so callers get a real quote before wash — not bait flat fees.",
  gutter_cleaning:
    "Add a quote-first gutter page (clogged downspouts + soft-wash vs power + height honesty) so callers get a real quote before climb — not bait flat fees.",
  window_cleaning:
    "Add a quote-first window page (clear glass + glass-safe methods + quote before climb) so callers get a real quote — not bait flat fees or fake same-day.",
  carpet_cleaning:
    "Add a quote-first carpet page (room/rug scope + pet/kid-safe methods when true + quote before steam) so callers get a real quote — not bait flat fees or fake same-day.",
  appliance_repair:
    "Ship a call-first appliance page (sticky tel: + diagnose-before-parts) so broken fridge/washer callers reach a tech — not bait flat diagnostic fees.",
  handyman:
    "Add a hybrid quote/schedule handyman page (punch-list scope + Call secondary) so odd-job callers get a real estimate — not fake same-day promises.",
  flooring:
    "Add a quote-first flooring page (LVP/hardwood/tile + subfloor assess before firm price) so callers get a real quote — not bait flat sqft fees or fake same-day.",
  fencing:
    "Add a quote-first fencing page (wood/vinyl/chain-link/ornamental + length/height/terrain/HOA assess before firm price) so callers get a real quote — not bait flat $/ft or fake same-day.",
  concrete:
    "Add a quote-first concrete page (driveway/patio/flatwork + sqft/access/thickness/prep/drainage assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day pour.",
  siding:
    "Add a quote-first siding page (vinyl/fiber-cement/wood/engineered + material/grade/sqft/stories/access/substrate assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day install.",
  decking:
    "Add a quote-first decking page (wood/composite/PVC + sqft/height/access/footing/material assess before firm price) so callers get a real quote — not bait flat $/sqft or $/lf or fake same-day build.",
  masonry:
    "Add a quote-first masonry page (brick/stone/block + sqft/access/material/mortar/height assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day build.",
  drywall:
    "Add a quote-first drywall page (hang/finish/repair + sqft/access/rooms/texture/damage/height assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day.",
  insulation:
    "Add a quote-first insulation page (blow-in/batts/spray-foam + sqft/access/attic-vs-wall-vs-crawl/existing R-value/moisture-ventilation/height assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day.",
  tile:
    "Add a quote-first tile page (floor/wall/shower + sqft/access/substrate/material porcelain-ceramic-natural-stone/grout/height/waterproofing assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day.",
  cabinets:
    "Add a quote-first cabinets page (kitchen/bath/refacing + linear-ft/access/existing-vs-new/material/layout measure before firm price) so callers get a real quote — not bait flat $/lf or $/cabinet or fake same-day.",
  foundation_repair:
    "Add a quote-first foundation page (inspection + soil/drainage/crack/pier-vs-slab/access/stories assess before firm price) so callers get a real quote — not bait flat $/lf or $/pier or fake same-day fix.",
  solar:
    "Add a quote-first solar page (roof size/condition/orientation/shading + utility/net-metering/interconnect + existing vs new + battery storage + HOA/permit assess before firm price; licensed electrician/solar contractor honesty when required) so callers get a real quote — not bait flat $/watt or fake same-day install.",
  epoxy_flooring:
    "Add a quote-first epoxy flooring page (garage/commercial coating + sqft/prep/moisture/existing-coating/access assess before firm price) so callers get a real quote — not bait flat $/sqft or fake same-day cure.",
  chimney:
    "Add a quote-first chimney page (sweep/fireplace repair + flue type/height/creosote/liner/cap/access/stories/wood-stove-vs-fireplace assess before firm price; CSIA/NFI / licensed honesty when true) so callers get a real quote — not bait flat $/sweep or fake same-day or scare copy.",
  window_replacement:
    "Add a quote-first window replacement page (measure/replace/energy upgrade + count/size/stories/access/existing-vs-new/vinyl-vs-wood-vs-fiberglass-vs-aluminum/energy-rating assess before firm price; licensed honesty when true) so callers get a real quote — not bait flat $/window or fake same-day; distinct from window cleaning.",
  generator:
    "Add a quote-first generator / standby backup power page (load/fuel NG-LP-diesel/automatic transfer switch/pad-setback/permit-HOA assess before firm price; licensed electrician honesty when true) so callers get a real quote — not bait flat $/kW or fake same-day install; distinct from solar-only and portable camping power stations.",
  ev_charger:
    "Add a quote-first EV charger / Level 2 home EVSE page (panel capacity/amperage 30–60A typical L2/garage-vs-driveway/hardwired-vs-NEMA/permit-HOA/load calculation assess before firm price; licensed electrician honesty when true) so callers get a real quote — not bait flat $/charger or fake same-day install; distinct from solar-only and standby generator.",
  patio_cover:
    "Add a quote-first patio cover / shade structure page (sqft/attached-vs-freestanding/material aluminum-wood-insulated-fabric-shade/footings/drainage/access/stories/HOA-permit assess before firm price; licensed contractor honesty when true) so callers get a real quote — not bait flat $/sqft or $/lf or fake same-day; distinct from decking, concrete flatwork, gutter_cleaning, and fencing.",
  irrigation:
    "Add a quote-first irrigation / lawn sprinkler page (lot/zone count/head types/controller age/backflow/water pressure/dig access/winterize-vs-repair-vs-new-install/HOA-permit assess before firm price; licensed plumber/irrigation contractor honesty when true) so callers get a real quote — not bait flat $/zone or $/head or fake same-day; distinct from landscaping beds/mow.",
  pergola:
    "Add a quote-first pergola / outdoor shade structure page (footprint/sqft/attached-vs-freestanding/material wood-vinyl-aluminum-composite/post-footing-depth/roof-style open-beam-vs-lattice-vs-solid-roof-kit/height-stories-access/HOA-permit assess before firm price; licensed contractor honesty when true) so callers get a real quote — not bait flat $/sqft or $/lf or fake same-day; distinct from patio_cover solid shade canopy, decking floor platforms, fencing, landscaping beds/mow, and irrigation zones.",
  gazebo:
    "Add a quote-first gazebo / pavilion page (footprint/sqft/roof-style full-hip-octagon/screen-rail kit/foundation-floor optional/material/height-access/HOA-permit assess before firm price; licensed contractor honesty when true) so callers get a real quote — not bait flat $/sqft or $/lf or fake same-day; distinct from pergola open-beam/lattice shade, patio_cover attached solid canopy, decking floor platforms, fencing, landscaping beds/mow, and irrigation zones.",
  carport:
    "Add a quote-first carport / open vehicle shelter page (bay count/footprint/sqft/attached-vs-freestanding/material metal-wood-poly/roof pitch-panels/post-footing/pad existing-vs-new/vehicle height clearance/wind-snow load when true/access/HOA-permit assess before firm price; licensed contractor honesty when true) so callers get a real quote — not bait flat $/sqft or $/lf or $/bay or fake same-day; distinct from gazebo pavilion/people outdoor room, pergola open-beam/lattice shade, patio_cover solid patio shade canopy, decking floor platforms, garage enclosed door/opener, fencing, landscaping, irrigation, and concrete flatwork alone.",
  awning:
    "Add a quote-first awning / building-attached fabric or aluminum shade page (width/projection lf-ft/retractable-vs-fixed/fabric-vs-aluminum-vs-vinyl when true/mount wall-vs-roof/motorized-vs-manual when true/sun-wind rating when true/stories-access/HOA-permit assess before firm price; licensed contractor honesty when true) so callers get a real quote — not bait flat $/lf or $/sqft or fake same-day; distinct from patio_cover solid permanent canopy, pergola open-beam freestanding/attached shade frame, gazebo pavilion, carport vehicle shelter, decking, fencing, landscaping, irrigation, and concrete flatwork alone.",
  dumpster_rental:
    "Add a quote-first dumpster / roll-off rental page (size 10/20/30/40 yd when true/rental duration/debris type/delivery access/driveway protection/permit-HOA educational only assess before firm price; licensed/hauler honesty when true) so callers get a real roll-off quote — not bait flat $/day or fake same-day drop; distinct from junk_removal hauling labor, porta_potty_rental, storage_container_rental, septic_pumping, grease_trap_cleaning, and concrete debris alone.",
  porta_potty_rental:
    "Add a quote-first porta potty rental page (event/construction portable toilets + unit count/event days vs jobsite duration/delivery access/ADA unit need/restock-service cadence/waste pump-out schedule assess before firm price; local permit/HOA educational only — not legal advice; licensed/hauler honesty when true) so callers get a real quote — not bait flat $/day or $/weekend or fake same-day drop; distinct from dumpster_rental roll-off, junk_removal hauling labor, septic_pumping, grease_trap_cleaning, and storage_container_rental.",
  countertops:
    "Add a quote-first countertops page (kitchen/bath + sqft/linear/edge/sink-cutout/access/stories/material quartz-granite-marble-laminate-butcher-block assess before firm price) so callers get a real quote — not bait flat $/sqft or $/lf or fake same-day.",
};

function personalizedFix(lead: Pick<Lead, "niche">, demoLink: string): string {
  const niche = (lead.niche || "").toLowerCase();
  const tip =
    NICHE_FIX[niche] ||
    "Add an online booking page + clear hours so customers can reach you without calling.";
  return `${tip} Apex HQ demo: ${demoLink}/s/demo-dallas-hvac · start yours: ${demoLink}/onboarding`;
}

/** Pure audit estimate math — no store/log I/O. */
export type AuditEstimate = {
  missRate: number;
  inboundAssumed: number;
  estimatedMissedCallsPerMonth: number;
  jobUsd: number;
  estimatedLostRevenueUsd: number;
  demoLink: string;
  disclaimer: string;
  personalizedFix: string;
  confidence: number;
};

/**
 * Pure estimate contract for Vitest / QA regression.
 * Same math previously inline in generateAuditReport.
 */
export function computeAuditEstimate(
  lead: Pick<Lead, "niche" | "fitScore">
): AuditEstimate {
  const demoLink = resolveDemoLink();
  const niche = (lead.niche || "").toLowerCase();
  const inboundAssumed = 28 + Math.round(lead.fitScore / 5);
  const missRate = AUDIT_MISS_RATE;
  const estimatedMissedCallsPerMonth = Math.max(
    6,
    Math.round(inboundAssumed * missRate)
  );
  const jobUsd = NICHE_JOB_USD[niche] ?? DEFAULT_JOB_USD;
  const estimatedLostRevenueUsd = estimatedMissedCallsPerMonth * jobUsd;

  return {
    missRate,
    inboundAssumed,
    estimatedMissedCallsPerMonth,
    jobUsd,
    estimatedLostRevenueUsd,
    demoLink,
    disclaimer: AUDIT_DISCLAIMER,
    personalizedFix: personalizedFix(lead, demoLink),
    confidence: Math.min(0.72, 0.38 + lead.fitScore / 220),
  };
}

export async function generateAuditReport(lead: Lead): Promise<AuditReport> {
  const estimate = computeAuditEstimate(lead);

  const report: AuditReport = {
    id: crypto.randomUUID(),
    leadId: lead.id,
    estimatedMissedCallsPerMonth: estimate.estimatedMissedCallsPerMonth,
    estimatedLostRevenueUsd: estimate.estimatedLostRevenueUsd,
    personalizedFix: estimate.personalizedFix,
    demoLink: estimate.demoLink,
    confidence: estimate.confidence,
    disclaimer: estimate.disclaimer,
    createdAt: new Date().toISOString(),
  };

  await saveAudit(report);
  await upsertLead({
    ...lead,
    status: "audited",
    auditReportId: report.id,
    updatedAt: new Date().toISOString(),
  });

  await appendActionLog({
    agent: "lead-magnet",
    action: "audit_generate",
    confidence: report.confidence,
    notes: `Audit for ${lead.businessName} (estimates; missRate=${estimate.missRate})`,
    meta: {
      leadId: lead.id,
      auditId: report.id,
      niche: lead.niche,
      inboundAssumed: estimate.inboundAssumed,
      missRate: estimate.missRate,
      jobUsd: estimate.jobUsd,
    },
  });

  return report;
}
