<template>
  <ul>
    <li v-for="lesson in lessons" :key="lesson">
      <NuxtLink :to="/lesson/ + lesson" >
        {{ lesson }}
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
      lessons: null,
    };
  },
  created: function () {
    this.lessons = Object.keys(Lesson);
  },
};
</script>
