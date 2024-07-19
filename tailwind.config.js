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
        'header' : '#19C5B3',
        'buttonProducts': '#1E6C64',

        'blue-border': '#32A89C',
        'fondoTarjeta': '#0D332F',
        'FondoPet': '#D2F9F5',
      },
      backgroundImage: {
        'fondo': "url('src/assets/FondoPatitas.svg')",
        'fondo1': "url('src/assets/peluqueria4.jpg')",
      },
      height:{
        'MenuNav': '35rem'
      },
      borderRadius:{
        'mapBorder':'6rem'
      },
      boxShadow:{
        'formShadow':'0px 0px 10px -5px #000 '
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
