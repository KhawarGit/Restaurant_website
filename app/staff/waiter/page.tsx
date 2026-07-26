import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";
import { WaiterDashboard } from "@/components/staff/WaiterDashboard";

export const dynamic = "force-dynamic";

export default function WaiterPage() {
  const role = currentRole();
  if (!role) redirect("/staff/login");
  return <WaiterDashboard role={role} />;
}
