<template>
  <div class='vertical-flex'>
    <div>
        <div><ELine id='res-p-1'></ELine></div>
        <div><ELine id='res-p-2'></ELine></div>
        <div><ELine id='res-p-3'></ELine></div>
    </div>
    <div>
        <div><ELine id='res-p-4'></ELine></div>
        <div><ELine id='res-p-5'></ELine></div>
        <div><ELine id='res-p-6'></ELine></div>
    </div>
    <div>
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
  name: 'ComparePopulationResult',
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
      title: '时空大数据-人口对比分析',
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
<style scoped>
.vertical-flex {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.vertical-flex > div {
  flex-grow: 1;
  display: flex;
  width: 0;
  flex-direction: column;
}
.vertical-flex > div:nth-child(3){
  width: 350px;
  flex-grow: 0;
}
.vertical-flex > div > div{
  flex-grow: 1;
  height: 0;
}

</style>
