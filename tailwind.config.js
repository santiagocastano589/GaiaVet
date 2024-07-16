/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {

        
        'buttons': '#00FFE5',
        'FondoPet': '#D2F9F5',
        'header' : '#19C5B3',

        'blue-border': '#19C5B3',
        'fondoTarjeta': '#0D332F',
      },
      backgroundImage: {
        'fondo': "url('src/assets/FondoPatitas.svg')",
        'fondo1': "url('src/assets/peluqueria4.jpg')",
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
