import { api } from '../../../../vApiRequest_pkg/src/Api'
import type { HttpModuleRequestConfig } from '../../../../vApiRequest_pkg/src/ApiModels'
import type { ApiResponse } from '../../../../vApiRequest_pkg/src/ApiModels'

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
