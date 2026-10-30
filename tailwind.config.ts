import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#111318",
          surface: "#1A1D24",
          elevated: "#242832",
          text: "#F4F4F5",
          muted: "#A1A1AA",
          border: "#30343D",
        },
        light: {
          bg: "#F3F2ED",
          surface: "#FFFFFF",
          text: "#171717",
          muted: "#666666",
          border: "#D8D6CE",
        },
        accent: {
          DEFAULT: "#A3E635", // Acid green
          hover: "#BEF264",
          dark: "#84CC16",
          riot: "#00F59B", // Riot Neon Green
          orange: "#FF5500", // Riot Hazard Orange
          amber: "#FACC15",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "SF Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
      },
      boxShadow: {
        terminal: "0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px #30343D",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.25)",
        highlight: "0 0 25px rgba(163, 230, 53, 0.15)",
        "light-card": "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px #D8D6CE",
      },
    },
  },
  plugins: [],
};

export default config;
