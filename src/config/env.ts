/**
 * Centralized Environment Configuration Module.
 * Reads environment variables and performs runtime validation to ensure
 * critical backend endpoints are configured before executing network requests.
 */

const getApiBaseUrl = (): string => {
  const metaEnv = (import.meta as any).env || {};
  const url = metaEnv.VITE_API_BASE_URL || metaEnv.REACT_APP_API_BASE_URL;

  if (!url || typeof url !== 'string' || url.trim() === '') {
    const errorMsg =
      '[Configuration Error]: VITE_API_BASE_URL is missing in environment variables. ' +
      'Please check your .env file or environment configuration.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Remove trailing slash for consistent route formatting
  return url.trim().replace(/\/+$/, '');
};

export const ENV = {
  API_BASE_URL: getApiBaseUrl(),
  IS_DEV: (import.meta as any).env?.DEV ?? true,
  IS_PROD: (import.meta as any).env?.PROD ?? false,
} as const;

export default ENV;
