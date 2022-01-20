<template>
  <table class="table">
    <thead>
      <tr>
        <th>pressKey</th>
        <th>keyCode</th>
        <th>missCont</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ pressKey }}</td>
        <td>{{ keyCode }}</td>
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
