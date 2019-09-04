<template>
  <HomeFrame>
    <div slot='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统</div>
        <AppMenu></AppMenu>
    </div>
    <div slot='content'>
      <el-row class='contentTitle'>
        <el-col :span='5'>个人信息</el-col>
      </el-row>
      <el-divider></el-divider>
        <div class='contentStyle'>您好，{{username}}！</div>
        <div class='contentStyle'>您的工号是{{number}}。</div>
        <div class='contentStyle'>若您需要修改密码，请
          <el-button type='text' @click='showFlag=true'>点击此处</el-button>
        </div>
        <el-form v-if='showFlag' :model="form" label-width="120px" class='formStyle'>
          <el-form-item label='原密码'>
            <el-input v-model='form.originPassword'></el-input>
          </el-form-item>
          <el-form-item label='新密码'>
            <el-input v-model='form.newPassword'></el-input>
          </el-form-item>
          <el-form-item label='确认密码'>
            <el-input v-model='form.confirmPassword'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click='modifyPassword'>确认修改</el-button>
          </el-form-item>
        </el-form>
    </div>
  </HomeFrame>
</template>
<script>
import HomeFrame from './HomeFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'Home',
  components: {
    HomeFrame,
    AppMenu
  },
  data () {
    return {
      username: 'default name',
      number: '1120161930',
      showFlag: false,
      form: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted () {

  },
  methods: {
    modifyPassword () {
      console.log(1)
    }
  }
}
</script>
<style>
    .title {
        width: 100%;
        justify-content: center;
        color: white;
    }

    .contentTitle{
        font-size: x-large;
        line-height: 75px;
    }

    .contentStyle{
      line-height: 75px;
      padding-left: 20px;
      font-size: large;
    }

    .el-button--text{
      line-height: 75px;
      font-size: large;
    }

    .el-form-item__label{
      font-size: large;
    }

    .formStyle{
      width: 500px;
    }
</style>
