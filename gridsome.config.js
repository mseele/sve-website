const tailwind = require('tailwindcss')
const postcssFocusVisible = require('postcss-focus-visible')
const autoprefixer = require('autoprefixer')

const postcssPlugins = [tailwind(), postcssFocusVisible(), autoprefixer()]

module.exports = {
  siteName: 'SV Eutingen 1947 e.V.',
  siteDescription:
    'Auf der offiziellen Website des SV Eutingen 1947 e.V. findest Du alle Informationen über die Teamsport-, Fitness- und Veranstaltungsangebote des Vereins im Herzen von Baden-Württemberg.',
  siteUrl: 'https://www.sv-eutingen.de',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/touchicon.png',
  },
  plugins: [
    { use: '@gridsome/plugin-sitemap' },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-156250391-1',
        disabled: process.env.BETA,
      },
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
}
