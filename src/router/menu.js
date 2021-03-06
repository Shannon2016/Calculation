export default {
  common: [
    {
      path: '/home',
      name: 'Home',
      title: '个人中心',
      icon: 'el-icon-user',
      order: 1
    }
  ],
  professor: [
    {
      path: '/adminUsers',
      name: 'AdminUsers',
      title: '用户管理',
      icon: 'el-icon-menu',
      order: 2
    },
    {
      path: '/uploadPlan',
      name: 'UploadPlan',
      title: '管理培养方案',
      icon: 'el-icon-menu',
      order: 3
    },
    {
      path: '/uploadTeacher',
      name: 'uploadTeacher',
      title: '管理其他信息',
      icon: 'el-icon-upload',
      order: 4,
      child: [
        {
          path: '/uploadTeacher',
          name: 'uploadTeacher',
          title: '上传教师信息'
        }, {
          path: '/uploadTeacherCourse',
          name: 'uploadTeacherCourse',
          title: '上传教师开课信息'
        }, {
          path: '/uploadCourse',
          name: 'uploadCourse',
          title: '上传课程信息'
        }, {
          path: '/uploadStudent',
          name: 'uploadStudent',
          title: '上传学生选课信息'
        }
      ]
    },
    {
      path: '/result',
      name: 'Result',
      title: '查看结果',
      icon: 'el-icon-folder',
      order: 7
    }
  ],
  admin: [
    {
      path: '/adminUsers',
      name: 'AdminUsers',
      title: '用户管理',
      icon: 'el-icon-menu',
      order: 2
    },
    {
      path: '/uploadTeacher',
      name: 'uploadTeacher',
      title: '管理其他信息',
      icon: 'el-icon-upload',
      order: 4,
      child: [
        {
          path: '/uploadTeacher',
          name: 'uploadTeacher',
          title: '上传教师信息'
        }, {
          path: '/uploadTeacherCourse',
          name: 'uploadTeacherCourse',
          title: '上传教师开课信息'
        }, {
          path: '/uploadCourse',
          name: 'uploadCourse',
          title: '上传课程信息'
        }, {
          path: '/uploadStudent',
          name: 'uploadStudent',
          title: '上传学生选课信息'
        }
      ]
    },
    {
      path: '/result',
      name: 'Result',
      title: '查看结果',
      icon: 'el-icon-folder',
      order: 7
    }
  ],
  teacher: [
    {
      path: '/teacherEvaluate',
      name: 'TeacherEvaluate',
      title: '教师评价',
      icon: 'el-icon-chat-dot-square',
      order: 5
    }
  ],
  student: [
    {
      path: '/studentEvaluate',
      name: 'StudentEvaluate',
      title: '学生评价',
      order: 6,
      icon: 'el-icon-chat-dot-square'
    }
  ]
}
