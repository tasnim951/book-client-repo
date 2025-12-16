/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        skyblue: "#87CEEB", 
      },
      fontFamily: {
        stylish: ["Poppins", "sans-serif"], 
      },
    },
  },
  plugins: [],
};
