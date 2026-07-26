import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Star } from "@/components/Icons";
import { site } from "@/lib/site";

const reviews = [
  {
    quote:
      "The ambiance is unreal — palm trees, soft lights and that giant swing. The BBQ platter was smoky perfection. Easily our favourite spot for celebrations.",
    name: "Ayesha K.",
    role: "Google review",
  },
  {
    quote:
      "Dynamite prawns and the Dijon steak were outstanding. Service was attentive and the coconut cooler is a must-order. Felt like a mini-vacation.",
    name: "Bilal R.",
    role: "Regular guest",
  },
  {
    quote:
      "Booked for our anniversary and they made it special. Beautiful open-air seating, great music and genuinely delicious food. Worth every rupee.",
    name: "Hina & Faraz",
    role: "Anniversary dinner",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-24 md:py-32">
      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Loved by Karachi"
          title={<>Rated {site.rating.score} by <span className="text-gold">{site.rating.count} guests.</span></>}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 110}>
              <figure className="flex h-full flex-col rounded-2xl border border-cream/10 bg-forest-800/40 p-7 backdrop-blur">
                <div className="mb-4 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-cream/80">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-cream/10 pt-4">
                  <div className="font-serif text-lg text-cream">{r.name}</div>
                  <div className="text-xs uppercase tracking-widest text-gold/80">{r.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
