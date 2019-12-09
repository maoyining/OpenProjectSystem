<template>
  <div v-if="datasize>0" class="projectClass">
    <div class="table-search">
      <el-row :gutter="24">
        <el-col :span="4" class="table-title" :offset="1">所有项目</el-col>
        <el-col :span="4" :offset="12">
            <el-input placeholder="请输入搜索条件" class="search-input" clearable v-model="searchData" prefix-icon="el-icon-search"> </el-input>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      row-key="id"
      stripe
      style="width: 80%"
      @row-click="rowClick"
      class="project-table"
    >
      <el-table-column label="编号" width="180">
        <template slot-scope="props">{{props.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="560"></el-table-column>
      <el-table-column prop="leaderName" label="负责老师" width="220"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="props">
          <el-button
            class="project-status-button"
            v-bind:class="updateStatusCls(props.row.status) "
          >{{props.row.status|projectStatus}}</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="截止时间" width="180">
          <template slot-scope="props">
          <span
           
          >{{props.row.deadline|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="props">
          <i
            class="el-icon-edit clickable"
            @click.stop="editProject(props.row)"
            v-if="props.row.status==0"
          ></i>
          <el-dialog title="修改项目" :visible.sync="editDialog">
            <el-row :gutter="20">
              <el-col :span="6">项目名称:</el-col>
              <el-col :span="12">
                <el-input v-model="editData.name"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">项目介绍:</el-col>
              <el-col :span="12">
                <el-input v-model="editData.description"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">项目截止时间:</el-col>
              <el-col :span="12">
                <div class="block">
                  <el-date-picker
                    v-model="editData.deadline"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click.stop="cancel">取消</el-button>
              <el-button type="primary" @click.stop="editConfirm(id)">确定</el-button>
            </span>
          </el-dialog>
          <i
            class="el-icon-delete clickable"
            style="color:red"
            @click.stop="deleteProject(props.row.id)"
          ></i>
          <el-dialog title="删除项目" :visible.sync="deleteDialog">
            <span slot="footer" class="dialog-footer">
              <el-button @click.stop="cancel">取消</el-button>
              <el-button type="primary" @click.stop="deleteConfirm(id)">确定</el-button>
            </span>
          </el-dialog>
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
      id: "",
      searchData:'',
      role:'',
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
          published: updateStatus == "0",//成功发布
          start: updateStatus == "1",//导师成功接走
          running: updateStatus == "2",//招募完成
         // over: updateStatus == "2"//项目完成
        };
      };
    }
  },
  mounted() {
    this.role=this.$store.state.role;
    if(this.role==1){
        this.$api.get("/api/v1/project", {}, res => {
            this.datasize = res.data.length;
            this.tableData = res.data;
    });
    }//角色老师
    else if(this.role==3){
      this.$api.get("/api/v1/project?status=0", {}, res => {
            this.datasize = res.data.length;
            this.tableData = res.data;
    });
    }else if(this.role==2){
      this.$api.get("/api/v1/project?status=1", {}, res => {
            this.datasize = res.data.length;
            this.tableData = res.data;
    });
    }
    
  },
  methods: {
    editProject(e) {
      console.log(e);
      this.editData = e;
      this.id = e.id;
      this.editDialog = true;
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
.projectClass {
  background: #ffffff;
  height:900px;
}
.project-table {
  margin-left: 36px;
  margin-top: 30px;
  font-size: 20px !important;
  overflow: hidden;
  cursor: pointer;
}
.el-table th.is-leaf {
  padding: 15px 0;
}
.el-table {
  width: 80%;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden !important;
}
.table-title{
  font-size: 30px;
  margin-top:20px;
}
.search-input{
margin-top:20px;
width: 310px;
height: 41px;
line-height: 20px;
border-radius: 5px 5px 5px 5px;
font-size: 14px;
text-align: center;

}
</style> 