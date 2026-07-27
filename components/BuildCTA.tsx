import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow, WhatsApp } from "./Icons";

/**
 * Developer marketing band (meta, not part of the fictional restaurant).
 * Shown site-wide above the footer on public pages.
 */
export function BuildCTA() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like a restaurant website like KK Grove."
  )}`;
  return (
    <section className="relative overflow-hidden bg-forest-950">
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-2xl">
          <span className="eyebrow text-gold">Like what you see?</span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-4xl">
            Want a restaurant website like this one?
          </h2>
          <p className="mt-3 text-cream/70">
            I design and build fast, beautiful, fully-functional restaurant sites —
            online ordering, reservations, dashboards and more. Let's build yours.
          </p>
          <p className="mt-2 text-sm text-gold/80">
            Tip: try the theme switcher up top — every design here is one click away.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-gold">
            Contact Us <Arrow className="h-4 w-4" />
          </Link>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <WhatsApp className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
