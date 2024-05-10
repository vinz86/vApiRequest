import { ApiRequestConfig, ApiResponse } from "../ApiModels";
import { saveToStore, replaceQueryParams } from "../ApiUtils";

export async function FetchClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { method, data = null, queryParams = null, headers = {}, module = 'default', responseType = null } = config;
    let { endpoint } = config;

    if (queryParams) {
        endpoint = replaceQueryParams(queryParams, endpoint);
    }

    const fetchOptions: RequestInit = {
        method: method,
        headers: headers
    };

    if (data && method !== "GET" && method !== "HEAD") {
        fetchOptions.body = JSON.stringify(data);
    }

    const fetchResponse: any = await fetch(endpoint, fetchOptions);

    if (fetchResponse && fetchResponse?.ok === false){
        throw fetchResponse;
    }

    let responseData: any;
    switch (responseType){
        case 'json': responseData = await fetchResponse.json(); break;
        case 'xml': responseData = await fetchResponse.text(); break;
        case 'arraybuffer': responseData = await fetchResponse.arrayBuffer(); break;
        case 'blob': responseData = await fetchResponse.blob(); break;
        case 'formdata': responseData = await fetchResponse.formData(); break;
        default:
            try {
                responseData = await fetchResponse.json();
            } catch (error) {
                throw new Error('Unable to determine response content type');
            }
    }

    saveToStore(module, endpoint, responseData);

    return {
        data: responseData,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: fetchResponse.headers,
        config: config,
    };
}
