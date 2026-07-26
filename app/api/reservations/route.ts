import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";

export async function GET() {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, reservations: db().reservations });
}
