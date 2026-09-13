export interface UIState {
  searchQuery: string;
  selectedGrade: string;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  activeTab: string;
  themeMode: 'light' | 'dark' | 'system';
}

export interface UIActions {
  setSearchQuery: (query: string) => void;
  setSelectedGrade: (grade: string) => void;
  setAddModalOpen: (isOpen: boolean) => void;
  setEditModalOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: string) => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  resetFilters: () => void;
}

export type UISlice = UIState & UIActions;

export interface AuthSession {
  token: string | null;
  user: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    [key: string]: any;
  } | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setSession: (token: string, user: AuthSession['user']) => void;
  clearSession: () => void;
}

export type AuthSlice = AuthSession & AuthActions;

export type AppStoreState = UISlice & AuthSlice;
