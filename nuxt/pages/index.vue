<template>
  <div class="container">
    <div :v-if="!completed">
      <Word
        :ja="target.ja"
        :remains="remains"
        :word="target.word"
        :targetChr="targetChr"
      />
      <Images class="mt-6" :word="target.word" />
      <div class="has-text-centered">
        <input type="text" autofocus v-model="inputText" @keyup="keyPress" />
      </div>
    </div>
    <div class="has-text-centered" v-if="completed">
      <h1>OK＼(^o^)／</h1>
      <button v-on:click="retry">Retry</button>
    </div>
    <Debug :pressKey="pressKey" :keyCode="keyCode" :missCnt="missCnt" />
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

    // @todo: duplicated code
    this.target = this.TypingData.shift();
    this.remains = this.target.word;
    this.targetChr = this.remains.substr(0, 1);
    this.speech(this.target.word);
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
          this.nextWord();
          this.speech(this.target.word);
        } else {
          this.completed = true;
        }
      }

      this.pressKey = event.key;
      this.keyCode = event.keyCode;
    },
    nextWord() {
      this.target = this.TypingData.shift();
      this.remains = this.target.word;
      this.targetChr = this.remains.substr(0, 1);
    },
    retry() {
      window.location.reload();
    },
    speech(text) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = window.speechSynthesis.getVoices()[41]; //'Victoria'
      window.speechSynthesis.speak(utter);
    },

  },
};
</script>
<style lang="scss"></style>
