<template>
  <div class='echart' :id='id'></div>
</template>
<script>
import echartMixin from './echart-mixin'
export default {
  name: 'ESmoothLine',
  mixins: [echartMixin],
  data () {
    return {
      type: 'smLine'
    }
  },
  watch: {
    data (to, from) {
      this.option.xAxis.data = to.name
      this.option.title = {
        show: false
      }
      this.option.series = to.values.map(i => this.getSeries(i))
      this.chart.setOption(this.option)
      console.log(this.option)
    }
  },
  methods: {
    getSeries (data) {
      return {
        data,
        type: 'line',
        smooth: true,
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: 'rgb(145,199,174)',
            lineStyle: {
              color: 'rgb(145,199,174)'
            }
          }
        }
      }
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
</style>
