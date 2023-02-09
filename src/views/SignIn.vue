<template>
  <form>
    <h1>Sign in</h1>
    <br />
    <v-text-field
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
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn class="mr-4" color="success" @click="submit"> submit </v-btn>
    <v-btn @click="clear"> clear </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "SignIn",
  mixins: [validationMixin],

  validations: {
    email: { required, email },

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

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
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
      if (!this.$v.email.$dirty) return errors;
      // !this.$v.password.password && errors.push("Must be valid password");
      // !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      this.login();
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
    async login() {
      await axios
        .post("/auth/user", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log();
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
@media screen and (max-width: 900px) {
  form {
    width: 90%;
    background-color: transparent;
    padding: 0;
  }
}
</style>
