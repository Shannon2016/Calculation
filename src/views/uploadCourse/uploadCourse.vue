<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>文件上传</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-steps :active="3">
        <el-step title="步骤 1" description="上传培养方案"></el-step>
        <el-step title="步骤 2" description="上传教师信息"></el-step>
        <el-step title="步骤 3" description="上传课程信息"></el-step>
        <el-step title="步骤 4" description="上传学生选课信息"></el-step>
      </el-steps>
    </div>
</template>
<script>
import uploadCourseFrame from './uploadCourseFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'uploadCourse',
  components: {
    uploadCourseFrame,
    AppMenu
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
   .menubar .title {
        width: 100%;
        justify-content: center;
        font-size: 20px;
        color: white;
        margin: 3%;
    }
    .menubar .el-menu-item{
      font-size: 16px;
      font-family: 'Microsoft YaHei';
    }
    .contentTitle{
        font-size: x-large;
        line-height: 75px;
    }
</style>
