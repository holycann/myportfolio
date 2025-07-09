// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    // Extend default breakpoints with more descriptive names
    screens: {
      'xs': '375px',     // Small mobile devices
      'sm': '640px',     // Mobile devices
      'md': '768px',     // Tablets
      'lg': '1024px',    // Laptops
      'xl': '1280px',    // Desktop
      '2xl': '1536px',   // Large desktop

      // Device-specific breakpoints
      'mobile': { 'max': '767px' },     // Mobile-only
      'tablet': { 'min': '768px', 'max': '1023px' },  // Tablet-only
      'desktop': { 'min': '1024px' },   // Desktop and above
    },

    // Extend default theme with more responsive utilities
    extend: {
      // Custom font families with fallbacks
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'mono': ['Cascadia Code', ...defaultTheme.fontFamily.mono],
      },

      // Responsive text sizes
      fontSize: {
        'responsive-xs': ['0.75rem', { lineHeight: '1rem' }],
        'responsive-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'responsive-base': ['1rem', { lineHeight: '1.5rem' }],
        'responsive-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'responsive-xl': ['1.25rem', { lineHeight: '1.75rem' }],
      },

      // Responsive spacing
      spacing: {
        'responsive-xs': '0.25rem',
        'responsive-sm': '0.5rem',
        'responsive-md': '1rem',
        'responsive-lg': '1.5rem',
        'responsive-xl': '2rem',
      },

      // Responsive container max-widths
      maxWidth: {
        'responsive-container': {
          'xs': '100%',
          'sm': '540px',
          'md': '720px',
          'lg': '960px',
          'xl': '1140px',
          '2xl': '1320px',
        }
      },

      // Responsive grid and flex utilities
      gridTemplateColumns: {
        'responsive-2': 'repeat(auto-fit, minmax(250px, 1fr))',
        'responsive-3': 'repeat(auto-fit, minmax(200px, 1fr))',
        'responsive-4': 'repeat(auto-fit, minmax(180px, 1fr))',
      },

      // Responsive opacity for hover and focus states
      opacity: {
        'hover-responsive': {
          'default': '0.8',
          'hover': '1',
          'focus': '0.9',
        }
      },

      // Responsive border radius
      borderRadius: {
        'responsive-sm': '0.25rem',
        'responsive-md': '0.5rem',
        'responsive-lg': '0.75rem',
        'responsive-full': '9999px',
      },

      // Responsive shadows
      boxShadow: {
        'responsive-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'responsive-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'responsive-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },

      // Responsive animation and transition
      transitionProperty: {
        'responsive': 'all',
      },
      transitionDuration: {
        'responsive-fast': '150ms',
        'responsive-normal': '300ms',
        'responsive-slow': '500ms',
      },

      // Responsive z-index
      zIndex: {
        'responsive-dropdown': 10,
        'responsive-modal': 50,
        'responsive-tooltip': 100,
      }
    },
  },
  plugins: [
    // Responsive utilities plugin
    function ({ addUtilities }) {
      const responsiveUtils = {
        '.responsive-hide': {
          '@screen xs': { display: 'none' },
        },
        '.responsive-show': {
          '@screen xs': { display: 'block' },
        },
        '.responsive-flex-col': {
          '@screen xs': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        },
        '.responsive-text-center': {
          '@screen xs': { textAlign: 'center' },
        },
      };

      addUtilities(responsiveUtils);
    }
  ],
  // Optimize for production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
    options: {
      safelist: ['dark'], // Ensure dark mode classes are not purged
    },
  },
}