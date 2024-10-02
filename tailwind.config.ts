import type { Config } from 'tailwindcss';

import { colors } from './src/styles/colors';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)'],
        serif: ['var(--font-noto-serif)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: colors,
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;

export default config;
