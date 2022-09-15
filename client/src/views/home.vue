<script>
import { mapActions, mapWritableState } from "pinia";
import { appleStore } from "../stores/counter";
export default {
  methods: {
    ...mapActions(appleStore, [
      "changePage",
      "logOut",
      "fetchIphone",
      "changePageToOrder",
      "getIphoneId",
      "fetchMyOrder",
      "getOneIphone",
    ]),
  },
  computed: {
    ...mapWritableState(appleStore, ["isLogin", "iPhone"]),
  },
};
</script>
<template>
  <div class="product" data-aos="fade-up" v-for="el in iPhone" :key="el.id">
    <h1>{{ el.name }}</h1>
    <h3>{{ el.title }}</h3>
    <p>{{ el.description }}</p>
    <img :src="el.imgUrl" alt="" id="phone" />
    <a
      href=""
      @click.prevent="
        changePageToOrder(), getIphoneId(el.id), getOneIphone(el.id)
      "
      >Pre-order ></a
    >
  </div>
  <div class="footer">
    <div>
      <h3>ABOUT ME</h3>
      
      <P
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam sunt quod in alias magnam, vero beatae repudiandae consequatur omnis qui. Natus autem voluptas dolore nobis, quidem officiis recusandae id alias ipsa ea necessitatibus magni, adipisci animi delectus deserunt sapiente quis deleniti, obcaecati ducimus voluptatum? Iusto cupiditate facilis aliquam totam necessitatibus.</P
      >
    </div>
    <div class="useful-link">
      <h3>USEFUL LINKS</h3>
      <a href="" @click.prevent="changePage('')">Home</a>
      <a href="" @click.prevent="changePageToOrder">Your Order</a>
      <a href="" @click.prevent="changePage('')">Help</a>
    </div>
    <div class="contact">
      <h3>CONTACT</h3>
      
      <p><i class="fa-solid fa-envelope"></i>mauritius.william.wijaya1@gmail.com</p>
      <p><i class="fa-solid fa-mobile-screen-button"></i> +01 234 567 88</p>
      <p><i class="fa-solid fa-phone"></i>+01 234 567 88</p>
    </div>
    <div></div>
  </div>
</template>
