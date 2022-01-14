import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  nitro: {
    // minify: false
    // analyze: true
  }
})