/**
 * Client Axios per inviare richieste HTTP.
 * @param config Configurazione della richiesta.
 * @returns Promise con il risultato della richiesta.
 */
import axios, { AxiosResponse } from 'axios';
import { ApiRequestConfig, ApiResponse } from "../ApiModels";
import { saveToStore } from "../ApiUtils";

export async function AxiosClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const {
        endpoint,
        method,
        data = null,
        queryParams = null,
        headers = null,
        module = 'default',
        responseType,
        responseEncoding
    } = config;

    // Invia la richiesta Axios
    const response: AxiosResponse<T> = await axios({
        method: method,
        url: endpoint,
        params: queryParams,
        data: data,
        headers: headers,
        responseType: responseType as any,
        responseEncoding: responseEncoding
    });

    // Salva i dati nello store
    saveToStore(module, endpoint, response.data);

    return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: config
    };
}
