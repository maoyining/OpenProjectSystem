<template>
  <div id="app">
    <div v-if="this.$store.state.token==null">
      <login></login>
    </div>
 <div v-if="this.$store.state.token!=null">
     <layout></layout>
    </div>
 
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
import login from '@/views/Login.vue'
import layout from './index'
export default {
  name: 'App',
   components: {
   layout,
   login
  },
}

</script>

<style>
#app{
  background:#f0f0f2;
}
</style>
