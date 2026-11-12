/**
 * Dashboard Domain Types and API Contract Interfaces
 */

export interface StudentAttendanceSummary {
  percentage: number;
  present: number;
  total: number;
  status: 'marked' | 'not_marked' | 'holiday';
  trend?: string;
  holidayName?: string;
}

export interface MetricCardData {
  total: number;
  trend?: string;
  label?: string;
}

export interface FeeMetricData {
  collectedToday: number; // in paise
  currency: string;
  trend?: string;
  label?: string;
}

export interface StaffMetricData {
  total: number;
  active: number;
  trend?: string;
  label?: string;
}

export interface DashboardSummaryResponse {
  date: string; // Server date: "YYYY-MM-DD"
  students: MetricCardData;
  staff: StaffMetricData;
  fees: FeeMetricData;
  studentAttendance: StudentAttendanceSummary;
  isCurrentSession?: boolean;
}

export type StaffAttendanceStatus = 'Present' | 'Absent' | 'Leave' | 'Not marked';

export interface StaffAttendanceRecord {
  id: string;
  name: string;
  department?: string;
  designation?: string;
  status: StaffAttendanceStatus;
  checkInTime?: string;
  avatar?: string;
}

export interface StaffAttendanceSummaryCounts {
  present: number;
  absent: number;
  leave: number;
  notMarked: number;
  total: number;
}

export interface StaffAttendanceResponse {
  date: string;
  summary: StaffAttendanceSummaryCounts;
  records: StaffAttendanceRecord[];
}

export interface ChannelBalance {
  available: number;
  used: number;
  total: number;
  lowBalance: boolean;
  threshold: number;
}

export interface CommunicationBalanceResponse {
  sms: ChannelBalance;
  whatsapp: ChannelBalance;
  email: ChannelBalance;
}

export type PendingActionType =
  | 'leave_request'
  | 'fee_concession'
  | 'document_verification'
  | 'admission_approval';

export interface PendingActionItem {
  id: string;
  type: PendingActionType;
  title: string;
  description: string;
  requestedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  amount?: number; // for fee concession
  meta?: Record<string, any>;
}

export interface PendingActionsResponse {
  count: number;
  items: PendingActionItem[];
}

export interface FeeTrendPoint {
  date: string;
  label: string; // e.g. "02 Nov"
  amount: number; // in paise
  expected?: number;
}

export interface FeeTrendResponse {
  days: 7 | 30;
  totalCollected: number;
  data: FeeTrendPoint[];
}

export type CalendarEventType = 'event' | 'holiday' | 'exam' | 'meeting' | 'weekly_off';

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string; // "YYYY-MM-DD"
  endDate?: string;
  type: CalendarEventType;
  isHoliday?: boolean;
  isWeeklyOff?: boolean;
  description?: string;
}

export interface UpcomingEventsResponse {
  events: CalendarEvent[];
}

export interface CreateCalendarEventPayload {
  title: string;
  type: CalendarEventType;
  startDate: string;
  endDate?: string;
  description?: string;
  notify?: boolean;
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  modalAction?: 'add_event' | 'collect_fee' | 'mark_attendance';
  rolesAllowed?: string[];
}

export interface DashboardAlert {
  id: string;
  type: 'warning' | 'info' | 'alert';
  title: string;
  message: string;
  actionLabel?: string;
  actionRoute?: string;
}
