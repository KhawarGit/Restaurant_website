import { NextResponse } from "next/server";
import { db, updateOrder, updateTable, hydrate, flush } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import type { OrderStatus, PaymentStatus } from "@/lib/types";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
  };

  await hydrate();
  const order = db().orders.find((o) => o.id === params.id);
  if (!order) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const patch: any = {};
  if (body.status) patch.status = body.status;
  if (body.paymentStatus) patch.payment = { ...order.payment, status: body.paymentStatus };

  const updated = updateOrder(order.id, patch);

  // Free the table when a dine-in order completes.
  if (body.status === "completed" && order.tableId) {
    updateTable(order.tableId, { status: "free" });
  }

  await flush();
  return NextResponse.json({ ok: true, order: updated });
}
