/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
