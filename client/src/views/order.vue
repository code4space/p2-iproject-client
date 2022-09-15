<script>
import { mapActions, mapWritableState } from "pinia";
import { appleStore } from "../stores/counter";
export default {
  methods: {
    ...mapActions(appleStore, ["changeColor", "changeCapacity", "addOrder", 'holdButton']),
  },
  computed: {
    ...mapWritableState(appleStore, ["color", "capacity", "oneIphone", 'styleCapacity', 'styleColor']),
  },
};
</script>
<template>
  <!-- ADD PRODUCT -->
  <div id="add-Product">
    <span>New</span>
    <h1>Pre-order {{ oneIphone.name }}</h1>
    <div class="ctrl-choose">
      <img :src="oneIphone.imgUrl" alt="" />
      <div class="pick-color">
        <h3>Pick your favourite color</h3>
        <span>Color - {{ color }}</span>
        <ul>
          <li id="gold"><button @click="changeColor('Gold'), holdButton(true)" :style="[color == 'Gold' && styleColor? {'box-shadow': '0 5px #666', 'transform': 'translateY(4px)'} : '']"></button></li>
          <li id="silver"><button @click="changeColor('Silver'), holdButton(true)" :style="[color == 'Silver' && styleColor? {'box-shadow': '0 5px #666', 'transform': 'translateY(4px)'} : '']"></button></li>
          <li id="space-black" >
            <button @click="changeColor('Space Black'), holdButton(true)" :style="[color == 'Space Black' && styleColor? {'box-shadow': '0 5px #666', 'transform': 'translateY(4px)'} : '']"></button>
          </li>
        </ul>
        <h3>How much space do you need?</h3>
        <span>Storage - {{ capacity }}</span>
        <ul>
          <li><button @click="changeCapacity('128GB'), holdButton(false)" :style="[capacity == '128GB' && styleCapacity? {'background-color': '#4c93db', 'color': 'white', 'box-shadow': '0 5px #666', 'transform': 'translateY(4px)'} : '']">128GB</button></li>
          <li><button @click="changeCapacity('256GB'), holdButton(false)" :style="[capacity == '256GB' && styleCapacity? {'background-color': '#4c93db', 'color': 'white', 'box-shadow': '0 5px #666', 'transform': 'translateY(4px)'} : '']">256GB</button></li>
          <li><button @click="changeCapacity('512GB'), holdButton(false)" :style="[capacity == '512GB' && styleCapacity? {'background-color': '#4c93db', 'color': 'white', 'box-shadow': '0 5px #666', 'transform': 'translateY(4px)'} : '']">512GB</button></li>
        </ul>
        <a href="" class="order" @click.prevent="addOrder()"
          ><button>Order <i class="fa-solid fa-plus"></i></button
        ></a>
      </div>
    </div>
  </div>
</template>
<style>

</style>
