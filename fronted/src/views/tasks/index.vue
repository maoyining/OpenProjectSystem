<template>
<div>
  <el-table
    :data="tableData"
    row-key="id"
    @row-click="rowClick"
    stripe
    style="width: 100%">
    <el-table-column
      label="编号"
      width="180">
      <template  slot-scope="props">
          {{props.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="leader"
      label="负责老师">
    </el-table-column>
     <el-table-column
      label="状态"
      width="180">
      <template>
          状态
      </template>
    </el-table-column>
    <el-table-column
      prop="deadline"
      label="截止时间"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
        <template >
          <i class="el-icon-edit clickable" ></i>
          <i class="el-icon-delete clickable" style="color:red" ></i>
        </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {
         this.$api.get("/api/v1/project",{},res=>{
             this.tableData=res.data;
             console.log(this.tableData);
         })
    },
     methods: {
         rowClick(e){
             console.log(e);
         }
     }

  }
</script>