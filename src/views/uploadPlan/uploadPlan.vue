<template>
  <uploadPlanFrame>
    <div class="menubar" slot='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统</div>
        <AppMenu></AppMenu>
    </div>
    <div slot='content'>
      <el-row class='contentTitle'>
        <el-col :span='5'>用户管理</el-col>
      </el-row>
      <el-divider></el-divider>
      
    </div>
  </uploadPlanFrame>
</template>
<script>
import uploadPlanFrame from './uploadPlanFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'uploadPlan',
  components: {
    uploadPlanFrame,
    AppMenu
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
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
    }
    .contentTitle{
        font-size: x-large;
        line-height: 75px;
    }
</style>
