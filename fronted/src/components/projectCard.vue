<template>
  <div class="projectCard">
    <el-collapse @change="handleChange">
      <el-collapse-item :name="id">
        <template slot="title">
          <el-col :span="6" :offset="1" class="projectName">{{name}}</el-col>
          <el-col :span="6" :offset="10" class="project-status">{{status|projectStatus}}</el-col>
        </template>
        <div class="projects">
        <div class="projectDetail">
          <el-row :gutter="20" class="create-item">
            <el-col :span="6" class="table-item-name">项目介绍:</el-col>
            <el-col :span="12">{{project.description}}</el-col>
          </el-row>
          <el-row :gutter="20" class="create-item">
            <el-col :span="6" class="table-item-name">项目状态:</el-col>
            <el-col :span="12">{{project.status|projectStatus}}</el-col>
          </el-row>
          <el-row :gutter="20" class="create-item">
            <el-col :span="6" class="table-item-name">技术领域:</el-col>
            <el-col :span="12">
              <el-checkbox-group v-model="project.field">
                <el-checkbox v-for="item in project.field" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="create-item">
            <el-col :span="6" class="table-item-name">团队人数:</el-col>
            <el-col :span="12">{{project.teamSize}}</el-col>
          </el-row>
          <el-row :gutter="20" class="create-item" v-if="memberNum>0">
            <el-col :span="6" class="table-item-name">团队成员:</el-col>
            <el-col :span="12">
              <el-tag
                :key="tag.id"
                v-for="tag in project.member"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag.username}}</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="create-item">
            <el-col :span="6" class="table-item-name">截止时间:</el-col>
            <el-col :span="12">{{project.deadline|formatDate}}</el-col>
          </el-row>
        </div>
        <div class="projectProcess">
          <div class="processName">
            项目完成度
          </div>
          <div class="process">
            项目已经完成：75%
          </div>
        </div>
        </div>
        <div>
           <el-button @click="invite()" class="create-button" v-if="memberNum<project.teamSize">邀请同学</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
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
  props: {
    name: String,
    status: Number,
    id: String
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
        this.$api.get("/api/v1/project/" + val[0], {}, res => {
          this.project = res.data;
          this.memberNum = res.data.member.length;
        });
      }
    },
     //邀请学生，打开对话框
    invite() {
      this.$api.get("/api/v1/user?role=2", {}, res => {
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