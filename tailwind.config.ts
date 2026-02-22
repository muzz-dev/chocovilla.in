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
        primary: {
          brown: '#1A0F0A', // Deep chocolate brown
          dark: '#0F0A08', // Rich dark brown-black
          gold: '#C9A96E', // Muted elegant gold
          cream: '#F8F4F0', // Warm soft cream
          beige: '#D4C4B7', // Muted beige for secondary text
        },
        accent: {
          gold: '#C9A96E',
          cream: '#F8F4F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
