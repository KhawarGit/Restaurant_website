import {
  Space_Grotesk,
  Cormorant_Garamond,
  Jost,
  DM_Serif_Display,
  Poppins,
  Press_Start_2P,
  Courier_Prime,
  Alfa_Slab_One,
  Lora,
  IBM_Plex_Mono,
} from "next/font/google";

// Extra typefaces used only by these showcase designs — scoped here so the
// main site's font payload stays lean.
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-jost", display: "swap" });
const dmserif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], variable: "--font-dmserif", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: ["400"], variable: "--font-pixel", display: "swap" });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-courier", display: "swap" });
const alfa = Alfa_Slab_One({ subsets: ["latin"], weight: ["400"], variable: "--font-alfa", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-lora", display: "swap" });
const plexmono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plexmono", display: "swap" });

const vars = [space, cormorant, jost, dmserif, poppins, pixel, courier, alfa, lora, plexmono]
  .map((f) => f.variable)
  .join(" ");

export default function PortfoliosLayout({ children }: { children: React.ReactNode }) {
  return <div className={vars}>{children}</div>;
}
