module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'Lato' : ['Lato', 'sans-serif'],
        'Source Sans Pro' : ['Source Sans Pro', 'sans-serif']
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
