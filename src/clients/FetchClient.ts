/**
 * Client Fetch per inviare richieste HTTP.
 * @param config Configurazione della richiesta.
 * @returns Una promessa con il risultato della richiesta.
 */
import {ApiRequestConfig, ApiResponse} from "../ApiModels";
import {saveToStore, replaceQueryParams} from "../ApiUtils";
import {api} from "../Api";

export async function FetchClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const {method, data = null, queryParams = null, headers = {}, module = 'default', responseType = null} = config;
    let {endpoint} = config;

    // Sostituzione dei parametri nella query
    if (queryParams) {
        endpoint = replaceQueryParams(queryParams, endpoint);
    }

    // Creazione delle opzioni di fetch
    const fetchOptions: RequestInit = {
        method: method,
        headers: headers
    };

    // Aggiunta del corpo della richiesta se presente e se il metodo non è GET o HEAD
    if (data && method !== "GET" && method !== "HEAD") {
        fetchOptions.body = JSON.stringify(data);
    }

    // Invio della richiesta fetch
    const fetchResponse: Response = await fetch(endpoint, fetchOptions);

    if (fetchResponse && fetchResponse?.ok === false) {
        throw fetchResponse;
    }

    // Lettura della risposta in base al tipo di contenuto specificato
    let responseData: any = "";
    if (method !== "HEAD") {
        switch (responseType) {
            case 'json':
                responseData = await fetchResponse.json();
                break;
            case 'xml':
                responseData = await fetchResponse.text();
                break;
            case 'arraybuffer':
                responseData = await fetchResponse.arrayBuffer();
                break;
            case 'blob':
                responseData = await fetchResponse.blob();
                break;
            case 'formdata':
                responseData = await fetchResponse.formData();
                break;
            default:
                try {
                    responseData = await fetchResponse.json();
                } catch (error) {
                    throw new Error('Impossibile determinare il tipo di contenuto della risposta');
                }
        }
    }

    // Salva i dati nello store
    let storeEndpoint = queryParams ? endpoint + api.getUrlParams(queryParams) : endpoint;
    saveToStore(module, method, storeEndpoint, responseData, data || {});

    return {
        data: responseData,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: fetchResponse.headers,
        config: config,
    };
}
