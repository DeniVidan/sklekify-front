<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-avatar size="120">
          <img v-if="profileImage" :src="profileImage" alt="Profile Image">
          <img v-else src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Default Profile Image"/>
        </v-avatar>
        <v-file-input
          v-model="profileImageUpload"
          accept="image/*"
          @change="uploadProfileImage"
          placeholder="Upload Profile Picture"
        ></v-file-input>
      </v-col>
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
            <v-btn color="primary" style="float:right">Update</v-btn>
          </div>
          
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  name: "UserProfile",

  data() {
    return {
      userName: 'deni vidan',
      userEmail: 'deni@gmail.com',
      userLocation: 'hrvatska',
      profileImage: '',
      profileImageUpload: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 100 || 'Name must be less than 100 characters',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
    }
  },
  methods: {
    async uploadProfileImage() {
      try {
        // Create a new FormData object
        const formData = new FormData();
        // Append the file to the FormData object
        formData.append('profileImage', this.profileImageUpload);
        // Make a POST request to the server with the FormData object
        const { data } = await axios.post('/api/upload-profile-image', formData);
        // Update the profileImage data property with the URL of the uploaded image
        this.profileImage = data.imageUrl;
      } catch (error) {
        console.error(error);
      }
    },
    updateProfile() {
      // send updated profile data to the server
    }
  },

  components: {},
};
</script>

<style scoped></style>
