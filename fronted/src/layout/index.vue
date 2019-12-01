<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
       <el-submenu
          class="header-menu-submenu"
          v-for="link in links"
          v-bind:key="link.key"
          :index="link.url"
        >
          <template slot="title">{{link.name}}</template>
          <el-menu-item
            v-for="sub in link.submenu"
            v-bind:key="sub.key"
            :index="sub.url"
          >{{sub.name}}</el-menu-item>
        </el-submenu>
   
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      links: [
        {
          name: "所有任务",
          url: "/index",
          key: 1,
           submenu: [
            { name: "查看所有项目", url: "/original", key: 21 },
            { name: "创建项目", url: "/cover", key: 22 }
          ]
        },
        {
          name: "我的消息",
          url: "/message",
          key: 2,
          submenu: [
            { name: "申请项目", url: "/original", key: 21 },
            { name: "邀请消息", url: "/cover", key: 22 }
          ]
        },
        {
          name: "历史纪录",
          url: "/history",
          key: 3,
          submenu: [
            { name: "任务提交", url: "/acg", key: 31 },
            { name: "项目记录", url: "/reality", key: 32 }
          ]
        },
       
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>