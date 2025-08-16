/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#E38B2B",
        primaryDark: "#D47A1B",
        accent: "#F2B441",
        cream: "#FFF4E5",
        brown: "#3F2A1D",
        charcoal: "#1E1B18",
      },
      fontFamily: {
        open: ["Open Sans"],
        Poppins: ["Poppins"],
        roboto: ["Roboto Condensed"],
        quicksand: ["Quicksand"],
      },
    },
  },
  plugins: [],
};
