# Documentazione
Centralizza la gestione delle chiamate API nel progetto Vue.js.

E' possibile configurare le chiamate API, gestire gli endpoint e utilizzare diversi client HTTP come Axios o Fetch.

## Installazione e Configurazione
Installare il pacchetto 'vApiRequest' ed aggiungere il plugin del pacchetto in main.ts (o main.js).

``` typescript
import { createApp } from 'vue';
import App from './App.vue';
import ApiPlugin from 'il-tuo-pacchetto';
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

## Esempio di utilizzo
Una volta installato il plugin, è possibile utilizzare le funzionalità dell'API ovunque nell'applicazione.
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
api.setDefaultClient('axios'); // axios | fetch
api.setDefaultEnvironment('dev'); // dev | test | prod

// ... chiamate api

// ..nuova modifica configurazione
```

## Moduli
Si possono usare diversi moduli per gestire le funzionalità delle chiamate API.

### http
Il modulo http fornisce metodi per effettuare chiamate HTTP CRUD.

```
* get(endpoint: string, config?: HttpModuleRequestConfig): Promise<T>: Effettua una richiesta HTTP GET.
* head(endpoint: string, config?: HttpModuleRequestConfig): Promise<T>: Effettua una richiesta HTTP HEAD.
* post(endpoint: string, config?: HttpModuleRequestConfig): Promise<T>: Effettua una richiesta HTTP POST.
* patch(endpoint: string, config?: HttpModuleRequestConfig): Promise<T>: Effettua una richiesta HTTP PATCH.
* put(endpoint: string, config?: HttpModuleRequestConfig): Promise<T>: Effettua una richiesta HTTP PUT.
* delete(endpoint: string, config?: HttpModuleRequestConfig): Promise<T>: Effettua una richiesta HTTP DELETE.
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
import type { HttpModuleRequestConfig } from 'vapirequest/ApiModels'
import type { ApiResponse } from 'vapirequest/ApiModels'

export const todos = {

  async getTodo<T>(config: HttpModuleRequestConfig = {}): Promise<ApiResponse<T>> {
    const { queryParams = {}, pathParams = {}, headers = {}, module = 'todos' } = config;
    return await api.request<T>({
      endpoint: `/${api.getEndpoint("getTodo")}`,
      method: 'GET',
      queryParams: queryParams,
      pathParams: pathParams,
      data: null,
      headers: headers,
      module: module
    });
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

useApiStore().setData({
  module: 'todos',
  endpoint: 'getTodo',
  data: todoData,
});

useApiStore().getData({
  module: 'todos',
  endpoint: '/test/endpoint?param=1'
});
```

## TODO
* Gestione errori
* Interceptors/Middlewares
* Store per chiamate POST: gestire i parametri