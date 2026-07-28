import { NextResponse } from "next/server";
import { db, addFeedback, addNotification, uid, hydrate, flush } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { managerWaLink } from "@/lib/notify";
import type { Feedback } from "@/lib/types";

export async function GET() {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  await hydrate();
  const list = db().feedback;
  const avg =
    list.length > 0 ? list.reduce((s, f) => s + f.rating, 0) / list.length : 0;
  return NextResponse.json({ ok: true, feedback: list, average: Number(avg.toFixed(2)) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  await hydrate();

  // Validate BEFORE clamping — clamping first would silently turn a missing or
  // invalid rating into a 1★ review (and falsely trigger the low-score alert).
  const rating = parseInt(body.rating, 10);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { ok: false, errors: { rating: "Please give a rating between 1 and 5." } },
      { status: 422 }
    );
  }

  const clamp = (v: any) => {
    const n = parseInt(v, 10);
    return n >= 1 && n <= 5 ? n : undefined;
  };

  const fb: Feedback = {
    id: uid("f_"),
    name: String(body.name || "Guest").trim().slice(0, 60) || "Guest",
    orderCode: body.orderCode ? String(body.orderCode).slice(0, 20) : undefined,
    rating,
    food: clamp(body.food),
    service: clamp(body.service),
    ambiance: clamp(body.ambiance),
    comment: body.comment ? String(body.comment).slice(0, 500) : undefined,
    createdAt: Date.now(),
  };

  addFeedback(fb);

  // Alert the manager to low scores so they can recover the guest.
  if (rating <= 3) {
    const message =
      `⚠️ *Low rating (${rating}★) — KK Grove*\n${fb.name}${fb.orderCode ? ` · ${fb.orderCode}` : ""}\n` +
      (fb.comment ? `“${fb.comment}”` : "No comment left.");
    addNotification({
      id: uid("n_"),
      kind: "feedback",
      title: `${rating}★ feedback from ${fb.name}`,
      message: fb.comment || "Guest left a low rating — consider following up.",
      waLink: managerWaLink(message),
      read: false,
      createdAt: Date.now(),
    });
  }

  await flush();
  return NextResponse.json({ ok: true, feedback: fb });
}
