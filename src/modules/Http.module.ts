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
    async get<T>(endpoint: string, config: ApiRequestConfig = { endpoint: '' } as ApiRequestConfig): Promise<T> {
        config.method = 'GET';
        setConfig(endpoint, config);
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
    //   setConfig(endpoint, config);
    //   config.method = 'HEAD';
    //   return await api.request<T>(config);
    // },
    async head<T>(endpoint: string, config: ApiRequestConfig = { endpoint: '' } as ApiRequestConfig): Promise<T> {
        config.method = 'HEAD';
        config.module = 'http';
        setConfig(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP POST.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async post<T>(endpoint: string, config: ApiRequestConfig = { endpoint: '' } as ApiRequestConfig): Promise<T> {
        config.method = 'POST';
        setConfig(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP PUT.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async put<T>(endpoint: string, config: ApiRequestConfig = { endpoint: '' } as ApiRequestConfig): Promise<T> {
        config.method = 'PUT';
        setConfig(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP PATCH.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async patch<T>(endpoint: string, config: ApiRequestConfig = { endpoint: '' } as ApiRequestConfig): Promise<T> {
        config.method = 'PATCH';
        setConfig(endpoint, config);
        return await api.request<T>(config);
    },

    /**
     * Effettua una richiesta HTTP DELETE.
     * @param endpoint Endpoint della richiesta.
     * @param config Configurazione della richiesta.
     * @returns Promise con il risultato della richiesta.
     */
    async delete<T>(endpoint: string, config: ApiRequestConfig = { endpoint: '' } as ApiRequestConfig): Promise<T> {
        config.method = 'DELETE';
        setConfig(endpoint, config);
        return await api.request<T>(config);
    },

};

/**
 * Imposta l'endpoint nella configurazione della richiesta.
 * Assicura che l'endpoint non sia vuoto e che inizi sempre con uno slash.
 * @param endpoint Endpoint della richiesta.
 * @param config Configurazione della richiesta.
 * @returns Configurazione della richiesta aggiornata.
 */
function setConfig(endpoint: string, config: ApiRequestConfig): ApiRequestConfig {
    config.endpoint = endpoint.trim() !== '' ? endpoint : config.endpoint || '';
    config.endpoint = config.endpoint.startsWith('/') ? config.endpoint : `/${config.endpoint}`
    config.module = 'http';
    return config;
}