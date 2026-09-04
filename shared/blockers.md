# Blockers

## Active
- Remote agents lacked GitHub repo access; local box scaffold used.
- **Durable persistence on Vercel:** JSON/`data/` FS and in-memory Map are ephemeral per instance. Supabase is required for durable multi-instance production (onboarding + businesses). Workaround in place (see Resolved).

## Resolved
- Empty repo cloned; Module 0.1 work continues locally.
- **Vercel read-only FS → `/s/[slug]` 500 (2026-09-04):** `src/lib/store.ts` called `mkdir`/`writeFile` under `data/`, which fails on Vercel’s read-only filesystem. Fixed: store probes writability, falls back to `/tmp` then process-memory Map; seeds `demo-dallas-hvac` via `getDemoBusiness()` on cold start / store miss so the public demo site works without a prior POST. Memory is per-instance ephemeral — use Supabase for durable prod.
