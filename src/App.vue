<template>
  <div>
    {{ target }}
  </div>
  <div>
    {{ targetChr }}
  </div>

  <input type="text" @keydown="onKeyDown" />

  <h1 v-if="completed">OK＼(^o^)／</h1>
  <pre>
key: {{ key }}
keyCode: {{ keyCode }}
missCont: {{ missCnt }}
</pre>
</template>

<script>
import TypingData from "./typing_data.json";

export default {
  name: "App",
  data: function () {
    return {
      target: "",
      targetChr: "",
      key: "",
      keyCode: "",
      completed: false,
      missCnt: 0,
      TypingData: TypingData,
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      this.TypingData = TypingData.sort(() => Math.random() - 0.5);

      this.target = this.TypingData.shift();
      this.targetChr = this.target.substr(0, 1);
    });
  },
  methods: {
    onKeyDown(event) {
      if (event.key === this.targetChr) {
        this.target = this.target.substr(1);
        this.targetChr = this.target.substr(0, 1);
      }else{
          this.missCnt++;
      }

      if (this.target.length === 0) {
        this.target = this.TypingData.shift();
        if (this.target) {
          this.targetChr = this.target.substr(0, 1);
        } else {
          this.completed = true;
        }
      }

      console.log(this.target);
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
