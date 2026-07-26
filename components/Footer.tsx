import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "./Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-cream/80">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="[&_span]:!text-cream">
            <Logo light />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/feedback" className="link-underline transition-colors hover:text-gold">
                Feedback
              </Link>
            </li>
            <li>
              <Link href="/staff" className="link-underline text-cream/50 transition-colors hover:text-gold">
                Staff Console
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream">Visit Us</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>{site.address.line1}, {site.address.line2}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={site.phoneHref} className="hover:text-gold">{site.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-cream">Opening Hours</h4>
          <ul className="mt-5 space-y-4 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>
                  <span className="block text-cream">{h.days}</span>
                  <span className="text-cream/60">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Crafted with care · A tropical-luxury dining experience.</p>
        </div>
      </div>
    </footer>
  );
}
