export const AUTH_TOKEN_KEY = 'auth_token';
export const ALT_AUTH_TOKEN_KEY = 'authToken';
export const REMEMBER_ME_KEY = 'remember_me';
export const REMEMBERED_EMAIL_KEY = 'remembered_email';
export const USER_INFO_KEY = 'user_info';

/**
 * Retrieves stored auth token from localStorage or sessionStorage.
 */
export const getStoredAuthToken = (): string | null => {
  try {
    return (
      localStorage.getItem(AUTH_TOKEN_KEY) ||
      localStorage.getItem(ALT_AUTH_TOKEN_KEY) ||
      sessionStorage.getItem(AUTH_TOKEN_KEY) ||
      sessionStorage.getItem(ALT_AUTH_TOKEN_KEY)
    );
  } catch (e) {
    console.warn('[authStorage] Error retrieving auth token:', e);
    return null;
  }
};

/**
 * Stores auth token depending on rememberMe preference.
 */
export const setStoredAuthToken = (token: string, rememberMe: boolean = true) => {
  try {
    if (rememberMe) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(ALT_AUTH_TOKEN_KEY);
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(ALT_AUTH_TOKEN_KEY);
    }
  } catch (e) {
    console.warn('[authStorage] Error setting auth token:', e);
  }
};

/**
 * Retrieves stored user information.
 */
export const getStoredUserInfo = (): any | null => {
  try {
    const raw = localStorage.getItem(USER_INFO_KEY) || sessionStorage.getItem(USER_INFO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('[authStorage] Error retrieving user info:', e);
    return null;
  }
};

/**
 * Stores user info depending on rememberMe preference.
 */
export const setStoredUserInfo = (user: any, rememberMe: boolean = true) => {
  try {
    const str = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(USER_INFO_KEY, str);
      sessionStorage.removeItem(USER_INFO_KEY);
    } else {
      sessionStorage.setItem(USER_INFO_KEY, str);
      localStorage.removeItem(USER_INFO_KEY);
    }
  } catch (e) {
    console.warn('[authStorage] Error setting user info:', e);
  }
};

/**
 * Retrieves remembered credentials if rememberMe flag is set to true.
 */
export const getRememberedCredentials = (): { email: string; rememberMe: boolean } => {
  try {
    const isRemembered = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    const email = localStorage.getItem(REMEMBERED_EMAIL_KEY) || '';
    return {
      email: isRemembered ? email : '',
      rememberMe: isRemembered
    };
  } catch (e) {
    return { email: '', rememberMe: false };
  }
};

/**
 * Persists or clears remembered credentials.
 */
export const setRememberedCredentials = (email: string, rememberMe: boolean) => {
  try {
    if (rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY);
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
  } catch (e) {
    console.warn('[authStorage] Error setting remembered credentials:', e);
  }
};

/**
 * Clears session data (tokens & user info) on logout.
 * Note: Preserves remembered credentials (email & remember_me flag) so prefill works on subsequent logins.
 */
export const clearAuthSession = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(ALT_AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(ALT_AUTH_TOKEN_KEY);
    sessionStorage.removeItem(USER_INFO_KEY);
  } catch (e) {
    console.warn('[authStorage] Error clearing auth session:', e);
  }
};
