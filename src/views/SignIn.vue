<template>
  <form>
    <h1>Sign in</h1>
    <br />
    <div style="display: flex; justify-content: center; background-color: rgb(248, 81, 81);">
      <span class="password-error">{{ passwordError }}</span>
    </div>
    <v-text-field
      name="email"
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      
      counter
      required
      @click:append="show1 = !show1"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    
   

    <v-btn class="mr-4" color="success" @click="submit"> submit </v-btn>
    <v-btn @click="clear"> clear </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { Auth } from "@/services/index.js";

export default {
  name: "SignIn",
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },

    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    email: "",
    password: "",
    show1: false,
    checkbox: false,
    passwordError: "",
    rules: {
      required: (value) => !!value || "Required.",
      /* min: (v) => v.length >= 8 || "Min 8 characters", */
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      return errors;
    },
  },

  methods: {
    submit() {
      this.login();
    },
    clear() {
      /* this.$v.$reset(); */
      this.email = "";
      this.password = "";
      this.passwordError = ""
    },

    async login() {
      let success = await Auth.login(this.email, this.password)
        

      console.log("rezultat prijave: ", success);

      if (this.email == "" || this.password == ""){
        this.passwordError =  "Please fill all the fields"
      }

      else if (success == true) {
        console.log("istina");
        this.$router.push({ path: "/" });
      }
      else if (success.false == false) {
        this.passwordError =  success.error
        console.log(this.passwordError)
      }
    },
  },
};
</script>

<style scoped>
form {
  padding: 20px;
  margin: auto;
  margin-top: 30px;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.096);
  border-radius: 5px;
}

.password-error{
/*   background-color: rgb(248, 81, 81); */
  color: white;
}


@media screen and (max-width: 900px) {
  form {
    width: 90%;
    background-color: transparent;
    padding: 0;
  }
}
</style>
