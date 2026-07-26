import { NextResponse } from "next/server";
import { db, updateOrder } from "@/lib/db";
import type { PaymentMethod } from "@/lib/types";

/**
 * Mock payment endpoint. In production, swap this for a real gateway
 * (Stripe, Safepay, etc.) — create an intent, confirm, then mark paid.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { orderId, method } = body as { orderId?: string; method?: PaymentMethod };

  const order = db().orders.find((o) => o.id === orderId);
  if (!order) return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });

  const pm = (["cash", "card", "online"].includes(String(method)) ? method : "online") as PaymentMethod;

  // Simulate gateway latency & success.
  await new Promise((r) => setTimeout(r, 700));

  const updated = updateOrder(order.id, {
    payment: { method: pm, status: "paid" },
  });

  return NextResponse.json({
    ok: true,
    transactionId: "TXN" + Math.random().toString(36).slice(2, 9).toUpperCase(),
    order: updated,
  });
}
