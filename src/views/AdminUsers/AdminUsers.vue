<template>
  <AdminUsersFrame>
    <div class="menubar" slot='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统</div>
        <AppMenu></AppMenu>
    </div>
    <div  slot='content'>
      <el-row class='contentTitle'>
        <el-col :span='5'>用户管理</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="search"   :gutter='20'>
        <el-col :span='9'>
          <el-input v-model='searchWord'><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-col>
        <el-col :push='7' span='3'>
          <el-button @click='onSearch'>搜索</el-button>
        </el-col>
        <el-col :push='5' :span='4'>
          <el-button @click='addUser'>添加新用户</el-button>
        </el-col>
      </el-row>
      <el-table :data='currentData'>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            label="操作"
            align="right"
            header-align="center"
            width="250">
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </AdminUsersFrame>
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
      currentPage: 1,
      totalSize: 25,
      currentData: [],
      userData: [
        {
          username: '1120161930'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }, {
          username: '1120161920'
        }
      ]
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    onSearch () {
      console.log(this.searchWord)
    },
    addUser () {
      console.log(1)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleCurrentChange (val) {
      this.currentData = []
      for (let i = (val - 1) * 10; i < val * 10 && i < this.totalSize; i++) {
        this.currentData.push(this.userData[i])
      }
      console.log(this.currentData)
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
        font-size: 30px;
        line-height: 70px;
        color: rgba(2, 43, 72, 1);
    }

    .el-divider--horizontal{
    margin: 0%;
    }
    .search{
      margin-top:2% !important;
    }
    .contentStyle{
      line-height:70px;
      font-size: 22px;
      color: rgba(2, 43, 72, 1);
    }
    .el-table{
      margin-top:3%;
      width:88%;
    }
    .search .el-button{
      float:right;
    }
</style>
