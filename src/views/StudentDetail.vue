<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>学生评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class='contentTitle'>
        <el-col :span='17'>请为{{courseName}}课程填写评价</el-col>
        <el-col :span='4' :offset="3">
          <el-button>提交</el-button>
        </el-col>
      </el-row>
      <div class='contentTitle'>请根据指标点进行打分，由1~4从低到高，越高代表越符合指标点。</div>
      <!-- <div :v-for='(item, index) in qualities'>
        <div>{{}}</div>
      </div> -->
  </div>
</template>
<script>
export default {
  name: 'StudentDetail',
  components: {
  },
  data () {
    return {
      courseName: 'default name'
    }
  },
  mounted () {
    console.log(this.$route.params)
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
