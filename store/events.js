export const state = () => ({
  counter: []
})

export const mutations = {
  updateCounter(state, counter) {
    state.counter = counter
  }
}
