Shared handoff notes for Apex HQ agents.

## Files
- `blockers.md` — active/resolved blockers
- `action-log.ts` — shared action log helper (timestamp, agent, action, confidence, notes)
  - App import: `@/lib/action-log` (re-exports this module)
  - Persists to `data/action-log.json`
