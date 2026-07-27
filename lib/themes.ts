export type ThemeId = "grove" | "riviera" | "saffron" | "onyx";

export type Theme = {
  id: ThemeId;
  name: string;
  vibe: string;
  // Swatch colors for the switcher preview (hex).
  swatch: { bg: string; dark: string; accent: string };
};

export const themes: Theme[] = [
  {
    id: "grove",
    name: "Grove",
    vibe: "Tropical Luxury",
    swatch: { bg: "#F7F1E5", dark: "#0B3D2E", accent: "#C8A24B" },
  },
  {
    id: "riviera",
    name: "Riviera",
    vibe: "Coastal Mediterranean",
    swatch: { bg: "#F4F1EA", dark: "#133453", accent: "#E0A73C" },
  },
  {
    id: "saffron",
    name: "Saffron",
    vibe: "Heritage Spice",
    swatch: { bg: "#F7EFE1", dark: "#5E241A", accent: "#E8A519" },
  },
  {
    id: "onyx",
    name: "Onyx",
    vibe: "Modern Monochrome",
    swatch: { bg: "#F5F4F2", dark: "#18181B", accent: "#D4AF37" },
  },
];

export const THEME_IDS = themes.map((t) => t.id);
export const DEFAULT_THEME: ThemeId = "grove";
export const STORAGE_KEY = "kk-theme";
