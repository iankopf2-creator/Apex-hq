# Call AI Protocol

**Agent:** Call AI (LIVE)
**Purpose:** AI receptionist + permissioned outreach call flows for Apex HQ Front Door.

## Hard gates
- **HARD GATE:** `CALL_AI_LIVE=false` until Ian explicitly sets true — no live outbound/inbound dials or SMS
- No live dials until Ian also arms vendor + numbers
- **HARD GATE (TCPA / AI voice):** AI receptionist / Bland / Retell / Twilio-style synthetic voice is treated as TCPA “artificial or prerecorded” voice (FCC 24-17, 2024). Do **not** arm outbound AI marketing calls without documented prior express (written for telemarketing) consent + immutable consent logs
- TCPA / National DNC / **Missouri No-Call** (RSMo § 407.1098 et seq.; AG treats AI/computer voice + SMS as in-scope — verify before go-live) + business-hours only for outreach
- Honor opt-outs / STOP across call+SMS within required clocks (federal revocation package in force; see Today's Law brief)
- Prefer inbound receptionist / dry-run stubs until Ian + Eve/counsel review consent + DNC scrub + opt-out plumbing
- Never collect card payments on a call — Stripe Checkout only
- No NSFW; no debtor/collection calls
- Scripts + stubs ship first via Builder → QA

## First build
1. Call script pack for Dallas HVAC demo receptionist
2. Stub integration points (Twilio / Bland / Retell) — env names only
3. Hand off to Builder for code; Ian arms credentials later

## Money / Eve
- Stripe Production env remains Ian-only; Call AI never invents keys
- Eve handoff SSOT stays with Spec Keeper / BUILD_SPEC top block
- **TCPA / AI-voice compliance is NOT an Eve BLOCKER** unless Ian says — keep Call AI dark via `CALL_AI_LIVE=false` instead of escalating NEED FROM EVE
- See also docs/VOICE_OUTREACH_PROTOCOL.md (spawn gates) — Call AI designs stubs only until Ian arms
- Law watch SSOT: `/workspace/grok-work-study/notes/todays-law-brief-2026-09-06.md` (drafts only — not legal advice)
