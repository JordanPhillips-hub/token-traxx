import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // NEUTRAL'S
        neutral50: "hsla(0, 0%, 100%, 0.5)",
        neutral100: "hsl(0, 0%, 100%)",
        neutral400: "hsl(0, 0%, 82%)",
        neutral500: '	hsl(0, 0%, 62%)',
        // PRIMARY'S
        primary400: "hsl(253, 35%, 15%)",
        primary500: "hsl(240, 65%, 63%)",
        primary600: "hsl(240, 35%, 15%)",
        primary700: "hsl(240, 22%, 18%)",
        primary800: "hsl(240, 21%, 12%)",
        primary900: "hsl(247, 20%, 9%)",
        // Accents
        accent100: "hsl(176, 100%, 48%)",
        accent200: "hsl(337, 100%, 50%)",
      },
      maxWidth: {
        "3.5xl": "52.1875rem",
        "8xl": "118.75rem",
      },
    },
  },
  plugins: [],
};
export default config;