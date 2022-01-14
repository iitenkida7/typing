<template>
  <div class="container">
    <div :v-if="completed === false">
      <Word :ja="target.ja" :word="target.word" :targetChr="targetChr" />
      <div class="has-text-centered">
        <input type="text" autofocus v-model="inputText" @keyup="keyPress" />
      </div>

      <div class="has-text-centered" v-if="completed">
        <h1>OK＼(^o^)／</h1>
        <button v-on:click="retry">Retry</button>
      </div>
      <Audio :word="target.word" />
      <Debug :pressKey="pressKey" :keyCode="keyCode" :missCnt="missCnt" />
    </div>
  </div>
</template>

<script>
import TypingData from "../typing_data.json"; // @todo: Change path
export default {
  name: "IndexPage",
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
  mounted: function () {
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
        this.inputText = "";
        if (this.TypingData.length > 0) {
          console.log(this.TypingData);
          this.target = this.TypingData.shift();
          this.remains = this.target.word;
          this.targetChr = this.remains.substr(0, 1);
        } else {
          this.completed = true;
        }
      }

      this.pressKey = event.key;
      this.keyCode = event.keyCode;
    },
    retry() {
      window.location.reload();
    },
  },
};
</script>
<style lang="scss"></style>
