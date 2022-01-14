<template>
  <table class="table">
    <tbody>
      <tr>
        <td>pressKey</td>
        <td>{{ pressKey }}</td>
      </tr>
      <tr>
        <td>keyCode</td>
        <td>{{ keyCode }}</td>
      </tr>
      <tr>
        <td>missCont</td>
        <td>{{ missCnt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Debug",
  props: ["pressKey", "keyCode", "missCnt"],
};
</script>
