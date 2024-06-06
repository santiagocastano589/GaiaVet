/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-border': '#00E3CC',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-2-white': {
          '-webkit-text-stroke': '3px white',
          'text-stroke': '2px white',
        },
      });
    },
  ],
}
