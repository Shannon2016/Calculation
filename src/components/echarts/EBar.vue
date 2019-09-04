<template>
  <div class='echart' :id='id'></div>
</template>
<script>
import echartMixin from './echart-mixin'
export default {
  name: 'EBar',
  mixins: [echartMixin],
  data () {
    return {
      type: 'bar'
    }
  },
  watch: {
    data (to, from) {
      this.chart.clear()
      this.option.series = []
      console.log('---------')
      console.log(to)
      for (let i in to.legend) {
        this.option.series.push(this.getSeries(to.legend[i], to.values[i]))
      }
      for (let i in this.option.series) {
        this.option.series[i].color = this.colors[i]
      }
      console.log(to.legend)
      this.option.legend.data = to.legend
      this.option.yAxis.data = to.name
      this.chart.setOption(this.option)
    }
  },
  methods: {
    getSeries (name, data) {
      return {
        name,
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        barWidth: 30,
        data
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
