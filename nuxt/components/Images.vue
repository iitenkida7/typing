<template>
<ul>
  <li v-for="photo in photos" :key="photo.item">
    <img :src="photo.url_s" />
  </li>
</ul>
</template>

<script>
export default {
  name: "Images",
  props: ["photos"],
};
</script>
