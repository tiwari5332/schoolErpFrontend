import { StateCreator } from 'zustand';
import { AuthSlice, AppStoreState } from '../types';
import {
  getStoredAuthToken,
  getStoredUserInfo,
  setStoredAuthToken,
  setStoredUserInfo,
  clearAuthSession
} from '../../utils/authStorage';

export const createAuthSlice: StateCreator<
  AppStoreState,
  [],
  [],
  AuthSlice
> = (set) => ({
  token: getStoredAuthToken(),
  user: getStoredUserInfo(),
  isAuthenticated: Boolean(getStoredAuthToken()),

  setSession: (token, user, rememberMe = true) => {
    setStoredAuthToken(token, rememberMe);
    if (user) {
      setStoredUserInfo(user, rememberMe);
    }
    set({ token, user, isAuthenticated: true });
  },

  clearSession: () => {
    clearAuthSession();
    set({ token: null, user: null, isAuthenticated: false });
  },
});
