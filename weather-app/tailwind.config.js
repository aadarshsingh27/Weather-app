module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable manual dark mode toggle
  theme: {
    extend: {
      colors: {
        primary: '#1E293B', // Slate 800
        secondary: '#0F172A', // Slate 900
        accent: '#38BDF8', // Sky 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
