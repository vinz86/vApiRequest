import type { App } from 'vue'
import { api } from '@/services/Api';
import type { Environments } from '@/services/ApiModels'
import { useApiStore } from '@/services/ApiStore';

export interface ApiPluginOptions {
  defaultClient: 'axios' | 'fetch';
  defaultEnvironment: 'dev' | 'test' | 'prod';
  useStore: boolean;
  apiBaseUrl: Environments;
  apiPrefix: Environments;
}

const ApiPlugin = {
  install(app: App, options: ApiPluginOptions): void {
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

    app.config.globalProperties.$api = api;
    app.config.globalProperties.$useApiStore = useApiStore;
    app.provide('api', app.config.globalProperties.$api)
    app.provide('useApiStore', app.config.globalProperties.$useApiStore)

  },
};

export default ApiPlugin;