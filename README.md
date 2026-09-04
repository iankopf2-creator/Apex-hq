# Apex HQ — Local Business Front Door

Website + booking front door for local service businesses (HVAC, plumbers, salons, etc.).
Module **0.1** scaffold: onboarding → templated public site.

## Quick start

```bash
npm install && npm run dev
```

Production build check:

```bash
npm run build
```

Copy `.env.example` → `.env.local` and fill keys when ready. **Do not invent API keys.**

## What is live vs stubbed

| Area | Status |
|------|--------|
| Next.js 14 App Router + Tailwind + shadcn/ui | Live (scaffold) |
| Onboarding wizard | Live (local JSON persist) |
| Niche templates (HVAC / plumber / salon) | Live (config-driven) |
| Public site `/s/[slug]` | Live from wizard/demo data |
| Demo seed (Dallas HVAC) | Live via `POST /api/demo` or home button |
| Supabase | Migrations + client stub (JSON store used when unset) |
| Stripe $49 / $99 / $199 | Pricing UI + checkout stub |
| Twilio / Resend / Vercel AI SDK | Env stubs only |
| Voice (Bland AI **or** Retell) | **Choice documented below** — not wired |
| Google Calendar | Not wired — next step |
| Dashboard / booking | Shell stubs |

## Voice provider choice

**Default documented choice: Bland AI** for outbound/inbound voice experiments (simpler REST-first prototyping).  
**Retell** remains the alternate if you prefer their agent tooling / latency profile.

Set `VOICE_PROVIDER=bland` or `retell` in env when you start Layer 2. Do not purchase until Ian approves spend.

## Key routes

- `/` — landing + demo seed
- `/onboarding` — multi-step wizard
- `/s/[slug]` — public branded site
- `/booking/[slug]` — booking stub
- `/dashboard` — owner shell + AI log helper
- `/pricing` — Stripe tier stubs

## Data

Without Supabase env, businesses persist under `data/businesses.json` locally.  
On Vercel (read-only FS), the store falls back to `/tmp` or an in-memory Map (ephemeral per instance).  
Demo slug `demo-dallas-hvac` is always available via `getDemoBusiness()` without a prior seed POST.  
**Durable production requires Supabase** — see `shared/blockers.md`.  
SQL: `supabase/migrations/20260904000000_init.sql`.

## Next steps (not this run)

1. Connect Supabase and replace JSON store
2. Stripe Checkout Session API (Ian money approval)
3. Twilio + Resend
4. Voice (Bland or Retell) + AI receptionist module
5. Google Calendar OAuth for real appointment slots

## Docs

- `MASTER_BLUEPRINT.md` — layers 0–4 + STATUS
- `BUILD_SPEC.md` — this-run checklist
- `docs/SUB_AGENT_PROTOCOL.md` — single-worker rules
