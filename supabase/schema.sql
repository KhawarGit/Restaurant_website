-- KK Grove — Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run).
--
-- This uses a single JSONB "document" table so the API/db layer
-- (lib/db.ts) can persist the whole app state with one upsert — the same
-- shape it already uses for the Redis/file fallbacks. It's simple and
-- reliable for a project this size; if you outgrow it, normalize into
-- proper `tables`, `reservations`, `orders`, `feedback` etc. tables and
-- update the read/write calls in lib/db.ts accordingly.

create table if not exists kk_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security stays ON by default with no policies, which blocks the
-- public anon/browser key entirely. The app only ever talks to Supabase
-- from server-side API routes using the SERVICE ROLE key, which bypasses
-- RLS automatically — so no policies are required for this table.
alter table kk_store enable row level security;
