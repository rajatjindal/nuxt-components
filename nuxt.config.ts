import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    resolve('./assets/css/main.css')
  ],
  components: [
    {
      path: './components',
      pathPrefix: false,
      global: true
    },
    {
      path: './components/reusables',
      pathPrefix: false,
      global: true
    },
    {
      path: './components/icons',
      pathPrefix: false,
      global: true
    },
  ],
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
