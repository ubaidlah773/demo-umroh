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
        lumea: {
          bg: "#F7F5F0",           // Background
          primary: "#171717",      // Primary deep charcoal
          secondary: "#6F6B63",    // Secondary warm slate
          accent: "#A88B5A",       // Accent muted gold
          "accent-light": "#C3AB7F",
          "accent-dark": "#8A6E3F",
          white: "#FFFFFF",        // Clean white
          border: "#DDD9D0",       // Soft architectural border
          "border-subtle": "#EBE8E1",
          card: "#FFFFFF",
          surface: "#EFECE6",
          dark: "#121212",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "lumea-subtle": "0 2px 10px rgba(23, 23, 23, 0.04)",
        "lumea-card": "0 12px 30px -10px rgba(23, 23, 23, 0.06)",
        "lumea-elevated": "0 20px 40px -15px rgba(23, 23, 23, 0.10)",
        "lumea-gold": "0 0 20px rgba(168, 139, 90, 0.2)",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "14px",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
