import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Speakeasy — Portfolio Design" };

const cocktails = [
  { name: "The Sidecar", notes: "Cognac, orange liqueur, lemon, sugared rim", price: "18" },
  { name: "Last Word", notes: "Gin, green chartreuse, maraschino, lime", price: "17" },
  { name: "Vieux Carré", notes: "Rye, cognac, sweet vermouth, bénédictine", price: "19" },
  { name: "Corpse Reviver No. 2", notes: "Gin, cointreau, lillet, absinthe rinse", price: "18" },
  { name: "Sazerac", notes: "Rye, absinthe rinse, peychaud's bitters", price: "20" },
];

export default function SpeakeasyPortfolio() {
  return (
    <div
      className="min-h-screen bg-[#12100D] font-courier text-[#EDE6D6]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top, rgba(176,141,87,0.08), transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 2px)",
      }}
    >
      <BackPill tone="dark" />
      <ContactPill tone="dark" />

      {/* Header — letterhead */}
      <header className="mx-auto max-w-xl px-6 pt-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">Password Required</p>
        <h1 className="mt-6 font-cormorant text-6xl italic text-[#EDE6D6]">Blind Tiger</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#EDE6D6]/60">
          No sign. No photographs. Knock twice, ask for "the usual,"
          <br /> and we'll see if there's a table.
        </p>
        <div className="mx-auto mt-8 w-16 border-t border-[#B08D57]/40" />
      </header>

      {/* Editorial letter */}
      <section className="mx-auto max-w-md px-6 py-16">
        <p className="text-[13px] leading-8 text-[#EDE6D6]/75">
          Est. 1925, reopened without ceremony. Blind Tiger keeps no
          photographs of its rooms and takes no reservations by phone — only
          by hand-delivered note, or word passed along by someone who's
          already been. What we pour is old, careful, and made to order.
          What we won't do is tell you where the door is.
        </p>
      </section>

      <div className="mx-auto h-px w-24 bg-[#B08D57]/30" />

      {/* Cocktail list — pure typography, ingredient-forward */}
      <section className="mx-auto max-w-xl px-6 py-16">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.4em] text-[#B08D57]">
          The List — Vol. II
        </p>
        <div className="space-y-8">
          {cocktails.map((c) => (
            <div key={c.name}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-cormorant text-2xl italic text-[#EDE6D6]">{c.name}</h3>
                <span className="text-sm text-[#B08D57]">{c.price}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#EDE6D6]/45">{c.notes}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px w-24 bg-[#B08D57]/30" />

      {/* Footer — typewritten notice */}
      <footer className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-xs leading-relaxed text-[#EDE6D6]/50">
          NO STANDING AT THE BAR AFTER MIDNIGHT.
          <br />
          NO PHOTOGRAPHS. NO EXCEPTIONS.
          <br />
          — MGMT.
        </p>
      </footer>
    </div>
  );
}
