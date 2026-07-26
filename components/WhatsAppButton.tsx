"use client";

import { site } from "@/lib/site";
import { WhatsApp } from "./Icons";

export function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi KK Grove! I'd like to make a reservation."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-4 text-white shadow-[0_14px_40px_-12px_rgba(37,211,102,0.7)] transition-all duration-300 hover:pr-6 hover:-translate-y-0.5"
    >
      <WhatsApp className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
        Order / Book
      </span>
    </a>
  );
}
