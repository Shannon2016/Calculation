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
  }, {
    path: '/adminUsers',
    name: 'AdminUsers',
    component: () => import(`@/views/AdminUsers/AdminUsers`)
  }, {
    path: '/uploadPlan',
    name: 'uploadPlan',
    component: () => import(`@/views/uploadPlan/uploadPlan`)
  }, {
    path: '/test',
    name: 'test',
    component: () => import(`@/views/test/test`)
  }, {
    path: '/uploadTeacher',
    name: 'uploadTeacher',
    component: () => import(`@/views/uploadTeacher/uploadTeacher`)
  }, {
    path: '/uploadStudent',
    name: 'uploadStudent',
    component: () => import(`@/views/uploadStudent/uploadStudent`)
  }, {
    path: '/uploadCourse',
    name: 'uploadCourse',
    component: () => import(`@/views/uploadCourse/uploadCourse`)
  }
  ]
})
