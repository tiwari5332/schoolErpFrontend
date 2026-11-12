import { useEffect, useMemo, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import sessionService from '../../../api/services/sessionService';
import { useAppStore, useAuthSession } from '../../../store';
import { toast } from '../../../components/ui/Toast';
import { AcademicSession, CreateSessionPayload, CurrentUserResponse } from '../../../types/session';
import {
  sortSessionsNewestFirst,
  isSuperAdminRole,
  resolveInitialSession,
} from '../utils/sessionValidation';

export { sortSessionsNewestFirst, isSuperAdminRole, resolveInitialSession };

/**
 * 10 minutes cache duration for sessions list as per contract
 */
export const SESSIONS_STALE_TIME = 10 * 60 * 1000;

/**
 * Hook to check if the current user has Super Admin privileges
 */
export function useIsSuperAdmin(): boolean {
  const { user } = useAuthSession();
  const { data: me } = useCurrentUserQuery();

  const role = me?.role || user?.role;
  return isSuperAdminRole(role);
}

/**
 * Parallel query: Fetch current user and preferences (/api/me)
 */
export function useCurrentUserQuery() {
  return useQuery<CurrentUserResponse>({
    queryKey: queryKeys.auth.me(),
    queryFn: () => sessionService.getCurrentUser(),
    staleTime: SESSIONS_STALE_TIME,
    retry: 1,
  });
}

/**
 * Hook: useSessions
 * Fetches and caches academic sessions list (staleTime: 10 mins).
 * Returns sessions sorted newest first.
 */
export function useSessions() {
  const query = useQuery<AcademicSession[]>({
    queryKey: queryKeys.sessions.list(),
    queryFn: () => sessionService.getAcademicSessions(),
    staleTime: SESSIONS_STALE_TIME,
  });

  const sortedSessions = useMemo(() => {
    return query.data ? sortSessionsNewestFirst(query.data) : [];
  }, [query.data]);

  return {
    ...query,
    sessions: query.data || [],
    sortedSessions,
  };
}

/**
 * Hook: useSelectedSession
 * Manages global session state, initial parallel sync from /api/me and /api/academic-sessions,
 * optimistic switching with query invalidation, and rollback on error.
 */
export function useSelectedSession() {
  const queryClient = useQueryClient();
  const { selectedSessionId, selectedSession, setSelectedSessionId, setSelectedSession } = useAppStore();

  const { data: me, isLoading: isMeLoading } = useCurrentUserQuery();
  const { sessions, sortedSessions, isLoading: isSessionsLoading, isError, error, refetch } = useSessions();

  // Find the 'current' designated session
  const currentSession = useMemo(() => {
    return sessions.find(s => s.isCurrent || s.status === 'current') || null;
  }, [sessions]);

  // Keep selectedSession object in sync with selectedSessionId
  useEffect(() => {
    if (sessions.length > 0 && selectedSessionId) {
      const matched = sessions.find(s => s.id === selectedSessionId);
      if (matched && matched.id !== selectedSession?.id) {
        setSelectedSession(matched);
      }
    }
  }, [sessions, selectedSessionId, selectedSession?.id, setSelectedSession]);

  // Initial selection resolution (runs once sessions are loaded)
  const isInitialized = useRef(false);
  useEffect(() => {
    if (sessions.length === 0 || isInitialized.current) return;

    // Rule: me.selectedSessionId, else isCurrent, else first
    const preferredId = me?.selectedSessionId || me?.preferences?.selectedSessionId;
    let targetSession: AcademicSession | undefined;

    if (preferredId) {
      targetSession = sessions.find(s => s.id === preferredId);
    }

    if (!targetSession && selectedSessionId) {
      targetSession = sessions.find(s => s.id === selectedSessionId);
    }

    if (!targetSession) {
      targetSession = currentSession || sessions[0];
    }

    if (targetSession) {
      if (selectedSession?.id !== targetSession.id) {
        setSelectedSession(targetSession);
      }
      if (selectedSessionId !== targetSession.id) {
        setSelectedSessionId(targetSession.id);
      }
      isInitialized.current = true;
    }
  }, [sessions, me, selectedSessionId, selectedSession?.id, currentSession, setSelectedSession, setSelectedSessionId]);

  // Active session object
  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === selectedSessionId) || selectedSession || currentSession || sessions[0] || null;
  }, [sessions, selectedSessionId, selectedSession, currentSession]);

  const isCurrentSelected = useMemo(() => {
    if (!activeSession || !currentSession) return true;
    return activeSession.id === currentSession.id;
  }, [activeSession, currentSession]);

  // Optimistic switch mutation
  const switchMutation = useMutation({
    mutationFn: async (newSessionId: string) => {
      return await sessionService.updateUserPreferences({ selectedSessionId: newSessionId });
    },
    onMutate: async (newSessionId: string) => {
      const prevId = selectedSessionId;
      const prevSession = selectedSession;

      // Optimistically update Zustand store immediately
      const nextSession = sessions.find(s => s.id === newSessionId) || null;
      setSelectedSessionId(newSessionId);
      setSelectedSession(nextSession);

      return { prevId, prevSession, nextSession };
    },
    onSuccess: (_data, _variables, context) => {
      // Invalidate all session-scoped queries
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.fees.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.all });

      const name = context?.nextSession?.name || '';
      toast.success(name ? `Switched to Academic Session ${name}` : 'Academic session switched');
    },
    onError: (err: any, _newSessionId, context) => {
      // Roll back Zustand store to previous session
      if (context) {
        setSelectedSessionId(context.prevId);
        setSelectedSession(context.prevSession);
      }
      const msg = err?.message || 'Failed to switch academic session. Rolled back.';
      toast.error(msg);
    },
  });

  const switchSession = (sessionId: string) => {
    if (sessionId === selectedSessionId) return;
    switchMutation.mutate(sessionId);
  };

  return {
    selectedSessionId: activeSession?.id || selectedSessionId,
    selectedSession: activeSession,
    currentSession,
    isCurrentSelected,
    sessions,
    sortedSessions,
    isLoading: isMeLoading || isSessionsLoading,
    isError,
    error,
    refetch,
    switchSession,
    isSwitching: switchMutation.isPending,
  };
}

/**
 * Hook: useCreateSession
 * Creates a new academic session and invalidates the session cache.
 * Does not auto-switch the selected session.
 */
export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSessionPayload) => sessionService.createAcademicSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
      toast.success('Academic session created successfully!');
    },
    onError: (err: any) => {
      const msg = err?.message || 'Failed to create academic session';
      toast.error(msg);
    },
  });
}

/**
 * Hook: useSetCurrentSession
 * Sets an upcoming session as current and invalidates the session cache.
 */
export function useSetCurrentSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => sessionService.setCurrentSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
      toast.success('Current academic session updated successfully for all users.');
    },
    onError: (err: any) => {
      const msg = err?.message || 'Failed to update current academic session';
      toast.error(msg);
    },
  });
}
