"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { menu } from "@/lib/menu";
import { DishCard, DietaryLegend } from "./DishCard";
import { Photo } from "./Photo";

const filters = [
  { id: "all", label: "All Dishes" },
  { id: "chef", label: "Chef's Picks" },
  { id: "veg", label: "Vegetarian" },
  { id: "seafood", label: "Seafood" },
  { id: "spicy", label: "Spicy" },
];

export function MenuExplorer() {
  const [active, setActive] = useState("all");
  const [current, setCurrent] = useState<string>(menu[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const categories = useMemo(() => {
    if (active === "all") return menu;
    return menu
      .map((c) => ({ ...c, items: c.items.filter((d) => d.tags?.includes(active as any)) }))
      .filter((c) => c.items.length > 0);
  }, [active]);

  // Scroll-spy: highlight the category currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    categories.forEach((c) => {
      const el = sectionRefs.current[c.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalDishes = menu.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      {/* Filter + legend bar */}
      <div className="container-x pb-8 pt-14 text-center">
        <p className="text-sm text-forest-900/60">
          {totalDishes} dishes across {menu.length} kitchens · all prices in PKR, inclusive of taste.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                active === f.id
                  ? "bg-forest-800 text-cream shadow-luxe"
                  : "border border-forest-200 text-forest-800 hover:border-gold hover:text-gold-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <DietaryLegend />
        </div>
      </div>

      {/* Sticky category scroll-spy nav */}
      <div className="sticky top-20 z-30 border-y border-forest-100 bg-cream/85 backdrop-blur-md">
        <div className="container-x">
          <div className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollTo(c.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  current === c.id
                    ? "bg-gold-sheen text-forest-900"
                    : "text-forest-900/60 hover:text-forest-900"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {categories.length === 0 && (
        <p className="py-24 text-center text-forest-900/60">No dishes match this filter.</p>
      )}

      {/* Category sections */}
      <div className="container-x space-y-20 py-16 md:space-y-28">
        {categories.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            ref={(el) => {
              sectionRefs.current[c.id] = el;
            }}
            className="scroll-mt-36"
          >
            {/* Spotlight banner */}
            <div className="relative mb-10 overflow-hidden rounded-3xl">
              <Photo src={c.image} alt={c.title} rounded="rounded-3xl" className="h-52 w-full sm:h-64" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-7 sm:px-12">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  {String(i + 1).padStart(2, "0")} · {c.items.length} dishes
                </span>
                <h2 className="mt-2 font-serif text-3xl text-cream sm:text-4xl md:text-5xl">{c.title}</h2>
                <p className="mt-2 max-w-md text-sm text-cream/75">{c.blurb}</p>
              </div>
            </div>

            {/* Dish grid */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {c.items.map((d) => (
                <DishCard key={d.name} dish={d} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
