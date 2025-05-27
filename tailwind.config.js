/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orb-red': '#FF3333',
        'gray': {
          900: '#111111',
          800: '#333333',
          600: '#555555',
          500: '#777777',
          400: '#999999',
          300: '#BBBBBB',
        },
        'dove-gray': '#666666',
        'emperor': '#555555',
      },
      fontFamily: {
        'instrument': ['Instrument Serif', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        shimmer: 'shimmer 8s infinite',
        pulse: 'pulse 2s infinite',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
          '100%': { backgroundPosition: '0% center' },
        },
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
} 