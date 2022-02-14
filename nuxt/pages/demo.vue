<template>
  <div>
    <h2>どっちが大きい？</h2>
    <button class="button is-size-2" v-on:click="validation(this.valA)">
      {{ this.valA }}
    </button>
    <button class="button is-size-2" v-on:click="validation(this.valB)">
      {{ this.valB }}
    </button>

    <div v-if="isSuccess">＼(^o^)／</div>
  </div>
</template>
<script setup></script>
<script>
export default {
  name: "demo",
  data: function () {
    return {
      valA: 0,
      valB: 0,
      isSuccess: null,
    };
  },
  created: function () {
    this.start();
  },
  methods: {
    validation(val) {
      if (this.valA > this.valB && val === this.valA) {
        this.isSuccess = true;
      } else if (this.valA < this.valB && val === this.valB) {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }
    },
    start() {
      this.valA = this.random(100);
      this.valB = this.random(100);
      if (this.valA === this.valB) {
        this.start();
      }
    },
    sleep(ms) {
      Promise((resolve) => setTimeout(resolve, ms));
    },
    random(max) {
      return Math.floor(Math.random() * max);
    },
  },
};
</script>
