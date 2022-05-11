const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "src/**/*.{ts,tsx,js,jsx}",
    "pages/**/*.{ts,tsx,js,jsx}",
    "index.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
      },
    },
  },
  plugins: [],
};
