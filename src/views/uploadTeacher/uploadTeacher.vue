<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>教师信息管理</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload.title}}</div>
        <div class='uploadBtn'>
            <el-upload
                class="upload-demo"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange'
                :before-remove='beforeRemove'
                action="/uploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class='uploadTips'>
            {{upload.tips}}
            <el-button type='text' size='mini' @click='dialogVisible=true'>点此查看</el-button>
        </div>
      </div>
      <el-dialog
        title="示例"
        :visible.sync="dialogVisible">
        <img src="./../../assets/教师信息表.png" style='width:100%;'>
      </el-dialog>
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
      dialogVisible: false,
      upload: {
        title: '1、上传教师信息列表',
        tips: '注：教师信息列表包含教师的基本信息——姓名、工号等。'
      },
      fileList: []
    }
  },
  mounted () {
  },
  methods: {
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onChange (file, fileList) {
      this.fileList = fileList
    },
    beforeRemove (file, fileList) {
      this.fileList = fileList
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
    .el-upload-list{
      width:auto;
      background-color: rgba(0, 255, 85, 0.035) ;
    }
</style>

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
