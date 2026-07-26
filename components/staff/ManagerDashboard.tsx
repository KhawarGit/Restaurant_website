"use client";

import { useMemo } from "react";
import { StaffShell, Pill } from "./StaffShell";
import { usePoll, timeAgo } from "@/lib/usePoll";
import {
  orderStatusStyle,
  orderTypeStyle,
  reservationStatusStyle,
  tableStatusStyle,
} from "@/lib/statusStyles";
import type { Order, Reservation, Table, Feedback, Notification, Role } from "@/lib/types";
import { WhatsApp, Star } from "@/components/Icons";

const isToday = (ts: number) => {
  const d = new Date(ts);
  const n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};

export function ManagerDashboard({ role }: { role: Role }) {
  const ordersQ = usePoll<{ orders: Order[] }>("/api/orders", 4000);
  const resQ = usePoll<{ reservations: Reservation[] }>("/api/reservations", 5000);
  const tablesQ = usePoll<{ tables: Table[] }>("/api/tables", 6000);
  const fbQ = usePoll<{ feedback: Feedback[]; average: number }>("/api/feedback", 8000);
  const notifQ = usePoll<{ notifications: Notification[]; unread: number }>("/api/notifications", 4000);

  const orders = ordersQ.data?.orders ?? [];
  const reservations = resQ.data?.reservations ?? [];
  const tables = tablesQ.data?.tables ?? [];
  const feedback = fbQ.data?.feedback ?? [];
  const notifications = notifQ.data?.notifications ?? [];

  const stats = useMemo(() => {
    const today = orders.filter((o) => isToday(o.createdAt));
    const revenue = today.reduce((s, o) => s + o.total, 0);
    const paid = today.filter((o) => o.payment.status === "paid").reduce((s, o) => s + o.total, 0);
    const occupied = tables.filter((t) => t.status === "occupied").length;
    const resToday = reservations.filter((r) => r.status !== "cancelled").length;
    const avg = fbQ.data?.average ?? 0;
    const activeKitchen = orders.filter((o) => ["new", "preparing"].includes(o.status)).length;
    return { revenue, paid, occupied, resToday, avg, todayCount: today.length, activeKitchen };
  }, [orders, tables, reservations, fbQ.data]);

  async function reservationAction(r: Reservation, status: string) {
    await fetch(`/api/reservations/${r.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    resQ.refetch();
    tablesQ.refetch();
  }

  async function markRead(id?: string) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id ? { id } : {}),
    });
    notifQ.refetch();
  }

  const unread = notifQ.data?.unread ?? 0;

  return (
    <StaffShell
      role={role}
      title="Manager Overview"
      right={
        unread > 0 ? (
          <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">{unread} new</span>
        ) : null
      }
    >
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Stat label="Revenue (today)" value={`Rs ${stats.revenue.toLocaleString()}`} sub={`Rs ${stats.paid.toLocaleString()} collected`} accent="text-gold-light" />
        <Stat label="Orders today" value={String(stats.todayCount)} sub={`${stats.activeKitchen} in kitchen`} />
        <Stat label="Reservations" value={String(stats.resToday)} sub="active today" />
        <Stat label="Tables busy" value={`${stats.occupied}/${tables.length}`} sub="occupied now" />
        <Stat label="Avg rating" value={stats.avg ? `${stats.avg}★` : "—"} sub={`${feedback.length} reviews`} accent="text-emerald-300" />
        <Stat label="Satisfaction" value={satisfaction(feedback)} sub="promoters" accent="text-sky-300" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Reservations */}
          <Panel title="Reservations" count={reservations.length}>
            {reservations.length === 0 && <Empty>No reservations yet.</Empty>}
            <div className="space-y-2">
              {reservations.slice(0, 8).map((r) => (
                <div key={r.id} className="rounded-xl bg-forest-800/50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-serif text-base text-cream">{r.name}</span>
                      <span className="ml-2 text-xs text-cream/50">party of {r.guests} · {r.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {r.tableName && <Pill tone="bg-gold/20 text-gold-light">{r.tableName}</Pill>}
                      <Pill tone={reservationStatusStyle[r.status]}>{r.status}</Pill>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-cream/50">{r.date} at {r.time} · {r.seating}{r.occasion ? ` · ${r.occasion}` : ""}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.status !== "seated" && r.status !== "cancelled" && (
                      <button onClick={() => reservationAction(r, "seated")} className="rounded-full bg-sky-500/20 px-3 py-1 text-xs text-sky-300">Seat now</button>
                    )}
                    {r.status === "pending" && (
                      <button onClick={() => reservationAction(r, "confirmed")} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">Confirm</button>
                    )}
                    {r.status !== "cancelled" && (
                      <button onClick={() => reservationAction(r, "cancelled")} className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Recent orders */}
          <Panel title="Live Orders" count={orders.length}>
            {orders.length === 0 && <Empty>No orders yet.</Empty>}
            <div className="space-y-2">
              {orders.slice(0, 8).map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-2 rounded-xl bg-forest-800/50 p-3">
                  <div className="min-w-0">
                    <span className="font-mono text-sm font-bold text-gold">{o.code}</span>
                    <span className="ml-2 text-sm text-cream/80">{o.customer.name}</span>
                    <div className="truncate text-xs text-cream/40">{o.items.reduce((n, i) => n + i.qty, 0)} items · {timeAgo(o.createdAt)}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="text-sm text-gold">Rs {o.total.toLocaleString()}</span>
                    <Pill tone={orderTypeStyle[o.type]}>{o.type}</Pill>
                    <Pill tone={orderStatusStyle[o.status]}>{o.status}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Notifications */}
          <Panel
            title="Notifications"
            count={notifications.length}
            action={unread > 0 ? <button onClick={() => markRead()} className="text-xs text-gold hover:underline">Mark all read</button> : undefined}
          >
            {notifications.length === 0 && <Empty>You're all caught up.</Empty>}
            <div className="space-y-2">
              {notifications.slice(0, 8).map((n) => (
                <div key={n.id} className={`rounded-xl border p-3 ${n.read ? "border-cream/5 bg-forest-800/30" : "border-gold/30 bg-forest-800/60"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium text-cream">{n.title}</div>
                      <div className="mt-0.5 text-xs text-cream/50">{n.message}</div>
                    </div>
                    {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-cream/40">{timeAgo(n.createdAt)}</span>
                    <div className="flex gap-2">
                      {n.waLink && (
                        <a href={n.waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/90 px-2.5 py-1 text-[11px] font-semibold text-white">
                          <WhatsApp className="h-3 w-3" /> WhatsApp
                        </a>
                      )}
                      {!n.read && <button onClick={() => markRead(n.id)} className="text-[11px] text-cream/50 hover:text-cream">Dismiss</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Tables */}
          <Panel title="Floor Status" count={tables.length}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {tables.map((t) => (
                <div key={t.id} className={`rounded-lg border p-2 text-center text-xs ${tableStatusStyle[t.status]}`}>
                  <div className="font-serif text-sm text-cream">{t.name}</div>
                  <div className="opacity-70">{t.status}</div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Feedback */}
          <Panel title="Guest Feedback" count={feedback.length}>
            {feedback.length === 0 && <Empty>No feedback yet.</Empty>}
            <div className="space-y-2">
              {feedback.slice(0, 5).map((f) => (
                <div key={f.id} className="rounded-xl bg-forest-800/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cream">{f.name}</span>
                    <span className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < f.rating ? "" : "opacity-20"}`} />
                      ))}
                    </span>
                  </div>
                  {f.comment && <p className="mt-1 text-xs text-cream/60">“{f.comment}”</p>}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </StaffShell>
  );
}

function satisfaction(fb: Feedback[]) {
  if (fb.length === 0) return "—";
  const promoters = fb.filter((f) => f.rating >= 4).length;
  return `${Math.round((promoters / fb.length) * 100)}%`;
}

function Stat({ label, value, sub, accent = "text-cream" }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-forest-900/50 p-4">
      <div className="text-[11px] uppercase tracking-wider text-cream/40">{label}</div>
      <div className={`mt-1 font-serif text-2xl ${accent}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-cream/40">{sub}</div>}
    </div>
  );
}

function Panel({ title, count, action, children }: { title: string; count?: number; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-forest-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-lg">
          {title}
          {typeof count === "number" && <span className="ml-2 text-sm text-cream/40">{count}</span>}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-center text-sm text-cream/40">{children}</p>;
}
