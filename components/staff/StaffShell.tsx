"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Role } from "@/lib/types";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

const links: Record<Role, { label: string; href: string }[]> = {
  manager: [
    { label: "Overview", href: "/staff/manager" },
    { label: "Waiter View", href: "/staff/waiter" },
    { label: "Kitchen", href: "/staff/chef" },
  ],
  waiter: [
    { label: "Floor & Orders", href: "/staff/waiter" },
    { label: "Kitchen", href: "/staff/chef" },
  ],
  chef: [{ label: "Kitchen Display", href: "/staff/chef" }],
};

const roleTint: Record<Role, string> = {
  manager: "bg-gold-sheen text-forest-900",
  waiter: "bg-sky-400 text-forest-900",
  chef: "bg-emerald-400 text-forest-900",
};

export function StaffShell({
  role,
  title,
  children,
  right,
}: {
  role: Role;
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/staff/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-forest-950 text-cream">
      <header className="sticky top-0 z-40 border-b border-cream/10 bg-forest-900/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/staff" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-forest-800 font-serif text-xs font-bold text-gold">
                KK
              </span>
              <span className="hidden font-serif text-lg sm:block">KK Grove</span>
            </Link>
            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${roleTint[role]}`}>
              {role}
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {links[role].map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active ? "bg-cream/10 text-gold" : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {right}
            <div className="hidden sm:block">
              <ThemeSwitcher variant="dark" />
            </div>
            <button
              onClick={logout}
              className="rounded-full border border-cream/15 px-4 py-1.5 text-sm text-cream/70 transition-colors hover:border-red-400/50 hover:text-red-300"
            >
              Sign out
            </button>
          </div>
        </div>
        {/* mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-t border-cream/5 px-4 py-2 md:hidden">
          {links[role].map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                  active ? "bg-cream/10 text-gold" : "text-cream/60"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        <h1 className="mb-6 font-serif text-2xl sm:text-3xl">{title}</h1>
        {children}
      </div>
    </div>
  );
}

/** Small status pill used across dashboards. */
export function Pill({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone}`}>
      {children}
    </span>
  );
}
