import { cookies } from "next/headers";
import type { Role } from "./types";

export const COOKIE = "kk_staff";

// Demo PINs — in production replace with real auth (hashed users / OAuth).
export const PINS: Record<Role, string> = {
  manager: "1111",
  waiter: "2222",
  chef: "3333",
};

export const roleFromPin = (pin: string): Role | null => {
  const entry = (Object.entries(PINS) as [Role, string][]).find(
    ([, p]) => p === pin
  );
  return entry ? entry[0] : null;
};

export const roleLabels: Record<Role, string> = {
  manager: "Manager",
  waiter: "Waiter",
  chef: "Chef",
};

/** Reads the signed-in role from the cookie (server components / routes). */
export function currentRole(): Role | null {
  const val = cookies().get(COOKIE)?.value as Role | undefined;
  if (val && (["manager", "waiter", "chef"] as Role[]).includes(val)) return val;
  return null;
}
