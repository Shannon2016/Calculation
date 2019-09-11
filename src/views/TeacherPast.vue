<template>
  <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>教师评价</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row align="middle" type='flex'>
        <el-col class='contentTitle' :span='14'>请选择需要查看的往期评价</el-col>
        <el-col :span='4'>
            <el-select v-model="semester" placeholder="请选择">
                <el-option
                v-for="item in yearOptions"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span='2' :offset='1'>
            <el-button class='darkbutton' @click='handleCurrentChange(1)'>确认</el-button>
        </el-col>
      </el-row>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="str2"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="str3"
            label="状态"
            align="center"
            width="200">
            <div class="is_upload" style="color:rgb(119, 0, 2);font-weight: bolder">已上传，不可修改</div>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
             <template slot-scope="scope">
                 <el-button @click='onDetailClicked(scope.row.id)' class="lightbutton" size='small'>下载文件</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="200"
        layout="prev, pager, next, jumper"
        :total="totalSize"
        style="justify-content:center; display:flex;margin:3%">
      </el-pagination>
      <el-dialog :title="'查看'+courseName+'往期评价'" :visible.sync="DialogVisible" width='65%'>
        <div v-for='(item,index) in qualities' :key='index'>
            <div class='quality'>{{item}}</div>
            <el-radio-group v-model="scores[index]" class='qualityRadioGroup'>
            <el-radio :label="1">非常满意&emsp;</el-radio>
            <el-radio :label="2">满意&emsp;&emsp;&emsp;</el-radio>
            <el-radio :label="3">不满意&emsp;&emsp;</el-radio>
            <el-radio :label="4">非常不满意</el-radio>
            </el-radio-group>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'StudentPast',
  components: {
  },
  data () {
    return {
      currentPage: 1,
      totalSize: 200,
      currentData: [],
      courseData: [],
      yearOptions: [],
      semester: '',
      DialogVisible: false,
      courseName: '',
      qualities: []
    }
  },
  mounted () {
    // this.handleCurrentChange(1)
    this.$ajaxGet(
      '/api/getInfo/semester',
      {}
    ).then(res => {
      console.log(res)
      if (res.data.code === 'success'){
        this.yearOptions = res.data.data
      }
      else this.$message.error('出错了！')
    }).catch(res =>{
      this.$message.error('出错了！')
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.$ajaxPost(
        '/api/getInfo/coursePage',
        {
          courseSemester: this.semester,
          pageIndex: val,
          pageSize: 200
        }
      ).then(res => {
        if (res.data.code === 'success') {
          console.log(res.data)
          this.courseData = res.data.data.resultList
          this.currentData = this.courseData
          this.totalSize = this.currentData.length
          console.log(this.courseData)
        } else {
          this.$message.error('出错了！')
        }
      }).catch(res => {
        console.log(res)
      })
      // this.currentPage = val
      // this.$ajaxPost(
      //   '/api/getInfo/oldTeacherEvaluation',
      //   {
      //     pageIndex: val,
      //     pageSize: 10
      //   }
      // ).then(res => {
      //   console.log(res.data)
      //   if (res.data.code === 'success') {
      //     this.totalSize = res.data.data.total
      //     this.currentData = res.data.data.resultList
      //   } else {
      //     this.$err('系统错误')
      //   }
      // }).catch(res => {
      //   console.log(res)
      // })
    },
    onDetailClicked (id) {
      window.open('/api/download/downOldTeacherEvaluation?id=' + id)
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
    .lightbutton{
          border-radius: 3px;
          background-color:white;
          color: rgba(58, 100, 115, 1);
          text-align: center;
          font-family: 'Microsoft YaHei';
          border: 0px;
          font-size: 16px;
          border: 1px solid rgba(58, 100, 115, 1);
        }
    .lightbutton:focus, .lightbutton:hover{
      background-color:rgba(210, 230, 255, 1) !important;
      border: 1px solid rgba(58, 100, 115, 1);
      color:navy;
      font-size: 16px;
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
</style>
