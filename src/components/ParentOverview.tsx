import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  Users,
  MessageSquare,
  FileText,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

// Mock student data
const studentInfo = {
  name: "Alice Johnson",
  grade: "Grade 5",
  class: "5A",
  rollNumber: "STU001",
  avatar: ""
};

const attendanceData = [
  { month: 'Jan', percentage: 96 },
  { month: 'Feb', percentage: 94 },
  { month: 'Mar', percentage: 98 },
  { month: 'Apr', percentage: 92 },
  { month: 'May', percentage: 95 },
  { month: 'Jun', percentage: 97 },
];

const gradeData = [
  { subject: 'Mathematics', grade: 92, color: '#6366f1' },
  { subject: 'Science', grade: 88, color: '#10b981' },
  { subject: 'English', grade: 95, color: '#f59e0b' },
  { subject: 'Social Studies', grade: 90, color: '#ef4444' },
  { subject: 'Arts', grade: 96, color: '#a855f7' },
];

const recentActivities = [
  {
    type: 'assignment',
    title: 'Mathematics Quiz submitted',
    score: '18/20',
    time: '2 hours ago',
    status: 'good'
  },
  {
    type: 'attendance',
    title: 'Present in all classes',
    time: 'Today',
    status: 'good'
  },
  {
    type: 'notification',
    title: 'Parent-Teacher meeting scheduled',
    time: 'Tomorrow 2:00 PM',
    status: 'info'
  },
  {
    type: 'assignment',
    title: 'Science project due',
    time: 'Due in 3 days',
    status: 'warning'
  }
];

export function ParentOverview() {
  return (
    <div className="space-y-8">
      {/* Student Info Header */}
      <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
        <CardContent className="p-8 relative">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 ring-4 ring-emerald-100">
              <AvatarImage src={studentInfo.avatar} />
              <AvatarFallback className="gradient-emerald text-white text-2xl font-medium">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                {studentInfo.name}
              </h2>
              <div className="flex items-center gap-4 mt-3">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1 px-3 py-1.5">
                  <Star className="h-3 w-3" />
                  {studentInfo.grade} - {studentInfo.class}
                </Badge>
                <span className="text-sm text-slate-600 font-medium">Roll No: {studentInfo.rollNumber}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                Contact Teacher
              </Button>
              <Button className="gap-2 gradient-emerald text-white shadow-colored-emerald hover:scale-[1.02] transition-all duration-200">
                <FileText className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
          <div className="absolute inset-0 gradient-emerald opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-medium text-emerald-700">Attendance Rate</CardTitle>
            <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-emerald-900 mb-2">95.2%</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-xs font-medium">+2.1%</span>
              </div>
              <span className="text-xs text-slate-600">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
          <div className="absolute inset-0 gradient-indigo opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-medium text-indigo-700">Overall Grade</CardTitle>
            <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
              <Star className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-indigo-900 mb-2">A-</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-slate-600">Average: 92.4%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
          <div className="absolute inset-0 gradient-purple opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-medium text-purple-700">Assignments</CardTitle>
            <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-purple-900 mb-2">8/10</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-slate-600">Completed this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
          <div className="absolute inset-0 gradient-amber opacity-5"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full -translate-y-8 translate-x-8 opacity-20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-medium text-amber-700">Upcoming Events</CardTitle>
            <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-amber-900 mb-2">3</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-slate-600">This week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-xl hover-lift glass-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Attendance Trend
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">Monthly attendance percentage</CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-700 border-emerald-200 gap-2">
                <TrendingUp className="h-3 w-3" />
                95.2% average
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }} 
                  formatter={(value) => [`${value}%`, 'Attendance']}
                />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 3, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl hover-lift glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Subject Performance
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">Current grades by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="subject" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }} 
                  formatter={(value) => [`${value}%`, 'Grade']}
                />
                <Bar dataKey="grade" fill="url(#gradeGradient)" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-xl hover-lift glass-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Recent Activities
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">Latest updates about your child</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                activity.status === 'good' ? 'bg-gradient-to-r from-emerald-50/50 to-green-50/50 border-emerald-100 hover:shadow-colored-emerald' :
                activity.status === 'warning' ? 'bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-100 hover:shadow-colored-amber' :
                'bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-cyan-100 hover:shadow-colored-cyan'
              }`}>
                <div className={`w-3 h-3 rounded-full mt-2 animate-pulse-slow ${
                  activity.status === 'good' ? 'bg-emerald-500' :
                  activity.status === 'warning' ? 'bg-amber-500' :
                  'bg-cyan-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-slate-500">{activity.time}</p>
                    {activity.score && (
                      <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                        {activity.score}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl hover-lift glass-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Quick Actions
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">Common parent tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start h-14 gradient-emerald text-white hover:scale-[1.02] transition-all duration-200 shadow-colored-emerald" size="lg">
              <Calendar className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">View Full Attendance</div>
                <div className="text-xs opacity-90">Detailed attendance records</div>
              </div>
            </Button>
            <Button className="w-full justify-start h-14 gradient-cyan text-white hover:scale-[1.02] transition-all duration-200 shadow-colored-cyan" size="lg">
              <BookOpen className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Check Assignments</div>
                <div className="text-xs opacity-90">View pending tasks</div>
              </div>
            </Button>
            <Button className="w-full justify-start h-14 bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50 hover:scale-[1.02] transition-all duration-200" variant="outline" size="lg">
              <MessageSquare className="h-5 w-5 mr-3 text-purple-500" />
              <div className="text-left">
                <div className="font-medium">Message Teacher</div>
                <div className="text-xs text-slate-500">Direct communication</div>
              </div>
            </Button>
            <Button className="w-full justify-start h-14 bg-white border-2 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50 hover:scale-[1.02] transition-all duration-200" variant="outline" size="lg">
              <Award className="h-5 w-5 mr-3 text-amber-500" />
              <div className="text-left">
                <div className="font-medium">View Certificates</div>
                <div className="text-xs text-slate-500">Academic achievements</div>
              </div>
            </Button>
            <Button className="w-full justify-start h-14 bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:scale-[1.02] transition-all duration-200" variant="outline" size="lg">
              <FileText className="h-5 w-5 mr-3 text-indigo-500" />
              <div className="text-left">
                <div className="font-medium">Download Reports</div>
                <div className="text-xs text-slate-500">Academic progress reports</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Academic Progress Overview */}
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Academic Progress Summary
            </CardTitle>
          </div>
          <CardDescription className="text-sm text-slate-500">Current term performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-900">Term 1 Exams</span>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1">
                  <Star className="h-3 w-3" />
                  Completed
                </Badge>
              </div>
              <div className="relative">
                <Progress value={100} className="h-3" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-500" />
                Average: 92.4% (A-)
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-900">Term 2 Progress</span>
                <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 gap-1">
                  <TrendingUp className="h-3 w-3" />
                  In Progress
                </Badge>
              </div>
              <div className="relative">
                <Progress value={75} className="h-3" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-500" />
                75% complete • 3 weeks remaining
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-900">Final Exams</span>
                <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 gap-1">
                  <Calendar className="h-3 w-3" />
                  Upcoming
                </Badge>
              </div>
              <div className="relative">
                <Progress value={0} className="h-3" />
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                Scheduled for July 2024
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}