<template>
  <div>
    <navCard v-bind:title="title" :subtitle="subtitle" ></navCard>
    <div class="create-table">
      <el-row :gutter="20" class="create-item" style="margin-top:150px;">
        <el-col :span="6" class="table-item-name">项目名称:</el-col>
        <el-col :span="12">
          <el-input v-model="name" ></el-input>
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
          <el-button @click="changeProject()" class="create-button" v-if="role==1">修改</el-button>
          <el-button @click="applyProject()" class="create-button" v-if="role==3">申请</el-button>
          <!-- 老师申请 -->
          <el-button @click="putProject()" class="create-button" v-if="role==2">申请</el-button>
          <!-- 学生申请 -->
        </el-col>
        <el-col :span="12">
          <el-button class="cancel-button">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileds: ["数据分析", "可视化", "WEB开发", "深度学习", "嵌入式"],
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
      title: "所有项目",
      subtitle: "查看项目详情",
      id: "",
      role: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.role = this.$store.state.role;
    console.log(this.role);
    this.$api.get("/api/v1/project/" + this.id, {}, res => {
      this.name = res.data.name;
      this.description = res.data.description;
      this.filed = res.data.field;
      console.log(this.filed);
      this.state = res.data.status;
      this.leader = res.data.leader;
      this.deadline = res.data.deadline;
    });
  },
  methods: {
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
    applyProject(){
        this.$api.post("/api/v1/teacher/project",{
            id:this.id
        },res=>{
            if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "申请成功，等待回复",
              type: "success"
            });
          } 
        })
    },
    putProject(){
        this.$api.post("/api/v1/student/project",{
            id:this.id
        },res=>{
            if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "申请成功，等待回复",
              type: "success"
            });
          } 
        })
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