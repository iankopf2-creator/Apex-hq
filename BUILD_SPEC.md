# Apex HQ — Build Spec (Module 0.1)

Companion to MASTER_BLUEPRINT.md. Worker updates STATUS only for finished work.

## STATUS (this run)

- [x] Clone repo / scaffold Next.js 14 App Router + TS + Tailwind + shadcn/ui
- [x] supabase/migrations SQL for businesses, profiles, calls, appointments, leads, subscriptions, templates, ai_response_logs (+ RLS stubs)
- [x] .env.example for all services
- [x] Onboarding wizard at /onboarding
- [x] Template library: HVAC, plumber, salon (config-driven)
- [x] Persist (local JSON) + public site /s/[slug]
- [x] Stub routes: /booking/[slug], /dashboard, /pricing
- [x] Demo seed (Dallas HVAC from templates)
- [x] README + MASTER_BLUEPRINT + sub-agent protocol
- [x] Production build succeeds (verified this run)
- [x] Theme AI scaffolded
- [x] Lead Magnet Engine scaffolded

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

## Lead Scout Agent (NOT THIS RUN)

Spawn only after Front Door is confirmed live AND Stripe checkout works. Never contacts businesses — Ian pitches.

- [ ] Lead Scout scaffolded
- [ ] First daily leads/YYYY-MM-DD.md produced

See docs/LEAD_SCOUT_PROTOCOL.md
