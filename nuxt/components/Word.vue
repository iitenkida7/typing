<template>
  <div>
    <div class="has-text-centered">
      <p class="is-size-2">{{ ja }} / {{ word }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: ["ja", "word"],
};
</script>
