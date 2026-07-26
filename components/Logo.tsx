import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  const primary = light ? "#F7F1E5" : "#0B3D2E";
  return (
    <Link href="/" aria-label="KK Grove — home" className="group flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-gold/60 bg-forest-800 text-gold transition-transform duration-500 group-hover:rotate-6">
        <span className="font-serif text-sm font-700 tracking-tight text-gold" style={{ fontWeight: 700 }}>
          KK
        </span>
        <svg viewBox="0 0 32 32" className="absolute -bottom-1 h-4 w-4 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.5 12c-3.5-.5-6.5 1-8.5 3.5M18.5 12c-.3-2.8-1.5-4.8-3.5-6M18.5 12c2.2-.4 4 .3 5.5 2M18.5 12c1.5-2 2-4.3 1.6-6.5M18.5 12c-2.6-.8-5-.4-7 1.2" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-serif text-lg font-600 tracking-wide"
          style={{ color: primary, fontWeight: 600 }}
        >
          KK Grove
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
          Karachi
        </span>
      </span>
    </Link>
  );
}
