// src/services/ApiService.js
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an axios instance with defaults
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (e.g., attach auth token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Example: redirect to login if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Generic API methods
const ApiService = {
  get: async <T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    return api.get(url, { params, ...config });
  },
  post: async <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
    return api.post(url, data, config);
  },
  put: async <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
    return api.put(url, data, config);
  },
  patch: async <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
    return api.patch(url, data, config);
  },
  delete: async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    return api.delete(url, config);
  },
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default ApiService;
