import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#176E41',
        secondary: '#0B5E80',
        surface: '#F7FAFC',
        card: '#FFFFFF',
        accent: '#43B581',
        danger: '#E53E3E',
      },
      boxShadow: {
        soft: '0 16px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
