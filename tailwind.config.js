module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noun-green': '#019737',
        'noun-red': '#e20010',
        'noun-warm': '#E1D7D5',
        'noun-cool': '#D5D7E1',
      },
      fontFamily: {
        'nouns': ['Londrina Solid', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
