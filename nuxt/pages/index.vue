<template>
  <ul>
    <li v-for="(lesson, index) in lessons">
      <NuxtLink :to="/lesson/ + index">
        {{ index }} / {{ lesson.description }}
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
      lessons: Lesson,
    };
  },
};
</script>
