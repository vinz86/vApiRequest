import {defineStore} from 'pinia';
import {generateStoreDataKey} from "./ApiUtils";
import {ApiStoreState} from "./ApiModels";

// Store Pinia per la gestione dei dati delle chiamate API
export const useApiStore = defineStore('api', {
    state: (): ApiStoreState => ({
        data: {},
    }),
    actions: {
        /**
         * Salva i dati relativi a un endpoint per un modulo
         * @param config Oggetto di configurazione contenente il modulo, l'endpoint e i dati da salvare.
         */
        setData(config: { module: string; method: string; endpoint: string; data: any, payload: any }): void {
            const {module, method, endpoint, data, payload} = config;

            if(method==='HEAD' || method==='DELETE') {
                return;
            }

            if (!this.data[module]) {
                this.data[module] = {};
            }

            const key = generateStoreDataKey(endpoint, method, payload);
            this.data[module][key] = data;
        },

        /**
         * Ottiene i dati relativi a un endpoint per un modulo
         * @param config Oggetto di configurazione contenente il modulo e l'endpoint da cui ottenere i dati.
         * @returns dati relativi all'endpoint specificato, se presenti, altrimenti undefined.
         */
        getData(config: { module: string; method: string; endpoint: string; payload: any }): unknown {
            const {module, method, endpoint, payload} = config;
            if (!this.data[module]) {
                return undefined;
            }
            const key = generateStoreDataKey(endpoint, method, payload);

            return this.data[module][key];
        },

        /**
         * Cancella i dati relativi a un modulo
         * @param module Il nome del modulo di cui cancellare i dati.
         */
        clearData(module: string): void {
            if (this.data[module]) {
                delete this.data[module];
            }
        },

        /**
         * Ottiene tutti i dati relativi a un modulo
         * @param module Nome del modulo di cui ottenere tutti i dati.
         * @returns Oggetto contenente tutti i dati relativi al modulo specificato, se presenti, altrimenti undefined.
         */
        getAllData(module: string): Record<string, unknown> | undefined {
            return this.data[module];
        },

    },
});
