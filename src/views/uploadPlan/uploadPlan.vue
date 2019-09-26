<template>
    <div class="pic">
      <el-row class='contentTitle'>
        <el-col :span='24'>管理培养方案</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='uploadTitle'>当前是{{semester}}学年，请您上传以下文件，并填写对应年份：</div>
      <el-row type='flex' align="middle" class='uploadContainer'>
        <el-col :span='5' class='uploadTitle' style='margin-top:0;'>1.培养方案及矩阵对应年份：</el-col>
        <el-col :span='7'><el-input v-model="grade"></el-input></el-col>
      </el-row>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload1.title}}</div>
        <div class='uploadBtn'>
            <el-upload
                class="upload-demo"
                accept=".xls,.xlsx"
                :limit="1"
                ref="upload"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange1'
                :before-remove='beforeRemove1'
                :http-request="submitUpload2"
                action="/upload/cultivatePlan"
                :on-exceed="handleExceed"
                :file-list="fileList1">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
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
        <img src="./../../assets/培养方案.png" style='width:100%;'>
      </el-dialog>
      <div class='uploadContainer'>
        <div class='uploadTitle'>{{upload2.title}}</div>
        <div class='uploadTips'>
            {{upload2.tips}}
            <el-button type='text' size='mini' @click='dialog2Visible=true'>点此查看</el-button>
        </div>
        <div class='uploadBtn'>
            <el-upload
                class="upload-demo"
                :multiple="false"
                :auto-upload="false"
                :on-change='onChange2'
                :before-remove='beforeRemove2'
                action="/upload/cultivateMatrix"
                :limit="1"
                :on-exceed="handleExceed"
                ref="upload2"
                :http-request="submitUpload2"
                :file-list="fileList2">
                <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
                <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success" @click="hhh2" :loading='loadingFlag2'>提交</el-button>
            </el-upload>
        </div>
      </div>
      <el-dialog
        title="示例"
        :visible.sync="dialog2Visible">
        <img src="./../../assets/培养标准矩阵.png" style='width:100%;'>
      </el-dialog>

      <div class='uploadTitle' >往期培养方案及矩阵</div>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="grade"
            label="学年（届）">
          </el-table-column>
          <el-table-column
            prop="planFilename"
            label="培养方案">
            <template slot-scope="scope">
              <a :href="'/api/file/download/'+scope.row.planId">{{scope.row.planFilename}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="matrixFilename"
            label="培养矩阵">
            <template slot-scope="scope">
              <a :href="'/api/file/download/'+scope.row.matrixId">{{scope.row.matrixFilename}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
            <template slot-scope="scope">
              <el-button class="darkbutton"
                @click="deletePlan(scope.$index, scope.row)">删除</el-button>
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
import uploadPlanFrame from './uploadPlanFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'uploadPlan',
  components: {
    uploadPlanFrame,
    AppMenu
  },
  data () {
    return {
      dialog1Visible: false,
      dialog2Visible: false,
      semester: '2019~2020',
      upload1: {
        title: '2、上传培养方案',
        tips: '注：培养方案包含课程代码、课程名称、学分、学时等。'
      },
      uploadBuf: [],
      fileList1: [],
      upload2: {
        title: '3、上传培养方案矩阵',
        tips: '注：培养实现矩阵包含毕业要求点及每门课程针对各要求点的分数占比。'
      },
      fileList2: [],
      loadingFlag: false,
      loadingFlag2: false,
      currentData:[],
      currentPage: 1,
      totalSize: 25,
      grade:''
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    hhh2 () {
      this.uploadBuf = []
      this.$refs.upload.submit()
      this.$refs.upload2.submit()
      this.loadingFlag2 = true
      this.$ajaxPostFile(
         '/api/plan/upload',
        {
          grade: parseInt(this.grade),
          matrix: this.uploadBuf[1].file,
          plan: this.uploadBuf[0].file
        },
        {
          onUploadProgress: progressEvent => {
            console.log(111)
            let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
            console.log(this.$refs.upload)
            console.log(percent)
            this.uploadBuf[0].onProgress({percent: percent})
            this.uploadBuf[1].onProgress({percent: percent})
          }
        }
      ).then(res => {
        console.log(res)
        if(res.data.code === 0){
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
          this.handleCurrentChange(1)
        } else {
          this.$message.error('上传失败！')
        }
        this.loadingFlag2 = false
      }).catch(res => {
        this.$message.error('上传失败！')
        this.loadingFlag2 = false
      })
    },
    // hhh () {
      // this.$refs.upload.submit()
    // },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
    submitUpload2 (param) {
      this.uploadBuf.push(param)
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.$ajaxGet(
        '/api/plan/page',
        {
          pageIndex: index,
          pageSize: 10
        }
      ).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.totalSize = res.data.data.total
          this.currentData = res.data.data.resultList
        } else {
          this.$err('系统错误')
        }
      }).catch(res => {
        console.log(res)
      })
    },
    deletePlan(index, row) {
      console.log(1) 
      this.$confirm('确认删除该培养方案及矩阵吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.$ajaxPost(
          '/api/plan/delete',
          {
            id: row.id
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
    .uploadContainer{
        margin: 25px 0;
        padding: 0 0px;
    }

    .uploadTitle{
        font-size: large;
        color: #032B48;
        font-weight: bold;
        margin-top: 20px;
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
    a{
      color: rgba(2, 43, 72, 1);
    }
    .lightbutton，.el-message-box__btns button{
      border-radius: 3px;
      background-color:white;
      color: rgba(58, 100, 115, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0px;
      font-size: 16px !important;
      border: 1px solid rgba(58, 100, 115, 1);
    }
    .lightbutton:focus, .lightbutton:hover, ，.el-message-box__btns button:focus, ，.el-message-box__btns button:hover{
      background-color:rgba(210, 230, 255, 1) !important;
      border: 1px solid rgba(58, 100, 115, 1);
      color:navy;
      font-size: 16px !important;
    }
    .darkbutton, .el-message-box__btns .el-button--primary {
      border-radius: 3px;
      background-color: rgba(58, 100, 115, 1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0ch;
      font-size: 16px;
    }
    .darkbutton:focus, .darkbutton:hover, .el-message-box__btns .el-button--primary:hover, .el-message-box__btns .el-button--primary:focus{
      background-color:rgba(98, 140, 155, 1) !important;
      border: 0ch;
      color:white;
      font-size: 16px;
    }
    .el-button--mini, .el-button--small{
      font-size: 16px !important;
    }
</style>
