export const state = () => ({
  visible: false,
  message: '',
  color: 'info'
})

export const mutations = {
  showInfo(state, message) {
    state.message = message
    state.color = 'info'
    state.visible = true
  },
  showError(state, message) {
    state.message = message
    state.color = 'error'
    state.visible = true
  },
  toggleVisibility(state, visible) {
    state.visible = visible
  }
}
