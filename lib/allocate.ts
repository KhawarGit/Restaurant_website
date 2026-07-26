import { db } from "./db";
import type { Reservation, Table, Zone } from "./types";

// Two reservations clash if they're within this window (minutes) on the same day.
const TURN_MINUTES = 90;

function toMinutes(time: string): number {
  // Accepts "7:00 PM" / "12:30 PM" style strings.
  const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ap = m[3]?.toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

function overlaps(a: string, b: string) {
  return Math.abs(toMinutes(a) - toMinutes(b)) < TURN_MINUTES;
}

export type Allocation = {
  table?: Table;
  waitlisted: boolean;
  reason: string;
};

/**
 * "Smart" table allocation — a rules engine that picks the best-fit table:
 *  1. must seat the whole party (fewest wasted seats wins),
 *  2. honours the guest's indoor/garden preference when possible,
 *  3. avoids tables already reserved within the turn window for that day.
 * Falls back gracefully to any zone, then to the waitlist.
 */
export function allocateTable(
  guests: number,
  date: string,
  time: string,
  seating: Zone | "any"
): Allocation {
  const { tables, reservations } = db();

  const busy = new Set(
    reservations
      .filter(
        (r) =>
          r.status !== "cancelled" &&
          r.date === date &&
          r.tableId &&
          overlaps(r.time, time)
      )
      .map((r) => r.tableId as string)
  );

  const fits = tables
    .filter((t) => t.seats >= guests && !busy.has(t.id))
    .sort((a, b) => a.seats - b.seats); // best-fit: least wasted capacity

  if (fits.length === 0) {
    return {
      waitlisted: true,
      reason:
        "All suitable tables are booked around this time — added to the waitlist; the manager will confirm shortly.",
    };
  }

  // Prefer the requested zone if a fitting table exists there.
  const preferred =
    seating !== "any" ? fits.find((t) => t.zone === seating) : undefined;
  const table = preferred ?? fits[0];

  const zoneNote =
    seating !== "any" && table.zone !== seating
      ? ` (nearest match — ${seating} was full)`
      : "";

  return {
    table,
    waitlisted: false,
    reason: `Smart-assigned ${table.name} · ${table.zone} · seats ${table.seats}${zoneNote}.`,
  };
}

export function reservationSummary(r: Reservation) {
  return [
    `Name: ${r.name}`,
    `Phone: ${r.phone}`,
    `Party: ${r.guests}`,
    `When: ${r.date} at ${r.time}`,
    `Seating: ${r.seating}`,
    r.tableName ? `Table: ${r.tableName}` : `Table: waitlist`,
    r.occasion ? `Occasion: ${r.occasion}` : null,
    r.notes ? `Notes: ${r.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
