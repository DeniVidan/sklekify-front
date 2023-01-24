<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-blue--text text--accent-4"
        >
          <router-link to="/">
            <v-list-item to="/" link>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/workouts">
            <v-list-item to="/workouts" link>
              <v-list-item-title>Workouts</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/progress">
            <v-list-item to="/progress" link>
              <v-list-item-title>Progress</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/profile">
            <v-list-item to="/profile" link>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/signin">
            <v-list-item to="/signin" link>
              <v-list-item-title> Sign in </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/signup">
            <v-list-item to="/signup" link>
              <v-list-item-title> Sign up </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Sklekify</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: false,
      group: null,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
