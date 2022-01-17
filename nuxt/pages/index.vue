<template>
  <div class="container">
    <div :v-if="completed === false">
      <Word
        :ja="target.ja"
        :remains="remains"
        :word="target.word"
        :targetChr="targetChr"
      />
      <div class="has-text-centered">
        <input type="text" autofocus v-model="inputText" @keyup="keyPress" />
      </div>

      <div class="has-text-centered" v-if="completed">
        <h1>OK＼(^o^)／</h1>
        <button v-on:click="retry">Retry</button>
      </div>
      <Debug :pressKey="pressKey" :keyCode="keyCode" :missCnt="missCnt" />
         <li v-for="photo in photos">
          <img :src="photo.url_s">
        </li>
    </div>
  </div>
</template>

<script setup>
      const url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2da67eccedeb0b110a63374c5c53cc41&per_page=10&text=bed&extras=url_s&sort=relevance&media=photos&safe_search=1&format=json&nojsoncallback=1";
      const { data } = await useFetch(url);
      const photos = data.value.photos.photo;
</script>
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
      const voice = window.speechSynthesis.getVoices()[41]; //'Victoria'
      utter.voice = voice;
      window.speechSynthesis.speak(utter);
    },
  },
};
</script>
<style lang="scss"></style>
