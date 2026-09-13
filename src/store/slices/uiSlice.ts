import { StateCreator } from 'zustand';
import { UISlice, AppStoreState } from '../types';

const initialUIState = {
  searchQuery: '',
  selectedGrade: 'all',
  isAddModalOpen: false,
  isEditModalOpen: false,
  activeTab: 'overview',
  themeMode: 'light' as const,
};

export const createUISlice: StateCreator<
  AppStoreState,
  [],
  [],
  UISlice
> = (set) => ({
  ...initialUIState,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGrade: (grade) => set({ selectedGrade: grade }),
  setAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
  setEditModalOpen: (isOpen) => set({ isEditModalOpen: isOpen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setThemeMode: (mode) => set({ themeMode: mode }),
  resetFilters: () => set({ searchQuery: '', selectedGrade: 'all' }),
});
