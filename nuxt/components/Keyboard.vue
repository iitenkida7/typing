<template>
  <div>
    <div class="has-text-centered">
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'Q' },{ 'is-danger': targetChr === 'Q' },]">Q</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'W' },{ 'is-danger': targetChr === 'W' },]">W</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'E' },{ 'is-danger': targetChr === 'E' },]">E</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'R' },{ 'is-danger': targetChr === 'R' },]">R</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'T' },{ 'is-danger': targetChr === 'T' },]">T</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'Y' },{ 'is-danger': targetChr === 'Y' },]">Y</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'U' },{ 'is-danger': targetChr === 'U' },]">U</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'I' },{ 'is-danger': targetChr === 'I' },]">I</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'O' },{ 'is-danger': targetChr === 'O' },]">O</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'P' },{ 'is-danger': targetChr === 'P' },]">P</p>
    </div>
    <div class="has-text-centered">
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'A' },{ 'is-danger': targetChr === 'A' },]">A</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'S' },{ 'is-danger': targetChr === 'S' },]">S</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'D' },{ 'is-danger': targetChr === 'D' },]">D</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'F' },{ 'is-danger': targetChr === 'F' },]">F</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'G' },{ 'is-danger': targetChr === 'G' },]">G</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'H' },{ 'is-danger': targetChr === 'H' },]">H</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'J' },{ 'is-danger': targetChr === 'J' },]">J</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'K' },{ 'is-danger': targetChr === 'K' },]">K</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'L' },{ 'is-danger': targetChr === 'L' },]">L</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== ';' },{ 'is-danger': targetChr === ';' },]">;</p>
    </div>
    <div class="has-text-centered">
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'Z' },{ 'is-danger': targetChr === 'Z' },]">Z</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'X' },{ 'is-danger': targetChr === 'X' },]">X</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'C' },{ 'is-danger': targetChr === 'C' },]">C</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'V' },{ 'is-danger': targetChr === 'V' },]">V</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'B' },{ 'is-danger': targetChr === 'B' },]">B</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'N' },{ 'is-danger': targetChr === 'N' },]">N</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== 'M' },{ 'is-danger': targetChr === 'M' },]">M</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== ',' },{ 'is-danger': targetChr === ',' },]">,</p>
      <p :class="['button','is-size-2','m-1', { 'is-black': targetChr !== '.' },{ 'is-danger': targetChr === '.' },]">.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Keyboard",
  props: ["targetChr"],
};
</script>

<style></style>
