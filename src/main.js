import defaultLayout from '@/layouts/default'
import scrollBehavior from '@/util/scrollBehavior'

require('@/assets/tailwind.css')
require('inter-ui/inter-hinted.css')
require('@glidejs/glide/dist/css/glide.core.min.css')
require('@glidejs/glide/dist/css/glide.theme.min.css')

export default function (Vue, { head, router }) {
  head.meta.push({
    name: 'theme-color',
    content: '#991B1B',
  })

  // customize scrollBehavior
  router.options.scrollBehavior = (...args) => scrollBehavior(...args)
  Vue.component('Layout', defaultLayout)
}
