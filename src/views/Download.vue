<template>
<div>
      <el-row class='contentTitle'>
        <el-col :span='24'>历史文件</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style='margin-top:20px;' type="flex" align="middle">
          <el-col :span='4' class='uploadTitle2'>请选择学年：</el-col>
          <el-col :span='5'>
            <el-select v-model="chosenYear" placeholder="请选择">
                <el-option
                v-for="item in years"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-col>
          <el-col :offset='1' :span='2' class='darkbutton' style='line-height:40px;'>搜索</el-col>
      </el-row>
      <el-table class="table" :data='currentData'>
          <el-table-column
            prop="fileName"
            label="文件名">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="250">
            <template slot-scope="scope">
              <el-button class="darkbutton"
                @click="handleDownload(scope.$index, scope.row)">下载</el-button>
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
import AppMenu from './../components/menu/AppMenu'
export default {
  name: 'Download',
  components: {
    AppMenu
  },
  data () {
    return {
      years: [{
          value: 2017,
          label: '2017~2018学年'
      },{
          value: 2018,
          label: '2018~2019学年'
      }],
      chosenYear: '',
      currentPage: 1,
      totalSize: 10,
      currentData: [],

    }
  },
  mounted () {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange (){
        this.currentData = [{
            fileName: 'file1'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }, {
            fileName: 'file2'
        }]
    },
    handleDownload (index, row) {
        console.log(row)
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
    .lightbutton{
      border-radius: 3px;
      background-color:white;
      color: rgba(58, 100, 115, 1);
      text-align: center;
      font-family: 'Microsoft YaHei';
      border: 0px;
      font-size: 16px !important;
      border: 1px solid rgba(58, 100, 115, 1);
    }
    .lightbutton:focus, .lightbutton:hover{
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
    .darkbutton:focus, .darkbutton:hover{
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
<style>
  .uploadTitle2{
        font-size: large;
        color: #032B48;
        font-weight: bold;
    }
</style>>
