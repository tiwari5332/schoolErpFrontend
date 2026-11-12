import { AcademicSession } from '../../../types/session';

/**
 * Auto-suggests session name based on start and end dates
 * e.g., 2027-04-01 to 2028-03-31 -> "2027-28"
 */
export function suggestSessionName(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return '';
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  if (isNaN(startYear) || isNaN(endYear)) return '';

  if (startYear === endYear) return `${startYear}`;
  if (endYear === startYear + 1) {
    return `${startYear}-${endYear.toString().slice(-2)}`;
  }
  return `${startYear}-${endYear}`;
}

/**
 * Helper to check date overlap against existing sessions
 */
export function findOverlappingSession(
  startStr: string,
  endStr: string,
  sessions: AcademicSession[]
): AcademicSession | null {
  const start = new Date(startStr).getTime();
  const end = new Date(endStr).getTime();
  if (isNaN(start) || isNaN(end)) return null;

  for (const session of sessions) {
    const sStart = new Date(session.startDate).getTime();
    const sEnd = new Date(session.endDate).getTime();
    if (!isNaN(sStart) && !isNaN(sEnd)) {
      // Overlap occurs when start <= existingEnd and end >= existingStart
      if (start <= sEnd && end >= sStart) {
        return session;
      }
    }
  }
  return null;
}

/**
 * Sort sessions newest first by startDate descending
 */
export function sortSessionsNewestFirst(sessions: AcademicSession[]): AcademicSession[] {
  return [...sessions].sort((a, b) => {
    const timeA = new Date(a.startDate).getTime() || 0;
    const timeB = new Date(b.startDate).getTime() || 0;
    if (timeB !== timeA) return timeB - timeA;
    return b.name.localeCompare(a.name);
  });
}

/**
 * Check if a role string represents Super Admin
 */
export function isSuperAdminRole(role?: string | null): boolean {
  if (!role) return false;
  const clean = role.toLowerCase().replace(/[-_ ]/g, '');
  return clean === 'superadmin' || clean === 'superadministrator';
}

/**
 * Resolves initial academic session based on priority:
 * 1. me.selectedSessionId
 * 2. isCurrent session
 * 3. first available session
 */
export function resolveInitialSession(
  sessions: AcademicSession[],
  preferredId?: string | null,
  storedId?: string | null
): AcademicSession | null {
  if (!sessions || sessions.length === 0) return null;

  if (preferredId) {
    const matched = sessions.find((s) => s.id === preferredId);
    if (matched) return matched;
  }

  if (storedId) {
    const matched = sessions.find((s) => s.id === storedId);
    if (matched) return matched;
  }

  const current = sessions.find((s) => s.isCurrent || s.status === 'current');
  if (current) return current;

  return sessions[0];
}

