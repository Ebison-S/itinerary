/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: 'rgb(var(--color-cream) / <alpha-value>)',
          deep: 'rgb(var(--color-cream-deep) / <alpha-value>)',
          paper: 'rgb(var(--color-cream-paper) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
        },
        coral: {
          DEFAULT: 'rgb(var(--color-coral) / <alpha-value>)',
          deep: 'rgb(var(--color-coral-deep) / <alpha-value>)',
          soft: 'rgb(var(--color-coral-soft) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          soft: 'rgb(var(--color-gold-soft) / <alpha-value>)',
        },
        teal: {
          DEFAULT: 'rgb(var(--color-teal) / <alpha-value>)',
          soft: 'rgb(var(--color-teal-soft) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
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
        soft: '0 16px 40px -20px rgba(0,0,0,0.25)',
        'soft-sm': '0 8px 20px -10px rgba(0,0,0,0.18)',
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