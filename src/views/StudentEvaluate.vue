<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='5'>学生评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <div class='contentTitle'>请为本学期如下课程填写您的评价</div>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="name"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作"
            align="right"
            header-align="center"
            width="250">
            <template slot-scope="scope">
              <el-button class="lightbutton"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
