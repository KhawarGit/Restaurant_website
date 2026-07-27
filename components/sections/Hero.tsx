import Link from "next/link";
import { site } from "@/lib/site";
import { Star, Arrow } from "@/components/Icons";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-900">
      {/* Layered tropical background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-slow-zoom bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgb(var(--c-forest-950) / 0.92), rgb(var(--c-forest-900) / 0.55) 55%, rgb(var(--c-forest-950) / 0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1900&q=80')",
          }}
        />
        {/* accent dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgb(var(--c-gold)) 0, transparent 8%), radial-gradient(circle at 80% 70%, rgb(var(--c-gold)) 0, transparent 8%)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-900 to-transparent" />
      </div>

      <div className="container-x relative z-10 py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="text-sm text-cream/80">
              Rated {site.rating.score} by {site.rating.count} guests
            </span>
          </div>

          <h1
            className="mt-6 font-serif text-4xl leading-[1.05] text-cream opacity-0 animate-fade-up sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.2s" }}
          >
            A tropical escape<br />
            <span className="text-gold">in the heart of Karachi.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            {site.tagline} Charcoal BBQ, Pakistani classics and Continental
            plates served beneath palm-fringed skies.
          </p>

          <div
            className="mt-9 flex flex-col gap-4 opacity-0 animate-fade-up sm:flex-row"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/#reserve" className="btn-gold">
              Reserve a Table <Arrow className="h-4 w-4" />
            </Link>
            <Link href="/menu" className="btn-outline">
              Explore the Menu
            </Link>
          </div>

          <div
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            {[
              ["4", "Signature cuisines"],
              ["40+", "Chef's creations"],
              ["Open-air", "Garden seating"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-2xl text-gold">{n}</div>
                <div className="text-xs uppercase tracking-widest text-cream/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-cream/50">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <span className="h-2 w-1 animate-float rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
