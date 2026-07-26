import { NextResponse } from "next/server";
import { db, hydrate } from "@/lib/db";
import { currentRole } from "@/lib/auth";

export async function GET() {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  await hydrate();
  return NextResponse.json({ ok: true, tables: db().tables });
}
