import VueScrollTo from 'vue-scrollto'

export default function (to, from, savedPosition) {
  var options = {
    offset: -48, // default height
  }
  // use header height
  var header = document.getElementsByTagName('header')
  if (header.length == 1) {
    options.offset = -header[0].offsetHeight
  }

  if (to.hash) {
    window.requestAnimationFrame(() => {
      VueScrollTo.scrollTo(to.hash, options)
    })
    return false
  } else if (savedPosition) {
    return { x: 0, y: savedPosition.y }
  } else {
    return { x: 0, y: 0 }
  }
}
