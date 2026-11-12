import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        surface: "#0f172a",
        card: "rgba(15, 23, 42, 0.75)",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
          light: "#818cf8",
        },
        cyan: {
          glow: "#06b6d4",
        },
        purple: {
          glow: "#a855f7",
        },
        emerald: {
          glow: "#10b981",
        },
        amber: {
          glow: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.4)",
        "glow-cyan": "0 0 30px -5px rgba(6, 182, 212, 0.4)",
        "glow-purple": "0 0 30px -5px rgba(168, 85, 247, 0.4)",
        "glow-emerald": "0 0 30px -5px rgba(16, 185, 129, 0.4)",
        "glow-amber": "0 0 30px -5px rgba(245, 158, 11, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
