<template>
  <div>
    progress
    <div v-for="post in posts" :key="post._id">
      <progress-chart :post="post" />
    </div>
  </div>
</template>

<script>
import ProgressChart from "../components/ProgressChart.vue";
import { Service } from "@/services/index.js";

export default {
  name: "UserProgress",

  components: {
    ProgressChart,
  },
  data() {
    return {
      posts: [],
      
    }
  },

  methods: {
    async getPosts() {

      try {

        const res = await Service.get('/exercise/data');
        this.posts = res.data;
        
        console.log("konzol log: ", this.posts)

        
      } catch (error) {
        console.log("error: ", error)
        }

    },

  },

  mounted () {
    this.getPosts();
  }
};
</script>

<style scoped></style>
