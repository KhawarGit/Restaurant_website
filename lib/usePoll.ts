"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Fetches JSON from `url` on mount and every `interval` ms. Returns data + refetch. */
export function usePoll<T = any>(url: string, interval = 4000) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchNow = useCallback(async () => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setData(await res.json());
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "error");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchNow();
    timer.current = setInterval(fetchNow, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [fetchNow, interval]);

  return { data, error, loading, refetch: fetchNow };
}

export function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
