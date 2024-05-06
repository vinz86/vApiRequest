import {api} from '../Api'
import type {HttpModuleRequestConfig} from '../ApiModels';

// Client http CRUD
export const http = {

    // GET
    async get<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
        try {
            const {
                queryParams = {},
                pathParams = {},
                headers = {},
                module = 'http',
                responseType = undefined,
                responseEncoding = undefined
            } = config;
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
        } catch (error) {
            throw error;
        }
    },


    // HEAD
    async head<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
        try {
            const {
                queryParams = {},
                pathParams = {},
                headers = {},
                module = 'http',
                responseType = undefined,
                responseEncoding = undefined
            } = config;
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
        } catch (error) {
            throw error;
        }
    },

    // POST
    async post<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
        try {
            const {
                data = {},
                pathParams = {},
                headers = {},
                module = 'http',
                responseType = undefined,
                responseEncoding = undefined
            } = config;
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
        } catch (error) {
            throw error;
        }
    },

    // PATCH
    async patch<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
        try {
            const {
                data = {},
                pathParams = {},
                headers = {},
                module = 'http',
                responseType = undefined,
                responseEncoding = undefined
            } = config;
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
        } catch (error) {
            throw error;
        }
    },

    // PUT
    async put<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
        try {
            const {
                data = {},
                pathParams = {},
                headers = {},
                module = 'http',
                responseType = undefined,
                responseEncoding = undefined
            } = config;
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
        } catch (error) {
            throw error;
        }
    },

    // DELETE
    async delete<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<T> {
        try {
            const {
                headers = {},
                pathParams = {},
                module = 'http',
                responseType = undefined,
                responseEncoding = undefined
            } = config;
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
        } catch (error) {
            throw error;
        }
    }
};
