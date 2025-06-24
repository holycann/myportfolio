// tailwind.config.js
import fontFamily from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // Enable dark mode and custom theme switching
  darkMode: 'class',
  
  // Base Theme Configuration
  theme: {
    // Extend default theme with custom configurations
    extend: {
      // Comprehensive Color Palette
      colors: {
        // Custom Brand Colors
        brand: {
          50: '#93B1A6',
          100: '#5C8374',
          200: '#183D3D',
          300: '#040D12',
          light: '#5C8374',
          DEFAULT: '#183D3D',
          dark: '#040D12',
        },
        
        // Extended Color Variations
        primary: {
          ...colors.teal,
          custom: '#5C8374',
        },
        secondary: {
          ...colors.emerald,
          custom: '#183D3D',
        },
        
        // Semantic Colors
        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
        info: colors.blue,
        
        // Grayscale with Extended Variations
        gray: {
          ...colors.neutral,
          950: '#040D12',
          960: '#020609',
          970: '#010305',
        },
      },
      
      // Advanced Typography
      fontSize: {
        'xs': ['0.625rem', { lineHeight: '1rem' }],
        'sm': ['0.75rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      
      // Comprehensive Spacing
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '15': '3.75rem',
        '25': '6.25rem',
        '50': '12.5rem',
        '75': '18.75rem',
        '100': '25rem',
      },
      
      // Enhanced Screens
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4k': '3840px',
      },
      
      // Advanced Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      
      // Comprehensive Box Shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'custom-lg': '0 10px 15px -3px rgba(93, 131, 116, 0.2), 0 4px 6px -2px rgba(93, 131, 116, 0.1)',
      },
      
      // Advanced Background Images and Gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #5C8374, #183D3D)',
        'gradient-secondary': 'linear-gradient(to bottom, #040D12, #183D3D)',
        'gradient-brand': 'linear-gradient(135deg, #93B1A6 0%, #5C8374 50%, #183D3D 100%)',
      },
      
      // Enhanced Animations and Transitions
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      
      // Keyframes for Custom Animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      
      // Extended Opacity Levels
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },
      
      // Font Families
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
        display: ['var(--font-orbitron)', ...fontFamily.sans],
      },
    },
  },
  
  // Plugins with Advanced Configurations
  plugins: [
    // Custom Utility Plugin
    plugin(function({ addUtilities, addComponents, theme }) {
      // Custom Text Utilities
      const textUtilities = {
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-md': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-lg': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
      }
      
      // Custom Filter Utilities
      const filterUtilities = {
        '.filter-grayscale': {
          'filter': 'grayscale(100%)',
        },
        '.filter-blur': {
          'filter': 'blur(8px)',
        },
        '.filter-brightness': {
          'filter': 'brightness(1.25)',
        },
      }
      
      // Custom Component Styles
      const componentStyles = {
        '.btn-primary': {
          backgroundColor: theme('colors.primary.500'),
          color: theme('colors.white'),
          padding: theme('spacing.3'),
          borderRadius: theme('borderRadius.md'),
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
          }
        },
        '.card-elevated': {
          boxShadow: theme('boxShadow.lg'),
          borderRadius: theme('borderRadius.xl'),
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme('boxShadow.xl'),
          }
        }
      }
      
      addUtilities([textUtilities, filterUtilities], ['responsive', 'hover'])
      addComponents(componentStyles)
    }),
    
    // Optional: Add more plugins
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')
  ],
  
  // Safelist for dynamic classes
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|secondary|success|error|warning|info)/,
    }
  ],
  
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  
  future: {
    hoverOnlyWhenSupported: true,
  },
  
  experimental: {
    optimizeUniversalDefaults: true,
  }
}