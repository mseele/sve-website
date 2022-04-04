const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx,json}'],
  options: {
    safelist: ['list-disc	', 'list-inside'],
  },
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.red.800'),
              'border-radius': '0.25rem',
              '&:focus': {
                outline: '2px solid transparent',
                'outline-offset': '2px',
              },
              '&:focus-visible': {
                '--tw-ring-offset-shadow':
                  'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                '--tw-ring-shadow':
                  'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                'box-shadow':
                  'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
                '--tw-ring-opacity': '1',
                '--tw-ring-color':
                  'rgba(168, 162, 158, var(--tw-ring-opacity))',
                '--tw-ring-opacity': '0.5',
                '--tw-ring-offset-width': '2px',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('prettier-plugin-tailwindcss'),
  ],
}
