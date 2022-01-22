<template>
  <div class="container">
    <Header :lessons="lessons" />
    <slot />
    <Footer />
  </div>
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
