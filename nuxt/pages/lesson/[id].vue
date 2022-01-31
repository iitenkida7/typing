<template>
  <div>
    {{ $route.params.id }}
    <div v-if="isStarted && !completed">
      <Word :ja="target.ja" :word="target.word" />
      <Images class="mt-6" :imageData="imageData" :word="target.word" />
      <div class="has-text-centered">
        <canvas ref="target"></canvas>
      </div>
      <Char :remains="remains" :targetChr="targetChr" />
      <Keyboard :targetChr="targetChr.toUpperCase()" />
      <div class="has-text-centered">
        <button class="button is-primary" v-on:click="speech(target.word)">
          再生
        </button>
      </div>
    </div>
    <div v-if="!isStarted" class="has-text-centered">
      <button v-on:click="start" class="button is-primary is-large">
        Start
      </button>
    </div>
    <div v-if="completed" class="has-text-centered">
      <p class="has-text-info">Completed!＼(^o^)／</p>
      <button class="button is-primary is-large" v-on:click="retry">
        Retry
      </button>
    </div>
    <Debug :pressKey="pressKey" :keyCode="keyCode" :missCnt="missCnt" />
  </div>
</template>

<script setup>
import Lesson from "@/assets/json/lesson.json";
import * as confetti from "canvas-confetti";
import lodash from "lodash";
</script>
<script>
function initialState() {
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
    isMatch: null,
    isMiss: null,
    typingData: null,
    imageData: null,
  };
}

export default {
  name: "lesson-id",
  data: function () {
    return initialState();
  },
  created: function () {
    window.speechSynthesis.getVoices(); // dummy call.
    this.imageData = lodash.cloneDeep(Lesson[this.$route.params.id]).words;
  },
  watch: {
    $route: function (to, from) {
      Object.assign(this.$data, initialState());
      this.imageData = lodash.cloneDeep(Lesson[this.$route.params.id]).words;
    },
  },
  mounted: function () {
    document.addEventListener("keydown", this.keyPress);
  },
  methods: {
    start() {
      const lessonData = lodash.cloneDeep(Lesson[this.$route.params.id]);
      this.typingData = lessonData.words.sort(() => Math.random() - 0.5);
      this.isStarted = true;
      this.nextWord();
      this.speech(this.target.word);
    },
    nextWord() {
      this.target = this.typingData.shift();
      this.remains = this.target.word;
      this.targetChr = this.remains.substr(0, 1);
    },
    retry() {
      Object.assign(this.$data, initialState());
      this.imageData = lodash.cloneDeep(Lesson[this.$route.params.id]).words;
      this.start();
    },
    keyPress(event) {
      if (this.checkChr(this.targetChr, event.key)) {
        this.remains = this.remains.substr(1);
        this.targetChr = this.remains.substr(0, 1);
        this.isMatch = true;
        this.isMiss = false;
        this.cracker();
        this.playDram();
      } else {
        this.inputText = this.inputText.slice(0, -1);
        this.missCnt++;
        this.isMatch = false;
        this.isMiss = true;
        this.playBeep();
      }
      if (this.remains.length === 0) {
        if (this.typingData.length > 0) {
          this.inputText = "";
          this.nextWord();
          this.speech(this.target.word);
        } else {
          this.completed = true;
        }
      }

      this.pressKey = event.key;
      this.keyCode = event.keyCode;
    },
    checkChr(target, input) {
      if (target.toLowerCase() === input.toLowerCase()) {
        return true;
      }
      return false;
    },
    speech(text) {
      const utter = new SpeechSynthesisUtterance();
      utter.voice = window.speechSynthesis.getVoices()[41]; //Victoria
      utter.rate = 0.75;
      utter.text = text;
      window.speechSynthesis.speak(utter);
    },
    cracker() {
      confetti.create(this.$refs.target)({
        shapes: ["square"],
        particleCount: 20,
        spread: 120,
        //zIndex: -1,
        origin: {
          y: 1,
          x: 0.5,
        },
      });
    },
    playDram() {
      const dram = new Audio("/sounds/dram.mp3"); // @todo: move created
      dram.play();
    },
    playBeep() {
      const beep = new Audio("/sounds/beep.mp3"); // @todo: move created
      beep.play();
    },
  },
};
</script>
<style lang="scss"></style>
