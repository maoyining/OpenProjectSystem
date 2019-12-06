<template>
  <div v-if="datasize>0" class="projectClass">
    <div class="table-search">
      <el-row :gutter="24">
        <el-col :span="3" class="table-title" :offset="1">{{title}}</el-col>
        <el-col :span="4" :offset="8">
          <el-input
            placeholder="请输入搜索条件"
            class="search-input"
            clearable
            v-model="searchData"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-col>
        <el-col :span="4" v-if="role==3">
          <el-select v-model="itemStatus" placeholder="请选择" class="table-title">
            <el-option
              v-for="item in optiont"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
         <el-col :span="4" v-if="role==2">
          <el-select v-model="itemStatus" placeholder="请选择" class="table-title">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="filteredItems"
      row-key="index"
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
            v-bind:class="updateStatusCls(props.row.state) "
          >{{props.row.state|projectState}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" width="180">
        <template slot-scope="props">
          <span>{{props.row.deadline|formatDate}}</span>
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
      searchData: "",
      role: "",
      title: "项目",
      itemStatus: -1,
      options: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "申请中",
          value: 3
        },
        {
          label: "参与中",
          value: 5
        },
        {
          label: "被拒绝",
          value: 7
        }
      ],
      optiont: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "申请中",
          value: 1
        },
        {
          label: "参与中",
          value: 2
        },
        {
          label: "被拒绝",
          value: 6
        }
      ]
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
          published: (updateStatus == "3") | (updateStatus == "1"), //申请中
          start: (updateStatus == "5") | (updateStatus == "2"), //申请完成
          running: (updateStatus == "7") | (updateStatus == "6") //被拒绝
        };
      };
    },
    filteredItems: function() {
      let that = this;
      if (that.itemStatus == -1) {
        // console.log(that.tableData)
        return that.tableData;
      } else {
        return that.tableData.filter(function(item) {
          return item.state == that.itemStatus;
        });
      }
    }
  },
  mounted(e) {
    this.role = this.$store.state.role;
    if (this.role == 1) this.roles = "admin";
    else if (this.role == 2) this.roles = "student";
    if (this.role == 3) this.roles = "teacher";
    this.handleGetProject();
  },
  methods: {
    handleGetProject() {
      //获取所有项目
      this.$api.get("/api/v1/teacher/project?state=", {}, res => {
        this.datasize = res.data.length;
        this.tableData = res.data;
      });
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
  height: 900px;
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