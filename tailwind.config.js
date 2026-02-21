/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF9E6',
          100: '#FFF0C2',
          200: '#FFE08A',
          300: '#FFCF52',
          400: '#FFBF1A',
          500: '#D4A00A', // Gold
          600: '#AA8008',
          700: '#806006',
          800: '#554004',
          900: '#2B2002',
        },
        secondary: {
          50: '#E8E8E8',
          100: '#D1D1D1',
          200: '#A3A3A3',
          300: '#757575',
          400: '#474747',
          500: '#1A1A1A', // Dark
          600: '#151515',
          700: '#101010',
          800: '#0A0A0A',
          900: '#050505',
        },
        accent: {
          gold: '#D4A00A',
          darkGold: '#AA8008',
          lightGold: '#FFE08A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.85) 100%)",
        'gold-gradient': "linear-gradient(135deg, #D4A00A 0%, #FFE08A 50%, #D4A00A 100%)",
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 160, 10, 0.25)',
        'gold-lg': '0 10px 40px rgba(212, 160, 10, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 10, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(212, 160, 10, 0)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
