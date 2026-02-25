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
          50: '#E6F2EB',
          100: '#C2E0D0',
          200: '#8CC5A5',
          300: '#56AA7A',
          400: '#208F4F',
          500: '#006837', // Deep Professional Green
          600: '#00552D',
          700: '#004223',
          800: '#002F19',
          900: '#001C0F',
        },
        secondary: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#ADB5BD',
          500: '#1A1A2E', // Dark Navy
          600: '#151524',
          700: '#10101A',
          800: '#0A0A10',
          900: '#050508',
        },
        accent: {
          green: '#006837',
          darkGreen: '#004223',
          lightGreen: '#8CC5A5',
          navy: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(0,104,55,0.95) 0%, rgba(0,66,35,0.90) 100%)",
        'green-gradient': "linear-gradient(135deg, #006837 0%, #8CC5A5 50%, #006837 100%)",
      },
      boxShadow: {
        'green': '0 4px 20px rgba(0, 104, 55, 0.25)',
        'green-lg': '0 10px 40px rgba(0, 104, 55, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 104, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(0, 104, 55, 0)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
