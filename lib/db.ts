import fs from "fs";
import path from "path";
import type {
  DB,
  Table,
  Reservation,
  Order,
  Feedback,
  Notification,
} from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function seed(): DB {
  const tables: Table[] = [
    { id: "T1", name: "Palm 1", seats: 2, zone: "garden", status: "free" },
    { id: "T2", name: "Palm 2", seats: 2, zone: "garden", status: "free" },
    { id: "T3", name: "Grove 3", seats: 4, zone: "garden", status: "free" },
    { id: "T4", name: "Grove 4", seats: 4, zone: "garden", status: "free" },
    { id: "T5", name: "Lagoon 5", seats: 6, zone: "garden", status: "free" },
    { id: "T6", name: "Ivory 6", seats: 2, zone: "indoor", status: "free" },
    { id: "T7", name: "Ivory 7", seats: 4, zone: "indoor", status: "free" },
    { id: "T8", name: "Emerald 8", seats: 4, zone: "indoor", status: "free" },
    { id: "T9", name: "Emerald 9", seats: 8, zone: "indoor", status: "free" },
    { id: "T10", name: "Sultan Hall", seats: 12, zone: "indoor", status: "free" },
  ];
  return { tables, reservations: [], orders: [], feedback: [], notifications: [] };
}

// Cache across hot-reloads in dev via globalThis.
const g = globalThis as unknown as { __kkdb?: DB };

function load(): DB {
  if (g.__kkdb) return g.__kkdb;
  try {
    if (fs.existsSync(DB_FILE)) {
      g.__kkdb = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DB;
      return g.__kkdb!;
    }
  } catch {
    /* fall through to seed */
  }
  g.__kkdb = seed();
  persist();
  return g.__kkdb!;
}

function persist() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(g.__kkdb, null, 2));
  } catch {
    /* best-effort; in-memory still works */
  }
}

export function db(): DB {
  return load();
}

export function commit() {
  persist();
}

export const uid = (p = "") =>
  p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export function orderCode() {
  return "KK-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

// ---- Collection helpers -------------------------------------------------

export function addReservation(r: Reservation) {
  db().reservations.unshift(r);
  commit();
  return r;
}

export function addOrder(o: Order) {
  db().orders.unshift(o);
  commit();
  return o;
}

export function addFeedback(f: Feedback) {
  db().feedback.unshift(f);
  commit();
  return f;
}

export function addNotification(n: Notification) {
  db().notifications.unshift(n);
  // keep the feed tidy
  db().notifications = db().notifications.slice(0, 60);
  commit();
  return n;
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const o = db().orders.find((x) => x.id === id);
  if (!o) return null;
  Object.assign(o, patch, { updatedAt: Date.now() });
  commit();
  return o;
}

export function updateReservation(id: string, patch: Partial<Reservation>) {
  const r = db().reservations.find((x) => x.id === id);
  if (!r) return null;
  Object.assign(r, patch);
  commit();
  return r;
}

export function updateTable(id: string, patch: Partial<Table>) {
  const t = db().tables.find((x) => x.id === id);
  if (!t) return null;
  Object.assign(t, patch);
  commit();
  return t;
}
