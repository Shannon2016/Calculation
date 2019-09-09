// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import global from './store/global'
import axios from 'axios'
import 'echarts/theme/dark.js'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import request from './utils/request'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$request = request
Vue.prototype.resizeVersion = 0
Vue.prototype.registedMap = {}
Vue.prototype.$err = function (info = '网络信号差') {
  this.$message({
    showClose: true,
    message: info,
    type: 'error'
  })
}
Vue.prototype.$success = function (info = '操作成功') {
  this.$message({
    showClose: true,
    message: info,
    type: 'success'
  })
}
Vue.prototype.$ajaxGet = function (url, data = {}) {
  console.log(url)
  return axios.get(
    url,
    {
      params: data,
      headers: {'Authorization': global.token}
    }
  )
}
Vue.prototype.$ajaxPost = function (url, data = {}) {
  let param = new FormData()
  for (let i in data) {
    param.append(i, data[i])
  }
  return axios.post(
    url,
    param,
    {
      headers: {'Authorization': global.token}
    }
  )
}
Vue.prototype.$ajaxPost2 = function (url, data = {}) {
  return axios.post(
    url,
    data,
    {
      headers: {
        'Authorization': global.token,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )
}
Vue.prototype.$ajaxPostFile = function (url, data = {}, config = {}) {
  let param = new FormData()
  for (let i in data) {
    param.append(i, data[i])
  }
  config.headers = {
    'Authorization': global.token,
    'Content-Type': 'application/json;charset=UTF-8'
  }
  return axios.post(
    url,
    param,
    config
  )
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    window.addEventListener('resize', () => {
      this.$store.commit('resize')
    })
  }
})
