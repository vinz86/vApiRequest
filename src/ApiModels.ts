export interface Endpoint {
  [key: string]: { [key: string]: string };
}

// Interfaccia per i parametri delle chiamate API
export interface ApiRequestConfig {
  endpoint: string;
  method: 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: any;
  headers?: any;
  module?: string;
  queryParams?: {};
  pathParams?: {};
  responseType?: string;
  responseEncoding?: string;
}

// Definizione di ApiResponse generico
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: ApiRequestConfig;
}

// Interfaccia per i moduli
export interface HttpModuleRequestConfig {
  method?: 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: any;
  queryParams?: {};
  pathParams?: {};
  headers?: {};
  module?: string; // per salvare nello store
  responseType?: string;
  responseEncoding?: string;
}

export interface Environments {
  dev?: string;
  test?: string;
  prod: any;
}

export interface DynamicModules {
  [moduleName: string]: any;
}

export interface ApiObject extends DynamicModules {
  setDefaultClient(client: string): void;
  getDefaultClient(): string;
  setDefaultEnvironment(environment: string): void;
  getDefaultEnvironment(): string;
  setApiBaseUrl(baseUrl: Environments): void;
  getApiBaseUrl(): Environments;
  getCurrentApiBaseUrl(): string;
  setApiPrefix(prefix: Environments): void;
  getCurrentApiPrefix(): string;
  getApiPrefix(): Environments;
  setUseStore(flag: boolean): void;
  getEndpoint(name: string | void): string | void;
  getUrlParams(params: {}): string | undefined;
  request<T>(config: ApiRequestConfig): Promise<ApiResponse<T> | any>;
}
