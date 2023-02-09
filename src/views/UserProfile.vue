<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-avatar size="120">
          <img v-if="profileImage" :src="profileImage" alt="Profile Image" />
          <img
            v-else
            :src="this.proba"
            alt="Default Profile Image"
          />
        </v-avatar>
        <v-file-input
          type="file"
          v-model="profileImageUpload"
          accept="image/*"
          @change="uploadProfileImage"
          placeholder="Upload Profile Picture"
        ></v-file-input>
      </v-col>
      <div > 
        <img width="300px" v-bind:src="this.img"/>
      </div>
      
      <v-col cols="12" sm="6" md="8">
        <v-form>
          <v-text-field
            v-model="userName"
            label="Name"
            :rules="nameRules"
            @blur="updateProfile"
          ></v-text-field>
          <v-text-field
            v-model="userEmail"
            label="Email"
            :rules="emailRules"
            @blur="updateProfile"
          ></v-text-field>
          <v-text-field
            v-model="userLocation"
            label="Location"
            @blur="updateProfile"
          ></v-text-field>
          <div>
            <v-btn color="primary" style="float: right">Update</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
//import imageCompressor from "vue-image-compressor";

export default {
  name: "UserProfile",

  data() {
    return {
      userName: "deni vidan",
      userEmail: "deni@gmail.com",
      userLocation: "hrvatska",
      profileImage: "",
      profileImageUpload: null,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 100 || "Name must be less than 100 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Email must be valid",
      ],
      img: "",
      scale: 100,
      quality: 50,
      originalSize: true,
      original: {},
      proba: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw2S1ZfM4Zv7laQ_1tEfyWpZ&ust=1675351738431000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCskNzR9PwCFQAAAAAdAAAAABAE"
    };
  },
  methods: {
    async uploadProfileImage() {
      this.imgToBase64();
    },

    imgToBase64() {
      const fileInput = document.querySelector("input[type=file]");
      if (!fileInput || !fileInput.files[0]) return;
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.img = reader.result;
        console.log(this.img);
      };
      reader.readAsDataURL(file);
    },



    async getUser() {
      await axios.get("/user/")
    },



    test() {
      console.log(this.img);
    },
  },

  components: {
    /* imageCompressor */
  },
};
</script>

<style scoped></style>
