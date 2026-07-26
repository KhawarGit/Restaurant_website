import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { Arrow, Star } from "@/components/Icons";
import { img } from "@/lib/images";

const picks = [
  { name: "Mutton Ribs", desc: "Slow-cooked, smoky house rub.", price: 3400, src: img.ribs },
  { name: "Dynamite Prawns", desc: "Crispy prawns, sweet-chilli glaze.", price: 1650, src: img.seafood },
  { name: "Dijon Beef Steak", desc: "Tenderloin, peppercorn jus.", price: 3200, src: img.steak },
];

export function Featured() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            align="left"
            eyebrow="Chef's Signatures"
            title={<>The dishes people <span className="text-gold-dark">drive across town for.</span></>}
          />
          <Reveal>
            <Link href="/menu" className="btn-dark shrink-0">
              Full Menu <Arrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {picks.map((p, i) => (
            <Reveal key={p.name} delay={i * 110}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_16px_50px_-30px_rgba(11,61,46,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
                <Photo src={p.src} alt={p.name} rounded="rounded-none" className="aspect-[4/3] w-full" />
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                  <h3 className="font-serif text-xl text-forest-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-forest-900/60">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-lg text-gold-dark">Rs {p.price.toLocaleString()}</span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-forest-800/50 transition-colors group-hover:text-gold-dark">
                      Signature
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
