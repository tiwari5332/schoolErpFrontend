import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ENV } from '../config/env';
import useAppStore from '../store';
import { getStoredAuthToken, clearAuthSession, AUTH_TOKEN_KEY } from '../utils/authStorage';

export { AUTH_TOKEN_KEY };

export const httpClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor:
 * Automatically attaches Authorization header if token exists in storage.
 */
httpClient.interceptors.request.use(
  (config) => {
    try {
      const token = getStoredAuthToken();
      if (token) {
        config.headers.set('Authorization', token.startsWith('Bearer ') ? token : `Bearer ${token}`);
      }
    } catch (e) {
      console.warn('[httpClient] Error accessing storage for token attachment', e);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Response Interceptor:
 * Handles responses and normalizes error messages across network, timeout, 4xx, and 5xx errors.
 * Automatically clears session & redirects on 401 or 403 responses.
 */
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ message?: string; error?: string; [key: string]: any }>) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      errorMessage = 'Connection timed out. Please check your network and try again.';
    } else if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (data && typeof data === 'object') {
        errorMessage = data.message || data.error || errorMessage;
      }

      // Auto-logout on 401 (Unauthorized) or 403 (Forbidden)
      if (status === 401 || status === 403) {
        console.warn(`[httpClient] Received status ${status}. Clearing session and auto-logging out.`);
        
        try {
          // Clear Zustand store state and storage keys
          useAppStore.getState().clearSession();
          clearAuthSession();
        } catch (e) {
          console.warn('[httpClient] Error clearing auth session on 401/403', e);
        }

        errorMessage = status === 401 
          ? 'Session expired or unauthorized. Logging out...'
          : 'Access forbidden (403). Logging out...';

        if (typeof window !== 'undefined') {
          const pathname = window.location.pathname;
          if (!pathname.includes('/login') && !pathname.includes('/signup')) {
            window.location.href = '/login';
          }
        }
      } else if (status === 404) {
        errorMessage = errorMessage || 'Requested resource or API endpoint was not found.';
      } else if (status >= 500) {
        errorMessage = errorMessage || 'Server error encountered. Please try again later.';
      }
    } else if (error.request) {
      // Request sent but no response received (Network failure / CORS)
      errorMessage = 'Network failure. Unable to reach the server. Please check your connection.';
    }

    // Attach human-readable normalized message to error object
    const enhancedError = new Error(errorMessage);
    (enhancedError as any).originalError = error;
    (enhancedError as any).status = error.response?.status;
    (enhancedError as any).responseData = error.response?.data;

    return Promise.reject(enhancedError);
  }
);

export default httpClient;
