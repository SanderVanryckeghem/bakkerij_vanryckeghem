// Single source of truth for all colors
// Used by both Tailwind config and SCSS files

const colors = {
  // Bakery Color Palette - Subtle & Elegant
  bakery: {
    cream: '#F5F0E8',
    'cream-dark': '#E8DED0',
    brown: '#2D2D2D',
    'brown-dark': '#1A1A1A',
    'brown-light': '#5A5A5A',
    gold: '#D4A574',
    'gold-dark': '#B8906A',
    'gold-light': '#E0B98A',
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
    light: 'rgba(45, 45, 45, 0.06)',
    medium: 'rgba(45, 45, 45, 0.1)',
    dark: 'rgba(45, 45, 45, 0.2)',
    darker: 'rgba(45, 45, 45, 0.08)',
    darkest: 'rgba(45, 45, 45, 0.15)',
  },
  gold: {
    light: 'rgba(212, 165, 116, 0.3)',
    medium: 'rgba(212, 165, 116, 0.4)',
  },
  black: 'rgba(0, 0, 0, 0.3)',
};

// Overlay colors (rgba values)
const overlays = {
  cream: 'rgba(245, 240, 232, 0.1)',
  'cream-medium': 'rgba(245, 240, 232, 0.7)',
  'brown-dark': 'rgba(26, 26, 26, 0.85)',
  brown: 'rgba(45, 45, 45, 0.7)',
};

module.exports = { colors, shadows, overlays };
