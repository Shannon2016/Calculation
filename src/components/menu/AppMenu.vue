<template>
    <div>
    <!-- <i
        :class="{
          'el-icon-s-fold':!isCollapse,
          'el-icon-s-unfold':isCollapse}"
        title='收缩/展开菜单'
        class="toggleButton"
        @click='toggleMenu'></i> -->
    <el-menu
        :default-active="current"
        router
        background-color="rgba(0,0,0,0)"
        class="el-menu-vertical"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse">
        <template v-for='(item,index) in menuNames' >
            <el-submenu v-if="item.child != null" :key="index">
                <template slot="title">
                  <i class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for='(subItem, subIndex) in item.child' :key='subIndex'>
                  <i :class='subItem.icon'></i>
                  <span slot='title'>{{subItem.titiel}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="index">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>
        <el-menu-item v-for='(item,index) in menu' :key='index' :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
import menu from '../../router/menu.js'
export default {
  name: 'AppMenu',
  props: {
    menuNames: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      current: '/',
      isCollapse: false
    }
  },
  watch: {
    $route (to, from) {
      this.current = to.path
    }
  },
  mounted () {
    this.current = this.$route.path
  },
  computed: {
    menu () {
      return menu.menu.map(
        item => {
          return {
            title: item.cn,
            path: item.path,
            icon: item.icon
          }
        }
      )
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
  .el-menu-item:hover,
  .el-menu-item:focus{
    background:#487 !important;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 150px;
  }
  .toggleButton{
      margin-top:20px;
      font-size: 30px;
      line-height: 50px;
      color: white;
      cursor: pointer;
  }
  .toggleButton:hover{
      color:#bbb;
  }
  .toggleButton:active{
      color:#ddd;
  }
</style>
