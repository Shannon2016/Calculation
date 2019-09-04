<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from './components/menu/AppMenu'
import Login from './views/Login/Login'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: {
    AppMenu,
    Login
  },
  computed: {
    ...mapState([
      'fullScreen'
    ])
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
#menu {
  height:100%;
}
#body{
  flex-grow: 1;
  width: 0;
  height:calc(100% - 40px);
  padding: 20px;
}
*{
  margin: 0;
  padding: 0;
}
</style>
