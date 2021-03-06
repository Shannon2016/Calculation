import Vue from 'vue'
import Router from 'vue-router'
import echarts from 'echarts'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
Vue.prototype.$echarts = echarts
export default new Router({
  routes: [{
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
  }, {
    path: '/uploadTeacherCourse',
    name: 'uploadTeacherCourse',
    component: () => import(`@/views/uploadCourse/uploadTeacherCourse`)
  }, {
    path: '/studentEvaluate',
    name: 'StudentEvaluate',
    component: () => import(`@/views/StudentEvaluate`)
  }, {
    path: '/studentDetail/:courseName/:courseNumber/:courseSemester/:courseId',
    name: 'StudentDetail',
    component: () => import(`@/views/StudentDetail`)
  }, {
    path: '/studentPast',
    name: 'StudentPast',
    component: () => import(`@/views/StudentPast`)
  }, {
    path: '/teacherEvaluate',
    name: 'TeacherEvaluate',
    component: () => import(`@/views/TeacherEvaluate`)
  }, {
    path: '/teacherPast',
    name: 'TeacherPast',
    component: () => import(`@/views/TeacherPast`)
  }, {
    path: '/result',
    name: 'Result',
    component: () => import(`@/views/Result`)
  }, {
    path: '/download',
    name: 'Download',
    component: () => import(`@/views/Download`)
  }
  ]
})
