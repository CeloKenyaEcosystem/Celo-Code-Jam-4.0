
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'send': "url('../src/assets/streeam.svg')",
        
      }
    },
  },
  plugins: [],
}