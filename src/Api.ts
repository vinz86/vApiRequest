import {http} from './modules/Http.module'
import type {ApiObject, ApiRequestConfig, ApiResponse, Endpoint, Environments} from './ApiModels'
import {AxiosClient} from "./clients/AxiosClient";
import {FetchClient} from "./clients/FetchClient";
import {XHRClient} from "./clients/XHRClient";
import {replacePathParams} from "./ApiUtils";

let defaultClient: string = 'axios'
let defaultEnvironment: string = 'dev'
let useStore: boolean = false
let apiPrefix: Environments = {dev: '', test: '', prod: ''}
let apiBaseUrl: Environments = {dev: '', test: '', prod: ''}
let apiEndpoints: Endpoint | null = null
let tokenKey: string = "token"
let autType: string = "jwt";

export const api: ApiObject = {

    // defaultClient
    setDefaultClient(client: string): void {
        defaultClient = client
    },
    getDefaultClient(): string {
        return defaultClient
    },

    // authType
    setAuthType(type: string): void {
        autType = type
    },
    getAuthType(): string {
        return autType
    },

    // tokenKey
    setTokenKey(key: string): void {
        tokenKey = key
    },
    getTokenKey(): string {
        return tokenKey
    },

    // Token
    getToken(): string {
        return localStorage.getItem(tokenKey) || ""
    },
    setToken(token: string): void {
        localStorage.setItem(tokenKey, token)
    },

    // defaultEnvironment
    setDefaultEnvironment(environment: string): void {
        defaultEnvironment = environment
    },
    getDefaultEnvironment(): string {
        return defaultEnvironment
    },

    // apiBaseUrl
    setApiBaseUrl(baseUrl: Environments): void {
        apiBaseUrl = baseUrl
    },
    getApiBaseUrl(): Environments {
        return apiBaseUrl
    },

    getCurrentEnvUrl(): string {
        if (defaultEnvironment in this.getApiBaseUrl()) {
            return apiBaseUrl[defaultEnvironment as keyof Environments]
        } else {
            return ''
        }
    },

    setApiPrefix(prefix: Environments): void {
        apiPrefix = prefix
    },

    getCurrentEnvPrefix(): string {
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
            const {pathParams = null} = config;
            let {endpoint} = config;

            // Sostituisco i parametri nell'endpoint
            if (pathParams) {
                endpoint = replacePathParams(pathParams, endpoint)
            }
            config.endpoint = `${this.getCurrentEnvUrl()}${this.getCurrentEnvPrefix()}${endpoint}`;

            // Verifico se la richiesta deve essere autenticata
            if (this.getToken() !== '' && config.authenticate) {
                if (!config.headers) {
                    config.headers = {};
                }
                let tokenString: string = "";
                if (this.getAuthType() === 'basic') {
                    tokenString = `Basic ${this.getToken()}`
                } else if (this.getAuthType() === 'jwt') {
                    tokenString = `Bearer ${this.getToken()}`
                }
                config.headers.Authorization = tokenString;
            } else if (this.getToken() === '' && config.authenticate) {
                throw new Error('Token non definito');
            }

            // Effettuo la richiesta con il client selezionato
            if (this.getDefaultClient() === 'axios') {
                return await AxiosClient<T>(config)
            } else if (this.getDefaultClient() === 'fetch') {
                return await FetchClient<T>(config)
            } else if (this.getDefaultClient() === 'xhr') {
                return await XHRClient<T>(config)
            } else {
                return await FetchClient<T>(config)
            }
        } catch (error: any) {
            let apiErrorMessage: string = "";
            let apiErrorStatus: number | boolean = this.getDefaultClient() === "axios" ? error.response.status : error.status || false; // axios | FetchClient.ts |false
            // richiesta effettuata,il server ha risposto con un errore
            if (apiErrorStatus) {
                if (apiErrorStatus === 400) {
                    apiErrorMessage = 'Bad Request'
                } else if (apiErrorStatus === 401) {
                    apiErrorMessage = "Unauthorized"
                } else if (apiErrorStatus === 403) {
                    apiErrorMessage = 'Forbidden'
                } else if (apiErrorStatus === 404) {
                    apiErrorMessage = 'Not Found'
                } else if (apiErrorStatus === 422) {
                    apiErrorMessage = 'Unprocessable Entity'
                } else if (apiErrorStatus === 500) {
                    apiErrorMessage = 'Internal Server Error'
                } else if (apiErrorStatus === 502) {
                    apiErrorMessage = 'Bad Gateway'
                } else if (apiErrorStatus === 503) {
                    apiErrorMessage = 'Service Unavailable'
                } else {
                    apiErrorMessage = 'Generic error'
                }
            }
            // richiesta effettuata, nessuna risposta
            else if (error.request) {
                apiErrorMessage = 'No response'
            } else {
                apiErrorMessage = 'Request error'
            }

            console.error(`Errore api: ${(apiErrorStatus && apiErrorStatus)} ${apiErrorMessage}`)

            throw error
        }
    },

    // includo solo il modulo http, gli altri moduli verranno aggiunti tramite il plugin in modo dinamico
    http
}