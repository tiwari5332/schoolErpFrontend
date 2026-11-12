import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStaffAttendance } from '../hooks/useDashboardQueries';
import { WidgetState } from './WidgetState';
import { StaffAttendanceRecord, StaffAttendanceStatus } from '../../../types/dashboard';

interface StaffAttendanceCardProps {
  selectedDate: string; // "YYYY-MM-DD"
}

export function StaffAttendanceCard({ selectedDate }: StaffAttendanceCardProps) {
  const { data, isLoading, isError, error, refetch } = useStaffAttendance(selectedDate, 5);

  const summary = data?.summary || {
    present: 0,
    absent: 0,
    leave: 0,
    notMarked: 0,
    total: 0,
  };

  const records: StaffAttendanceRecord[] = (data?.records || []).slice(0, 5);

  // Determine if columns are completely empty across records
  const hasDepartments = records.some((r) => Boolean(r.department));
  const hasDesignations = records.some((r) => Boolean(r.designation));
  const hasCheckInTimes = records.some((r) => Boolean(r.checkInTime));

  const getStatusBadge = (status: StaffAttendanceStatus) => {
    switch (status) {
      case 'Present':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold gap-1">
            <CheckCircle2 className="h-2.5 w-2.5" /> Present
          </Badge>
        );
      case 'Absent':
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200 text-[10px] font-semibold gap-1">
            <XCircle className="h-2.5 w-2.5" /> Absent
          </Badge>
        );
      case 'Leave':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-semibold gap-1">
            <Clock className="h-2.5 w-2.5" /> Leave
          </Badge>
        );
      case 'Not marked':
      default:
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 text-[10px] font-medium gap-1">
            <AlertCircle className="h-2.5 w-2.5" /> Not marked
          </Badge>
        );
    }
  };

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-600" />
              <span>Staff Attendance Snapshot</span>
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">
              Date: <strong className="text-slate-700">{selectedDate}</strong>
            </p>
          </div>

          <Link
            to={`/admin/teachers?date=${selectedDate}&tab=employee-attendance`}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Count Chips: Present / Absent / Leave / Not marked */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
          <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-emerald-800">Present</span>
            <span className="text-xs font-bold text-emerald-900">{summary.present}</span>
          </div>
          <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-rose-800">Absent</span>
            <span className="text-xs font-bold text-rose-900">{summary.absent}</span>
          </div>
          <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-blue-800">Leave</span>
            <span className="text-xs font-bold text-blue-900">{summary.leave}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-700">Not marked</span>
            <span className="text-xs font-bold text-slate-800">{summary.notMarked}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <WidgetState
          isLoading={isLoading}
          isError={isError}
          error={error as Error}
          onRetry={refetch}
          isEmpty={records.length === 0}
          emptyMessage="No staff attendance records logged for this date."
          skeletonHeight="h-44"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="pb-2">Staff Member</th>
                  {hasDepartments && <th className="pb-2">Department</th>}
                  {hasDesignations && <th className="pb-2">Designation</th>}
                  {hasCheckInTimes && <th className="pb-2">Check In</th>}
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 ring-1 ring-slate-100">
                          <AvatarImage src={staff.avatar} />
                          <AvatarFallback className="text-[10px] bg-indigo-50 text-indigo-700 font-bold">
                            {(staff.name || 'Staff').split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                          {staff.name}
                        </span>
                      </div>
                    </td>

                    {hasDepartments && (
                      <td className="py-2.5 text-slate-600">
                        {typeof staff.department === 'object' && staff.department
                          ? (staff.department as any).name || '—'
                          : String(staff.department || '—')}
                      </td>
                    )}

                    {hasDesignations && (
                      <td className="py-2.5 text-slate-600">
                        {typeof staff.designation === 'object' && staff.designation
                          ? (staff.designation as any).name || '—'
                          : String(staff.designation || '—')}
                      </td>
                    )}

                    {hasCheckInTimes && (
                      <td className="py-2.5 text-slate-500 font-mono text-[11px]">
                        {staff.checkInTime || '—'}
                      </td>
                    )}

                    <td className="py-2.5 text-right">
                      {getStatusBadge(staff.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetState>
      </CardContent>
    </Card>
  );
}

export default StaffAttendanceCard;

