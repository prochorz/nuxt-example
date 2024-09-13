import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      COGNITO_USERPOOL_ID: process.env.COGNITO_USERPOOL_ID,
      COGNITO_USERPOOL_CLIENT_ID: process.env.COGNITO_USERPOOL_CLIENT_ID,
      COGNITO_IDENTITY_POOL_ID: process.env.COGNITO_IDENTITY_POOL_ID,
      APPSYNC_API_URL: process.env.APPSYNC_API_URL,
      APPSYNC_API_KEY: process.env.APPSYNC_API_KEY,
    }
  },
  alias: {
    "./runtimeConfig": "./runtimeConfig.browser"
  },
  vite: {
    define: {
      "window.global": {}
    }
  },
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
      options: {
          theme: {
              preset: Aura
          }
      }
  }
})
