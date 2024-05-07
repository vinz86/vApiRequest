import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiRequestConfig, ApiResponse} from './ApiModels'
import { api } from './Api'
import { useApiStore } from './ApiStore'

// ================== AXIOS ==================
export async function AxiosClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
  const { method, data = null, pathParams = null, queryParams = null, headers = null, module = 'default', responseType, responseEncoding } = config;
  let { endpoint } = config;

  // Sostituisco i parametri nell'endpoint
  if (pathParams) {
    endpoint = replacePathParams(pathParams, endpoint)
  }

  // Effettuo richiesta
  const response: AxiosResponse<T> = await axios({
    method: method,
    url: `${api.getCurrentApiBaseUrl()}${api.getCurrentApiPrefix()}${endpoint}`,
    params: queryParams,
    data: data,
    headers: headers,
    responseType: responseType as any,
    responseEncoding: responseEncoding
  });

  // Salva nello store (se abilitato)
  saveToStore( module, endpoint, response.data);

  // restituisco la risposa
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: config
  };
}
// ================== FINE AXIOS ==================

// ================== FETCH ==================
export async function FetchClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { method, data = null, pathParams = null, queryParams = null, headers = { }, module = 'default', responseType = null } = config;
    let { endpoint } = config;

    // sostituisco i pathParams
    if (pathParams) {
      endpoint = replacePathParams(pathParams, endpoint)
    }

    //  sostituisco i queryParams
    if (queryParams) {
      endpoint =  replaceQueryParams(queryParams, endpoint);
    }
    const fetchOptions: RequestInit = {
      method: method,
      headers: headers
    };

    // Se è GET o HEAD non mando il body
    if (data && method!=="GET" && method !=="HEAD") {
      fetchOptions.body = JSON.stringify(data);
    }

    const fetchResponse: any = await fetch(`${api.getCurrentApiBaseUrl()}${api.getCurrentApiPrefix()}${endpoint}`, fetchOptions);

    //
    if (fetchResponse && fetchResponse?.ok === false){
        throw fetchResponse;
    }
    debugger
    // Estraggo i dati dalla risposta
    let responseData: any;
    switch (responseType){
      case 'json':
        responseData = await fetchResponse.json(); break;
      case 'xml':
        responseData = await fetchResponse.text(); break;
      case 'arraybuffer':
        responseData = await fetchResponse.arrayBuffer(); break;
      case 'blob':
        responseData = await fetchResponse.blob(); break;
      case 'formdata':
        responseData = await fetchResponse.formData(); break;
      default: // json
        responseData = await fetchResponse.json();
    }

    // Salva nello store (se abilitato)
    saveToStore( module, endpoint, responseData);

    return {
      data: responseData,
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
      headers: fetchResponse.headers,
      config: config,
    };
}
// ================== FINE FETCH ==================


// ================== METODI DI SUPPORTO ==================

// Salva nello store
function saveToStore( module: string, endpoint: string, data: any ): void{
  if (useApiStore() && api.getUseStore() && module && endpoint && data) {
    useApiStore().setData({
      module: module,
      endpoint: endpoint,
      data: data
    });
  }
}

// restituisce l'endpoint con i pathParams
function replacePathParams(pathParams: { }, endpoint: string): string{
  if (pathParams && Object.keys(pathParams).length > 0){
    Object.entries(pathParams).forEach(([key, value]) => {
      endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value as string));
    });
  }
  return endpoint
}

// restituisxce l'endpoint con la queryString
function replaceQueryParams(queryParams: { }, endpoint: string): string{
  if (queryParams && Object.keys(queryParams).length > 0){
    const queryParamsString = new URLSearchParams(queryParams).toString();
    endpoint = `${endpoint}?${queryParamsString}`;
  }
  return endpoint
}