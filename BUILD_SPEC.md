--- EVE HANDOFF ---
DONE: theme niche well_pump (quote_first) + prior epoxy_flooring (quote_first) + prior solar (quote_first) + prior foundation_repair (quote_first) + prior auto_detail (quote_first) + prior landscaping (quote_first) + prior countertops (quote_first) + prior cabinets (quote_first) + prior tile (quote_first) + prior insulation (quote_first) + prior drywall (quote_first) + prior masonry (quote_first) + prior decking (quote_first) + prior siding (quote_first) + prior concrete (quote_first) + prior fencing (quote_first) + prior flooring (quote_first) + prior handyman (hybrid) + prior appliance_repair (call_first) + prior carpet_cleaning (quote_first) + prior window_cleaning/gutter_cleaning/pressure_washing/junk_removal/slab_leak/tree_service/mold_remediation/fire_smoke/towing+water/garage+locksmith+janitorial; free audit estimates + CRM status API (ESTIMATES ONLY); Front Door SEO robots.ts + sitemap.ts (PR #28); Front Door security headers (nosniff/Referrer-Policy/X-Frame DENY/Permissions-Policy)
NEXT: Ian Stripe Production env (4 required names) → redeploy → re-verify $49 Starter checkout
BLOCKER: Stripe Production env Ian-only
NEED FROM EVE: no
LIVE URL: https://apex-hq-five.vercel.app
--- END HANDOFF ---

# Apex HQ — Build Spec (Module 0.1)

Companion to MASTER_BLUEPRINT.md. Worker updates STATUS only for finished work.

## STATUS (this run)

- [x] Clone repo / scaffold Next.js 14 App Router + TS + Tailwind + shadcn/ui
- [x] supabase/migrations SQL for businesses, profiles, calls, appointments, leads, subscriptions, templates, ai_response_logs (+ RLS stubs)
- [x] .env.example for all services
- [x] Onboarding wizard at /onboarding
- [x] Template library: HVAC, plumber, salon (config-driven)
- [x] Theme niches through painting (+ heroes, CTA modes call_first/book_first/hybrid) on CallRail-safe public site
- [x] Theme niches garage + locksmith (call_first) + janitorial (quote_first) — PR #22
- [x] Theme niches towing + water_damage (call_first) — Builder clean rebase of #14
- [x] Theme niche fire_smoke (call_first) — board-up / FSRT honesty
- [x] Theme niche mold_remediation (call_first) — calm trust / IICRC / TX assessor-remediator honesty
- [x] Theme niche tree_service (call_first) — storm/emergency honesty / powerline / ISA-TRAQ when true
- [x] Theme niche slab_leak (call_first) — detection-first / TSBPE-RMP honesty / TX geo-gated clay copy
- [x] Theme niche junk_removal (quote_first) — charcoal/slate + lime; dump fees up front; no fake same-day
- [x] Theme niche pressure_washing (quote_first) — wet-concrete slate + sky-spray; surface-safe; quote before wash
- [x] Theme niche gutter_cleaning (quote_first) — zinc roof-edge + deep copper; clogged downspouts; soft-wash vs power; height honesty
- [x] Theme niche window_cleaning (quote_first) — clear-glass cool blue-gray + daylight ice; glass-safe; quote before climb
- [x] Theme niche carpet_cleaning (quote_first) — warm soft-gray + seafoam/teal; quote before steam; pet/kid-safe when true
- [x] Theme niche appliance_repair (call_first) — slate + orange; diagnose-before-parts; licensed tech when true
- [x] Theme niche handyman (hybrid) — warm workbench taupe/slate + amber/gold; quote/schedule primary + Call secondary
- [x] Theme niche flooring (quote_first) — warm oak/charcoal slate + copper/bronze; material/subfloor assess before firm price; no bait flat sqft
- [x] Theme niche fencing (quote_first) — cedar/fence-stain warm brown + charcoal slate + forest sage; length/height/terrain/HOA assess before firm price; no bait flat $/ft
- [x] Theme niche concrete (quote_first) — wet-concrete cool gray/slate + warm amber; sqft/access/thickness/prep/drainage assess before firm price; no bait flat $/sqft; no fake same-day pour
- [x] Theme niche siding (quote_first) — cool clapboard slate/gray + soft coastal blue-gray; material/grade/sqft/stories/access/substrate assess before firm price; no bait flat $/sqft; no fake same-day install; vinyl/fiber-cement/wood/engineered when true
- [x] Theme niche decking (quote_first) — warm deck-board teak + charcoal slate + soft sage; sqft/height/access/footing/material wood-composite-PVC assess before firm price; no bait flat $/sqft or $/lf; no fake same-day build; HOA/permit honesty when true
- [x] Theme niche masonry (quote_first) — kiln brick + limestone/sand; sqft/access/material brick-stone-block/mortar/height assess before firm price; no bait flat $/sqft; no fake same-day build; HOA/permit honesty when true; quote before build/repair
- [x] Theme niche drywall (quote_first) — cool gypsum/joint-compound white-gray + soft tape-beige; sqft/access/rooms/texture smooth-orange-peel-knockdown/damage water-nail pops-seam/height assess before firm price; no bait flat $/sqft; no fake same-day; HOA/permit honesty when true; quote before hang/finish/repair
- [x] Theme niche insulation (quote_first) — warm cellulose/attic taupe-slate + soft insulation-pink; sqft/access/attic-vs-wall-vs-crawl/existing R-value/moisture-ventilation/height assess before firm price; no bait flat $/sqft; no fake same-day; HOA/permit honesty when true; quote before blow-in/batts/spray-foam
- [x] Theme niche tile (quote_first) — cool porcelain gray/slate + soft grout-beige; sqft/access/substrate/material porcelain-ceramic-natural-stone/grout/height/waterproofing assess before firm price; no bait flat $/sqft; no fake same-day; HOA/permit honesty when true; quote before install/repair
- [x] Theme niche cabinets (quote_first) — warm walnut/charcoal + soft brass; linear-ft/access/existing-vs-new/material/layout measure before firm price; no bait flat $/lf or $/cabinet; no fake same-day; HOA/permit honesty when true; quote before install/refacing
- [x] Theme niche foundation_repair (quote_first) — deep charcoal + copper; inspection/assess before firm price; no bait $/lf or $/pier
- [x] Theme niche solar (quote_first) — deep slate + solar gold/amber; roof/utility/net-metering/battery/HOA assess before firm price; no bait flat $/watt; no fake same-day install; licensed electrician/solar contractor honesty when required
- [x] Theme niche epoxy_flooring (quote_first) — deep epoxy charcoal + gloss resin teal/cyan; sqft/prep/moisture/existing-coating/access assess before firm price; no bait flat $/sqft; no fake same-day cure; garage & commercial epoxy honesty
- [x] Theme niche well_pump (quote_first) — deep well-water navy + depth teal (#1e3a5f / #2dd4bf); well type dug-drilled-driven / static water level / pump type submersible-jet-constant-pressure / depth-HP-GPM / pressure tank size-psi / control box-wiring / yield-dry-well risk / sediment-iron / access-pitless adapter / permit + licensed well contractor honesty when true; assess before firm price; no bait flat $/pump or $/ft; no fake same-day whole-home water guarantees; distinct from plumber, water_heater, water_softener, sump_pump, water_damage, slab_leak
- [x] Theme niche countertops (quote_first) — cool quartz/stone gray-slate + soft warm veining/brass; sqft/linear/edge/sink-cutout/existing-vs-new/access/stories/material quartz-granite-marble-laminate-butcher-block assess before firm price; no bait flat $/sqft or $/lf; no fake same-day; HOA/permit honesty when true; quote before install
- [x] Theme niche landscaping (quote_first) — outdoor forest green + warm earth; lawn size/access/existing beds/irrigation/season assess before firm price; no bait flat $/visit or $/acre; no fake same-day; seasonal/recurring honesty; quote before mow or install
- [x] Theme niche auto_detail (quote_first) — deep automotive graphite + cool chrome; vehicle size/condition/location/package assess before firm price; interior/exterior honesty; ceramic ≠ wash; no bait flat package fees; no fake same-day; quote before wash or ceramic
- [x] Persist (local JSON) + public site /s/[slug]
- [x] Public site sticky dual CTA (call-first trades / book-first salon; CallRail website tel only; never LSA on page)
- [x] Stub routes: /booking/[slug], /dashboard, /pricing
- [x] Booking stub intake (`POST /api/booking`) + form confirmation + dashboard list
- [x] Dashboard shell polish (snapshot stats, Stripe configured flag without secrets)
- [x] Demo seed (Dallas HVAC from templates)
- [x] README + MASTER_BLUEPRINT + sub-agent protocol
- [x] Production build succeeds (verified this run)
- [x] Theme AI scaffolded
- [x] Theme/action-log JSON store Vercel-safe (`shared/json-store.ts`; live verified 2026-09-04)
- [x] Lead Magnet Engine scaffolded
- [x] Public Free Audit page (`/audit`, `/audit/[slug]`) — ESTIMATE report + demo/pricing CTAs
- [x] Creator audit/Starter copy pack (Ian-approved ESTIMATE honesty + Stripe-dark CTAs)
- [x] Free audit lead-magnet UX polish (dollarize headline, ESTIMATE trust copy, 48px CTAs)
- [x] Audit/pricing regression tests (Vitest: stripe tiers/gates + audit estimate math)
- [x] Call AI dry-run stub (CALL_AI_LIVE=false; HVAC receptionist script pack; no live dials)
- [x] Owner mobile Expo Phase 0 stub (apps/owner-mobile)
- [x] Public /s/[slug] SEO meta (title/description, OG/Twitter, canonical, LocalBusiness JSON-LD)
- [x] App Router robots.ts + sitemap.ts (public Front Door crawl + stable public URLs)
- [x] Front Door security headers (nosniff, Referrer-Policy, X-Frame-Options DENY, Permissions-Policy)
- [x] Stripe Checkout Session API (Starter $49/mo) + Pricing/onboarding CTAs
- [ ] Stripe live in production (Ian: Price IDs + Vercel env + redeploy)

### Demo / live URL
Front Door LIVE: https://apex-hq-five.vercel.app
- [x] Fixed production `/s/[slug]` 500: serverless-safe store (memory/`/tmp` fallback) + always-available `demo-dallas-hvac` (`getDemoBusiness`)

## Protocol
See docs/SUB_AGENT_PROTOCOL.md — single worker for 0.1; no extra sub-agents; money/legal stay with Ian/Eve/Rose.

## Blockers
See shared/blockers.md

## Sales and Outreach Agent (NOT THIS RUN)

Spawn only after Front Door demo is live and tested. Do not scaffold here.

- [ ] Sales agent scaffolded
- [ ] First 20 leads sourced
- [ ] First closed customer

## Legal & Insurance AI (NOT THIS RUN)

Spawn only after Front Door demo is green. Audit agents only — they do not build features.

- [ ] Legal AI scaffolded
- [ ] Insurance AI scaffolded
- [ ] REVIEWS section in use for Module 0.1

See docs/LEGAL_INSURANCE_PROTOCOL.md

## REVIEWS
(none yet — Legal/Insurance AIs not spawned)

## Theme AI Agent

**JOB:** Generate niche visual identity (palette, fonts, copy tone), A/B stub for 7 days, log actions with confidence. Mobile-first + WCAG-minded tokens. No hardcoded business data.

**DATA SOURCE:** Templated niche configs in `src/lib/theme/configs.ts` (HVAC, plumber, salon, trucking). Optional business slug for experiment metadata only.

**OUTPUT:** Theme package JSON via `POST /api/theme/generate`; CSS vars optionally applied on `/s/[slug]`; actions in `data/theme-actions.json` + shared action log.

**BLOCKER CHECK:** Stop and write to BUILD_SPEC / shared/blockers.md on compliance questions; do not impersonate humans or use fake urgency.

- [x] Theme AI scaffolded

See docs/THEME_LEAD_MAGNET_PROTOCOL.md

## Lead Magnet Engine Agent

**JOB:** Qualify public lead fields, generate ESTIMATE-labeled audit reports, CRM list, dry-run outbound only (no live SMS/email spam). Opt-out + business-hours helpers. Fixture source adapter only — no real scraping.

**DATA SOURCE:** Manual/API input + mock fixtures in `src/lib/leads/sources/adapter.ts`. Persist `data/leads.json` / `data/audits.json`.

**OUTPUT:** `POST /api/leads/qualify`, `POST /api/leads/audit`, `GET /api/leads`, outbound dry-run log via `POST /api/leads/outbound`. Shared action log entries.

**BLOCKER CHECK:** Refuse live send without `LEAD_MAGNET_LIVE_SEND=true` + Ian approval comment; stop on CAN-SPAM/TCPA questions and record blocker. No payments, no scraping yet.

- [x] Lead Magnet Engine scaffolded

See docs/THEME_LEAD_MAGNET_PROTOCOL.md

## Theme & Lead Magnet Agents (historical spawn gate)

Front Door is live; scaffolding authorized by Ian for this run.


## Stripe Checkout (Module 0.1)

**JOB:** Let a stranger pay Starter $49/mo after onboarding via Stripe Checkout only.

**STATUS**
- [x] `stripe` package dependency
- [x] `POST /api/stripe/checkout` — subscription mode; body may include `businessSlug` / `email`
- [x] Pricing UI + end-of-onboarding Starter CTA (stranger-safe dark copy when unset; env names stay off public UI)
- [x] `POST /api/stripe/webhook` stub — verifies signature when `STRIPE_WEBHOOK_SECRET` set; logs subscription events; no fake success
- [x] `.env.example` documents Stripe vars
- [ ] Ian creates Price IDs in Stripe Dashboard and sets Vercel env, then redeploys

**Vercel env Ian must set:** `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_STARTER`, `NEXT_PUBLIC_APP_URL` (plus optional `STRIPE_PRICE_GROWTH`, `STRIPE_PRICE_PRO`, `STRIPE_WEBHOOK_SECRET`).

## Lead Scout Agent (NOT THIS RUN)

Spawn only after Front Door is confirmed live AND Stripe checkout works. Never contacts businesses — Ian pitches.

- [ ] Lead Scout scaffolded
- [ ] First daily leads/YYYY-MM-DD.md produced

See docs/LEAD_SCOUT_PROTOCOL.md

## Human-Sounding Outreach Voice Agent (NOT THIS RUN)

Spawn only after Lead Scout has 20 real leads AND free audit page is live.

- [ ] Voice outreach agent scaffolded
- [ ] First 20 calls logged
- [ ] First demo booked with Ian

See docs/VOICE_OUTREACH_PROTOCOL.md

## Paid Diagnostic Offer (NOT THIS RUN)

After free audit curiosity. Requires signed agreement before POS access.

- [ ] Diagnostic offer page / Stripe price
- [ ] Agreement gate before POS connect
- [ ] Aggregate-only analytics path

See docs/PAID_DIAGNOSTIC_OFFER.md

## Discovery & Custom Build Agent (NOT THIS RUN)

Spawn after Paid Diagnostic proven on 3 customers. Ian reviews every spec before build.

- [ ] Discovery agent scaffolded
- [ ] First custom spec delivered to Ian

See docs/DISCOVERY_CUSTOM_BUILD_PROTOCOL.md
