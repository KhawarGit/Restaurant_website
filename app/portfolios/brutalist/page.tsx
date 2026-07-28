import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Brutalist — Portfolio Design" };

const menu = [
  { idx: "001", name: "RAW BEEF TARTARE", price: "24.00" },
  { idx: "002", name: "CHARRED CABBAGE", price: "14.00" },
  { idx: "003", name: "BONE MARROW / TOAST", price: "18.00" },
  { idx: "004", name: "WHOLE ROAST FISH", price: "32.00" },
  { idx: "005", name: "GRILLED SOURDOUGH", price: "6.00" },
];

export default function BrutalistPortfolio() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] font-plexmono text-[#0A0A0A]">
      <BackPill tone="light" />
      <ContactPill tone="light" />

      {/* Top data bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-[#0A0A0A] px-4 py-2 text-[10px] uppercase tracking-wider">
        <span>REV. 003 / KITCHEN</span>
        <span>41.89°N 2.16°E</span>
        <span>EST. 2024</span>
      </div>

      {/* Hero — raw grid, huge type */}
      <section className="border-b-4 border-[#0A0A0A] px-4 py-16 sm:px-8">
        <h1 className="text-[16vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-[9vw]">
          CONCRETE
          <br />
          <span className="text-[#FF3B00]">KITCHEN</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t-2 border-[#0A0A0A] pt-6">
          <p className="max-w-sm text-sm leading-relaxed">
            NO TABLECLOTHS. NO SPECIALS BOARD. FIVE DISHES, COOKED OVER FIRE,
            SERVED ON WHATEVER PLATE WAS CLEAN FIRST.
          </p>
          <span className="ml-auto border-2 border-[#0A0A0A] bg-[#FF3B00] px-4 py-2 text-xs font-bold uppercase text-white">
            [ RESERVE → ]
          </span>
        </div>
      </section>

      {/* Image block — no rounding, hard border */}
      <section className="grid border-b-4 border-[#0A0A0A] sm:grid-cols-[1fr_1px_1fr]">
        <div
          className="aspect-[4/3] w-full bg-cover bg-center grayscale sm:aspect-auto sm:min-h-[320px]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80')" }}
        />
        <div className="hidden bg-[#0A0A0A] sm:block" />
        <div className="flex flex-col justify-center gap-4 p-8">
          <p className="text-xs uppercase tracking-widest text-[#FF3B00]">01 / MANIFESTO</p>
          <p className="text-lg leading-snug">
            WE REMOVED EVERYTHING THAT WASN'T THE FOOD. WHAT'S LEFT IS
            CONCRETE, FIRE, AND FIVE THINGS WORTH EATING.
          </p>
        </div>
      </section>

      {/* Menu — raw table, monospace, no decoration */}
      <section className="px-4 py-16 sm:px-8">
        <p className="mb-8 text-xs uppercase tracking-widest text-[#FF3B00]">02 / MENU.TXT</p>
        <div className="border-2 border-[#0A0A0A]">
          {menu.map((m, i) => (
            <div
              key={m.idx}
              className={`flex items-center justify-between px-4 py-4 text-sm uppercase sm:px-6 ${
                i !== menu.length - 1 ? "border-b-2 border-[#0A0A0A]" : ""
              }`}
            >
              <span className="w-12 shrink-0 text-[#0A0A0A]/40">{m.idx}</span>
              <span className="flex-1 font-bold">{m.name}</span>
              <span>{m.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer — raw block */}
      <footer className="border-t-4 border-[#0A0A0A] bg-[#0A0A0A] px-4 py-10 text-[#F2F2F2] sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest">
          <span>CONCRETE KITCHEN © 2026</span>
          <span>OPEN WED–SUN / 18:00–23:00</span>
          <span>[ NO WALK-INS ]</span>
        </div>
      </footer>
    </div>
  );
}
