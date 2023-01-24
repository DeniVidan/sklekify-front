<template>
  <v-card class="mx-auto mt-5" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://manofmany.com/wp-content/uploads/2020/02/How-to-do-a-proper-pushup.jpg"
    >
      <v-card-title class="mt-0">Push Ups</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> </v-card-subtitle>

    <v-card-text class="text--primary">
      <div class="mb-3"><h2>Share todays progress:</h2></div>

      <div class="inline">
        <v-text-field
          class="number-input"
          v-model="numberValue"
          hide-details
          single-line
          type="number"
          label="Number of repetitions"
          min="0"
        />

        <v-btn class="ml-2" color="success"> submit </v-btn>

      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn class="ml-auto" color="error" text> Remove exercise </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "HelloWorld",

  data: () => ({
    numberValue: "",
  }),
  methods: {},
};
</script>
<style scoped>
.inline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

}
.number-input {
  margin-top: 0;
  padding-top: 0;
}
.text--primary{
  padding: 0px 16px 0px 16px;
  margin-bottom: 16px;
}
</style>
