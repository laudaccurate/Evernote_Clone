module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      nav: [],
      sans: ["Roboto", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
