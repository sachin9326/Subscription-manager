/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#12121A',
        'electric-indigo': '#6C63FF',
        'neon-cyan': '#00FFD1',
        'muted-white': '#E0E0FF',
        'glass-bg': 'rgba(255, 255, 255, 0.07)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #6C63FF, #00FFD1)',
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(108, 99, 255, 0.3), 0 0 5px rgba(0, 255, 209, 0.5)',
      }
    },
  },
  plugins: [],
}
