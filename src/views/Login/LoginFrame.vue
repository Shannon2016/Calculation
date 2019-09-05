<template>
  <div class='container'>
    <div class='topBox'>
      <div>
        <slot name='top'></slot>
      </div>
    </div>
    <div class='centerBox'>
      <div>
        <slot name='center'></slot>
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
    justify-content: center;
    display: flex;
    flex-direction: column;
    background-image: url('../../assets/home.png');
    background-size: cover;
  }

  .topBox{
    width:500px;
    height:40px;
    margin:auto;
    justify-content: center;
    text-align:center;
    vertical-align: center;
    color: white;
    padding:0 25px;
  }

  .centerBox {
    background-color: rgba(255,255,255, 0.3);
    margin:auto;
    width:auto;
    height:auto;
  }
</style>
