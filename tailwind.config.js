/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#6d5efc',
          DEFAULT: '#6d5efc',
          dark: '#4d7bff',
        },
        accent: '#2ad4ee',
        bg: {
          light: '#f8fafc',
          dark: '#070a12',
        },
        panel: {
          light: '#ffffff',
          dark: '#0c101c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
