/**
 * Client XHR (XMLHttpRequest) per inviare richieste HTTP.
 * @param config Configurazione della richiesta.
 * @returns Una promessa con il risultato della richiesta.
 */
import { ApiRequestConfig, ApiResponse } from "../ApiModels";
import { saveToStore, replaceQueryParams } from "../ApiUtils";

export async function XHRClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {

    const { method, data = null, queryParams = null, headers = {}, module = 'default', responseType = null } = config;
    let endpoint = config.endpoint;

    if (queryParams) {
        endpoint = replaceQueryParams(queryParams, endpoint);
    }

    // Creazione di una nuova istanza di XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open(method, endpoint, true);

    // Aggiunta headers alla richiesta
    Object.keys(headers).forEach(header => {
        xhr.setRequestHeader(header, headers[header]);
    });

    // Invio dei dati se presenti e se il metodo non è GET o HEAD
    if (data && method !== 'GET' && method !== 'HEAD') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }

    // Impostazione del tipo di risposta
    if (responseType) {
        xhr.responseType = responseType as XMLHttpRequestResponseType;
    }

    // Gestione della promise
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let responseData: any;
                switch (responseType) {
                    case 'json':
                        responseData = JSON.parse(xhr.responseText);
                        break;
                    case 'xml':
                        responseData = xhr.responseXML;
                        break;
                    case 'arraybuffer':
                    case 'blob':
                        responseData = xhr.response;
                        break;
                    default:
                        try {
                            responseData = JSON.parse(xhr.responseText);
                        } catch (error) {
                            reject(new Error('Impossibile determinare il tipo di contenuto della risposta'));
                        }
                }

                // Salva dati nello store
                saveToStore(module, endpoint, responseData);

                // Risolve promise
                resolve({
                    data: responseData,
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: xhr.getAllResponseHeaders(),
                    config,
                });
            } else {
                reject(new Error(`La richiesta ha restituito lo stato ${xhr.status}`));
            }
        };

        // Gestione degli errori
        xhr.onerror = () => {
            reject(new Error('Errore di rete'));
        };
    });
}
