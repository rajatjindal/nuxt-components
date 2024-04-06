// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
