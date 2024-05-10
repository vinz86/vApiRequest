/**
 * Interfaccia modulo API.
 */
export interface ApiModule {
    name: string; // Nome del modulo
    module: any; // Oggetto del modulo API
    endpoints: Record<string, any>; // Endpoint del modulo
}

/**
 * Registro globale dei moduli API.
 */
export class ApiModuleRegistry {
    private static modules: Record<string, ApiModule> = {};

    /**
     * Registra un nuovo modulo API.
     * @param name Nome del modulo.
     * @param module Oggetto del modulo API.
     * @param endpoints Endpoint del modulo.
     * @throws Error se il modulo è già registrato.
     */
    static register(name: string, module: any, endpoints: Record<string, any>): void {
        if (ApiModuleRegistry.modules[name]) {
            throw new Error(`Il modulo ${name} è già registrato.`);
        }
        ApiModuleRegistry.modules[name] = {name, module, endpoints};
    }

    /**
     * Rimuove un modulo API dal registro.
     * @param name Nome del modulo da rimuovere.
     * @throws Error se il modulo non è registrato.
     */
    static unregister(name: string): void {
        if (!ApiModuleRegistry.modules[name]) {
            throw new Error(`Il modulo ${name} non è registrato.`);
        }
        delete ApiModuleRegistry.modules[name];
    }

    /**
     * Recupera un modulo API dal registro.
     * @param name Nome del modulo da recuperare.
     * @returns L'oggetto ApiModule corrispondente al nome specificato, se presente; altrimenti, undefined.
     */
    static getModule(name: string): ApiModule | undefined {
        return ApiModuleRegistry.modules[name];
    }

    /**
     * Recupera tutti i moduli API registrati nel registro.
     * @returns oggetto contenente tutti i moduli API registrati .
     */
    static getAllModules(): Record<string, ApiModule> {
        return {...ApiModuleRegistry.modules};
    }
}
