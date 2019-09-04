<template>
  <div class='echart map-wrap'>
    <div class='echart' :id='id'></div>
    <div>
      <el-button
      title='回到上级'
      type='primary'
      icon='el-icon-back'
      circle
      v-show='canGoBack'
      @click='goBack'
      ></el-button>
    </div>
  </div>
</template>
<script>
/**
 * events:
 *      go-back
 *      area-select
 *      area-change
 *      area-ready
 */
import echartMixin from './echart-mixin'
import china from 'sinomap/resources/china'
import Decode from './decode'
import axios from 'axios'

export default {
  name: 'EMap',
  mixins: [echartMixin],
  props: {
    code: {
      type: String,
      default: '100000'
    },
    name: {
      type: String,
      default: '中国'
    },
    val: {
      type: Object,
      default () {
        return {}
      }
    },
    lock: {
      type: Boolean,
      default: false
    },
    formatter: {
      type: Function,
      default: () => {}
    },
    selectedAreas: {
      type: Object,
      default () {
        return {}
      }
    },
    canGoBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      type: 'map',
      operating: false,
      current: '100000'
    }
  },
  watch: {
    selectedAreas (to, from) {
      for (var i of this.option.series[0].data) {
        if (to.hasOwnProperty(i.code)) {
          i.selected = true
        } else {
          i.selected = false
        }
      }
      this.chart.setOption(this.option)
    },
    lock (to, from) {
      if (from !== to) {
        var mapOption = this.option
        if (to === true) {
          mapOption.series[0].selectedMode = 'multiple'
        } else {
          mapOption.series[0].selectedMode = 'single'
        }
        this.chart.setOption(mapOption)
        this.option = mapOption
      }
    },
    code (to, from) {
      if (this.current === to) {
        return
      }
      if (from !== to) {
        this.queryAreaData(to, this.name)
      }
    },
    val (to, from) {
      console.log(to)
      this.option.visualMap.pieces = to.pieces
      for (let i of this.option.series[0].data) {
        if (to.value === null) {
          i.value = 0
          continue
        }
        i.value = to.value[i.code][to.name]
        if (i.value === null) {
          i.value = 0
        }
      }
      this.chart.setOption(this.option)
    }
  },
  methods: {
    lockOperate () {
      this.operating = true
      this.showLoading()
    },
    unlockOperate () {
      this.operating = false
      this.hideLoading()
    },
    canOperate () {
      return this.operating === false
    },
    setupChart () {
      this.option.tooltip.formatter = this.formatter
      var code = this.code
      var name = this.name
      this.chart = this.$echarts.init(
        document.getElementById(this.id),
        'dark'
      )
      this.chart.on('click', this.onAreaClick)
      if (this.queryHistoryMap(code)) {
        return
      }
      setTimeout(() => {
        if (code === '100000') {
          china.features.forEach(element => {
            if (element.properties.id.length === 2) {
              element.properties.id = element.properties.id + '0000'
            }
          })
          this.$echarts.registerMap('100000', china)
          this.option.series[0].mapType = '100000'
          this.option.series[0].data = china.features.map(i => {
            return {
              name: i.properties.name,
              value: Math.random() * 30,
              code: i.properties.id,
              label: i.properties.name
            }
          })
          this.chart.setOption(this.option)
          this.current = '100000'
          this.$emit('area-ready', true)
        } else {
          this.queryAreaData(code, name)
        }
      }, 0)
    },
    goBack () {
      if (this.lock || this.operating) {
        return
      }
      this.$emit('go-back')
    },
    onAreaClick (params) {
      if (this.operating) {
        return
      }
      if (this.lock) {
        this.$emit('area-select', params.data)
      } else {
        this.$emit('area-click', params.data)
      }
    },
    queryHistoryMap (code) {
      let m = this.$echarts.getMap(code)
      if (m !== null && m !== undefined) {
        this.option.series[0].mapType = code
        this.option.series[0].data = m.geoJson.features.map(i => {
          return {
            name: i.properties.name,
            value: Math.random() * 30,
            code: i.properties.id,
            label: i.properties.name
          }
        })
        this.chart.setOption(this.option)
        this.current = code
        this.$emit('area-ready', true)
        return true
      }
      return false
    },
    queryAreaData (code, name) {
      if (this.lock) {
        console.log('已锁定地图')
        return false
      }
      if (!this.canOperate()) {
        console.log('正在处理')
        return false
      }
      if (this.queryHistoryMap(code)) {
        return
      }
      this.lockOperate()
      axios.get('/map/sinoblock/v1/apidistrict?key=91a73a33c8964682fdba3f89dc96f280&type=mx&district_par_code=' + code)
        .then(res => {
          if (res.data.success === 1) {
            this.$emit('area-ready', true)
            this.current = code
            var ii = {
              type: 'FeatureCollection',
              features: res.data.district_lst.map(i => {
                var c = new Decode()
                return {
                  type: 'Feature',
                  geometry: {
                    type: i.geometry.type,
                    coordinates: c.decodeCoordinate(i.geometry)
                  },
                  properties: {
                    id: i.code,
                    childNum: 1,
                    cp: c._decodePoint(c, i.center),
                    name: i.name
                  }
                }
              })
            }
            this.option.series[0].mapType = code
            this.option.series[0].data = ii.features.map(i => {
              return {
                name: i.properties.name,
                value: Math.random() * 30,
                code: i.properties.id,
                label: i.properties.name
              }
            })
            this.$echarts.registerMap(code, ii)
            this.chart.setOption(this.option)
          } else {
            this.$emit('area-ready', false, name)
          }
        }).catch(() => {
          this.$emit('area-ready', false, name)
          console.log('网络信号差')
        }).finally(() => { this.unlockOperate() })
    }
  }
}
</script>
<style scoped>
.echart{
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
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
  left: 0;
  width: 40px;
  height: 40px;
}
</style>
