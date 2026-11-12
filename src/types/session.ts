/**
 * Academic Session Types and API Contract Interfaces
 */

export type SessionStatus = 'upcoming' | 'current' | 'closed';

export interface AcademicSession {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  status: SessionStatus;
  isCurrent: boolean;
}

export interface UserPreferences {
  selectedSessionId?: string;
  [key: string]: any;
}

export interface CurrentUserResponse {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  selectedSessionId?: string;
  preferences?: UserPreferences;
  [key: string]: any;
}

export interface UpdatePreferencesPayload {
  selectedSessionId: string;
}

export interface CreateSessionPayload {
  startDate: string;
  endDate: string;
  name?: string;
  copyFromSessionId?: string;
}

export interface SessionValidationError {
  field?: 'startDate' | 'endDate' | 'name' | 'copyFromSessionId' | 'general';
  message: string;
}

