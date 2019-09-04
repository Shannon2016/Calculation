import getConfig from './echart-config'
import {mapState} from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    text: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState([
      'resizeVersion'
    ])
  },
  data () {
    return {
      chart: null,
      option: {},
      colors: ['rgb(97,160,168)', 'rgb(212,130,101)', 'rgb(194,53,49)']
    }
  },
  mounted () {
    this.option = getConfig(this.type)
    if (this.text !== '') {
      this.option.title = {
        text: this.text,
        subtext: this.subtext,
        x: 'center'
      }
    }
    this.setupChart()
  },
  watch: {
    data () {
      this.setupChart()
    },
    resizeVersion (to, from) {
      this.chart.resize()
    },
    loading (to, from) {
      if (to !== from) {
        if (to === true) {
          this.showLoading()
        } else if (to === false) {
          this.hideLoading()
        }
      }
    }
  },
  methods: {
    showLoading () {
      this.chart.showLoading({
        text: 'loading',
        color: '#fff',
        textColor: '#fff',
        maskColor: 'rgba(0, 0, 0, 0.3)'
      })
    },
    hideLoading () {
      this.chart.hideLoading()
    },
    setupChart () {
      this.chart = this.$echarts.init(
        document.getElementById(this.id),
        'dark'
      )
      this.chart.setOption(this.option)
    }
  }
}
