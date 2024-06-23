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
        'buttons': '#00FFE5',
        'header' : '#19C5B3',

        'blue-border': '#19C5B3',
      },
      backgroundImage: {
        'fondo': "url('src/assets/FondoPatitas.svg')",

      },
      height:{
        'MenuNav': '35rem'
      }
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
    require('tailwindcss-animated')
  ],
}
