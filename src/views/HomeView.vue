<template>
  <div class="container">
    <v-container class="">
    
      <v-layout row wrap style="justify-content: center !important">
        <div v-for="post in posts" :key="post._id">        
          <workout-card 
            :post="post" 
            :deleteExerciseFrontend="deleteExerciseFrontend"
          />
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import WorkoutCard from "../components/WorkoutCard";
import { Service } from "@/services/index.js";

export default {
  name: "HomePage",
  data() {
    return {
      posts: [],
      post: null,
    }
  },


  components: {
    WorkoutCard,
  },

  methods: {
    async getPosts() {

      try {

        const res = await Service.get('/posts');
        this.posts = res.data;
        
        console.log("konzol log: ", this.posts)

        
      } catch (error) {
        console.log("error: ", error)
        }

    },


    deleteExerciseFrontend(id) {
      this.posts = this.posts.filter((exercise) => exercise._id !== id);
    },
  },

  mounted () {
    this.getPosts();
  }
};
</script>

<style scoped>
*{
  margin: 0;
}
.container {
  margin: auto;
  margin-top: 30px;
  padding: 0;
}
@media screen and (max-width: 900px) {
  .container {
  margin: 50px 0px 0px 0px;
  
}
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
