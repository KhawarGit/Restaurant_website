import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const g = globalThis as unknown as { __kksb?: SupabaseClient | null };

/**
 * Server-only Supabase client, built from SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 * Returns null when unconfigured so callers can fall back to Redis/file storage.
 * The service role key bypasses Row Level Security — never expose it to the
 * client (no NEXT_PUBLIC_ prefix), only use it inside API route handlers.
 */
export function getSupabase(): SupabaseClient | null {
  if (g.__kksb !== undefined) return g.__kksb;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  g.__kksb = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return g.__kksb;
}

export const usingSupabase = () => getSupabase() !== null;
