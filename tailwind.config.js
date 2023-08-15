const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      red: colors.red,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
    colors: {
      purple: {
        DEFAULT: '#D7BBF5',
        100: '#8E6AD0',
        200: '#6C4EB0',
        300: '#7757BA',
        500: '#6044A5',
      },
      white: '#FFFFFF',
      red: '#FF0000',
    },
  },
  plugins: [],
};
