import {ApiRequestConfig, ApiResponse} from "./src/ApiModels";
import {api} from "./src/Api";

export function showReadme() {
  let readmeHtml =  `
    <h1 id="documentazione">Documentazione</h1>
    <p>Centralizza la gestione delle chiamate API nel progetto Vue.js.</p>
    <p>E&#39; possibile configurare le chiamate API, gestire gli endpoint e utilizzare diversi client HTTP come Axios o Fetch.</p>
    <h2 id="configurazione">Configurazione</h2>
    <p>Per iniziare, è necessario installare i pacchetti axios e pinia seguendo le relative documentazioni.
    In seguito bisogna installare il plugin del pacchetto in main.ts (o main.js).</p>
    <pre><code class="language-typescript">import { createApp } from &#39;vue&#39;;
    import App from &#39;./App.vue&#39;;
    import ApiPlugin from &#39;il-tuo-pacchetto&#39;;
    import { moduloDinamico } from &#39;@/modules/moduloDinamico/ModuloDinamico.module&#39;
    import { moduloDinamicoEndpoints } from &#39;@/modules/moduloDinamico/ModuloDinamico.endpoints&#39;
    
    const app = createApp(App);
    
    app.use(ApiPlugin, {
      defaultClient: &#39;axios&#39;,
      defaultEnvironment: &#39;dev&#39;,
      useStore: false,
      apiBaseUrl: { dev: &#39;http://localhost:5173&#39;, test: &#39;http://localhost:5173&#39;, prod: &#39;http://localhost:5173&#39; },
      apiPrefix: { dev: &#39;&#39;, test: &#39;&#39;, prod: &#39;&#39; },
      modules: [{ name: &#39;moduloDinamico&#39;, module: moduloDinamico, endpoints: moduloDinamicoEndpoints }] // facoltativi
    });
    
    app.mount(&#39;#app&#39;);
    </code></pre>
    <h2 id="utilizzo">Utilizzo</h2>
    <p>Una volta installato il plugin, è possibile utilizzare le funzionalità dell&#39;API ovunque nell&#39;applicazione.
    Ecco un esempio di come utilizzare l&#39;API nei componenti Vue:</p>
    <pre><code class="language-typescript">import { inject } from &#39;vue&#39;;
    
    const useApiStore: any = inject(&#39;useApiStore&#39;);
    const api: any = inject(&#39;api&#39;);
    
    const fetchData = async () =&gt; {
      try {
        const response = await api.http.get(&#39;/endpoint&#39;);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    </code></pre>
    <h2 id="modifica-configurazione">Modifica configurazione</h2>
    <p>E&#39; possibile modificare le configurazioni dell&#39;API in questo modo:</p>
    <pre><code class="language-typescript">const api: any = inject(&#39;api&#39;);
    api.setUseStore(true);
    api.setApiPrefix({  //con slash iniziale
      dev: &#39;&#39;, 
      test: &#39;&#39;, 
      prod: &#39;/test-prefix&#39; 
    });
    api.setApiBaseUrl({  //senza slash finale
      dev: &#39;&#39;,
      test: &#39;&#39;,
      prod: &#39;http://localhost:80&#39;
    });
    api.setDefaultClient(&#39;axios&#39;); // axios | fetch
    api.setDefaultEnvironment(&#39;dev&#39;); // dev | test | prod
    </code></pre>
    <h2 id="moduli">Moduli</h2>
    <p>Si possono usare diversi moduli per gestire le funzionalità delle chiamate API.</p>
    <h3 id="http">http</h3>
    <p>Il modulo http fornisce metodi per effettuare chiamate HTTP CRUD.</p>
    <pre><code>* get(endpoint: string, config?: ApiRequestConfig): Promise&lt;T&gt;: Effettua una richiesta HTTP GET.
    * head(endpoint: string, config?: ApiRequestConfig): Promise&lt;T&gt;: Effettua una richiesta HTTP HEAD.
    * post(endpoint: string, config?: ApiRequestConfig): Promise&lt;T&gt;: Effettua una richiesta HTTP POST.
    * patch(endpoint: string, config?: ApiRequestConfig): Promise&lt;T&gt;: Effettua una richiesta HTTP PATCH.
    * put(endpoint: string, config?: ApiRequestConfig): Promise&lt;T&gt;: Effettua una richiesta HTTP PUT.
    * delete(endpoint: string, config?: ApiRequestConfig): Promise&lt;T&gt;: Effettua una richiesta HTTP DELETE.
    </code></pre>
    <h3 id="moduli-dinamici">Moduli Dinamici</h3>
    <p>E&#39; possibile creare ulteriori moduli dinamici e diversificare gli endpoints in base all&#39;ambiente:</p>
    <p>Dopo aver creato un uovo modulo è necessario aggiungerlo in main.ts:</p>
    <pre><code class="language-typescript">app.use(ApiPlugin, {
      defaultClient: &#39;axios&#39;,
      defaultEnvironment: &#39;dev&#39;,
      useStore: false,
      apiBaseUrl: { dev: &#39;http://localhost:5173&#39;, test: &#39;http://localhost:5173&#39;, prod: &#39;http://localhost:5173&#39; },
      apiPrefix: { dev: &#39;&#39;, test: &#39;&#39;, prod: &#39;&#39; },
      modules: [
        { name: &#39;moduloDinamico&#39;, 
          module: moduloDinamico, 
          endpoints: moduloDinamicoEndpoints // facoltativo
        }  // nuovo modulo e endpoints dinamici
        ]
    });
    </code></pre>
    <h3 id="esempio-di-modulo">Esempio di modulo</h3>
    <pre><code class="language-typescript">// /modules/Todos.module.ts
    import { api } from &#39;vApiRequest/src/Api&#39;
    import type { ApiResponse, ApiRequestConfig } from &#39;vApiRequest/src/ApiModels&#39;
    
    export const todos = {
      async getTodo<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
        config.endpoint = \`/${api.getEndpoint("getTodo")}\`;
        config.method = 'GET';
        return await api.request<T>(config);
      },
    };
    </code></pre>
    <pre><code class="language-typescript">// /modules/Todos.endpoints.ts
    import type { Endpoints } from &#39;vApiRequest/src/ApiModels&#39;
    
    export const todosEndpoints: Endpoints = {
      getTodo: {
        dev: &#39;todos/{id}&#39;,
        test: &#39;todos/{id}&#39;,
        prod: &#39;todos/{id}&#39;,
      }
    };
    </code></pre>
    <pre><code class="language-typescript">// esempio con modulo todos
    const api: any = inject(&#39;api&#39;);
    
    let response = await api.todos.getTodo();
    </code></pre>
    <h2 id="store">Store</h2>
    <p>Il pacchetto include uno store per memorizzare i dati delle chiamate API in modo persistente.</p>
    <h3 id="utilizzo-dello-store">Utilizzo dello Store</h3>
    <p>Per utilizzare lo store, si può accedere alle funzionalità utilizzando l&#39;hook useApiStore.</p>
    <pre><code class="language-typescript">const useApiStore: any = inject(&#39;useApiStore&#39;);
    
    useApiStore().setData({
      module: &#39;todos&#39;,
      endpoint: &#39;getTodo&#39;,
      data: todoData,
    });
    
    useApiStore().getData({
      module: &#39;todos&#39;,
      endpoint: &#39;/test/endpoint?param=1&#39;
    });
    </code></pre>
    <h2 id="todo">TODO</h2>
    <ul>
    <li>Gestione errori</li>
    <li>Interceptors/Middlewares</li>
    <li>Store per chiamate POST: gestire i parametri</li>
    </ul>
  `;

  return readmeHtml;
}