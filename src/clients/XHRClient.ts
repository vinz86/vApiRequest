import { ApiRequestConfig, ApiResponse } from "../ApiModels";
import { saveToStore, replaceQueryParams } from "../ApiUtils";

export async function XHRClient<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {

    const { method, data = null, queryParams = null, headers = {}, module = 'default', responseType = null } = config;
    let endpoint = config.endpoint;

    if (queryParams) {
        endpoint = replaceQueryParams(queryParams, endpoint);
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, endpoint, true);

    Object.keys(headers).forEach(header => {
        xhr.setRequestHeader(header, headers[header]);
    });

    if (data && method !== 'GET' && method !== 'HEAD') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }

    if (responseType) {
        xhr.responseType = responseType as XMLHttpRequestResponseType;
    }

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
                            reject(new Error('Unable to determine response content type'));
                        }
                }

                saveToStore(module, endpoint, responseData);

                resolve({
                    data: responseData,
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: xhr.getAllResponseHeaders(),
                    config,
                });
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };
    });
}
