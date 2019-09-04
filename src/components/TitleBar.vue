<template>
  <div class='top-bar'>
      <div class='place'>
          <slot></slot>
      </div>
      <span>{{title}}</span>
        <el-button
          title='切换全屏显示'
          type='primary'
          icon='el-icon-full-screen'
          @click='toggleFullScreen'
          circle
        ></el-button>
    </div>
</template>

<script>
import toggleFullScreen from '../utils/utils.js'
export default {
  name: 'TitleBar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggleFullScreen () {
      toggleFullScreen()
      this.$store.commit('toggleFullscreen')
    }
  }
}
</script>
<style scoped>
.top-bar{
    display: flex;
    position:relative;
    align-items: center;
}
.top-bar span:first-child{
    color: white;
}
.top-bar span:nth-child(2){
    flex-grow: 1;
}
.place{
  position: absolute;
}
</style>
