module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], //en esta línea
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        'transparent': '#00787f',
        'transparent-light': '#46d0c1',
        'transparent-dark': '#1d4a5f',
        'transparent-dark-light': '#3ed67b',
        'transparent-dark-dark': '#3e92d6',
        'transparent-dark-dark-light': '#303030',
        'transparent-dark-dark-dark': '#000000',
        'transparent-dark-dark-dark-light': '#ffffff',
        'transparent-dark-dark-dark-dark': '#a8a8a8',
        'transparent-dark-dark-dark-dark-light': '#0f2d3e',
        'transparent-dark-dark-dark-dark-dark': '#60b0b5',
        'transparent-dark-dark-dark-dark-dark-light': '#f59e0b',
        'transparent-dark-dark-dark-dark-dark-dark': '#ff0000',
        'transparent-dark-dark-dark-dark-dark-dark-light': '#383838',
        'transparent-dark-dark-dark-dark-dark-dark-dark': '#178991',
      }
     },

   },
   variants: {
     extend: {},
   },
   plugins: [],
 }