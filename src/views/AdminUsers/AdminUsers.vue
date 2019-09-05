<template>
  <AdminUsersFrame>
    <div slot='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统</div>
        <AppMenu></AppMenu>
    </div>
    <div slot='content'>
      <el-row class='contentTitle'>
        <el-col :span='5'>用户管理</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter='20'>
        <el-col :span='9'>
          <el-input v-model='searchWord'><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-col>
        <el-col :span='3'>
          <el-button @click='onSearch'>搜索</el-button>
        </el-col>
        <el-col :push='8' :span='4'>
          <el-button @click='addUser'>添加新用户</el-button>
        </el-col>
      </el-row>
      <el-table :data='userData'>
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
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination> -->
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
        }
      ]
    }
  },
  mounted () {

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
</style>
