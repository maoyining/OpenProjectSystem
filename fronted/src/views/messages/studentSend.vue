<template>
<div>
  <div v-if="datasize>0" class="messageClass">
    <div class="table-search">
      <el-row :gutter="24">
        <el-col :span="4" class="table-title" :offset="1">我发出的消息</el-col>
        <el-col :span="4" :offset="12">
          <el-input
            placeholder="请输入搜索条件"
            class="search-input"
            clearable
            v-model="searchData"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      row-key="index"
      stripe
      style="width: 80%"
      @row-click="rowClick"
      class="project-table"
    >
      <el-table-column label="编号" width="100">
        <template slot-scope="props">{{props.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="500"></el-table-column>
      <el-table-column prop="leaderName" label="申请人" width="220" v-if="role==2"></el-table-column>
      <el-table-column prop="applyer" label="申请人" width="220" v-if="role==3"></el-table-column>
      <el-table-column label="截止时间" width="250">
        <template slot-scope="props">
          <span>{{props.row.deadline|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="250">
        <template slot-scope="props">
          <span>{{props.row.updatedAt|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="props">
          <span  v-if="props.row.state==3" >已发送</span>
         <span style="color:red" v-if="props.row.state==8" >已拒绝</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-pagination layout="prev, pager, next" :total="datasize"></el-pagination>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入页码"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button>跳至</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
   <div v-if="datasize==0" class="messageClass">
      <div class="table-search">
      <el-row :gutter="24">
        <el-col :span="4" class="table-title" :offset="1">我收到的消息</el-col>
        <el-col :span="4" :offset="12">
          <el-input
            placeholder="请输入搜索条件"
            class="search-input"
            clearable
            v-model="searchData"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-col>
      </el-row>
    </div>
   </div>
</div>
</template>

<script>
import navCard from "@/components/card.vue";
export default {
  data() {
    return {
      tableData: [{}],
      datasize: 0,
      editDialog: false,
      editData: [],
      deleteDialog: false,
      pid: "",
      uid:'',
      searchData: "",
      role:'',
      roles:'',
    };
  },
  components: {
    navCard
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
  mounted() {
    this.role=this.$store.state.role;
    if(this.role==1)
      this.roles="admin";
    else if(this.role==2)
      this.roles="student";
       if(this.role==3)
      this.roles="teacher";
    this.messages();
  },
  methods: {
      //3代表已发送申请
      //8代表已拒绝导师
    messages(){
       this.$api.get("/api/v1/student/project?state=3&state=8", {}, res => {
      this.datasize = res.data.length;
      this.tableData = res.data;
    });
    },
    agreeProject(e) {
      this.pid=e.id;
      this.uid=e.applyerID;
      this.$api.put("/api/v1/"+this.roles+"/agree",{
        uid:this.uid,
        pid:this.pid
      },res=>{
         if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "已同意该申请",
              type: "success"
            });
          }
          this.messages();
      })
    },
    agreeProjects(e) {
      this.pid=e.id;
      this.$api.put("/api/v1/"+this.roles+"/agree",{
        id:this.pid
      },res=>{
         if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "已同意该申请",
              type: "success"
            });
          }
          this.messages();
      })
    },
    disagreeProject(e) {
      this.pid=e.id;
      this.uid=e.applyerID;
      this.$api.put("/api/v1/"+this.roles+"/disagree",{
        uid:this.uid,
        pid:this.pid
      },res=>{
         if (res.data == "OK") {
            this.$message({
              showClose: true,
              message: "已拒绝该申请",
              type: "success"
            });
          }
          this.messages();
      })
    },
    deleteProject(e) {
      this.deleteDialog = true;
      this.id = e;
    },
    cancel() {
      this.deleteDialog = false;
      this.editDialog = false;
    },
    deleteConfirm(e) {
      console.log(e);
      this.deleteDialog = false;
    },
    editConfirm(e) {
      console.log(e);
      this.editDialog = false;
    },
    rowClick(e) {
      this.$router.push({ path: "/project/" + e.id });
    }
  }
};
</script>
<style>
.published {
  background: #ff9966;
}
.start {
  background: #f55d54;
}
.running {
  background: #cc9999;
}
.over {
  background: #cccccc;
}
.block {
  float: right;
  margin: 100px;
  margin-left: -200px;
}
.project-status-button {
  color: #ffffff;
}
.messageClass {
  background: #ffffff;
  height: 900px;
}
.project-table {
  margin-left: 36px;
  margin-top: 30px;
  font-size: 20px !important;
  overflow: hidden;
  cursor: pointer;
}
.el-table--small td, .el-table--small th{
    padding:25px 0;
}
.el-table {
  width: 80%;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.table-title {
  font-size: 30px;
  margin-top: 20px;
}
.search-input {
  margin-top: 20px;
  width: 310px;
  height: 41px;
  line-height: 20px;
  border-radius: 5px 5px 5px 5px;
  font-size: 14px;
  text-align: center;
}
</style> 