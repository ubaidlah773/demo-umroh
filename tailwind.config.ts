import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // MODERN LUXURY RESTAURANT PALETTE
        espresso: {
          700: "#3E3731",
          800: "#2F2924",
          900: "#211C18", // Primary Deep Espresso
          950: "#1A1613",
        },
        ivory: {
          50: "#FAF7F2",
          100: "#F7F3EC", // Secondary Warm Ivory
          200: "#EFE9DF",
          300: "#E4DCCE",
        },
        champagne: {
          300: "#E0CB9E",
          400: "#D4B87E",
          500: "#C8A96B", // Luxury Muted Champagne
          600: "#B29255",
          700: "#93763F",
        },
        olive: {
          500: "#6E7260",
          600: "#5D6151",
          700: "#55584B", // Supporting Natural Olive
          800: "#42453A",
          900: "#31342B",
        },
        warmgray: {
          100: "#EDEBE8",
          200: "#DDD9D4",
          300: "#C4BFB8",
          400: "#AAA39A", // Neutral Warm Gray
          500: "#8B847A",
          600: "#6E685E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(33, 28, 24, 0.08)",
        "luxury-hover": "0 25px 50px -12px rgba(33, 28, 24, 0.14)",
        "champagne-glow": "0 0 25px rgba(200, 169, 107, 0.18)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
