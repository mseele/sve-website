import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import Vuex from 'vuex'
import DefaultLayout from '@/layouts/Default.vue'
import '@/assets/styles.scss'
import scrollBehavior from '@/util/scroll-behavior'
require('typeface-roboto')

export default function (Vue, { appOptions, head, router }) {
  head.meta.push({
    name: 'theme-color',
    content: '#a22122',
  })

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      notification_visible: false,
      notification_message: '',
      notification_color: 'info',
      events_counter: [],
    },
    mutations: {
      notification_showInfo(state, message) {
        state.notification_message = message
        state.notification_color = 'info'
        state.notification_visible = true
      },
      notification_showError(state, message) {
        state.notification_message = message
        state.notification_color = 'error'
        state.notification_visible = true
      },
      notification_toggleVisibility(state, visible) {
        state.notification_visible = visible
      },
      events_updateCounter(state, counter) {
        state.events_counter = counter
      },
    },
  })

  Vue.use(Vuetify)
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      themes: {
        light: {
          primary: '#a22122',
          accent: colors.grey.darken3,
          secondary: '#047404',
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  })
  appOptions.vuetify = vuetify

  // customize scrollBehavior
  router.options.scrollBehavior = (...args) => scrollBehavior(vuetify, ...args)
  Vue.component('Layout', DefaultLayout)
}
