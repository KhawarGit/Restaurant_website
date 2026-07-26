import { NextResponse } from "next/server";
import { updateTable } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import type { TableStatus } from "@/lib/types";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!currentRole()) return NextResponse.json({ ok: false }, { status: 401 });
  const { status } = (await request.json().catch(() => ({}))) as { status?: TableStatus };
  const t = updateTable(params.id, status ? { status } : {});
  if (!t) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, table: t });
}
