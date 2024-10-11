/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'custom-image': "url('/src/assets/pencilNote.png')",
      },
      backgroundPosition: {
        'custom-pos': 'center 20%', 
      }
    },
  },
  variants: {},
  plugins: [],
}

