"use client";

import { useState } from "react";
import { Check, Arrow, WhatsApp } from "./Icons";
import { site } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";
type Result = {
  reference: string;
  message: string;
  waitlisted: boolean;
  table: string | null;
  allocation: string;
  waLink: string;
};

const inputBase =
  "w-full rounded-xl border border-forest-100 bg-cream/50 px-4 py-3 text-sm text-forest-900 outline-none transition-all placeholder:text-forest-900/40 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/30";

export function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong." });
        setStatus("error");
        return;
      }
      setResult({
        reference: data.reference,
        message: data.message,
        waitlisted: !!data.waitlisted,
        table: data.table ?? null,
        allocation: data.allocation ?? "",
        waLink: data.waLink ?? "",
      });
      setStatus("success");
    } catch {
      setErrors({ form: "Network error. Please try again or call us." });
      setStatus("error");
    }
  }

  if (status === "success" && result) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/90 p-10 text-center shadow-luxe">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-forest-800 text-gold">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-serif text-2xl text-forest-900">
          {result.waitlisted ? "You're on the waitlist" : "Table Confirmed"}
        </h3>
        <p className="mt-3 max-w-sm text-sm text-forest-900/70">{result.message}</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-cream-dark px-4 py-2 text-sm font-semibold tracking-wide text-forest-800">
            Ref · {result.reference}
          </span>
          {result.table && (
            <span className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-gold-light">
              Table · {result.table}
            </span>
          )}
        </div>

        {result.allocation && (
          <p className="mt-4 max-w-sm rounded-xl bg-gold/10 px-4 py-3 text-xs text-forest-900/70">
            <span className="font-semibold text-gold-dark">Smart seating:</span> {result.allocation}
          </p>
        )}

        {result.waLink && (
          <a
            href={result.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <WhatsApp className="h-4 w-4" /> Send details to the restaurant
          </a>
        )}

        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-dark underline-offset-4 hover:underline"
        >
          Make another booking
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white/90 p-6 shadow-luxe backdrop-blur sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input name="name" type="text" placeholder="Your name" className={inputBase} />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input name="phone" type="tel" placeholder="03xx xxxxxxx" className={inputBase} />
        </Field>
        <Field label="Date" error={errors.date}>
          <input name="date" type="date" min={today} className={inputBase} />
        </Field>
        <Field label="Time" error={errors.time}>
          <select name="time" defaultValue="" className={inputBase}>
            <option value="" disabled>Select time</option>
            {["12:30 PM","1:30 PM","2:30 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Guests" error={errors.guests}>
          <select name="guests" defaultValue="" className={inputBase}>
            <option value="" disabled>How many?</option>
            {["1","2","3","4","5","6","7","8","9","10+"].map((g) => (
              <option key={g} value={g}>{g} {g === "1" ? "guest" : "guests"}</option>
            ))}
          </select>
        </Field>
        <Field label="Seating">
          <select name="seating" defaultValue="any" className={inputBase}>
            <option value="any">No preference</option>
            <option value="garden">Garden (open-air)</option>
            <option value="indoor">Indoor</option>
          </select>
        </Field>
        <Field label="Occasion (optional)">
          <select name="occasion" defaultValue="" className={inputBase}>
            <option value="">None</option>
            {["Birthday","Anniversary","Business","Date Night","Family"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Special Requests (optional)">
          <textarea name="notes" rows={2} placeholder="Window seat, high chair, allergies…" className={inputBase} />
        </Field>
      </div>

      {errors.form && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-gold mt-6 w-full disabled:opacity-60">
        {status === "loading" ? "Sending…" : (
          <>
            Request Reservation <Arrow className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-forest-900/50">
        Prefer to talk? Call us at{" "}
        <a href={site.phoneHref} className="font-semibold text-gold-dark">{site.phone}</a>
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-forest-900/60">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
