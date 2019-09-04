<template>
  <div class='vertical-flex'>
    <TitleBar :title='title'>
      <BreadCrumb :breadCrumb='breadCrumb' @bread-crumb-click='onBreadCrumbClick'></BreadCrumb>
    </TitleBar>
    <div class='content'>
      <div>
        <Map
          :lock='lockMap'
          @area-select='onAreaSelect'
          :selectedAreas='selectedAreas'
          id='map32'
          @bread-crumb-update='onBreadCrumbUpdate'
        ></Map>
      </div>
      <div>
        <el-tabs v-model='activeName' type='border-card' @tab-click='handleClick'>
          <el-tab-pane label='选择当前位置' name='first'>
            <div>
              <span style='float:left;font-size:16px;line-height:16px;color:white'>当前位置：</span>
              <BreadCrumb
                :breadCrumb='breadCrumb'
                @bread-crumb-click='onBreadCrumbClick'
              ></BreadCrumb>
            </div>
          </el-tab-pane>
          <el-tab-pane label='选择对比地点' name='second'>
            <div>
              <span style='float:left;font-size:16px;line-height:16px;color:white;' >当前位置：</span>
              <BreadCrumb
                :breadCrumb='breadCrumb'
                @bread-crumb-click='onBreadCrumbClick'
              ></BreadCrumb>
            </div>
            <div class='sub-header'>
              <span style='color:white'>已选区域：</span>
              <span>
                <el-button type='primary' size='small' :disabled="selectedSize <= 1" @click='doCompare'>对比分析</el-button>
              </span>
            </div>
            <div style='padding:10px 0' align='left'>
              <span v-if='selectedSize == 0' style='color:#d88'>请选择要比较的区域</span>
              <el-tag

                v-for='(tag) in selectedAreas'
                :key='tag.code'
                closable
                @close='onCloseTag(tag)'
                :type='tagTypes[tag.color]'
              >{{tag.name}}</el-tag>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import TitleBar from '../components/TitleBar'
import HomeFrame from '../components/HomeFrame'
import EPie from '../components/echarts/EPie'
import EBar from '../components/echarts/EBar'
import ELine from '../components/echarts/ELine'
import ESmoothLine from '../components/echarts/ESmoothLine'
import Map from '../components/echarts/Map'
import BreadCrumb from '../components/BreadCrumb'
export default {
  name: 'ComparePopulation',
  components: {
    Map,
    TitleBar,
    HomeFrame,
    EPie,
    EBar,
    ELine,
    ESmoothLine,
    BreadCrumb
  },
  data () {
    return {
      radio: 3,
      year: 1,
      title: '时空大数据-人口专题',
      breadCrumb: [],
      yearRange: {
        min: 2000,
        max: 2019
      },
      activeName: 'first',
      yearPredict: null,
      operating: false,
      breadCrumbIndex: 0,
      breadCrumbVersion: 0,
      lockMap: false,
      selectedAreas: {},
      tagTypes: ['', 'success', 'info', 'warning', 'danger']
    }
  },
  computed: {
    selectedSize () {
      return Object.keys(this.selectedAreas).length
    }
  },
  watch: {
    activeName (to, from) {
      console.log(to)
      if (to === 'first' && from !== 'first') {
        this.lockMap = false
        this.selectedAreas = {}
      } else if (to === 'second' && from !== 'second') {
        this.lockMap = true
      }
    }
  },
  mounted () {},
  methods: {
    handleClick (e) {},
    doCompare () {
      this.$router.push('/compare-population')
    },
    onCompareStart () {
      this.lockMap = true
    },
    onCompareCancel () {
      this.selectedAreas2 = {}
      this.lockMap = false
    },
    onCompareSubmit () {
      this.selectedAreas2 = {}
      this.lockMap = false
    },
    onBreadCrumbClick (index) {
      this.breadCrumbIndex = index
      this.breadCrumbVersion++
    },
    onBreadCrumbUpdate (breadCrumb) {
      this.breadCrumbIndex = breadCrumb.length - 1
      this.breadCrumb = breadCrumb
    },
    onCloseTag (tag) {
      this.$delete(this.selectedAreas, tag.code)
      this.selectedAreas2 = this.selectedAreas
    },
    onAreaSelect (data) {
      if (this.selectedAreas[data.code] != null) {
        this.$delete(this.selectedAreas, data.code)
      } else {
        data.color = Math.floor(Math.random() * 5)
        this.$set(this.selectedAreas, data.code, data)
      }
      console.log(this.selectedAreas)
    }
  }
}
</script>
<style>
.el-tabs--border-card>.el-tabs__header,
.is-top,
.el-tabs__nav-wrap,
.el-tabs__nav-scroll{
  background: none !important;
  border:none !important;
  color:white !important;
}
.is-top > .is-active {
   border-bottom: 1px solid #66b1ff !important;
}
</style>
<style scoped>
.el-tabs--border-card
{
  background:rgba(0,0,0,0.13) !important;
  border:1px solid rgba(255,255,255,0.4);
}

.sub-header {
  width: 100%;
  height: 32px;
  line-height: 32px;
  display: flex;
}
.sub-header > span:first-child {
  text-align: left;
  flex-grow: 1;
}
.el-radio.is-bordered {
  margin-left: 0 !important;
  margin-top: 20px;
}
.el-tag{
  width: 50%;
}

div {
  margin: 0;
  padding: 0;
}
.echart {
  width: 100%;
  height: 100%;
}
.vertical-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.vertical-flex > div:first-child {
  width: 100%;
  padding: 20px 0;
  height: 50px;
  line-height: 50px;
  color: white;
  font-size: 30px;
}
.vertical-flex > div:nth-child(2) {
  width: 100%;
  flex-grow: 1;
}
.content {
  display: flex;
}
.content > div:first-child {
  flex-grow: 5;
}
.content > div:nth-child(2) {
  max-width: 350px;
  flex-grow: 2;
  min-width: 25%;
}
.el-button--small {
  padding: 9px 15px;
}
</style>
