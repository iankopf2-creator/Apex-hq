# Apex Owner Mobile (Phase 0 stub)
Expo + TypeScript + Expo Router shell for the owner/operator app only.

## Run locally

From apps/owner-mobile run: npx expo start

Optional scripts: start, android, ios, web (Expo tooling required).

Node: current LTS compatible with Expo SDK 52.

## Hard constraints (Phase 0)

- DO NOT submit to stores without Ian (no App Store / Play / EAS submit).
- No Stripe secrets — Settings stub stripeConfigured boolean only (false / unknown).
- No auth — placeholders only; no Supabase session wiring yet.
- Customer booking stays web (/booking/[slug]). Owner-only; no customer native app.

## Scope

Home, Bookings, Leads, Settings tabs with fixture/placeholder data. Not wired to live APIs.

## Root monorepo note

Own package.json under apps/owner-mobile. Must not break root Next.js bun run build.
