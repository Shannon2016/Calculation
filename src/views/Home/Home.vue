<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>个人信息</el-col>
      </el-row>
      <el-divider></el-divider>
        <div class='contentStyle'>您好，{{username}}！</div>
        <div class='contentStyle'>您的工号是{{number}}。</div>
        <div class='contentStyle'>若您需要修改密码及个人姓名，请
          <el-button type='text' @click='showFlag=true'>点击此处</el-button>
        </div>
        <el-form v-if='showFlag' :model="form" label-width="120px" class='formStyle'>
          <el-form-item label='个人姓名'>
            <el-input v-model='form.name'></el-input>
          </el-form-item>
          <el-form-item label='原密码'>
            <el-input v-model='form.originPassword' type='password'></el-input>
          </el-form-item>
          <el-form-item label='新密码'>
            <el-input v-model='form.newPassword' type='password'></el-input>
          </el-form-item>
          <el-form-item label='确认密码'>
            <el-input v-model='form.confirmPassword' type='password'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="lightbutton" @click='modifyInfo'>确认修改</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
import HomeFrame from './HomeFrame'
import AppMenu from './../../components/menu/AppMenu'
import global from './../../store/global.js'
export default {
  name: 'Home',
  components: {
    HomeFrame,
    AppMenu
  },
  data () {
    return {
      username: '_________',
      number: '__________',
      showFlag: false,
      form: {
        name: '',
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted () {
    console.log(global.userId)
    this.$ajaxPost(
      '/api/user/getInfo',
      {
        userId: global.userId + ''
      }
    ).then(res => {
      console.log(res)
      this.username = res.data.data.realName
      this.number = res.data.data.username
    }).catch(res => {
      console.log(res)
    })
  },
  methods: {
    modifyInfo () {
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.$err('新密码不一致，请重新输入')
        return
      }
      this.$ajaxPost(
        '/api/user/updateInfo',
        {
          userId: global.userId + '',
          newPassword: this.form.newPassword,
          newRealName: this.form.name
        }
      ).then(res => {
        this.$success('密码修改成功')
        global.token = null
        this.$store.commit('logout')
      }).catch(res => {
        this.$err()
      })
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
