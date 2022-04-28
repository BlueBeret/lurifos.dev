module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
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
        },
        'fade-in-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10px)'
          },
          "100%": {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      transitionProperty: {
        'max-height':'max-height',
      },
      animation: {
        'fade-in-right': 'fade-in-right 0.5s ease-in-out',
        'fade-in-left': 'fade-in-left 0.5s ease-in-out',
        'fade-in-up': 'fade-in-up 0.5s ease-in-out',
        'fade-in-up-2': 'fade-in-up 1s ease-in-out',
        'fade-in-up-3': 'fade-in-up 1.5s ease-in-out',
        'slide-down': 'slide-down 0.5s ease-in-out',
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
