import { api } from '@/services/Api';
import type { HttpModuleRequestConfig } from '@/services/ApiModels';

// Client http CRUD
export const http = {

  // GET
  async get<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
    const { queryParams = {}, pathParams = {}, headers = {}, module = 'http', responseType = undefined, responseEncoding = undefined } = config;
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return await api.request<T>({
      endpoint: `${endpoint}`,
      method: 'GET',
      queryParams: queryParams,
      pathParams: pathParams,
      headers: headers,
      module: module,
      responseType: responseType,
      responseEncoding: responseEncoding
    });
  },

  // HEAD
  async head<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
    const { queryParams = {}, pathParams = {}, headers = {}, module = 'http', responseType = undefined, responseEncoding = undefined } = config;
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return await api.request<T>({
      endpoint: `${endpoint}`,
      method: 'HEAD',
      queryParams: queryParams,
      pathParams: pathParams,
      headers: headers,
      module: module,
      responseType: responseType,
      responseEncoding: responseEncoding
    });
  },

  // POST
  async post<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
    const { data = {}, pathParams = {}, headers = {}, module = 'http', responseType = undefined, responseEncoding = undefined } = config;
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return await api.request<T>({
      endpoint: `${endpoint}`,
      method: 'POST',
      data: data,
      pathParams: pathParams,
      headers: headers,
      module: module,
      responseType: responseType,
      responseEncoding: responseEncoding
    });
  },

  // PATCH
  async patch<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
    const { data = {}, pathParams = {}, headers = {}, module = 'http', responseType = undefined, responseEncoding = undefined } = config;
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return await api.request<T>({
      endpoint: `${endpoint}`,
      method: 'PATCH',
      data: data,
      pathParams: pathParams,
      headers: headers,
      module: module,
      responseType: responseType,
      responseEncoding: responseEncoding
    });
  },

  // PUT
  async put<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
    const { data = {}, pathParams = {}, headers = {}, module = 'http', responseType = undefined, responseEncoding = undefined } = config;
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return await api.request<T>({
      endpoint: `${endpoint}`,
      method: 'PUT',
      data: data,
      pathParams: pathParams,
      headers: headers,
      module: module,
      responseType: responseType,
      responseEncoding: responseEncoding
    });
  },

  // DELETE
  async delete<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
    const { headers = {}, pathParams = {}, module = 'http', responseType = undefined, responseEncoding = undefined } = config;
    endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return await api.request<T>({
      endpoint: `${endpoint}`,
      method: 'DELETE',
      pathParams: pathParams,
      headers: headers,
      module: module,
      responseType: responseType,
      responseEncoding: responseEncoding
    });
  }
};
