<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <!-- <v-avatar class="avatar" size="120">
          <img :src="this.selectedImage" alt="Profile Image" />
          <img :src="this.user.imageURL" alt="Profile Image" />
        </v-avatar> -->
        <div id="error-message">
          <span class="">{{ error_photo }}</span>
        </div>

        <div class="profile-pic">
          <label class="-label" for="file">
            <span
              class="mdi mdi-camera-plus-outline"
              style="font-size: 25px"
            ></span>
            <span>Change Image</span>
          </label>
          <input id="file" type="file" @change="handleImageUpload" />
          <img
            class="current-image"
            :src="this.currentImage"
            id="output"
            width="200"
          />
        </div>
        <div style="text-align: center">{{ this.user.email }}</div>
        <div style="display: grid; !important">
          <v-btn color="primary" @click="updateUserPhoto">Update photo</v-btn>
        </div>
      </v-col>

      <v-col cols="12" sm="6" md="8">
        <v-form>
          <div id="error-message-name">
            <span class="">{{ error_name }}</span>
          </div>

          <div style="margin-bottom: 100px">
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
            <v-btn color="primary" style="float: right" @click="updateUserName"
              >Update name</v-btn
            >
          </div>

          <div id="error-message">
            <span class="">{{ error_password }}</span>
          </div>

          <v-text-field
            v-model="old_password"
            :type="show1 ? 'text' : 'password'"
            label="Current password"
            @blur="updateProfile"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-text-field
            v-model="new_password"
            :type="show2 ? 'text' : 'password'"
            label="New password"
            @blur="updateProfile"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            hint="At least 8 characters"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>

          <div>
            <v-btn
              color="primary"
              style="float: right"
              @click="updateUserPassword"
              >Update password</v-btn
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
      error_name: "",
      error_password: "",
      error_photo: "",
      show1: false,
      show2: false,
      user: {},
      profileImageUpload: null,
      nameRules: {
        required: (value) => !!value || "Required.",
      },

      currentImage: null,
      scale: 100,
      quality: 50,
      originalSize: true,
    };
  },

  methods: {
    updateProfile() {},

    async handleImageUpload(event) {
      this.error_photo = ""
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
            this.currentImage = e.target.result;
          };
          /* reader.readAsDataURL(input.files[0]); */
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getUser() {
      let user = await Service.get("/users");
      //console.log("daj user: ", user)
      this.newFirstname = user.data.firstname;
      this.newLastname = user.data.lastname;
      this.currentImage = user.data.imageURL;
      this.user = user.data;
      console.log("getUser: ", user.data);
    },

    async updateUserName() {
      try {
        if (
          this.newFirstname != this.user.firstname ||
          this.newLastname != this.user.lastname
        ) {
          await Service.put("/user/edit/fname", {
            firstname: this.newFirstname,
            lastname: this.newLastname,
          });
          document.getElementById("error-message-name").style.backgroundColor = "#03DC00";
          this.error_name = "Successfully updated name !";
          
          this.$router.go();
        } else {
          console.log("Minimalno jedno ime promjeniti");
          this.error_name = "Change at least one name !";
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async updateUserPhoto() {
      try {
        if (this.currentImage) {
          await Service.put("/user/edit/image", {
            imageURL: this.currentImage,
          });
          document.getElementById("error-message").style.backgroundColor =
            "#03DC00";
          this.error_photo = "Successfully updated photo !";
          
          this.$router.go();
        } else {
          console.log("nece slika");
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status == 500) {
          console.log("Nije stavljena nova slika!");
          this.error_photo = "You haven't changed image !";
        }
      }
    },

    async updateUserPassword() {
      try {
        if (this.new_password && this.old_password) {
          await Service.put("/user/edit", {
            old_password: this.old_password,
            new_password: this.new_password,
          });
          this.error_password = "Successfully updated password !";
          document.getElementById("error-message").style.backgroundColor =
            "#03DC00";
          this.$router.go();
        } else {
          console.log("Promjeniti obije lozinke!");
          this.error_password = "Please fill all the fields !";
        }

        console.log("userUpdate: ", this.user);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status == 500) {
          this.error_password = "Wrong old password !";
        }
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
.current-image {
  border: 4px solid rgb(12, 242, 12);
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
  height: 185px;
  width: 185px;
}
.-label:hover {
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
#error-message {
  display: flex;
  justify-content: center;
  background-color: rgb(248, 81, 81);
  color: white;
}
#error-message-name {
  display: flex;
  justify-content: center;
  background-color: rgb(248, 81, 81);
  color: white;
}
</style>
