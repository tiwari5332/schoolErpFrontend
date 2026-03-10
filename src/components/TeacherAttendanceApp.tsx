import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  UserCheck, UserX, Clock, Calendar, Search, Filter, Download,
  CheckCircle, XCircle, AlertCircle, TrendingUp, Users, Eye,
  ChevronLeft, BarChart3, FileText, Send, MessageSquare
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | null;
  avatar: string;
  parentContact?: string;
}

export function TeacherAttendanceApp() {
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReport, setShowReport] = useState(false);

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Emma Wilson', rollNumber: '001', status: null, avatar: '👧', parentContact: '+1234567890' },
    { id: '2', name: 'Liam Johnson', rollNumber: '002', status: null, avatar: '👦', parentContact: '+1234567891' },
    { id: '3', name: 'Olivia Brown', rollNumber: '003', status: null, avatar: '👧', parentContact: '+1234567892' },
    { id: '4', name: 'Noah Davis', rollNumber: '004', status: null, avatar: '👦', parentContact: '+1234567893' },
    { id: '5', name: 'Ava Martinez', rollNumber: '005', status: null, avatar: '👧', parentContact: '+1234567894' },
    { id: '6', name: 'Ethan Garcia', rollNumber: '006', status: null, avatar: '👦', parentContact: '+1234567895' },
    { id: '7', name: 'Sophia Rodriguez', rollNumber: '007', status: null, avatar: '👧', parentContact: '+1234567896' },
    { id: '8', name: 'Mason Hernandez', rollNumber: '008', status: null, avatar: '👦', parentContact: '+1234567897' },
    { id: '9', name: 'Isabella Lopez', rollNumber: '009', status: null, avatar: '👧', parentContact: '+1234567898' },
    { id: '10', name: 'James Wilson', rollNumber: '010', status: null, avatar: '👦', parentContact: '+1234567899' },
    { id: '11', name: 'Mia Anderson', rollNumber: '011', status: null, avatar: '👧', parentContact: '+1234567800' },
    { id: '12', name: 'Lucas Thomas', rollNumber: '012', status: null, avatar: '👦', parentContact: '+1234567801' },
  ]);

  const classes = [
    'Class 10-A',
    'Class 10-B',
    'Class 9-A',
    'Class 9-B',
    'Class 8-A'
  ];

  const weeklyData = [
    { day: 'Mon', present: 28, absent: 2, late: 0 },
    { day: 'Tue', present: 27, absent: 1, late: 2 },
    { day: 'Wed', present: 29, absent: 0, late: 1 },
    { day: 'Thu', present: 26, absent: 3, late: 1 },
    { day: 'Fri', present: 28, absent: 2, late: 0 },
  ];

  const monthlyTrend = [
    { week: 'Week 1', attendance: 93 },
    { week: 'Week 2', attendance: 95 },
    { week: 'Week 3', attendance: 91 },
    { week: 'Week 4', attendance: 94 },
  ];

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, status: 'present' })));
  };

  const resetAttendance = () => {
    setStudents(students.map(student => ({ ...student, status: null })));
  };

  const submitAttendance = () => {
    const unmarked = students.filter(s => s.status === null).length;
    if (unmarked > 0) {
      alert(`Please mark attendance for ${unmarked} student(s)`);
      return;
    }
    alert('Attendance submitted successfully! Parents have been notified.');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.includes(searchQuery)
  );

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const unmarkedCount = students.filter(s => s.status === null).length;

  const attendancePercentage = students.length > 0 
    ? Math.round((presentCount / students.length) * 100) 
    : 0;

  const pieData = [
    { name: 'Present', value: presentCount, color: '#10b981' },
    { name: 'Absent', value: absentCount, color: '#ef4444' },
    { name: 'Late', value: lateCount, color: '#f59e0b' },
    { name: 'Unmarked', value: unmarkedCount, color: '#94a3b8' },
  ];

  if (showReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowReport(false)}
              className="border-slate-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Attendance
            </Button>
            <Button className="gradient-indigo text-white shadow-colored-indigo">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Report Header */}
          <Card className="border-0 shadow-lg glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-bold text-slate-900 mb-2">
                    Attendance Report - {selectedClass}
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    Comprehensive attendance analytics and insights
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 mb-1">Academic Year 2025-26</div>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    Current Month: March 2026
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Weekly Attendance Chart */}
          <Card className="border-0 shadow-lg glass-card">
            <CardHeader>
              <CardTitle className="font-medium text-slate-900">
                Weekly Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" name="Present" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="border-0 shadow-lg glass-card">
            <CardHeader>
              <CardTitle className="font-medium text-slate-900">
                Monthly Attendance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    name="Attendance %"
                    dot={{ fill: '#6366f1', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Student-wise Attendance */}
          <Card className="border-0 shadow-lg glass-card">
            <CardHeader>
              <CardTitle className="font-medium text-slate-900">
                Student-wise Attendance Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Roll No.</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">Present Days</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">Absent Days</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">Attendance %</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      const presentDays = Math.floor(Math.random() * 5) + 18;
                      const totalDays = 22;
                      const percentage = Math.round((presentDays / totalDays) * 100);
                      
                      return (
                        <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{student.avatar}</div>
                              <span className="text-sm font-medium text-slate-900">{student.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-slate-600">{student.rollNumber}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-emerald-600 font-medium">{presentDays}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-rose-600 font-medium">{totalDays - presentDays}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-medium text-slate-900">{percentage}%</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className={
                              percentage >= 90 
                                ? 'bg-emerald-100 text-emerald-700'
                                : percentage >= 75
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-rose-100 text-rose-700'
                            }>
                              {percentage >= 90 ? 'Excellent' : percentage >= 75 ? 'Good' : 'At Risk'}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Digital Attendance System
          </h1>
          <p className="text-slate-600">Mark attendance quickly and notify parents instantly</p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Class Selection */}
          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-4">
              <label className="text-sm font-medium text-slate-600 mb-2 block">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-4">
              <label className="text-sm font-medium text-slate-600 mb-2 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-4">
              <label className="text-sm font-medium text-slate-600 mb-2 block">Search Student</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{students.length}</div>
                  <div className="text-xs text-slate-600">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg gradient-emerald flex items-center justify-center shadow-colored-emerald">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-emerald-600">{presentCount}</div>
                  <div className="text-xs text-slate-600">Present</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg gradient-rose flex items-center justify-center shadow-colored-rose">
                  <XCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-rose-600">{absentCount}</div>
                  <div className="text-xs text-slate-600">Absent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg gradient-amber flex items-center justify-center shadow-colored-amber">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-amber-600">{lateCount}</div>
                  <div className="text-xs text-slate-600">Late</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg gradient-indigo flex items-center justify-center shadow-colored-indigo">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-indigo-600">{attendancePercentage}%</div>
                  <div className="text-xs text-slate-600">Attendance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-medium text-slate-900">
                    Mark Attendance - {selectedClass}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={markAllPresent}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark All Present
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetAttendance}
                      className="border-slate-300"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      student.status === 'present'
                        ? 'border-emerald-300 bg-emerald-50'
                        : student.status === 'absent'
                        ? 'border-rose-300 bg-rose-50'
                        : student.status === 'late'
                        ? 'border-amber-300 bg-amber-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{student.avatar}</div>
                        <div>
                          <div className="font-medium text-slate-900">{student.name}</div>
                          <div className="text-sm text-slate-600">Roll No: {student.rollNumber}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => markAttendance(student.id, 'present')}
                          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all ${
                            student.status === 'present'
                              ? 'bg-emerald-600 text-white shadow-lg scale-110'
                              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                          }`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => markAttendance(student.id, 'late')}
                          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all ${
                            student.status === 'late'
                              ? 'bg-amber-600 text-white shadow-lg scale-110'
                              : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                          }`}
                        >
                          <Clock className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => markAttendance(student.id, 'absent')}
                          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all ${
                            student.status === 'absent'
                              ? 'bg-rose-600 text-white shadow-lg scale-110'
                              : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                          }`}
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Summary & Actions */}
          <div className="space-y-6">
            {/* Attendance Summary Chart */}
            <Card className="border-0 shadow-lg glass-card">
              <CardHeader>
                <CardTitle className="font-medium text-slate-900 text-center">
                  Today's Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-slate-600">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-0 shadow-lg glass-card">
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={submitAttendance}
                  className="w-full gradient-indigo text-white shadow-colored-indigo"
                  disabled={unmarkedCount > 0}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit & Notify Parents
                </Button>
                <Button
                  onClick={() => setShowReport(true)}
                  variant="outline"
                  className="w-full border-slate-300"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export to Excel
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            {unmarkedCount > 0 && (
              <Card className="border-0 shadow-lg bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 mb-1">
                        {unmarkedCount} student(s) unmarked
                      </p>
                      <p className="text-xs text-amber-700">
                        Please mark attendance for all students before submitting.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
