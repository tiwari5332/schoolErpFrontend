import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '../../../api/queryKeys';
import dashboardService from '../../../api/services/dashboardService';
import { CreateCalendarEventPayload } from '../../../types/dashboard';
import { toast } from '../../../components/ui/Toast';

/**
 * 10 minutes cache duration for dashboard queries.
 * Data remains fresh and cached; never re-fetched unless a related action occurs
 * (e.g. session change, event created, action approved, or manual retry).
 */
const DASHBOARD_CACHE_TIME = 10 * 60 * 1000;

/**
 * 1. Hook for Dashboard Summary (KPIs, student attendance, server date)
 * Cached for 10 mins. Only updated on session switch or manual retry.
 */
export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: () => dashboardService.getSummary(),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 2. Hook for Staff Attendance Snapshot
 * Cached for 10 mins per date. Only updated when date changes or manual retry.
 */
export function useStaffAttendance(date?: string, limit: number = 5) {
  return useQuery({
    queryKey: queryKeys.dashboard.staffAttendance(date, limit),
    queryFn: () => dashboardService.getStaffAttendance(date, limit),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 3. Hook for Communication Balance (SMS, WhatsApp, Email)
 * Cached for 10 mins.
 */
export function useCommunicationBalance() {
  return useQuery({
    queryKey: queryKeys.dashboard.communicationBalance(),
    queryFn: () => dashboardService.getCommunicationBalance(),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 4. Hook for Pending Approvals / Actions
 * Cached for 10 mins. Updated immediately when an action is approved or rejected.
 */
export function usePendingActions() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.dashboard.pendingActions(),
    queryFn: () => dashboardService.getPendingActions(),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => dashboardService.approveAction(id),
    onSuccess: (_, id) => {
      toast.success('Action approved successfully');
      queryClient.setQueryData(queryKeys.dashboard.pendingActions(), (old: any) => {
        if (!old) return old;
        const filtered = (old.items || []).filter((item: any) => item.id !== id);
        return { ...old, count: filtered.length, items: filtered };
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.pendingActions() });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to approve action');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => dashboardService.rejectAction(id),
    onSuccess: (_, id) => {
      toast.success('Action rejected');
      queryClient.setQueryData(queryKeys.dashboard.pendingActions(), (old: any) => {
        if (!old) return old;
        const filtered = (old.items || []).filter((item: any) => item.id !== id);
        return { ...old, count: filtered.length, items: filtered };
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.pendingActions() });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to reject action');
    },
  });

  return {
    ...query,
    approveAction: approveMutation.mutate,
    isApproving: approveMutation.isPending,
    rejectAction: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,
  };
}

/**
 * 5. Hook for Fee Trend Chart (7 vs 30 days)
 * Cached for 10 mins per time window.
 */
export function useFeeTrend(days: 7 | 30 = 7) {
  return useQuery({
    queryKey: queryKeys.dashboard.feeTrend(days),
    queryFn: () => dashboardService.getFeeTrend(days),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 6. Hook for Calendar Events Range
 * Cached for 10 mins per visible date range.
 */
export function useCalendarEvents(from: string, to: string) {
  return useQuery({
    queryKey: queryKeys.dashboard.calendarEvents(from, to),
    queryFn: () => dashboardService.getCalendarEvents(from, to),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(from && to),
  });
}

/**
 * 7. Hook for Upcoming Events (next 30 days)
 * Cached for 10 mins. Updated immediately when a new event is added.
 */
export function useUpcomingEvents(days: number = 30, limit: number = 5) {
  return useQuery({
    queryKey: queryKeys.dashboard.upcomingEvents(days, limit),
    queryFn: () => dashboardService.getUpcomingEvents(days, limit),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * 8. Hook to Create a Calendar Event
 * Invalidates calendar and upcoming events queries upon success.
 */
export function useCreateCalendarEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCalendarEventPayload) =>
      dashboardService.createCalendarEvent(payload),
    onSuccess: () => {
      toast.success('Event added to calendar');
      queryClient.invalidateQueries({ queryKey: [...queryKeys.dashboard.all, 'calendarEvents'] });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.dashboard.all, 'upcomingEvents'] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to create event');
    },
  });
}

/**
 * 9. Hook for Quick Actions (role-allowed)
 * Cached for 10 mins.
 */
export function useQuickActions() {
  return useQuery({
    queryKey: queryKeys.dashboard.quickActions(),
    queryFn: () => dashboardService.getQuickActions(),
    staleTime: DASHBOARD_CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
