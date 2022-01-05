<template>
  <div :v-if="completed === false">
    <div class="columns">
      <div class="column">
        <p class="is-size-1">{{ target.word }}</p>
      </div>
      <div class="column">
        <p class="is-size-2">{{ target.ja }}</p>
      </div>
    </div>
    <div>
      {{ remains }}
    </div>
    <div>
      <p class="is-size-1">{{ targetChr }}</p>
    </div>

    <h1 v-if="completed">OK＼(^o^)／</h1>
    <input type="text" v-model="inputText" @keyup="keyPress" />
  </div>

  <table class="table">
    <tr>
      <td>key</td>
      <td>{{ key }}</td>
    </tr>
    <tr>
      <td>keyCode</td>
      <td>{{ keyCode }}</td>
    </tr>
    <tr>
      <td>missCont</td>
      <td>{{ missCnt }}</td>
    </tr>
  </table>
</template>

<script>
import TypingData from "./typing_data.json";

export default {
  name: "App",
  data: function () {
    return {
      target: {
        word: "",
        ja: "",
      },
      remains: "",
      targetChr: "",
      completed: false,
      missCnt: 0,
      key: "",
      keyCode: "",
    };
  },
  created: function () {
    this.TypingData = TypingData.sort(() => Math.random() - 0.5);
    this.target = this.TypingData.shift();
    this.remains = this.target.word;
    this.targetChr = this.remains.substr(0, 1);
  },
  methods: {
    keyPress(event) {
      if (event.key === this.targetChr) {
        this.remains = this.remains.substr(1);
        this.targetChr = this.remains.substr(0, 1);
      } else {
        this.missCnt++;
      }

      if (this.remains.length === 0) {
        this.target = this.TypingData.shift();
        this.inputText = "";
        if (this.target) {
          this.remains = this.target.word;
          this.targetChr = this.remains.substr(0, 1);
        } else {
          this.target = {
            word: "",
            ja: "",
          };
          this.completed = true;
        }
      }

      //console.log(this.target);
      this.key = event.key;
      this.keyCode = event.keyCode;
    },
  },
};
</script>

<style lang="scss">
@import "bulma/bulma.sass";
</style>
