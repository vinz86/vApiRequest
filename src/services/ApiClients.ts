import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiRequestConfig, ApiResponse } from '@/services/ApiModels';
import { useApiStore } from '@/services/ApiStore';
import { api } from '@/services/Api'

//AXIOS
export async function AxiosClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
  const { method, data = null, pathParams = null, queryParams = null, headers = null, module = undefined, responseType, responseEncoding } = config;
  let { endpoint } = config;

  // Sostituisco i parametri nell'endpoint
  if (pathParams && Object.keys(pathParams).length > 0){
    Object.entries(pathParams).forEach(([key, value]) => {
      endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value as string));
    });
  }

  const response: AxiosResponse<T> = await axios({
    method: method,
    url: `${api.getCurrentApiBaseUrl()}${api.getCurrentApiPrefix()}${endpoint}`,
    params: queryParams,
    data: data,
    headers: headers,
    responseType: responseType as any,
    responseEncoding: responseEncoding
  });

  if (useApiStore() && response.data && module !== undefined) {
    useApiStore().setData({
      module: module,
      endpoint: endpoint,
      data: response.data
    });
  }

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: config
  };
}

//FETCH
export async function FetchClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {

  const { method, data = null, pathParams = null, queryParams = null, headers = { }, module = undefined, responseType = null } = config;
  let { endpoint } = config;

  // sostituisco i parametri
  if (pathParams && Object.keys(pathParams).length > 0){
    Object.entries(pathParams).forEach(([key, value]) => {
      endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value as string));
    });
  }

  if (queryParams && Object.keys(queryParams).length > 0){
    const queryParamsString = new URLSearchParams(queryParams).toString();
    endpoint = `${endpoint}?${queryParamsString}`;
  }

  const fetchOptions: RequestInit = {
    method: method,
    headers: headers
  };

  if (data && method!=="GET" && method !=="HEAD") {
    fetchOptions.body = JSON.stringify(data);
  }

  // Eseguo la richiesta utilizzando fetch
  const fetchResponse = await fetch(`${api.getCurrentApiBaseUrl()}${api.getCurrentApiPrefix()}${endpoint}`, fetchOptions);

  // Estraggo i dati dalla risposta
  let responseData: any = null;
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

  if (useApiStore() && responseData && module !== undefined) {
    useApiStore().setData({
      module: module,
      endpoint: endpoint,
      data: responseData
    });
  }

  // Restituisco la risposta
  return {
    data: responseData,
    status: fetchResponse.status,
    statusText: fetchResponse.statusText,
    headers: fetchResponse.headers,
    config: config,
  };}