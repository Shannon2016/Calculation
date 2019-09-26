<template>
    <div class='pic'>
      <el-row class='contentTitle'>
        <el-col :span='24'>上传课程信息</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload1.title}}</div>
        <el-row type='flex' align="middle" class='uploadContainer'>
        <el-col :span='5' class='uploadTitle' style='margin-top:0;'>课程信息对应年份：</el-col>
        <el-col :span='7'><el-input v-model="year" ></el-input></el-col>
      </el-row>
        <div class='uploadBtn'>
            <el-upload
                class="upload-demo"
                accept=".xls,.xlsx"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange1'
                :before-remove='beforeRemove1'
                action="/uploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :http-request = "submitUpload"
                ref="upload"
                :file-list="fileList1">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success" @click="hhh" :loading='loadingFlag'>提交</el-button>
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
                @click="deleteTeacherCourse(scope.$index, scope.row)">删除</el-button>
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
      semester: '2019~2020', //
      upload1: {
        title: '1、上传本学年课程列表',
        tips: '注：本学年课程列表包含当前学年开设的所有课程信息——课程名称、课程编号等。'
      },
      fileList1: [],
      upload2: {
        title: '2、上传本学年教师开设课程列表',
        tips: '注：本学年教师开设课程列表包含教师开设的对应课程的基本信息——选课课号、课程名称、开课教师姓名、课程编号等。'
      },
      fileList2: [],
      loadingFlag: false,
      loadingFlag2: false,
      currentData:[],
      currentPage: 1,
      totalSize: 25,
      year:''
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    hhh () {
      this.$refs.upload.submit()
    },
    hhh2 () {
      this.$refs.upload2.submit()
    },
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
    },
    submitUpload (param) {
      this.loadingFlag = true
      this.$ajaxPostFile(
        '/api/course/upload',
        {
          year: this.year,
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
        if(res.data.code === 0){
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
          this.loadingFlag = false
          this.handleCurrentChange(1)
        }
        else {
          this.$err('上传失败')
        }
      }).catch(res => {
        this.$message.error('上传失败！')
        this.loadingFlag = false
      })
      // if (this.fileList1.length === 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择需要导入的模板！'
      //   })
      //   return
      // }
      // var fileValue = document.querySelector('.el-upload .el-upload__input')
      // // eslint-disable-next-line no-undef
      // this.$ajaxPost(
      //   '/api/upload/courseUpload',
      //   {
      //     fileType: 'category',
      //     file: fileValue.files[0]
      //   }
      // ).then(res => {
      //   this.$alert('上传成功')
      // }).catch(res => {
      //   this.$alert('上传失败')
      // })
    },
    submitUpload1 (param) {
      this.loadingFlag2 = true
      this.$ajaxPostFile(
        '/api/upload/teacherCourseUpload',
        {
          fileType: 'category',
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
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        this.loadingFlag2 = false
      }).catch(res => {
        this.$message.error('上传失败！')
        this.loadingFlag2 = false
      })
      // if (this.fileList2.length === 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择需要导入的模板！'
      //   })
      //   return
      // }

      // var fileValue = document.querySelectorAll('.el-upload .el-upload__input')
      // var file = fileValue[1]
      // // eslint-disable-next-line no-undef
      // this.$ajaxPost(
      //   '/api/upload/teacherCourseUpload',
      //   {
      //     'fileType': 'category',
      //     'file': file.files[0]
      //   }
      // ).then(res => {
      //   this.$alert('上传成功')
      // }).catch(res => {
      //   this.$alert('上传失败')
      // })
    },
     handleCurrentChange (index) {
      this.currentPage = index
      this.$ajaxGet(
        '/api/course/page',
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
    deleteTeacherCourse(index, row) {
      console.log(row)
      this.$confirm('确认删除该教师开课信息表吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.$ajaxPost(
          '/api/course/delete',
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
