"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { menu } from "@/lib/menu";
import { useCart } from "@/lib/useCart";
import { site } from "@/lib/site";
import { Arrow, Check, WhatsApp } from "@/components/Icons";
import type { OrderType } from "@/lib/types";

const types: { id: OrderType; label: string; icon: string; note: string }[] = [
  { id: "dine-in", label: "Dine-in", icon: "🍽️", note: "Order ahead, we'll have it ready" },
  { id: "takeaway", label: "Takeaway", icon: "🥡", note: "Collect from the counter" },
  { id: "delivery", label: "Delivery", icon: "🛵", note: "To your doorstep" },
];

type Done = { code: string; total: number; waLink: string; paid: boolean };

export function OrderExperience() {
  const cart = useCart();
  const [type, setType] = useState<OrderType>("delivery");
  const [cat, setCat] = useState(menu[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pay, setPay] = useState<"cash" | "online">("cash");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<"build" | "processing" | "done">("build");
  const [done, setDone] = useState<Done | null>(null);

  const active = useMemo(() => menu.find((c) => c.id === cat) ?? menu[0], [cat]);

  async function placeOrder() {
    const errs: Record<string, string> = {};
    if (cart.lines.length === 0) errs.cart = "Your cart is empty.";
    if (!name.trim()) errs.name = "Please enter your name.";
    if (type !== "dine-in" && !/^[+\d][\d\s-]{7,}$/.test(phone)) errs.phone = "Enter a valid phone.";
    if (type === "delivery" && address.trim().length < 6) errs.address = "Enter your delivery address.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStage("processing");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        customer: { name, phone, address },
        items: cart.lines,
        payment: { method: pay, status: "unpaid" },
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStage("build");
      setErrors(data.errors ?? { cart: data.error ?? "Something went wrong." });
      return;
    }

    let paid = false;
    if (pay === "online") {
      const p = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.order.id, method: "online" }),
      });
      paid = p.ok;
    }

    setDone({ code: data.order.code, total: data.order.total, waLink: data.waLink, paid });
    setStage("done");
    cart.clear();
  }

  if (stage === "done" && done) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest-800 text-gold">
          <Check className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-serif text-3xl text-forest-900">Order confirmed!</h2>
        <p className="mt-3 text-forest-900/70">
          Thanks {name || "guest"} — your {type} order is in. We've alerted the kitchen.
        </p>
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-gold-light">Order {done.code}</span>
          <span className="rounded-full bg-cream-dark px-4 py-2 text-sm font-semibold text-forest-800">Rs {done.total.toLocaleString()}</span>
          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${done.paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {done.paid ? "Paid online" : "Pay on " + (type === "delivery" ? "delivery" : "collection")}
          </span>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <a href={done.waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
            <WhatsApp className="h-4 w-4" /> Send order to restaurant
          </a>
          <div className="flex gap-4 text-sm">
            <Link href="/feedback" className="font-semibold text-gold-dark hover:underline">Leave feedback</Link>
            <button onClick={() => setStage("build")} className="font-semibold text-forest-800 hover:underline">Order again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      {/* Left: type + menu */}
      <div>
        <div className="grid gap-3 sm:grid-cols-3">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                type === t.id ? "border-gold bg-white shadow-luxe" : "border-forest-100 bg-white/60 hover:border-gold/40"
              }`}
            >
              <div className="text-2xl">{t.icon}</div>
              <div className="mt-2 font-serif text-lg text-forest-900">{t.label}</div>
              <div className="text-xs text-forest-900/55">{t.note}</div>
            </button>
          ))}
        </div>

        {/* category tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {menu.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === c.id ? "bg-forest-800 text-cream" : "border border-forest-200 text-forest-800 hover:border-gold"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {active.items.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-3 rounded-2xl border border-forest-100 bg-white p-4">
              <div className="min-w-0">
                <h3 className="font-serif text-lg text-forest-900">{d.name}</h3>
                <p className="truncate text-xs text-forest-900/55">{d.desc}</p>
                <span className="mt-1 inline-block font-semibold text-gold-dark">Rs {d.price.toLocaleString()}</span>
              </div>
              <button
                onClick={() => cart.add(d.name, d.price)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-sheen text-lg font-bold text-forest-900 transition-transform hover:scale-105"
                aria-label={`Add ${d.name}`}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: cart / checkout */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-white p-6 shadow-luxe">
          <h2 className="font-serif text-xl text-forest-900">Your Order</h2>
          <p className="text-xs capitalize text-forest-900/50">{type}</p>

          {cart.lines.length === 0 ? (
            <p className="py-8 text-center text-sm text-forest-900/50">Add dishes to get started.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {cart.lines.map((l) => (
                <div key={l.name} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 text-forest-900/80">{l.name}</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => cart.setQty(l.name, l.qty - 1)} className="grid h-6 w-6 place-items-center rounded-full bg-cream-dark">−</button>
                    <span className="w-5 text-center">{l.qty}</span>
                    <button onClick={() => cart.setQty(l.name, l.qty + 1)} className="grid h-6 w-6 place-items-center rounded-full bg-cream-dark">+</button>
                  </div>
                  <span className="w-20 text-right font-semibold text-forest-900">Rs {(l.price * l.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-forest-100 pt-3 text-sm">
                <Row label="Subtotal" value={cart.totals.subtotal} />
                <Row label="Tax (13%)" value={cart.totals.tax} />
                <div className="mt-1 flex justify-between font-bold text-forest-900">
                  <span>Total</span><span className="text-gold-dark">Rs {cart.totals.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* customer details */}
          <div className="mt-5 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inp} />
            {errors.name && <Err>{errors.name}</Err>}
            {type !== "dine-in" && (
              <>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className={inp} />
                {errors.phone && <Err>{errors.phone}</Err>}
              </>
            )}
            {type === "delivery" && (
              <>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder="Delivery address" className={inp} />
                {errors.address && <Err>{errors.address}</Err>}
              </>
            )}
          </div>

          {/* payment */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-forest-900/50">Payment</div>
            <div className="grid grid-cols-2 gap-2">
              {(["cash", "online"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPay(p)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                    pay === p ? "border-gold bg-gold/10 text-forest-900" : "border-forest-100 text-forest-900/60"
                  }`}
                >
                  {p === "cash" ? "Cash" : "Pay online"}
                </button>
              ))}
            </div>
          </div>

          {errors.cart && <Err>{errors.cart}</Err>}

          <button
            onClick={placeOrder}
            disabled={stage === "processing"}
            className="btn-gold mt-5 w-full disabled:opacity-60"
          >
            {stage === "processing" ? "Processing…" : (
              <>{pay === "online" ? `Pay Rs ${cart.totals.total.toLocaleString()}` : "Place Order"} <Arrow className="h-4 w-4" /></>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-forest-900/45">
            Or call us at <a href={site.phoneHref} className="font-semibold text-gold-dark">{site.phone}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const inp =
  "w-full rounded-xl border border-forest-100 bg-cream/40 px-4 py-2.5 text-sm text-forest-900 outline-none focus:border-gold focus:bg-white";

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-forest-900/60">
      <span>{label}</span>
      <span>Rs {value.toLocaleString()}</span>
    </div>
  );
}
function Err({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-red-600">{children}</p>;
}
