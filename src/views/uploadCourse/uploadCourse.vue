<template>
    <div class='pic'>
      <el-row class='contentTitle'>
        <el-col :span='24'>上传课程信息</el-col>
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
                :file-list="fileList1">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class='uploadTips'>
            {{upload1.tips}}
            <el-button type='text' size='mini' @click='dialog1Visible=true'>点此查看</el-button>
        </div>
      </div>
      <el-dialog
        title="示例"
        :visible.sync="dialog1Visible">
        <img src="./../../assets/本学年课程列表.png" style='width:100%;'>
      </el-dialog>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload2.title}}</div>
        <div class='uploadBtn'>
            <el-upload
                class="upload-demo"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange2'
                :before-remove='beforeRemove2'
                action="/uploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList2">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class='uploadTips'>
            {{upload2.tips}}
            <el-button type='text' size='mini' @click='dialog2Visible=true'>点此查看</el-button>
        </div>
      </div>
      <el-dialog
        title="示例"
        :visible.sync="dialog2Visible">
        <img src="./../../assets/本学年教师开设课程列表.png" style='width:100%;'>
      </el-dialog>
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
      dialog1Visible: false,
      dialog2Visible: false,
      semester: '2019~2020',
      upload1: {
        title: '1、上传本学年课程列表',
        tips: '注：本学年课程列表包含当前学年开设的所有课程信息——课程名称、课程编号等。'
      },
      fileList1: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      upload2: {
        title: '2、上传培养方案矩阵',
        tips: '注：本学年教师开设课程列表包含教师开设的对应课程的基本信息——选课课号、课程名称、开课教师姓名、课程编号等。'
      },
      fileList2: []
    }
  },
  mounted () {
  },
  methods: {
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onChange1 (file, fileList) {
      this.fileList1 = fileList
    },
    beforeRemove1 (file, fileList) {
      this.fileList1 = fileList
    },
    onChange2 (file, fileList) {
      this.fileList2 = fileList
    },
    beforeRemove2 (file, fileList) {
      this.fileList2 = fileList
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
    .pic .el-dialog{
      width:80%;
    }
</style>
<style scoped>
    .uploadContainer{
        margin: 25px 0;
        padding: 0 0px;
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
