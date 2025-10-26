const { colors, shadows } = require('./src/app/shared/styles/colors.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        'serif': ['Georgia', 'Palatino', 'Times New Roman', 'serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'section': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'card': '1rem',
        'button': '0.5rem',
      },
      boxShadow: {
        'card': `0 4px 6px -1px ${shadows.brown.medium}, 0 2px 4px -1px ${shadows.brown.light}`,
        'card-hover': `0 10px 15px -3px ${shadows.brown.dark}, 0 4px 6px -2px ${shadows.brown.medium}`,
        'gold': `0 4px 6px -1px ${shadows.gold.light}`,
        'gold-hover': `0 10px 15px -3px ${shadows.gold.medium}`,
      },
    },
  },
  plugins: [],
}
