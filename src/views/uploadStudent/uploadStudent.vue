<template>
  <div class="pic">
      <el-row class='contentTitle'>
        <el-col :span='24'>学生选课信息管理</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload.title}}</div>
        <div class='uploadBtn'>
<!--            :on-exceed="handleExceed"-->
<!--            :file-list="fileList">-->
            <el-upload
                class="upload-demo"
                accept=".xls,.xlsx"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange'
                :before-remove='beforeRemove'
                action="/upload/studentCourse"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                ref="upload"
                :http-request="submitUpload">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                <el-button style="margin-left:10px;" size="small" icon="el-icon-upload2" type="success" @click="hhh" :loading='loadingFlag'>提交</el-button>
            </el-upload>
        </div>
        <div :v-if='status!==""' style="margin-top:20px; font-weight:bold;">{{status}}</div>
        <div class='uploadTips'>
            {{upload.tips}}
            <el-button type='text' size='mini' @click='dialogVisible=true'>点此查看</el-button>
        </div>
      </div>
      <el-dialog
        title="示例"
        :visible.sync="dialogVisible">
        <img src="./../../assets/学生选课列表.png" style='width:100%;'>
      </el-dialog>
  </div>
</template>
<script>
import uploadStudentFrame from './uploadStudentFrame'
import AppMenu from './../../components/menu/AppMenu'
var intervalId = null
export default {
  name: 'uploadStudent',
  components: {
    uploadStudentFrame,
    AppMenu
  },
  data () {
    return {
      dialogVisible: false,
      upload: {
        title: '1、上传学生选课列表',
        tips: '注：学生选课列表包含学生选课的基本信息——学生姓名、学号、课程编号、课程名称等'
      },
      fileList: [],
      loadingFlag: false,
      status: ''
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
    },
    hhh () {
      this.$refs.upload.submit()
    },
    submitUpload (param) {
      let timeStamp = Date.parse(new Date())
      this.loadingFlag = true
      this.$ajaxPostFile(
        '/api/upload/studentCourse',
        {
          fileType: 'category',
          file: param.file,
          id: timeStamp + ''
        },
        {
          onUploadProgress: progressEvent => {
            console.log(111)
            let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
            console.log(this.$refs.upload)
            console.log(percent)
            param.onProgress({percent: percent})
          }
        }
      ).then(res => {
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        this.loadingFlag = false
      }).catch(res => {
        this.$message.success('上传成功！')
        this.loadingFlag = false
      })
      let intervalId = setInterval(() => {
        this.$ajaxGet(
          '/api/upload/queryStatus',
          {
            id: timeStamp + ''
          }
        ).then(res => {
          console.log(res)
          if (res.data.code === 'success') {
            if (res.data.data === -1) {
              this.status = '正在处理'
            } else if (res.data.data === -2) {
              this.status = ''
              console.log(1)
              clearInterval(intervalId)
            } else if (res.data.data === -3) {
              this.status = '处理失败'
            } else {
              // this.status = '已处理' + res.data.data + '条数据，请等待。'
            }
          }
        })
      }, 3000)
      param.onSuccess()
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
