<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>学生评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='contentTitle'>请为本学期如下课程填写您的评价</div>
  </div>
</template>
<script>
export default {
  name: 'StudentEvaluate',
  components: {
  },
  data () {
    return {
      currentData: []
    }
  },
  mounted () {
  },
  methods: {
    // onclick () {
    //   this.$router.push('/studentDetail')
    // }
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
