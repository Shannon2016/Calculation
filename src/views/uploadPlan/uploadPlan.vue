<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>文件上传</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-steps :active="1">
        <el-step title="步骤 1" description="上传培养方案"></el-step>
        <el-step title="步骤 2" description="上传教师信息"></el-step>
        <el-step title="步骤 3" description="上传课程信息"></el-step>
        <el-step title="步骤 4" description="上传学生选课信息"></el-step>
      </el-steps>
      <Upload :title='upload1.title' :tips='upload1.tips' @upload-click="clickUpload1" @detail-click="clickDetail1"></Upload>
    </div>
</template>
<script>
import uploadPlanFrame from './uploadPlanFrame'
import AppMenu from './../../components/menu/AppMenu'
import Upload from './../../components/Upload'
export default {
  name: 'uploadPlan',
  components: {
    uploadPlanFrame,
    AppMenu,
    Upload
  },
  data () {
    return {
      upload1: {
        title: '1、上传培养方案',
        tips: '注：培养方案包含课程代码、课程名称、学分、学时等。'
      }
    }
  },
  mounted () {
  },
  methods: {
    clickUpload1 (fileList) {
      console.log(fileList)
    },
    clickDetail1 () {
      console.log(1)
    }
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
    .el-steps--horizontal{
      margin:3%;
    }
</style>
