import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ApiPlugin from '@/services/ApiPlugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// Registra il plugin nell'app
app.use(ApiPlugin, {
  defaultClient: 'axios',
  defaultEnvironment: 'dev',
  useStore: false,
  apiBaseUrl: { dev: 'http://localhost:5173', test: 'http://localhost:5173', prod: 'http://localhost:5173' }, // senza slash finale
  apiPrefix: { dev: '', test: '', prod: ''}, // con slash iniziale
});

app.mount('#app')
