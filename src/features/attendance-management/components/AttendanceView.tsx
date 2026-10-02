import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  HelpCircle,
  TrendingUp,
  Calendar as CalendarIcon,
  Search,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronDown,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  GraduationCap,
} from 'lucide-react';
import { LocalStorageSync } from '@/services/LocalStorageSync';
import { useTeachersList } from '@/api/queries/useTeachersQuery';

interface StudentAttendanceRecord {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  mobileNo: string;
  email: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Not Marked';
  time?: string;
}

interface StaffAttendanceRecord {
  id: string;
  name: string;
  department: string;
  designation: string;
  empCode: string;
  mobileNo: string;
  email: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Not Marked';
  time?: string;
}

const DEFAULT_STUDENTS: StudentAttendanceRecord[] = [
  { id: '1', name: 'Aarav Sharma', class: 'Class 10', section: 'A', rollNo: '101', mobileNo: '+91 9876543210', email: 'aarav@example.com', status: 'Not Marked' },
  { id: '2', name: 'Ananya Patel', class: 'Class 10', section: 'A', rollNo: '102', mobileNo: '+91 9876543211', email: 'ananya@example.com', status: 'Not Marked' },
  { id: '3', name: 'Rohan Verma', class: 'Class 10', section: 'B', rollNo: '103', mobileNo: '+91 9876543212', email: 'rohan@example.com', status: 'Not Marked' },
  { id: '4', name: 'Priya Singh', class: 'Class 9', section: 'A', rollNo: '201', mobileNo: '+91 9876543213', email: 'priya@example.com', status: 'Not Marked' },
  { id: '5', name: 'Vikram Joshi', class: 'Class 9', section: 'B', rollNo: '202', mobileNo: '+91 9876543214', email: 'vikram@example.com', status: 'Not Marked' },
];

const DEFAULT_STAFF: StaffAttendanceRecord[] = [
  { id: 'st_1', name: 'Dr. Sarah Connor', department: 'Science & Physics', designation: 'Senior Faculty', empCode: 'EMP001', mobileNo: '+91 9876543201', email: 'sarah@example.com', status: 'Not Marked' },
  { id: 'st_2', name: 'Mr. Rajesh Kumar', department: 'Mathematics', designation: 'Head of Department', empCode: 'EMP002', mobileNo: '+91 9876543202', email: 'rajesh@example.com', status: 'Not Marked' },
  { id: 'st_3', name: 'Ms. Emily Chen', department: 'English', designation: 'Assistant Teacher', empCode: 'EMP003', mobileNo: '+91 9876543203', email: 'emily@example.com', status: 'Not Marked' },
  { id: 'st_4', name: 'Mr. David Miller', department: 'Computer Science', designation: 'Lab Administrator', empCode: 'EMP004', mobileNo: '+91 9876543204', email: 'david@example.com', status: 'Not Marked' },
];

export function AttendanceView() {
  // Target Switcher: Students vs Staff
  const [attendanceTarget, setAttendanceTarget] = useState<'students' | 'staff'>('students');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'attendance' | 'biometric' | 'late'>('dashboard');
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { teachers: apiTeachers } = useTeachersList();

  // Load student attendance records
  const [studentRecords, setStudentRecords] = useState<StudentAttendanceRecord[]>(() => {
    const saved = LocalStorageSync.get<StudentAttendanceRecord[]>('edu_trio_attendance_records');
    if (saved && saved.length > 0) return saved;

    const appStudents = LocalStorageSync.get<any[]>('edu_trio_students') || [];
    if (appStudents.length > 0) {
      return appStudents.map((s, idx) => ({
        id: s.id || `stu_${idx}`,
        name: s.name || `Student ${idx + 1}`,
        class: s.grade || 'Class 10',
        section: s.section || 'A',
        rollNo: s.rollNo || `${100 + idx}`,
        mobileNo: s.phone || '+91 9876543210',
        email: s.email || `${s.name?.toLowerCase().replace(/\s+/g, '')}@example.com`,
        status: 'Not Marked',
      }));
    }
    return DEFAULT_STUDENTS;
  });

  // Load staff attendance records
  const [staffRecords, setStaffRecords] = useState<StaffAttendanceRecord[]>(() => {
    const saved = LocalStorageSync.get<StaffAttendanceRecord[]>('edu_trio_staff_attendance_records');
    if (saved && saved.length > 0) return saved;

    if (apiTeachers && apiTeachers.length > 0) {
      return apiTeachers.map((t, idx) => ({
        id: t.id || `st_${idx}`,
        name: t.name || `Staff Member ${idx + 1}`,
        department: t.department || 'Academic',
        designation: t.designation || 'Teacher',
        empCode: t.employeeCode || `EMP00${idx + 1}`,
        mobileNo: t.phone || '+91 9876543201',
        email: t.email || `${t.name?.toLowerCase().replace(/\s+/g, '')}@example.com`,
        status: 'Not Marked',
      }));
    }
    return DEFAULT_STAFF;
  });

  // Handle status updates
  const handleStudentStatusChange = (id: string, newStatus: 'Present' | 'Absent' | 'Leave' | 'Not Marked') => {
    const updated = studentRecords.map((st) =>
      st.id === id ? { ...st, status: newStatus, time: newStatus !== 'Not Marked' ? '08:30 AM' : undefined } : st
    );
    setStudentRecords(updated);
    LocalStorageSync.set('edu_trio_attendance_records', updated);
  };

  const handleStaffStatusChange = (id: string, newStatus: 'Present' | 'Absent' | 'Leave' | 'Not Marked') => {
    const updated = staffRecords.map((st) =>
      st.id === id ? { ...st, status: newStatus, time: newStatus !== 'Not Marked' ? '08:30 AM' : undefined } : st
    );
    setStaffRecords(updated);
    LocalStorageSync.set('edu_trio_staff_attendance_records', updated);
  };

  const handleMarkAll = (status: 'Present' | 'Absent') => {
    if (attendanceTarget === 'students') {
      const updated = studentRecords.map((st) => ({
        ...st,
        status,
        time: status === 'Present' ? '08:30 AM' : undefined,
      }));
      setStudentRecords(updated);
      LocalStorageSync.set('edu_trio_attendance_records', updated);
    } else {
      const updated = staffRecords.map((st) => ({
        ...st,
        status,
        time: status === 'Present' ? '08:30 AM' : undefined,
      }));
      setStaffRecords(updated);
      LocalStorageSync.set('edu_trio_staff_attendance_records', updated);
    }
  };

  // Filtered list based on current target
  const filteredStudents = useMemo(() => {
    return studentRecords.filter((rec) => {
      const matchClass = selectedClass === 'all' || rec.class.toLowerCase().includes(selectedClass.toLowerCase());
      const matchSection = selectedSection === 'all' || rec.section.toLowerCase() === selectedSection.toLowerCase();
      const matchSearch =
        rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.rollNo.includes(searchTerm) ||
        rec.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchClass && matchSection && matchSearch;
    });
  }, [studentRecords, selectedClass, selectedSection, searchTerm]);

  const filteredStaff = useMemo(() => {
    return staffRecords.filter((rec) => {
      const matchDept = selectedDepartment === 'all' || rec.department.toLowerCase().includes(selectedDepartment.toLowerCase());
      const matchSearch =
        rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [staffRecords, selectedDepartment, searchTerm]);

  // Derived statistics for active target
  const stats = useMemo(() => {
    const records = attendanceTarget === 'students' ? studentRecords : staffRecords;
    const total = records.length;
    const present = records.filter((r) => r.status === 'Present').length;
    const absent = records.filter((r) => r.status === 'Absent').length;
    const leave = records.filter((r) => r.status === 'Leave').length;
    const notMarked = records.filter((r) => r.status === 'Not Marked').length;

    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    const presentPct = total > 0 ? ((present / total) * 100).toFixed(2) : '0.00';
    const absentPct = total > 0 ? ((absent / total) * 100).toFixed(2) : '0.00';
    const leavePct = total > 0 ? ((leave / total) * 100).toFixed(2) : '0.00';
    const notMarkedPct = total > 0 ? ((notMarked / total) * 100).toFixed(2) : '0.00';

    return { total, present, absent, leave, notMarked, rate, presentPct, absentPct, leavePct, notMarkedPct };
  }, [attendanceTarget, studentRecords, staffRecords]);

  // Donut chart data
  const pieData = [
    { name: 'Present', value: stats.present, color: '#3b82f6' },
    { name: 'Absent', value: stats.absent, color: '#ef4444' },
    { name: 'Leave', value: stats.leave, color: '#38bdf8' },
    { name: 'Not Marked', value: stats.notMarked, color: '#f97316' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header with Target Switcher (Students vs Staff) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage real-time attendance, biometric logs, and late arrival records for{' '}
            <span className="font-semibold text-slate-700">
              {attendanceTarget === 'students' ? 'Students' : 'Staff Members'}
            </span>.
          </p>
        </div>

        {/* Segmented Control: Students | Staff */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5 border border-slate-200/80 shadow-inner self-start md:self-auto">
          <button
            onClick={() => setAttendanceTarget('students')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              attendanceTarget === 'students'
                ? 'bg-white text-indigo-600 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <GraduationCap className="h-4 w-4" /> Students Attendance
          </button>
          <button
            onClick={() => setAttendanceTarget('staff')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              attendanceTarget === 'staff'
                ? 'bg-white text-emerald-600 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Users className="h-4 w-4" /> Staff Attendance
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'dashboard'
                ? attendanceTarget === 'students' ? 'border-indigo-600 text-indigo-600' : 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'attendance'
                ? attendanceTarget === 'students' ? 'border-indigo-600 text-indigo-600' : 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {attendanceTarget === 'students' ? 'Student Attendance' : 'Staff Attendance'}
          </button>
          <button
            onClick={() => setActiveTab('biometric')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'biometric'
                ? attendanceTarget === 'students' ? 'border-indigo-600 text-indigo-600' : 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Biometric Attendance
          </button>
          <button
            onClick={() => setActiveTab('late')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'late'
                ? attendanceTarget === 'students' ? 'border-indigo-600 text-indigo-600' : 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Late Attendance
          </button>
          <div className="relative inline-block text-left py-3">
            <span className="text-slate-500 hover:text-slate-700 font-medium text-sm cursor-pointer flex items-center gap-1">
              More <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </span>
          </div>
        </nav>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div
            className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-all ${
              attendanceTarget === 'students'
                ? 'bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400'
                : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/90">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold text-lg">
                    {attendanceTarget === 'students'
                      ? 'Student Attendance Analytics Dashboard'
                      : 'Staff Attendance Analytics Dashboard'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>20 Sep 2026, Sunday</span>
                </div>
              </div>
              <Button
                onClick={() => setActiveTab('attendance')}
                className={`bg-white font-medium text-sm shadow-md transition-all self-start sm:self-auto gap-2 rounded-xl px-5 py-2 ${
                  attendanceTarget === 'students'
                    ? 'text-indigo-700 hover:bg-slate-100'
                    : 'text-emerald-700 hover:bg-slate-100'
                }`}
              >
                {attendanceTarget === 'students' ? 'Student Wise View' : 'Staff Wise View'} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl">
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-slate-400" /> Filter by Date
                </label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>

              {attendanceTarget === 'students' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Class</label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="Class 10">Class 10</SelectItem>
                        <SelectItem value="Class 9">Class 9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Section</label>
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sections</SelectItem>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Science">Science & Physics</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Computer">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Designation</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-sm">
                        <SelectValue placeholder="All Designations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Designations</SelectItem>
                        <SelectItem value="Senior">Senior Faculty</SelectItem>
                        <SelectItem value="Head">Head of Department</SelectItem>
                        <SelectItem value="Assistant">Assistant Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-900 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-purple-200">Today's Present</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{stats.present}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${stats.presentPct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-purple-200 flex justify-between">
                <span>{stats.presentPct}%</span>
                <span>of {stats.total} {attendanceTarget === 'students' ? 'students' : 'staff members'}</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-rose-200">Absent Today</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <UserX className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{stats.absent}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-300 rounded-full" style={{ width: `${stats.absentPct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-rose-200 flex justify-between">
                <span>{stats.absentPct}%</span>
                <span>Quick overview</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-sky-100">On Leave</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{stats.leave}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/60 rounded-full" style={{ width: `${stats.leavePct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-sky-100 flex justify-between">
                <span>{stats.leavePct}%</span>
                <span>Approved leaves</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-amber-100">Not Marked</span>
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold">{stats.notMarked}</div>
              <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/60 rounded-full" style={{ width: `${stats.notMarkedPct}%` }} />
              </div>
              <div className="mt-2 text-[11px] text-amber-100 flex justify-between">
                <span>{stats.notMarkedPct}%</span>
                <span>Needs attention</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border border-slate-200/80 shadow-sm rounded-2xl bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg font-semibold text-slate-800">
                  Today's {attendanceTarget === 'students' ? 'Student' : 'Staff'} Attendance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="h-64 w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600 inline-block" />
                    <span>{stats.presentPct}% Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
                    <span>{stats.absentPct}% Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-sky-400 inline-block" />
                    <span>{stats.leavePct}% Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-orange-500 inline-block" />
                    <span>{stats.notMarkedPct}% Not Marked</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-slate-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Present</div>
                  <div className="text-2xl font-bold text-slate-800">{stats.present}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-rose-50 flex items-center justify-center">
                  <UserX className="h-5 w-5 text-rose-500" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Absent</div>
                  <div className="text-2xl font-bold text-slate-800">{stats.absent}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-sky-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-sky-500" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Leave</div>
                  <div className="text-2xl font-bold text-slate-800">{stats.leave}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Not Marked</div>
                  <div className="text-2xl font-bold text-slate-800">{stats.notMarked}</div>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-sm rounded-2xl p-4 bg-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-500">Total {attendanceTarget === 'students' ? 'Students' : 'Staff'}</div>
                  <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                </div>
              </Card>

              <Card className="border-0 shadow-md rounded-2xl p-4 bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex flex-col justify-between">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-xs text-emerald-100 font-medium">Attendance Rate</div>
                  <div className="text-2xl font-extrabold text-white">{stats.rate}%</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />{' '}
              {attendanceTarget === 'students' ? 'Student Wise Attendance' : 'Staff Wise Attendance'}
            </button>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleMarkAll('Present')}
                size="sm"
                variant="outline"
                className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Mark All Present
              </Button>
              <Button
                onClick={() => handleMarkAll('Absent')}
                size="sm"
                variant="outline"
                className="rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                Mark All Absent
              </Button>
            </div>
          </div>

          <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={
                    attendanceTarget === 'students'
                      ? 'Search by student name, roll no or email...'
                      : 'Search by staff name, employee code or email...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                {attendanceTarget === 'students' ? (
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full md:w-[160px] rounded-xl border-slate-200 h-10 text-sm">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="Class 10">Class 10</SelectItem>
                      <SelectItem value="Class 9">Class 9</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full md:w-[180px] rounded-xl border-slate-200 h-10 text-sm">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Science">Science & Physics</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Computer">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-4 text-sm gap-2">
                  <Filter className="h-4 w-4 text-slate-500" /> More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white overflow-hidden">
            <div className="overflow-x-auto">
              {attendanceTarget === 'students' ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <tr>
                      <th className="py-3.5 px-6">Name</th>
                      <th className="py-3.5 px-4">Class</th>
                      <th className="py-3.5 px-4">Section</th>
                      <th className="py-3.5 px-4">Roll No</th>
                      <th className="py-3.5 px-4">Mobile No.</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                              <Users className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="font-medium text-slate-600">No data found</p>
                            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-slate-800">{st.name}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.class}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.section}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.rollNo}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.mobileNo}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.email}</td>
                          <td className="py-3.5 px-6">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleStudentStatusChange(st.id, 'Present')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  st.status === 'Present'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => handleStudentStatusChange(st.id, 'Absent')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  st.status === 'Absent'
                                    ? 'bg-rose-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-700'
                                }`}
                              >
                                Absent
                              </button>
                              <button
                                onClick={() => handleStudentStatusChange(st.id, 'Leave')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  st.status === 'Leave'
                                    ? 'bg-sky-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-700'
                                }`}
                              >
                                Leave
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <tr>
                      <th className="py-3.5 px-6">Staff Name</th>
                      <th className="py-3.5 px-4">Department</th>
                      <th className="py-3.5 px-4">Designation</th>
                      <th className="py-3.5 px-4">Emp Code</th>
                      <th className="py-3.5 px-4">Mobile No.</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStaff.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                              <Users className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="font-medium text-slate-600">No staff record found</p>
                            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredStaff.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-slate-800">{st.name}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.department}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.designation}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.empCode}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.mobileNo}</td>
                          <td className="py-3.5 px-4 text-slate-600">{st.email}</td>
                          <td className="py-3.5 px-6">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleStaffStatusChange(st.id, 'Present')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  st.status === 'Present'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => handleStaffStatusChange(st.id, 'Absent')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  st.status === 'Absent'
                                    ? 'bg-rose-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-700'
                                }`}
                              >
                                Absent
                              </button>
                              <button
                                onClick={() => handleStaffStatusChange(st.id, 'Leave')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  st.status === 'Leave'
                                    ? 'bg-sky-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-700'
                                }`}
                              >
                                Leave
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: BIOMETRIC */}
      {activeTab === 'biometric' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border border-slate-200 shadow-sm rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Device Status</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">Online</Badge>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {attendanceTarget === 'students' ? 'Gate #1 Biometric Terminal' : 'Staff Main Gate Terminal'}
                  </div>
                  <div className="text-xs text-slate-400">IP: 192.168.1.105</div>
                </div>
              </div>
            </Card>

            <Card className="border border-slate-200 shadow-sm rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Last Synced</span>
                <span className="text-xs text-slate-400">Just now</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {attendanceTarget === 'students' ? '142 Punch Logs' : '48 Punch Logs'}
                  </div>
                  <div className="text-xs text-slate-400">Auto-sync enabled</div>
                </div>
              </div>
            </Card>

            <Card className="border border-slate-200 shadow-sm rounded-2xl p-5 bg-white flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-800">Manual Device Sync</div>
                <div className="text-xs text-slate-400 mt-1">Pull real-time punch logs</div>
              </div>
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                <RefreshCw className="h-4 w-4" /> Sync Now
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 4: LATE ATTENDANCE */}
      {activeTab === 'late' && (
        <div className="space-y-6">
          <Card className="border border-slate-200 shadow-sm rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Late Arrival Records ({attendanceTarget === 'students' ? 'Students' : 'Staff'})
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Members arriving after the designated morning threshold (08:30 AM).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Type / Dept</th>
                    <th className="py-3 px-4">Arrival Time</th>
                    <th className="py-3 px-4">Delay (mins)</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceTarget === 'students' ? (
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-slate-800">Bob Smith</td>
                      <td className="py-3.5 px-4 text-slate-600">Student (Class 10B)</td>
                      <td className="py-3.5 px-4 text-slate-600">08:48 AM</td>
                      <td className="py-3.5 px-4 text-amber-600 font-medium">+18 min</td>
                      <td className="py-3.5 px-4">
                        <Badge className="bg-amber-100 text-amber-700 border-0">Late Warning</Badge>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-slate-800">Mr. David Miller</td>
                      <td className="py-3.5 px-4 text-slate-600">Staff (Computer Science)</td>
                      <td className="py-3.5 px-4 text-slate-600">08:42 AM</td>
                      <td className="py-3.5 px-4 text-amber-600 font-medium">+12 min</td>
                      <td className="py-3.5 px-4">
                        <Badge className="bg-amber-100 text-amber-700 border-0">Late Warning</Badge>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
