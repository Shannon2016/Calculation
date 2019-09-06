<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>管理培养方案</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='contentTitle'>当前是{{semester}}学年，请您上传以下文件：</div>
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
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class='uploadTips'>
            {{upload2.tips}}
            <el-button type='text' size='mini' @click='onDetail2Clicked'>点此查看</el-button>
        </div>
      </div>
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
<style scoped>
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
    .el-steps--horizontal{
      margin:3%;
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
