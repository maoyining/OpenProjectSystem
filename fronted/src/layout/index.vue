<template>
  <div class="menu">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <div v-if="this.role==1">
        <el-submenu
          class="header-menu-submenu"
          v-for="link in linka"
          v-bind:key="link.key"
          :index="link.url"
        >
          <template slot="title">
            <i class="el-icon-folder"></i>
            {{link.name}}
          </template>
          <el-menu-item
            v-for="sub in link.submenu"
            v-bind:key="sub.key"
            :index="sub.url"
            @click="MunuClick(sub.url)"
          >{{sub.name}}</el-menu-item>
        </el-submenu>
      </div>
      <div v-if="this.role==2">
        <el-submenu
          class="header-menu-submenu"
          v-for="link in links"
          v-bind:key="link.key"
          :index="link.url"
        >
          <template slot="title">
            <i class="el-icon-folder"></i>
            {{link.name}}
          </template>
          <el-menu-item
            v-for="sub in link.submenu"
            v-bind:key="sub.key"
            :index="sub.url"
            @click="MunuClick(sub.url)"
          >{{sub.name}}</el-menu-item>
        </el-submenu>
      </div>
      <div v-if="this.role==3">
        <el-submenu
          class="header-menu-submenu"
          v-for="link in linkt"
          v-bind:key="link.key"
          :index="link.url"
        >
          <template slot="title">
            <i class="el-icon-folder"></i>
            {{link.name}}
          </template>
          <el-menu-item
            v-for="sub in link.submenu"
            v-bind:key="sub.key"
            :index="sub.url"
            @click="MunuClick(sub.url)"
          >{{sub.name}}</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.el-submenu__title {
  font-size: 20px;
  color: #050505;
}
.el-submenu .el-menu-item {
  color: #050505;

  font-size: 20px;
}
.header-menu-submenu {
  margin-top: 14px;
}
.el-menu {
  margin-left: 5px;
  margin-top: 50px;
}
.el-submenu [class^="el-icon-"] {
  font-size: 24px;
}
.el-submenu__title i {
  color: #707070;
}
.el-menu-item.is-active {
  background: #f55d54;
}
</style>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      role: "",
      linka: [
        {
          name: "所有项目",
          url: "/project",
          key: 1,
          role: 2,
          submenu: [
            { name: "查看所有项目", url: "/", key: 11, role: 2 },
            { name: "创建项目", url: "/project/new", key: 12, role: 0 }
          ]
        },
        {
          name: "项目审核",
          url: "/review",
          key: 2,
          role: 2,
          submenu: [
            { name: "申请审核", url: "/message", key: 21, role: 2 },
            { name: "提交审核", url: "/404", key: 22, role: 2 },
          ]
        },
      ],
      links: [
        {
          name: "我的项目",
          url: "/project",
          key: 1,
          role: 2,
          submenu: [{ name: "查看项目", url: "/project/show", key: 11, role: 2 },
          { name: "我的任务", url: "/task", key: 12, role: 2 }]
        },
        {
          name: "所有项目",
          url: "/myproject",
          key: 2,
          role: 2,
          submenu: [
            { name: "查看所有项目", url: "/", key: 21, role: 0 }
          ]
        },
        {
          name: "我的消息",
          url: "/message",
          key: 3,
          role: 2,
          submenu: [
            { name: "我收到的", url: "/message/student/receive", key: 31, role: 2 },
            { name: "我发出的", url: "/message/student/send", key: 32, rol2: 2 }
          ]
        },
        {
          name: "历史纪录",
          url: "/history",
          key: 4,
          role: 2,
          submenu: [
            { name: "任务提交", url: "/404", key: 41, role: 2 },
            { name: "项目记录", url: "/404", key: 42, role: 2 }
          ]
        },
        {
          name: "个人信息",
          url: "/history",
          key: 5,
          role: 2,
          submenu: [
            { name: "查看信息", url: "/404", key: 51, role: 2 },
            { name: "修改信息", url: "/404", key: 52, role: 2 }
          ]
        }
      ],
      linkt: [
        {
          name: "我的项目",
          url: "/project",
          key: 1,
          submenu: [
            { name: "查看我的项目", url: "/project/show", key: 11 },
            { name: "任务分配", url: "/task/assign", key: 12 },
            { name: "任务审核", url: "/404", key: 13 }
          ]
        },
        {
          name: "所有项目",
          url: "/myproject",
          key: 2,
          submenu: [{ name: "查看所有项目", url: "/", key: 21 }]
        },
        {
          name: "我的消息",
          url: "/messages",
          key: 3,
          role: 0,
          submenu: [
            { name: "我收到的", url: "/message/teacher/receive", key: 31},
            {name: "我发出的",url: "/message/teacher/send",key: 32,}
          ]
        },
        {
          name: "历史纪录",
          url: "/message",
          key: 4,
          submenu: [
            { name: "审核记录", url: "/404", key: 41, role: 2 },
            { name: "项目提交", url: "/404", key: 42, rol2: 2 }
          ]
        },
        {
          name: "个人信息",
          url: "/history",
          key: 5,
          role: 2,
          submenu: [
            { name: "查看信息", url: "/404", key: 51, role: 2 },
            { name: "修改信息", url: "/404", key: 52, role: 2 }
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
    handleOpen(e) {
      //console.log(e);
    },
    handleClose(e) {
      //console.log(e);
    }
  }
};
</script>