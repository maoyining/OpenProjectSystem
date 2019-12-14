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
      path: '/project/task',
      name: 'task',
      component: NewProject//显示任务
    },
    {
      path:'/project/show',
      name:'Showproject',
      component: () => import('@/views/Projects/teacherproject')//导师和学生项目列表显示
    },
    {
      path:'/project/:id',
      name:'ProjectDetail',
      component: () => import('@/views/Projects/show')//项目详情显示
    },
    {
      path:'/message',
      name:'adminMessage',
      component: () => import('@/views/messages/index')//申请列表显示
    },
    {
      path:'/myproject/:id',
      name:'Myproject',
      component: () => import('@/views/own/index')//我的项目列表显示
    },
    {
      path:'/myproject/in/:id',
      name:'Myproject',
      component: () => import('@/views/own/index')//申请中列表显示
    },
    {
      path:'/myproject/reject/:id',
      name:'Myproject',
      component: () => import('@/views/own/index')//我的项目列表显示
    },
    {
      path:'/task',
      name:'MyTask',
      component: () => import('@/views/task/task')//我的项目列表显示
    },
  
  ]
})
