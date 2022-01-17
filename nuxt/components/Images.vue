<template>
  <div class="columns">
    <div class="column" v-for="photo in photos" :key="photo.item">
      <img :src="photo.url_s" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Images",
  props: ["photos"],
};
</script>
