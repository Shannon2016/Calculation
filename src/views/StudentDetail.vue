<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>test</el-col>
      </el-row>
      <el-divider></el-divider>
  </div>
</template>
<script>
export default {
  name: 'StudentDetail',
  components: {
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
