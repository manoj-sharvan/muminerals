/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode based on class

  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        // Define your color palette for light mode
        light: {
          primary: "#000000",
          secondary: "#ffffff",
          // Add more colors as needed
        },
        // Define your color palette for dark mode
        dark: {
          primary: "#ffffff",
          secondary: "#000000",
          // Add more colors as needed
        },
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
