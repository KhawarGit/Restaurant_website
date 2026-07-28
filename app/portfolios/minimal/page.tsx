import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Minimalistic — Portfolio Design" };

const menu = [
  { name: "Consommé", price: "9" },
  { name: "Heirloom Tomato, Burrata", price: "14" },
  { name: "Roasted Halibut", price: "27" },
  { name: "Aged Ribeye, 10oz", price: "38" },
  { name: "Wild Mushroom Risotto", price: "22" },
  { name: "Lemon Tart", price: "10" },
];

export default function MinimalPortfolio() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <BackPill tone="light" />
      <ContactPill tone="light" />

      {/* Header */}
      <header className="flex justify-center pt-16">
        <span className="text-sm font-semibold uppercase tracking-[0.5em]">NOIR.</span>
      </header>

      {/* Hero — pure typography, no image */}
      <section className="mx-auto max-w-xl px-6 py-28 text-center">
        <h1 className="text-4xl font-light leading-snug sm:text-5xl">
          A quiet room. <br /> An honest plate.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-black/50">
          Seasonal, unfussy cooking served in a space designed to disappear —
          so all that's left is the food, and the company.
        </p>
        <div className="mt-10 inline-block border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.3em]">
          Reserve a table
        </div>
      </section>

      <div className="mx-auto h-px w-24 bg-black/15" />

      {/* Menu — plain typographic list */}
      <section className="mx-auto max-w-md px-6 py-24">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.4em] text-black/40">
          Evening Menu
        </p>
        <ul>
          {menu.map((m) => (
            <li key={m.name} className="flex items-baseline gap-3 border-b border-black/10 py-4">
              <span className="text-sm">{m.name}</span>
              <span className="flex-1 border-b border-dotted border-black/20 translate-y-[-4px]" />
              <span className="text-sm tabular-nums text-black/60">{m.price}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto h-px w-24 bg-black/15" />

      {/* Single restrained image */}
      <section className="mx-auto max-w-2xl px-6 py-24">
        <div
          className="aspect-[16/9] w-full bg-cover bg-center grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80')" }}
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-14 text-center text-xs uppercase tracking-[0.3em] text-black/40">
        14 Ash Lane · Tue–Sat, 6pm–11pm · Reservations only
      </footer>
    </div>
  );
}
