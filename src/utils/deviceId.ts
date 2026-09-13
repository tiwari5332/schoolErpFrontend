/**
 * Utility to generate or retrieve a unique device identifier for the current browser session.
 * Persists the identifier in localStorage so that backend sessions track the same device.
 */

const DEVICE_ID_KEY = 'app_device_id';

export function getOrCreateDeviceId(): string {
  try {
    const existingDeviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (existingDeviceId && existingDeviceId.trim() !== '') {
      return existingDeviceId;
    }

    // Generate a fresh unique identifier using crypto.randomUUID if available, else standard fallback
    let newDeviceId: string;
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      newDeviceId = `web-${crypto.randomUUID()}`;
    } else {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 10);
      newDeviceId = `web-${timestamp}-${randomStr}`;
    }

    localStorage.setItem(DEVICE_ID_KEY, newDeviceId);
    return newDeviceId;
  } catch (error) {
    console.warn('[deviceId] Failed to access localStorage, returning fallback ID', error);
    return 'web-browser-fallback';
  }
}
