/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'floresta': '#2D5016',
        'musgo': '#4A7C2F',
        'onca': '#E8891A',
        'fera': '#E8395A',
        'creme': '#F5F0E8',
        'escuro': '#1A1A1A',
      },
      fontFamily: {
        'titulo': ['Playfair Display', 'serif'],
        'corpo': ['Inter', 'sans-serif'],
        'destaque': ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
