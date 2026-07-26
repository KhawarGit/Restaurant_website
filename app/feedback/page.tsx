import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { FeedbackForm } from "@/components/FeedbackForm";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Tell us about your visit to KK Grove — your feedback shapes every plate and every evening.",
};

export default function FeedbackPage() {
  return (
    <>
      <PageBanner
        eyebrow="Customer Satisfaction"
        title="How was your visit?"
        subtitle="We read every response — the good, and the fixable. Low ratings go straight to our manager."
        image={img.ambiance}
      />
      <section className="bg-cream py-16 md:py-24">
        <div className="container-x mx-auto max-w-2xl">
          <FeedbackForm />
        </div>
      </section>
    </>
  );
}
