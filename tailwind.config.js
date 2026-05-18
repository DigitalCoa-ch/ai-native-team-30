/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0b1929",
          800: "#0f2942",
          700: "#14365b",
        },
        gold: {
          DEFAULT: "#c8a951",
          light: "#e8d5a3",
          dark: "#a88a3a",
        },
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(135deg, #0b1929 0%, #0f2942 50%, #14365b 100%)",
      },
    },
  },
  plugins: [],
};