<script>
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { mapActions, mapWritableState } from "pinia";
import { appleStore } from "./stores/counter";
export default {
  components: { RouterView },
  methods: {
    ...mapActions(appleStore, [
      "changePage",
      "logOut",
      "fetchIphone",
      "fetchMyOrder",
      "handleCredentialResponse"
    ]),
    handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      axios({
        method: "POST",
        url: this.baseUrl + "/google-sign-in",
        headers: {
          token_dari_google: response.credential,
        },
        data: {
          token_dari_google: response.credential,
        },
      })
        .then((response) => {
          localStorage.setItem("access_token", response.data[0].access_token);
          localStorage.setItem("email", response.data[1].email);
          localStorage.setItem("authorId", response.data[1].id);
          this.fetchIphone();
          this.fetchMyOrder();
          this.changePage('')
          if (localStorage.getItem("access_token")) {
            this.isLogin = true;
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: `ERROR`,
            text: `${err.responseJSON}`,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        });
    },
  },
  computed: {
    ...mapWritableState(appleStore, ["isLogin", "baseUrl"]),
  },
  mounted() {
    const callback = this.handleCredentialResponse;
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "814776840113-mflcqpso4ddfsf9qubf2qvp803paq7a7.apps.googleusercontent.com",
        callback,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
    };
  },
  created() {
    this.fetchIphone();
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
      this.fetchMyOrder();
    }
  },
};
</script>

<template>
  <section id="navigation">
    <a @click.prevent="changePage('')"
      ><i class="fa-solid fa-apple-whole"></i
    ></a>
    <nav>
      <ul class="nav_links">
        <li class="nav-item">
          <a href="" @click.prevent="changePage('')">Home</a>
        </li>
        <li class="nav-item">
          <a
            href=""
            @click.prevent="changePage('myOrder')"
            v-if="isLogin == true"
            >My Order</a
          >
        </li>
      </ul>
    </nav>
    <div class="sign">
      <a href="" @click.prevent="changePage('login')" v-if="isLogin == false"
        >Sign in</a
      >
      <a href="" v-if="isLogin == true" @click.prevent="logOut()">Log out</a>
    </div>
  </section>
  <RouterView />
</template>
