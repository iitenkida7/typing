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
    <div>
      <audio controls autoplay :src="'/audio/' + target.word + '.mp3'"></audio>
    </div>
  </div>
  <Debug :pressKey="pressKey" :keyCode="keyCode" :missCnt="missCnt" />
</template>

<script>
import TypingData from "./typing_data.json";
import Debug from "./components/Debug.vue";

export default {
  name: "App",
  components: {
    Debug,
  },
  data: function () {
    return {
      inputText: "",
      target: {
        word: "",
        ja: "",
      },
      remains: "",
      targetChr: "",
      completed: false,
      missCnt: 0,
      pressKey: "",
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
      this.pressKey = event.key;
      this.keyCode = event.keyCode;
    },
  },
};
</script>

<style lang="scss">
@import "bulma/bulma.sass";
</style>
