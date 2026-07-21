create extension if not exists pgcrypto;

create table public.traces (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  repo_owner text not null,
  repo_name text not null,
  repo_url text not null,
  repo_description text,
  default_branch text,

  period_days integer not null check (period_days in (7, 30)),
  period_start timestamptz not null,
  period_end timestamptz not null,

  total_commits integer not null default 0,
  active_days integer not null default 0,
  contributor_count integer not null default 0,
  stars integer not null default 0,
  forks integer not null default 0,
  last_commit_sha text,

  headline text not null,
  summary text not null,
  status_label text not null check (status_label in ('SHIPPING', 'BUILDING', 'REFINING', 'MAINTAINING')),
  confidence numeric check (confidence between 0 and 1),

  highlights jsonb not null default '[]'::jsonb,
  change_groups jsonb not null default '[]'::jsonb,
  commits jsonb not null default '[]'::jsonb,
  social_copy jsonb not null default '{}'::jsonb,
  raw_stats jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index traces_repo_period_idx
on public.traces (repo_owner, repo_name, period_days, created_at desc);

create index traces_duplicate_lookup_idx
on public.traces (repo_owner, repo_name, period_days, last_commit_sha, created_at desc);

alter table public.traces enable row level security;

create policy "Public traces are readable"
on public.traces
for select
using (true);

revoke insert, update, delete on public.traces from anon, authenticated;
grant select on public.traces to anon, authenticated;
