import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    resizeVersion: 0,
    fullScreen: false
  },
  mutations: {
    resize (state) {
      state.resizeVersion++
    },
    toggleFullscreen (state) {
      state.fullScreen = !state.fullScreen
    }
  }
})

export default store
