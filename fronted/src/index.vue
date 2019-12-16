<template>
  <el-container>
    <el-header class="headerClass">
      <el-row :gutter="24">
        <el-col :span="4" style="margin-top:20px;">
          <div>{{username}}</div>
        </el-col>
        <el-col :span="6">
          <div class="project-name">项目管理系统</div>
        </el-col>
        <el-col :span="6"  style="margin-top:20px;float:right">
          <i class="el-icon-switch-button"></i>
          <span prefix-icon="el-icon-switch-button" @click="handleLayout">退出</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="margin-top:39px;">
      <el-aside class="asideClass">
        <myMenu :role="role"></myMenu>
      </el-aside>
      <el-main class="mainClass">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    // 计算属性的 getter
    username() {
      return this.$store.state.username;
    },
    role(){
      return this.$store.state.role;
    }
  },
  methods:{
    handleLayout(){
      this.$router.push({ path: "/login"});
    }
  }
};
</script>
<style >
.headerClass {
  height: 100px;
  width: 100%;
  background: #f8f8f8;
}

.el-main {
  width: 1900px !important;
  /* background:#ffffff; */
  margin-left: 28px;
  height: 1000px;
  flex: none;
}
.asideClass {
  background: #f7f7f7;
  margin-left: 28px;
  overflow: hidden;
}
.project-name {
  left: 246px;
  top: 35px;
  width: 192px;
  height: 46px;
  line-height: 46px;
  color: rgba(245, 93, 84, 1);
  font-size: 32px;
  text-align: right;
  font-family: SourceHanSansSC-regular;
}
.close-button {
  font: 36px;
}
</style>