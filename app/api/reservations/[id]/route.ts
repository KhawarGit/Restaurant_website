import { NextResponse } from "next/server";
import { db, updateReservation, updateTable, commit } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import type { ReservationStatus } from "@/lib/types";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  const { status } = (await request.json().catch(() => ({}))) as { status?: ReservationStatus };
  const r = db().reservations.find((x) => x.id === params.id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  if (status) {
    updateReservation(r.id, { status });
    // Keep table state in sync.
    if (r.tableId) {
      if (status === "seated") updateTable(r.tableId, { status: "occupied" });
      else if (status === "cancelled") updateTable(r.tableId, { status: "free" });
      else if (status === "confirmed") updateTable(r.tableId, { status: "reserved" });
    }
  }
  commit();
  return NextResponse.json({ ok: true, reservation: r });
}
