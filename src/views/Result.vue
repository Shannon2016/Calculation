<template>
    <div>
      <el-row class='contentTitle'>
        <el-col :span='24'>查看结果</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form ref='form' :model='form' label-width="150px" style="margin-top:50px">
          <el-form-item label="请选择查询方式:">
              <el-radio-group @change="onSelectionChange" v-model="form.type">
                  <el-radio :label='1'>按学年查询(两年)</el-radio>
                  <el-radio :label='2'>按年级查询</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="请选择查询年份:">
              <el-select v-model="form.year" placeholder="请先选择查询方式">
                <el-option
                v-for="item in years"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="请选择认证点:">
              <el-select v-model="form.number" placeholder="请选择">
                <el-option
                v-for="item in points"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
              <el-button class='lightbutton' @click="onExportCliked">结果导出</el-button>
          </el-form-item>
      </el-form>
    </div>
</template>
<script>
import AppMenu from './../components/menu/AppMenu'
export default {
  name: 'Result',
  components: {
    AppMenu
  },
  data () {
    return {
      form: {
        type: -1,
        year: ''
      },
      yearsByGrade: [], // 按年级
      yearsByTime: [], // 按学年
      years: [],
      activePointName: '',
      points: [],
      tableData: [],
      pointDescription: '',
      rec: [],
      currentData: [],
      tableLabel: []
    }
  },
  mounted () {
    this.setData()
    // this.$ajaxPost(
    //   '/api/getInfo/nowCourseIndex'
    // )
  },
  methods: {
    onSelectionChange () {
      if (this.form.type === 1) {
        this.years = this.yearsByTime
      } else {
        this.years = this.yearsByGrade
      }
    },
    setData () {
      // 为下拉框动态添加信息
      for (let i = 0; i < 10; i++) {
        let str1 = (i + 2010) + '~' + (i + 2012)
        let str2 = (i + 2010) + '级'
        this.yearsByGrade.push({label: str2, value: i + 2010})
        this.yearsByTime.push({label: str1, value: i + 2010})
      }
      for (let i = 0; i < 10; i++) {
        this.points.push({label: '工程点' + (i + 1), value: i + 1})
      }
      console.log('setData')
    },
    onSearchClicked () {
      this.points = [
        {
          description: '工程认证点1'
        },
        {
          description: '工程认证点2'
        },
        {
          description: '工程认证点3'
        }
      ]
      // 加载表格信息
      // 需要获取该认证点的完整描述，记录在pointDescription中
      this.pointDescription = '工程认证点五XXXXXX'
      // 需要先动态获取所有该工程点的子认证点，将内容记录至rec中
      this.rec = [
        {
          prop: 'subpoint1',
          label: '子认证点1'
        },
        {
          prop: 'subpoint2',
          label: '子认证点2'
        },
        {
          prop: 'subpoint3',
          label: '子认证点3'
        }
      ]
      // 再获取各自认证点对应课程的数值,将内容记录在tableData中
      this.tableData = [
        {
          subpoint1: null,
          subpoint2: 0.5,
          subpoint3: 0.1
        },
        {
          subpoint1: 1,
          subpoint2: 0.5,
          subpoint3: null
        },
        {
          subpoint1: null,
          subpoint2: 0.6,
          subpoint3: 0.2
        }
      ]
    },
    onExportCliked () {
      console.log(this.form.type)
      if (this.form.type === 1) {
        console.log(this.form.year+'-'+(this.form.year+2))
        console.log('按学年导出')
        window.open('/api/download/bySchoolYear?schoolYear=' + this.form.year+'-'+(this.form.year+2))
      } else if (this.form.type === 2) {
        console.log('按年级导出')
        console.log(this.form.year)
        window.open('/api/download/byGrade?grade=' + this.form.year)
      }
    }
  }
}
</script>
<style >
     .contentStyle .el-button{
      font-size: 23px;
      color: rgba(3, 43, 72, 1);
    }
    .contentStyle .el-button:hover{
      color:darkcyan;
    }
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
    .el-form-item__label{
      font-size: large;
      text-align:left;
    }
    .pic .el-dialog{
      width:80%;
    }
    .is-active, .el-tabs__item:hover,.is-checked+{
      color: rgba(58, 100, 115, 1) !important;
    }
    .el-tabs__active-bar{
      background-color: rgba(58, 100, 115, 1) !important;
    }
</style>
<style>
    .formStyle{
      width: 500px;
    }
     .lightbutton{
          border-radius: 3px;
          background-color:white;
          color: rgba(58, 100, 115, 1);
          text-align: center;
          font-family: Roboto;
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
