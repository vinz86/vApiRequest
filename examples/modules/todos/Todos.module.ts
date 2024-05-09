import { api } from 'vapirequest/src/Api'
import type { ApiResponse, ApiRequestConfig } from 'vapirequest/src/ApiModels'

export const todos = {
  async getTodo<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    config.endpoint = `/${api.getEndpoint("getTodo")}`;
    config.method = 'GET';
    return await api.request<T>(config);
  },
};

