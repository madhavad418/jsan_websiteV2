/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jsan: {
          // Primary brand colors
          primary: '#0050a9',      // Medium blue - main brand color
          dark: '#0050a9',         // Dark blue - headings, dark backgrounds
          navy: '#0050a9',         // Alias for dark
          light: '#2d5a8a',        // Lighter blue
          accent: '#00d4ff',       // Cyan accent
          cyan: '#00d4ff',         // Alias for accent
          footer: '#0050a9',       // Footer background
          // Blue scale
          50: '#e8f4fc',
          100: '#c5d9eb',
          200: '#9fc1de',
          300: '#78a8d1',
          400: '#5b95c7',
          500: '#3e82bd',
          600: '#3574a8',
          700: '#2b6391',
          800: '#0050a9',
          900: '#163456',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Heading sizes for consistency
        'display': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['22px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body': ['16px', { lineHeight: '1.7' }],
        'small': ['14px', { lineHeight: '1.6' }],
      },
      spacing: {
        // Section spacing
        'section': '5rem',        // py-20 equivalent (80px)
        'section-lg': '6rem',     // py-24 equivalent (96px)
        'section-sm': '4rem',     // py-16 equivalent (64px)
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradientShift 15s ease infinite',
        'draw-line': 'drawLine 1.2s ease-out forwards',
        'pop-in': 'popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'flow-dot': 'flowDot 3.5s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2.4s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '70%': { transform: 'scale(1.12)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        flowDot: {
          '0%': { left: '0%', opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
