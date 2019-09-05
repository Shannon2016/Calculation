<template>
  <HomeFrame>
    <div class="menubar" slot='menu'>
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
<style  >
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
      color: white;
    }
    .menubar .el-menu-item:hover{
      transition-duration: 0.5s;
      transform: scale3d(1.0,1.03,1);
    }
.el-divider--horizontal{
    margin: 0%;
}
    .contentTitle{
        font-size: 30px;
        line-height: 70px;
        color: rgba(3, 43, 72, 1);
    }

    .contentStyle{
      line-height:70px;
      font-size: 24px;
      color: rgba(3, 43, 72, 1);
    }

    .el-button--text{
      line-height: 70px;
      font-size: 24px;
      color: rgba(3, 43, 72, 1);
    }
    .el-button--text:hover{
      color:darkcyan;
    }

    .el-form-item__label{
      font-size: large;
      text-align:left;
    }

    .formStyle{
      width: 500px;
    }
</style>
