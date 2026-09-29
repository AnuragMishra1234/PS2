/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#070a0f',
          900: '#0d131f',
          850: '#111927',
          800: '#172234',
          700: '#23334d',
          600: '#33486a',
          500: '#47638f',
          400: '#6886b4',
          300: '#9cb3d6',
          200: '#cbd7ea',
          100: '#e7edf7',
        },
        uv: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          glow: 'rgba(168, 85, 247, 0.45)',
        },
        laser: {
          cyan: '#06b6d4',
          green: '#10b981',
          amber: '#f59e0b',
          crimson: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'scan': 'scanLine 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'conveyor': 'conveyorPattern 1.2s linear infinite',
        'uv-glow': 'uvFlicker 2s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        conveyorPattern: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '32px 0' },
        },
        uvFlicker: {
          '0%, 100%': { opacity: '0.9', filter: 'drop-shadow(0 0 16px rgba(168, 85, 247, 0.8))' },
          '50%': { opacity: '0.65', filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))' },
        }
      }
    },
  },
  plugins: [],
}
