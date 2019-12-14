<template>
  <div class="project-teacher">
    <navCard v-bind:title="title" :subtitle="subtitle" style="margin-left:-5px"></navCard>
    <div v-if="datasize>0">
      <div v-for="item in projectData" :key="item.yyy">
        <projectCard
          :name="item.name"
          :status="item.status"
          :description="item.description"
          :id="item.id"
          :role="role"
          style="margin-top:20px"
        ></projectCard>
      </div>
    </div>
    <!-- <p>???</p> -->
  </div>
</template>
<script>
import projectCard from "@/components/projectCard.vue";
export default {
  data() {
    return {
      projectData: [{}],
      role: 0,
      roles: "",
      datasize: 0,
      title: "我的项目",
      subtitle: "查看我的项目"
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
  methods: {
    projects() {
      if (this.role == 2) {
        this.$api.get("/api/v1/" + this.roles + "/project?state=5", {}, res => {
          this.datasize = res.data.length;
          this.projectData = res.data;
        });
      }else if (this.role == 3) {
        this.$api.get("/api/v1/" + this.roles + "/project?state=2", {}, res => {
          this.datasize = res.data.length;
          this.projectData = res.data;
        });
      }

      console.log(this.projectData);
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