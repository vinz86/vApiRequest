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

/* Interfaccia per definire gli endpoint. */
export interface Endpoint {
    [key: string]: { [key: string]: string };
}

// modello per lo store
export interface ApiStoreState {
    data: Record<string, Record<string, unknown>>;
}

/**
 * Interfaccia per le opzioni del plugin API.
 */
export interface ApiPluginOptions {
    defaultClient: 'axios' | 'fetch'; // client HTTP predefinito
    defaultEnvironment: 'dev' | 'test' | 'prod'; // Ambiente predefinito
    useStore: boolean; // utilizza lo store per memorizzare i dati delle chiamate
    apiBaseUrl: Environments; // baseUrl diviso per ambiente
    apiPrefix: Environments; // prefisso url baseUrl diviso per ambiente
    modules?: Array<any>; // Array di moduli aggiuntivi
    token?: string; // Token di autenticazione
    tokenKey?: string; // chiave local storage per il token
    authType?: string; // Tipo di autenticazione (es. JWT, Basic)
}

/**
 * Interfaccia modulo API.
 */
export interface ApiModule {
    name: string; // Nome del modulo
    module: any; // Oggetto del modulo API
    endpoints: Record<string, any>; // Endpoint del modulo
}

/* Interfaccia moduli dinamici */
export interface DynamicModules {
    [moduleName: string]: any;
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
