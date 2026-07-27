"use client";

import { useEffect, useRef, useState } from "react";
import { themes, DEFAULT_THEME, STORAGE_KEY, type ThemeId } from "@/lib/themes";

export function ThemeSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sync from the attribute the no-flash script already set.
  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as ThemeId) || DEFAULT_THEME;
    setActive(current);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choose(id: ThemeId) {
    document.documentElement.setAttribute("data-theme", id);
    try {
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch {}
    setActive(id);
    setOpen(false);
  }

  const current = themes.find((t) => t.id === active) ?? themes[0];
  const isDark = variant === "dark";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch theme"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
          isDark
            ? "border-cream/20 text-cream/80 hover:border-gold hover:text-gold"
            : "border-forest-800/20 text-forest-800 hover:border-gold hover:text-gold-dark"
        }`}
      >
        <span className="flex gap-0.5">
          {[current.swatch.dark, current.swatch.accent, current.swatch.bg].map((c, i) => (
            <span key={i} className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: c }} />
          ))}
        </span>
        <span className="hidden sm:inline">{current.name}</span>
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-luxe">
          <div className="border-b border-forest-100 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-forest-900/50">
            Choose a design
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => choose(t.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-cream ${
                active === t.id ? "bg-cream" : ""
              }`}
            >
              <span className="flex shrink-0 gap-1 rounded-full p-1 ring-1 ring-black/5" style={{ background: t.swatch.bg }}>
                <span className="h-4 w-4 rounded-full" style={{ background: t.swatch.dark }} />
                <span className="h-4 w-4 rounded-full" style={{ background: t.swatch.accent }} />
              </span>
              <span className="flex-1">
                <span className="block font-serif text-base text-forest-900">{t.name}</span>
                <span className="block text-xs text-forest-900/55">{t.vibe}</span>
              </span>
              {active === t.id && (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
