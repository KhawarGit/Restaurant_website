import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";
import { ChefDashboard } from "@/components/staff/ChefDashboard";

export const dynamic = "force-dynamic";

export default function ChefPage() {
  const role = currentRole();
  if (!role) redirect("/staff/login");
  return <ChefDashboard role={role} />;
}
