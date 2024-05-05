import { courses } from '@/services/modules/courses/Courses.module';
import { http } from '@/services/modules/Http.module';
import { apiEndpoints } from '@/services/ApiEndpoints';
import type { ApiRequestConfig, ApiResponse, Environments } from '@/services/ApiModels';
import { AxiosClient, FetchClient } from '@/services/ApiClients'
import { todos } from './modules/todos/Todos.module';

let defaultClient: string = "axios";
let defaultEnvironment: string = 'dev';
let useStore: boolean = false;
let apiPrefix: Environments = { dev: "", test: "", prod: "" };
let apiBaseUrl: Environments = { dev: "", test: "", prod: "" };

export const api = {
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

  setUseStore(flag: boolean): void {
    useStore = flag;
  },

  getEndpoint(name: string | void): string | void {
    if (name && name in apiEndpoints && this.getDefaultEnvironment() in apiEndpoints[name]) {
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
        return await AxiosClient<T>(config);
      }
    } catch (error: any) {
      throw new Error(`Errore nella richiesta API: ${error}`);
    }
  },

  // Aggiungo i moduli all'oggetto api
  courses,
  todos,
  http

};
