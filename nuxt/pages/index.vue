<template>
  <ul>
    <li v-for="(lesson, index) in lessons">
      <NuxtLink :to="/lesson/ + index">
        {{ index }} / {{ lesson.description }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import Lesson from "@/assets/json/lesson.json";

export default {
  name: "lesson",
  data: function () {
    return {
      lessons: Lesson,
    };
  },
};
</script>
