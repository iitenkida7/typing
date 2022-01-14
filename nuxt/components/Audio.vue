<template>
        <audio
          controls
          autoplay
          :src="'/audio/' + word + '.mp3'"
        ></audio>
</template>

<script>
export default {
  name: "Audio",
  props: ["word"],
};
</script>
