module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sblue: '#217BF4',
        lblue: '#D4E7FE',
        sred: '#E84C4C',
        lred: '#FF858A',
        syellow: '#F4A021',
        lyellow: '#FFD085',
        black: '#0A093D',
        grey: '#656464'
      },
      keyframes: {
        'fade-in-right': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-10px)'
          },
          "100%": {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-in-left': {
          '0%': {
            opacity: 0,
            transform: 'translateX(10px)'
          },
          "100%": {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        'fade-in-right': 'fade-in-right 1s ease-in-out',
        'fade-in-left': 'fade-in-left 1s ease-in-out'
      }
    }
  },
  fontFamily: {
    sans: "Poppins"
  },
  variants: {
    extend: {}
  },
}
