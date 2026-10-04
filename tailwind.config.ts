// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        dark: "#111827",
        body: "#374151",
        muted: "#6B7280",
        border: "#E5E7EB",
        background: "#FFFFFF",
        subtle: "#F8FAFC",
        success: "#15803D",
        warning: "#B45309",
        danger: "#B91C1C",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "4px",
        lg: "8px",
      },
      boxShadow: {
        // default none (no entry needed), subtle for dropdowns/modals
        subtle: "0 1px 3px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
