<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-blue--text text--accent-4"
        >
          <router-link v-if="auth.authenticated" to="/">
            <v-list-item to="/" link>
              <v-list-item-title>Today's check in</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="auth.authenticated" to="/workouts">
            <v-list-item to="/workouts" link>
              <v-list-item-title>Workouts</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="auth.authenticated" to="/progress">
            <v-list-item to="/progress" link>
              <v-list-item-title>Progress</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="auth.authenticated" to="/profile">
            <v-list-item to="/profile" link>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="!auth.authenticated" to="signin">
            <v-list-item to="" link>
              <v-list-item-title> Sign in </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="!auth.authenticated" to="/signup">
            <v-list-item to="signup" link>
              <v-list-item-title> Sign up </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="auth.authenticated" to="">
            <v-list-item to="" link>
              <v-list-item-title @click="logout"> Sign out </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Sklekify</v-toolbar-title>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="isHomeRoute"
            v-bind="attrs"
            v-on="on"
            style="padding-left: 0px !important"
            class="add-button"
            color="blue lighten-3"
          >
            <v-btn
              
              v-bind="attrs"
              v-on="on"
              width="40px"
              height="40px"
              class=""
              fab
              dark
              color="indigo"
            >
              <span class="mdi mdi-dumbbell" style="font-size: 25px"></span>
            </v-btn>
            <p
              style="
                font-family: 'Barlow', sans-serif;
                font-family: 'Open Sans', sans-serif;
                font-size: 15px;
              "
            >
              ADD WORKOUT
            </p>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">ADD EXERCISE</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="exerciseName"
                label="Exercise name"
                required
              ></v-text-field>

              <!-- <v-autocomplete
                :items="[
                  'Push ups',
                  'Squats',
                  'Plank',
                  'Sit ups',
                  'Pull ups',
                  'Dips',
                  'Football',
                  'Basketball',
                  'Tennis',
                ]"
                label="Interests"
              ></v-autocomplete> -->

              <input type="file" ref="fileInput" @change="handleImageUpload" />

              <div><img width="300px" :src="selectedImage" /></div>

              <!-- <v-file-input type="file" v-model="imgURL"></v-file-input> -->
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="test"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import store from "@/store.js";

import imageCompression from "browser-image-compression";
import { Auth, Service } from "@/services/index.js";


export default {
  name: "App",

  data() {
    return {
      drawer: false,
      group: null,
      store,
      dialog: false,
      exerciseName: "",
      imgURL: "",
      base64CompressedImage: null,
      selectedImage: null,
      auth: Auth.state,
    };
  },

  methods: {
    test() {
      this.dialog = false;
      //console.log(this.exerciseName)
      this.postExercise();
    },

    async postExercise() {
      try {
        if (!this.base64CompressedImage && this.exerciseName) {
          await Service.post("/post/add", {
            name: this.exerciseName,
          });
        } else {
          await Service.post("/post/add", {
            name: this.exerciseName,
            imageURL: this.base64CompressedImage,
          });
        }
        this.$router.go();
        //console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
        this.error = error.response.data.msg;
      }
    },

    async handleImageUpload(event) {
      //console.log(event)
      console.log(event.target.files[0]);

      const imageFile = event.target.files[0];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 480,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        const reader = new FileReader();

        let rawImg;
        reader.onloadend = () => {
          //console.log(reader)
          rawImg = reader.result;
          this.base64CompressedImage = rawImg;
          /*  console.log("ttt", rawImg); */
        };
        reader.readAsDataURL(compressedFile);

        let input = event.target;
        if (input.files && input.files[0]) {
          reader.onload = (e) => {
            this.selectedImage = e.target.result;
          };
          /* reader.readAsDataURL(input.files[0]); */
        }
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      Auth.logout();
      this.$router.go();
    },

  },

  components: {},

  computed: {
    isHomeRoute() {
      if (this.$route.path === "/"){
        return true
      } else return false
      
    },
  },



  mounted() {

  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.add-button {
  margin-left: 30%;
  background-color: rgb(119, 151, 255);
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
p {
  padding: 0px 0px 0px 15px;
  margin: auto !important;
}
@media screen and (max-width: 900px) {
  .add-button {
    margin-left: 10%;
  }
}
</style>
