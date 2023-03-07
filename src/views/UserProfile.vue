<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <!-- <v-avatar class="avatar" size="120">
          <img :src="this.selectedImage" alt="Profile Image" />
          <img :src="this.user.imageURL" alt="Profile Image" />
        </v-avatar> -->

        <div class="profile-pic">
          <label class="-label" for="file">
            <span class="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </label>
          <input id="file" type="file" @onchange="loadFile(event)" />
          <img :src="this.user.imageURL" id="output" width="200" />
        </div>

        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          placeholder="Upload Profile Picture"
        />
      </v-col>
      <div>
        <img width="300px" v-bind:src="this.selectedImage" />
      </div>

      <v-col cols="12" sm="6" md="8">
        <v-form>
          <v-text-field
            v-model="newFirstname"
            label="New firstname"
            :rules="[nameRules.required]"
            @blur="updateProfile"
          ></v-text-field>
          <v-text-field
            v-model="newLastname"
            label="New lastname"
            :rules="[nameRules.required]"
            @blur="updateProfile"
          ></v-text-field>

          <v-text-field
            v-model="old_password"
            label="Old password"
            @blur="updateProfile"
          ></v-text-field>

          <v-text-field
            v-model="new_password"
            label="New password"
            @blur="updateProfile"
          ></v-text-field>

          <div>
            <v-btn color="primary" style="float: right" @click="updateUser"
              >Update</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import imageCompression from "browser-image-compression";
import { Service } from "@/services/index.js";
//import imageCompressor from "vue-image-compressor";


export default {
  name: "UserProfile",

  data() {
    return {
      newFirstname: "",
      newLastname: "",
      new_password: "",
      old_password: "",
      password: "",
      user: {},
      profileImage: "",
      profileImageUpload: null,
      nameRules: {
        required: (value) => !!value || "Required.",
      },

      img: "",
      scale: 100,
      quality: 50,
      originalSize: true,
      original: {},
      proba:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw2S1ZfM4Zv7laQ_1tEfyWpZ&ust=1675351738431000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCskNzR9PwCFQAAAAAdAAAAABAE",
      selectedImage: null,
    };
  },
  methods: {
    async uploadProfileImage() {
      this.imgToBase64();
    },
    updateProfile() {
      console.log(this.newFirstname, this.newLastname, this.old_password, this.new_password)
    },

    loadFile(event) {
      console.log("event: ", event);
      let image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
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

    async getUser() {
      let user = await Service.get("/users");
      this.newFirstname = user.data.firstname
      this.newLastname = user.data.lastname
      this.user = user.data;
      console.log("getUser: ", user.data);
    },

    async updateUser() {

      try {
        await Service.patch("/user/edit", {
          firstname: this.newFirstname,
          lastname: this.newLastname,
          old_password: this.old_password,
          new_password: this.new_password,
          /* imageURL: this.user.data.imageURL, */
        });

        console.log("userUpdate: ", this.user);
      } catch (error) {
        console.log(error.response);
      }
      
      
    },

    test() {
      console.log(this.img);
    },
  },
  mounted() {
    this.getUser();
  },

  components: {
    /* imageCompressor */
  },
};
</script>

<style scoped>
.avatar {
  border: 2px solid grey;
}

.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}
.profile-pic input {
  display: none;
}
.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 165px;
  height: 165px;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  border-radius: 100px;
  z-index: 0;
}
.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  width: 165px;
}
.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  color: #fafafa;
  transition: background-color 0.2s ease-in-out;
  border-radius: 100px;
  margin-bottom: 0;
}
.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
  height: 2em;
}

body {
  height: 100vh;
  background-color: #191815;
  display: flex;
  justify-content: center;
  align-items: center;
}
body a:hover {
  text-decoration: none;
}
</style>
