"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { BuildCTA } from "./BuildCTA";

/** Renders the public marketing chrome everywhere except the staff console. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStaff = pathname?.startsWith("/staff");

  if (isStaff) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <BuildCTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
