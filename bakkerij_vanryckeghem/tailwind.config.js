/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bakery-cream': '#F5F0E8',
        'bakery-brown': '#5C3D2E',
        'bakery-gold': '#F5A623',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}