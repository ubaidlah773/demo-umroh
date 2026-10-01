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
        espresso: {
          950: "#0D0A08",
          900: "#17110E", // Background
          850: "#1E1713",
          800: "#241510", // Espresso
          700: "#2E1B15",
          600: "#38231A", // Dark Coffee
          500: "#4D3226",
          400: "#694738",
          300: "#8C6350",
          200: "#B58C77",
          100: "#DFCDC3",
          50: "#F5EFEA",
        },
        cream: {
          50: "#FAF7F2",
          100: "#F4E9D8", // Cream
          200: "#EAD9C2",
          300: "#DFC5A7",
          400: "#D3B08B",
          500: "#C4976E",
        },
        caramel: {
          400: "#CF905B",
          500: "#B87945", // Caramel
          600: "#9C6233",
          700: "#804E25",
        },
        gold: {
          300: "#E2C896",
          400: "#D7B87E",
          500: "#C9A66B", // Gold accent
          600: "#B28C4E",
          700: "#8E6E37",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(201, 166, 107, 0.22)",
        "gold-sm": "0 0 15px rgba(201, 166, 107, 0.3)",
        "coffee-depth": "0 25px 50px -12px rgba(13, 10, 8, 0.8)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "steam": "steamRise 4s ease-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" },
        },
        steamRise: {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.8)" },
          "50%": { opacity: "0.6", transform: "translateY(-20px) scale(1.1)" },
          "100%": { opacity: "0", transform: "translateY(-40px) scale(1.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
