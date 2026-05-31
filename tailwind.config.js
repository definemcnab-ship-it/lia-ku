/** Vitality & Grace 设计令牌（来自设计稿 DESIGN.md） */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Quiet Earth 简约大地色 —— 保留令牌名，仅替换色值，全站无需改类名即可换肤。
        primary: '#8f8779',
        'primary-container': '#a89f90',
        'on-primary': '#f7f5f0',
        'on-primary-container': '#4a443b',
        'primary-fixed': '#ece8e0',
        'primary-fixed-dim': '#cfc8bb',
        'inverse-primary': '#cfc8bb',
        secondary: '#8f8779',
        'secondary-container': '#cfc8bb',
        'on-secondary': '#f7f5f0',
        'on-secondary-container': '#4a443b',
        'secondary-fixed': '#ece8e0',
        tertiary: '#9e9688',
        'tertiary-container': '#cfc8bb',
        surface: '#ffffff',
        'surface-bright': '#ffffff',
        'surface-dim': '#efece6',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#faf8f5',
        'surface-container': '#f4f1ec',
        'surface-container-high': '#eeeae3',
        'surface-container-highest': '#e7e2da',
        'surface-variant': '#eeeae3',
        'on-surface': '#3f3a32',
        'on-surface-variant': '#6e675b',
        outline: '#9e9688',
        'outline-variant': '#dcd6cc',
        background: '#ffffff',
        'on-background': '#4a443b',
        error: '#a85c47',
        mint: '#ece8e0',
        lavender: '#e6e1d8',
      },
      borderRadius: { DEFAULT: '1rem', lg: '2rem', xl: '3rem', full: '9999px' },
      spacing: {
        unit: '8px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        gutter: '16px',
        'section-gap': '64px',
        'container-padding-mobile': '24px',
        'container-padding-desktop': '64px',
      },
      fontFamily: {
        headline: ['Inter', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        display: ['Inter', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        body: ['Inter', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        label: ['Inter', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      keyframes: {
        pageIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(28px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        barGrow: {
          from: { width: '0%' },
          to:   { width: 'var(--bar-w)' },
        },
        scanBeam: {
          '0%,100%': { transform: 'translateY(-10px)', opacity: '0.9' },
          '50%':     { transform: 'translateY(260px)', opacity: '0.6' },
        },
        ringDraw: {
          from: { strokeDashoffset: '251.2' },
          to:   { strokeDashoffset: 'var(--ring-offset)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.35' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'page-in':    'pageIn 0.22s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'slide-left': 'slideLeft 0.25s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'fade-in':    'fadeIn 0.3s ease-out both',
        'bar-grow':   'barGrow 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'scan-beam':  'scanBeam 2.4s ease-in-out infinite',
        'ring-draw':  'ringDraw 1s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-up':   'slideUp 0.35s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({ '.scrollbar-none': { '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } } })
    }
  ],
}
