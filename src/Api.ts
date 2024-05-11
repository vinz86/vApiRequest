/**
 * Modulo principale per la gestione delle chiamate ai servizi.
 */
import type {ApiObject, ApiRequestConfig, ApiResponse, Endpoint, Environments} from './ApiModels';
import {AxiosClient} from "./clients/AxiosClient";
import {FetchClient} from "./clients/FetchClient";
import {XHRClient} from "./clients/XHRClient";
import {replacePathParams} from "./ApiUtils";
import {http} from './modules/Http.module';

/* Variabili di configurazione predefinite per l'API. */
let defaultClient: string = 'axios';
let defaultEnvironment: string = 'dev';
let useStore: boolean = false;
let apiPrefix: Environments = {dev: '', test: '', prod: ''};
let apiBaseUrl: Environments = {dev: '', test: '', prod: ''};
let apiEndpoints: Endpoint | null = null;
let tokenKey: string = "token";
let autType: string = "jwt";

/**
 * Oggetto API con metodi per la configurazione e l'invio delle richieste.
 */
export const api: ApiObject = {

    /**
     * Imposta il client HTTP
     * @param client client HTTP: axios | fetch | xhr.
     */
    setDefaultClient(client: string): void {
        defaultClient = client;
    },

    /**
     * Restituisce il client HTTP
     * @returns Client HTTP
     */
    getDefaultClient(): string {
        return defaultClient;
    },

    /**
     * Imposta il tipo di autenticazione
     * @param type Tipo di autenticazione
     */
    setAuthType(type: string): void {
        autType = type;
    },

    /**
     * Restituisce il tipo di autenticazione
     * @returns Tipo di autenticazione
     */
    getAuthType(): string {
        return autType;
    },

    /**
     * Imposta la chiave del local storage per il token.
     * @param key Chiave del local storage
     */
    setTokenKey(key: string): void {
        tokenKey = key;
    },

    /**
     * Restituisce la chiave del local storage per il token.
     * @returns Chiave del local storage per il token
     */
    getTokenKey(): string {
        return tokenKey;
    },

    /**
     * Restituisce il token salvato nel local storage
     * @returns Token salvato nel local storage
     */
    getToken(): string {
        return localStorage.getItem(tokenKey) || "";
    },

    /**
     * Salva il token nel local storage
     * @param token Token da salvare.
     */
    setToken(token: string): void {
        localStorage.setItem(tokenKey, token);
    },

    /**
     * Imposta l'ambiente per le richieste
     * @param environment Ambiente da impostare.
     */
    setDefaultEnvironment(environment: string): void {
        defaultEnvironment = environment;
    },

    /**
     * Restituisce l'ambiente per le richieste
     * @returns Ambiente predefinito per le richieste
     */
    getDefaultEnvironment(): string {
        return defaultEnvironment;
    },

    /**
     * Imposta il baseURL per le richieste API in base all'ambiente.
     * @param baseUrl baseURL da impostare.
     */
    setApiBaseUrl(baseUrl: Environments): void {
        apiBaseUrl = baseUrl;
    },

    /**
     * Restituisce baseURL per le richieste API in base all'ambiente.
     * @returns baseURL per le richieste API in base all'ambiente.
     */
    getApiBaseUrl(): Environments {
        return apiBaseUrl;
    },

    /**
     * Restituisce baseURL corrente per le richieste API.
     * @returns baseURL corrente per le richieste API.
     */
    getCurrentEnvUrl(): string {
        if (defaultEnvironment && (defaultEnvironment in this.getApiBaseUrl())) {
            return apiBaseUrl[defaultEnvironment as keyof Environments];
        } else {
            return '';
        }
    },

    /**
     * Imposta il prefisso dell'API per gli endpoint in base all'ambiente.
     * @param prefix Prefisso dell'API da impostare.
     */
    setApiPrefix(prefix: Environments): void {
        apiPrefix = prefix;
    },

    /**
     * Restituisce i prefissi dell'API per gli endpoint
     * @returns I prefissi dell'API per gli endpoint
     */
    getApiPrefix(): Environments {
        return apiPrefix;
    },

    /**
     * Restituisce il prefisso dell'API corrente per gli endpoint in base all'ambiente
     * @returns Prefisso dell'API corrente per gli endpoint in base all'ambiente
     */
    getCurrentEnvPrefix(): string {
        if (this.getDefaultEnvironment() in this.getApiPrefix()) {
            return apiPrefix[defaultEnvironment as keyof Environments];
        } else {
            return '';
        }
    },

    /**
     * Restituisce il flag che indica se utilizzare lo store per memorizzare i dati delle chiamate
     * @returns True se lo store è abilitato, altrimenti false.
     */
    getUseStore(): boolean {
        return useStore;
    },

    /**
     * Imposta il flag che indica se utilizzare lo store per memorizzare i dati delle chiamate api
     * @param flag Flag da impostare.
     */
    setUseStore(flag: boolean): void {
        useStore = flag;
    },

    /**
     * Restituisce tutti gli endpoint API configurati
     * @returns Gli endpoint API configurati
     */
    getEndpoints(): Endpoint {
        return <Endpoint>apiEndpoints;
    },

    /**
     * Imposta gli endpoint API
     * @param endpoints Endpoint API da impostare.
     */
    setEndpoints(endpoints: any): void {
        apiEndpoints = endpoints;
    },

    /**
     * Restituisce l'endpoint API corrispondente al nome specificato.
     * @param name Nome dell'endpoint.
     * @returns L'endpoint API corrispondente al nome specificato.
     * @throws Eccezione se l'endpoint non è valido o non è definito.
     */
    getEndpoint(name: string | void): string | void {
        if (name && apiEndpoints && name in apiEndpoints && this.getDefaultEnvironment() in apiEndpoints[name]) {
            return apiEndpoints[name][this.getDefaultEnvironment() as keyof Environments];
        } else {
            throw new Error('Endpoint non valido o non definito');
        }
    },

    /**
     * Restituisce i parametri dell'URL formattati come stringa.
     * @param params Parametri dell'URL.
     * @returns I parametri dell'URL formattati come stringa.
     */
    getUrlParams(params: {}): string {
        if (params && Object.keys(params).length > 0) {
            return `?${new URLSearchParams(params).toString()}`;
        } else return "";
    },

    /**
     * Calcola l'url completo del servizio chiamato.
     *
     * N:B. Può essere usato per recuperare lo store, es:
     * useApiStore().getData({
     *       module: 'http',
     *       endpoint: api.getRequestUrl('/posts', reqConfig.queryParams),
     *       bodyParams: reqConfig.data
     *     });
     * @param endpoint endpoint (senza baseurl) es. /testEndpoint
     * @param queryParams Oggetto con i parametri dell'url es {id:0, name:"Mario}
     * @returns Stringa con url completo del servizio chiamato
     */
    getRequestUrl(endpoint: string, queryParams: any): string {
        queryParams = queryParams || {};
        return this.getCurrentEnvUrl() +
            this.getCurrentEnvPrefix() +
            endpoint +
            this.getUrlParams(queryParams);
    },

    /**
     * Invia una richiesta HTTP.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async request<T>(config: ApiRequestConfig): Promise<ApiResponse<T> | any> {
        let errors = [];
        try {
            // Gestione della sostituzione dei parametri nell'endpoint
            const {pathParams = null} = config;
            let {endpoint} = config;
            if (pathParams) {
                endpoint = replacePathParams(pathParams, endpoint);
            }
            config.endpoint = `${this.getCurrentEnvUrl()}${this.getCurrentEnvPrefix()}${endpoint}`;

            // Gestione dell'autenticazione
            if (this.getToken() !== '' && config.authenticate) {
                if (!config.headers) {
                    config.headers = {};
                }
                let tokenString: string = "";
                if (this.getAuthType() === 'basic') {
                    tokenString = `Basic ${this.getToken()}`;
                } else if (this.getAuthType() === 'jwt') {
                    tokenString = `Bearer ${this.getToken()}`;
                }
                config.headers.Authorization = tokenString;
            } else if (this.getToken() === '') {
                if (config.authenticate) {
                    errors.push('Token non definito');
                }
            }

            // Invio della richiesta con il client selezionato
            if (this.getDefaultClient() === 'axios') {
                return await AxiosClient<T>(config);
            } else if (this.getDefaultClient() === 'fetch') {
                return await FetchClient<T>(config);
            } else if (this.getDefaultClient() === 'xhr') {
                return await XHRClient<T>(config);
            } else {
                return await FetchClient<T>(config);
            }
        } catch (error: any) {
            // Gestione degli errori di richiesta
            let apiErrorMessage: string = "";
            let apiErrorStatus: number | boolean = this.getDefaultClient() === "axios" ? error.response.status : error.status || false;

            // Controllo se si sono verificati degli errori durante la preparazione della richiesta
            if (errors.length > 0) {
                apiErrorMessage = 'Token non valido';
                console.error(`Errore API: ${apiErrorMessage}`);

                throw error;
            }

            if (apiErrorStatus) {
                if (apiErrorStatus === 400) {
                    apiErrorMessage = 'Bad Request';
                } else if (apiErrorStatus === 401) {
                    apiErrorMessage = "Unauthorized";
                } else if (apiErrorStatus === 403) {
                    apiErrorMessage = 'Forbidden';
                } else if (apiErrorStatus === 404) {
                    apiErrorMessage = 'Not Found';
                } else if (apiErrorStatus === 422) {
                    apiErrorMessage = 'Unprocessable Entity';
                } else if (apiErrorStatus === 500) {
                    apiErrorMessage = 'Internal Server Error';
                } else if (apiErrorStatus === 502) {
                    apiErrorMessage = 'Bad Gateway';
                } else if (apiErrorStatus === 503) {
                    apiErrorMessage = 'Service Unavailable';
                } else {
                    apiErrorMessage = 'Generic error';
                }
            } else if (error.request) {
                apiErrorMessage = 'No response';
            } else {
                apiErrorMessage = 'Request error';
            }

            console.error(`Errore API: ${(apiErrorStatus && apiErrorStatus)} ${apiErrorMessage}`);

            throw error;
        }
    },

    /**
     * Includo il modulo HTTP per effettuare richieste CRUD, gli altri vengono aggiunti dinamicamente
     */
    http
};
