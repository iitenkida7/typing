import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  nitro: {
    // minify: false
    // analyze: true
  },
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    'bulma',
    // CSS file in the project
    //'@/assets/css/main.css',
    // SCSS file in the project
    //'@/assets/css/main.scss'
  ],
  meta: {
  }
})
