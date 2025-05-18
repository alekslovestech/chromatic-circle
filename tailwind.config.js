/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // use for buttons / settings
        serenity: {
          DEFAULT: "#f7f8fa", //serenity-bglight
          dark: "#598abb", // blue-600 (no direct match)
          transparent1: "rgba(0,0,0,0.15)",
          transparent2: "rgba(0,0,0,0.30)",
          textwhite: "#ffffff",
          textblack: "#000000",
        },
        //use for piano keys
        darksky: {
          DEFAULT: "#6B7280", // gray-500
          dark: "#4B5563", // gray-600
          light: "#9CA3AF", // gray-400
        },
      },
    },
  },
  plugins: [],
};
