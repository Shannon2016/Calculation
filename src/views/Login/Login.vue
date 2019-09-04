<template>
  <LoginFrame>
    <div slot='top'>
        <div class="title">欢迎使用</div>
        <div class="title">工程认证指标点系统</div>
    </div>
    <div slot='center'>
      <el-input id="username" v-model="username"></el-input>
      <el-input id="password" v-model="password"></el-input>
      <el-button @click="onLogin">登录</el-button>
    </div>
  </LoginFrame>
</template>
<script>
import LoginFrame from './LoginFrame'
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
      this.$router.push('/home')
      // this.$request({
      //         url: `/api/auth`,
      //         method: 'POST',
      //         data: {
      //           username: this.username,
      //           password: this.password
      //         },
      //         success: (res) => {
      //         },
      //         fail: (res) => {
      //           this.$err('服务器错误')
      //         },
      //         error: (res) => {
      //           this.$err()
      //         }
      //       })
    }
  }
}
</script>
<style>

</style>
