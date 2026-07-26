import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { ReservationForm } from "@/components/ReservationForm";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, WhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact & Reservations",
  description:
    "Reach KK Grove Karachi — call, WhatsApp, or book a table online. Find our address, hours and location on Tipu Sultan Road.",
};

export default function ContactPage() {
  const waHref = `https://wa.me/${site.whatsapp}`;
  return (
    <>
      <PageBanner
        eyebrow="Get in touch"
        title="Contact & reservations"
        subtitle="Book a table, ask about events, or just say hello — we'd love to host you."
        image={img.interior}
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl text-forest-900">We're here to help.</h2>
            <p className="mt-3 text-forest-900/65">
              Call or WhatsApp us for same-day bookings and large parties, or use
              the form to request a table and we'll confirm shortly.
            </p>

            <div className="mt-8 space-y-5">
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address">
                <a href={site.address.maps} target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark">
                  {site.address.line1}, {site.address.line2}
                </a>
              </InfoRow>
              <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone">
                <a href={site.phoneHref} className="hover:text-gold-dark">{site.phone}</a>
              </InfoRow>
              <InfoRow icon={<WhatsApp className="h-5 w-5" />} label="WhatsApp">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark">
                  Message us on WhatsApp
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className="h-5 w-5" />} label="Email">
                <a href={`mailto:${site.email}`} className="hover:text-gold-dark">{site.email}</a>
              </InfoRow>
              <InfoRow icon={<Clock className="h-5 w-5" />} label="Hours">
                <ul className="space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      <span className="font-medium">{h.days}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </InfoRow>
            </div>

            <div className="mt-8 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-cream transition-colors hover:bg-gold hover:text-forest-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-cream transition-colors hover:bg-gold hover:text-forest-900">
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-forest-100 shadow-luxe">
              <iframe
                title="KK Grove map"
                src="https://www.google.com/maps?q=Tipu+Sultan+Road+Karachi&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div id="reserve" className="scroll-mt-24">
            <Reveal>
              <ReservationForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-800/5 text-gold-dark">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-forest-900/50">{label}</div>
        <div className="mt-0.5 text-forest-900/80">{children}</div>
      </div>
    </div>
  );
}
