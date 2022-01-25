<template>
  <ul>
    <li v-for="lesson in lessons" :key="lesson">
      <NuxtLink :to="/lesson/ + lesson">
        {{ lesson }}
      </NuxtLink>
    </li>
  </ul>
</template>
<script setup>
import Lesson from "@/assets/json/lesson.json";
</script>
<script>
export default {
  name: "lesson",
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
