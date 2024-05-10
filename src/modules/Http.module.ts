import {api} from '../Api'
import type {ApiRequestConfig} from '../ApiModels';

/**
 * Modulo per effettuare chiamate HTTP CRUD.
 */
export const http = {
    /**
     * Effettua una richiesta HTTP GET.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async get<T>(endpoint: string, config: ApiRequestConfig = {
        endpoint: '',
        method: 'GET'
    } as ApiRequestConfig): Promise<T> {
        setEndpoint(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP HEAD.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    // async head<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    //   config = !config ? { endpoint: endpoint  } as ApiRequestConfig : config;
    //   setEndpoint(endpoint, config);
    //   config.method = 'HEAD';
    //   return await api.request<T>(config);
    // },
    async head<T>(endpoint: string, config: ApiRequestConfig = {
        endpoint: '',
        method: 'HEAD'
    } as ApiRequestConfig): Promise<T> {
        setEndpoint(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP POST.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async post<T>(endpoint: string, config: ApiRequestConfig = {
        endpoint: '',
        method: 'POST'
    } as ApiRequestConfig): Promise<T> {
        setEndpoint(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP PUT.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async put<T>(endpoint: string, config: ApiRequestConfig = {
        endpoint: '',
        method: 'PUT'
    } as ApiRequestConfig): Promise<T> {
        setEndpoint(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP PATCH.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async patch<T>(endpoint: string, config: ApiRequestConfig = {
        endpoint: '',
        method: 'PATCH'
    } as ApiRequestConfig): Promise<T> {
        setEndpoint(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP DELETE.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async delete<T>(endpoint: string, config: ApiRequestConfig = {
        endpoint: '',
        method: 'DELETE'
    } as ApiRequestConfig): Promise<T> {
        setEndpoint(endpoint, config);
        return await api.request<T>(config);
    },

};

/* Funzioni di supporto */


/**
 * Imposta l'endpoint nella configurazione della richiesta.
 * Assicura che l'endpoint non sia vuoto e che inizi sempre con uno slash.
 * @param endpoint Endpoint della richiesta.
 * @param config Configurazione della richiesta.
 * @returns Configurazione della richiesta aggiornata.
 */
function setEndpoint(endpoint: string, config: ApiRequestConfig): ApiRequestConfig {
    config.endpoint = endpoint.trim() !== '' ? endpoint : config.endpoint || '';
    config.endpoint = config.endpoint.startsWith('/') ? config.endpoint : `/${config.endpoint}`
    return config;
}