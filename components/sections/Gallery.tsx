import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { img } from "@/lib/images";

const shots = [
  { src: img.gallery1, span: "sm:col-span-2 sm:row-span-2", label: "The spread" },
  { src: img.cooler, span: "", label: "Coconut cooler" },
  { src: img.dessert, span: "", label: "Sweet finishes" },
  { src: img.grill, span: "", label: "On the grill" },
  { src: img.swing, span: "sm:col-span-2", label: "Garden swing" },
  { src: img.plating, span: "", label: "Plated to perfection" },
];

export function Gallery() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="A look inside"
          title={<>Moments from <span className="text-gold-dark">the grove.</span></>}
          subtitle="Golden light, palm shade, and food worth photographing."
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4">
          {shots.map((s, i) => (
            <Reveal key={i} delay={i * 70} className={`h-full ${s.span}`}>
              <div className="group relative h-full">
                <Photo src={s.src} alt={s.label} className="h-full w-full" overlay />
                <span className="absolute bottom-3 left-4 text-sm font-medium text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
