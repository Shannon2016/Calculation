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
    width:300px;
    background-image: url('../../assets/menu.png');
    background-size: cover;
  }

  .contentBox {
    height: 100%;
    flex-grow: 1;
    padding: 0 50px;
    text-align: left;
    background-color: #f9f9f9;
    overflow-y: scroll;
  }
</style>
