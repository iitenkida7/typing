<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item" to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          alt="Bulma: a modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </NuxtLink>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <NuxtLink class="navbar-item" to="/">Home</NuxtLink>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Docs </a>
          <div class="navbar-dropdown is-boxed">
            <div v-for="lesson in lessons" :key="lesson">
              <NuxtLink class="navbar-item" to="/lesson">{{ lesson }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  </nav>
</template>

<script>
import Lesson from "@/assets/json/lesson.json";

export default {
  data: function () {
    return {
      lessons: null,
    };
  },
  created: function () {
    this.lessons = Object.keys(Lesson);
  },
};
</script>
