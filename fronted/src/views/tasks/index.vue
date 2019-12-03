<template>
  <div v-if="tableData.length>0">
    <el-table
      :data="tableData"
      row-key="id"
      stripe
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="编号" width="180">
        <template slot-scope="props">{{props.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="leader" label="负责老师"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="props">
          <el-button
            class="project-status-button"
            v-bind:class="updateStatusCls(props.row.status) "
          >{{props.row.status}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <i class="el-icon-edit clickable" @click="editProject(props.row.id)"></i>
          <i class="el-icon-delete clickable" style="color:red"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
 
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{}]
    };
  },
  computed: {
    // 计算属性的 getter
    updateStatusCls() {
      //计算属性无法直接进行传参，使用匿名函数
      return function(updateStatus) {
        return {
          published: updateStatus == "0",
          start: updateStatus == "1",
          running: updateStatus == "2",
          over: updateStatus == "3",
        };
      };
    }
  },
  mounted() {
    this.$api.get("/api/v1/project", {}, res => {
      this.tableData = res.data;
      console.log(this.tableData);
    });
  },
  methods: {
    editProject(e) {
      console.log(e);
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(rowIndex);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>
<style>
.published {
  background: #FFFFFF 100%;
}
.start {
  background: red;
}
.running {
  background: #FFFFFF 100%;
}
.over {
  background: red;
}
.block{
    float:right
}
</style>