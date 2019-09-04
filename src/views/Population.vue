<template>
  <div class="vertical-flex">
    <TitleBar :title="title">
      <BreadCrumb :breadCrumb="g.breadCrumb" @bread-crumb-click="onBreadCrumbClick"></BreadCrumb>
    </TitleBar>
    <div>
      <HomeFrame>
        <ELine :loading='loading.left' direction="col" :data='populationIncrease' id="chart-left" slot="left"></ELine>
        <div slot='right' style='display:flex;  flex-direction: column;height:100%;'>
          <el-select v-model="currentTab" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="index">
          </el-option>
          </el-select>
          <EBar :data='barValue' :loading='loading.right' style='flex-grow:1;' id="chart-right"></EBar>
        </div>
        <ESmoothLine :loading='loading.bottom' :data='totalPopulation' id="chart-bottom" slot="bottom" text="总人口"></ESmoothLine>
        <Map
          @go-back='onGoBack'
          @area-click='onAreaClick'
          @area-ready='onAreaReady'
          :val = 'val'
          :loading = 'loading.map'
          :canGoBack='canGoBack'
          :formatter='mapFormatter()'
          id="map456"
          slot="center"
          :code='g.area'
          :name='g.name'
        ></Map>
        <div slot="center-right">
          <el-radio-group v-model="g.highLightIndex" @change='onHighLightChange'  id="center-right">
            <el-radio-button border :label="index" v-bind:key='index' v-for="(item,index) in ['总人口','人口密度','自然增长率']">{{item}}</el-radio-button>
          </el-radio-group>
        </div>
        <div slot="bottom-top" id="bottom-top">
          <div>
            <el-slider
              @change='onSilderChange'
              :step="1"
              show-stops
              :max="yearRange.max"
              :min="yearRange.min"
              input-size="mini"
              v-model="g.year"
            ></el-slider>
          </div>
          <div>
            <el-input-number :min="2020" :max="9999" size="small" v-model="g.predictYear"></el-input-number>
          </div>
          <div>
            <el-button type="primary" size="small" @click='doPredict'>预测</el-button>
          </div>
          <div>
            <el-button type="primary" size="small" @click="doCompare">对比分析</el-button>
          </div>
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
import _global from '../store/global'
import {getBack} from '../utils/utils'
export default {
  components: {Map, TitleBar, HomeFrame, EPie, EBar, ELine, ESmoothLine, BreadCrumb},
  data () {
    return {
      g: _global,
      radio: 3,
      title: '时空大数据-人口专题',
      yearRange: {
        min: _global.min,
        max: _global.max
      },
      currentTab: _global.currentTab,
      options: [{
        label: '男/女 人口',
        url: '/population/queryMaleAndFemale',
        _name: 'xzqh_name',
        legend: ['男性人口', '女性人口'],
        _value: ['population_male', 'population_female']
      }, {
        label: '城镇/农村 人口',
        url: '/population/queryTownAndVillage',
        _name: 'xzqh_name',
        legend: ['城镇人口', '农村人口'],
        _value: ['population_town', 'population_village']
      }, {
        label: '人口密度',
        url: '/population/queryDensity',
        _name: 'xzqh_name',
        legend: ['人口密度'],
        _value: ['population_density']
      }, {
        label: '人口年龄抽样',
        url: '/population/queryAgeSample',
        _name: 'xzqh_name',
        legend: ['0-14', '15-64', '65-'],
        _value: ['population_sample_low', 'population_sample_middle', 'population_sample_high']
      }, {
        label: '少儿/老年 抚养比',
        url: '/population/queryChildrenAndOldmanBringupRate',
        _name: 'xzqh_name',
        legend: ['少儿抚养比', '老年抚养比'],
        _value: ['rate_bringup_children', 'rate_bringup_oldman']
      }],
      totalPopulation: {
        legend: [],
        name: [],
        values: []
      },
      populationIncrease: {
        legend: [],
        name: [],
        values: []
      },
      loading: {
        version: 0,
        map: false,
        left: false,
        right: false,
        bottom: false
      },
      barValue: {
        legend: [],
        name: [],
        values: []
      },
      totalValue: {},
      val: {
        name: '',
        pieces: [],
        value: null
      },
      names: [
        'populationTotal',
        'populationDensity',
        'populationIncrease'
      ],
      pieces: [
        [
          {min: 6, max: 100, label: '安全', color: '#FF8500'},
          {min: 3, max: 6, label: '安全', color: '#FF5500'},
          {min: 0, max: 3, label: '安全', color: '#FF2500'}
        ],
        [
          {min: 6, max: 100, label: '安全', color: '#FF8500'},
          {min: 3, max: 6, label: '安全', color: '#FF5500'},
          {min: 0, max: 3, label: '安全', color: '#FF2500'}
        ],
        [
          {min: 6, max: 100, label: '安全', color: '#FF8500'},
          {min: 3, max: 6, label: '安全', color: '#FF5500'},
          {min: 0, max: 3, label: '安全', color: '#FF2500'}
        ]
      ]
    }
  },
  watch: {
    currentTab (to, from) {
      this.g.currentTab = to
      this.queryOther({
        year: this.g.isPredicting ? this.g.predictYear : this.g.year,
        area: this.g.area,
        version: this.loading.version
      })
    }
  },
  computed: {
    canGoBack () {
      return this.g.breadCrumb.length > 1
    }
  },
  mounted () {
    this.$request({
      url: '/population/queryYearData',
      success: (res) => {
        this.g.max = res.list[1]
        this.g.min = res.list[0]
        this.yearRange.max = this.g.max
        this.yearRange.min = this.g.min
      }
    })
  },
  methods: {
    onHighLightChange (val) {
      console.log(val)
      this.changeVal(this.totalValue, val)
    },
    mapFormatter () {
      var that = this
      return (param) => {
        if (Object.getOwnPropertyNames(that.totalValue).length === 1) {
          return '暂无数据'
        }
        var lines = []
        var v = that.totalValue[param.data.code]
        lines.push({
          '总人口': v.populationTotal
        })
        lines.push({
          '人口密度': v.populationDensity
        })
        lines.push({
          '自然增长率': v.populationIncrease
        })
        lines.push({
          '出生率': v.rateBirth,
          '死亡率': v.rateDeath
        })
        lines.push({
          '男': v.populationMale,
          '女': v.populationFemale
        })
        lines.push({
          '城镇': v.populationTown,
          '农村': v.populationVillage
        })
        lines.push({
          '少儿抚养比': v.rateBringupChildren,
          '老年抚养比': v.rateBringupOldman
        })
        lines.push({
          '0-14': v.populationSampleLow,
          '15-64': v.populationSampleMiddle,
          '65-': v.populationSampleHigh
        })
        let colors = ['rgb(97,160,168)', 'rgb(212,130,101)', '#dd6b66', '#66c766', '#666bd6', '#dd6b66', '#88d647', '#cc6bcc']
        let index = 0
        var res = `<div style='width:350px;text-align:left;'>${param.data.name}<br>`
        for (let i of lines) {
          res += `<div style='display:flex'>`
          for (let j in i) {
            res += `<span style='flex-grow:1;width:0;'><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${colors[index]};"></span>${j}：${i[j]}</span>`
          }
          index++
          res += '</div>'
        }
        res += '</div>'
        return res
      }
    },
    changeVal (value, type) {
      this.val = {
        name: this.names[type],
        pieces: this.pieces[type],
        value
      }
    },
    mapList (list, name, value) {
      return {
        name: list.map(i => {
          return i[name]
        }),
        values: value.map(e => list.map(i => i[e])),
        code: list.map(i => i['xzqh_code'])
      }
    },
    onSilderChange (e) {
      this.g.isPredicting = false
      this.queryData({
        year: this.g.year,
        area: this.g.area
      })
    },
    doPredict () {
      this.g.isPredicting = true
      this.queryData({
        year: this.g.predictYear,
        area: this.g.area
      })
    },
    lockQuery () {
      this.loading.version++
      this.loading.left = true
      this.loading.right = true
      this.loading.bottom = true
    },
    queryData ({
      year = 2018,
      area = '100000'
    }) {
      this.lockQuery()
      var param = {
        year,
        area,
        version: this.loading.version
      }
      this.queryRadio(param)
      this.queryTotal(param)
      this.queryOther(param)
    },
    queryRadio ({
      year,
      area,
      version
    }) {
      if (this.g.isPredicting) {
        this.$request({
          url: 'populationIncrease',
          data: {
            xzqhCode: area,
            year
          },
          success: (res) => {
            if (this.loading.version === version) {
              this.loading.left = false
            }
          },
          fail: (res) => {
            this.loading.left = false
            this.$err()
          }
        })
      } else {
        this.$request({
          url: `/population/queryBirthAndDeathRate`,
          method: 'POST',
          data: {
            xzqhArea: area,
            year
          },
          success: (res) => {
            if (this.loading.version === version) {
              this.loading.left = false
              let temp = this.mapList(res.list, 'xzqh_name', ['rate_birth', 'rate_death', 'population_increase'])
              temp.legend = ['出生率', '死亡率', '自然增长率']
              this.populationIncrease = temp
            }
          },
          fail: (res) => {
            this.loading.left = false
            this.$err('服务器错误')
          },
          error: (res) => {
            this.loading.left = false
            this.$err()
          }
        })
      }
    },
    queryTotal ({
      year,
      area,
      version
    }) {
      if (this.g.isPredicting) {
        this.$request({
          url: 'populationIncrease',
          data: {
            xzqhCode: area,
            year
          },
          success: (res) => {
            if (this.loading.version === version) {
              this.loading.bottom = false
            }
            console.log(res)
          },
          fail: (res) => {
            this.loading.bottom = false
          }
        })
      } else {
        this.$request({
          url: `/population/queryTotal`,
          method: 'post',
          data: {
            xzqhArea: area,
            year: year
          },
          success: (res) => {
            if (this.loading.version === version) {
              console.log(res.list)
              this.loading.bottom = false
              this.totalPopulation = this.mapList(res.list, 'xzqh_name', ['population_total'])
            }
          },
          fail: (res) => {
            this.loading.bottom = false
            this.$err('服务器错误')
          },
          error: (res) => {
            this.loading.bottom = false
            this.$err()
          }
        })
      }
    },
    queryOther ({
      year,
      area,
      version
    }) {
      if (this.g.isPredicting) {
        this.$request({
          url: `/queryYearData`,
          data: {
            xzqhArea: area,
            year
          },
          success: (res) => {
            if (this.loading.version === version) {
              this.loading.right = false
            }
          },
          fail: (res) => {
            this.loading.right = false
          }
        })
      } else {
        let option = this.options[this.currentTab]
        this.$request({
          url: option.url,
          data: {
            xzqhArea: area,
            year
          },
          method: 'POST',
          success: (res) => {
            if (this.loading.version === version) {
              this.loading.right = false
              let temp = this.mapList(res.list, option._name, option._value)
              temp.legend = option.legend
              this.barValue = temp
            }
          },
          fail: (res) => {
            this.loading.right = false
          }
        })
      }
    },
    doCompare () {
      this.$router.push('/compare-population')
    },
    onAreaReady (ok, name) {
      if (ok) {
        this.g.breadCrumb = this.g.breadCrumbBuf.map(i => i)
        this.g.areaBuf = this.g.area
        this.g.nameBuf = this.g.name
        this.queryData({
          year: this.g.isPredicting ? this.g.predictYear : this.g.year,
          area: this.g.area
        })
        let version = this.loading.version
        this.totalValue = {}
        this.$request({
          url: '/population/queryByAreaAndTime',
          data: {
            xzqhArea: this.g.area,
            year: this.g.isPredicting ? this.g.predictYear : this.g.year
          },
          method: 'POST',
          success: (res) => {
            if (this.loading.version === version) {
              var t = {}
              for (let i of res.list) {
                t[i.xzqhCode] = i
              }
              this.totalValue = t
              this.changeVal(this.totalValue, this.g.highLightIndex)
            }
          }
        })
      } else {
        this.g.breadCrumbBuf = this.g.breadCrumb.map(i => i)
        this.g.area = this.g.areaBuf
        this.g.name = this.g.nameBuf
        this.$message({
          showClose: true,
          message: `[${name}] 没有下辖行政区`,
          type: 'error'
        })
      }
    },
    onAreaClick (params) {
      for (var i of this.g.breadCrumbBuf) {
        if (i.code === params.code) {
          this.$message({
            showClose: true,
            message: `[${params.name}] 没有下辖行政区`,
            type: 'error'
          })
          return
        }
      }
      this.g.breadCrumbBuf.push({
        name: params.name,
        code: params.code
      })
      this.g.area = params.code
      this.g.name = params.name
    },
    onGoBack () {
      if (this.g.breadCrumbBuf.length > 1) {
        this.g.breadCrumbBuf.pop()
        let temp = getBack(this.g.breadCrumbBuf)
        this.g.area = temp.code
        this.g.name = temp.name
      } else {
        console.log('go-back 失败：已经没有上级')
      }
    },
    onBreadCrumbClick (index) {
      this.g.breadCrumbBuf = this.g.breadCrumbBuf.slice(0, index + 1)
      let temp = getBack(this.g.breadCrumbBuf)
      this.g.area = temp.code
      this.g.name = temp.name
    }
  }
}
</script>
<style>
.el-select{
  margin-bottom: 10px !important;
}

.el-select-dropdown__item{
  color:#fff !important;
  padding-left:15px !important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background: rgb(43, 93, 146) !important;
  color:#fff !important;
}
.el-select-dropdown{
  background: rgb(10,32,56) !important;
  color: #fff !important;
}
.col-flex3 .el-input__inner{
  background: transparent;
  color:white;
}
</style>

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
  padding-bottom: 20px;
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
#bottom-top{
  display: flex;
}
#bottom-top > div{
  margin: 5px;
}
#bottom-top > div:first-child{
  flex-grow: 1;
}

</style>
