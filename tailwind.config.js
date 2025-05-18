/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: {
          DEFAULT: "#f7f8fa", //serenity-bglight
          dark: "#2563EB", // blue-600 (no direct match)
          light: "#60A5FA", // blue-400 (no direct match)
        },
        secondary: {
          DEFAULT: "#6B7280", // gray-500 (no direct match)
          dark: "#4B5563", // gray-600 (no direct match)
          light: "#9CA3AF", // gray-400 (no direct match)
        },
        // UI specific colors
        toggle: {
          background: "#fafaf6", //serenity-key-white
          border: "rgba(0, 0, 0, 0.15)", //serenity-button-border-color",
          text: "#333333", //serenity-note-text-on-white
        },
        settings: {
          DEFAULT: "#333333", //serenity-darkgrey
          light: "#E1E3E6", //--serenity-softgrey",
        },
        // Semantic colors
        success: "#10B981", // green-500 (no direct match)
        warning: "#F59E0B", // amber-500 (no direct match)
        error: "#EF4444", // red-500 (no direct match)
      },
    },
  },
  plugins: [],
};
