<template>
  <form>
    <h1>Sign up</h1>
    <br />
    <v-text-field
      v-model="Fname"
      :error-messages="fnameErrors"
      :counter="10"
      label="First name"
      required
      @input="$v.Fname.$touch()"
      @blur="$v.Fname.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="Lname"
      :error-messages="lnameErrors"
      :counter="10"
      label="Last Name"
      required
      @input="$v.Lname.$touch()"
      @blur="$v.Lname.$touch()"
    ></v-text-field>

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

    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn class="mr-4" color="success" @click="submit"> submit </v-btn>
    <v-btn @click="clear"> clear </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { ServiceAuth } from "@/services/index.js";

export default {
  name: "SignUp",
  mixins: [validationMixin],

  validations: {
    Fname: { required, maxLength: maxLength(10) },
    Lname: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    Fname: "",
    Lname: "",
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
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    fnameErrors() {
      const errors = [];
      if (!this.$v.Fname.$dirty) return errors;
      !this.$v.Fname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.Fname.required && errors.push("Name is required.");
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.Lname.$dirty) return errors;
      !this.$v.Lname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.Lname.required && errors.push("Name is required.");
      return errors;
    },
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
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      this.addUser();
    },

    clear() {
      this.$v.$reset();
      this.Fname = "";
      this.Lname = "";
      this.email = "";
      this.password = "";
      this.checkbox = false;
    },

    async addUser() {
      await ServiceAuth
        .post("/add/user", {
          firstname: this.Fname,
          lastname: this.Lname,
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

/*     async getEmail() {
      try {
        const { data: existingUser } = await axios.get(
          `/users?email=${this.email}`
        );
        if (existingUser) throw new Error("Email already in use");

        const { data: user } = await axios.post("/api/users", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Do something with the newly added user
      } catch (error) {
        this.errorMessage = error.message;
      }
    }, */
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
