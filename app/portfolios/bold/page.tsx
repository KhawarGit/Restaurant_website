import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Bold & Playful — Portfolio Design" };

const menu = [
  { emoji: "🌮", name: "Street Tacos", desc: "Charred pineapple, chipotle crema", price: "9", bg: "#FF6B4A" },
  { emoji: "🍗", name: "Firecracker Wings", desc: "Habanero glaze, ranch drip", price: "12", bg: "#FFB84A" },
  { emoji: "🍜", name: "Spicy Miso Ramen", desc: "Chili oil, soft egg, scallion", price: "14", bg: "#FF6B4A" },
  { emoji: "🍔", name: "Smash Burger", desc: "Double patty, cheese sauce", price: "13", bg: "#FFB84A" },
  { emoji: "🍤", name: "Cajun Shrimp Bowl", desc: "Dirty rice, remoulade", price: "15", bg: "#FF6B4A" },
  { emoji: "🍩", name: "Churro Sundae", desc: "Cinnamon sugar, dulce de leche", price: "8", bg: "#FFB84A" },
];

export default function BoldPortfolio() {
  return (
    <div className="min-h-screen bg-[#FFD23F] font-poppins text-[#1A0F0C]">
      <BackPill tone="light" />
      <ContactPill tone="light" />

      {/* Header */}
      <header className="container mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 sm:px-10">
        <span className="font-dmserif text-2xl">
          Fire<span className="text-[#FF4B3E]">&</span>Spice
        </span>
        <nav className="hidden gap-3 md:flex">
          {["Menu", "Locations", "Order"].map((l) => (
            <span key={l} className="rounded-full bg-black/10 px-4 py-1.5 text-sm font-semibold">{l}</span>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-block rotate-[-3deg] rounded-full bg-[#FF4B3E] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            🔥 Now serving downtown
          </span>
          <h1 className="font-dmserif mt-6 text-5xl leading-[1.05] sm:text-6xl">
            Loud flavor. <br /> Louder fun.
          </h1>
          <p className="mt-5 max-w-sm text-[#1A0F0C]/70">
            Street food favorites turned all the way up — bold spice, big
            portions, zero chill. Grab a seat or grab it to go.
          </p>
          <div className="mt-8 flex gap-3">
            <span className="rounded-full bg-[#FF4B3E] px-7 py-3 text-sm font-bold text-white shadow-[4px_4px_0_#1A0F0C]">
              Order Now
            </span>
            <span className="rounded-full border-2 border-[#1A0F0C] px-7 py-3 text-sm font-bold">
              See Menu
            </span>
          </div>
        </div>
        <div className="relative">
          <div
            className="aspect-square w-full rounded-[2.5rem] bg-cover bg-center shadow-[10px_10px_0_#1A0F0C]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80')" }}
          />
          <span className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#1A0F0C]">
            4.8★ · 2,300+ orders
          </span>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#FF4B3E] py-14">
        <div className="container mx-auto grid max-w-6xl grid-cols-3 gap-4 px-6 sm:px-10">
          {[["🌶️", "Extra spicy on request"], ["🚀", "15-min avg pickup"], ["♻️", "100% compostable packaging"]].map(([e, l]) => (
            <div key={l} className="rounded-2xl bg-white/10 p-5 text-center text-white">
              <div className="text-3xl">{e}</div>
              <p className="mt-2 text-xs font-semibold sm:text-sm">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="container mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <h2 className="font-dmserif text-center text-4xl">Fan Favorites</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((m) => (
            <div key={m.name} className="rounded-3xl p-6 text-white shadow-[6px_6px_0_#1A0F0C]" style={{ background: m.bg }}>
              <div className="text-4xl">{m.emoji}</div>
              <h3 className="font-dmserif mt-3 text-xl">{m.name}</h3>
              <p className="mt-1 text-sm text-white/80">{m.desc}</p>
              <div className="mt-4 inline-block rounded-full bg-black/20 px-3 py-1 text-sm font-bold">${m.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A0F0C] py-14 text-center text-white">
        <p className="font-dmserif text-2xl">Hungry yet?</p>
        <p className="mt-2 text-sm text-white/60">Open daily 11am–11pm · Three locations downtown</p>
      </footer>
    </div>
  );
}
