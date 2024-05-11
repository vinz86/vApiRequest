/* Interfaccia per configurazione richiesta API */
export interface ApiRequestConfig {
    endpoint: string;
    method: 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
    data?: any;
    headers?: any;
    queryParams?: {};
    pathParams?: {};
    module?: string;
    responseType?: string;
    responseEncoding?: string;
    authenticate?: false;
    action: string;
}

/* Interfaccia per risposta richiesta API */
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: ApiRequestConfig;
}

/* Interfaccia per ambienti di sviluppo */
export interface Environments {
    dev?: string;
    test?: string;
    prod: any;
}

/* Interfaccia moduli dinamici */
export interface DynamicModules {
    [moduleName: string]: any;
}

/* Interfaccia per definire gli endpoint. */
export interface Endpoint {
    [key: string]: { [key: string]: string };
}

/* Oggetto che estende i moduli dinamici e fornisce metodi per gestire le chiamate API. */
export interface ApiObject extends DynamicModules {
    setDefaultClient(client: string): void;

    getDefaultClient(): string;

    setDefaultEnvironment(environment: string): void;

    getDefaultEnvironment(): string;

    setApiBaseUrl(baseUrl: Environments): void;

    getApiBaseUrl(): Environments;

    getCurrentEnvUrl(): string;

    setApiPrefix(prefix: Environments): void;

    getCurrentEnvPrefix(): string;

    getApiPrefix(): Environments;

    setUseStore(flag: boolean): void;

    getEndpoint(name: string | void): string | void;

    getUrlParams(params: {}): string | undefined;

    getTokenKey(): string;

    setTokenKey(key: string): void;

    getToken(): string;

    setToken(token: string): void;

    setAuthType(authType: string): void;

    getRequestUrl(endpoint: string, queryParams: object): string;

    request<T>(config: ApiRequestConfig): Promise<ApiResponse<T> | any>;
}
