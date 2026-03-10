import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Users, 
  ClipboardCheck, 
  FileText, 
  Calendar,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export function TeacherOverview() {
  const todayClasses = [
    { time: '09:00 AM', subject: 'Mathematics', class: '10-A', room: 'Room 205', status: 'upcoming' },
    { time: '11:00 AM', subject: 'Mathematics', class: '10-B', room: 'Room 205', status: 'upcoming' },
    { time: '02:00 PM', subject: 'Algebra', class: '10-A', room: 'Room 205', status: 'completed' },
  ];

  const recentTests = [
    { subject: 'Mathematics', class: '10-A', test: 'Mid-term Exam', date: '2024-08-25', submitted: 28, total: 30 },
    { subject: 'Algebra', class: '10-B', test: 'Unit Test 3', date: '2024-08-23', submitted: 25, total: 28 },
    { subject: 'Mathematics', class: '10-A', test: 'Weekly Quiz', date: '2024-08-20', submitted: 30, total: 30 },
  ];

  const attendanceStats = [
    { class: '10-A', present: 28, total: 30, percentage: 93 },
    { class: '10-B', present: 25, total: 28, percentage: 89 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome back, John!
          </h1>
          <p className="text-slate-600 mt-2">
            Here's an overview of your classes and student progress for today.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-2">
            <Calendar className="h-3 w-3" />
            Today: Wednesday, August 27, 2025
          </Badge>
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-2">
            <CheckCircle2 className="h-3 w-3" />
            Academic Year 2024-25
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-purple-900">58</p>
                <p className="text-xs text-emerald-600 mt-1">↑ 2 new students</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Today's Classes</p>
                <p className="text-2xl font-bold text-indigo-900">3</p>
                <p className="text-xs text-indigo-600 mt-1">1 completed</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Pending Tests</p>
                <p className="text-2xl font-bold text-cyan-900">5</p>
                <p className="text-xs text-amber-600 mt-1">2 due today</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-cyan flex items-center justify-center shadow-colored-cyan">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-xl hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Attendance</p>
                <p className="text-2xl font-bold text-emerald-900">91%</p>
                <p className="text-xs text-emerald-600 mt-1">↑ 3% this week</p>
              </div>
              <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
                <ClipboardCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    class_.status === 'completed' ? 'bg-emerald-500' : 
                    class_.status === 'ongoing' ? 'bg-amber-500' : 'bg-slate-300'
                  }`}></div>
                  <div>
                    <p className="font-medium text-slate-900">{class_.time}</p>
                    <p className="text-sm text-slate-600">{class_.subject} - {class_.class}</p>
                    <p className="text-xs text-slate-500">{class_.room}</p>
                  </div>
                </div>
                <Badge className={
                  class_.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                  class_.status === 'ongoing' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                  'bg-slate-100 text-slate-800 border-slate-200'
                }>
                  {class_.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full gradient-purple text-white shadow-colored-purple hover:scale-[1.02] transition-all duration-200">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <ClipboardCheck className="h-5 w-5" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceStats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">Class {stat.class}</span>
                  <span className="text-sm text-slate-600">{stat.present}/{stat.total}</span>
                </div>
                <Progress value={stat.percentage} className="h-2 mb-2" />
                <p className="text-xs text-slate-600">{stat.percentage}% present</p>
              </div>
            ))}
            <Button className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Take Attendance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Test Results */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-cyan-900">
            <FileText className="h-5 w-5" />
            Recent Test Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Test</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Class</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Submissions</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTests.map((test, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-white/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{test.test}</p>
                        <p className="text-sm text-slate-600">{test.subject}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {test.class}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{test.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">{test.submitted}/{test.total}</span>
                        <Progress value={(test.submitted / test.total) * 100} className="w-16 h-1" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {test.submitted === test.total ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="hover:bg-cyan-50 hover:border-cyan-300">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}