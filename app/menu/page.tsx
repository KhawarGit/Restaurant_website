import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { MenuExplorer } from "@/components/MenuExplorer";
import { deals } from "@/lib/menu";
import { img } from "@/lib/images";
import { Arrow } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the KK Grove menu — charcoal BBQ, Pakistani classics, Continental mains, fresh seafood, desserts and signature coolers.",
};

export default function MenuPage() {
  return (
    <>
      <PageBanner
        eyebrow="The Menu"
        title="A world on every plate"
        subtitle="From smoky charcoal BBQ to Continental fine dining — all prices in PKR, all crafted fresh to order."
        image={img.heroFood}
      />

      <div className="bg-cream">
        <MenuExplorer />

        {/* Offers strip */}
        <div className="border-t border-forest-100 bg-white">
          <div className="container-x py-14">
            <h2 className="text-center font-serif text-2xl text-forest-900">Current Offers</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {deals.map((d) => (
                <div key={d.title} className="rounded-2xl border border-forest-100 bg-cream/50 p-6">
                  <span className="text-sm font-bold text-gold-dark">{d.price}</span>
                  <h3 className="mt-2 font-serif text-lg text-forest-900">{d.title}</h3>
                  <p className="mt-1 text-sm text-forest-900/60">{d.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/#reserve" className="btn-gold">
                Reserve a Table <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
