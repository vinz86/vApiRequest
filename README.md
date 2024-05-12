# Documentazione
Centralizza la gestione delle chiamate API nel progetto Vue.js.

E' possibile configurare le chiamate API, gestire gli endpoint e utilizzare diversi client HTTP come Axios o Fetch.

## Installazione e Configurazione

### VUE
Installare il pacchetto 'vApiRequest' ed aggiungere il plugin del pacchetto in main.ts (o main.js).

``` typescript
import { createApp } from 'vue';
import App from './App.vue';
import ApiPlugin from 'vapirequest';
import { moduloDinamico } from '@/modules/moduloDinamico/ModuloDinamico.module'
import { moduloDinamicoEndpoints } from '@/modules/moduloDinamico/ModuloDinamico.endpoints'

const app = createApp(App);

app.use(ApiPlugin, {
  defaultClient: 'axios',
  defaultEnvironment: 'dev',
  useStore: false,
  apiBaseUrl: { dev: 'http://localhost:5173', test: 'http://localhost:5173', prod: 'http://localhost:5173' },
  apiPrefix: { dev: '', test: '', prod: '' },
  modules: [{ name: 'moduloDinamico', module: moduloDinamico, endpoints: moduloDinamicoEndpoints }] // facoltativi
});

app.mount('#app');
```

### NUXT

Per utilizzare il pacchetto bisogna registrare il plugin in nuxt.config.js:
```typescript
// nuxt.config.js
export default defineNuxtConfig({
    plugins: [
        {
            src: 'vapirequest/nuxt.ts',
            mode: 'client'
        }
    ],
    // Configurazione di base del plugin API
    runtimeConfig: {
        api: {
            defaultClient: 'fetch',
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
        '@pinia/nuxt', // Pinia serve per gestire lo store del pluginApi
    ],
})
```

## Esempio di utilizzo
Una volta installato il plugin, è possibile utilizzare le funzionalità dell'API ovunque nell'applicazione.
### VUE
Ecco un esempio di come utilizzare l'API nei componenti Vue:

``` typescript
import { inject } from 'vue';

const useApiStore: any = inject('useApiStore');
const api: any = inject('api');

const fetchData = async () => {
  try {
    const response = await api.http.get('/endpoint');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

### NUXT
Ecco un esempio per Nuxt:

``` typescript
import {useNuxtApp} from "#app";

const {$api} = useNuxtApp();

const fetchData = async () => {
  try {
    const response = await $api.http.get('/endpoint');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```
N.B. 'api' diventa '$api'. Se si utilizza il codice degli esempi bisogna adattarlo per
utilizzare l'oggetto corretto.

### Modifica configurazione

E' possibile modificare le configurazioni dell'API in runtime:

```typescript
const api: any = inject('api');
api.setUseStore(true);
api.setApiPrefix({  //con slash iniziale
  dev: '', 
  test: '', 
  prod: '/test-prefix' 
});
api.setApiBaseUrl({  //senza slash finale
  dev: '',
  test: '',
  prod: 'http://localhost:80'
});
api.setDefaultClient('axios'); // axios | FetchClient.ts
api.setDefaultEnvironment('dev'); // dev | test | prod

// ... chiamate api

// ..nuova modifica configurazione
```

## Moduli
Si possono usare diversi moduli per gestire le funzionalità delle chiamate API.

### http
Il modulo http fornisce metodi per effettuare chiamate HTTP CRUD.

```
* get(endpoint: string, config?: ApiRequestConfig): Promise<T>: Effettua una richiesta HTTP GET.
* head(endpoint: string, config?: ApiRequestConfig): Promise<T>: Effettua una richiesta HTTP HEAD.
* post(endpoint: string, config?: ApiRequestConfig): Promise<T>: Effettua una richiesta HTTP POST.
* patch(endpoint: string, config?: ApiRequestConfig): Promise<T>: Effettua una richiesta HTTP PATCH.
* put(endpoint: string, config?: ApiRequestConfig): Promise<T>: Effettua una richiesta HTTP PUT.
* delete(endpoint: string, config?: ApiRequestConfig): Promise<T>: Effettua una richiesta HTTP DELETE.
```

```typescript
// esempio
const api: any = inject('api');

const configRequest = {
  method?: 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: any;
  queryParams?: {};
  pathParams?: {};
  headers?: {};
  module?: string; // nome del modulo, es. 'nomemodulo' (per salvare nello store)
  responseType?: string;
  responseEncoding?: string; // solo per axios
}
let response = await api.http.get('/endpoint', configRequest);
```

### Moduli Aggiuntivi
E' possibile creare ulteriori moduli aggiuntivi e diversificare gli endpoints in base all'ambiente.
I moduli possono essere creati in ogni cartella, ogni modulo deve contenere il file principale del modulo e gli endpoints (facoltativi):

```
// esempio
/modules/API/nomemodulo/Nomemodulo.module.ts (o .js)
/modules/API/nomemodulo/Nomemodulo.endpoints.ts (o .js)
```

#### Importazione dei moduli
I moduli possono essere importati in main.ts (o .js) nella sezione del Plugin.

```typescript
// ... importare moduloDinamico e moduloDinamicoEndpoints

app.use(ApiPlugin, {
  defaultClient: 'axios',
  defaultEnvironment: 'dev',
  useStore: false,
  apiBaseUrl: { dev: 'http://localhost:5173', test: 'http://localhost:5173', prod: 'http://localhost:5173' },
  apiPrefix: { dev: '', test: '', prod: '' },
  modules: [
    { name: 'moduloDinamico', 
      module: moduloDinamico, 
      endpoints: moduloDinamicoEndpoints // facoltativo
    }  // nuovo modulo e endpoints dinamici
    ]
});
```

### Esempio di modulo

#### Modulo
```typescript
// /modules/Todos.module.ts
import { api } from 'vapirequest/Api'
import type { ApiResponse, ApiRequestConfig } from 'vapirequest/ApiModels'

export const todos = {
    async getTodo<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
        config.endpoint = `/${api.getEndpoint("getTodo")}`;
        config.method = 'GET';
        return await api.request<T>(config);
    },
};

```
##### Endpoints (facoltativo)
``` typescript
// /modules/Todos.endpoints.ts
import type { Endpoints } from 'vapirequest/ApiModels'

export const todosEndpoints: Endpoints = {
  getTodo: {
    dev: 'todos/{id}',
    test: 'todos/{id}',
    prod: 'todos/{id}',
  }
};
```

#### Esempio di utilizzo
```typescript
const api: any = inject('api');
let response = await api.todos.getTodo();
```

## Store
Il pacchetto include uno store per memorizzare i dati delle chiamate API in modo persistente.

### Utilizzo dello Store
Per utilizzare lo store, si può accedere alle funzionalità utilizzando l'hook useApiStore.

```typescript
const useApiStore: any = inject('useApiStore');
// oppure per Nuxt:
// const {useApiStore} = useNuxtApp();

// Utilizzare con cautela
// Le chiamate effettuate vengono salvate automaticamente nello store se useStore===true
useApiStore().setData({
    module: 'http',
    method: 'GET',
    endpoint: 'https://host/prefix/test/endpoint?param=1',
    data: { data: 'test data' },
    payload: { payload: 'test' }
});

useApiStore().getData({
    module: 'http',
    method: 'GET',
    endpoint: 'https://host/prefix/test/endpoint?param=1',
    payload: { payload: 'test' }
});
```
## UTILS

Le utils incluse nel pacchetto aiutano a gestire diverse operazioni comuni nelle chiamate API.

### replacePathParams
Sostituisce i `pathParams` nell'endpoint con i valori forniti.

```typescript
import { replacePathParams } from 'vapirequest/utils';

const pathParams = { id: '123' };
const endpoint = '/api/todos/{id}';
const replacedEndpoint = replacePathParams(pathParams, endpoint);
// Risultato: '/api/todos/123'
```

### replaceQueryParams
Aggiunge i queryParams all'endpoint.
```typescript
import { replaceQueryParams } from 'vapirequest/utils';

const queryParams = { page: 1, limit: 10 };
const endpoint = '/api/todos';
const updatedEndpoint = replaceQueryParams(queryParams, endpoint);
// Risultato: '/api/todos?page=1&limit=10'

```

### objectToFixedLengthHash
Converte un oggetto JSON in un hash di lunghezza fissa.
```typescriptimport { objectToFixedLengthHash } from 'vapirequest/utils';
const obj = { key1: 'value1', key2: 'value2' };
const hash = objectToFixedLengthHash(obj);
// Esempio di risultato: 'a3c98b7e'

```

### saveToStore
Salva i dati nello store dell'API se abilitato.
```typescript
import { saveToStore } from 'vapirequest/utils';

const module = 'http';
const method = 'GET';
const endpoint = '/api/todos';
const data = { todos: [...] };
const payload = null;
saveToStore(module, method, endpoint, data, payload);

```

### generateStoreDataKey
Genera la chiave del dato salvato (o da salvare) nello store.
```typescript
import { generateStoreDataKey } from 'vapirequest/utils';

const endpoint = '/api/todos';
const method = 'GET';
const payload = { page: 1, limit: 10 };
const key = generateStoreDataKey(endpoint, method, payload);
// Esempio di risultato: '/api/todos-GETa3c98b7e'
```

## TODO
* Soap Module