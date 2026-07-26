import { NextResponse } from "next/server";
import { db, addOrder, addNotification, updateTable, uid, orderCode } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { managerWaLink, sendWhatsApp } from "@/lib/notify";
import { site } from "@/lib/site";
import type { Order, OrderItem, OrderType, PaymentMethod, PaymentStatus } from "@/lib/types";

const TAX_RATE = 0.13;

export async function GET() {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, orders: db().orders });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  const type = (["dine-in", "takeaway", "delivery"].includes(body.type) ? body.type : "dine-in") as OrderType;
  const rawItems = Array.isArray(body.items) ? body.items : [];
  const items: OrderItem[] = rawItems
    .map((i: any) => ({
      name: String(i.name || "").slice(0, 80),
      price: Math.max(0, Number(i.price) || 0),
      qty: Math.max(1, Math.min(50, parseInt(i.qty, 10) || 1)),
      notes: i.notes ? String(i.notes).slice(0, 120) : undefined,
    }))
    .filter((i: OrderItem) => i.name && i.price >= 0);

  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "Your order is empty." }, { status: 422 });
  }

  const name = String(body?.customer?.name || "").trim();
  if (!name) return NextResponse.json({ ok: false, errors: { name: "Name is required." } }, { status: 422 });

  const phone = String(body?.customer?.phone || "").trim();
  const address = String(body?.customer?.address || "").trim();
  if (type === "delivery" && address.length < 6) {
    return NextResponse.json({ ok: false, errors: { address: "Delivery address is required." } }, { status: 422 });
  }
  if ((type === "delivery" || type === "takeaway") && !/^[+\d][\d\s-]{7,}$/.test(phone)) {
    return NextResponse.json({ ok: false, errors: { phone: "A valid phone is required." } }, { status: 422 });
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  const method = (["cash", "card", "online"].includes(body?.payment?.method)
    ? body.payment.method
    : "cash") as PaymentMethod;
  const payStatus: PaymentStatus = body?.payment?.status === "paid" ? "paid" : "unpaid";

  // Resolve dine-in table (optional).
  let tableId: string | undefined;
  let tableName: string | undefined;
  if (type === "dine-in" && body.tableId) {
    const t = db().tables.find((x) => x.id === body.tableId);
    if (t) {
      tableId = t.id;
      tableName = t.name;
      updateTable(t.id, { status: "occupied" });
    }
  }

  const order: Order = {
    id: uid("o_"),
    code: orderCode(),
    type,
    tableId,
    tableName,
    customer: { name, phone: phone || undefined, address: address || undefined },
    items,
    subtotal,
    tax,
    total,
    status: "new",
    payment: { method, status: payStatus },
    notes: body.notes ? String(body.notes).slice(0, 200) : undefined,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  addOrder(order);

  const message =
    `🧾 *New ${type} order — ${site.name}*\n` +
    `${order.code} · ${name}${tableName ? ` · ${tableName}` : ""}\n\n` +
    items.map((i) => `${i.qty}× ${i.name}`).join("\n") +
    `\n\nTotal: Rs ${total.toLocaleString()} (${method}${payStatus === "paid" ? ", paid" : ""})` +
    (address ? `\nDeliver to: ${address}` : "");
  const waLink = managerWaLink(message);

  addNotification({
    id: uid("n_"),
    kind: "order",
    title: `${type} order ${order.code} · Rs ${total.toLocaleString()}`,
    message: `${name} · ${items.reduce((n, i) => n + i.qty, 0)} items${tableName ? ` · ${tableName}` : ""}`,
    waLink,
    read: false,
    createdAt: Date.now(),
  });

  await sendWhatsApp(message);

  return NextResponse.json({ ok: true, order, waLink });
}
