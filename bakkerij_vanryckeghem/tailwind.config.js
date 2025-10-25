/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bakery': {
          cream: '#F5F0E8',
          'cream-dark': '#E8E3DB',
          brown: '#5C3D2E',
          'brown-light': '#7A5A48',
          'brown-dark': '#3D2820',
          gold: '#F5A623',
          'gold-light': '#F7B84D',
          'gold-dark': '#D89419',
        },
      },
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
        'card': '0 4px 6px -1px rgba(92, 61, 46, 0.1), 0 2px 4px -1px rgba(92, 61, 46, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(92, 61, 46, 0.2), 0 4px 6px -2px rgba(92, 61, 46, 0.1)',
      },
    },
  },
  plugins: [],
}