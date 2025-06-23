/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FAF9F6',
        'charcoal': '#1A1A1A',
        'accent': '#FF6B6B',
        'muted': '#666666',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'draw': 'draw 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        draw: {
          '0%': { 
            strokeDashoffset: '1000',
            strokeDasharray: '1000',
          },
          '100%': { 
            strokeDashoffset: '0',
            strokeDasharray: '1000',
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}