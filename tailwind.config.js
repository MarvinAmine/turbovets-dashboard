/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './apps/dashboard/src/**/*.{html,ts}',
    './apps/dashboard/src/index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f3f8ff',
          100: '#e6f0ff',
          200: '#cfe1ff',
          300: '#a9c7ff',
          400: '#7ca6ff',
          500: '#4a7dff',
          600: '#2f5ef2',
          700: '#2449bf',
          800: '#203f9f',
          900: '#1d377f',
          950: '#101d44',
        },
      },
      boxShadow: {
        card: '0 10px 25px -10px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl2: '1rem',
      }
    },
  },
  plugins: [],
};
