import { Reveal } from "@/components/Reveal";
import { ReservationForm } from "@/components/ReservationForm";
import { PalmLeaf, Clock, Phone } from "@/components/Icons";
import { site } from "@/lib/site";

export function Reserve() {
  return (
    <section
      id="reserve"
      className="relative scroll-mt-24 overflow-hidden bg-cover bg-center py-24 md:py-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4,26,20,0.92), rgba(4,26,20,0.94)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-cream">
          <span className="eyebrow text-gold">
            <PalmLeaf className="h-4 w-4" /> Reservations
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
            Reserve your table<br /> <span className="text-gold">under the palms.</span>
          </h2>
          <p className="mt-5 max-w-md text-cream/70">
            Book in seconds and we'll confirm on WhatsApp. For same-day parties of
            eight or more, give us a call and we'll take care of the rest.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-gold">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-cream/50">Call to book</div>
                <a href={site.phoneHref} className="font-serif text-lg text-cream hover:text-gold">{site.phone}</a>
              </div>
            </div>
            {site.hours.map((h) => (
              <div key={h.days} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-gold">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-cream/50">{h.days}</div>
                  <div className="font-serif text-lg text-cream">{h.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Reveal>
          <ReservationForm />
        </Reveal>
      </div>
    </section>
  );
}
