# APEX HQ — LEGAL & INSURANCE AI PROTOCOL

Build two review agents that run on every module before it ships. They don't build features — they audit them.

## LEGAL AI
- Pulls from verified sources only: state statutes, federal regs, agency rulings, case law
- Every citation carries its effective date — never cites repealed law
- Drafts contracts, terms of service, compliance checklists for human review
- Flags unauthorized practice of law risks, FDCPA exposure, TCPA violations, data privacy gaps
- Never gives legal advice — drafts only, Ian approves
- Logs every review with timestamp and confidence score

## INSURANCE AI
- Reads Apex HQ's own policies and flags coverage gaps
- Reviews each module for liability exposure before launch
- Tracks E&O, cyber liability, and general liability requirements per state
- Alerts when a new module creates a new risk category

## EXPO & OUTREACH LAYER (later)
- Only activates after 5 paying customers prove the Front Door works
- Maps upcoming trade shows and expos by city
- Prepares pitch decks and demo scripts for in-person selling
- No autonomous selling at expos — human present, AI assists

## RULES
- Legal AI reviews every module before it goes live
- Insurance AI reviews every module before it goes live
- Both write their findings to BUILD_SPEC.md under a REVIEWS section
- If either flags a blocker, the module stops until Ian clears it
- No agent contacts regulators, lawyers, or insurers directly

## SPAWN TRIGGER
After Front Door demo is green. Not before.
