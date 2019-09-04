<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
        v-for='(item,index) in breadCrumb'
        :key='index'
        ><span @click='onBreadcrumbClick(index)' style='cursor:pointer'  v-bind:style="{ color: breadColor + ' !important'}">{{item.name}}</span></el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
  name: 'BreadCrumb',
  props: {
    breadCrumb: {
      type: Array,
      default () {
        return []
      }
    },
    breadColor: {
      type: String,
      default: 'white'
    }
  },
  methods: {
    onBreadcrumbClick (index) {
      this.$emit('bread-crumb-click', index)
    }
  }
}
</script>
