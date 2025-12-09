/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // important!
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        skyblue: "#87CEEB", // custom sky blue
      },
      fontFamily: {
        stylish: ["Poppins", "sans-serif"], // optional stylish font
      },
    },
  },
  plugins: [],
};
