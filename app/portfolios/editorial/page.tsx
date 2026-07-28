import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Editorial — Portfolio Design" };

const features = [
  { tag: "The Pantry", title: "A Larder Built on Restraint", excerpt: "Three shelves, one season, and the discipline to use every part of it." },
  { tag: "The Table", title: "Twelve Seats, No Menu", excerpt: "What arrives depends entirely on what the morning market gave us." },
  { tag: "The Cellar", title: "Natural Wine, Chosen by Ear", excerpt: "We taste everything twice before it earns a place on the list." },
];

export default function EditorialPortfolio() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] font-lora text-[#1C1A16]">
      <BackPill tone="light" />
      <ContactPill tone="light" />

      {/* Masthead */}
      <header className="border-b-2 border-[#1C1A16] px-6 pb-6 pt-16">
        <div className="mx-auto flex max-w-5xl items-end justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-[#1C1A16]/50">Issue No. 14 — Autumn</span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#1C1A16]/50">A Field Guide to Dinner</span>
        </div>
        <h1 className="mx-auto mt-4 max-w-5xl text-center text-6xl italic tracking-tight sm:text-7xl">
          The Larder
        </h1>
      </header>

      {/* Feature hero — magazine spread */}
      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div
          className="aspect-[4/5] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1000&q=80')" }}
        />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#B5482A]">Cover Story</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Cooking, <em>slowly, </em>
            <br />on purpose.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#1C1A16]/70">
            "We don't print a new menu each week so much as we let the
            walk-in dictate the evening. It's a small restaurant with a
            large opinion about vegetables."
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest text-[#1C1A16]/45">
            — As told to our editors, this September
          </p>
        </div>
      </section>

      {/* Pull quote band */}
      <section className="border-y-2 border-[#1C1A16] bg-[#1C1A16] py-14 text-[#F4F1EA]">
        <p className="mx-auto max-w-2xl px-6 text-center text-3xl italic leading-snug sm:text-4xl">
          "The best seat in the house is whichever one is closest to the pass."
        </p>
      </section>

      {/* Three-column features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="border-t-2 border-[#1C1A16] pt-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#B5482A]">{f.tag}</p>
              <h3 className="mt-3 text-2xl leading-snug">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1C1A16]/65">{f.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer — colophon */}
      <footer className="border-t-2 border-[#1C1A16] px-6 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#1C1A16]/50">
          The Larder · 22 Harvest Row · Tue–Sat, 6–11pm
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#1C1A16]/35">
          Reservations by request only
        </p>
      </footer>
    </div>
  );
}
