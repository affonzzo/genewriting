/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust the paths according to your project structure
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#be9202', // Gold
        luxury: {
          900: '#0A0A0A', // Rich black
          800: '#141414',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2A2A2A',
        },
        paper: {
          light: '#f1edea', // New light mode background
          dark: '#0A0A0A'  // Dark mode background
        }
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};