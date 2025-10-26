// Single source of truth for all colors
// Used by both Tailwind config and SCSS files

const colors = {
  // Bakery Color Palette
  bakery: {
    cream: '#F5F5DC',
    'cream-dark': '#E8DED0',
    brown: '#5C3D2E',
    'brown-dark': '#3D2820',
    'brown-light': '#7A5A48',
    gold: '#F5A623',
    'gold-dark': '#D4921F',
    'gold-light': '#F7B84B',
  },

  // Neutral colors
  white: '#FFFFFF',
  gray: {
    light: '#FAFAF8',
    medium: '#B8A89A',
  },

  // Semantic colors
  error: {
    DEFAULT: '#DC2626',
    light: '#FEE2E2',
    border: '#FECACA',
    dark: '#991B1B',
  },
  success: {
    DEFAULT: '#065F46',
    light: '#D1FAE5',
    border: '#A7F3D0',
  },
};

// Shadow colors (rgba values)
const shadows = {
  brown: {
    light: 'rgba(92, 61, 46, 0.06)',
    medium: 'rgba(92, 61, 46, 0.1)',
    dark: 'rgba(92, 61, 46, 0.2)',
    darker: 'rgba(92, 61, 46, 0.08)',
    darkest: 'rgba(92, 61, 46, 0.15)',
  },
  gold: {
    light: 'rgba(245, 166, 35, 0.3)',
    medium: 'rgba(245, 166, 35, 0.4)',
  },
  black: 'rgba(0, 0, 0, 0.3)',
};

// Overlay colors (rgba values)
const overlays = {
  cream: 'rgba(245, 240, 232, 0.1)',
  'cream-medium': 'rgba(245, 240, 232, 0.7)',
  'brown-dark': 'rgba(61, 40, 32, 0.85)',
  brown: 'rgba(92, 61, 46, 0.7)',
};

module.exports = { colors, shadows, overlays };
