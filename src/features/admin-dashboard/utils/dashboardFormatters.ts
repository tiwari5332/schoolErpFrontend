import { QuickActionItem } from '../../../types/dashboard';

/**
 * Formats currency from paise into INR format (e.g. 1670000 paise -> ₹ 16,700)
 */
export function formatPaiseToRupees(paise: number | null | undefined): string {
  if (paise === null || paise === undefined || isNaN(paise)) return '—';
  const rupees = Math.round(paise / 100);
  const formatted = new Intl.NumberFormat('en-IN').format(rupees);
  return `₹ ${formatted}`;
}

/**
 * Extracts first name from a full name string, safely stripping any stray suffixes
 */
export function extractFirstName(fullName?: string | null): string {
  if (!fullName || typeof fullName !== 'string') return 'Admin';
  const clean = fullName
    .replace(/enter college/gi, '')
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  return parts[0] || 'Admin';
}

/**
 * Formats greeting based on user's local hour:
 * < 12: Morning
 * < 17: Afternoon
 * >= 17: Evening
 * Format: "Good Morning, {firstName}"
 */
export function getGreeting(fullName?: string | null, localHour?: number): string {
  const hour = typeof localHour === 'number' ? localHour : new Date().getHours();
  let salutation = 'Good Evening';
  if (hour < 12) {
    salutation = 'Good Morning';
  } else if (hour < 17) {
    salutation = 'Good Afternoon';
  }
  const firstName = extractFirstName(fullName);
  return `${salutation}, ${firstName}`;
}

/**
 * Formats a server date "YYYY-MM-DD" into human readable format, e.g. "8 November 2026, Sunday"
 */
export function formatServerDate(dateStr: string): string {
  if (!dateStr) return '';
  const clean = String(dateStr).split('T')[0];
  const [year, month, day] = clean.split('-').map(Number);
  if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) return String(dateStr);
  try {
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return String(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  } catch {
    return String(dateStr);
  }
}

/**
 * Compares two date strings "YYYY-MM-DD" or Date objects
 */
export function isSameDate(
  d1: string | Date | null | undefined,
  d2: string | Date | null | undefined
): boolean {
  if (!d1 || !d2) return false;
  const str1 = typeof d1 === 'string' ? d1.split('T')[0] : d1.toISOString().split('T')[0];
  const str2 = typeof d2 === 'string' ? d2.split('T')[0] : d2.toISOString().split('T')[0];
  return str1 === str2;
}

/**
 * Checks if a date is in the future compared to a reference date string
 */
export function isDateInFuture(dateStr: string, referenceDateStr: string): boolean {
  if (!dateStr || !referenceDateStr) return false;
  return new Date(dateStr).getTime() > new Date(referenceDateStr).getTime();
}

/**
 * Filters quick actions based on the current user's role
 */
export function filterAllowedQuickActions(
  actions: QuickActionItem[],
  userRole?: string | null
): QuickActionItem[] {
  if (!actions || actions.length === 0) return [];
  const normalizedRole = (userRole || 'admin').toLowerCase().replace(/[-_ ]/g, '');

  return actions.filter((action) => {
    if (!action.rolesAllowed || action.rolesAllowed.length === 0) return true;
    return action.rolesAllowed.some((r) => {
      const allowed = r.toLowerCase().replace(/[-_ ]/g, '');
      return (
        allowed === normalizedRole ||
        allowed === 'all' ||
        (normalizedRole === 'superadmin' && allowed.includes('admin'))
      );
    });
  });
}
