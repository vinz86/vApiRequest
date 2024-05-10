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
  action: string; // per SOAP
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: ApiRequestConfig;
}


export interface Environments {
  dev?: string;
  test?: string;
  prod: any;
}

export interface DynamicModules {
  [moduleName: string]: any;
}

export interface Endpoint {
  [key: string]: { [key: string]: string };
}

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

  request<T>(config: ApiRequestConfig): Promise<ApiResponse<T> | any>;
}

