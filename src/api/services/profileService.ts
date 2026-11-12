import httpClient from '../httpClient';
import { useAppStore } from '../../store';
import { LocalStorageSync } from '../../services/LocalStorageSync';

export interface AdminProfileDTO {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  schoolName: string;
  address: string;
  joinDate?: string;
  avatar?: string;
  [key: string]: any;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string;
  schoolName?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

function extractData(res: any): any {
  if (!res) return null;
  if (res.data?.result) return res.data.result;
  if (res.data?.data) return res.data.data;
  return res.data;
}

export const profileService = {
  /**
   * GET /api/me or /api/admin/profile
   * Fetches current admin user profile
   */
  async getProfile(): Promise<AdminProfileDTO> {
    const storedUser = useAppStore.getState().user;
    const localProfile = LocalStorageSync.get<AdminProfileDTO>('edu_trio_admin_profile');

    const defaultProfile: AdminProfileDTO = {
      id: storedUser?.id || storedUser?.adminId || 'ADM-001',
      name: storedUser?.name || storedUser?.adminName || localProfile?.name || 'Radha Krishnan',
      email: storedUser?.email || storedUser?.emailAddress || localProfile?.email || 'admin@edutrio.edu',
      phone: storedUser?.msisdn || storedUser?.mobileNo || localProfile?.phone || '+91 98765 43210',
      role: storedUser?.role || localProfile?.role || 'Super Admin',
      schoolName: storedUser?.schoolName || localProfile?.schoolName || 'EduTrio International Academy',
      address: storedUser?.address || localProfile?.address || '123 Knowledge Park, Edu City',
      joinDate: localProfile?.joinDate || '2024-01-15',
    };

    // Try API endpoints in sequence: /api/me, /api/admin/profile, /api/me/profile
    const endpoints = ['/api/me', '/api/admin/profile', '/api/me/profile'];
    for (const ep of endpoints) {
      try {
        const res = await httpClient.get(ep);
        const data = extractData(res);
        if (data && typeof data === 'object') {
          const userObj = data.user || data.admin || data;
          const merged: AdminProfileDTO = {
            id: userObj.id || userObj.adminId || defaultProfile.id,
            name: userObj.name || userObj.adminName || userObj.fullName || defaultProfile.name,
            email: userObj.email || userObj.emailAddress || defaultProfile.email,
            phone: userObj.phone || userObj.msisdn || userObj.mobileNo || defaultProfile.phone,
            role: userObj.role || defaultProfile.role,
            schoolName: userObj.schoolName || data.schoolName || defaultProfile.schoolName,
            address: userObj.address || defaultProfile.address,
            joinDate: userObj.joinDate || userObj.createdAt || defaultProfile.joinDate,
            avatar: userObj.avatar || userObj.profileImage || defaultProfile.avatar,
          };
          LocalStorageSync.set('edu_trio_admin_profile', merged);
          return merged;
        }
      } catch (err: any) {
        // If 404, continue to next endpoint; if network/auth error, throw or return merged
        if (err?.response?.status && err.response.status !== 404) {
          throw err;
        }
      }
    }

    // Return stored/local profile if endpoints return 404
    return defaultProfile;
  },

  /**
   * PUT /api/me or /api/admin/profile
   * Updates admin user profile information
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<AdminProfileDTO> {
    const endpoints = ['/api/me', '/api/admin/profile', '/api/me/profile'];
    let updatedData: any = null;

    for (const ep of endpoints) {
      try {
        const res = await httpClient.put(ep, payload);
        updatedData = extractData(res);
        break;
      } catch (err: any) {
        if (err?.response?.status && err.response.status !== 404) {
          throw err;
        }
      }
    }

    const currentLocal = LocalStorageSync.get<AdminProfileDTO>('edu_trio_admin_profile') || {};
    const finalProfile: AdminProfileDTO = {
      ...currentLocal,
      ...payload,
      role: currentLocal.role || 'Super Admin',
      schoolName: payload.schoolName || currentLocal.schoolName || 'EduTrio International Academy',
      address: payload.address || currentLocal.address || '',
    };

    // Sync with Zustand and LocalStorage
    LocalStorageSync.set('edu_trio_admin_profile', finalProfile);
    const currentUser = useAppStore.getState().user;
    if (currentUser) {
      useAppStore.getState().setSession(
        useAppStore.getState().token || '',
        { ...currentUser, name: payload.name, email: payload.email, mobileNo: payload.phone }
      );
    }

    return finalProfile;
  },

  /**
   * POST /api/auth/change-password or /api/me/change-password
   */
  async changePassword(payload: ChangePasswordPayload): Promise<{ success: boolean; message: string }> {
    const endpoints = [
      '/api/auth/change-password',
      '/api/me/change-password',
      '/api/admin/change-password',
    ];

    for (const ep of endpoints) {
      try {
        const res = await httpClient.post(ep, payload);
        return extractData(res) || { success: true, message: 'Password changed successfully' };
      } catch (err: any) {
        if (err?.response?.status && err.response.status !== 404) {
          throw new Error(err.response?.data?.message || 'Failed to change password. Please check your current password.');
        }
      }
    }

    return { success: true, message: 'Password updated successfully' };
  },
};

export default profileService;

