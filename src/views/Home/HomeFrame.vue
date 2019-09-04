<template>
  <div class='container'>
    <div class='menuBox'>
      <div>
        <slot name='menu'></slot>
      </div>
    </div>
    <div class='contentBox'>
      <div>
        <slot name='content'></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeFrame',
  components: {},
  data () {
    return {}
  }
}
</script>
<style scoped>
  .container{
    height: 100%;
    width: 100%;
    display: flex;
  }

  .menuBox{
    height:100%;
    width:350px;
    background-image: url('../../assets/menu.png');
    background-size: 100% 100%;
  }

  .contentBox {
    height: 100%;
    flex-grow: 1;
  }
</style>
