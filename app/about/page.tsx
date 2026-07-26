import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PalmLeaf, Arrow } from "@/components/Icons";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "The KK Grove story — a tropical-luxury dining escape in Karachi blending modern elegance, palm-shaded gardens and master-crafted cuisine.",
};

const values = [
  { title: "Craft over shortcuts", desc: "Charcoal grilling, slow-cooked gravies and fresh prep — every single day." },
  { title: "Hospitality first", desc: "Warm, attentive service that turns a meal into a memory." },
  { title: "An escape from routine", desc: "Palm shade, soft music and golden light — a mini-vacation in the city." },
  { title: "Local at heart", desc: "Karachi flavours celebrated alongside the best of the world." },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title="Where luxury meets great views"
        subtitle="KK Grove is a tropical-luxury dining destination in the heart of Karachi."
        image={img.ambiance}
      />

      <section className="bg-cream py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Photo src={img.swing} alt="The signature garden swing" className="aspect-[4/5] w-full shadow-luxe" overlay />
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="The Grove"
              title={<>An oasis of modern <span className="text-gold-dark">& tropical elegance.</span></>}
              subtitle="We built KK Grove as an escape — a place where the palms sway, the grill glows, and time slows down. Skilled local chefs bring a menu that spans charcoal BBQ, Pakistani classics and Continental favourites, all plated with intention."
            />
            <p className="mt-5 text-forest-900/65">
              Whether it's a family dinner, a date night or a celebration with
              friends, our open-air garden — complete with its now-famous swing —
              sets the scene for something special.
            </p>
            <Link href="/menu" className="btn-dark mt-8">
              Explore the Menu <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading light eyebrow="What we stand for" title={<>Our <span className="text-gold">values.</span></>} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-cream/10 bg-forest-800/40 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-forest-900 text-gold">
                    <PalmLeaf className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-cream">{v.title}</h3>
                  <p className="mt-2 text-sm text-cream/65">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-x flex flex-col items-center gap-6 rounded-3xl bg-gold-sheen p-12 text-center shadow-gold">
          <h2 className="max-w-2xl font-serif text-3xl text-forest-900 sm:text-4xl">
            Come for the food, stay for the evening.
          </h2>
          <Link href="/#reserve" className="btn-dark">
            Reserve a Table <Arrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
