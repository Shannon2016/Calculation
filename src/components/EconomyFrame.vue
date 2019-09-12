<template>
  <div class="frame">
    <div class="col-flex1 box">
      <div>
        <slot name="left"></slot>
      </div>
      <div style="border:1px dashed rgba(255,255,255,0.4);flex-grow:0;margin:10px 0;"></div>
      <div style="border-top:none">
        <slot name="left-bottom"></slot>
      </div>
    </div>
    <div class="col-flex2">
      <div style="border-bottom:none;display:flex" class="box">
        <div style="flex-grow:1;width:0;">
          <slot name="center"></slot>
        </div>
        <div style="width:100px;">
          <slot name="center-right"></slot>
        </div>
      </div>
      <div class="center-bottom">
        <div style="border-top:none;" class="box">
          <slot name="bottom-top"></slot>
        </div>
        <div style="margin-top:20px;" class="box">
          <slot name="bottom"></slot>
        </div>
      </div>
    </div>
    <div class="col-flex3 box">
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.frame {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
}

.col-flex1,
.col-flex2,
.col-flex3 {
  display: flex;
  flex-direction: column;
  flex-grow: 1.5;
  width: 0;
}
/* .col-flex1,.col-flex3{
  max-width: 350px;
  min-width: 25%;
} */
.col-flex2 {
  flex-grow: 3;
}
.frame > div > div {
  flex-grow: 3;
  height: 0;
}
.box {
  background: rgba(0, 0, 0, 0.13);
  border: 0.5px solid rgba(255, 255, 255, 0.4);
  padding: 10px;
}
.col-flex1 {
  margin-right: 20px;
}
.col-flex3 {

  margin-left: 20px;
}
.col-flex1 > div:nth-child(3),
.col-flex2 > div:nth-child(2),
.col-flex3 > div:nth-child(2) {
  flex-grow: 2;
}

.center-bottom {
  display: flex;
  flex-direction: column;
}

.center-bottom > div:first-child {
  padding: 5px 20px;
}

.center-bottom > div:nth-child(2) {
  flex-grow: 1;
}
</style>
