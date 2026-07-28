import type { Metadata } from "next";
import { BackPill, ContactPill } from "@/components/portfolio/PortfolioChrome";

export const metadata: Metadata = { title: "Izakaya — Portfolio Design" };

const menu = [
  { name: "GYOZA x5", price: "800", hp: "██████████" },
  { name: "KARAAGE", price: "950", hp: "████████░░" },
  { name: "TAKOYAKI x6", price: "700", hp: "███████░░░" },
  { name: "SAKE FLIGHT", price: "1200", hp: "██████████" },
  { name: "MISO RAMEN", price: "1100", hp: "█████████░" },
  { name: "MENTAIKO FRIES", price: "650", hp: "██████░░░░" },
];

export default function IzakayaPortfolio() {
  return (
    <div className="min-h-screen bg-[#0A0014] font-jost text-[#E8FF6B]" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(255,46,154,0.15), transparent 40%), radial-gradient(circle at 85% 60%, rgba(45,212,255,0.12), transparent 40%)" }}>
      <BackPill tone="dark" />
      <ContactPill tone="dark" />

      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)" }}
      />

      {/* Header */}
      <header className="flex flex-col items-center gap-3 px-6 pt-14 text-center">
        <span className="font-pixel text-[10px] text-[#FF2E9A]">GAME START</span>
        <h1 className="font-pixel text-2xl leading-relaxed text-[#E8FF6B] sm:text-3xl">
          PIXEL<span className="text-[#FF2E9A]">RONIN</span>
        </h1>
        <p className="text-sm text-[#8AF]/80">居酒屋 · back-alley izakaya · lvl 99 sake list</p>
      </header>

      {/* Hero — arcade cabinet framing */}
      <section className="mx-auto mt-10 max-w-lg px-6">
        <div className="border-4 border-[#FF2E9A] bg-black/40 p-1 shadow-[0_0_40px_-6px_#FF2E9A]">
          <div
            className="aspect-[4/3] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(10,0,20,0.35), rgba(10,0,20,0.75)), url('https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1000&q=80')",
              imageRendering: "pixelated" as any,
            }}
          />
        </div>
        <p className="mt-4 text-center font-pixel text-[9px] leading-loose text-[#2DD4FF]">
          PRESS START TO ORDER →
        </p>
      </section>

      {/* Stat bar */}
      <section className="mx-auto mt-14 max-w-lg px-6">
        <div className="border-2 border-[#2DD4FF]/50 bg-black/40 p-4 font-pixel text-[9px] leading-loose text-[#E8FF6B]">
          <div className="flex justify-between"><span>PLAYER</span><span>NIGHT_OWL</span></div>
          <div className="mt-2 flex justify-between"><span>HUNGER</span><span className="text-[#FF2E9A]">▓▓▓▓▓▓▓▓░░</span></div>
          <div className="mt-2 flex justify-between"><span>SAKE LVL</span><span className="text-[#2DD4FF]">▓▓▓▓▓░░░░░</span></div>
        </div>
      </section>

      {/* Menu — RPG item list */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <h2 className="mb-6 text-center font-pixel text-sm text-[#FF2E9A]">◆ ITEM SHOP ◆</h2>
        <div className="space-y-3">
          {menu.map((d) => (
            <div key={d.name} className="flex items-center justify-between border-2 border-[#8AF]/25 bg-black/40 px-4 py-3">
              <div>
                <div className="font-pixel text-[10px] text-[#E8FF6B]">{d.name}</div>
                <div className="mt-1.5 font-pixel text-[8px] text-[#2DD4FF]">{d.hp}</div>
              </div>
              <div className="font-pixel text-[10px] text-[#FF2E9A]">¥{d.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#FF2E9A]/30 px-6 py-12 text-center">
        <p className="font-pixel text-[9px] leading-loose text-[#8AF]/70">
          OPEN 6PM–2AM · NO RESERVATIONS · CASH ONLY
        </p>
        <p className="mt-4 font-pixel text-[8px] text-[#E8FF6B]/40">© PIXEL RONIN — CONTINUE?</p>
      </footer>
    </div>
  );
}
