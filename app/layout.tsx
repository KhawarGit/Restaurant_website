import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Jost,
  DM_Serif_Display,
  Poppins,
} from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { THEME_IDS, DEFAULT_THEME } from "@/lib/themes";
import { site } from "@/lib/site";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jost", display: "swap" });
const dmserif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], variable: "--font-dmserif", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

const fontVars = [playfair, inter, cormorant, jost, dmserif, poppins].map((f) => f.variable).join(" ");

// No-flash theme init: applies the saved theme before first paint.
const themeScript = `(function(){try{var t=sessionStorage.getItem('kk-theme');var ok=${JSON.stringify(
  THEME_IDS
)};if(t&&ok.indexOf(t)>-1){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://kkgrove.com"),
  title: {
    default: `${site.name} — Tropical Luxury Dining in Karachi`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "KK Grove Karachi",
    "fine dining Karachi",
    "BBQ restaurant Karachi",
    "Tipu Sultan Road restaurant",
    "Continental Pakistani cuisine",
  ],
  openGraph: {
    title: `${site.name} — Tropical Luxury Dining in Karachi`,
    description: site.description,
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} className={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
