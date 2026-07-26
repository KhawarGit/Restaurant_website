import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { Arrow } from "@/components/Icons";
import { img } from "@/lib/images";

const cuisines = [
  { title: "Charcoal BBQ", desc: "Smoky ribs, boti & kebabs — the house signature.", src: img.grill, href: "/menu#bbq" },
  { title: "Pakistani", desc: "Karahi, biryani & rich local classics.", src: img.pasta, href: "/menu#pakistani" },
  { title: "Continental", desc: "Steaks, pastas & prime mains.", src: img.steak, href: "/menu#continental" },
  { title: "Seafood", desc: "Prawns, snapper & the daily catch.", src: img.seafood, href: "/menu#appetizers" },
];

export function Cuisines() {
  return (
    <section className="bg-forest-900 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="What we serve"
          title={<>Four cuisines, <span className="text-gold">one grove.</span></>}
          subtitle="A menu that travels the world and comes home to Karachi — crafted fresh, plated beautifully."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cuisines.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <Link href={c.href} className="group block">
                <Photo src={c.src} alt={c.title} className="aspect-[3/4] w-full" overlay />
                <div className="relative -mt-24 px-5 pb-5">
                  <h3 className="font-serif text-2xl text-cream">{c.title}</h3>
                  <p className="mt-1 text-sm text-cream/70">{c.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all group-hover:gap-3">
                    View dishes <Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
