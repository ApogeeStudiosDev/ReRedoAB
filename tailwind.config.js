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
        glass: `
          0 8px 32px 0 rgba(0,0,0,0.37),
          0 2px 16px 0 rgba(0,0,0,0.12),
          inset 0 1px 0 0 rgba(255,255,255,0.4),
          inset 0 -1px 0 0 rgba(255,255,255,0.1)
        `,
        'glass-button': `
          0 4px 16px 0 rgba(0,0,0,0.25),
          0 1px 4px 0 rgba(0,0,0,0.1),
          inset 0 1px 0 0 rgba(255,255,255,0.5),
          inset 0 -1px 0 0 rgba(255,255,255,0.2)
        `,
        'glass-navbar': `
          0 16px 64px 0 rgba(0,0,0,0.15),
          0 4px 24px 0 rgba(0,0,0,0.08),
          inset 0 1px 0 0 rgba(255,255,255,0.6),
          inset 0 -1px 0 0 rgba(255,255,255,0.15)
        `,
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        '2xl': '64px',
      },
      borderRadius: {
        glass: '16px',
        pill: '100px',
      },
      backgroundImage: {
        'glass-gradient': `
          linear-gradient(135deg, 
            rgba(255,255,255,0.25) 0%, 
            rgba(255,255,255,0.10) 25%, 
            rgba(255,255,255,0.05) 50%, 
            rgba(255,255,255,0.10) 75%, 
            rgba(255,255,255,0.25) 100%
          )
        `,
        'glass-button-gradient': `
          linear-gradient(135deg, 
            rgba(255,255,255,0.35) 0%, 
            rgba(255,255,255,0.15) 25%, 
            rgba(255,255,255,0.08) 50%, 
            rgba(255,255,255,0.15) 75%, 
            rgba(255,255,255,0.35) 100%
          )
        `,
        'glass-navbar-gradient': `
          linear-gradient(135deg, 
            rgba(255,255,255,0.40) 0%, 
            rgba(255,255,255,0.20) 25%, 
            rgba(255,255,255,0.10) 50%, 
            rgba(255,255,255,0.20) 75%, 
            rgba(255,255,255,0.40) 100%
          )
        `,
      },
    },
  },
  plugins: [],
}; 