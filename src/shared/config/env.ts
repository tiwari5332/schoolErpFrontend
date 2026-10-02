/**
 * Typed environment configuration accessor.
 * Single source of truth for environment variables.
 */
export const ENV = {
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
} as const;
