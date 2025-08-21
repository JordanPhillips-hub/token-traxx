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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        whiteOpac900: "hsla(0, 0%, 100%, 0.5)",
        gray100: "hsl(0, 0%, 82%)",
        gray200: "hsl(240, 1%, 73%)",
        gray500: "hsl(0, 0%, 62%)",
        purple500: "hsl(240, 65%, 63%)",
        purple700: "hsl(253, 35%, 15%)",
        green500: "hsl(176, 100%, 48%)",
        red500: "hsl(337, 100%, 50%)",
        orange500: "hsl(33, 93%, 54%)",
        blue600: "hsl(240, 35%, 15%)",
        blue700: "hsl(240, 22%, 18%)",
        blue800: "hsl(240, 21%, 12%)",
        blue900: "hsl(247, 20%, 9%)",
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
