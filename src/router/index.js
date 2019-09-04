import Vue from 'vue'
import Router from 'vue-router'
import echarts from 'echarts'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
Vue.prototype.$echarts = echarts
export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: () => import(`@/views/Login/Login`)
  }, {
    path: '/home',
    name: 'Home',
    component: () => import(`@/views/Home/Home`)
  }
  ]
})
