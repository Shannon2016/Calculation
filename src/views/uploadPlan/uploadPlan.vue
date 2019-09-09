<template>
    <div class="pic">
      <el-row class='contentTitle'>
        <el-col :span='24'>管理培养方案</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='uploadTitle' >当前是{{semester}}学年，请您上传以下文件：</div>
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
                action="/upload/cultivatePlan"
                :on-exceed="handleExceed"
                :file-list="fileList1">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success" @click="submitUpload">提交</el-button>
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
        <img src="./../../assets/培养标准矩阵.png" style='width:100%;'>
      </el-dialog>
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
        title: '1、上传培养方案',
        tips: '注：培养方案包含课程代码、课程名称、学分、学时等。'
      },
      fileList1: [],
      upload2: {
        title: '2、上传培养方案矩阵',
        tips: '注：培养实现矩阵包含毕业要求点及每门课程针对各要求点的分数占比。'
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
    },
    submitUpload () {
      let list = document.getElementsByClassName('el-upload-list__item is-ready')
      if (list.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要导入的模板！'
        })
        return
      }
      var fileValue = document.querySelector('.el-upload .el-upload__input')
      // eslint-disable-next-line no-undef
      this.$ajaxPost(
        '/api/upload/cultivatePlan',
        {
          'fileType': 'category',
          'file': fileValue.files[0]
        }
      ).then(res => {
        this.$alert('上传成功')
      }).catch(res => {
        this.$alert('上传失败')
      })
      //
      //
      // this.$refs.upload.submit()
    }
  }
}
</script>
<style scoped>
    .uploadContainer{
        margin: 25px 0;
        padding: 0 0px;
    }

    .uploadTitle{
        font-size: large;
        color: #032B48;
        font-weight: bold;
        margin-top: 3%;
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
