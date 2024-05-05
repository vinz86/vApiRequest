import { api } from '../../../src/Api'
import type { HttpModuleRequestConfig } from '../../../src/ApiModels'
import type { ApiResponse } from '../../../src/ApiModels'

export const todos = {

  async getTodo<T>(config: HttpModuleRequestConfig = {}): Promise<ApiResponse<T>> {
    const { queryParams = {}, pathParams = {}, headers = {}, module = 'todos' } = config;
    return await api.request<T>({
      endpoint: `/${api.getEndpoint("getTodo")}`,
      method: 'GET',
      queryParams: queryParams,
      pathParams: pathParams,
      data: null,
      headers: headers,
      module: module
    });
  },

};
