module.exports = {
  // needed until vuetify has been removed
  prefix: 'tw-',
  important: true,
  corePlugins: {
    preflight: false,
  },
  // needed until vuetify has been removed
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#EEEEEE',
          400: '#E0E0E0',
          500: '#BDBDBD',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      spacing: {
        14: '3.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
