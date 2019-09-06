<template>
    <div class='uploadContainer'>
        <div class='uploadTitle'>{{title}}</div>
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
                <el-button size="small" type="primary" @click='onUploadClicked'>点击上传</el-button>
            </el-upload>
        </div>
        <div class='uploadTips'>
            {{tips}}
            <el-button type='text' size='mini' @click='onDetailClicked'>点此查看</el-button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Upload',
  props: {
    title: {
      type: String,
      default: 'this is a title.'
    },
    tips: {
      type: String,
      default: 'this is a tip.'
    }
  },
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    onUploadClicked () {
      console.log(this.fileList)
      this.$emit('upload-click', this.fileList)
    },
    onDetailClicked () {
      this.$emit('detail-click')
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onChange (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
    },
    beforeRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
    }
  }
}
</script>
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
        font-family: Roboto;
        border: 0ch;
        font-size: 18px;
    }

    .uploadTips{
        color: #7B7B7B;
        font-size: large;
        margin-top: 15px;
    }

    .el-button--text{
      font-size: medium;
      color: rgba(3, 43, 72, 1);
      line-height: auto !important;
    }
    .el-button--text:hover{
      color:darkcyan;
    }
</style>
