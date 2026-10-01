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
        // D'SULTAN TROPICAL MODERN PALETTE
        charcoal: {
          950: "#090A0D",
          900: "#0F1116",
          850: "#151820",
          800: "#1C202B",
          750: "#242936",
          700: "#2E3444",
          600: "#444C60",
        },
        ivory: {
          50: "#FDFCF9",
          100: "#F9F6F0",
          200: "#F2EBE0",
          300: "#E6DDCD",
          400: "#C9BFAB",
          500: "#A39781",
        },
        gold: {
          300: "#EAD5B7",
          400: "#DCBE93",
          500: "#C5A880", // Primary warm gold accent
          600: "#B09066",
          700: "#91734C",
        },
        olive: {
          950: "#111712",
          900: "#18211A",
          800: "#222F25",
          700: "#304033",
        },
        coffee: {
          950: "#1D1612",
          900: "#2D221C",
          800: "#41322A",
          700: "#59453B",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(197, 168, 128, 0.25)",
        "gold-glow-lg": "0 0 45px rgba(197, 168, 128, 0.35)",
        "charcoal-card": "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        "elevated-card": "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
