<template>
  <div>
    <h1 class="loginTitle">项目管理系统</h1>
    <el-form  ref="loginForm"  :model="loginForm" :rules="loginRules" style="margin-top:50px;margin-left:420px;margin-right:420px">
    <el-form-item prop="username">
    <el-input 
      placeholder="用户名"
      ref="username"
      name="username"
      prefix-icon="el-icon-s-custom"
      v-model="loginForm.username"
      size="9px">
    </el-input>
    </el-form-item>
    <el-form-item prop="password">
    <el-input style="margin-top:30px"
      ref="password"
      name="password"
      placeholder="请输入密码" 
      prefix-icon="el-icon-lock"
      v-model="loginForm.password" 
      show-password
      size="9px"
      @keyup.native.enter="Login()">
    </el-input>
    </el-form-item>
    <el-button class="loginBtn" @click="Login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不为空"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    Login () {
      if(this.loginForm.username==""||this.loginForm.password==""){
        this.$message({ showClose: true , message: '请先完善信息！' , type: 'warning' });
        return
      }
    
      this.$api.post("/api/v1/auth/signin",{
        username: this.loginForm.username,
        password: this.loginForm.password
        },res=>{
        //todo
        //账号密码登录错误怎么判断的？直接就报错了可还行....
          if(res.data.token!=null){
            this.$store.dispatch("getNewToken", res.data.token);//保存用户的token
            this.$api.get("/api/v1/auth/me",{},res=>{
              this.$store.dispatch("setNewRole", res.data.role);
              this.$store.dispatch("getNewUsername", res.data.username);
              this.$store.dispatch("getNewId", res.data.id);
              this.$router.push({ path: "/" });
            })
          }
          else{
            this.$message({ showClose: true , message: '请确认您的帐号与密码' , type: 'error' });
          }
         // this.$store.dispatch("getNewToken", res.data.token);
        //this.$router.push({ path: '/index' });
      }) 
    }
  }
};
</script>
<style>
.el-input {
  height:47px
}
h1{
    text-align: center;
    margin-top:30px;
    color:#606266
  }
.loginBtn{
    width:100%;
    height:40px;
    margin-top:30px;
    background-color:#F55D54;
    color:white
}
.loginTitle{
    margin-top:160px;
}
</style>
