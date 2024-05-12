// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    {
      src: 'vapirequest/nuxt.ts',
      mode: 'client'
    }
  ],
  // Configurazione di base del plugin API
  runtimeConfig: {
    api: {
      defaultClient: 'axios',
      defaultEnvironment: 'dev',
      useStore: false,
      apiBaseUrl: {
        dev: 'http://localhost:5173',
        test: 'http://localhost:5173',
        prod: 'http://localhost:5173'
      },
      apiPrefix: {
        dev: '',
        test: '',
        prod: ''
      },
      modules: [
      ],
      tokenKey: 'tokenApi',
      authType: 'basic' // JWT || BASIC
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
})
