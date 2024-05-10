import {api} from "./Api";
import {useApiStore} from "./ApiStore";

export function saveToStore(module: string, endpoint: string, data: any): void {
    if (useApiStore() && api.getUseStore() && module && endpoint && data) {
        useApiStore().setData({
            module: module,
            endpoint: endpoint,
            data: data
        });
    }
}

export function replacePathParams(pathParams: { }, endpoint: string): string{
    if (pathParams && Object.keys(pathParams).length > 0){
        Object.entries(pathParams).forEach(([key, value]) => {
            endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value as string));
        });
    }
    return endpoint
}

export function replaceQueryParams(queryParams: { }, endpoint: string): string {
    if (queryParams && Object.keys(queryParams).length > 0) {
        const queryParamsString = new URLSearchParams(queryParams).toString();
        endpoint = `${endpoint}?${queryParamsString}`;
    }
    return endpoint;
}
