import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        bone: "rgb(var(--color-bone) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      letterSpacing: {
        wide: "0.22em",
      },
      boxShadow: {
        "soft-inset": "inset 0 1px 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
