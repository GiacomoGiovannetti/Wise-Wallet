/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },

      colors: {
        oxfordBlue: {
          50: '#222844',
          100: '#191D32',
          200: '#151829',
        },
        gunMetal: {
          50: '#0F3B43',
          100: '#0B2C32',
          200: '#071E21',
        },
        uranianBlue: {
          50: '#C5E6FB',
          100: '#A2D6F9',
          200: '#9FD5F9',
        },
        lightGreen: '#92E3A9',
      },
    },
  },
  plugins: [],
};
