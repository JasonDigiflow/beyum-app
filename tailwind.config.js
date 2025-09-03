/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beyum: {
          blue: '#00B4D8',
          blueLight: '#48CAE4',
          green: '#52D726',
          greenLight: '#7FE548',
          orange: '#FF6B35',
          orangeLight: '#FFA05C',
          yellow: '#FFD60A',
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          text: '#E2E8F0',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}