import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

const eventsAPI = 'https://jsonplaceholder.typicode.com/users'

export default {
  mode: 'universal',
  env: {
    eventsAPI
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - SV Eutingen 1947 e.V.',
    title: 'SV Eutingen 1947 e.V.',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Auf der offiziellen Website des SV Eutingen 1947 e.V. findest Du alle Informationen über die Teamsport-, Fitness- und Veranstaltungsangebote des Vereins im Herzen von Baden-Württemberg.'
      },
      { name: 'msapplication-TileColor', content: '#a22122' },
      { name: 'theme-color', content: '#a22122' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#fdfbf9' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-156250391-1'
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@bazzite/nuxt-optimized-images'],
  optimizedImages: {
    optimizeImages: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#a22122',
          accent: colors.grey.darken3,
          secondary: '#047404',
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Generate configuration
   */
  generate: {
    routes() {
      return axios.get(eventsAPI).then((res) => {
        return res.data.map((event) => {
          return {
            route: '/events/' + event.id,
            payload: event
          }
        })
      })
    }
  }
}
