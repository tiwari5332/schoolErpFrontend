import { StateCreator } from 'zustand';
import { AcademicSession } from '../../types/session';

export interface SessionState {
  selectedSessionId: string | null;
  selectedSession: AcademicSession | null;
}

export interface SessionActions {
  setSelectedSessionId: (id: string | null) => void;
  setSelectedSession: (session: AcademicSession | null) => void;
}

export type SessionSlice = SessionState & SessionActions;

export const createSessionSlice: StateCreator<SessionSlice, [], [], SessionSlice> = (set) => ({
  selectedSessionId: null,
  selectedSession: null,
  setSelectedSessionId: (id) => set({ selectedSessionId: id }),
  setSelectedSession: (session) =>
    set({
      selectedSession: session,
      selectedSessionId: session ? session.id : null,
    }),
});

