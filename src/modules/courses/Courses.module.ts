import { api } from 'vapirequest/src/Api'
import type { ApiResponse, ApiRequestConfig } from 'vapirequest/src/ApiModels'

export const courses = {

  async getCourses<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { headers = {}, module = 'courses' } = config;
    return await api.request<T>({
      endpoint: `/${api.getEndpoint("getCourses")}`,
      method: 'GET',
      module: module,
      data: { },
      headers: headers,
    });
  },

  async getCourse<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { queryParams = {}, pathParams = {}, headers = {}, module = 'courses' } = config;
    return await api.request<T>({
      endpoint: `/${api.getEndpoint("getCourse")}`,
      method: 'GET',
      queryParams: queryParams,
      pathParams: pathParams,
      data: null,
      headers: headers,
      module: module,
      responseType: 'xml'
    });
  },

  async getCourseHtml<T>(endpoint: string, config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const { module = 'courses' } = config;
    console.log('getCourseHtml')
    return await api.request<T>({
      endpoint: endpoint,
      method: 'GET',
      module: module,
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    });
  },
};
