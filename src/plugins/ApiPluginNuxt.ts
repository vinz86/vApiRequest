import { api } from "../Api";
import { useApiStore } from "../ApiStore";
import { ApiModuleRegistry } from "../ApiModuleRegistry";
import type { NuxtAppOptions} from '@nuxt/types';
import {ApiModule} from "../ApiModels";

/**
 * Plugin per gestire la configurazione e l'utilizzo delle API.
 */
// @ts-ignore
export default defineNuxtPlugin((nuxtApp: NuxtAppOptions) => {
    // Impostazione delle opzioni globali per l'API
    // @ts-ignore
    const options = useRuntimeConfig().api || {};
    if (options.defaultClient) {
        api.setDefaultClient(options.defaultClient);
    }
    if (options.defaultEnvironment) {
        api.setDefaultEnvironment(options.defaultEnvironment);
    }
    if (options.useStore !== undefined) {
        api.setUseStore(options.useStore);
    }
    if (options.apiBaseUrl) {
        api.setApiBaseUrl(options.apiBaseUrl);
    }
    if (options.apiPrefix) {
        api.setApiPrefix(options.apiPrefix);
    }
    if (options.token) {
        api.setToken(options.token);
    }
    if (options.tokenKey) {
        api.setTokenKey(options.tokenKey);
    }
    if (options.authType) {
        api.setAuthType(options.authType);
    }

    // Gestione dei moduli aggiuntivi
    if (options.modules) {
        options.modules.forEach(async (module: ApiModule) => {
            api[module.name] = module.module;

            // Controllo se sono definiti endpoint per il modulo
            if (module.endpoints) {
                // Aggiunta degli endpoint alla raccolta globale
                const newEndpoints = { ...api.getEndpoints(), ...module.endpoints };
                api.setEndpoints(newEndpoints);
            }

            // Registrazione del modulo nel registro delle estensioni
            ApiModuleRegistry.register(module.name, module.module, module.endpoints);
        });
    }

    // Iniezione nell'oggetto context di NUXT
    // @ts-ignore
    nuxtApp.provide('api', api);
    // @ts-ignore
    nuxtApp.provide('useApiStore', useApiStore);
});
