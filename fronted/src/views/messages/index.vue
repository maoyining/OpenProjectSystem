<template>
  <div v-if="datasize>0">
    <el-table :data="messageData" row-key="id" stripe style="width: 100%">
      <el-table-column label="编号" width="180">
        <template slot-scope="props">{{props.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="leader" label="申请人"></el-table-column>

      <el-table-column prop="deadline" label="截止时间" width="180"></el-table-column>
       <el-table-column prop="updatetime" label="更新时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <span @click="editProject(props.row)" v-if="props.row.status==0">同意</span>
          <span style="color:red" @click="deleteProject(props.row.id)">拒绝</span>
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
      <el-pagination layout="prev, pager, next" :total="datasize"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageData: [{}],
      datasize: 0,
      editDialog: false,
      editData: [],
      deleteDialog: false,
      id: ""
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
          over: updateStatus == "3"
        };
      };
    }
  },
  mounted() {
    this.$api.get("/api/v1/admin/message", {}, res => {
      this.datasize = res.data.length;
      this.messageData = res.data;
    });
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
  background: #ffffff 100%;
}
.start {
  background: red;
}
.running {
  background: #ffffff 100%;
}
.over {
  background: red;
}
.block {
  float: right;
}
</style>