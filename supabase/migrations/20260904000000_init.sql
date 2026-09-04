-- Apex HQ initial schema (Module 0.1 Front Door)
-- RLS policies are stubs: tighten before production.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  name text not null,
  niche text not null,
  city text not null,
  hours jsonb not null default '{}'::jsonb,
  services jsonb not null default '[]'::jsonb,
  photos jsonb not null default '[]'::jsonb,
  tagline text,
  phone text,
  email text,
  primary_color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  niche text not null unique,
  label text not null,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text,
  phone text,
  email text,
  message text,
  source text default 'web',
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  starts_at timestamptz,
  status text not null default 'requested',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete set null,
  provider text,
  external_id text,
  direction text,
  status text,
  transcript_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  tier text not null default 'starter',
  status text not null default 'inactive',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_response_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete set null,
  source text not null,
  prompt_summary text,
  response_summary text,
  model text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.templates enable row level security;
alter table public.leads enable row level security;
alter table public.appointments enable row level security;
alter table public.calls enable row level security;
alter table public.subscriptions enable row level security;
alter table public.ai_response_logs enable row level security;

create policy "profiles_stub_all" on public.profiles for all using (true) with check (true);
create policy "businesses_public_read" on public.businesses for select using (true);
create policy "businesses_stub_write" on public.businesses for insert with check (true);
create policy "businesses_stub_update" on public.businesses for update using (true);
create policy "templates_public_read" on public.templates for select using (true);
create policy "leads_stub_all" on public.leads for all using (true) with check (true);
create policy "appointments_stub_all" on public.appointments for all using (true) with check (true);
create policy "calls_stub_all" on public.calls for all using (true) with check (true);
create policy "subscriptions_stub_all" on public.subscriptions for all using (true) with check (true);
create policy "ai_logs_stub_all" on public.ai_response_logs for all using (true) with check (true);
