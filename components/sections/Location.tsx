import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { MapPin, Arrow } from "@/components/Icons";
import { site } from "@/lib/site";

export function Location() {
  const mapEmbed =
    "https://www.google.com/maps?q=Tipu+Sultan+Road+Karachi&output=embed";
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Find us"
          title={<>In the heart of <span className="text-gold-dark">Karachi.</span></>}
          subtitle="Tipu Sultan Road, moments from the city's best-loved neighbourhoods."
        />

        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-forest-100 shadow-luxe">
          <div className="grid lg:grid-cols-5">
            <div className="flex flex-col justify-center gap-6 bg-forest-900 p-8 text-cream lg:col-span-2 lg:p-10">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest-800 text-gold">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-serif text-xl text-cream">KK Grove</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/70">
                    {site.address.line1}<br />{site.address.line2}
                  </p>
                </div>
              </div>
              <a href={site.address.maps} target="_blank" rel="noopener noreferrer" className="btn-gold w-fit">
                Get Directions <Arrow className="h-4 w-4" />
              </a>
            </div>
            <div className="min-h-[320px] lg:col-span-3">
              <iframe
                title="KK Grove location map"
                src={mapEmbed}
                className="h-full min-h-[320px] w-full border-0 grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
