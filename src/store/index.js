import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    resizeVersion: 0,
    fullScreen: false,
    ifLogin: false
  },
  mutations: {
    resize (state) {
      state.resizeVersion++
    },
    toggleFullscreen (state) {
      state.fullScreen = !state.fullScreen
    },
    login (state) {
      state.ifLogin = true
    },
    logout (state) {
      state.ifLogin = false
    }
  }
})

export default store
