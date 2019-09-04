<template>
  <div class='echart' :id='id'></div>
</template>
<script>
import echartMixin from './echart-mixin'
export default {
  name: 'EPie',
  mixins: [echartMixin],
  data () {
    return {
      type: 'pie'
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
