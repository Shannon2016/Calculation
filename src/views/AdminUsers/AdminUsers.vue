<template>
<div>
      <el-row class='contentTitle'>
        <el-col :span='24'>用户管理</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="search"   :gutter='20'>
        <el-col  :span='16'>
          <el-input v-model='searchWord' placeholder="请输入关键词"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-col>
        <el-col   :span='3'>
          <el-button class="lightbutton" @click='onSearch'>搜索</el-button>
        </el-col>
        <el-col   :span='4'>
          <el-button class="darkbutton"  @click='addDialog=true'>添加新用户</el-button>
        </el-col>
      </el-row>
      <el-dialog title="添加新用户" :visible.sync="addDialog">
        <el-form label-width="80" :model="formAdd">
          <el-form-item label="用户名">
            <el-input v-model="formAdd.username"></el-input>
          </el-form-item>
          <el-form-item label="用户身份">
            <el-radio-group v-model="formAdd.identity">
              <el-radio label="student">学生</el-radio>
              <el-radio label="teacher">教师</el-radio>
              <el-radio label="professor">教学干事</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属学院">
            <el-select v-model="formAdd.college" placeholder="请选择">
              <el-option
                v-for="item in collegeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="darkbutton" @click="addUser">确 认</el-button>
        </div>
      </el-dialog>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="realName"
            label="真实姓名">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
            <template slot-scope="scope">
              <el-button class="darkbutton"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalSize"
        style="justify-content:center; display:flex;margin:3%">
      </el-pagination>
    </div>
</template>
<script>
import AdminUsersFrame from './AdminUsersFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'AdminUsers',
  components: {
    AdminUsersFrame,
    AppMenu
  },
  data () {
    return {
      searchWord: '',
      addDialog: false,
      currentPage: 1,
      totalSize: 25,
      currentData: [],
      searchKey: '',
      userData: [],
      formAdd: {
        username: '',
        identity: -1,
        college: ''
      },
      collegeOptions: []
    }
  },
  mounted () {
    this.handleCurrentChange(1, 10)
    this.collegeOptions.push({value: "计算机学院", label: "计算机学院"})
    // this.$ajaxPost(
    //   '/api/getInfo/departmentInfo',
    //   { }
    // ).then(res => {
    //   console.log(res)
    //   for (let i = 0; i < res.data.data.length; i++) {
    //     this.collegeOptions.push({value: res.data.data[i], label: res.data.data[i]})
    //   }
    // }).catch(res => {
    //   this.$err('系统错误')
    // })
  },
  methods: {
    onSearch () {
      this.searchKey = '' + this.searchWord
      this.handleCurrentChange(1)
    },
    addUser () {
      console.log(this.formAdd)
      this.$ajaxPost(
        '/api/user/addNew',
        {
          username: this.formAdd.username,
          role: this.formAdd.identity,
          department: this.formAdd.college
        }
      ).then(res => {
        if (res.data.code === 0) {
          this.handleCurrentChange(this.currentPage)
          this.$message('添加成功！')
        } else {
          this.$message.error('添加失败！用户名重复！')
        }
      }
      ).catch(res => {
        this.$err('添加失败')
      })
      console.log(this.formAdd)
      this.addDialog = false
    },
    handleDelete (index, row) {
      this.$confirm('确认删除该用户吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.$ajaxPost2(
          '/api/user/deleteBatch',
          [{id: row.id}]
        ).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '用户已删除'
          })
          this.handleCurrentChange(1)
        }).catch(res => {
          console.log(res)
        })
      }).catch(action => {
        this.$message({
          type: 'error',
          message: action === 'cancel'
            ? '取消修改'
            : '停留在当前页面'
        })
      })
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.$ajaxPost(
        '/api/user/page',
        {
          pageIndex: index,
          pageSize: 10,
          searchKey: this.searchKey
        }
      ).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.totalSize = res.data.data.total
          this.currentData = res.data.data.resultList
        } else {
          this.$err('系统错误')
        }
      }).catch(res => {
        console.log(res)
      })
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
      font-size: 18px;
      font-family: 'Microsoft YaHei';
    }
    .contentTitle{
        font-size: 24px;
        line-height: 70px;
        color: rgba(2, 43, 72, 1);
    }
    .el-divider--horizontal{
    margin: 0%;
    }
    .search{
      margin-top:2% !important;
    }
    .search .el-button{
      font-size: 16px;
    }
    .search .el-input{
        line-height: 40px;
        height: 40px;
    }
    .contentStyle{
      line-height:70px;
      font-size: 22px;
      color: rgba(2, 43, 72, 1);
    }
     .el-table{
      margin-top:1%;
      width:92%;
    }
    .el-table .cell{
      line-height: 16px;
      color: rgba(2, 43, 72, 1);
      font-size: 16px;
    }
    .table .el-button{
      font-size: 16px;
    }
    .lightbutton，.el-message-box__btns button{
      border-radius: 3px;
      background-color:white;
      color: rgba(58, 100, 115, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0px;
      font-size: 16px !important;
      border: 1px solid rgba(58, 100, 115, 1);
    }
    .lightbutton:focus, .lightbutton:hover, ，.el-message-box__btns button:focus, ，.el-message-box__btns button:hover{
      background-color:rgba(210, 230, 255, 1) !important;
      border: 1px solid rgba(58, 100, 115, 1);
      color:navy;
      font-size: 16px !important;
    }
    .darkbutton, .el-message-box__btns .el-button--primary {
      border-radius: 3px;
      background-color: rgba(58, 100, 115, 1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0ch;
      font-size: 16px;
    }
    .darkbutton:focus, .darkbutton:hover, .el-message-box__btns .el-button--primary:hover, .el-message-box__btns .el-button--primary:focus{
      background-color:rgba(98, 140, 155, 1) !important;
      border: 0ch;
      color:white;
      font-size: 16px;
    }
    .el-button--mini, .el-button--small{
      font-size: 16px !important;
    }
    .el-dialog__title{
      color:rgba(3, 43, 72, 1);
      font-size: 20px;
    }
    .el-form-item__label{
      color:rgba(3, 43, 72, 1);
      font-size: 16px;
    }
    .el-radio__label{
      color:rgba(3, 43, 72, 1);
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
  .el-pager li{
    color:rgba(103, 143, 172, 0.5);
  }
  .el-pager li.active{
    color:rgba(3, 43, 72, 1);
  }
   .el-pager li:hover{
    color:rgba(53, 83, 122, 0.8);
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
</style>
