import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // EXACT BRIGHT/LIGHT BRAND COLOR SYSTEM SPECIFIED
        palette: {
          bg: "#F7F8FC",          // Primary website background
          sectionBg: "#EEF0F8",   // Alternate sections background
          surface: "#FFFFFF",     // Cards and content surfaces
          textPrimary: "#272838", // Headings and main text
          textSecondary: "#5D536B", // Secondary text
          purple: "#7D6B91",      // Secondary visual accent
          lavender: "#989FCE",    // Subtle decorative elements
          blue: "#347FC4",        // CTA, links, active states and interactions
          // Legacy mappings for backwards-safety
          primary: "#F7F8FC",
          secondary: "#EEF0F8",
          darkSec: "#5D536B",
          secPurple: "#7D6B91",
        },
        // Semantic surface mapping for the light theme
        surface: {
          primary: "#F7F8FC",     // Main background
          section: "#EEF0F8",     // Alternating section background
          card: "#FFFFFF",        // Card & modal background
          cardHover: "#FAFAFD",
          border: "rgba(125, 107, 145, 0.15)", // Subtle #7D6B91 border
          borderStrong: "rgba(125, 107, 145, 0.3)",
        },
        accent: {
          blue: "#347FC4",        // Primary Blue Accent
          lavender: "#989FCE",    // Soft Lavender
          purple: "#7D6B91",      // Secondary Purple
          secondary: "#5D536B",   // Dark Secondary
          glow: "rgba(52, 127, 196, 0.15)",
          subtle: "rgba(52, 127, 196, 0.08)",
        },
        text: {
          primary: "#272838",     // Crisp dark heading & body text
          secondary: "#5D536B",   // Secondary text
          muted: "rgba(93, 83, 107, 0.75)", // Dimmed secondary
          faint: "rgba(93, 83, 107, 0.45)",
          light: "#FFFFFF",       // White text when used on solid blue or dark buttons
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        "card-subtle": "0 2px 8px -2px rgba(39, 40, 56, 0.05), 0 1px 4px -1px rgba(39, 40, 56, 0.04)",
        "card-elevated": "0 12px 32px -6px rgba(39, 40, 56, 0.08), 0 4px 12px -2px rgba(39, 40, 56, 0.04)",
        "card-hover": "0 20px 40px -10px rgba(52, 127, 196, 0.12), 0 6px 16px -4px rgba(39, 40, 56, 0.06)",
        "accent-sm": "0 2px 10px -2px rgba(52, 127, 196, 0.35)",
        "accent-md": "0 6px 20px -3px rgba(52, 127, 196, 0.4)",
        "glow-card": "0 0 30px -5px rgba(52, 127, 196, 0.12)",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
