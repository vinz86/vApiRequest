import { api } from '../../../src/Api'
import type {ApiRequestConfig, ApiResponse, ModuleRequestConfig} from "../../../src/ApiModels";

export const todos = {
  async getTodo<T>(config: ModuleRequestConfig): Promise<ApiResponse<T>> {
    config.endpoint = `/${api.getEndpoint("getTodo")}` || "";
    config.method = 'GET';
    return await api.request<T>(config as ApiRequestConfig);
  },
};

