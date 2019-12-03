// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'


import Api from './api/index';
import store from './store';
import myMenu from './layout/index';
Vue.component("myMenu",myMenu);
Vue.use(ElementUI, {size:'small',zIndex:3000});
Vue.config.productionTip = false
Vue.prototype.$api=Api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.filter('projectStatus', function(value) {
  console.log(value)
  if (value) {
    if(value==0|value==6)
      return '已发布';
    else if(value==2)
      return '招募中';
    else if(value==3)
      return '进行中';
    else if(value==4)
      return '已结束';
  } else {
    return '未知状态';
  }
});
