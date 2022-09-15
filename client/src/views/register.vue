<script>
import { mapActions, mapWritableState } from "pinia";
import { appleStore } from "../stores/counter";
export default {
  computed: {
    ...mapWritableState(appleStore, ["email", "password"]),
  },
  methods: {
    ...mapActions(appleStore, ["register", "changePage", 'generateRandomPassword']),
  },
};
</script>
<template>
  <!-- REGISTER -->
  <div id="register">
    <h1>Create Your Applu ID</h1>
    <span>One Apple ID is all you need to access all Apple services.</span>
    <span
      >Already have an Apple ID?
      <a href="" @click.prevent="changePage('login')">Login now</a>
    </span>
    <form action="" @submit.prevent="register()">
      <input type="text" placeholder="name@example.com" v-model="email" />
      <div class="buttonIn">
        <input type="text" placeholder="Password" v-model="password" />
        <span id="random" @click="generateRandomPassword()"><i class="fa-solid fa-shuffle"></i></span>
      </div>
      <div class="button-submit-register">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
#random {
  position: absolute;
  top: 0;
  border-radius: 5px;
  right: 15px;
  top: 20px;
  height: 30px;
  cursor: pointer;
}

.buttonIn {
  position: relative;
}

#register form input {
  width: 400px;
}
</style>
