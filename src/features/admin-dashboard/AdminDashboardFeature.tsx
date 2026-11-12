import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  CreditCard,
  CalendarCheck,
} from 'lucide-react';
import {
  useDashboardSummary,
  useQuickActions,
  useCommunicationBalance,
  usePendingActions,
} from './hooks/useDashboardQueries';
import { formatPaiseToRupees } from './utils/dashboardFormatters';
import { KpiCard } from './components/KpiCard';
import { QuickActions } from './components/QuickActions';
import { MiniCalendarAndEvents } from './components/MiniCalendarAndEvents';
import { FeeTrendChart } from './components/FeeTrendChart';
import { PendingApprovals } from './components/PendingApprovals';
import { StaffAttendanceCard } from './components/StaffAttendanceCard';
import { CommunicationBalance } from './components/CommunicationBalance';
import { AlertsStrip } from './components/AlertsStrip';
import { SessionBanner } from './components/SessionBanner';
import { useSelectedSession } from '../academic-sessions/hooks/useSessions';

export function AdminDashboardFeature() {
  const { selectedSession } = useSelectedSession();
  const isCurrentSession = selectedSession?.isCurrent ?? true;

  // 1. Dashboard summary (KPIs, student attendance, server date)
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    error: summaryError,
    refetch: refetchSummary,
  } = useDashboardSummary();

  // 2. Quick actions
  const {
    data: quickActions = [],
    isLoading: isQuickActionsLoading,
    isError: isQuickActionsError,
    error: quickActionsError,
    refetch: refetchQuickActions,
  } = useQuickActions();

  // 3. Alerts dependencies
  const { data: commBalance } = useCommunicationBalance();
  const { data: pendingActions } = usePendingActions();

  // Server date reference ("YYYY-MM-DD")
  const serverDate = summary?.date || '2026-11-08';

  // Date selected from Mini Calendar for staff attendance
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState<string>(serverDate);

  // Add Event Modal controller
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  // ─── Value Computations for KPI Cards ──────────────────────
  const studentsCount = summary?.students?.total !== undefined ? summary.students.total.toLocaleString('en-IN') : '—';
  const staffCount = summary?.staff?.active !== undefined ? summary.staff.active.toLocaleString('en-IN') : '—';
  const feesAmount = summary?.fees?.collectedToday !== undefined ? formatPaiseToRupees(summary.fees.collectedToday) : '—';

  // Student Attendance Value calculation:
  // If status === "holiday": "Holiday / Weekly off"
  // If status === "not_marked": "Not marked yet" with link
  // If missing: "—"
  let attendanceValue: React.ReactNode = '—';
  let attendanceSubtitle: React.ReactNode = 'Present today';

  if (summary?.studentAttendance) {
    const { status, percentage, holidayName, present, total } = summary.studentAttendance;
    if (status === 'holiday') {
      attendanceValue = <span className="text-xl font-bold text-rose-600">Holiday / Weekly off</span>;
      attendanceSubtitle = holidayName || 'No academic sessions scheduled today';
    } else if (status === 'not_marked') {
      attendanceValue = <span className="text-xl font-bold text-amber-600">Not marked yet</span>;
      attendanceSubtitle = (
        <span className="text-indigo-600 font-semibold underline">
          Mark now &rarr;
        </span>
      );
    } else if (percentage !== undefined && percentage !== null) {
      attendanceValue = `${percentage} %`;
      attendanceSubtitle = `${present || 0} of ${total || 0} students present`;
    }
  }

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Non-current session banner */}
      <SessionBanner />

      {/* Alerts Strip (only when low balance, unmarked attendance, or pending actions exist) */}
      <AlertsStrip
        commBalance={commBalance}
        attendance={summary?.studentAttendance}
        pendingActions={pendingActions}
      />

      {/* ═══ ROW 1: 4 KPI Cards ═══ */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Students */}
        <KpiCard
          title="Students"
          value={studentsCount}
          subtitle={summary?.students?.label || 'Total active students'}
          trend={summary?.students?.trend}
          icon={GraduationCap}
          to="/admin/students"
          gradientBg="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50"
          iconBg="bg-indigo-100 text-indigo-700"
          isLoading={isSummaryLoading}
          isError={isSummaryError}
          error={summaryError as Error}
          onRetry={refetchSummary}
          isInactiveSession={!isCurrentSession}
        />

        {/* Card 2: Staff */}
        <KpiCard
          title="Staff"
          value={staffCount}
          subtitle={summary?.staff?.label || 'Active staff members'}
          trend={summary?.staff?.trend}
          icon={Users}
          to="/admin/teachers"
          gradientBg="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50"
          iconBg="bg-emerald-100 text-emerald-700"
          isLoading={isSummaryLoading}
          isError={isSummaryError}
          error={summaryError as Error}
          onRetry={refetchSummary}
          isInactiveSession={!isCurrentSession}
        />

        {/* Card 3: Fees Collected Today */}
        <KpiCard
          title={isCurrentSession ? "Fees Collected Today" : "Session Fee Collection"}
          value={feesAmount}
          subtitle={summary?.fees?.label || (isCurrentSession ? "Today's collection" : "Archived collection")}
          trend={summary?.fees?.trend}
          icon={CreditCard}
          to="/admin/fees"
          gradientBg="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50"
          iconBg="bg-amber-100 text-amber-700"
          isLoading={isSummaryLoading}
          isError={isSummaryError}
          error={summaryError as Error}
          onRetry={refetchSummary}
          isInactiveSession={!isCurrentSession}
          inactiveBadgeText="Session Total"
        />

        {/* Card 4: Student Attendance */}
        <KpiCard
          title={isCurrentSession ? "Student Attendance" : "Session Attendance Rate"}
          value={attendanceValue}
          subtitle={attendanceSubtitle}
          trend={summary?.studentAttendance?.trend}
          icon={CalendarCheck}
          to="/admin/attendance"
          gradientBg="bg-gradient-to-br from-purple-50/70 via-white to-fuchsia-50/50"
          iconBg="bg-purple-100 text-purple-700"
          isLoading={isSummaryLoading}
          isError={isSummaryError}
          error={summaryError as Error}
          onRetry={refetchSummary}
          isInactiveSession={!isCurrentSession}
        />
      </section>

      {/* ═══ ROW 2: Quick Actions (Left 2/3) + Mini Calendar & Upcoming Events (Right 1/3) ═══ */}
      <section aria-label="Quick Actions and Calendar" className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2">
          <QuickActions
            actions={quickActions}
            isLoading={isQuickActionsLoading}
            isError={isQuickActionsError}
            error={quickActionsError as Error}
            onRetry={refetchQuickActions}
            onOpenAddEventModal={() => setIsAddEventOpen(true)}
          />
        </div>
        <div className="lg:col-span-1">
          <MiniCalendarAndEvents
            serverDateStr={serverDate}
            selectedAttendanceDate={selectedAttendanceDate}
            onSelectAttendanceDate={setSelectedAttendanceDate}
            isAddEventOpen={isAddEventOpen}
            setIsAddEventOpen={setIsAddEventOpen}
          />
        </div>
      </section>

      {/* ═══ ROW 3: Fee Collection Trend (Left) + Pending Approvals (Right) ═══ */}
      <section aria-label="Fee Collection Trend and Approvals" className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <FeeTrendChart />
        <PendingApprovals />
      </section>

      {/* ═══ ROW 4: Staff Attendance Snapshot (Left) + Communication Balance (Right) ═══ */}
      <section aria-label="Staff Attendance and Communication Balance" className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <StaffAttendanceCard selectedDate={selectedAttendanceDate} />
        <CommunicationBalance />
      </section>
    </div>
  );
}

export default AdminDashboardFeature;
