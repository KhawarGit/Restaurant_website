import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Fancy — Portfolio Design" };

const courses = [
  { name: "Beluga Caviar Service", desc: "Crème fraîche, blini, chive", price: "68" },
  { name: "Foie Gras Torchon", desc: "Sauternes gelée, brioche", price: "42" },
  { name: "Dover Sole Meunière", desc: "Brown butter, capers, lemon", price: "58" },
  { name: "Chateaubriand for Two", desc: "Béarnaise, pommes soufflé", price: "96" },
  { name: "Soufflé Grand Marnier", desc: "Prepared table-side", price: "24" },
];

export default function FancyPortfolio() {
  return (
    <div className="min-h-screen bg-[#1A120B] font-cormorant text-[#F3E9D2]">
      <BackPill tone="dark" />
      <ContactPill tone="dark" />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,7,4,0.75), rgba(10,7,4,0.88)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#D4AF37]">Est. 1998 · By Appointment</p>
          <h1 className="mt-6 text-5xl italic leading-tight sm:text-7xl">La Château</h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-4 text-[#D4AF37]">
            <span className="h-px w-12 bg-[#D4AF37]/60" />
            <span className="text-lg">❦</span>
            <span className="h-px w-12 bg-[#D4AF37]/60" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-lg italic text-[#F3E9D2]/75">
            An intimate dining room where classical French technique meets
            quiet, candlelit ceremony.
          </p>
          <div className="mt-10 inline-block border border-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Reserve Your Evening
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">Our Philosophy</p>
          <h2 className="mt-4 text-4xl italic">Cooked slowly. Served quietly.</h2>
          <p className="mt-5 text-[#F3E9D2]/70">
            Every dish at La Château is composed table-side or plated by hand
            in full view of the pass — a small theatre of restraint, built for
            evenings that deserve to be remembered.
          </p>
        </div>
        <div
          className="aspect-[4/5] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80')" }}
        />
      </section>

      {/* Tasting menu */}
      <section className="border-y border-[#D4AF37]/20 bg-black/20">
        <div className="mx-auto max-w-2xl px-6 py-24 sm:px-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">
            The Tasting Menu
          </p>
          <div className="mt-10 space-y-8">
            {courses.map((c) => (
              <div key={c.name} className="text-center">
                <h3 className="text-2xl italic">{c.name}</h3>
                <p className="mt-1 text-sm text-[#F3E9D2]/55">{c.desc}</p>
                <p className="mt-2 text-[#D4AF37]">${c.price}</p>
                <div className="mx-auto mt-6 h-px w-16 bg-[#D4AF37]/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 text-center">
        <div className="mx-auto flex items-center justify-center gap-4 text-[#D4AF37]">
          <span className="h-px w-12 bg-[#D4AF37]/60" />
          <span className="text-lg">❦</span>
          <span className="h-px w-12 bg-[#D4AF37]/60" />
        </div>
        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-[#F3E9D2]/50">
          8 Rue de Laurent · Jacket Required · Reservations Only
        </p>
      </footer>
    </div>
  );
}
