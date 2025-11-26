import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/wp-templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // BHFE Brand Colors
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#b9d9ff',
          300: '#7cbdff',
          400: '#369bff',
          500: '#0c7eff',
          600: '#0062e6',
          700: '#004db8',
          800: '#1e3a5f', // Main brand blue
          900: '#00213a',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fff3c6',
          200: '#ffe588',
          300: '#ffd24a',
          400: '#ffb300', // Main brand gold
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              fontFamily: 'Playfair Display, serif',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

