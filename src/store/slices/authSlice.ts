import { StateCreator } from 'zustand';
import { AuthSlice, AppStoreState } from '../types';

export const createAuthSlice: StateCreator<
  AppStoreState,
  [],
  [],
  AuthSlice
> = (set) => ({
  token: localStorage.getItem('auth_token'),
  user: (() => {
    try {
      const storedUser = localStorage.getItem('user_info');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: Boolean(localStorage.getItem('auth_token')),

  setSession: (token, user) => {
    localStorage.setItem('auth_token', token);
    if (user) {
      localStorage.setItem('user_info', JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true });
  },

  clearSession: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_info');
    set({ token: null, user: null, isAuthenticated: false });
  },
});
