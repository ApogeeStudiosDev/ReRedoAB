module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        glassGreen: 'rgba(0,255,136,0.70)',
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(255,255,255,0.08) inset',
      },
      backdropBlur: {
        xs: '4px',
        sm: '7.76px',
        md: '20px',
        xl: '32px',
      },
      borderRadius: {
        glass: '12px',
        pill: '100px',
      },
    },
  },
  plugins: [],
}; 