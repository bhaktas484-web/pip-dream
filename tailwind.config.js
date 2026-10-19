/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdfa',
          100: '#fff8f1', // Official haX warm cream
          200: '#f8eee4',
          300: '#eed9c4',
        },
        berry: {
          50: '#fdf2f5',
          100: '#f9e2eb',
          DEFAULT: '#a34063', // Official haX rich berry accent
          hover: '#8e3555',
          dark: '#68203a',
        },
        bark: {
          DEFAULT: '#5c4033', // Official haX warm espresso text
          light: '#7d5e50',
          dark: '#3d2920',
        },
        night: {
          50: '#231d36',
          100: '#1a162b',
          DEFAULT: '#100c1e', // Midnight Nursery dark background
          deep: '#0a0714',
          card: '#161224',
        },
        amberStar: {
          light: '#ffe27d',
          DEFAULT: '#f7c948', // Pip's glowing eye pinprick & lantern amber
          glow: '#ff9800',
        },
        retroMint: '#00ff66',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Playfair Display', 'Georgia', 'serif'],
        bubbly: ['"Fredoka"', 'Quicksand', 'sans-serif'],
        sans: ['"Fredoka"', 'Quicksand', 'system-ui', 'sans-serif'],
        mono: ['"Courier New"', 'Consolas', 'monospace'],
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'marquee': 'marquee 22s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(92, 64, 51, 0.9)',
        'retro-berry': '4px 4px 0px 0px rgba(163, 64, 99, 0.9)',
        'retro-amber': '4px 4px 0px 0px rgba(247, 201, 72, 0.8)',
        'retro-dark': '4px 4px 0px 0px rgba(0, 0, 0, 0.8)',
        'lantern-glow': '0 0 30px rgba(247, 201, 72, 0.45)',
        'dream-glow': '0 0 40px rgba(163, 64, 99, 0.35)',
      },
    },
  },
  plugins: [],
}
