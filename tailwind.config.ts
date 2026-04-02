import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        premium: {
          50: '#f7f7f6',
          100: '#eaeaeb',
          200: '#d7d8d6',
          300: '#babcb7',
          400: '#9b9d97',
          500: '#7c7e76',
          600: '#64665d',
          700: '#53544d',
          800: '#464741',
          900: '#3c3d38',
          950: '#232520', // Darker elegant landscape mode background
        },
        accent: {
          light: '#e1dcd1',
          DEFAULT: '#c7bcb0',
          dark: '#a89a8f'
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'premium-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
export default config;
