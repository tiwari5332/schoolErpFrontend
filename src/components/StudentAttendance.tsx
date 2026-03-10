import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Filter,
  Download,
  AlertTriangle
} from "lucide-react";

// Mock attendance data
const attendanceStats = {
  totalDays: 120,
  present: 114,
  absent: 4,
  late: 2,
  percentage: 95.0
};

const monthlyData = [
  { month: 'Jan', present: 20, absent: 1, late: 0, percentage: 95.2 },
  { month: 'Feb', present: 18, absent: 1, late: 1, percentage: 90.0 },
  { month: 'Mar', present: 22, absent: 0, late: 0, percentage: 100.0 },
  { month: 'Apr', present: 19, absent: 1, late: 1, percentage: 90.5 },
  { month: 'May', present: 21, absent: 1, late: 0, percentage: 95.5 },
  { month: 'Jun', present: 14, absent: 0, late: 0, percentage: 100.0 },
];

const weeklyData = [
  { week: 'Week 1', percentage: 100 },
  { week: 'Week 2', percentage: 80 },
  { week: 'Week 3', percentage: 100 },
  { week: 'Week 4', percentage: 100 },
];

const attendanceRecords = [
  { date: '2024-01-25', status: 'present', time: '8:15 AM', note: 'On time' },
  { date: '2024-01-24', status: 'present', time: '8:10 AM', note: 'On time' },
  { date: '2024-01-23', status: 'late', time: '8:45 AM', note: 'Traffic delay' },
  { date: '2024-01-22', status: 'present', time: '8:05 AM', note: 'On time' },
  { date: '2024-01-21', status: 'absent', time: '-', note: 'Sick leave' },
  { date: '2024-01-20', status: 'present', time: '8:20 AM', note: 'On time' },
  { date: '2024-01-19', status: 'present', time: '8:12 AM', note: 'On time' },
  { date: '2024-01-18', status: 'present', time: '8:08 AM', note: 'On time' },
];

const subjects = ['All Subjects', 'Mathematics', 'Science', 'English', 'Social Studies', 'Arts'];

export function StudentAttendance() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Absent</Badge>;
      case 'late':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Late</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Attendance Tracking</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor your child's school attendance and punctuality</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Present Days</p>
                <p className="text-2xl font-bold text-green-900">{attendanceStats.present}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">Out of {attendanceStats.totalDays} days</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Absent Days</p>
                <p className="text-2xl font-bold text-red-900">{attendanceStats.absent}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-red-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Late Arrivals</p>
                <p className="text-2xl font-bold text-amber-900">{attendanceStats.late}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-1">Work on punctuality</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-900">{attendanceStats.percentage}%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-1">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Monthly Attendance Trend</CardTitle>
                <CardDescription className="text-sm text-gray-500">Attendance percentage by month</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                95.0% average
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                  formatter={(value) => [`${value}%`, 'Attendance']}
                />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Attendance Calendar</CardTitle>
            <CardDescription className="text-sm text-gray-500">Select a date to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-0"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Late</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">This Month's Weekly Progress</CardTitle>
              <CardDescription className="text-sm text-gray-500">Weekly attendance breakdown</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
                formatter={(value) => [`${value}%`, 'Attendance']}
              />
              <Bar dataKey="percentage" fill="#3b82f6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Records */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Attendance Records</CardTitle>
              <CardDescription className="text-sm text-gray-500">Detailed daily attendance history</CardDescription>
            </div>
            <div className="flex gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject.toLowerCase().replace(' ', '-')}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <span className="font-medium text-gray-900">{record.date}</span>
                  </div>
                  <div className="hidden sm:block">
                    {getStatusBadge(record.status)}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{record.time}</span>
                  <span className="hidden md:block">{record.note}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Tips */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold text-blue-900">Attendance Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">For Better Attendance:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Establish a consistent morning routine</li>
                <li>• Prepare school items the night before</li>
                <li>• Ensure adequate sleep schedule</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">School Policy:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Minimum 85% attendance required</li>
                <li>• Notify school of planned absences</li>
                <li>• Medical certificates for sick leave</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}