/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tWhite: "rgba(231,233,234)",
        tSky: "rgb(29, 155, 240)",
      },
    },
  },
  plugins: [],
};
