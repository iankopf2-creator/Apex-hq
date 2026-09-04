# Sub-Agent Protocol

## Roles
- **Cursor (this worker)**: owns code implementation for the assigned module slice.
- **Eve**: strategy / legal framing (does not write product code here).
- **Ian**: money approvals and final go/no-go on paid services.
- **Rose**: Reclaim legal / state matters (out of scope for this repo worker).

## Rules for this scaffold run
1. **Do not spawn additional sub-agents** for Module 0.1 — one worker finishes Local Business Front Door scaffold + onboarding.
2. Shared status and handoff notes live in MASTER_BLUEPRINT.md, BUILD_SPEC.md, and /shared/.
3. Money or legal decisions are **not** made by the coding agent — escalate to Ian / Eve / Rose.
4. If blocked (auth, GitHub, Cloud Agents, secrets), write the blocker into BUILD_SPEC.md and shared/blockers.md.
5. Never invent API keys. Stubs and .env.example only.

## Communication
- Parent agent steers scope; worker reports outcomes in the final summary.
- No parallel module work beyond the assigned STATUS items.
