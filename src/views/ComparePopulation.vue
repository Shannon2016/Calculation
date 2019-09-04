<template>
  <div class='vertical-flex'>
    <TitleBar :title='title'>
      <BreadCrumb :breadCrumb='breadCrumb' v-show="!comparing" @bread-crumb-click='onBreadCrumbClick'></BreadCrumb>
      <el-button type='primary' v-show="comparing" @click='goBack'
      title='返回'
      icon='el-icon-back'
      circle></el-button>
    </TitleBar>
    <div style='position:relative;'>
    <el-carousel ref='carousel' :height="height" direction="vertical" :autoplay="false">
    <el-carousel-item name='1'>
       <div class='content'>
      <div>
        <Map
          :lock='lockMap || isRequesting'
          :canGoBack='canGoBack'
          :code='code'
          :name='name'
          @area-select='onAreaSelect'
          @go-back='onGoBack'
          @area-click='onAreaClick'
          @area-ready='onAreaReady'
          :selectedAreas='selectedAreas'
          id='map32'
        ></Map>
      </div>
      <div></div>
    </div>
    </el-carousel-item>
    <el-carousel-item name='2'>
     <ComparePopulationResult></ComparePopulationResult>
    </el-carousel-item>
  </el-carousel>
  <div style='width:350px;position:absolute;left:calc(100% - 350px);top:0;z-index:9999'>
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
                <el-button
                type='primary' size='small'
                :disabled="selectedSize <= 1 || comparing"
                @click='doCompare'
                :loading='isRequesting'
                >对比分析</el-button>
              </span>
            </div>
            <div style='padding:10px 0' align='left'>
              <span v-if='selectedSize == 0' style='color:#d88'>请选择要比较的区域</span>
              <el-tag
                v-for='(tag) in selectedAreas'
                :key='tag.code'
                :closable = '!comparing && !isRequesting'
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
import EPie from '../components/echarts/EPie'
import EBar from '../components/echarts/EBar'
import ELine from '../components/echarts/ELine'
import ESmoothLine from '../components/echarts/ESmoothLine'
import Map from '../components/echarts/Map'
import ComparePopulationResult from './ComparePopulationResult'
import BreadCrumb from '../components/BreadCrumb'
import _global from '../store/global'
import {mapState} from 'vuex'
export default {
  name: 'ComparePopulation',
  components: {
    Map,
    TitleBar,
    EPie,
    EBar,
    ELine,
    ESmoothLine,
    BreadCrumb,
    ComparePopulationResult
  },
  data () {
    return {
      title: '时空大数据-人口对比分析',
      breadCrumb: _global.breadCrumbBuf.map(i => i),
      breadCrumbBuf: _global.breadCrumbBuf.map(i => i),
      height: window.innerHeight - 130 + 'px',
      code: _global.area,
      name: _global.name,
      codeBuf: _global.area,
      nameBuf: _global.name,
      comparing: false,
      activeName: 'first',
      lockMap: false,
      selectedAreas: {},
      tagTypes: ['', 'success', 'info', 'warning', 'danger'],
      isRequesting: false
    }
  },
  computed: {
    selectedSize () {
      return Object.keys(this.selectedAreas).length
    },
    ...mapState([
      'resizeVersion'
    ]),
    canGoBack () {
      return this.breadCrumb.length > 1
    }
  },
  watch: {
    resizeVersion (to, from) {
      this.height = window.innerHeight - 130 + 'px'
    },
    activeName (to, from) {
      if (to === 'first' && from !== 'first') {
        this.lockMap = false
      } else if (to === 'second' && from !== 'second') {
        this.lockMap = true
      }
    }
  },
  mounted () {
    this.$store.commit('resize')
  },
  methods: {
    handleTabChange () {
      if (this.comparing) {
        return false
      }
    },
    onAreaReady (ok, name) {
      if (ok) {
        this.breadCrumb = this.breadCrumbBuf.map(i => i)
        this.nameBuf = this.name
        this.codeBUf = this.code
      } else {
        this.breadCrumbBuf = this.breadCrumb.map(i => i)
        this.name = this.nameBuf
        this.code = this.codeBUf
        this.$message({
          showClose: true,
          message: `[${name}] 没有下辖行政区`,
          type: 'error'
        })
      }
    },
    onAreaClick (params) {
      for (var i of this.breadCrumbBuf) {
        if (i.code === params.code) {
          this.$message({
            showClose: true,
            message: `[${params.name}] 没有下辖行政区`,
            type: 'error'
          })
          return
        }
      }
      this.breadCrumbBuf.push({
        name: params.name,
        code: params.code
      })
      this.code = params.code
      this.name = params.name
      this.selectedAreas = {}
    },
    onGoBack () {
      if (this.lockMap) {
        return
      }
      if (this.breadCrumbBuf.length > 1) {
        this.breadCrumbBuf.pop()
        this.code = this.breadCrumbBuf[this.breadCrumbBuf.length - 1].code
        this.name = this.breadCrumbBuf[this.breadCrumbBuf.length - 1].name
      } else {
        console.log('go-back 失败：已经没有上级')
      }
      this.selectedAreas = {}
    },
    onBreadCrumbClick (index) {
      if (this.lockMap) {
        return
      }
      this.breadCrumbBuf = this.breadCrumbBuf.slice(0, index + 1)
      this.code = this.breadCrumbBuf[this.breadCrumbBuf.length - 1].code
    },
    handleClick (e) {},
    goBack () {
      this.comparing = false
      this.setActiveItem('1')
    },
    doCompare () {
      this.isRequesting = true
      setTimeout(() => {
        this.comparing = true
        this.setActiveItem('2')
        this.isRequesting = false
      }, 1000)
    },
    onCloseTag (tag) {
      this.$delete(this.selectedAreas, tag.code)
    },
    onAreaSelect (data) {
      if (this.selectedAreas[data.code] != null) {
        this.$delete(this.selectedAreas, data.code)
      } else {
        data.color = Math.floor(Math.random() * 5)
        this.$set(this.selectedAreas, data.code, data)
      }
    },
    setActiveItem (index) {
      this.$refs.carousel.setActiveItem(index)
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
.el-carousel__indicators{
  display: none;
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
.vertical-flex > div:nth-child(2){
  width: 100%;
  flex-grow: 1;
  position: relative;
}
.vertical-flex > div:nth-child(2) > div{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}
.vertical-flex > div:nth-child(3) {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.content {
  height: 100%;
  width: 100%;
  display: flex;
}
.content > div:first-child {
  flex-grow: 5;
}
.content > div:nth-child(2) {
  width: 350px;
}
.el-button--small {
  padding: 9px 15px;
}
</style>
