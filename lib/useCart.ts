"use client";

import { useMemo, useState } from "react";

export type CartLine = { name: string; price: number; qty: number; notes?: string };

const TAX_RATE = 0.13;

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  function add(name: string, price: number) {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.name === name);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { name, price, qty: 1 }];
    });
  }

  function setQty(name: string, qty: number) {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.name !== name)
        : prev.map((l) => (l.name === name ? { ...l, qty } : l))
    );
  }

  function setNote(name: string, notes: string) {
    setLines((prev) => prev.map((l) => (l.name === name ? { ...l, notes } : l)));
  }

  function clear() {
    setLines([]);
  }

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    return { subtotal, tax, total: subtotal + tax, count };
  }, [lines]);

  return { lines, add, setQty, setNote, clear, totals };
}
