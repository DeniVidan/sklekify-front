<template>
  <div class="">
    <div class="workout-card" v-for="post in posts" :key="post._id">
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

<style scoped>
  .workout-card{
    margin-bottom: 10px;
    background-color: rgb(181, 182, 255);
  }
</style>
