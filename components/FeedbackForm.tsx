"use client";

import { useState } from "react";
import { Check, Star } from "./Icons";

function Stars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star`}
          className="transition-transform hover:scale-110"
        >
          <Star className={`h-8 w-8 ${n <= (hover || value) ? "text-gold" : "text-forest-900/15"}`} />
        </button>
      ))}
    </div>
  );
}

const inp =
  "w-full rounded-xl border border-forest-100 bg-cream/40 px-4 py-2.5 text-sm text-forest-900 outline-none focus:border-gold focus:bg-white";

export function FeedbackForm() {
  const [overall, setOverall] = useState(0);
  const [food, setFood] = useState(0);
  const [service, setService] = useState(0);
  const [ambiance, setAmbiance] = useState(0);
  const [name, setName] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!overall) return setError("Please give an overall rating.");
    setError("");
    setLoading(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: overall, food, service, ambiance, name, orderCode, comment }),
    });
    setLoading(false);
    if (res.ok) setDone(true);
    else setError("Something went wrong. Please try again.");
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-luxe">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-800 text-gold">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-serif text-2xl text-forest-900">Thank you!</h3>
        <p className="mt-2 text-sm text-forest-900/65">
          Your feedback helps us make KK Grove better. {overall <= 3 && "Our manager will personally look into your visit."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-luxe sm:p-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-forest-900/50">Overall experience</p>
        <div className="mt-3 flex justify-center">
          <Stars value={overall} onChange={setOverall} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {[
          ["Food", food, setFood],
          ["Service", service, setService],
          ["Ambiance", ambiance, setAmbiance],
        ].map(([label, val, set]) => (
          <div key={label as string} className="text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-forest-900/50">{label as string}</div>
            <div className="flex justify-center">
              <Stars value={val as number} onChange={set as (v: number) => void} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" className={inp} />
        <input value={orderCode} onChange={(e) => setOrderCode(e.target.value)} placeholder="Order code e.g. KK-AB12 (optional)" className={inp} />
      </div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="Tell us about your visit…" className={`${inp} mt-3`} />

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button disabled={loading} className="btn-gold mt-5 w-full disabled:opacity-60">
        {loading ? "Sending…" : "Share Feedback"}
      </button>
    </form>
  );
}
