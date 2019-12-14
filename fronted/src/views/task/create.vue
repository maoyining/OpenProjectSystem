<template>
  <div>
    <navCard v-bind:title="title" :subtitle="subtitle"></navCard>
    <div class="create-table">
      <el-row :gutter="20" class="create-item" style="margin-top:150px;">
        <el-col :span="6" class="table-item-name">任务名称:</el-col>
        <el-col :span="12">
          <el-input v-model="taskTitle"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item">
        <el-col :span="6" class="table-item-name">任务介绍:</el-col>
        <el-col :span="12">
          <el-input
            v-model="content"
            class="description-input"
            :rows="7"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item">
        <el-col :span="6" class="table-item-name">任务指定人:</el-col>
         <el-select v-model="studentId" filterable placeholder="请输入关键词">
        <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id"></el-option>
      </el-select>
      </el-row>
      <el-row :gutter="20" class="create-item">
        <el-col :span="6" class="table-item-name">截止时间:</el-col>
        <el-col :span="12">
            <el-date-picker
              v-model="deadline"
              align="right"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="create-item" style="margin-top:60px">
        <el-col :span="6" class="table-item-name">
          <el-button @click="createTask()" class="create-button">创建</el-button>
        </el-col>
        <el-col :span="12">
          <el-button class="cancel-button" @click="cancel()">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users:[{}],
      taskTitle:"",
      content: "",
      deadline: "",
      title: "创建任务",
      subtitle: "填写任务信息",
      studentId:'',
      pid:''
    };
  },
  mounted(){
      this.pid = this.$route.params.id;
      
  },
  methods: {
    createTask() {
      this.$api.post(
        "/api/v1/teacher/task",
        {
          title: this.taskTitle,
          content: this.content,
          toStudent: this.studentid,
          deadline: this.deadline,
          project:this.pid
        },
        res => {
         if(res.data=="OK"){
            this.$message({ showClose: true , message: '创建成功' , type: 'success' });
         }
        }
      );
    },
    cancel(){
      this.$router.go(-1);
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