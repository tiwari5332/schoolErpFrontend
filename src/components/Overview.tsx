import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Users,
  GraduationCap,
  DollarSign,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  FileText,
  CreditCard,
  MessageSquare,
  Award,
  Send,
  Mail,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageSync } from '../services/LocalStorageSync';
import { useTeachersList } from '../api/queries/useTeachersQuery';

export function Overview() {
  const navigate = useNavigate();
  const { teachers: apiTeachers } = useTeachersList();
  const teachers = apiTeachers || [];

  // Local storage queries
  const students = useMemo(() => LocalStorageSync.get<any[]>('edu_trio_students') || [], []);
  const fees = useMemo(() => LocalStorageSync.get<any[]>('edu_trio_fees') || [], []);
  const attendanceRecords = useMemo(() => LocalStorageSync.get<any[]>('edu_trio_attendance_records') || [], []);

  const totalStudents = students.length;
  const totalTeachers = teachers.length;

  const todayFees = useMemo(() => {
    return fees.reduce((sum, f) => sum + (f.amountPaid || 0), 0);
  }, [fees]);

  const presentPercentage = useMemo(() => {
    if (attendanceRecords.length === 0) return 0;
    const present = attendanceRecords.filter((r) => r.status === 'Present').length;
    return Math.round((present / attendanceRecords.length) * 100);
  }, [attendanceRecords]);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 20)); // September 2026
  const [selectedDay, setSelectedDay] = useState<number>(20);

  // Events state
  const [events, setEvents] = useState<{ id: string; title: string; date: string }[]>([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  // Top Up Modal state
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>('SMS');
  const [creditsMap, setCreditsMap] = useState<Record<string, number>>({
    SMS: 200,
    WhatsApp: 0,
    Email: 0,
  });

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-based index

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const handlePrevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };
  const handleNextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim()) return;
    const newEvt = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: `${selectedDay} ${monthNames[month]} ${year}`,
    };
    setEvents((prev) => [...prev, newEvt]);
    setNewEventTitle('');
    setShowAddEventModal(false);
  };

  const handleTopUpConfirm = () => {
    setCreditsMap((prev) => ({
      ...prev,
      [selectedChannel]: (prev[selectedChannel] || 0) + 500,
    }));
    setShowTopUpModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ═══ 4 KPI Metric Cards Row ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Students */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 rounded-2xl p-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-700">Total Students</p>
              <h3 className="text-2xl font-bold text-blue-950 mt-1">{totalStudents}</h3>
              <p className="text-[11px] text-blue-600/80 mt-1">Enrolled this session</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>

        {/* Staff */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 rounded-2xl p-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700">Staff</p>
              <h3 className="text-2xl font-bold text-emerald-950 mt-1">{totalTeachers || 1}</h3>
              <p className="text-[11px] text-emerald-600/80 mt-1">Active staff members</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </Card>

        {/* Fees Collected Today */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 rounded-2xl p-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700">Fees Collected Today</p>
              <h3 className="text-2xl font-bold text-amber-950 mt-1">₹ {todayFees}</h3>
              <p className="text-[11px] text-amber-600/80 mt-1">Today's collection</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </Card>

        {/* Student Attendance */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 rounded-2xl p-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-purple-700">Student Attendance</p>
              <h3 className="text-2xl font-bold text-purple-950 mt-1">{presentPercentage} %</h3>
              <p className="text-[11px] text-purple-600/80 mt-1">Present today</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* ═══ Main Content Grid (Left 2 Cols, Right 1 Col) ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Actions & Employee Attendance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Card */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl p-6">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Access your most-used ERP modules</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Student Management */}
              <div
                onClick={() => navigate('/admin/students')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Student Management</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              {/* Fees Management */}
              <div
                onClick={() => navigate('/admin/fees')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-amber-50/50 hover:border-amber-200 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <DollarSign className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Fees Management</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              {/* Staff Management */}
              <div
                onClick={() => navigate('/admin/teachers')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50/50 hover:border-emerald-200 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Staff Management</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              {/* Assignment & Notices */}
              <div
                onClick={() => navigate('/admin/communication')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-sky-50/50 hover:border-sky-200 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    <Send className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Assignment & Notices</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              {/* Progress Report */}
              <div
                onClick={() => navigate('/admin/students')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-purple-50/50 hover:border-purple-200 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Progress Report</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              {/* Attendance Management */}
              <div
                onClick={() => navigate('/admin/attendance')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-rose-50/50 hover:border-rose-200 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <CalendarIcon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Attendance Management</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </Card>

          {/* Employee Attendance Table */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Employee Attendance</h2>
                <p className="text-xs text-slate-500 mt-0.5">Live attendance snapshot for the selected day</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/teachers')}
                className="rounded-xl border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 gap-1.5"
              >
                View All <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-sky-50/50 text-xs font-semibold text-slate-600 rounded-xl">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Name</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Designation</th>
                    <th className="py-3 px-4 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teachers.length === 0 ? (
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-slate-800 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                          👤
                        </div>
                        <span>Test</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="outline" className="border-slate-300 text-slate-600 font-normal rounded-md">
                          Not marked
                        </Badge>
                      </td>
                    </tr>
                  ) : (
                    teachers.slice(0, 5).map((t, idx) => (
                      <tr key={t.id || idx}>
                        <td className="py-3.5 px-4 font-medium text-slate-800 flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                            {t.name ? t.name[0] : 'T'}
                          </div>
                          <span>{t.name || 'Staff Member'}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{t.department || '—'}</td>
                        <td className="py-3.5 px-4 text-slate-600">{t.designation || '—'}</td>
                        <td className="py-3.5 px-4">
                          <Badge variant="outline" className="border-slate-300 text-slate-600 font-normal rounded-md">
                            Not marked
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Communication Balance Card */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl p-6">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800">Communication Balance</h2>
              <p className="text-xs text-slate-500 mt-0.5">Keep messaging credits healthy across channels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* SMS Card */}
              <div className="p-4 rounded-xl border border-slate-100 bg-white flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">SMS</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Used: 0</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{creditsMap.SMS}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Available credits</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedChannel('SMS');
                    setShowTopUpModal(true);
                  }}
                  className="w-full rounded-xl border-slate-200 text-xs text-slate-700 hover:bg-slate-50 h-8"
                >
                  Top Up
                </Button>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl border border-slate-100 bg-white flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">WhatsApp</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                    No Balance
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Used: 0</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{creditsMap.WhatsApp}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Available credits</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedChannel('WhatsApp');
                    setShowTopUpModal(true);
                  }}
                  className="w-full rounded-xl border-slate-200 text-xs text-slate-700 hover:bg-slate-50 h-8"
                >
                  Top Up
                </Button>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl border border-slate-100 bg-white flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600">Email</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                    No Balance
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Used: 0</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{creditsMap.Email}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Available credits</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedChannel('Email');
                    setShowTopUpModal(true);
                  }}
                  className="w-full rounded-xl border-slate-200 text-xs text-slate-700 hover:bg-slate-50 h-8"
                >
                  Top Up
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Calendar Widget & Upcoming Events */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden bg-white">
            {/* Dark Blue Header */}
            <div className="bg-indigo-900 text-white p-5">
              <h3 className="text-lg font-bold">Calendar</h3>
              <p className="text-xs text-indigo-200 mt-1">
                Today • {selectedDay} {monthNames[month]} {year}, Sunday
              </p>
            </div>

            {/* Calendar Body */}
            <div className="p-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <button onClick={handlePrevYear} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                    <ChevronsLeft className="h-4 w-4" />
                  </button>
                  <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {monthNames[month]} {year}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button onClick={handleNextYear} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                    <ChevronsRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-500 mb-2">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 text-center text-xs gap-y-1">
                {/* Empty cells before month start */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="py-1.5" />
                ))}

                {/* Days of current month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = dayNum === selectedDay;
                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDay(dayNum)}
                      className={`py-1.5 rounded-lg font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-700 text-white font-bold shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Upcoming Events Widget */}
          <Card className="border border-slate-200/80 shadow-sm bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Upcoming Events</h3>
              <Button
                onClick={() => setShowAddEventModal(true)}
                size="sm"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 px-3 gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add Event
              </Button>
            </div>

            {events.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                  <CalendarIcon className="h-7 w-7 text-slate-300" />
                </div>
                <p className="text-xs text-slate-400 font-medium">No events scheduled for this month</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {events.map((evt) => (
                  <div key={evt.id} className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100/80 text-xs">
                    <div className="font-semibold text-indigo-900">{evt.title}</div>
                    <div className="text-[11px] text-indigo-600 mt-0.5">{evt.date}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* ═══ Add Event Modal ═══ */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Add Upcoming Event</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Event Title</label>
              <Input
                placeholder="e.g. Science Exhibition, Parent Teacher Meeting"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowAddEventModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleAddEvent} className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                Save Event
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Top Up Credits Modal ═══ */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Top Up {selectedChannel} Credits</h3>
            <p className="text-xs text-slate-500">Recharge 500 messaging credits for your institution.</p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-sm">
              <span className="font-medium text-slate-700">500 Credits Package</span>
              <span className="font-bold text-indigo-700">₹ 250</span>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowTopUpModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleTopUpConfirm} className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                Confirm & Pay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}