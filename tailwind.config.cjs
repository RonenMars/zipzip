const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
        ...colors,
      purple: {
        DEFAULT: '#D7BBF5',
        100: '#8E6AD0',
        200: '#6C4EB0',
        300: '#7757BA',
        500: '#6044A5',
      },
      white: '#FFFFFF',
      black: '#000000',
      red: '#FF0000',
    },
  },
  plugins: [],
};
