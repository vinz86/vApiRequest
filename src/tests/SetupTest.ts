// Simula local storage nei tests
import 'jest-localstorage-mock';

// Importa Pinia
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Configura Pinia
const pinia = createPinia();

// Esegue la configurazione di Pinia prima di ogni test
beforeEach(() => {
    const app = createApp({});
    app.use(pinia);
});