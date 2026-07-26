"use client";

import { useMemo, useState } from "react";
import { StaffShell, Pill } from "./StaffShell";
import { usePoll } from "@/lib/usePoll";
import { useCart } from "@/lib/useCart";
import { menu } from "@/lib/menu";
import { orderStatusStyle, orderTypeStyle, tableStatusStyle } from "@/lib/statusStyles";
import type { Order, OrderStatus, OrderType, Role, Table, TableStatus } from "@/lib/types";

const allDishes = menu.flatMap((c) => c.items.map((i) => ({ ...i, cat: c.title })));

export function WaiterDashboard({ role }: { role: Role }) {
  const tablesQ = usePoll<{ tables: Table[] }>("/api/tables", 5000);
  const ordersQ = usePoll<{ orders: Order[] }>("/api/orders", 4000);
  const tables = tablesQ.data?.tables ?? [];
  const orders = ordersQ.data?.orders ?? [];

  const cart = useCart();
  const [type, setType] = useState<OrderType>("dine-in");
  const [tableId, setTableId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [q, setQ] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return allDishes;
    return allDishes.filter((d) => d.name.toLowerCase().includes(s) || d.cat.toLowerCase().includes(s));
  }, [q]);

  async function setTableStatus(t: Table, status: TableStatus) {
    await fetch(`/api/tables/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    tablesQ.refetch();
  }

  async function submit() {
    if (cart.lines.length === 0) return setToast("Add at least one item.");
    if (!name.trim()) return setToast("Enter a customer name.");
    setSubmitting(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        tableId: type === "dine-in" ? tableId || undefined : undefined,
        customer: { name, phone, address },
        items: cart.lines,
        payment: { method: "cash", status: "unpaid" },
      }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) return setToast(data.error ?? Object.values(data.errors ?? {})[0] ?? "Failed");
    cart.clear();
    setName(""); setPhone(""); setAddress(""); setTableId("");
    setToast(`Order ${data.order.code} sent to kitchen ✓`);
    ordersQ.refetch();
    tablesQ.refetch();
    setTimeout(() => setToast(""), 3000);
  }

  async function patchOrder(o: Order, body: any) {
    await fetch(`/api/orders/${o.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    ordersQ.refetch();
    tablesQ.refetch();
  }

  const active = orders.filter((o) => !["completed", "cancelled"].includes(o.status));

  return (
    <StaffShell role={role} title="Floor & Orders" right={toast ? <span className="hidden text-xs text-emerald-300 sm:block">{toast}</span> : null}>
      {/* Tables floor */}
      <section className="mb-6">
        <h2 className="mb-3 font-serif text-lg text-cream/90">Floor Map</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tables.map((t) => (
            <div key={t.id} className={`rounded-xl border p-3 ${tableStatusStyle[t.status]}`}>
              <div className="flex items-center justify-between">
                <span className="font-serif text-base text-cream">{t.name}</span>
                <span className="text-xs opacity-80">{t.seats}p</span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider opacity-70">{t.zone} · {t.status}</div>
              <div className="mt-2 flex gap-1">
                <button onClick={() => setTableStatus(t, "occupied")} className="flex-1 rounded bg-cream/10 py-1 text-[11px] hover:bg-cream/20">Seat</button>
                <button onClick={() => setTableStatus(t, "free")} className="flex-1 rounded bg-cream/10 py-1 text-[11px] hover:bg-cream/20">Clear</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* New order builder */}
        <section className="rounded-2xl bg-forest-900/50 p-4">
          <h2 className="mb-3 font-serif text-lg">New Order</h2>

          <div className="mb-3 flex gap-2">
            {(["dine-in", "takeaway", "delivery"] as OrderType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                  type === t ? "bg-gold-sheen text-forest-900" : "bg-forest-800/60 text-cream/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {type === "dine-in" && (
            <select value={tableId} onChange={(e) => setTableId(e.target.value)} className="mb-3 w-full rounded-lg border border-cream/15 bg-forest-950 px-3 py-2 text-sm">
              <option value="">Select table…</option>
              {tables.map((t) => (
                <option key={t.id} value={t.id}>{t.name} · {t.seats}p · {t.zone}</option>
              ))}
            </select>
          )}

          <div className="mb-3 grid grid-cols-2 gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" className="rounded-lg border border-cream/15 bg-forest-950 px-3 py-2 text-sm" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-lg border border-cream/15 bg-forest-950 px-3 py-2 text-sm" />
            {type === "delivery" && (
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" className="col-span-2 rounded-lg border border-cream/15 bg-forest-950 px-3 py-2 text-sm" />
            )}
          </div>

          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" className="mb-2 w-full rounded-lg border border-cream/15 bg-forest-950 px-3 py-2 text-sm" />
          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {filtered.map((d) => (
              <button key={d.name} onClick={() => cart.add(d.name, d.price)} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-cream/5">
                <span className="text-cream/85">{d.name}<span className="ml-2 text-xs text-cream/40">{d.cat}</span></span>
                <span className="text-gold">Rs {d.price.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Cart + active orders */}
        <section className="space-y-6">
          <div className="rounded-2xl bg-forest-900/50 p-4">
            <h2 className="mb-3 font-serif text-lg">Current Order</h2>
            {cart.lines.length === 0 ? (
              <p className="py-6 text-center text-sm text-cream/40">No items yet — tap a dish to add.</p>
            ) : (
              <div className="space-y-2">
                {cart.lines.map((l) => (
                  <div key={l.name} className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex-1 text-cream/85">{l.name}</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => cart.setQty(l.name, l.qty - 1)} className="grid h-6 w-6 place-items-center rounded bg-cream/10">−</button>
                      <span className="w-5 text-center">{l.qty}</span>
                      <button onClick={() => cart.setQty(l.name, l.qty + 1)} className="grid h-6 w-6 place-items-center rounded bg-cream/10">+</button>
                    </div>
                    <span className="w-20 text-right text-gold">Rs {(l.price * l.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="mt-3 border-t border-cream/10 pt-3 text-sm">
                  <div className="flex justify-between text-cream/60"><span>Subtotal</span><span>Rs {cart.totals.subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-cream/60"><span>Tax (13%)</span><span>Rs {cart.totals.tax.toLocaleString()}</span></div>
                  <div className="mt-1 flex justify-between font-bold text-cream"><span>Total</span><span className="text-gold">Rs {cart.totals.total.toLocaleString()}</span></div>
                </div>
              </div>
            )}
            {toast && <p className="mt-3 text-center text-sm text-emerald-300">{toast}</p>}
            <button onClick={submit} disabled={submitting} className="mt-4 w-full rounded-full bg-gold-sheen py-2.5 text-sm font-bold text-forest-900 disabled:opacity-50">
              {submitting ? "Sending…" : "Send to Kitchen"}
            </button>
          </div>

          <div className="rounded-2xl bg-forest-900/50 p-4">
            <h2 className="mb-3 font-serif text-lg">Active Orders <span className="text-sm text-cream/40">({active.length})</span></h2>
            <div className="space-y-2">
              {active.length === 0 && <p className="py-4 text-center text-sm text-cream/40">No active orders.</p>}
              {active.map((o) => (
                <div key={o.id} className="rounded-xl bg-forest-800/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-gold">{o.code}</span>
                    <div className="flex gap-1.5">
                      <Pill tone={orderTypeStyle[o.type]}>{o.tableName ?? o.type}</Pill>
                      <Pill tone={orderStatusStyle[o.status]}>{o.status}</Pill>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-cream/50">{o.customer.name} · Rs {o.total.toLocaleString()} · {o.payment.status}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {o.status === "ready" && <button onClick={() => patchOrder(o, { status: "served" })} className="rounded-full bg-cream/10 px-3 py-1 text-xs hover:bg-cream/20">Mark served</button>}
                    {o.payment.status !== "paid" && <button onClick={() => patchOrder(o, { paymentStatus: "paid" })} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">Take payment</button>}
                    {o.status !== "completed" && <button onClick={() => patchOrder(o, { status: "completed" })} className="rounded-full bg-cream/10 px-3 py-1 text-xs hover:bg-cream/20">Complete</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StaffShell>
  );
}
