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
