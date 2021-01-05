import Vuex from 'vuex'
import defaultLayout from '@/layouts/default.vue'
import scrollBehavior from '@/util/scrollBehavior'

require('@/assets/tailwind.css')
require('inter-ui/inter-hinted.css')
require('@glidejs/glide/dist/css/glide.core.min.css')
require('@glidejs/glide/dist/css/glide.theme.min.css')

export default function (Vue, { appOptions, head, router }) {
  head.meta.push({
    name: 'theme-color',
    content: '#991B1B',
  })

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      notification_visible: false,
      notification_message: '',
      notification_type: 'info',
      events_counter: [],
    },
    mutations: {
      notification_showInfo(state, message) {
        state.notification_message = message
        state.notification_type = 'info'
        state.notification_visible = true
      },
      notification_showError(state, message) {
        state.notification_message = message
        state.notification_type = 'error'
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

  // customize scrollBehavior
  router.options.scrollBehavior = (...args) => scrollBehavior(...args)
  Vue.component('Layout', defaultLayout)
}
