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
            label="状态"
            align="right"
            width="200">
             <template slot-scope="scope">
                 <div v-if="scope.row.state===1">未上传</div>
                 <div v-else>已上传</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
             <template slot-scope="scope">
                 <el-button v-if="scope.row.state===1" @click='onUploadClick'>上传</el-button>
                 <el-button v-else>修改</el-button>
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
      currentPage: 1,
      totalSize: 11,
      currentData: [],
      courseData: [{
        name: '111',
        state: 1
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 1
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }, {
        name: '111',
        state: 0
      }]
    }
  },
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    handleCurrentChange (val) {
      this.currentData = []
      for (let i = (val - 1) * 10; i < val * 10 && i < this.totalSize; i++) {
        this.currentData.push(this.courseData[i])
      }
    },
    onUploadClick () {
      this.$router.push('/studentDetail/1/1')
    },
    onModifyClick () {
    //   this.
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
