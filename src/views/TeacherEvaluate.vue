<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>教师评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='contentTitle'>请您上传如下课程的课程评价</div>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="name"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="left"
            width="200">
             <template slot-scope="scope">
                 <div class="is_upload" v-if="scope.row.state===1" style="color:rgb(119, 0, 2);font-weight: bolder">未上传</div>
                 <div class="is_upload" v-else  style="color: rgba(2, 43, 72, 1)">已上传</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
             <template slot-scope="scope">
                 <el-button v-if="scope.row.state===1" @click='dialogVisible=true' class="darkbutton">上传</el-button>
                 <el-button v-else class="lightbutton" @click='dialogVisible=true'>修改</el-button>
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
                :file-list="fileList">
                <el-button slot="trigger" class='darkbutton'>选取文件</el-button>
                <el-button style="margin-left: 10px;" class='lightbutton' @click="submitUpload">上传到服务器</el-button>
            </el-upload>
            <div class='uploadTips' style="margin:30px 0 15px;">注：课程评价包含学生成绩、涉及到的工程认证指标点及学生在该指标点
                获得的真实成绩平均分和该指标点的评价值。</div>
        </el-dialog>
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
      courseData: [{
        name: '111',
        state: 1
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 1
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }]
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    handleCurrentChange (val) {
      this.currentData = []
      for (let i = (val - 1) * 10; i < val * 10 && i < this.totalSize; i++) {
        this.currentData.push(this.courseData[i])
      }
    },
    onUploadClick () {
      //
    },
    onModifyClick () {
    //   this.
    },
    submitUpload () {
      //    this.$refs.upload.submit();
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
