import {api} from "./Api";
import {useApiStore} from "./ApiStore";

/**
 * Salva i dati nello store dell'API se abilitato.
 * @param module Nome del modulo.
 * @param endpoint Endpoint della richiesta.
 * @param data Dati da salvare.
 */
export function saveToStore(module: string, endpoint: string, data: any): void {
    if (useApiStore() && api.getUseStore() && module && endpoint && data) {
        useApiStore().setData({
            module: module,
            endpoint: endpoint,
            data: data
        });
    }
}

/**
 * Sostituisce i pathParams nell'endpoint con i valori forniti.
 * @param pathParams pathParams da sostituire nell'endpoint.
 * @param endpoint Endpoint della richiesta.
 * @returns Endpoint con i parametri sostituiti.
 */
export function replacePathParams(pathParams: { [key: string]: string }, endpoint: string): string {
    if (pathParams && Object.keys(pathParams).length > 0) {
        Object.entries(pathParams).forEach(([key, value]) => {
            endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value));
        });
    }
    return endpoint;
}

/**
 * Aggiunge i queryParams all'endpoint.
 * @param queryParams queryParams da aggiungere all'endpoint.
 * @param endpoint Endpoint della richiesta.
 * @returns Endpoint con i parametri di query aggiunti.
 */
export function replaceQueryParams(queryParams: { [key: string]: any }, endpoint: string): string {
    if (queryParams && Object.keys(queryParams).length > 0) {
        const queryParamsString = new URLSearchParams(queryParams).toString();
        endpoint = `${endpoint}?${queryParamsString}`;
    }
    return endpoint;
}
