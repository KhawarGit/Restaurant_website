"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Phone, Lock } from "./Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 shadow-[0_8px_30px_-18px_rgba(11,61,46,0.4)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-underline text-sm font-medium text-forest-900/80 transition-colors hover:text-forest-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-forest-800 xl:flex">
            <Phone className="h-4 w-4 text-gold-dark" />
            {site.phone}
          </a>
          <Link
            href="/staff"
            className="inline-flex items-center gap-1.5 rounded-full border border-forest-800/20 px-4 py-2 text-sm font-medium text-forest-800 transition-colors hover:border-gold hover:text-gold-dark"
          >
            <Lock className="h-3.5 w-3.5" />
            Staff
          </Link>
          <Link href="/#reserve" className="btn-gold text-sm">
            Reserve a Table
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-forest-800/20 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-forest-900 transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-forest-900 transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-forest-900 transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-forest-900 px-6 pt-28 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="space-y-2">
          {nav.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-cream/10 py-4 font-serif text-3xl text-cream transition-colors hover:text-gold"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-4">
          <a href={site.phoneHref} className="flex items-center gap-2 text-cream/80">
            <Phone className="h-5 w-5 text-gold" /> {site.phone}
          </a>
          <Link href="/#reserve" onClick={() => setOpen(false)} className="btn-gold w-full">
            Reserve a Table
          </Link>
          <Link
            href="/staff"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/25 py-3 text-sm font-medium text-cream/80 transition-colors hover:border-gold hover:text-gold"
          >
            <Lock className="h-4 w-4" /> Staff Login
          </Link>
        </div>
      </div>
    </header>
  );
}
