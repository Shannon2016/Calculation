<template>
  <LoginFrame>

    <div slot='top' >
        <div class="title">欢迎使用</div>
        <div class="title">工程认证指标点系统</div>
    </div>

    <div slot='center'>
    <div class="card">
        <el-input class="text" name='username' id="username" v-model="username" prefix-icon="el-icon-user"></el-input>
        <el-input type='password' class="text" name='password' id="password" v-model="password" prefix-icon="el-icon-unlock"></el-input>
        <el-button  class="button"   @click="onLogin">登录</el-button>
     </div>
    </div>

  </LoginFrame>
</template>
<script>
import LoginFrame from './LoginFrame'
import global from './../../store/global.js'
export default {
  name: 'Login',
  components: {
    LoginFrame
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      // this.$store.commit('login')
      // this.$router.push('/home')
      this.$ajaxPost(
        '/api/auth',
        {
          username: this.username,
          password: this.password
        }
      ).then(res => {
        console.log(res)
        global.token = 'Bearer ' + res.data.token
        this.$ajaxGet(
          '/api/user'
        ).then(res => {
          console.log(res)
          global.authorities = res.data.authorities
          console.log(global.authorities)
          global.userId = res.data.id
          this.$store.commit('login')
          this.$router.push('/home')
          console.log(global.userId)
        }).catch(res => {
          console.log(res)
        })
      }).catch(res => {
        this.$err('登录失败')
      })
    }
  }
}
</script>
<style>
.card .el-input__inner {
      background-color: transparent !important;
      border-top: 0ch;
      border-right: 0ch;
      border-left: 0ch;
      border-radius: 0%;
      color: white;
    }
.card .el-button{
  background: #245466 ;
  border-radius: 0px;
  border: 0ch;
}
</style>
<style scoped>
  .card{
    padding: 10%;
    height: 50%;
    background-color: transparent;
  }
   .card :hover{
    transition-duration: 0.5s;
    transform: scale3d(1.02,1.02,1);
  }
   .title {
        width: 100%;
        justify-content: center;
        color: white;
        font-size: 30px;
        font-family: 'Microsoft YaHei';
    }
    .text{
      margin-top: 5%;
      opacity: 0.8;
      background-color: transparent !important;
    }
    .button{
      margin-top: 10%;
      width: 80%;
      font-family: 'Microsoft YaHei';
      font-size: 20px;
    }
    .button:hover{
      color: white;
    }
</style>
