import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { img } from "@/lib/images";
import { PalmLeaf } from "@/components/Icons";

const highlights = [
  { title: "Palm-fringed setting", desc: "Open-air garden seating and a signature swing beneath the canopy." },
  { title: "Master local chefs", desc: "Charcoal BBQ and slow-cooked classics done with real craft." },
  { title: "Made for occasions", desc: "From date nights to family celebrations under the stars." },
];

export function About() {
  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Image cluster */}
        <Reveal className="relative">
          <Photo src={img.ambiance} alt="KK Grove garden dining" className="aspect-[4/5] w-full shadow-luxe" overlay />
          <div className="absolute -bottom-8 -right-4 hidden w-52 sm:block">
            <Photo src={img.plating} alt="Signature plating" className="aspect-square w-full border-4 border-cream shadow-luxe" />
          </div>
          <div className="absolute -left-5 top-8 hidden rotate-[-4deg] rounded-2xl bg-forest-900 px-6 py-4 text-cream shadow-luxe md:block">
            <div className="font-serif text-3xl text-gold">Est.</div>
            <div className="text-xs uppercase tracking-widest text-cream/70">A Karachi favourite</div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title={<>Where luxury meets <span className="text-gold-dark">great views & food.</span></>}
            subtitle="KK Grove blends modern elegance with tropical warmth to give you an escape from the everyday — a little slice of vacation in the middle of the city. Every plate celebrates local flavour and international craft."
          />

          <div className="mt-8 space-y-5">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 100} className="flex gap-4">
                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-800/5 text-gold-dark">
                  <PalmLeaf className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg text-forest-900">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-forest-900/65">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
