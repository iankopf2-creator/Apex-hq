# Apex HQ — Master Blueprint

**Product:** Website + AI receptionist + booking for small local businesses (HVAC, plumbers, salons, etc.).

**Roles**
- Cursor = code
- Eve = strategy / legal
- Ian = money
- Rose = Reclaim legal / state

**Blockers**
- Remote cloud coding agents lacked GitHub access → local scaffold on the box.
- See shared/blockers.md and docs/SUB_AGENT_PROTOCOL.md.

---

## STATUS checklist

### Layer 0 — Foundations
- [x] 0.1 Local Business Front Door — Next.js scaffold + onboarding wizard (this run)
- [ ] 0.2 Supabase wired (migrations present; live client optional / stub)
- [x] 0.3 Stripe Checkout Session API wired (Starter $49/mo) — live keys/Price IDs pending Ian
- [ ] 0.4 Auth / owner accounts

### Layer 1 — Front Door
- [x] Multi-step onboarding (/onboarding)
- [x] Config-driven niche templates (HVAC, plumber, salon)
- [x] Public branded site /s/[slug] (mobile-first, WCAG-minded)
- [x] Demo seed path (Dallas HVAC via templates)
- [x] Stub routes: booking, dashboard, pricing
- [ ] Production photo storage (placeholder / local OK)
- [ ] Custom domains

### Layer 2 — Receptionist / Voice (DO NOT START THIS RUN)
- [ ] AI chat receptionist
- [ ] SMS/voice provider live wiring
- [ ] Voice vendor choice live (document only in README this run)

### Layer 3 — Growth
- [ ] Google Calendar sync
- [ ] Lead pipelines / CRM depth
- [ ] Transactional email live

### Layer 4 — Scale
- [ ] Multi-location
- [ ] Agency / white-label
- [ ] Advanced analytics

---

## Stack (target)
Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui, Supabase, Stripe tiers, Twilio, Resend, Vercel AI SDK, voice via Bland or Retell (documented).

## This run scope
Only Module 0.1 — scaffold + onboarding + build success. No receptionist-voice or later modules.

---

## Sales and Outreach Agent Protocol

**Do not build or spawn the sales/outreach agent until the Front Door demo is live and tested.**

Spawn trigger (all required):
1. Module 0.1 Front Door demo is live
2. Demo has been manually tested (onboarding → /s/[slug] → booking stub)
3. Ian explicitly approves starting outreach automation

STATUS (sales agent — all unchecked this run):
- [ ] Sales agent scaffolded
- [ ] First 20 leads sourced
- [ ] First closed customer

Rules:
- Coding worker for 0.1 does not implement sales agent code now
- Money/spend for outreach tools requires Ian approval
- Legal/compliance framing for outreach stays with Eve / Rose as applicable
