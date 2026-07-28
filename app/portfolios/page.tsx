import type { Metadata } from "next";
import Link from "next/link";
import { portfolios } from "@/lib/portfolios";
import { Logo } from "@/components/Logo";
import { Arrow, WhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design Portfolios",
  description:
    "Explore other restaurant website designs — Modern, Minimalistic, Fancy and Bold — each a fully different look built by the same developer.",
};

export default function PortfoliosPage() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi! I saw your restaurant website designs and I'd like one for my restaurant."
  )}`;

  return (
    <div className="min-h-screen bg-cream">
      <header className="container-x flex h-20 items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm font-medium text-forest-900/70 hover:text-forest-900">
          ← Back to KK Grove
        </Link>
      </header>

      <section className="container-x pb-10 pt-8 text-center">
        <span className="eyebrow justify-center">Design Portfolio</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight text-forest-900 sm:text-5xl">
          One developer. <span className="text-gold-dark">Four completely different looks.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-forest-900/65">
          KK Grove shows one style — tropical luxury. Here are a few others, built
          to prove the same care and functionality can wear any face your brand needs.
        </p>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {portfolios.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group relative overflow-hidden rounded-3xl shadow-luxe transition-transform duration-500 hover:-translate-y-1"
              style={{ background: p.bg }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${p.bg} 5%, transparent 60%), url('${p.image}')`,
                  }}
                />
              </div>
              <div className="relative p-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: p.accent }}>
                    {p.style}
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-2xl" style={{ color: p.text }}>
                  {p.name}
                </h2>
                <p className="mt-2 text-sm" style={{ color: p.text, opacity: 0.7 }}>
                  {p.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs" style={{ color: p.text, opacity: 0.55 }}>
                  <span>Typeface · {p.font}</span>
                  <span className="inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-1" style={{ color: p.accent, opacity: 1 }}>
                    View design <Arrow className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-forest-900 p-12 text-center text-cream md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Want a site like any of these — or something new?</h2>
            <p className="mt-2 max-w-lg text-cream/70">
              Every design here ships with the same full stack: online ordering,
              smart reservations, payments, and manager/waiter/chef dashboards.
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
    </div>
  );
}
