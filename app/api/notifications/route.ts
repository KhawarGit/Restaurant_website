import { NextResponse } from "next/server";
import { db, hydrate, flush } from "@/lib/db";
import { currentRole } from "@/lib/auth";

export async function GET() {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  await hydrate();
  const list = db().notifications;
  return NextResponse.json({
    ok: true,
    notifications: list,
    unread: list.filter((n) => !n.read).length,
  });
}

export async function PATCH(request: Request) {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  await hydrate();
  if (id) {
    const n = db().notifications.find((x) => x.id === id);
    if (n) n.read = true;
  } else {
    db().notifications.forEach((n) => (n.read = true));
  }
  await flush();
  return NextResponse.json({ ok: true });
}
