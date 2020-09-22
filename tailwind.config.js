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
        primary: '#A22122',
        secondary: '#047404',
        sec: {
          dark: '#D8D8D8',
          medium: '#ECECEC',
          light: '#FAFAFA',
        },
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
