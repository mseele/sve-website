import Vue from 'vue'
import vueAnalytics from 'vue-analytics'

const ua = 'UA-156250391-1'
const getGDPR = localStorage.getItem('gdpr:accepted')
const production = process.env.NODE_ENV === 'production'

if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
  Vue.use(vueAnalytics, {
    id: ua,
    disabled: false,
    debug: {
      enabled: !production,
      trace: true,
      sendHitTask: production
    }
  })
} else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
  Vue.use(vueAnalytics, {
    id: ua,
    disabled: true,
    debug: {
      enabled: !production,
      trace: true,
      sendHitTask: production
    }
  })
}
