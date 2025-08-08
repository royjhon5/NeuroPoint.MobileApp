/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for expo-router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        dynamic: "var(--font-size-dynamic)",
      },
    },
  },
  plugins: [],
};
