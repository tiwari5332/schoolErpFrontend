import httpClient from '../httpClient';
import { LocalStorageSync } from '../../services/LocalStorageSync';

export interface AdminDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
  lastLogin?: string;
  createdDate?: string;
  avatar?: string;
  [key: string]: any;
}

export interface AdminFilterParams {
  search?: string;
  role?: string;
  department?: string;
  status?: string;
}

export const adminService = {
  async getAdmins(params: AdminFilterParams = {}): Promise<AdminDTO[]> {
    try {
      const res = await httpClient.get<AdminDTO[]>('/api/v1/admins', { params });
      return res.data;
    } catch {
      const stored = LocalStorageSync.get<AdminDTO[]>('edu_trio_admins');
      return stored || [];
    }
  },

  async getAdminById(id: string): Promise<AdminDTO> {
    const res = await httpClient.get<AdminDTO>(`/api/v1/admins/${id}`);
    return res.data;
  },

  async createAdmin(admin: Omit<AdminDTO, 'id'>): Promise<AdminDTO> {
    try {
      const res = await httpClient.post<AdminDTO>('/api/v1/admins', admin);
      return res.data;
    } catch {
      const stored = LocalStorageSync.get<AdminDTO[]>('edu_trio_admins') || [];
      const newId = `ADM${String(stored.length + 1).padStart(3, '0')}`;
      const newAdmin = { ...admin, id: newId } as AdminDTO;
      LocalStorageSync.set('edu_trio_admins', [...stored, newAdmin]);
      return newAdmin;
    }
  },

  async updateAdmin(id: string, updates: Partial<AdminDTO>): Promise<AdminDTO> {
    try {
      const res = await httpClient.put<AdminDTO>(`/api/v1/admins/${id}`, updates);
      return res.data;
    } catch {
      const stored = LocalStorageSync.get<AdminDTO[]>('edu_trio_admins') || [];
      const updated = stored.map(a => a.id === id ? { ...a, ...updates } : a);
      LocalStorageSync.set('edu_trio_admins', updated);
      return (updated.find(a => a.id === id) || updates) as AdminDTO;
    }
  },

  async deleteAdmin(id: string): Promise<{ success: boolean }> {
    try {
      const res = await httpClient.delete<{ success: boolean }>(`/api/v1/admins/${id}`);
      return res.data;
    } catch {
      const stored = LocalStorageSync.get<AdminDTO[]>('edu_trio_admins') || [];
      LocalStorageSync.set('edu_trio_admins', stored.filter(a => a.id !== id));
      return { success: true };
    }
  },
};

export default adminService;
