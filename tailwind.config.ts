import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette is driven by CSS variables so themes can re-skin the whole
        // site at runtime (see globals.css [data-theme] blocks). Channels are
        // space-separated RGB to support Tailwind's <alpha-value> opacity.
        forest: {
          DEFAULT: "rgb(var(--c-forest) / <alpha-value>)",
          50: "rgb(var(--c-forest-50) / <alpha-value>)",
          100: "rgb(var(--c-forest-100) / <alpha-value>)",
          600: "rgb(var(--c-forest-600) / <alpha-value>)",
          700: "rgb(var(--c-forest-700) / <alpha-value>)",
          800: "rgb(var(--c-forest-800) / <alpha-value>)",
          900: "rgb(var(--c-forest-900) / <alpha-value>)",
          950: "rgb(var(--c-forest-950) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--c-gold) / <alpha-value>)",
          light: "rgb(var(--c-gold-light) / <alpha-value>)",
          dark: "rgb(var(--c-gold-dark) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "rgb(var(--c-cream) / <alpha-value>)",
          dark: "rgb(var(--c-cream-dark) / <alpha-value>)",
        },
        palm: "rgb(var(--c-palm) / <alpha-value>)",
        sand: "rgb(var(--c-sand) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxe: "0 24px 60px -20px rgb(var(--c-forest) / 0.45)",
        gold: "0 10px 40px -12px rgb(var(--c-gold) / 0.55)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(120deg, rgb(var(--c-gold-dark)) 0%, rgb(var(--c-gold-light)) 45%, rgb(var(--c-gold)) 100%)",
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
