import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Modern — Portfolio Design" };

const dishes = [
  { n: "01", name: "Charred Octopus", desc: "Smoked paprika, chickpea purée", price: "24" },
  { n: "02", name: "Wagyu Tartare", desc: "Egg yolk, capers, sourdough crisp", price: "28" },
  { n: "03", name: "Miso Black Cod", desc: "Bok choy, ginger dashi", price: "32" },
  { n: "04", name: "Duck Breast", desc: "Cherry gastrique, charred leek", price: "34" },
  { n: "05", name: "Truffle Tagliatelle", desc: "Parmesan, brown butter", price: "26" },
  { n: "06", name: "Basque Cheesecake", desc: "Burnt honey, sea salt", price: "12" },
];

export default function ModernPortfolio() {
  return (
    <div className="min-h-screen bg-[#0B0F10] font-jost text-zinc-100">
      <BackPill tone="dark" />
      <ContactPill tone="dark" />

      {/* Header */}
      <header className="container mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 sm:px-10">
        <span className="font-space text-xl font-bold tracking-tight">
          URBAN<span className="text-[#2DD4BF]">FORK</span>
        </span>
        <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 md:flex">
          <span>Menu</span>
          <span>Studio</span>
          <span>Reserve</span>
        </nav>
      </header>

      {/* Hero — split, oversized type overlapping image */}
      <section className="container mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-24">
        <div>
          <span className="font-space text-xs font-bold uppercase tracking-[0.35em] text-[#2DD4BF]">
            Est. 2024 — Downtown
          </span>
          <h1 className="font-space mt-6 text-[15vw] font-bold leading-[0.85] tracking-tight sm:text-[9vw] lg:text-[6.2vw]">
            EAT
            <br />
            BOLD.
          </h1>
          <p className="mt-8 max-w-sm text-zinc-400">
            A modern kitchen for people who want their dinner to move as fast as
            their week — sharp flavors, sharper design, zero pretense.
          </p>
          <div className="mt-8 flex gap-3">
            <span className="font-space rounded-none bg-[#2DD4BF] px-7 py-3 text-sm font-bold text-black">
              Reserve a Table
            </span>
            <span className="font-space rounded-none border border-zinc-700 px-7 py-3 text-sm font-bold text-zinc-200">
              View Menu
            </span>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F10] via-transparent to-transparent" />
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-zinc-800">
        <div className="container mx-auto grid max-w-6xl grid-cols-3 divide-x divide-zinc-800 px-6 sm:px-10">
          {[["120+", "Covers nightly"], ["4.9", "Average rating"], ["06", "Signature plates"]].map(([n, l]) => (
            <div key={l} className="px-4 py-8 text-center sm:py-10">
              <div className="font-space text-3xl font-bold text-[#2DD4BF] sm:text-4xl">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu — asymmetric numbered list */}
      <section className="container mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-space text-3xl font-bold sm:text-4xl">Tonight's Menu</h2>
          <span className="hidden text-xs uppercase tracking-widest text-zinc-500 sm:block">Updated daily</span>
        </div>
        <div className="grid gap-px overflow-hidden bg-zinc-800 sm:grid-cols-2">
          {dishes.map((d) => (
            <div key={d.n} className="group flex items-center gap-5 bg-[#0B0F10] p-6 transition-colors hover:bg-zinc-900">
              <span className="font-space text-sm text-zinc-600 transition-colors group-hover:text-[#2DD4BF]">{d.n}</span>
              <div className="flex-1">
                <h3 className="font-space text-lg font-semibold">{d.name}</h3>
                <p className="text-sm text-zinc-500">{d.desc}</p>
              </div>
              <span className="font-space text-lg font-bold text-[#2DD4BF]">${d.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-zinc-800">
        <div className="container mx-auto max-w-6xl px-6 py-14 text-center sm:px-10">
          <h3 className="font-space text-2xl font-bold sm:text-3xl">Table's waiting. You in?</h3>
          <p className="mt-2 text-zinc-500">Downtown Metro · Open Tue–Sun, 5pm till late</p>
        </div>
      </footer>
    </div>
  );
}
