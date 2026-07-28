import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tropical luxury palette
        forest: {
          DEFAULT: "#0B3D2E",
          50: "#eef6f1",
          100: "#d3e7dc",
          600: "#12513c",
          700: "#0f4433",
          800: "#0b3d2e",
          900: "#072a20",
          950: "#041a14",
        },
        gold: {
          DEFAULT: "#C8A24B",
          light: "#E4C878",
          dark: "#A6832F",
        },
        cream: {
          DEFAULT: "#F7F1E5",
          dark: "#EFE6D2",
        },
        palm: "#1E6B4F",
        sand: "#EAdfc9",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Extra families used only by the /portfolios showcase designs.
        jost: ["var(--font-jost)", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        dmserif: ["var(--font-dmserif)", "Georgia", "serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        space: ["var(--font-space)", "system-ui", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        courier: ["var(--font-courier)", "monospace"],
        alfa: ["var(--font-alfa)", "serif"],
        lora: ["var(--font-lora)", "Georgia", "serif"],
        plexmono: ["var(--font-plexmono)", "monospace"],
      },
      boxShadow: {
        luxe: "0 24px 60px -20px rgba(11, 61, 46, 0.45)",
        gold: "0 10px 40px -12px rgba(200, 162, 75, 0.55)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(120deg, #A6832F 0%, #E4C878 45%, #C8A24B 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "slow-zoom": "slow-zoom 18s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
