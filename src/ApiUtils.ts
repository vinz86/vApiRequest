import {api} from "./Api";
import {useApiStore} from "./ApiStore";

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

/**
 * Converte un oggetto JSON in un hash di lunghezza fissa.
 * @param obj Oggetto JSON da convertire in hash.
 * @param length Lunghezza dell'hash (default: 8)
 * @returns Hash di lunghezza fissa generato dall'oggetto.
 */
export function objectToFixedLengthHash(obj: any, length: number = 8): string {
    obj = obj || {};
    const jsonString = JSON.stringify(obj);
    let hash = 0;

    // Se la stringa è vuota, restituisce hash '{}'
    if (jsonString.length === 0) return '{}';

    for (let i = 0; i < jsonString.length; i++) {
        const char = jsonString.charCodeAt(i);
        // - (hash << 5): esegue uno shift bit a sinistra di hash di 5 posizioni: sposta tutti i bit
        // di un numero verso sinistra di un certo numero di posizioni, il che è equivalente a moltiplicare hash per 2^5 (32).
        // - ((hash << 5) - hash): sottrae il valore originale di hash dal risultato dello shift a sinistra
        // - Alla fine aggiungo il codice Unicode del carattere corrente
        hash = ((hash << 5) - hash) + char;
        // per garantire che l'hash finale sia un numero intero
        hash |= 0;
    }

    /* Converte l'hash in una stringa esadecimale di lunghezza fissa */
    // (hash >>> 0): per garantire che hash sia trattato come un numero a 32 bit senza segno
    // toString(16): converte il numero in una stringa esadecimale con base 16.
    // padStart(8, '0'): aggiunge zeri iniziali alla stringa finché non raggiunge una lunghezza di 8 caratteri
    return (hash >>> 0).toString(length*2).padStart(length, '0');
}


/**
 * Salva i dati nello store dell'API se abilitato.
 * @param module Nome del modulo.
 * @param method method della chiamata.
 * @param endpoint Endpoint della richiesta.
 * @param payload Payload (per le chiamate POST)
 * @param data Dati da salvare.
 */
export function saveToStore(module: string, method: string, endpoint: string, data: any, payload: any): void {
    if (useApiStore() && api.getUseStore() && module && endpoint && data) {
        useApiStore().setData({
            module: module,
            method: method,
            endpoint: endpoint,
            data: data,
            payload: payload
        });
    }
}

/**
 * Genera la key del dato salvato (o da salvare) nello store
 * @param endpoint Endpoint della richiesta
 * @param method method della chiamata
 * @param payload Payload (per le chiamate POST)
 * @return Stringa con la key del dato salvato (o da salvare) nello store
 */
export function generateStoreDataKey(endpoint: string = "", method: string = '' , payload: any = {}): string {
    if (useApiStore() && api.getUseStore() && endpoint) {
        return `${endpoint}-${method.toUpperCase()}${objectToFixedLengthHash( payload || {} )}`;
    } return "";
}