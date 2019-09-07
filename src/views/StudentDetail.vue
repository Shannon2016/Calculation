<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>学生评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class='contentTitle'>
        <el-col :span='17'>请为{{courseName}}课程填写评价</el-col>
        <el-col :span='4' :offset="3">
          <el-button @click="onSubmitScores" class='darkbutton'>提交</el-button>
        </el-col>
      </el-row>
      <div class='contentTitle'>请根据指标点进行打分，由1~4从高到低，越高代表越符合指标点。</div>
      <div v-for='(item,index) in qualities' :key='index'>
        <div class='quality'>{{item}}</div>
        <el-radio-group v-model="scores[index]" class='qualityRadioGroup'>
          <el-radio :label="1">非常满意&emsp;</el-radio>
          <el-radio :label="2">满意&emsp;&emsp;&emsp;</el-radio>
          <el-radio :label="3">不满意&emsp;&emsp;</el-radio>
          <el-radio :label="4">非常不满意</el-radio>
        </el-radio-group>
      </div>
      <div style="height:50px;"></div>
  </div>
</template>
<script>
export default {
  name: 'StudentDetail',
  components: {
  },
  data () {
    return {
      courseName: 'default name',
      scores: [],
      qualities: [
        '1、符合工程认证指标点1-工程知识',
        '2、符合工程认证指标点2-问题分析',
        '3、符合工程认证指标点3-设计/开发解决方案',
        '4、符合工程认证指标点4-研究',
        '5、符合工程认证指标点5-使用现代工具',
        '6、符合工程认证指标点6-工程与社会',
        '7、符合工程认证指标点7-环境和可持续发展',
        '8、符合工程认证指标点8-职业规范',
        '9、符合工程认证指标点9-个人和团队',
        '10、符合工程认证指标点10-沟通',
        '11、符合工程认证指标点11-项目管理',
        '12、符合工程认证指标点12-终身学习'
      ]
    }
  },
  mounted () {
    console.log(this.$route.params)
    for (let i = 0; i < this.qualities.length; i++) {
      this.scores.push(-1)
    }
  },
  methods: {
    onSubmitScores () {
      console.log(this.scores)
      this.$router.push('/studentEvaluate')
    }
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

<style>
  .quality{
    color: #032B48;
    margin-top: 15px;
    font-weight: bold;
  }

  .qualityRadioGroup{
    margin-top: 15px;
  }

  .el-radio__label{
      font-size: 16px;
    }
  .el-radio__inner
  {
    border-color: black;
  }
  .el-radio__input.is-checked .el-radio__inner{
      color:rgb(16, 7, 47);
  }
  .el-radio__input.is-checked+.el-radio__label {
    color:rgb(16, 7, 47);
  }
  .el-radio__input.is-checked .el-radio__inner{
    color:rgba(3, 43, 72, 1);
    border-color: rgba(3, 43, 72, 1);
    background: rgba(3, 43, 72, 1);
  }
  .el-select .el-input.is-focus .el-input__inner{
    border-color:rgba(53, 83, 122, 0.8);
  }
  .el-select .el-input__inner:focus{
    border-color:rgba(103, 143, 172, 0.5);
  }
  .el-select-dropdown__item.selected{
    color:rgba(3, 43, 72, 1);
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: rgba(3, 43, 72, 1);
  }
  .darkbutton{
      border-radius: 3px;
      background-color: rgba(58, 100, 115, 1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0ch;
      font-size: 16px;
    }
    .darkbutton:focus, .darkbutton:hover{
      background-color:rgba(98, 140, 155, 1) !important;
      border: 0ch;
      color:white;
      font-size: 16px;
    }
</style>
