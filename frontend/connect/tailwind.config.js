/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1320px',
        },
      },
      colors: {
        'dark-bg': '#1a1a2e',
        'dark-secondary': '#16213e',
        'blue-accent': '#007aff', 
        'dark-text': '#eaeaea',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to right, #007aff, #00c6ff)',
      },
    },
  },
  plugins: [],
}

