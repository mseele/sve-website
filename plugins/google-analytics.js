const getGDPR = localStorage.getItem('gdpr:accepted')

if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
  this.$ga.enable()
} else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
  this.$ga.disable()
}
