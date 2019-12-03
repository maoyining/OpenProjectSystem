<template>
  <div id="app">
  <layout></layout>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
import layout from './index'
export default {
  name: 'App',
   components: {
   layout
  },
}

</script>

<style>
#app{
  background:#f0f0f2;
}
</style>
