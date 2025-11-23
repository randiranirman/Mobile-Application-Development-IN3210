/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#E50914',
        secondary: '#564d4d',
        dark: '#141414',
        darker: '#000000',
      }
    },
  },
  plugins: [],
}