import httpClient from '../httpClient';

/**
 * Login DTOs
 */
export interface LoginRequest {
  msisdn: string;
  password: string;
  deviceId: string;
}

export interface UserAdminInfo {
  id?: string;
  adminId?: string;
  name?: string;
  adminName?: string;
  email?: string;
  emailAddress?: string;
  msisdn?: string;
  mobileNo?: string;
  role?: string;
  schoolId?: string;
  schoolName?: string;
  [key: string]: any;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  authToken?: string;
  user?: UserAdminInfo;
  data?: {
    token?: string;
    user?: UserAdminInfo;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Register DTOs
 */
export interface RegisterRequest {
  fullName: string;
  mobileNo: string;
  schoolName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success?: boolean;
  message?: string;
  schoolId?: string;
  schoolName?: string;
  adminId?: string;
  adminName?: string;
  email?: string;
  mobileNo?: string;
  [key: string]: any;
}

/**
 * Authentication Service
 * Centralizes authentication and registration endpoint calls.
 */
export const authService = {
  /**
   * Logs in an admin user using MSISDN/Mobile, password, and deviceId.
   * Target endpoint: POST /api/auth/admin/login (fallback /api/admin/login)
   */
  async loginAdmin(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpClient.post<LoginResponse>('/api/auth/admin/login', credentials);
      return response.data;
    } catch (err: any) {
      // Fallback to legacy route if /api/auth/admin/login is unavailable
      if (err?.status === 404) {
        const fallbackRes = await httpClient.post<LoginResponse>('/api/admin/login', credentials);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  /**
   * Registers a new school & admin account.
   * Target endpoint: POST /api/auth/register
   */
  async registerAdmin(payload: RegisterRequest): Promise<RegisterResponse> {
    const response = await httpClient.post<RegisterResponse>('/api/auth/register', payload);
    return response.data;
  },
};

export default authService;
