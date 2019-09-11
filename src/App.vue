<template>
  <div id="app">
    <Login v-if="!ifLogin">
    </Login>
    <div style='display:flex;width:100%;' v-else>
      <div class='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统
          <el-button type='text' @click='logout'  style="float:right; margin-right:10px;margin-left:-60px;" >点此登出</el-button>
        </div>
        <AppMenu/>
      </div>
      <div class='content-box'>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from './components/menu/AppMenu'
import Login from './views/Login/Login'
import global from './store/global.js'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    AppMenu,
    Login
  },
  computed: {
    ...mapState([
      'fullScreen',
      'ifLogin'
    ])
  },
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      global.token = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  position:absolute;
  width:100%;
  height:100%;
  /* background:
  radial-gradient(#0D437D,#0B1A2A); */
  /* radial-gradient(hsl(218, 40%, 18%), hsl(251, 20%, 5%)); */
  /* overflow: hidden; */
  /* linear-gradient(127deg, rgba(9, 23, 9, 0.61), rgba(31, 51, 31, 0.658) 70.71%),
  linear-gradient(336deg, rgba(48, 48, 82, 0.849), rgba(20, 20, 54, 0.767) 70.71%); */
  display:flex;
}
.menu {
    height:100%;
    width:300px;
    background-image: url('./assets/menu.png');
    background-size: cover;
}
.title {
        width: 100%;
        justify-content: center;
        font-size: 20px;
        color: white;
        margin: 3%;
    }
#body{
  flex-grow: 1;
  width: 0;
  height:calc(100% - 40px);
  padding: 20px;
}
.content-box {
    height: 100%;
    width: 0;
    flex-grow: 1;
    padding: 0px 60px 0px 80px;
    text-align: left;
    background-color: #f9f9f9;
    overflow-y: scroll;
    overflow-x: scroll; 
  }
   .title .el-button--text{
     color: grey;
   }
  .title .el-button--text:focus, .el-button--text:hover{
    color:white;
  }
  .el-submenu .el-menu-item{
    background-color: rgba(20, 45, 62, 0.5) !important;
  }
  .el-submenu__title:hover{
    background-color:#487 !important;
  }
*{
  margin: 0;
  padding: 0;
}
</style>
