/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        'red': '0 4px 6px #ffca0080',
        'green': '0 4px 6px rgba(0, 255, 0, 0.5)',
        // Add more colors as needed
      },
    },
  },
  plugins: [],
}