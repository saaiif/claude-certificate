/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        clay: {
          50: '#FBF3F0',
          100: '#F6E4DD',
          200: '#EBC7BA',
          300: '#DFA892',
          400: '#D48C71',
          500: '#CC785C',
          600: '#B4633F',
          700: '#965233',
          800: '#7A452C',
          900: '#653C2B',
        },
        ink: {
          50: '#F7F7F6',
          100: '#EFEEEC',
          200: '#DAD8D3',
          300: '#BFBDB6',
          400: '#9C9A91',
          500: '#76746B',
          600: '#57554F',
          700: '#3F3E39',
          800: '#2B2A27',
          900: '#1F1E1C',
          950: '#141312',
        },
        cream: {
          50: '#FCFBF8',
          100: '#FAF9F5',
          200: '#F5F3EC',
          300: '#EEEAE0',
          400: '#E2DDCF',
          500: '#D2CBBB',
        },
        moss: {
          400: '#93A98F',
          500: '#708C6C',
          600: '#587254',
          700: '#475D44',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(31,30,28,0.04), 0 8px 24px rgba(31,30,28,0.06)',
        cardHover: '0 2px 4px rgba(31,30,28,0.06), 0 16px 40px rgba(31,30,28,0.10)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'pop-in': 'popIn 0.3s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
