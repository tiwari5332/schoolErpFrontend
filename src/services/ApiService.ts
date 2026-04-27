// src/services/ApiService.js
import axios from "axios";

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
  get: (url, params = {}, config = {}) => api.get(url, { params, ...config }),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default ApiService;
