<template>
  <div :v-if="completed === false">
    <div>
      {{ target }}
    </div>
    <div>
      {{ remains }}
    </div>
    <div>
      {{ targetChr }}
    </div>
    <input type="text" v-model="inputText" @keyup="keyPress" />
  </div>

  <h1 v-if="completed">OK＼(^o^)／</h1>
  <pre>
key: {{ key }}
keyCode: {{ keyCode }}
missCont: {{ missCnt }}
</pre
  >
</template>

<script>
import TypingData from "./typing_data.json";

export default {
  name: "App",
  data: function () {
    return {
      target: '',
      remains: '',
      targetChr: '',
      completed: false,
      missCnt: 0,
      key: '',
      keyCode: '',
      TypingData: TypingData,
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      this.TypingData = TypingData.sort(() => Math.random() - 0.5);
      this.target = this.TypingData.shift();
      this.remains = this.target;
      this.targetChr = this.remains.substr(0, 1);
    });
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
        this.remains = this.target;
        this.inputText = '';
        if (this.target) {
          this.targetChr = this.remains.substr(0, 1);
        } else {
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
