import httpClient from '../httpClient';
import {
  DashboardSummaryResponse,
  StaffAttendanceResponse,
  CommunicationBalanceResponse,
  PendingActionsResponse,
  FeeTrendResponse,
  CalendarEvent,
  UpcomingEventsResponse,
  CreateCalendarEventPayload,
  QuickActionItem,
} from '../../types/dashboard';

/**
 * Extracts payload whether wrapped in { result: ... }, { data: ... }, or direct response.data
 */
function extractData<T>(response: any): T {
  if (!response) throw new Error('No response received from API');
  if (response.data && typeof response.data === 'object') {
    if ('result' in response.data && response.data.result !== undefined) {
      return response.data.result as T;
    }
    if ('data' in response.data && response.data.data !== undefined) {
      return response.data.data as T;
    }
  }
  return response.data as T;
}

export const dashboardService = {
  /**
   * GET /api/dashboard/summary
   */
  async getSummary(): Promise<DashboardSummaryResponse> {
    const res = await httpClient.get('/api/dashboard/summary');
    return extractData<DashboardSummaryResponse>(res);
  },

  /**
   * GET /api/dashboard/staff-attendance?date=&limit=5
   */
  async getStaffAttendance(date?: string, limit: number = 5): Promise<StaffAttendanceResponse> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (limit) params.append('limit', String(limit));

    const res = await httpClient.get(`/api/dashboard/staff-attendance?${params.toString()}`);
    return extractData<StaffAttendanceResponse>(res);
  },

  /**
   * GET /api/dashboard/communication-balance
   */
  async getCommunicationBalance(): Promise<CommunicationBalanceResponse> {
    const res = await httpClient.get('/api/dashboard/communication-balance');
    return extractData<CommunicationBalanceResponse>(res);
  },

  /**
   * GET /api/dashboard/pending-actions
   */
  async getPendingActions(): Promise<PendingActionsResponse> {
    const res = await httpClient.get('/api/dashboard/pending-actions');
    return extractData<PendingActionsResponse>(res);
  },

  /**
   * GET /api/dashboard/fee-trend?days=7|30
   */
  async getFeeTrend(days: 7 | 30 = 7): Promise<FeeTrendResponse> {
    const res = await httpClient.get(`/api/dashboard/fee-trend?days=${days}`);
    return extractData<FeeTrendResponse>(res);
  },

  /**
   * GET /api/calendar/events?from=&to=
   */
  async getCalendarEvents(from: string, to: string): Promise<CalendarEvent[]> {
    const res = await httpClient.get(
      `/api/calendar/events?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
    const data = extractData<any>(res);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.events)) return data.events;
    return [];
  },

  /**
   * GET /api/events/upcoming?days=30&limit=5
   */
  async getUpcomingEvents(days: number = 30, limit: number = 5): Promise<CalendarEvent[]> {
    const res = await httpClient.get(`/api/events/upcoming?days=${days}&limit=${limit}`);
    const data = extractData<any>(res);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.events)) return data.events;
    return [];
  },

  /**
   * POST /api/calendar/events
   */
  async createCalendarEvent(payload: CreateCalendarEventPayload): Promise<CalendarEvent> {
    const res = await httpClient.post('/api/calendar/events', payload);
    return extractData<CalendarEvent>(res);
  },

  /**
   * GET /api/me/quick-actions
   */
  async getQuickActions(): Promise<QuickActionItem[]> {
    const res = await httpClient.get('/api/me/quick-actions');
    const data = extractData<any>(res);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.actions)) return data.actions;
    return [];
  },

  /**
   * PATCH /api/dashboard/pending-actions/:id/approve
   */
  async approveAction(id: string): Promise<any> {
    const res = await httpClient.patch(`/api/dashboard/pending-actions/${id}/approve`);
    return extractData<any>(res);
  },

  /**
   * PATCH /api/dashboard/pending-actions/:id/reject
   */
  async rejectAction(id: string): Promise<any> {
    const res = await httpClient.patch(`/api/dashboard/pending-actions/${id}/reject`);
    return extractData<any>(res);
  },
};

export default dashboardService;
