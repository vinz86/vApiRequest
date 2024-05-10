import type { App } from 'vue';
import { api } from './Api';
import type { Environments} from './ApiModels';
import { useApiStore } from './ApiStore';
import { ApiModuleRegistry } from './ApiModuleRegistry';

export interface ApiPluginOptions {
  defaultClient: 'axios' | 'fetch';
  defaultEnvironment: 'dev' | 'test' | 'prod';
  useStore: boolean;
  apiBaseUrl: Environments;
  apiPrefix: Environments;
  modules?: Array<any>;
  token?: string;
  tokenKey?: string;
  authType?: string;
}

const ApiPlugin = {
  install(app:any, options: ApiPluginOptions): void {

    if (options && options.defaultClient) {
      api.setDefaultClient(options.defaultClient);
    }
    if (options && options.defaultEnvironment) {
      api.setDefaultEnvironment(options.defaultEnvironment);
    }
    if (options && options.useStore !== undefined) {
      api.setUseStore(options.useStore);
    }
    if (options && options.apiBaseUrl) {
      api.setApiBaseUrl(options.apiBaseUrl);
    }
    if (options && options.apiPrefix) {
      api.setApiPrefix(options.apiPrefix);
    }
    if (options && options.token) {
      api.setToken(options.token);
    }
    if (options && options.tokenKey) {
      api.setTokenKey(options.tokenKey);
    }
    if (options && options.authType) {
      api.setAuthType(options.authType);
    }

    // moduli dell'opzione modules
    if (options && options.modules) {
      options.modules.forEach(async (module) => {
        api[module.name] = module.module;

        // controllo se ha endpoint definiti
        if (module.endpoints) {
          // aggiungo endpoint alla raccolta globale
          let newEndpoints = { ...api.getEndpoints(), ...module.endpoints};
          api.setEndpoints(newEndpoints);
        }

        // Aggiungo il modulo al registro delle estensioni
        ApiModuleRegistry.register(module.name, module.module, module.endpoints);
      });
    }

    console.log('Api:', api);

    app.config.globalProperties.$api = api;
    app.config.globalProperties.$useApiStore = useApiStore;
    app.provide('api', app.config.globalProperties.$api);
    app.provide('useApiStore', app.config.globalProperties.$useApiStore);
  },
};

export default ApiPlugin;
