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
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
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
