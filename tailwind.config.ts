import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        crimson: "#700E0D",
        charcoal: "#1C1C1C",
        ink: "#000000",
        offwhite: "#F5F5F5"
      }
    }
  },
  plugins: []
};

export default config;
