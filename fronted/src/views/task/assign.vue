<template>
  <div class="project-teacher">
     <navCard v-bind:title="title" :subtitle="subtitle" style="margin-left:-5px"></navCard>
      <div v-if="datasize>0">
    <div v-for="item in taskData" :key="item.yyy">
      <projectCard :name="item.name"  :id="item.id" :role="role" style="margin-top:20px"></projectCard>
    </div>
      </div>
    <!-- <p>???</p> -->
  </div>
</template>
<script>
import projectCard from "@/components/tasktable.vue";
export default {
  data() {
    return {
      taskData: [{}],
      role: 0,
      roles: "",
      datasize:0,
      title:"我的项目",
      subtitle:"任务分配"
    };
  },
  components: { projectCard },
  mounted() {
    this.role = this.$store.state.role;
    if (this.role == 1) this.roles = "admin";
    else if (this.role == 2) this.roles = "student";
    if (this.role == 3) this.roles = "teacher";
    this.projects();
  },
  
  methods:{
      projects(){
           this.$api.get("/api/v1/"+this.roles+"/project?state=2", {}, res => {
               this.datasize=res.data.length;
        this.taskData= res.data;
      });
      console.log(this.taskData);
      }
  }
};
</script>
<style >
.project-teacher {
  background: #ffffff;
  height: 900px;
}
</style>