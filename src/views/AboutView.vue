<template>
  <div class="about">
    <div class="first-div">
      <div style="align-self: center;" class="buttnos">

        <router-link v-if="!auth.authenticated" to="/signin">
            <v-list-item to="signin" link>
              <v-btn class="">sign in</v-btn>
            </v-list-item>
          </router-link>

          <router-link v-if="!auth.authenticated" to="/signup">
            <v-list-item to="signup" link>
               <v-btn class="">sign up</v-btn>
            </v-list-item>
          </router-link>
        
        
      </div>
    </div>
    <div class="title">
      <h1>Sklekify</h1>
      <h2>Push until you can't</h2>
      <p>
        Take your fitness to the next level with our workout tracking website.
        Record your daily workout repetitions and track your progress on a
        customizable graph. Our platform is designed to help you stay
        accountable and motivated, with the ability to input your workout data
        once daily. With detailed analytics and trend analysis, you can see your
        progress and identify areas for improvement. Our user-friendly interface
        makes it easy to customize your workout plan and track your progress
        over time. Join our community of fitness enthusiasts and achieve your
        fitness goals today. Sign up now and start tracking your progress like
        never before!
      </p>
    </div>
    <!-- <div class="second-div"></div> -->
  </div>
</template>

<script>
import { Auth } from "@/services/index.js";

export default {
  name: "AboutPage",

  data() {
    return {
      auth: Auth.state
    };
  },
};
</script>

<style scoped>
.buttons{
  display: flex;
  margin: 10px;
}
a{
  text-decoration: none;
}
.first-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 200px;
  background: linear-gradient(rgb(141, 141, 255), transparent);

}
.second-div {
  height: 200px;
  background: linear-gradient(transparent, rgb(141, 141, 255));
}
.title {
  margin: -70px 0px -70px 100px;
}
.title h1,
h2,
p {
  margin: 10px 0px;
}
p {
  font-weight: normal;
}

@media screen and (max-width: 900px) {
  .title {
    margin: -70px 0px -70px 5px;
  }
}
</style>
