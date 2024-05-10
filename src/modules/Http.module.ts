import { api } from '../Api'
import type {ApiRequestConfig} from '../ApiModels';

// Client http CRUD
export const http = {

  // GET
  async get<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    config = !config ? { endpoint: endpoint,  method: "GET" } as ApiRequestConfig : config;
    setEndpoint(endpoint, config);
    config.method = 'GET';
    return await api.request<T>(config);
  },

  // HEAD
  async head<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    config = !config ? { endpoint: "",  method: "HEAD" } as ApiRequestConfig : config;
    setEndpoint(endpoint, config);
    config.method = 'HEAD';
    return await api.request<T>(config);
  },

  // POST
  async post<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    config = !config ? { endpoint: "",  method: "POST" } as ApiRequestConfig : config;
    setEndpoint(endpoint, config);
    config.method = 'POST';
    return await api.request<T>(config);
  },

  // PUT
  async put<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    config = !config ? { endpoint: "",  method: "PUT" } as ApiRequestConfig : config;
    setEndpoint(endpoint, config);
    config.method = 'PUT';
    return await api.request<T>(config);
  },

  // PATCH
  async patch<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    config = !config ? { endpoint: "",  method: "PATCH" } as ApiRequestConfig : config;
    setEndpoint(endpoint, config);
    config.method = 'PATCH';
    return await api.request<T>(config);
  },

  // DELETE
  async delete<T>(endpoint: string, config: ApiRequestConfig): Promise<T> {
    config = !config ? { endpoint: "",  method: "DELETE" } as ApiRequestConfig : config;
    setEndpoint(endpoint, config);
    config.method = 'DELETE';
    return await api.request<T>(config);
  },

};

/* Funzioni di supporto */

  // Imposta endpoint
  function setEndpoint(endpoint: string, config: ApiRequestConfig): ApiRequestConfig {
      config.endpoint = endpoint.trim() !== '' ? endpoint : config.endpoint;
      config.endpoint = config.endpoint.startsWith('/') ? config.endpoint : `/${config.endpoint}`
      return config;
  }


