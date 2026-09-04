# Blockers

## Active
- **Local Next instability on shared box:** concurrent agent `next build`/`dev` corrupts `.next` chunks. Lead Magnet continues CRM via JSON + prod /audit smoke; not a product blocker. (2026-09-04)
- **Lead Magnet live email blocked:** CAN-SPAM requires a valid physical postal address (street, USPS PO box, or CMRA mailbox). Apex HQ LLC is Missouri but no registered postal string is in repo yet — Ian must supply before any live commercial email. SMS still needs TCPA consent path. (2026-09-04 Lead Magnet Engine)
- Remote agents lacked GitHub repo access; local box scaffold used.
- **Durable persistence on Vercel:** JSON/`data/` FS and in-memory Map are ephemeral per instance. Supabase is required for durable multi-instance production (onboarding + businesses). Workaround in place (see Resolved).

## Resolved
- **Theme generate on Vercel EROFS (2026-09-04):** Fixed via `shared/json-store.ts` — theme-actions + action-log use data → `/tmp/apex-hq-data` → memory fallback (same class as businesses store). Deploy needed for live API.
- Empty repo cloned; Module 0.1 work continues locally.
- **Vercel read-only FS → `/s/[slug]` 500 (2026-09-04):** `src/lib/store.ts` called `mkdir`/`writeFile` under `data/`, which fails on Vercel’s read-only filesystem. Fixed: store probes writability, falls back to `/tmp` then process-memory Map; seeds `demo-dallas-hvac` via `getDemoBusiness()` on cold start / store miss so the public demo site works without a prior POST. Memory is per-instance ephemeral — use Supabase for durable prod.
