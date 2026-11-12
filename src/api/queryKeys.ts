/**
 * Centralized Query Key Factory
 * Strictly structures query keys into hierarchical tuples to avoid key collisions
 * and provide predictable invalidation scope across all application modules.
 */

export const queryKeys = {
  // Authentication & Session
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
  },

  // Academic Sessions
  sessions: {
    all: ['sessions'] as const,
    list: () => [...queryKeys.sessions.all, 'list'] as const,
  },

  // Attendance Domain
  attendance: {
    all: ['attendance'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.attendance.all, 'list', { filters }] as const,
  },

  // Dashboard Domain
  dashboard: {
    all: ['dashboard'] as const,
    summary: () => [...queryKeys.dashboard.all, 'summary'] as const,
    staffAttendance: (date?: string, limit?: number) =>
      [...queryKeys.dashboard.all, 'staffAttendance', { date, limit }] as const,
    communicationBalance: () =>
      [...queryKeys.dashboard.all, 'communicationBalance'] as const,
    pendingActions: () =>
      [...queryKeys.dashboard.all, 'pendingActions'] as const,
    feeTrend: (days: number) =>
      [...queryKeys.dashboard.all, 'feeTrend', days] as const,
    calendarEvents: (from: string, to: string) =>
      [...queryKeys.dashboard.all, 'calendarEvents', { from, to }] as const,
    upcomingEvents: (days: number, limit: number) =>
      [...queryKeys.dashboard.all, 'upcomingEvents', { days, limit }] as const,
    quickActions: () =>
      [...queryKeys.dashboard.all, 'quickActions'] as const,
  },

  // Student Management Domain
  students: {
    all: ['students'] as const,
    lists: () => [...queryKeys.students.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.students.lists(), { filters }] as const,
    details: () => [...queryKeys.students.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.students.details(), id] as const,
  },

  // Teacher Management Domain
  teachers: {
    all: ['teachers'] as const,
    lists: () => [...queryKeys.teachers.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.teachers.lists(), { filters }] as const,
    detail: (id: string) => [...queryKeys.teachers.all, 'detail', id] as const,
  },

  // Academic Setup & Hierarchy
  academic: {
    all: ['academic'] as const,
    departments: () => [...queryKeys.academic.all, 'departments'] as const,
    classes: () => [...queryKeys.academic.all, 'classes'] as const,
    sections: () => [...queryKeys.academic.all, 'sections'] as const,
    subjects: () => [...queryKeys.academic.all, 'subjects'] as const,
    classSubjects: (classId: string) => [...queryKeys.academic.all, 'classSubjects', classId] as const,
    mappings: () => [...queryKeys.academic.all, 'mappings'] as const,
  },

  // Fee Management Domain
  fees: {
    all: ['fees'] as const,
    lists: () => [...queryKeys.fees.all, 'list'] as const,
    summary: () => [...queryKeys.fees.all, 'summary'] as const,
  },
} as const;

export default queryKeys;
