import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";
import { ManagerDashboard } from "@/components/staff/ManagerDashboard";

export const dynamic = "force-dynamic";

export default function ManagerPage() {
  const role = currentRole();
  if (!role) redirect("/staff/login");
  if (role !== "manager") redirect(`/staff/${role}`);
  return <ManagerDashboard role={role} />;
}
