<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>教师评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='contentTitle'>请您上传如下课程的课程评价</div>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="courseName"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="courseNumber"
            label="课程编号">
          </el-table-column>
          <el-table-column
            prop="statuz"
            label="状态"
            align="center"
            width="200">
             <template slot-scope="scope">
                 <div class="is_upload" v-if="scope.row.statuz!==1" style="color:rgb(119, 0, 2);font-weight: bolder">未上传</div>
                 <div class="is_upload" v-else  style="color: rgba(2, 43, 72, 1)">已上传</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
             <template slot-scope="scope">
                 <el-button v-if="scope.row.statuz!==1" @click='prepareUpload(scope.row.id)' class="darkbutton">上传</el-button>
                 <el-button v-else class="lightbutton" @click='prepareUpload(scope.row.id)'>修改</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-dialog title="上传本课程课程评价" :visible.sync="dialogVisible">
          <el-upload
                class="upload-demo"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange'
                :before-remove='beforeRemove'
                action="/uploadFile"
                :limit="1"
                :on-exceed="handleExceed"
                :http-request = "submitUpload"
                ref="upload"
                :file-list="fileList">
                <el-button slot="trigger" class='darkbutton'>选取文件</el-button>
                <el-button style="margin-left: 10px;" class='lightbutton' @click="hhh">上传到服务器</el-button>
            </el-upload>
            <div class='uploadTips' style="margin:30px 0 15px;">注：课程评价包含学生成绩、涉及到的工程认证指标点及学生在该指标点
                获得的真实成绩平均分和该指标点的评价值。</div>
        </el-dialog>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="200"
        layout="prev, pager, next, jumper"
        :total="totalSize"
        style="justify-content:center; display:flex;margin:3%">
      </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'TeacherEvaluate',
  components: {
  },
  data () {
    return {
      fileList: [],
      dialogVisible: false,
      currentPage: 1,
      totalSize: 11,
      currentData: [],
      courseData: [],
      classId: ''
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    prepareUpload (id) {
      this.dialogVisible = true
      this.classId = id
    },
    handleCurrentChange (index) {
      this.$ajaxGet(
        '/api/teacher/evaluation/page',
        {
          pageIndex: index,
          pageSize: 200
        }
      ).then(res => {
        if (res.data.code === 0) {
          console.log(res)
          this.courseData = res.data.data.resultList
          this.currentData = this.courseData
          console.log(this.courseData)
        } else {
          this.$message.error('出错了！')
        }
      }).catch(res => {
        console.log(res)
      })
    }, // this.currentPage = index
    // this.$ajaxPost(
    //   '/api/getInfo/teacherEvaluation',
    //   {
    //     pageIndex: index,
    //     pageSize: 10
    //   }
    // ).then(res => {
    //   console.log(res.data)
    //   if (res.data.code === 'success') {
    //     this.totalSize = res.data.data.total
    //     this.currentData = res.data.data.resultList
    //   } else {
    //     this.$err('系统错误')
    //   }
    // }).catch(res => {
    //   console.log(res)
    // })

    onUploadClick () {
      //
    },
    onModifyClick () {
    //   this.
    },
    hhh(){
      this.$refs.upload.submit()
    },
    submitUpload (param) {
      // let list = document.getElementsByClassName('el-upload-list__item is-ready')
      // if (list.length === 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择需要导入的模板！'
      //   })
      //   return
      // }
      // var fileValue = document.querySelector('.el-upload .el-upload__input')
      // eslint-disable-next-line no-undef
      this.$ajaxPost(
        '/api/teacher/evaluation/evaluate',
        {
          file: param.file,
          classId: this.classId
        }
      ).then(res => {
        if (res.data.code === 0) {
          this.$message({
          message: '上传成功！',
          type: 'success'
        })
          this.handleCurrentChange(1)
        } else {
          this.$message.error('上传失败！')
        }
        // this.handleCurrentChange(1)
      }).catch(res => {
        this.$alert('上传失败！')
      })
      this.dialogVisible = false
      this.fileList = []
    },
    onChange (file, fileList) {
      this.fileList = fileList
    },
    beforeRemove (file, fileList) {
      this.fileList = fileList
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
    .el-table{
      margin-top:1%;
      width:92%;
    }
    .el-table .cell{
      line-height: 16px;
      color: rgba(2, 43, 72, 1);
      font-size: 16px;
    }
    .table .el-button{
      font-size: 16px;
    }
    .darkbutton{
      border-radius: 3px;
      background-color: rgba(58, 100, 115, 1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0ch;
      font-size: 16px;
    }
    .darkbutton:focus, .darkbutton:hover{
      background-color:rgba(98, 140, 155, 1) !important;
      border: 0ch;
      color:white;
      font-size: 16px;
    }
    .lightbutton{
          border-radius: 3px;
          background-color:white;
          color: rgba(58, 100, 115, 1);
          text-align: center;
          font-family: 'Microsoft YaHei';
          border: 0px;
          font-size: 16px;
          border: 1px solid rgba(58, 100, 115, 1);
        }
    .lightbutton:focus, .lightbutton:hover{
      background-color:rgba(210, 230, 255, 1) !important;
      border: 1px solid rgba(58, 100, 115, 1);
      color:navy;
      font-size: 16px;
    }
</style>
