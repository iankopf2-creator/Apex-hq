# APEX HQ — THEME & LEAD MAGNET AGENTS

Build two agents that make the Front Door irresistible and pull customers in automatically.

## THEME AI
- Generates a unique visual identity per niche (HVAC, plumber, salon, trucking)
- Swaps color palettes, fonts, hero imagery, and copy tone automatically
- A/B tests two variants per customer for 7 days, keeps the winner
- Every theme is mobile-first, WCAG compliant, and loads under 2 seconds
- Output: a branded site URL ready to share

### Scaffold locations
- `src/lib/theme/` — configs, A/B stub, generate helper
- `POST /api/theme/generate` — returns theme package JSON
- Optional tokens wired into `PublicSite` via CSS variables

### Mobile-first / WCAG notes
- Contrast-safe primary/onPrimary pairs (aim WCAG AA 4.5:1 for body text)
- Touch targets ≥ 44px via site components; avoid tiny CTAs
- System font stacks for fast load (under 2s target)
- Semantic landmarks (`main`, `nav`, labelled sections) already on `/s/[slug]`
- No fake urgency or human impersonation in copy tone

## LEAD MAGNET ENGINE
- Scrapes Google Maps, Yelp, Facebook, BBB for businesses with no website or "call for hours" listings
- Generates a free audit report: estimated missed calls per month, estimated lost revenue, and a personalized fix
- Sends the report via email or SMS with the demo link embedded
- Tracks opens, clicks, and replies in a simple CRM
- No spam — one personalized message per lead, business hours only, full opt-out

### Scaffold locations (NO live spam / NO real scrape yet)
- `src/lib/leads/` — types, JSON store, qualify, audit, outbound stub, compliance
- `src/lib/leads/sources/adapter.ts` — source adapter interface + fixture mock (2–3 samples)
- `POST /api/leads/qualify`, `POST /api/leads/audit`, `GET /api/leads`
- `POST /api/leads/outbound` — dryRun default true; live refused without flag + Ian approval
- `POST /api/leads/opt-out` — compliance opt-out field

### CAN-SPAM / TCPA checklist (before any real outbound)
- [ ] One personalized message per lead (no bulk blasts)
- [ ] Business hours only (`isWithinBusinessHours` helper — America/Chicago default)
- [ ] Honor opt-out immediately (`optedOut` + `/api/leads/opt-out`)
- [ ] Email: accurate From/Subject, physical postal address in footer, clear unsubscribe
- [ ] SMS: prior express consent where required; include STOP language
- [ ] No deceptive headers or subject lines
- [ ] No money requests / payment collection from these agents (Stripe after Ian approves)
- [ ] Live send requires `LEAD_MAGNET_LIVE_SEND=true` **and** `ianApprovalComment`
- [ ] Audit numbers labeled **ESTIMATES ONLY** — never present as measured facts
- [ ] Fixtures marked `isFixture: true` — not real scraped leads

## RULES
- Both agents log every action with timestamp and confidence score (`shared/action-log.ts` → `data/action-log.json`)
- No agent sends money requests or collects payment — Stripe handles that after Ian approves
- No agent impersonates a human or uses fake urgency
- Comply with CAN-SPAM and TCPA on every outbound message
- If either agent hits a compliance question, it stops and writes the blocker to BUILD_SPEC.md

## SPAWN TRIGGER
After the Front Door demo is live and tested. **Front Door is LIVE at https://apex-hq-five.vercel.app — scaffolding authorized.**

Update BUILD_SPEC.md when each agent is scaffolded.
