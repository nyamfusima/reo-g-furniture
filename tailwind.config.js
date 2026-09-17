/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#F5F6FB',
        panel: '#ECEFFA',
        product: '#F3F2EF',
        catalogue: '#F3F2EF',
        ink: '#111111',
        muted: '#6B7280',
        line: '#E5E7F2',
        navy: '#161B4E',
        indigo: '#4F5FE0',
        reo: '#2F6FED',
        cyan: '#22C6B0',
        canvas: '#F1F2F7',
        linen: '#F4F5FA',
        brass: '#2F6FED',
        charcoal: '#161B4E',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      maxWidth: {
        shell: '1500px',
      },
      borderRadius: {
        shell: '32px',
        panel: '30px',
        tile: '30px',
      },
      boxShadow: {
        float: '0 28px 50px -28px rgba(17, 24, 39, 0.28)',
        tile: '0 8px 20px -16px rgba(17, 17, 17, 0.18)',
        badge: '0 12px 24px -12px rgba(17, 24, 39, 0.35)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
