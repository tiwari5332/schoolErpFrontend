import httpClient from '../api/httpClient';
import { AxiosRequestConfig } from 'axios';

/**
 * Generic ApiService wrapper delegating to the centralized httpClient.
 */
const ApiService = {
  get: async <T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpClient.get<T>(url, { params, ...config });
    return res.data;
  },
  post: async <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpClient.post<T>(url, data, config);
    return res.data;
  },
  put: async <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpClient.put<T>(url, data, config);
    return res.data;
  },
  patch: async <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpClient.patch<T>(url, data, config);
    return res.data;
  },
  delete: async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    const res = await httpClient.delete<T>(url, config);
    return res.data;
  },
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default ApiService;
