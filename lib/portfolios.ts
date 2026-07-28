const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type PortfolioId =
  | "modern"
  | "minimal"
  | "fancy"
  | "bold"
  | "izakaya"
  | "speakeasy"
  | "diner"
  | "editorial"
  | "brutalist";

export type Portfolio = {
  id: PortfolioId;
  name: string; // fictional demo restaurant name
  style: string; // style label
  description: string;
  href: string;
  bg: string; // card thumbnail background
  accent: string; // card thumbnail accent
  text: string; // card thumbnail text color
  font: string; // typography note shown on the card
  image: string;
};

export const portfolios: Portfolio[] = [
  {
    id: "modern",
    name: "Urban Fork",
    style: "Modern",
    description:
      "Bold geometry, oversized type and an asymmetric grid — for a brand that feels fast, contemporary and confident.",
    href: "/portfolios/modern",
    bg: "#0B0F10",
    accent: "#2DD4BF",
    text: "#F4F4F5",
    font: "Space Grotesk",
    image: u("1517248135467-4c7edcad34c4"),
  },
  {
    id: "minimal",
    name: "NOIR.",
    style: "Minimalistic",
    description:
      "Monochrome, spacious, quiet confidence. No noise — just typography, whitespace and a single accent.",
    href: "/portfolios/minimal",
    bg: "#FFFFFF",
    accent: "#111111",
    text: "#111111",
    font: "Inter",
    image: u("1600891964599-f61ba0e24092"),
  },
  {
    id: "fancy",
    name: "La Château",
    style: "Fancy · Fine Dining",
    description:
      "Candlelit luxury, gold-foil detailing and an ornate serif — built for white-tablecloth, reservation-only dining.",
    href: "/portfolios/fancy",
    bg: "#1A120B",
    accent: "#D4AF37",
    text: "#F3E9D2",
    font: "Cormorant Garamond",
    image: u("1552566626-52f8b828add9"),
  },
  {
    id: "bold",
    name: "Fire & Spice",
    style: "Bold & Playful",
    description:
      "Vibrant color blocks, rounded shapes and high energy — for casual, fun, street-food-style brands.",
    href: "/portfolios/bold",
    bg: "#FF4B3E",
    accent: "#FFD23F",
    text: "#1A0F0C",
    font: "DM Serif + Poppins",
    image: u("1529193591184-b1d58069ecdd"),
  },
  {
    id: "izakaya",
    name: "Pixel Ronin",
    style: "Neo-Tokyo Izakaya",
    description:
      "Neon-lit back-alley Tokyo, 8-bit arcade type and CRT scanlines — playful, cramped and unmistakably late-night.",
    href: "/portfolios/izakaya",
    bg: "#0A0014",
    accent: "#FF2E9A",
    text: "#E8FF6B",
    font: "Press Start 2P",
    image: u("1559737558-2f5a35f4523b"),
  },
  {
    id: "speakeasy",
    name: "Blind Tiger",
    style: "Prohibition Speakeasy",
    description:
      "No photography, just typewriter type on aged paper — a literary, password-only cocktail den from 1925.",
    href: "/portfolios/speakeasy",
    bg: "#12100D",
    accent: "#B08D57",
    text: "#EDE6D6",
    font: "Courier Prime",
    image: u("1504674900247-0877df9cc836"),
  },
  {
    id: "diner",
    name: "Starlite Diner",
    style: "Retro Americana",
    description:
      "Checkerboard floors, chrome trim and neon — a chunky 1950s drive-in built for milkshakes and all-day breakfast.",
    href: "/portfolios/diner",
    bg: "#E8433B",
    accent: "#2FC4C0",
    text: "#FFF7E8",
    font: "Alfa Slab One",
    image: u("1551024601-bec78aea704b"),
  },
  {
    id: "editorial",
    name: "The Larder",
    style: "Editorial Magazine",
    description:
      "Reads like a food-magazine feature — masthead, byline, pull-quotes and a photo grid, refined and image-led.",
    href: "/portfolios/editorial",
    bg: "#F4F1EA",
    accent: "#B5482A",
    text: "#1C1A16",
    font: "Lora",
    image: u("1621996346565-e3dbc646d9a9"),
  },
  {
    id: "brutalist",
    name: "Concrete Kitchen",
    style: "Brutalist",
    description:
      "Raw borders, stark grid and unapologetic type — the anti-design aesthetic dominating today's award galleries.",
    href: "/portfolios/brutalist",
    bg: "#F2F2F2",
    accent: "#FF3B00",
    text: "#0A0A0A",
    font: "IBM Plex Mono",
    image: u("1577219491135-ce391730fb2c"),
  },
];
