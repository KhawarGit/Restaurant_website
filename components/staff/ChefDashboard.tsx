"use client";

import { useState } from "react";
import { StaffShell } from "./StaffShell";
import { usePoll } from "@/lib/usePoll";
import { orderTypeStyle } from "@/lib/statusStyles";
import type { Order, OrderStatus, Role } from "@/lib/types";

const columns: { key: OrderStatus; label: string; accent: string }[] = [
  { key: "new", label: "New Tickets", accent: "border-amber-400" },
  { key: "preparing", label: "Preparing", accent: "border-sky-400" },
  { key: "ready", label: "Ready to Serve", accent: "border-emerald-400" },
];

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  new: "preparing",
  preparing: "ready",
};
const nextLabel: Partial<Record<OrderStatus, string>> = {
  new: "Start cooking",
  preparing: "Mark ready",
};

function minsAgo(ts: number) {
  return Math.floor((Date.now() - ts) / 60000);
}

export function ChefDashboard({ role }: { role: Role }) {
  const { data, refetch } = usePoll<{ orders: Order[] }>("/api/orders", 3000);
  const [busy, setBusy] = useState<string | null>(null);
  const orders = data?.orders ?? [];

  async function advance(o: Order) {
    const to = nextStatus[o.status];
    if (!to) return;
    setBusy(o.id);
    await fetch(`/api/orders/${o.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: to }),
    });
    await refetch();
    setBusy(null);
  }

  return (
    <StaffShell
      role={role}
      title="Kitchen Display"
      right={<span className="hidden text-xs text-cream/50 sm:block">Live · auto-refresh</span>}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const list = orders.filter((o) => o.status === col.key);
          return (
            <div key={col.key} className="rounded-2xl bg-forest-900/50 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-serif text-lg">{col.label}</h2>
                <span className="rounded-full bg-cream/10 px-2.5 py-0.5 text-xs font-semibold">{list.length}</span>
              </div>
              <div className="space-y-3">
                {list.length === 0 && (
                  <p className="rounded-xl border border-dashed border-cream/10 py-8 text-center text-sm text-cream/30">
                    Nothing here
                  </p>
                )}
                {list.map((o) => {
                  const age = minsAgo(o.createdAt);
                  const late = col.key !== "ready" && age >= 15;
                  return (
                    <div
                      key={o.id}
                      className={`rounded-xl border-l-4 bg-forest-800/60 p-4 ${col.accent} ${
                        late ? "ring-1 ring-red-400/50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-gold">{o.code}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${orderTypeStyle[o.type]}`}>
                          {o.tableName ?? o.type}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {o.items.map((i, idx) => (
                          <li key={idx} className="flex gap-2 text-sm">
                            <span className="font-bold text-cream">{i.qty}×</span>
                            <span className="text-cream/85">
                              {i.name}
                              {i.notes && <span className="block text-xs text-amber-300/80">↳ {i.notes}</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-xs ${late ? "font-bold text-red-300" : "text-cream/40"}`}>
                          {age}m {late ? "· running late" : "ago"}
                        </span>
                        {nextStatus[o.status] && (
                          <button
                            onClick={() => advance(o)}
                            disabled={busy === o.id}
                            className="rounded-full bg-gold-sheen px-3 py-1.5 text-xs font-bold text-forest-900 disabled:opacity-50"
                          >
                            {busy === o.id ? "…" : nextLabel[o.status]}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </StaffShell>
  );
}
