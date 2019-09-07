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
          cn: '上传教师信息'
        }, {
          path: '/uploadCourse',
          name: 'uploadCourse',
          cn: '上传课程信息'
        }, {
          path: '/uploadStudent',
          name: 'uploadStudent',
          cn: '上传学生选课信息'
        }
      ]
    },
    {
      path: '/studentEvaluate',
      name: 'StudentEvaluate',
      cn: '学生评价',
      icon: 'el-icon-chat-dot-square',
      child: [
        {
          path: '/studentEvaluate',
          name: 'studentEvaluate',
          cn: '本期评价'
        }
      ]
    },
    {
      path: '/teacherEvaluate',
      name: 'TeacherEvaluate',
      cn: '教师评价',
      icon: 'el-icon-chat-dot-square',
      child: [
        {
          path: '/teacherEvaluate',
          name: 'TeacherEvaluate',
          cn: '本期评价'
        }
      ]
    }
  ]
}
