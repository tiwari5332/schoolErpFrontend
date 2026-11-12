import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { AppStoreState } from './types';
import { createUISlice } from './slices/uiSlice';
import { createAuthSlice } from './slices/authSlice';
import { createSessionSlice } from './slices/sessionSlice';

/**
 * Unified Zustand Store using Slice Pattern.
 * Merges UI Slice (ephemeral UI state), Auth Slice (persisted session), and Session Slice (academic session).
 */
export const useAppStore = create<AppStoreState>()(
  persist(
    (...args) => ({
      ...createUISlice(...args),
      ...createAuthSlice(...args),
      ...createSessionSlice(...args),
    }),
    {
      name: 'edutrio_app_store',
      storage: createJSONStorage(() => localStorage),
      // Persist auth session, academic session, theme mode, and default UI filter preferences in localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedSessionId: state.selectedSessionId,
        selectedSession: state.selectedSession,
        themeMode: state.themeMode,
        searchQuery: state.searchQuery,
        selectedGrade: state.selectedGrade,
      }),
    }
  )
);

/**
 * Atomic Selector Hooks
 * Wrapped with useShallow to prevent shallow object inequality infinite re-render loops.
 */
export const useUIFilters = () =>
  useAppStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedGrade: state.selectedGrade,
      setSearchQuery: state.setSearchQuery,
      setSelectedGrade: state.setSelectedGrade,
      resetFilters: state.resetFilters,
    }))
  );

export const useUIModals = () =>
  useAppStore(
    useShallow((state) => ({
      isAddModalOpen: state.isAddModalOpen,
      isEditModalOpen: state.isEditModalOpen,
      setAddModalOpen: state.setAddModalOpen,
      setEditModalOpen: state.setEditModalOpen,
    }))
  );

export const useAuthSession = () =>
  useAppStore(
    useShallow((state) => ({
      token: state.token,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      setSession: state.setSession,
      clearSession: state.clearSession,
    }))
  );

export const useSessionStore = () =>
  useAppStore(
    useShallow((state) => ({
      selectedSessionId: state.selectedSessionId,
      selectedSession: state.selectedSession,
      setSelectedSessionId: state.setSelectedSessionId,
      setSelectedSession: state.setSelectedSession,
    }))
  );

export default useAppStore;
