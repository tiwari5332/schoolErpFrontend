import httpClient from '../httpClient';
import {
  AcademicSession,
  CurrentUserResponse,
  UpdatePreferencesPayload,
  CreateSessionPayload,
} from '../../types/session';

/**
 * Extracts an array of academic sessions from any backend response structure
 */
function extractSessionsArray(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  if (typeof data === 'object') {
    // 1. Direct array properties
    const directKeys = [
      'result',
      'results',
      'data',
      'sessions',
      'academicSessions',
      'academicYears',
      'items',
      'records',
      'content',
      'rows',
      'payload',
      'list',
    ];

    for (const key of directKeys) {
      if (Array.isArray(data[key])) {
        return data[key];
      }
    }

    // 2. Nested data properties (e.g. data.result, data.sessions, etc.)
    if (data.data && typeof data.data === 'object') {
      if (Array.isArray(data.data)) return data.data;
      for (const key of directKeys) {
        if (Array.isArray(data.data[key])) {
          return data.data[key];
        }
      }
    }

    // 3. Nested result properties (e.g. result.sessions, result.items, etc.)
    if (data.result && typeof data.result === 'object') {
      if (Array.isArray(data.result)) return data.result;
      for (const key of directKeys) {
        if (Array.isArray(data.result[key])) {
          return data.result[key];
        }
      }
    }

    // 4. Any array found in object values
    for (const val of Object.values(data)) {
      if (Array.isArray(val)) {
        return val;
      }
    }
  }

  return [];
}

/**
 * Normalizes raw session object from backend to consistent AcademicSession format
 */
function normalizeAcademicSession(raw: any, index: number = 0): AcademicSession {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `session_${index + 1}`,
      name: `202${4 + index}-2${5 + index}`,
      startDate: `202${4 + index}-04-01`,
      endDate: `202${5 + index}-03-31`,
      status: index === 0 ? 'current' : 'upcoming',
      isCurrent: index === 0,
    };
  }

  const id = String(
    raw.id ||
    raw._id ||
    raw.sessionId ||
    raw.academicSessionId ||
    raw.academicYearId ||
    raw.code ||
    `session_${index + 1}`
  );

  let rawName = String(
    raw.name ||
    raw.academicYear ||
    raw.sessionName ||
    raw.year ||
    raw.title ||
    raw.session ||
    ''
  ).trim();

  // If name has "Session ", remove it for consistent clean "2024-25" display
  rawName = rawName.replace(/^Session\s+/i, '');
  if (!rawName) {
    rawName = `202${4 + index}-2${5 + index}`;
  }

  const startDate = String(raw.startDate || raw.start_date || raw.from || raw.start || '2024-04-01').split('T')[0];
  const endDate = String(raw.endDate || raw.end_date || raw.to || raw.end || '2025-03-31').split('T')[0];

  const isCurrent = Boolean(
    raw.isCurrent ||
    raw.is_current ||
    raw.isCurrentSession ||
    String(raw.status || '').toLowerCase() === 'current' ||
    raw.active
  );

  let status: 'upcoming' | 'current' | 'closed' = 'upcoming';
  const statusStr = String(raw.status || '').toLowerCase().trim();

  if (isCurrent || statusStr === 'current' || statusStr === 'active') {
    status = 'current';
  } else if (statusStr === 'closed' || statusStr === 'completed' || statusStr === 'past' || statusStr === 'inactive') {
    status = 'closed';
  } else if (statusStr === 'upcoming' || statusStr === 'planned' || statusStr === 'future') {
    status = 'upcoming';
  } else {
    // Determine based on dates if status not explicitly provided
    const now = new Date().toISOString().split('T')[0];
    if (endDate < now) {
      status = 'closed';
    } else if (startDate > now) {
      status = 'upcoming';
    } else {
      status = isCurrent ? 'current' : 'upcoming';
    }
  }

  return {
    ...raw,
    id,
    name: rawName,
    startDate,
    endDate,
    status,
    isCurrent,
    copyFromSessionId: raw.copyFromSessionId || undefined,
  };
}

export const sessionService = {
  /**
   * GET /api/academic-sessions
   * Fetches list of all academic sessions directly from backend API
   */
  async getAcademicSessions(): Promise<AcademicSession[]> {
    try {
      const response = await httpClient.get<any>('/api/academic-sessions');
      const rawList = extractSessionsArray(response.data);

      return rawList.map(normalizeAcademicSession);
    } catch (err: any) {
      console.error('[sessionService] Failed to fetch /api/academic-sessions:', err);
      throw err;
    }
  },

  /**
   * GET /api/me
   * Fetches currently authenticated user info and preferences (including selectedSessionId)
   */
  async getCurrentUser(): Promise<CurrentUserResponse> {
    try {
      const response = await httpClient.get<any>('/api/me');
      const data = response.data?.result || response.data?.data || response.data || {};

      return {
        id: String(data.id || data._id || data.userId || 'user_1'),
        name: data.name || data.fullName || data.adminName || 'Administrator',
        email: data.email || data.emailAddress,
        role: data.role || 'Super Admin',
        selectedSessionId: data.selectedSessionId || data.preferences?.selectedSessionId,
        preferences: data.preferences,
      };
    } catch (err: any) {
      console.warn('[sessionService] Failed to fetch /api/me:', err?.message);
      return {
        id: 'user_fallback',
        name: 'Administrator',
        role: 'Super Admin',
      };
    }
  },

  /**
   * PUT /api/me/preferences
   * Persists user preference for selected session
   */
  async updateUserPreferences(payload: UpdatePreferencesPayload): Promise<any> {
    try {
      const response = await httpClient.put('/api/me/preferences', payload);
      return response.data;
    } catch (err: any) {
      if (err?.response?.status === 404) {
        // Fallback to /api/me
        const fallbackRes = await httpClient.put('/api/me', {
          selectedSessionId: payload.selectedSessionId,
          preferences: payload,
        });
        return fallbackRes.data;
      }
      throw err;
    }
  },

  /**
   * POST /api/academic-sessions
   * Super Admin only: Creates a new upcoming academic session
   */
  async createAcademicSession(payload: CreateSessionPayload): Promise<AcademicSession> {
    const response = await httpClient.post<any>('/api/academic-sessions', payload);
    const data = response.data?.result || response.data?.data || response.data;
    return normalizeAcademicSession(data);
  },

  /**
   * PATCH /api/academic-sessions/:id/set-current
   * Super Admin only: Designates a session as the globally active current session
   */
  async setCurrentSession(sessionId: string): Promise<any> {
    const response = await httpClient.patch(`/api/academic-sessions/${sessionId}/set-current`);
    return response.data;
  },
};

export default sessionService;
