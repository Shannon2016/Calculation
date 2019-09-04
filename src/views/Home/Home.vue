<template>
  <HomeFrame>
    <div slot='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统</div>
        <AppMenu :menuNames='menuNames'></AppMenu>
    </div>
    <div slot='content'>
      <el-input id="username" v-model="username"></el-input>
      <el-input id="password" v-model="password"></el-input>
      <el-button @click="onLogin">登录</el-button>
    </div>
  </HomeFrame>
</template>
<script>
import HomeFrame from './HomeFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'Home',
  components: {
    HomeFrame,
    AppMenu
  },
  data () {
    return {
      menuNames: [
          
      ]
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style>
    .title {
        width: 100%;
        justify-content: center;
        color: white;
    }
</style>
