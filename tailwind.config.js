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
          white: "#fafaf6",
          whiteSelected: "#A8D5E2",
          black: "#4B5563",
          blackSelected: "#374151",

          highlight: "#93C5FD",
          highlightSelected: "#60A5FA",

          muted: "#9CA3AF",
          mutedSelected: "#6B7280",

          text_on_white: "#000000",
          text_on_black: "#ffffff",
          text_on_muted: "#000000",
          text_on_highlighted: "#ffffff",

          border: "#374151",
          rootBorder: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};
