module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {

      'mobile': '400px',
      // => @media (min-width: 400px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        'Lato' : ['Lato', 'sans-serif'],
        'Source' : ['Source Sans Pro', 'sans-serif'],
        'Paytone': ['Paytone One', 'sans-serif'],
        'Pacifico': ['Pacifico', 'cursive'],
        'Poppins': ['Poppins', 'sans-serif'],

      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)'
      }
    },
  },
  variants: {
    extend: {},
    display: ['responsive', 'group-hover', 'group-focus']
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
