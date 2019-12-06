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
import navCard from '@/components/card.vue'
Vue.component("myMenu",myMenu);
Vue.component("navCard",navCard);
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
function pad(n) {
  return n<10 ? '0'+n : n;
}
//项目状态
//已发布，招募中，已结束
Vue.filter('projectStatus', function(value) {
  if (value!=null) {
    if(value==0)
      return '已发布';
    else if(value==1)
      return '招募中';
    else if(value==2)
      return '进行中';
    else if(value==3)
      return '已结束';
  } else {
    return '未知状态';
  }
});
//人与项目的关系
//
Vue.filter('projectState', function(value) {
  if (value!=null) {
    if(value==3)
      return '申请中';//学生申请中
    else if(value==5)
      return '参与中';//学生已在项目里面
    else if(value==7)
      return '被拒绝';//学生被老师拒绝
    else if(value==1)
      return '申请中';//导师申请项目中
    else if(value==2)
      return '参与中';//导师成功获取项目
    else if(value==6)
      return '被拒绝';//导师被管理员拒绝
  } else {
    return '未知状态';
  }
});
Vue.filter('formatDate', function(value) {
  if (value) {
    value = new Date(value);
    return `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} `;
  } else {
    return '';
  }
});
