<template>
  <div class="has-text-centered">
    <p class="is-size-2">{{ ja }}</p>
  </div>
  <div class="has-text-centered">
    <p class="is-size-1">{{ word }}</p>
  </div>
  <div class="has-text-centered">
    {{ remains }}
  </div>
  <div class="has-text-centered">
    <p class="is-size-1">{{ targetChr }}</p>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: ["ja", "word", "remains", "targetChr"],
};
</script>
