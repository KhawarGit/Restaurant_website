import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function StaffIndex() {
  const role = currentRole();
  if (!role) redirect("/staff/login");
  redirect(`/staff/${role}`);
}
