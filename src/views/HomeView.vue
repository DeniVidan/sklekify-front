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
import axios from 'axios'

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
        const res = await axios.get('/posts');
        this.posts = res.data;
        
        console.log(this.posts)

        
      } catch (error) {
        console.log("error: ", error)
        }



/*       return r.data.map(doc => {
        return {
          id: doc._id,
          url: doc.source,
          email: doc.createdBy,
          title: doc.title,
          posted_at: Number(doc.postedAt)
        };
      }); */
    },

/*     deleteItem(id) {
      axios.delete(`/post/delete/${id}`)
      .then(response => {
          // Update component's data to reflect the deletion
          this.post = this.post.filter(post => post._id !== id);
      })
      .catch(error => {
          console.error(error);
      });
    }, */
    deleteExerciseFrontend(id) {
      this.posts = this.posts.filter((exercise) => exercise._id !== id);
    },









/* async deleteCar() {
      try {
        await axios.delete(`/post/delete/${this.post._id}`);
        this.deleteCarFrontend(this.car._id);
        this.$toast.success(
          `${this.car.make} ${this.car.name} was deleted sucesfully!`,
          {
            position: "top-center",
            timeout: 4369,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.08,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }, */
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
