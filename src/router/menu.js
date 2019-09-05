export default {
  menu: [
    {
      path: '/home',
      name: 'Home',
      cn: '个人中心',
      icon: 'el-icon-user'
    },
    {
      path: '/adminUsers',
      name: 'AdminUsers',
      cn: '用户管理',
      icon: 'el-icon-menu'
    },
    {
      path: '/uploadPlan',
      name: 'uploadPlan',
      cn: '文件上传',
      icon: 'el-icon-folder',
      child: [
        {
          path: '/uploadPlan',
          name: 'uploadPlan',
          cn: '上传培养方案',
          icon: 'el-icon-folder'
        }, {
          path: '/uploadTeacher',
          name: 'uploadTeacher',
          cn: '上传教师信息',
          icon: 'el-icon-folder'
        }, {
          path: '/uploadCourse',
          name: 'uploadCourse',
          cn: '上传课程信息',
          icon: 'el-icon-folder'
        }, {
          path: '/uploadStudent',
          name: 'uploadStudent',
          cn: '上传学生选课信息',
          icon: 'el-icon-folder'
        }, {
          path: '/test',
          name: 'test',
          cn: 'test',
          icon: 'el-icon-folder'
        }
      ]
    }
  ]
  // menu: [
  //   {
  //     path: '/',
  //     name: 'Home',
  //     cn: '主页',
  //     icon: 'el-icon-s-home'
  //   },
  //   {
  //     path: '/economy',
  //     name: 'Economy',
  //     cn: '经济',
  //     icon: 'el-icon-baseball'
  //   },
  //   {
  //     path: '/ecology',
  //     name: 'Ecology',
  //     cn: '生态',
  //     icon: 'el-icon-cherry'
  //   },
  //   {
  //     path: '/population',
  //     name: 'Population',
  //     cn: '人口',
  //     icon: 'el-icon-user'
  //   }
  // ]
}
