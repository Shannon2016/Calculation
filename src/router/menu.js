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
      cn: '管理培养方案',
      icon: 'el-icon-folder'
    },
    {
      path: '/uploadTeacher',
      name: 'uploadTeacher',
      cn: '管理其他信息',
      icon: 'el-icon-upload',
      child: [
        {
          path: '/uploadTeacher',
          name: 'uploadTeacher',
          cn: '上传教师信息',
          icon: 'el-icon-data-analysis'
        }, {
          path: '/uploadCourse',
          name: 'uploadCourse',
          cn: '上传课程信息',
          icon: 'el-icon-notebook-1'
        }, {
          path: '/uploadStudent',
          name: 'uploadStudent',
          cn: '上传学生选课信息',
          icon: 'el-icon-thumb'
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
