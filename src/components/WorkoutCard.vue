<template>
  <div>
    
      <v-layout class="layout ma-2">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="post.imageURL"
          >
            <v-card-title class="mt-0">
              <p class="card-title">
                {{ post.name }}
              </p>
            </v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0"> </v-card-subtitle>

          <v-card-text class="text--primary">
            <div class="mb-3"><h2>Share todays progress:</h2></div>

            <div class="inline">
              <v-text-field
                class="number-input"
                v-model="numberValue"
                hide-details
                single-line
                type="number"
                label="Number of repetitions"
                min="0"
              />

              <v-btn class="ml-2" color="success"> submit </v-btn>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="ml-auto" color="error" text @click="deleteExercise"> Remove exercise </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "WorkoutCard",

  props: {
    post: Object,
    deleteExerciseFrontend: Function,
  },


  data: () => ({
    numberValue: "",
  }),

  methods: {
/*     deleteExercise(id) {
        axios.delete(`/post/delete/${id}`)
        .then(response => {
            // Update component's data to reflect the deletion
            this.post = this.post.filter(post => post._id !== id);
        })
        .catch(error => {
            console.error(error);
        });
    }, */


      async deleteExercise() {
        try {
          await axios.delete(`/post/delete/${this.post._id}`);
          this.deleteExerciseFrontend(this.post._id);
          this.$toast.success(
            `${this.post.name} ${this.post.imageURL} was deleted sucesfully!`,
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
      },









  },
};
</script>
<style scoped>
*{
  margin: 0;
}
.inline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.number-input {
  margin-top: 0;
  padding-top: 0;
}
.text--primary {
  padding: 0px 16px 0px 16px;
  margin-bottom: 16px;
}
.v-responsive__sizer {
  padding: 0 !important;
}
.v-container{
  padding: 0;
}
.layout{

}

.card-title{
  background-color: rgba(0, 0, 0, 0.521);
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
}


</style>
