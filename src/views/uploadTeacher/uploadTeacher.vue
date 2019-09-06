<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>教师信息上传</el-col>
      </el-row>
      <el-divider></el-divider>
       <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload1.title}}</div>
        <div class='uploadBtn'>
            <el-upload
                class="upload-demo"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange1'
                :before-remove='beforeRemove1'
                action="/uploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class='uploadTips'>
            {{upload1.tips}}
            <el-button type='text' size='mini' @click='onDetail1Clicked'>点此查看</el-button>
        </div>
      </div>

    </div>
</template>
<script>
import uploadTeacherFrame from './uploadTeacherFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'uploadTeacher',
  components: {
    uploadTeacherFrame,
    AppMenu
  },
  data () {
    return {
      upload1: {
        title: '1、上传教师信息列表',
        tips: '注：本学年课程列表包含当前学年开设的所有课程信息——课程名称、课程编号等。'
      },
      filelist1: []
    }
  },
  mounted () {
  },
  methods: {
    onDetail1Clicked () {
      console.log(1)
    },
    onDetail2Clicked () {
      console.log(1)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onChange1 (file, fileList) {
      this.fileList1 = fileList
    },
    beforeRemove1 (file, fileList) {
      this.fileList1 = fileList
    }
  }
}
</script>
<style scoped>
 .uploadContainer{
        margin: 25px 0;
        padding: 0 15px;
    }

    .uploadTitle{
        font-size: large;
        color: #032B48;
        font-weight: bold;
    }

    .uploadBtn{
        margin-top: 15px;
    }

    .uploadBtn .el-button{
      border-radius: 3px;
      background-color: rgba(58, 100, 115, 1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0ch;
      font-size: 16px;
    }
    .uploadBtn .el-button:hover{
      background-color:rgba(98, 140, 155, 1) !important;
      border: 0ch;
      color:white;
      font-size: 16px;
    }

    .uploadTips{
        color: #7B7B7B;
        font-size: large;
        margin-top: 15px;
    }

    .el-button--text{
      font-size: medium;
      color: rgba(3, 43, 72, 1);
    }
    .el-button--text:hover{
      color:darkcyan;
    }
</style>
