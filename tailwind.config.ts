import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
// import typography from '@tailwindcss/typography';

const lineHeight = '1.375';

export default {
  content: [
    './index.html',
    './src/*.purs'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        'xxxs': ['0.5rem', lineHeight],
        'xxs': ['0.625rem', lineHeight],
        'xs': ['0.75rem', lineHeight],
        'sm': ['0.875rem', lineHeight],
        'base': ['1rem', lineHeight],
        'lg': ['1.125rem', lineHeight],
        'xl': ['1.25rem', lineHeight],
        '2xl': ['1.5rem', lineHeight],
        '3xl': ['1.875rem', lineHeight],
        '4xl': ['2.25rem', lineHeight],
        '5xl': ['3rem', lineHeight],
        '6xl': ['3.75rem', lineHeight],
        '7xl': ['4.5rem', lineHeight],
        '8xl': ['6rem', lineHeight],
        '9xl': ['8rem', lineHeight],
      }
    }
  },
  // plugins: [typography],
} satisfies Config

