# Theme AI — quality bar

## Every niche ships with
1. Distinct palette (hero accent + CTA primary) — not a clone of another niche
2. System font stacks (fast load / <2s)
3. Copy tone + avoid list (no fake urgency, no human impersonation)
4. Niche-aware A/B CTA verbs in `src/lib/theme/generate.ts`
5. Credited stock hero under `public/niches/` + row in `CREDITS.md`
6. Template in `src/templates/niches.ts` + `NicheId` / onboarding / theme API enums

## Rules
- Shared data via BUILD_SPEC.md + `/shared/` (+ THEME_ROADMAP.md)
- No payments / Stripe / money collection
- No competitor brand cloning — generic trade imagery + original palettes
- Mobile-first touch targets ≥48px on public CTAs (research bar; 44px was prior floor)
- Niche `ctaPriority`: `call` for HVAC/plumber/electrician/pest; `book` for salon and quote-led niches

## Merge note
Stacked theme PRs: merge bottom-up when reviewing (#2 → tip) to keep history clean.

## Research notes (2026 service-site color)
- Prefer **60-30-10**: neutral canvas ~60%, brand ~30%, high-contrast CTA accent ~10%.
- Soft neutrals (`#fafafa` / `#f8fafc`) beat pure white for fatigue; trust blues for HVAC/home services; warmth for beauty.
- **Contrast beats hue magic** for CTAs — the winning button is the one that stands out (CXL / service-site guides).
- WCAG AA: ≥4.5:1 body text, ≥3:1 large UI / CTAs. Use `contrastRatio` / `meetsWcagAa` in `src/lib/theme/contrast.ts`.

## Front Door UX research (2026-09-04)
Source notes: `/workspace/grok-work-study/notes/research-front-door-ux-2026-09-04.md` (also mirrored for agents via CoS handoff).

Theme implications applied on public `/s/[slug]`:
- **HVAC / plumber:** call-first sticky mobile dual CTA (`Call now` primary + book secondary); trust chips (licensed/insured, same-day / emergency).
- **Salon:** book-first sticky (`Book now` primary + Call secondary); starting prices in services; no call-for-pricing-only path.
- Sticky bar only on small screens; `pb-24` so content clears the bar; safe-area padding.
- A/B verbs in `generate.ts` match call-first vs book-first for those niches.
