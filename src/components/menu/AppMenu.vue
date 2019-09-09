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
        background-color="rgba(36, 84, 102, 0.5)"
        class="el-menu-vertical"
        text-color="#ddd"
        active-text-color="rgba(0,180,180,0.8)"
        :collapse="isCollapse">
        <template v-for='(item,index) in menu' >
            <el-submenu v-if="item.child != undefined" :key="index" :index='"/"+index'>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for='(subItem, subIndex) in item.child' :key='subIndex' :index='subItem.path'>
                  <i :class='subItem.icon'></i>
                  <span slot='title'>{{subItem.title}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="index" :index='item.path'>
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>
    </el-menu>
    </div>
</template>

<script>
import menus from '../../router/menu.js'
import global from './../../store/global.js'
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
      // return menu.menu.map(
      //   item => {
      //     return {
      //       title: item.cn,
      //       path: item.path,
      //       icon: item.icon,
      //       child: item.child
      //     }
      //   }
      // )
      console.log(global.authorities)
      console.log(menus)
      console.log(global.authorities[0].authority)
      return menus[global.authorities[0].authority]
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
