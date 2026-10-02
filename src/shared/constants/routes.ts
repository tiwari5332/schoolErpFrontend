export const ROUTES = {
  DEFAULT_ROUTE: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin',
  ATTENDANCE: '/admin/attendance',
  STUDENTS: '/admin/students',
  TEACHERS: '/admin/teachers',
  FEES: '/admin/fees',
  SCHEDULE: '/admin/schedule',
  COMMUNICATION: '/admin/communication',
  ACADEMIC_SETUP: '/admin/academic-setup',
  ADMINS: '/admin/admins',
  PROFILE: '/admin/profile',
  SETTINGS: '/admin/settings',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
