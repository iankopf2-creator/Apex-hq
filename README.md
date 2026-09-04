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
| Stripe $49 / $99 / $199 | Checkout Session API wired; needs Ian Price IDs + Vercel env |
| Twilio / Resend / Vercel AI SDK | Env stubs only |
| Voice (Bland AI **or** Retell) | **Choice documented below** — not wired |
| Google Calendar | Not wired — next step |
| Dashboard / booking | Live stub intake (`POST /api/booking`) + dashboard list/stats |
| Free audit `/audit` | Live ESTIMATE lead magnet (no SMS/email send) |

## Voice provider choice

**Default documented choice: Bland AI** for outbound/inbound voice experiments (simpler REST-first prototyping).  
**Retell** remains the alternate if you prefer their agent tooling / latency profile.

Set `VOICE_PROVIDER=bland` or `retell` in env when you start Layer 2. Do not purchase until Ian approves spend.

## Key routes

- `/` — landing + demo seed
- `/audit`, `/audit/[slug]` — free ESTIMATE audit (no live outreach)
- `/onboarding` — multi-step wizard
- `/s/[slug]` — public branded site
- `/booking/[slug]` — booking stub with confirmation + `POST /api/booking`
- `/dashboard` — owner shell, stub bookings, Stripe configured flag (names only)
- `/pricing` — Stripe tiers + Checkout CTAs
- `POST /api/leads/audit` — generate ESTIMATE audit report
- `POST /api/stripe/checkout` — create subscription Checkout Session
- `POST /api/stripe/webhook` — signature-verified event log stub

## Data

Without Supabase env, businesses persist under `data/businesses.json` locally.  
On Vercel (read-only FS), the store falls back to `/tmp` or an in-memory Map (ephemeral per instance).  
Demo slug `demo-dallas-hvac` is always available via `getDemoBusiness()` without a prior seed POST.  
**Durable production requires Supabase** — see `shared/blockers.md`.  
SQL: `supabase/migrations/20260904000000_init.sql`.

## Stripe checkout (Ian money approval)

Code is ready: `POST /api/stripe/checkout` creates a subscription Checkout Session for Starter ($49/mo) when env is set. Growth/Pro use `STRIPE_PRICE_GROWTH` / `STRIPE_PRICE_PRO` when present. Webhook stub: `POST /api/stripe/webhook` (verifies signature when `STRIPE_WEBHOOK_SECRET` is set; logs events only).

**Ian must create Price IDs in Stripe Dashboard** (Products → recurring monthly prices at $49 / $99 / $199), then set these **Vercel** env vars and **redeploy**:

| Env var | Required |
|---------|----------|
| `STRIPE_SECRET_KEY` | yes (`sk_test_…` for test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | yes (`pk_test_…`) |
| `STRIPE_PRICE_STARTER` | yes (`price_…` for $49/mo) |
| `NEXT_PUBLIC_APP_URL` | yes (e.g. `https://apex-hq-five.vercel.app`) |
| `STRIPE_PRICE_GROWTH` | optional ($99/mo) |
| `STRIPE_PRICE_PRO` | optional ($199/mo) |
| `STRIPE_WEBHOOK_SECRET` | optional (`whsec_…` for webhook) |

Never collect payment outside Stripe. Do not invent live keys.

**Test mode:** use Stripe test keys + test card `4242 4242 4242 4242`. Pricing CTAs and post-onboarding Starter button call the checkout API; without env they show “Stripe not configured” + the required vars list.

## Next steps (not this run)

1. Connect Supabase and replace JSON store
2. Ian: create Stripe Price IDs, set Vercel env, redeploy, verify live Checkout
3. Twilio + Resend
4. Voice (Bland or Retell) + AI receptionist module
5. Google Calendar OAuth for real appointment slots

## Docs

- `MASTER_BLUEPRINT.md` — layers 0–4 + STATUS
- `BUILD_SPEC.md` — this-run checklist
- `docs/SUB_AGENT_PROTOCOL.md` — single-worker rules
