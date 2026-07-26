import { Reveal } from "@/components/Reveal";
import { deals } from "@/lib/menu";

export function Deals() {
  return (
    <section className="relative overflow-hidden bg-forest-800 py-16">
      <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-cream/10 bg-forest-900/50 p-6 backdrop-blur transition-colors hover:border-gold/40">
                <span className="w-fit rounded-full bg-gold-sheen px-3 py-1 text-xs font-bold text-forest-900">
                  {d.price}
                </span>
                <h3 className="mt-4 font-serif text-xl text-cream">{d.title}</h3>
                <p className="mt-1 text-sm text-cream/60">{d.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
