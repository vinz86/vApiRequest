import { http } from './modules/Http.module';
import type { ApiObject, ApiRequestConfig, ApiResponse, Endpoint, Environments } from './ApiModels'
import { AxiosClient, FetchClient } from './ApiClients';

let defaultClient: string = "axios";
let defaultEnvironment: string = 'dev';
let useStore: boolean = false;
let apiPrefix: Environments = { dev: "", test: "", prod: "" };
let apiBaseUrl: Environments = { dev: "", test: "", prod: "" };
let apiEndpoints: Endpoint|null = null;

export const api: ApiObject = {
  setDefaultClient(client: string): void {
    defaultClient = client;
  },

  getDefaultClient(): string {
    return defaultClient;
  },

  setDefaultEnvironment(environment: string): void {
    defaultEnvironment = environment;
  },

  getDefaultEnvironment(): string {
    return defaultEnvironment;
  },

  setApiBaseUrl(baseUrl: Environments): void {
    apiBaseUrl = baseUrl;
  },

  getApiBaseUrl(): Environments {
    return apiBaseUrl;
  },

  getCurrentApiBaseUrl(): string {
    if (defaultEnvironment in this.getApiBaseUrl()) {
      return apiBaseUrl[defaultEnvironment as keyof Environments];
    } else {
      return '';
    }
  },

  setApiPrefix(prefix: Environments): void {
    apiPrefix = prefix;
  },

  getCurrentApiPrefix(): string {
    if (this.getDefaultEnvironment() in this.getApiPrefix()) {
      return apiPrefix[defaultEnvironment as keyof Environments];
    } else {
      return '';
    }
  },

  getApiPrefix(): Environments {
    return apiPrefix;
  },

  getUseStore(): boolean {
    return useStore;
  },

  setUseStore(flag: boolean): void {
    useStore = flag;
  },

  getEndpoints(): Endpoint {
    return <Endpoint>apiEndpoints;
  },

  setEndpoints(endpoints: any): void {
    apiEndpoints = endpoints;
  },

  getEndpoint(name: string | void): string | void {
    if (name && apiEndpoints && name in apiEndpoints && this.getDefaultEnvironment() in apiEndpoints[name]) {
      return apiEndpoints[name][this.getDefaultEnvironment() as keyof Environments];
    } else {
      throw new Error('Endpoint non valido o non definito');
    }
  },

  getUrlParams (params: {}){
    if (params && Object.keys(params).length > 0) {
      return `?${new URLSearchParams(params).toString()}`;
    }
  },

  async request<T>(config: ApiRequestConfig): Promise<ApiResponse<T>|any> {
    try {
      if (this.getDefaultClient() === "axios") {
        return await AxiosClient<T>(config);
      } else if (this.getDefaultClient() === "fetch") {
        return await FetchClient<T>(config);
      } else {
        return await FetchClient<T>(config);
      }
    } catch (error: any) {
      // La richiesta è stata effettuata ma il server ha risposto con uno status di errore
      if (error.response) {
        console.error('Errore nella richiesta API:', error.response.status);

        if (error.response.status === 404) {
          console.error('Risorsa non trovata');
        } else if (error.response.status === 500) {
          console.error('Errore interno del server');
        } else {
          // Aggiungere ulteriori else if per gestire altri status
        }
      }
      // La richiesta è stata effettuata ma non c'è stata risposta dal server
      else if (error.request) {
        console.error('Nessuna risposta dal server:', error.request);
      } else {
        console.error('Errore durante la preparazione della richiesta:', error.message);
      }
      throw error;
    }
  },

  // includo solo il modulo http, gli altri moduli verranno aggiunti tramite il plugin in modo dinamico
  http
};