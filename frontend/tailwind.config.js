/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF6EF',
          deep: '#F3EAD9',
          paper: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#201C1D',
          soft: '#5C5556',
          faint: '#9C9294',
        },
        coral: {
          DEFAULT: '#FF6B4A',
          deep: '#E14F30',
          soft: '#FFE4DB',
        },
        gold: {
          DEFAULT: '#F2B705',
          soft: '#FDF0C7',
        },
        teal: {
          DEFAULT: '#1F8A70',
          soft: '#DCF2EC',
        },
        border: {
          DEFAULT: '#EFE3D0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-md': ['2.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['1.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        tile: '28px',
        card: '22px',
        pill: '999px',
      },
      boxShadow: {
        coral: '0 20px 40px -16px rgba(255,107,74,0.35)',
        'coral-sm': '0 10px 24px -12px rgba(255,107,74,0.3)',
        soft: '0 16px 40px -20px rgba(32,28,29,0.18)',
        'soft-sm': '0 8px 20px -10px rgba(32,28,29,0.14)',
        gold: '0 16px 32px -14px rgba(242,183,5,0.35)',
      },
      keyframes: {
        'draw-route': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'draw-route': 'draw-route 1.2s ease-out forwards',
        'rise-in': 'rise-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.25s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};