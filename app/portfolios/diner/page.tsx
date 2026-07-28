import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Retro Diner — Portfolio Design" };

const menu = [
  { emoji: "🍔", name: "The Starlite Stack", desc: "Double patty, American cheese, secret sauce", price: "8.95" },
  { emoji: "🥤", name: "Classic Malt Shake", desc: "Vanilla, chocolate or strawberry", price: "5.50" },
  { emoji: "🍟", name: "Chili Cheese Fries", desc: "Hand-cut, house chili, cheddar", price: "6.25" },
  { emoji: "🥞", name: "Stack o' Flapjacks", desc: "Served all day, real maple syrup", price: "7.00" },
  { emoji: "🌭", name: "Chicago Dog", desc: "All the fixings, poppyseed bun", price: "6.75" },
  { emoji: "🍒", name: "Cherry Pie à la Mode", desc: "Warm, vanilla ice cream", price: "5.95" },
];

export default function DinerPortfolio() {
  return (
    <div className="min-h-screen bg-[#E8433B] font-poppins text-[#2A1712]">
      <BackPill tone="light" />
      <ContactPill tone="light" />

      {/* Checkerboard header strip */}
      <div
        className="h-4 w-full"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#FFF7E8 0% 25%, #2A1712 0% 50%)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Header */}
      <header className="flex flex-col items-center gap-2 px-6 pt-10 text-center">
        <span className="rotate-[-2deg] rounded-full border-4 border-[#FFF7E8] bg-[#2FC4C0] px-5 py-1.5 font-alfa text-xs text-[#FFF7E8] shadow-[3px_3px_0_#2A1712]">
          OPEN 24 HRS
        </span>
        <h1 className="font-alfa mt-4 text-5xl text-[#FFF7E8] drop-shadow-[3px_3px_0_#2A1712] sm:text-6xl">
          STARLITE
        </h1>
        <p className="font-alfa text-lg text-[#FFF7E8] drop-shadow-[2px_2px_0_#2A1712]">DINER</p>
      </header>

      {/* Hero photo — chrome frame */}
      <section className="mx-auto mt-8 max-w-2xl px-6">
        <div className="rounded-2xl border-[6px] border-[#FFF7E8] shadow-[6px_6px_0_#2A1712]">
          <div
            className="aspect-[16/9] w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80')" }}
          />
        </div>
      </section>

      {/* Badges row */}
      <section className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-4 px-6">
        {["EST. 1958", "BOTTOMLESS COFFEE", "CURBSIDE SERVICE"].map((b, i) => (
          <span
            key={b}
            className={`rounded-full border-4 border-[#2A1712] bg-[#FFF7E8] px-4 py-2 font-alfa text-[11px] shadow-[3px_3px_0_#2A1712] ${
              i === 1 ? "rotate-1" : i === 2 ? "-rotate-1" : ""
            }`}
          >
            {b}
          </span>
        ))}
      </section>

      {/* Menu — booth cards */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-alfa mb-10 text-center text-3xl text-[#FFF7E8] drop-shadow-[3px_3px_0_#2A1712]">
          BLUE PLATE SPECIALS
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {menu.map((m) => (
            <div key={m.name} className="flex items-center gap-4 rounded-2xl border-4 border-[#2A1712] bg-[#FFF7E8] p-4 shadow-[4px_4px_0_#2A1712]">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#2FC4C0] text-2xl">
                {m.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-alfa text-sm text-[#2A1712]">{m.name}</h3>
                <p className="text-xs text-[#2A1712]/60">{m.desc}</p>
              </div>
              <span className="font-alfa text-sm text-[#E8433B]">${m.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2A1712] py-12 text-center">
        <p className="font-alfa text-xl text-[#FFF7E8]">SEE YOU AT THE COUNTER</p>
        <p className="mt-2 text-sm text-[#FFF7E8]/60">Route 9 & Main · Open 24 hours, every day</p>
      </footer>

      <div
        className="h-4 w-full"
        style={{
          backgroundImage: "repeating-conic-gradient(#FFF7E8 0% 25%, #2A1712 0% 50%)",
          backgroundSize: "16px 16px",
        }}
      />
    </div>
  );
}
