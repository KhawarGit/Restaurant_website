import { NextResponse } from "next/server";
import { addReservation, addNotification, updateTable, uid, hydrate, flush } from "@/lib/db";
import { allocateTable, reservationSummary } from "@/lib/allocate";
import { managerWaLink, sendWhatsApp } from "@/lib/notify";
import { site } from "@/lib/site";
import type { Reservation, Zone } from "@/lib/types";

type Body = {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
  seating?: string;
  occasion?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let data: Body;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, phone, date, time, guests } = data;
  const errors: Record<string, string> = {};

  if (!name || name.trim().length < 2) errors.name = "Please enter your name.";
  if (!phone || !/^[+\d][\d\s-]{7,}$/.test(phone)) errors.phone = "Enter a valid phone number.";
  if (!date) errors.date = "Choose a date.";
  if (!time) errors.time = "Choose a time.";
  if (!guests) errors.guests = "Select the number of guests.";

  if (date) {
    const chosen = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) errors.date = "Please choose a future date.";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  await hydrate();

  const partySize = parseInt(String(guests).replace(/\D/g, ""), 10) || 2;
  const seating = (["indoor", "garden"].includes(String(data.seating))
    ? data.seating
    : "any") as Zone | "any";

  // Smart table allocation.
  const alloc = allocateTable(partySize, date!, time!, seating);

  const reservation: Reservation = {
    id: uid("r_"),
    name: name!.trim(),
    phone: phone!.trim(),
    date: date!,
    time: time!,
    guests: partySize,
    seating,
    occasion: data.occasion || undefined,
    notes: data.notes || undefined,
    status: alloc.waitlisted ? "pending" : "confirmed",
    tableId: alloc.table?.id,
    tableName: alloc.table?.name,
    createdAt: Date.now(),
  };

  addReservation(reservation);
  if (alloc.table) updateTable(alloc.table.id, { status: "reserved" });

  // Build manager WhatsApp notification.
  const message =
    `🌴 *New reservation — ${site.name}*\n\n` +
    reservationSummary(reservation) +
    `\n\nStatus: ${reservation.status.toUpperCase()}\n${alloc.reason}`;
  const waLink = managerWaLink(message);

  addNotification({
    id: uid("n_"),
    kind: "reservation",
    title: `Reservation · ${reservation.name} · party of ${reservation.guests}`,
    message: `${reservation.date} at ${reservation.time} — ${alloc.reason}`,
    waLink,
    read: false,
    createdAt: Date.now(),
  });

  await flush();

  // Attempt automatic send (no-op unless WhatsApp API env vars are configured).
  await sendWhatsApp(message);

  const reference = "CG" + reservation.id.slice(-5).toUpperCase();

  return NextResponse.json({
    ok: true,
    reference,
    waitlisted: alloc.waitlisted,
    table: reservation.tableName ?? null,
    allocation: alloc.reason,
    waLink,
    message: alloc.waitlisted
      ? `Thanks ${reservation.name}! You're on the waitlist for ${reservation.date}. We'll confirm on ${reservation.phone} shortly.`
      : `Table ${reservation.tableName} is reserved for ${reservation.name} on ${reservation.date} at ${reservation.time}.`,
  });
}
