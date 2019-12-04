import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import index from '@/views/Projects/index'
import NewProject from '@/views/Projects/create'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/project/new',
      name: 'NewProject',
      component: NewProject//新建项目
    },
    {
      path:'/project/:id',
      name:'ProjectDetail',
      component: () => import('@/views/Projects/show')//项目详情显示
    },
    {
      path:'/admin/message',
      name:'adminMessage',
      component: () => import('@/views/messages/index')//申请列表显示
    },
    {
      path:'/myproject',
      name:'Myproject',
      component: () => import('@/views/own/index')//我的项目列表显示
    },
  ]
})
