/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        diagnosis: '#3b82f6',      // blue-500
        differential: '#0ea5e9',   // sky-500  
        action: '#f97316',         // orange-500
        completed: '#22c55e',      // green-500
      }
    },
  },
  plugins: [],
}