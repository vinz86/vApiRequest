import type {App} from 'vue';
import {api} from './Api';
import type {ApiPluginOptions} from './ApiModels';
import {useApiStore} from './ApiStore';
import {ApiModuleRegistry} from './ApiModuleRegistry';

/**
 * Plugin per gestire la configurazione e l'utilizzo delle API.
 */
const ApiPlugin = {
    /**
     * Installa il plugin API nell'applicazione Vue/Nuxt.
     * @param app Istanza dell'applicazione Vue/Nuxt.
     * @param options Opzioni di configurazione del plugin API.
     */
    install(app: App, options: ApiPluginOptions): void {
        // Impostazione delle opzioni globali per l'API
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

        // Gestione dei moduli aggiuntivi
        if (options && options.modules) {
            options.modules.forEach(async (module) => {
                api[module.name] = module.module;

                // Controllo se sono definiti endpoint per il modulo
                if (module.endpoints) {
                    // Aggiunta degli endpoint alla raccolta globale
                    let newEndpoints = {...api.getEndpoints(), ...module.endpoints};
                    api.setEndpoints(newEndpoints);
                }

                // Registrazione del modulo nel registro delle estensioni
                ApiModuleRegistry.register(module.name, module.module, module.endpoints);
            });
        }

        // Aggiunta dell'API e dello store all'oggetto globalProperties dell'app
        console.log("===== API =====", api)
        app.config.globalProperties.$api = api;
        app.config.globalProperties.$useApiStore = useApiStore;
        app.provide('api', app.config.globalProperties.$api);
        app.provide('useApiStore', app.config.globalProperties.$useApiStore);
    },
};

export default ApiPlugin;
