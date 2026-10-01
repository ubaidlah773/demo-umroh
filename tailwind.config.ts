import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Javanese Heritage x Modern Editorial Palette for Bale Rasa Tuban
        jawa: {
          700: "#423226",
          800: "#2F221A",
          850: "#251A13",
          900: "#1D140E", // Deep Kayu Jati / Teakwood
          950: "#140D08", // Pitch dark wood
        },
        cream: {
          50: "#FAF7F2", // Pure warm parchment
          100: "#F4EFE6", // Warm linen background
          200: "#EAE1D2", // Muted cream card
          300: "#DDD0BD",
          400: "#C9B8A0",
        },
        terracotta: {
          300: "#DF7B57",
          400: "#CD623D",
          500: "#B84E29", // Traditional Gerabah / Clay pottery
          600: "#9C3D1B",
          700: "#803014",
        },
        wood: {
          300: "#B77C53",
          400: "#9C6138",
          500: "#814A24", // Kayu sawo & jati madu
          600: "#673717",
          700: "#4F280E",
        },
        gold: {
          300: "#E5CA8A",
          400: "#D4B368",
          500: "#C19C4A", // Soft Antique Brass / Kuningan Jawa
          600: "#A68235",
          700: "#876725",
        },
        forest: {
          600: "#314A39",
          700: "#24372A",
          800: "#1A281E", // Hijau pekat asri daun jati & pisang
          900: "#121C15",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        heritage: "0 20px 40px -15px rgba(29, 20, 14, 0.07)",
        "heritage-lg": "0 25px 50px -12px rgba(29, 20, 14, 0.14)",
        "gold-glow": "0 0 30px rgba(193, 156, 74, 0.2)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
