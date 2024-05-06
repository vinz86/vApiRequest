import { http } from './modules/Http.module'
import type { ApiObject, ApiRequestConfig, ApiResponse, Endpoint, Environments } from './ApiModels'
import { AxiosClient, FetchClient } from './ApiClients'

let defaultClient: string = 'axios'
let defaultEnvironment: string = 'dev'
let useStore: boolean = false
let apiPrefix: Environments = { dev: '', test: '', prod: '' }
let apiBaseUrl: Environments = { dev: '', test: '', prod: '' }
let apiEndpoints: Endpoint | null = null

enum HttpStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export const api: ApiObject = {
  setDefaultClient(client: string): void {
    defaultClient = client
  },

  getDefaultClient(): string {
    return defaultClient
  },

  setDefaultEnvironment(environment: string): void {
    defaultEnvironment = environment
  },

  getDefaultEnvironment(): string {
    return defaultEnvironment
  },

  setApiBaseUrl(baseUrl: Environments): void {
    apiBaseUrl = baseUrl
  },

  getApiBaseUrl(): Environments {
    return apiBaseUrl
  },

  getCurrentApiBaseUrl(): string {
    if (defaultEnvironment in this.getApiBaseUrl()) {
      return apiBaseUrl[defaultEnvironment as keyof Environments]
    } else {
      return ''
    }
  },

  setApiPrefix(prefix: Environments): void {
    apiPrefix = prefix
  },

  getCurrentApiPrefix(): string {
    if (this.getDefaultEnvironment() in this.getApiPrefix()) {
      return apiPrefix[defaultEnvironment as keyof Environments]
    } else {
      return ''
    }
  },

  getApiPrefix(): Environments {
    return apiPrefix
  },

  getUseStore(): boolean {
    return useStore
  },

  setUseStore(flag: boolean): void {
    useStore = flag
  },

  getEndpoints(): Endpoint {
    return <Endpoint>apiEndpoints
  },

  setEndpoints(endpoints: any): void {
    apiEndpoints = endpoints
  },

  getEndpoint(name: string | void): string | void {
    if (name && apiEndpoints && name in apiEndpoints && this.getDefaultEnvironment() in apiEndpoints[name]) {
      return apiEndpoints[name][this.getDefaultEnvironment() as keyof Environments]
    } else {
      throw new Error('Endpoint non valido o non definito')
    }
  },

  getUrlParams(params: {}) {
    if (params && Object.keys(params).length > 0) {
      return `?${new URLSearchParams(params).toString()}`
    }
  },

  async request<T>(config: ApiRequestConfig): Promise<ApiResponse<T> | any> {
    try {
      if (this.getDefaultClient() === 'axios') {
        return await AxiosClient<T>(config)
      } else if (this.getDefaultClient() === 'fetch') {
        return await FetchClient<T>(config)
      } else {
        return await FetchClient<T>(config)
      }
    } catch (error: any) {
      debugger
      if (error.response && error.response.status) {
        let errorMessage: string;
        switch (error.response.status) {
          case HttpStatus.BadRequest:
            errorMessage =  'Bad Request'; break;
          case HttpStatus.Unauthorized:
            errorMessage = 'Unauthorized'; break;
          case HttpStatus.Forbidden:
            errorMessage = 'Forbidden'; break;
          case HttpStatus.NotFound:
            errorMessage = 'Not Found'; break;
          case HttpStatus.UnprocessableEntity:
            errorMessage = 'Unprocessable Entity'; break;
          case HttpStatus.InternalServerError:
            errorMessage = 'Internal Server Error'; break;
          case HttpStatus.BadGateway:
            errorMessage = 'Bad Gateway'; break;
          case HttpStatus.ServiceUnavailable:
            errorMessage = 'Service Unavailable'; break;
          default:
            errorMessage = 'Server Error'; break;
        }
        console.error("Api Error:", errorMessage);
      }
      //throw error
    }
  },

  // includo solo il modulo http, gli altri moduli verranno aggiunti tramite il plugin in modo dinamico
  http
}