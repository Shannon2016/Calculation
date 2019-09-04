<template>
  <div class='echart' :id='id'></div>
</template>
<script>
import echartMixin from './echart-mixin'
export default {
  name: 'ELine',
  mixins: [echartMixin],
  props: {
    direction: {
      type: String,
      default: 'row'
    }
  },
  data () {
    return {
      type: 'line'
    }
  },
  watch: {
    data (to, from) {
      this.option.series = []
      for (var i in to.legend) {
        this.option.series.push(this.getSeries(to.legend[i], to.values[i]))
      }
      this.option.legend.data = to.legend
      if (this.direction === 'row') {
        this.option.xAxis.data = to.name
      } else {
        this.option.yAxis.data = to.name
      }
      this.chart.setOption(this.option)
    }
  },
  methods: {
    setupChart () {
      this.chart = this.$echarts.init(
        document.getElementById(this.id),
        'dark'
      )
      if (this.direction === 'row') {
      } else if (this.direction === 'col') {
        this.option.xAxis = {
          type: 'value'
        }
        this.option.yAxis = {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      }
      this.chart.setOption(this.option)
    },
    getSeries (name, data) {
      return {
        data,
        type: 'line',
        name,
        symbolSize: 10
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
