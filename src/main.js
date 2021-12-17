import defaultLayout from '@/layouts/default'
import scrollBehavior from '@/util/scrollBehavior'
import resize from 'vue-resize-directive'

require('@/assets/tailwind.css')
require('inter-ui/inter-hinted.css')
require('@glidejs/glide/dist/css/glide.core.min.css')
require('@glidejs/glide/dist/css/glide.theme.min.css')

export default function (Vue, { head, router }) {
  head.meta.push({
    name: 'theme-color',
    content: '#991B1B',
  })

  Vue.directive('resize', resize)

  // customize scrollBehavior
  router.options.scrollBehavior = (...args) => scrollBehavior(...args)
  Vue.component('Layout', defaultLayout)
}
