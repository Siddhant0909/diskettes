/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kalam: ["Kalam", "cursive"],
        ibmsans: ["IBM Plex Sans", "sans-serif"],
        ibmcondensed: ["IBM Plex Sans Condensed", "sans-serif"],
        caveat: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
