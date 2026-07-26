import { NextResponse } from "next/server";
import { COOKIE, roleFromPin } from "@/lib/auth";

export async function POST(request: Request) {
  const { pin } = await request.json().catch(() => ({ pin: "" }));
  const role = roleFromPin(String(pin ?? "").trim());
  if (!role) {
    return NextResponse.json({ ok: false, error: "Invalid PIN." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
