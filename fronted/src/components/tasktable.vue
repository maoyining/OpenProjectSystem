<template>
  <div class="projectCard">
    <el-collapse @change="handleChange">
      <el-collapse-item :name="id">
        <template slot="title">
          <el-col :span="6" :offset="1" class="projectName">{{name}}</el-col>
        </template>
         <el-button @click.stop="newTask(id)">新建任务</el-button>
        <el-table :data="tableData" row-key="ids" stripe style="margin-left:100px;">
          <el-table-column label="编号" width="180">
            <template slot-scope="props">{{props.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="title" label="任务名称" width="560"></el-table-column>
          <el-table-column prop="toStudentName" label="小组成员" width="220"></el-table-column>
          <el-table-column label="状态" width="180">
            <template slot-scope="props">
              <el-button
                class="project-status-button"
                v-bind:class="updateStatusCls(props.row.status) "
              >{{props.row.status|taskStatus}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="截止时间" width="180">
            <template slot-scope="props">
              <span>{{props.row.deadline|formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="props">
              <el-button @click.stop="newTask(props.row.id)"
              >审核任务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    id: String,
    role: String
  },
  data() {
    return {
      task: {},
      uid: "",
      tableData: [{}]
    };
  },
  computed: {
    // 计算属性的 getter
    updateStatusCls() {
      //计算属性无法直接进行传参，使用匿名函数
      return function(updateStatus) {
        return {
          published: updateStatus == "0", //成功发布
          start: updateStatus == "1", //导师成功接走
          running: updateStatus == "2" //招募完成
          // over: updateStatus == "2"//项目完成
        };
      };
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val[0]);
      if (val.length > 0) {
        this.$api.get("/api/v1/task/project/" + val[0], {}, res => {
          this.tableData = res.data;
        });
      }
    },
    newTask(e){
        this.$router.push({ path: "/task/new/" + e });
    }
  }
};
</script>
<style>
.el-collapse-item__header {
  width: 100%;
  height: 78px;
  line-height: 20px;
  background-color: rgba(224, 224, 224, 1);
  text-align: center;
  border: 1px solid rgba(224, 224, 224, 1);
  font-size: 20px;
}
.project-status {
  left: 1247px;
  top: 229px;
  width: 55px;
  height: 27px;
  color: rgba(245, 93, 84, 1);
  font-size: 18px;
  text-align: left;
}
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
.projectName {
  font-size: 24px;
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
.projectDetail {
  width: 60%;
}
.projects {
  display: flex;
  flex-direction: row;
}
</style>