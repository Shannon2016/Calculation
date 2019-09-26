<template>
    <div class="pic">
      <el-row class='contentTitle'>
        <el-col :span='24'>教师信息管理</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload.title}}</div>
        <div class='uploadBtn'>
          <el-upload
            class="upload-demo"
            accept=".xlsx, .xls"
            ref="upload"
            :multiple="false"
            :auto-upload="false"
            :on-change='onChange'
            :before-remove='beforeRemove'
            action="/upload/teacherInfo"
            :limit="1"
            :http-request = "submitUpload"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <el-button style="margin-left:10px;" size="small" icon="el-icon-upload2" type="success" @click="hhh" :loading='loadingFlag'>提交</el-button>
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
      <div class='uploadTitle' >往期教师信息</div>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="uploadTime"
            label="上传时间">
          </el-table-column>
          <el-table-column
            prop="planFilename"
            label="培养方案">
            <template slot-scope="scope">
              <a :href="'/api/file/download/'+scope.row.id">{{scope.row.filename}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
            <template slot-scope="scope">
              <el-button class="darkbutton"
                @click="deleteTeacher(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalSize"
        style="justify-content:center; display:flex;margin:3%">
      </el-pagination>
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
      fileList: [],
      loadingFlag: false,
      currentData:[],
      currentPage: 1,
      totalSize: 25
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    hhh () {
      this.$refs.upload.submit()
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onChange (file, fileList) {
      this.fileList = fileList
    },
    beforeRemove (file, fileList) {
      this.fileList = fileList
    },
    submitUpload (param) {
      this.loadingFlag = true
      this.$ajaxPostFile(
        '/api/teacher/upload',
        {
          file: param.file
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
        console.log(res)
        if(res.data.code !== 'error'){
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
          this.handleCurrentChange(1)
        } else {
          this.$message.error('上传失败！')
        }
        this.loadingFlag = false
      }).catch(res => {
        this.$message.error('上传失败！')
        this.loadingFlag = false
      })
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.$ajaxGet(
        '/api/teacher/page',
        {
          pageIndex: index,
          pageSize: 10
        }
      ).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.totalSize = res.data.data.total
          this.currentData = res.data.data.resultList
          for(let i = 0; i < this.currentData.length; i++) {
            this.currentData[i].uploadTime = this.currentData[i].createDate.substring(0,10)
          }
        } else {
          this.$err('系统错误')
        }
      }).catch(res => {
        console.log(res)
      })
    },
    deleteTeacher(index, row){
      console.log(row)
      this.$confirm('确认删除该教师信息表吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.$ajaxPost(
          '/api/teacher/delete',
          {
            fileId: row.id
          }
        ).then(res => {
          if (res.data.code === 0) {
            this.$message({
            type: 'success',
            message: '已删除！'
          })
          this.handleCurrentChange(this.currentPage)
          } else {
            this.$err('删除失败！')
          }
        }).catch(res => {
          console.log(res)
        })
      }).catch(action => {
        this.$message({
          type: 'error',
          message: action === 'cancel'
            ? '取消修改'
            : '停留在当前页面'
        })
      })
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
    a{
      color: rgba(2, 43, 72, 1);
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
