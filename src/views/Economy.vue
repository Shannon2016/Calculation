<template>
  <div class='vertical-flex'>
    <TitleBar :title='title'>
        <BreadCrumb :breadCrumb='breadCrumb' @bread-crumb-click='onBreadCrumbClick'></BreadCrumb>
    </TitleBar>
    <div>
        <HomeFrame>
            <ELine id='chart-left2' slot='left'></ELine>
            <EBar id='chart-right2' slot='right'></EBar>
            <ESmoothLine id='chart-bottom2' slot='bottom'></ESmoothLine>
            <EPie id='chart-left-bottom2' slot='left-bottom'></EPie>
            <Map
                 @area-select='onAreaSelect'
                 id='map4562'
                 slot='center'
                    @bread-crumb-update='onBreadCrumbUpdate'></Map>
                <div slot='center-right'>
                    <el-radio-group v-model='radio' id='center-right'>
                        <el-radio border :label='3'>备选项</el-radio>
                        <el-radio border :label='6'>备选项</el-radio>
                        <el-radio border :label='9'>备选项</el-radio>
                    </el-radio-group>
            </div>
            <div slot='bottom-top' class='bottom-top'>
                <div><el-slider :step='1'  show-stops :max='yearRange.max' :min='yearRange.min' input-size='mini' v-model='year'></el-slider></div>
                <div><el-input-number :min='2020' :max='9999' size="small" v-model="yearPredict"></el-input-number></div>
                <div><el-button type='primary' size="small">预测</el-button></div>
                <div><el-button type='primary' size="small" @click='doCompare'>对比分析</el-button></div>
            </div>
        </HomeFrame>
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
  name: 'Economy',
  components: {Map, TitleBar, HomeFrame, EPie, EBar, ELine, ESmoothLine, BreadCrumb},
  data () {
    return {
      radio: 3,
      year: 1,
      title: '时空大数据-人口对比分析',
      breadCrumb: [],
      yearRange: {
        min: 2000,
        max: 2019
      },
      yearPredict: null,
      operating: false,
      breadCrumbIndex: 0,
      breadCrumbVersion: 0,
      lockMap: false,
      selectedAreas: {}
    }
  },
  mounted () {
  },
  methods: {
    doCompare () {
      this.$router.push('/compare-economy')
    },
    onCompareStart () {
      this.lockMap = true
    },
    onCompareCancel () {
      this.lockMap = false
    },
    onCompareSubmit () {
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
    },
    onAreaSelect (data) {
      if (this.selectedAreas[data.code] != null) {
        this.$delete(this.selectedAreas, data.code)
      } else {
        this.$set(this.selectedAreas, data.code, data)
      }
      console.log(this.selectedAreas)
    }
  }
}
</script>

<style scoped>
.el-radio.is-bordered {
  margin-left: 0 !important;
  margin-top: 20px;
}
.el-input-number--small{
  width: 110px;
}
* {
  margin: 0;
  padding: 0;
}
.echart{
    width:100%;
    height:100%;
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
.vertical-flex > div:nth-child(2){
  width: 100%;
  flex-grow: 1;
}
.map-wrap{
  position: relative;
}
.map-wrap > div{
  position: absolute;
}
.map-wrap > div:first-child{
  top: 0;
  left: 0;
}
.map-wrap > div:nth-child(2){
  top: 0;
  right: 0;
  width: 100px;
}
.el-button--small{
  padding:9px 15px;
  z-index: 999;
}
canvas {
  z-index: 1;
}
.bottom-top{
  display: flex;
}
.bottom-top > div{
  margin: 5px;
}
.bottom-top > div:first-child{
  flex-grow: 1;
}

</style>
