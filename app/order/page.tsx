import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { OrderExperience } from "@/components/order/OrderExperience";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Order Online",
  description:
    "Order KK Grove online — dine-in, takeaway or delivery. Charcoal BBQ, Pakistani & Continental favourites, paid online or on collection.",
};

export default function OrderPage() {
  return (
    <>
      <PageBanner
        eyebrow="Order Online"
        title="Dine-in, takeaway or delivery"
        subtitle="Build your order, pay online or on arrival — and we'll send it straight to the kitchen."
        image={img.grill}
      />
      <section className="bg-cream py-16 md:py-20">
        <div className="container-x">
          <OrderExperience />
        </div>
      </section>
    </>
  );
}
