import type { Dish } from "@/lib/menu";

const tagStyles: Record<string, string> = {
  chef: "bg-gold/15 text-gold-dark",
  spicy: "bg-red-100 text-red-700",
  veg: "bg-emerald-100 text-emerald-700",
  seafood: "bg-sky-100 text-sky-700",
  new: "bg-forest-800 text-cream",
};

const tagLabels: Record<string, string> = {
  chef: "Chef's Pick",
  spicy: "Spicy",
  veg: "Veg",
  seafood: "Seafood",
  new: "New",
};

const tagDot: Record<string, string> = {
  chef: "bg-gold",
  spicy: "bg-red-500",
  veg: "bg-emerald-500",
  seafood: "bg-sky-500",
  new: "bg-forest-800",
};

export const legend = [
  { id: "chef", label: "Chef's Pick" },
  { id: "veg", label: "Vegetarian" },
  { id: "seafood", label: "Seafood" },
  { id: "spicy", label: "Spicy" },
  { id: "new", label: "New" },
];

export function DietaryLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-forest-900/60">
      {legend.map((l) => (
        <span key={l.id} className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${tagDot[l.id]}`} />
          {l.label}
        </span>
      ))}
    </div>
  );
}

/** Elegant card used across the menu grid. */
export function DishCard({ dish }: { dish: Dish }) {
  const isChef = dish.tags?.includes("chef");
  return (
    <article
      className={`group relative flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
        isChef
          ? "border-gold/40 bg-gold/[0.06] shadow-[0_14px_40px_-26px_rgba(200,162,75,0.9)]"
          : "border-forest-100 bg-white shadow-[0_12px_40px_-30px_rgba(11,61,46,0.7)] hover:border-gold/40"
      }`}
    >
      {isChef && (
        <span className="absolute -top-2.5 left-5 rounded-full bg-gold-sheen px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-900 shadow">
          Chef's Pick
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-serif text-xl leading-snug text-forest-900">{dish.name}</h4>
        <span className="shrink-0 rounded-full bg-forest-900 px-3 py-1 font-sans text-sm font-semibold text-gold-light">
          Rs {dish.price.toLocaleString()}
        </span>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-900/60">{dish.desc}</p>

      {dish.tags && dish.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {dish.tags
            .filter((t) => t !== "chef")
            .map((t) => (
              <span
                key={t}
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tagStyles[t]}`}
              >
                {tagLabels[t]}
              </span>
            ))}
        </div>
      )}
    </article>
  );
}

/** Compact price-list row (kept for any list-style contexts). */
export function DishRow({ dish }: { dish: Dish }) {
  return (
    <div className="group flex items-baseline gap-4 py-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-serif text-lg text-forest-900">{dish.name}</h4>
          {dish.tags?.map((t) => (
            <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tagStyles[t]}`}>
              {tagLabels[t]}
            </span>
          ))}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-forest-900/60">{dish.desc}</p>
      </div>
      <div className="mx-3 hidden flex-1 translate-y-[-4px] border-b border-dotted border-forest-900/20 sm:block" aria-hidden />
      <div className="shrink-0 font-serif text-lg font-500 text-gold-dark">Rs {dish.price.toLocaleString()}</div>
    </div>
  );
}
