<template>
  <div>
    <div class="has-text-centered">
      <p class="is-size-1">{{ remains.replace(" ", "␣") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Char",
  props: ["remains", "targetChr"],
};
</script>
