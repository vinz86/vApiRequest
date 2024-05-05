import { api } from '@/services/Api'
import type { HttpModuleRequestConfig } from '@/services/ApiModels'
import type { ApiResponse } from '@/services/ApiModels'

export const courses = {

  async getCourses<T>(config: HttpModuleRequestConfig = {}): Promise<ApiResponse<T>> {
    const { headers = {}, module = 'courses' } = config;
    return await api.request<T>({
      endpoint: `/${api.getEndpoint("getCourses")}`,
      method: 'GET',
      module: module,
      data: { },
      headers: headers,
    });
  },

  async getCourse<T>(config: HttpModuleRequestConfig = {}): Promise<ApiResponse<T>> {
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

  async getCourseHtml<T>(endpoint: string, config: HttpModuleRequestConfig = {}): Promise<ApiResponse<T>> {
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
