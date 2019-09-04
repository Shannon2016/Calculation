<template>
  <AdminUsersFrame>
    <div slot='menu'>
        <div class="title">工程认证指标点</div>
        <div class="title">计算系统</div>
        <AppMenu></AppMenu>
    </div>
    <div slot='content'>
      123
    </div>
  </AdminUsersFrame>
</template>
<script>
import AdminUsersFrame from './AdminUsersFrame'
import AppMenu from './../../components/menu/AppMenu'
export default {
  name: 'AdminUsers',
  components: {
    AdminUsersFrame,
    AppMenu
  },
  data () {
    return {}
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style>
    .title {
        width: 100%;
        justify-content: center;
        color: white;
    }
</style>
