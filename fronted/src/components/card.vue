<template>
  <div class="nav-card">
    <div class="title">{{title}}</div>
    <div class="nav-border"></div>
    <div class="sub-title">{{subtitle}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subtitle: String
  }
};
</script>
<style >
.nav-card {
  margin-left: 36px;
  top: 132px;
  /* width: 1480px; */
  height: 126px;
  line-height: 20px;
  text-align: center;
  border: 1px solid rgba(224, 224, 224, 1);
  background: #ffffff;
}
.nav-border {
  margin-top: 30px;
  top: 192px;
  /* width: 1480px; */
  height: 14px;
  background: #e0e0e0;
}
.title {
  margin-top: 10px;
  width: 81px;
  height: 20px;
  line-height: 29px;
  color: rgba(112, 112, 112, 1);
  font-size: 20px;
  font: bold;
  text-align: center;
}
.sub-title {
  margin-top: 10px;
  margin-left: 50px;
  top: 208px;
  width: 178px;
  height: 45px;
  line-height: 26px;
  color: rgba(16, 16, 16, 1);
  font-size: 26px;
  text-align: left;
}
</style>