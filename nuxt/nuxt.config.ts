import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: 'server',
  ssr: true,
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
    meta: [],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  }
})
