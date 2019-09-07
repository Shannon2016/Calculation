<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>查看结果</el-col>
      </el-row>
      <el-divider></el-divider>
      <!--  -->
    </div>
</template>
<script>
import AppMenu from './../components/menu/AppMenu'
export default {
  name: 'Result',
  components: {
    AppMenu
  },
  data () {
    return {
      username: 'default name',
      number: '1120161930',
      showFlag: false,
      form: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted () {

  },
  methods: {
    modifyPassword () {
      console.log(1)
    }
  }
}
</script>
<style >
     .contentStyle .el-button{
      font-size: 23px;
      color: rgba(3, 43, 72, 1);
    }
    .contentStyle .el-button:hover{
      color:darkcyan;
    }
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
      color: white;
    }
    .menubar .el-menu-item:hover{
      transition-duration: 0.5s;
      transform: scale3d(1.0,1.03,1);
    }
.el-divider--horizontal{
    margin: 0%;
    }
    .contentTitle{
        font-size: 30px;
        line-height: 70px;
        color: rgba(3, 43, 72, 1);
    }
    .contentStyle{
      line-height:70px;
      font-size: 24px;
      color: rgba(3, 43, 72, 1);
    }
    .el-form-item__label{
      font-size: large;
      text-align:left;
    }
    .pic .el-dialog{
      width:80%;
    }
</style>
<style  scoped>
    .formStyle{
      width: 500px;
    }
     .lightbutton{
          border-radius: 1px;
          background-color:white;
          color: rgba(58, 100, 115, 1);
          text-align: center;
          font-family: Roboto;
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
