/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem', 
        screens: {
          lg: '1315px', 
        },
      },
    },
  },
  plugins: [],
}
