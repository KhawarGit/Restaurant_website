import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const g = globalThis as unknown as { __kksb?: SupabaseClient | null };

/**
 * Server-only Supabase client, built from SUPABASE_URL + SUPABASE_SECRET_KEY
 * (the "secret" key from Supabase's current API Keys system — starts with
 * `sb_secret_`, replaces the legacy `service_role` JWT). Returns null when
 * unconfigured so callers can fall back to Redis/file storage. The secret key
 * bypasses Row Level Security — never expose it to the client (no
 * NEXT_PUBLIC_ prefix), only use it inside API route handlers.
 *
 * This app has no browser-side Supabase calls, so the "publishable" key
 * (`sb_publishable_...`) isn't needed here — it's only relevant if you later
 * add client-side Supabase usage (e.g. Realtime subscriptions in the UI).
 */
export function getSupabase(): SupabaseClient | null {
  if (g.__kksb !== undefined) return g.__kksb;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  g.__kksb = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return g.__kksb;
}

export const usingSupabase = () => getSupabase() !== null;
