<template>
  <div class="projectCard">
    <el-collapse @change="handleChange">
      <el-collapse-item :name="id">
        <template slot="title">
          <el-col :span="6" :offset="1" class="projectName">{{name}}</el-col>
          <el-col :span="6" :offset="10" class="project-status">{{status|projectStatus}}</el-col>
        </template>
       
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    status: Number,
    id: String,
    role:String
  },
  data() {
    return {
      activeNames: ["1"],
      project: {},
      memberNum: 0,
      inviteDialog:false,
      users: [{}],
      uid: "",
    };
  },
  methods: {
    handleChange(val) {
      // console.log(val[0]);
      if (val.length > 0) {
        this.$api.get("/api/v1/task/" + val[0], {}, res => {
        console.log(res);
        });
      }
      
    },
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
.projectName{
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
.projectDetail{
  width:60%
}
.projects{
  display:flex;
  flex-direction: row
}
</style>