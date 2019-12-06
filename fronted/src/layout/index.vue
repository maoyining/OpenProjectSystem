<template>
  <div class="menu">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose" >
      <el-submenu
        class="header-menu-submenu"
        v-for="link in links"
        v-bind:key="link.key"
        :index="link.url"
      >
      <template slot="title" ><i class="el-icon-folder"></i>{{link.name}}</template>
        <el-menu-item
          v-for="sub in link.submenu"
          v-bind:key="sub.key"
          :index="sub.url"
          @click="MunuClick(sub.url)"
        >{{sub.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
 
  min-height: 400px;
}
.el-submenu__title{
  font-size: 20px;
  color:#050505;
}
.el-submenu .el-menu-item{
  color: #050505;

  font-size:20px;
}
.header-menu-submenu{
  margin-top:14px;
}
.el-menu{
  margin-left:5px;
  margin-top:50px;
}
.el-submenu [class^=el-icon-] {
  font-size: 24px;
  
}
.el-submenu__title i{
  color:#707070;
}
.el-menu-item.is-active{
  background:#F55D54
}
</style>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      role: "",
      links: [
        {
          name: "所有项目",
          url: "/project",
          key: 1,
          role: 2,
          submenu: [
            { name: "查看所有项目", url: "/", key: 21, role: 2 },
            { name: "创建项目", url: "/project/new", key: 22, role: 0 },
          ]
        },
        {
          name: "我的项目",
          url: "/myproject",
          key: 5,
          role: 2,
          submenu: [
            { name: "申请中", url: "/myproject/in/1", key: 51, role: 2 },
            { name: "被拒绝", url: "/myproject/reject/2", key: 52, role: 2 },
            { name: "我的项目", url: "/myproject/3", key: 53, role: 2 },
            { name: "分配任务", url: "/project/new", key: 54, role: 0 },
          ]
        },
        {
          name: "项目审核",
          url: "/admin",
          key: 4,
          role: 0,
          submenu: [
            { name: "审核申请消息", url: "/admin/message", key: 41, role: 2 },
            {
              name: "审核项目提交材料",
              url: "/admin/project",
              key: 42,
              role: 2
            }
          ]
        },

        {
          name: "我的消息",
          url: "/message",
          key: 2,
          role: 2,
          submenu: [
            { name: "申请项目", url: "/original", key: 21, role: 2 },
            { name: "邀请消息", url: "/cover", key: 22, rol2: 2 }
          ]
        },
        {
          name: "历史纪录",
          url: "/history",
          key: 3,
          role: 2,
          submenu: [
            { name: "任务提交", url: "/acg", key: 31, role: 2 },
            { name: "项目记录", url: "/reality", key: 32, role: 2 }
          ]
        }
      ],
      linkt: [
        {
          name: "所有项目",
          url: "/project",
          key: 1,
          role: 2,
          submenu: [
            { name: "查看所有项目", url: "/", key: 21, role: 2 },
            
          ]
        },
        {
          name: "我的项目",
          url: "/myproject",
          key: 5,
          role: 2,
          submenu: [
            { name: "申请中", url: "/myproject/in/1", key: 51, role: 2 },
            { name: "被拒绝", url: "/myproject/reject/2", key: 52, role: 2 },
            { name: "我的项目", url: "/myproject/3", key: 53, role: 2 },
            { name: "分配任务", url: "/project/new", key: 54, role: 0 },
          ]
        },
        {
          name: "项目审核",
          url: "/admin",
          key: 4,
          role: 0,
          submenu: [
            { name: "审核申请消息", url: "/admin/message", key: 41, role: 2 },
            {
              name: "审核项目提交材料",
              url: "/admin/project",
              key: 42,
              role: 2
            }
          ]
        },

        {
          name: "我的消息",
          url: "/message",
          key: 2,
          role: 2,
          submenu: [
            { name: "申请项目", url: "/original", key: 21, role: 2 },
            { name: "邀请消息", url: "/cover", key: 22, rol2: 2 }
          ]
        },
        {
          name: "历史纪录",
          url: "/history",
          key: 3,
          role: 2,
          submenu: [
            { name: "任务提交", url: "/acg", key: 31, role: 2 },
            { name: "项目记录", url: "/reality", key: 32, role: 2 }
          ]
        }
      ]
    };
  },
  mounted() {
    this.role = this.$store.state.role;
    console.log(this.role);
  },
  methods: {
    MunuClick(e) {
      this.$router.push({ path: e });
    },
    //todo
    //文件夹的打开关闭
    handleOpen(e){
      //console.log(e);
    },
    handleClose(e){
      //console.log(e);
    }
  }

};
</script>