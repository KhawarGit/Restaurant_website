"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Arrow } from "@/components/Icons";

const quick = [
  { role: "Manager", pin: "1111", href: "/staff/manager", tint: "text-gold-light" },
  { role: "Waiter", pin: "2222", href: "/staff/waiter", tint: "text-sky-300" },
  { role: "Chef", pin: "3333", href: "/staff/chef", tint: "text-emerald-300" },
];

export default function StaffLogin() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(value: string) {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: value }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Invalid PIN");
      return;
    }
    router.push(`/staff/${data.role}`);
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-forest-950 px-5 py-16 text-cream">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-sm text-cream/50 hover:text-gold">
          ← Back to website
        </Link>

        <div className="rounded-3xl border border-cream/10 bg-forest-900 p-8 shadow-luxe">
          <div className="text-center">
            <span className="grid mx-auto h-14 w-14 place-items-center rounded-full border border-gold/40 bg-forest-800 font-serif text-lg font-bold text-gold">
              KK
            </span>
            <h1 className="mt-4 font-serif text-2xl text-cream">Staff Console</h1>
            <p className="mt-1 text-sm text-cream/50">Enter your 4-digit PIN to continue.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(pin);
            }}
            className="mt-7"
          >
            <input
              autoFocus
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="••••"
              className="w-full rounded-xl border border-cream/15 bg-forest-950 px-4 py-4 text-center text-2xl tracking-[0.5em] text-gold outline-none focus:border-gold"
            />
            {error && <p className="mt-3 text-center text-sm text-red-400">{error}</p>}
            <button disabled={loading || pin.length < 4} className="btn-gold mt-4 w-full disabled:opacity-50">
              {loading ? "Checking…" : (<>Sign in <Arrow className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="mt-8 border-t border-cream/10 pt-6">
            <p className="mb-3 text-center text-xs uppercase tracking-widest text-cream/40">Demo quick-access</p>
            <div className="grid grid-cols-3 gap-2">
              {quick.map((q) => (
                <button
                  key={q.role}
                  onClick={() => submit(q.pin)}
                  className="rounded-xl border border-cream/10 bg-forest-800/50 p-3 text-center transition-colors hover:border-gold/40"
                >
                  <div className={`font-serif text-base ${q.tint}`}>{q.role}</div>
                  <div className="text-xs text-cream/40">PIN {q.pin}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
