import Link from "next/link";

/** Fixed top-left link back to the portfolio gallery. */
export function BackPill({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const styles =
    tone === "dark"
      ? "border-white/25 text-white/85 bg-black/25 hover:border-white hover:text-white"
      : "border-black/15 text-black/70 bg-white/75 hover:border-black hover:text-black";
  return (
    <Link
      href="/portfolios"
      className={`fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur transition-colors sm:left-6 sm:top-6 ${styles}`}
    >
      ← All Designs
    </Link>
  );
}

/** Fixed top-right marketing nudge — the whole reason this showcase exists. */
export function ContactPill({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const styles =
    tone === "dark"
      ? "border-white/25 text-white bg-black/25 hover:border-white"
      : "border-black/15 text-black bg-white/75 hover:border-black";
  return (
    <Link
      href="/contact"
      className={`fixed right-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur transition-colors sm:right-6 sm:top-6 ${styles}`}
    >
      Want this design? Contact Us
    </Link>
  );
}
