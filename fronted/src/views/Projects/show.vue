<template>
  <div>
    <navCard v-bind:title="title" :subtitle="subtitle"></navCard>
    <div class="create-table">
      <el-row :gutter="20" class="create-item" style="margin-top:150px;">
        <el-col :span="6" class="table-item-name">项目名称:</el-col>
        <el-col :span="12">
          <el-input v-model="name" style="width:400px"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item">
        <el-col :span="6" class="table-item-name">项目介绍:</el-col>
        <el-col :span="12">
          <el-input
            v-model="description"
            class="description-input"
            :rows="7"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item" v-if="role==2">
        <el-col :span="6" class="table-item-name">负责老师:</el-col>
        <el-col :span="12">
          <el-input v-model="leaderName" style="width:400px"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item" v-if="memberNum>0&&role!=1">
        <el-col :span="6" class="table-item-name">项目成员:</el-col>
        <el-col :span="12">
          <el-tag
            :key="tag.username"
            v-for="tag in member"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag.username}}</el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item">
        <el-col :span="6" class="table-item-name">技术领域:</el-col>
        <el-col :span="12">
          <el-checkbox-group v-model="filed">
            <el-checkbox v-for="item in filed" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item">
        <el-col :span="6" class="table-item-name">截止时间:</el-col>
        <el-col :span="12">
          <el-date-picker
            v-model="deadline"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item" style="margin-top:60px">
        <el-col :span="6" class="table-item-name">
           <!-- 管理员修改 -->
          <el-button @click="changeProject()" class="create-button" v-if="role==1">修改</el-button>
            <!-- 老师申请&邀请学生 -->
          <div v-if="role==3">
            <el-button @click="applyProject()" class="create-button" v-if="state==0">申请</el-button>
            <el-button @click="invite()" class="create-button" v-if="state!=0">邀请同学</el-button>
          </div>
         <!-- 学生主动申请项目 -->
          <!-- <el-button @click="applyProject()" class="create-button" v-if="role==2&&state==1">申请</el-button> -->
          <el-button @click="applyProject()" class="create-button" v-if="role==2">申请</el-button>
        </el-col>
        <el-col :span="12">
          <el-button class="cancel-button" @click="handleBack">取消</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="邀请同学" :visible.sync="inviteDialog">
      <el-select v-model="uid" filterable placeholder="请输入关键词">
        <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click.stop="cancel">取消</el-button>
        <el-button type="primary" @click.stop="inviteStudent(id)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      name: "",
      description: "",
      filed: [],
      deadline: "",
      leaderName: "",
      dynamicTags: ['标签一', '标签二', '标签三'],
      member:[{}],
      title: "所有项目",
      subtitle: "查看项目详情",
      id: "",
      role: "",
      state: "",
      inviteDialog: false,
      users: [{}],
      uid: "",
      loading: false,
      memberNum:0
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.role = this.$store.state.role;
    if (this.role == 1) this.roles = "admin";
    else if (this.role == 2) this.roles = "student";
    if (this.role == 3) this.roles = "teacher";
    this.$api.get("/api/v1/project/" + this.id, {}, res => {
      this.name = res.data.name;
      this.description = res.data.description;
      this.filed = res.data.field;
      this.leaderName = res.data.leaderName;
      this.state = res.data.status;
      this.leader = res.data.leader;
      this.deadline = res.data.deadline;
      this.member=res.data.member;
      this.memberNum=res.data.member.length;
    });
    console.log(this.member);
  },
  methods: {
    //管理员修改
    changeProject() {
      this.$api.post(
        "/api/v1/admin/project",
        {
          name: this.name,
          description: this.description,
          field: this.filed,
          deadline: this.deadline
        },
        res => {
          if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          }
        }
      );
    },
    //学生和导师申请
    applyProject() {
      this.$api.post(
        "/api/v1/" + this.roles + "/project",
        {
          id: this.id
        },
        res => {
          if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "申请成功，等待回复",
              type: "success"
            });
          }
        }
      );
    },
    //返回按钮回退到上一层界面
    handleBack() {
      this.$router.go(-1);
    },
    //邀请学生，打开对话框
    invite() {
      this.$api.get("/api/v1/user", {}, res => {
        this.users = res.data;
      });
      this.inviteDialog = true;
    },
    //邀请学生
    inviteStudent() {
      this.$api.post(
        "/api/v1/teacher/student/invite",
        {
          pid: this.id,
          uid: this.uid
        },
        res => {
          console.log(res);
          if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "邀请消息已发送,等待回复",
              type: "success"
            });
          }
        }
      );
      this.inviteDialog = false;
    },
    handleClose(tag) {
        this.member.splice(this.member.indexOf(tag), 1);
        //console.log(tag);
    },
    cancel(){
      this.inviteDialog=false
    }
  }
};
</script>
<style>
.create-table {
  background: #ffffff;
  margin-left: 36px;
  margin-top: 30px;
  font-size: 20px !important;
  overflow: hidden;
  cursor: pointer;
  height: 800px;
}
.create-item {
  margin-top: 30px;
  font-size: 24px;
}
.table-item-name {
  text-align: right;
}
.description-input {
  width: 356px;
  height: 171px;
  border-radius: 4px;
  background-color: rgba(245, 245, 245, 1);
  text-align: left;
}
.create-button {
  margin-right: -100px;
  top: 804px;
  width: 191px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(245, 93, 84, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 21px;
  text-align: center;
  font-family: Microsoft Yahei;
}
.cancel-button {
  margin-left: 100px;
  top: 804px;
  width: 191px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(179, 179, 179, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 21px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(179, 179, 179, 1);
}
.el-checkbox {
  font-size: 24px;
}
.el-checkbox__label {
  font-size: 20px;
}
.el-checkbox__inner {
  height: 24px;
  width: 24px;
}
</style>