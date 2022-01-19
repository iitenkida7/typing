<template>
  <div class="container">
    <div v-if="isStarted && !completed">
      <Word
        :ja="target.ja"
        :remains="remains"
        :word="target.word"
        :targetChr="targetChr"
      />
      <Images class="mt-6" :word="target.word" />
      <div class="has-text-centered">
        <canvas ref="target"></canvas>
      </div>
      <div class="has-text-centered">
        <input type="text" autofocus v-model="inputText" @keyup="keyPress" />
      </div>
    </div>
    <div v-if="!isStarted" class="has-text-centered">
      <button v-on:click="start" class="has-text-centered">Start</button>
    </div>
    <div v-if="completed" class="has-text-centered">
      <h1>OK＼(^o^)／</h1>
      <button v-on:click="retry">Retry</button>
    </div>
    <Debug :pressKey="pressKey" :keyCode="keyCode" :missCnt="missCnt" />
  </div>
</template>

<script>
import Lesson from "@/assets/json/lesson.json";
import * as confetti from "canvas-confetti";
export default {
  name: "index",
  data: function () {
    return {
      isStarted: false,
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
    this.TypingData = Lesson.lesson002.words.sort(() => Math.random() - 0.5);
  },
  methods: {
    start() {
      this.isStarted = true;
      this.nextWord();
      this.speech(this.target.word);
    },
    keyPress(event) {
      if (event.key === this.targetChr) {
        this.remains = this.remains.substr(1);
        this.targetChr = this.remains.substr(0, 1);
        this.cracker();
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
    cracker() {
      confetti.create(this.$refs.target)({
        shapes: ["square"],
        particleCount: 10,
        spread: 90,
        origin: {
          y: 1,
          x: 0.5,
        },
      });
    },
  },
};
</script>
<style lang="scss"></style>
