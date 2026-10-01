import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#f0fdf7",
          100: "#dcfceb",
          200: "#baf7d4",
          300: "#84eeb6",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        safara: {
          darkest: "#02241b",
          dark: "#033226",
          primary: "#064e3b",
          medium: "#0b634c",
          light: "#0f766e",
        },
        gold: {
          50: "#fdfbf4",
          100: "#f9f4e2",
          200: "#f1e5be",
          300: "#e6d092",
          400: "#d9b863",
          500: "#c59b27",
          600: "#aa7e1c",
          700: "#885e17",
          800: "#704b19",
          900: "#5d3e1a",
          950: "#36210b",
        },
        ivory: {
          50: "#fdfcf9",
          100: "#faf7f2",
          200: "#f4eee2",
          300: "#ece1cc",
          400: "#dfcbb0",
          500: "#cfb292",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.03)",
        card: "0 10px 30px -5px rgba(2, 44, 34, 0.06)",
        "card-hover": "0 20px 40px -8px rgba(2, 44, 34, 0.12)",
        "gold-glow": "0 0 25px rgba(197, 155, 39, 0.22)",
        "emerald-glow": "0 10px 30px rgba(6, 78, 59, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
