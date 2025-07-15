import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#4a4a4a',
        },
        status: {
          created: '#3b82f6',    // blue-500
          shipped: '#f97316',    // orange-500
          stocked: '#8b5cf6',    // purple-500
          purchased: '#10b981',  // emerald-500
        },
        accent: {
          primary: '#6366f1',    // indigo-500
          success: '#10b981',    // emerald-500
          warning: '#f59e0b',    // amber-500
          danger: '#ef4444',     // red-500
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        glow: '0 0 10px rgba(99, 102, 241, 0.5)',
        'glow-success': '0 0 10px rgba(16, 185, 129, 0.5)',
      }
    }
  },
  plugins: [ require('@tailwindcss/forms'),],
}
