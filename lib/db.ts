import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
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
const REDIS_KEY = "kk:db";

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

// Cache across hot-reloads / warm invocations via globalThis.
const g = globalThis as unknown as { __kkdb?: DB; __kkredis?: Redis | null };

// ---- Storage backend selection ------------------------------------------
// Uses Upstash/Vercel KV Redis when the REST env vars are present; otherwise
// falls back to a local JSON file (dev) / in-memory (read-only filesystems).
function getRedis(): Redis | null {
  if (g.__kkredis !== undefined) return g.__kkredis;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  g.__kkredis = url && token ? new Redis({ url, token }) : null;
  return g.__kkredis;
}

export const usingRedis = () => getRedis() !== null;

// ---- File helpers (local fallback) --------------------------------------
function fileLoad(): DB {
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
  filePersist();
  return g.__kkdb!;
}

function filePersist() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(g.__kkdb, null, 2));
  } catch {
    /* best-effort; in-memory still works (e.g. serverless read-only FS) */
  }
}

// ---- Public storage boundary --------------------------------------------
/** Load the latest state into memory. Call once at the top of each request. */
export async function hydrate(): Promise<DB> {
  const redis = getRedis();
  if (redis) {
    const data = (await redis.get<DB>(REDIS_KEY)) ?? null;
    if (data) {
      g.__kkdb = data;
    } else {
      g.__kkdb = seed();
      await redis.set(REDIS_KEY, g.__kkdb);
    }
    return g.__kkdb!;
  }
  return fileLoad();
}

/** Persist the current in-memory state. Call after any mutation. */
export async function flush(): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_KEY, g.__kkdb);
    return;
  }
  filePersist();
}

/** Synchronous accessor — assumes hydrate() has run for this request. */
export function db(): DB {
  return g.__kkdb ?? fileLoad();
}

/** Sync local persist used by the mutation helpers (no-op-safe on serverless). */
export function commit() {
  if (!getRedis()) filePersist();
}

export const uid = (p = "") =>
  p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export function orderCode() {
  return "KK-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

// ---- Collection helpers (mutate in-memory; route calls flush() after) ----

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
