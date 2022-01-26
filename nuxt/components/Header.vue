<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item" to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          alt="Typing"
          width="112"
          height="28"
        />
      </NuxtLink>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <NuxtLink class="navbar-item" to="/">Home</NuxtLink>

        <div
          :class="['navbar-item', 'has-dropdown', { 'is-active': isActive }]"
          v-on:click="dropdown()"
        >
          <a class="navbar-link"> Lessons </a>
          <div class="navbar-dropdown is-boxed">
            <div v-for="lesson in lessons" :key="lesson">
              <NuxtLink class="navbar-item" :to="/lesson/ + lesson">{{
                lesson
              }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <!--
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary" href="#">
                <span>Hoge</span>
              </a>
            </p>
          </div>
        </div>
      </div>
-->
    </div>
  </nav>
</template>

<script>
export default {
  props: ["lessons"],
  data: function () {
    return {
      isActive: false,
    };
  },
  methods: {
    dropdown() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
};
</script>
