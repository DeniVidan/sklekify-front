<template>
  <div>
    <v-layout class="layout ma-2">
      <v-card class="mx-auto" max-width="400" min-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="this.post.imageURL"
        >
          <v-card-title class="mt-0" v-model="name">
            <p class="card-title">
              {{ post.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0"> </v-card-subtitle>

        <v-card-text class="text--primary">
          <div class="mb-3"><h2>Share todays progress:</h2></div>
            <v-input v-if="!disable" style="color: green; font-size: 20px" success disabled>
              Successfully submited
            </v-input>
          <div class="inline">

            <v-text-field
              class="number-input"
              v-model="repValue"
              hide-details
              single-line
              type="number"
              label="Number of repetitions"
              min="0"
            />

            <v-btn
              v-if="disable"
              class="ml-2"
              color="success"
              @click="updateData()"
              :disabeled="disable"
            >
              submit
            </v-btn>

            <v-btn
              v-if="!disable"
              class="ml-2"
              color="primary"
              @click="overwriteDate()"
            >
              Overwrite
            </v-btn>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn class="ml-auto" color="error" text @click="deleteExercise">
            Remove exercise
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
import { Service } from "@/services/index.js";
import moment from "moment";

export default {
  name: "WorkoutCard",

  props: {
    post: Object,
    deleteExerciseFrontend: Function,
    disable_btn: Boolean,
  },

  data: () => ({
    name: "",
    repValue: null,
    image: "",
    disable: undefined,
    lastDateUploaded: null,
  }),

  methods: {
    proba() {},

    async deleteExercise() {
      try {
        await Service.delete(`/post/delete/${this.post._id}`);
        this.deleteExerciseFrontend(this.post._id);
      } catch (error) {
        console.log(error);
      }
    },

    async overwriteDate() {
      if (this.disable == false) {
        //console.log("repetitions", this.post.repetitions[this.post.repetitions.length - 1]);
        if (this.repValue == null){
          this.repValue = 0
        }
        await Service.post("/post/overwrite", {
        id: this.post._id,
        id_rep: this.post.repetitions._id,
        repValue: this.repValue,
      })
        .then((response) => {
          console.log(response.data);
          this.repValue = null;
        })
        .catch((error) => {
          console.error(error);
        });
        
      } else {
        console.log("je true");
      }
    },

    async updateData() {
      //let time = moment().format();
      //console.log("Date.now(): ", time);
      if (this.repValue == null) {
        this.repValue = 0;
      }
      await Service.post("/post/update", {
        id: this.post._id,
        repValue: this.repValue,
      })
        .then((response) => {
          console.log(response.data);
          this.repValue = null;
        })
        .catch((error) => {
          console.error(error);
        });

      console.log(this.repValue);
    },

    try() {
      if (this.post.repetitions.length != 0) {
        /*       if (this.disable_btn == true){
        this.disable = true
      } else this.disable = false
      console.log("ajde daj: ", this.post, this.disable) */

        console.log("idemo: ", this.post);
        this.lastDateUploaded = this.post.updatedAt.split("T")[0].split("-")[2];
        //console.log("daj mi date: ", this.lastDateUploaded);
        //console.log("daj mi date2: ", this.post.updatedAt);
        //console.log("daj mi date3: ", this.lastDateUploaded);

        //console.log("conzol pokazi: ", moment().format("l").split("/")[1]);

        if (this.lastDateUploaded != moment().format("l").split("/")[1]) {
          this.disable = true;
          console.log(this.disable);
        } else {
          this.disable = false;
        }
      } else {
        this.disable = true;
      }
    },
  },

  mounted() {
    this.try();
  },
};
</script>

<style scoped>
* {
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
.v-container {
  padding: 0;
}
.layout {
}

.card-title {
  background-color: rgba(0, 0, 0, 0.521);
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
}
</style>
