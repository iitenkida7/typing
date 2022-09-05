import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: [
    'bulma',
  ],
  meta: {
    meta: [],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  }
})
