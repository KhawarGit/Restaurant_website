import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
