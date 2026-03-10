import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  User,
  GraduationCap,
  Target,
  BarChart3
} from "lucide-react";

interface StudentDetailViewProps {
  student: {
    id: string;
    name: string;
    email: string;
    grade: string;
    class: string;
    phone: string;
    address: string;
    status: string;
    admissionDate: string;
    guardian: string;
    avatar: string;
  };
  onClose: () => void;
}

// Mock detailed data for the student
const attendanceData = [
  { month: 'Jan', percentage: 96, present: 22, absent: 1, total: 23 },
  { month: 'Feb', percentage: 94, present: 21, absent: 1, total: 22 },
  { month: 'Mar', percentage: 98, present: 25, absent: 0, total: 25 },
  { month: 'Apr', percentage: 92, present: 21, absent: 2, total: 23 },
  { month: 'May', percentage: 95, present: 23, absent: 1, total: 24 },
  { month: 'Jun', percentage: 97, present: 24, absent: 1, total: 25 },
];

const testResults = [
  { 
    subject: 'Mathematics', 
    grade: 92, 
    color: '#6366f1',
    tests: [
      { name: 'Mid-term Exam', score: 88, maxScore: 100, date: '2024-03-15' },
      { name: 'Unit Test 1', score: 95, maxScore: 100, date: '2024-02-20' },
      { name: 'Quiz 1', score: 18, maxScore: 20, date: '2024-02-05' }
    ]
  },
  { 
    subject: 'Science', 
    grade: 88, 
    color: '#10b981',
    tests: [
      { name: 'Mid-term Exam', score: 85, maxScore: 100, date: '2024-03-18' },
      { name: 'Unit Test 1', score: 90, maxScore: 100, date: '2024-02-22' },
      { name: 'Lab Test', score: 89, maxScore: 100, date: '2024-02-10' }
    ]
  },
  { 
    subject: 'English', 
    grade: 95, 
    color: '#f59e0b',
    tests: [
      { name: 'Mid-term Exam', score: 93, maxScore: 100, date: '2024-03-20' },
      { name: 'Essay Test', score: 96, maxScore: 100, date: '2024-02-25' },
      { name: 'Reading Test', score: 97, maxScore: 100, date: '2024-02-12' }
    ]
  },
  { 
    subject: 'Social Studies', 
    grade: 90, 
    color: '#ef4444',
    tests: [
      { name: 'Mid-term Exam', score: 87, maxScore: 100, date: '2024-03-22' },
      { name: 'Unit Test 1', score: 92, maxScore: 100, date: '2024-02-28' },
      { name: 'Project', score: 91, maxScore: 100, date: '2024-02-15' }
    ]
  },
  { 
    subject: 'Arts', 
    grade: 96, 
    color: '#a855f7',
    tests: [
      { name: 'Practical Exam', score: 94, maxScore: 100, date: '2024-03-25' },
      { name: 'Portfolio Review', score: 98, maxScore: 100, date: '2024-03-01' },
      { name: 'Art Project', score: 96, maxScore: 100, date: '2024-02-18' }
    ]
  },
];

const recentActivities = [
  {
    type: 'test',
    title: 'Mathematics Quiz completed',
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
    type: 'assignment',
    title: 'Science project submitted',
    score: '89/100',
    time: 'Yesterday',
    status: 'good'
  },
  {
    type: 'notification',
    title: 'Parent-Teacher meeting scheduled',
    time: 'Tomorrow 2:00 PM',
    status: 'info'
  }
];

const behaviorData = [
  { name: 'Excellent', value: 60, color: '#10b981' },
  { name: 'Good', value: 30, color: '#06b6d4' },
  { name: 'Needs Improvement', value: 10, color: '#f59e0b' }
];

export function StudentDetailView({ student, onClose }: StudentDetailViewProps) {
  const overallAttendance = 95.2;
  const overallGrade = 92.4;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-indigo-100">
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="gradient-indigo text-white text-2xl font-medium">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">
                  {student.name}
                </h2>
                <div className="flex items-center gap-4 mb-3">
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 gap-1 px-3 py-1.5">
                    <Star className="h-3 w-3" />
                    {student.grade} - {student.class}
                  </Badge>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1 px-3 py-1.5">
                    <CheckCircle className="h-3 w-3" />
                    {student.status}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span>Student ID: {student.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Admission: {new Date(student.admissionDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="self-start">
              Close
            </Button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                <p className="font-medium text-slate-900">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                <p className="font-medium text-slate-900">{student.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Guardian</p>
                <p className="font-medium text-slate-900">{student.guardian}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-colored-emerald hover-lift">
          <div className="absolute inset-0 gradient-emerald opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-emerald flex items-center justify-center shadow-colored-emerald">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-900">{overallAttendance}%</p>
                <p className="text-sm text-emerald-700">Overall Attendance</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              <span className="text-sm text-emerald-600">+2.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
          <div className="absolute inset-0 gradient-indigo opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-900">{overallGrade}%</p>
                <p className="text-sm text-indigo-700">Overall Grade</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-indigo-500" />
              <span className="text-sm text-indigo-600">Grade A- Student</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
          <div className="absolute inset-0 gradient-purple opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-900">15</p>
                <p className="text-sm text-purple-700">Tests Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-purple-600">3 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
          <div className="absolute inset-0 gradient-amber opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-900">8.5</p>
                <p className="text-sm text-amber-700">Avg Performance</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-600">Excellent rank</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="attendance" className="gap-2">
            <Calendar className="h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="academics" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="behavior" className="gap-2">
            <Star className="h-4 w-4" />
            Behavior
          </TabsTrigger>
          <TabsTrigger value="activities" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Monthly Attendance Trend
                </CardTitle>
                <CardDescription>Attendance percentage over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
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
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Detailed Attendance Record
                </CardTitle>
                <CardDescription>Monthly breakdown of attendance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {attendanceData.map((month, index) => (
                  <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-slate-50/50 to-slate-100/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">{month.month} 2024</h4>
                      <Badge className={`${month.percentage >= 95 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                                          month.percentage >= 90 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                          'bg-rose-100 text-rose-800 border-rose-200'}`}>
                        {month.percentage}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-emerald-600 font-medium">{month.present}</p>
                        <p className="text-slate-500">Present</p>
                      </div>
                      <div className="text-center">
                        <p className="text-rose-600 font-medium">{month.absent}</p>
                        <p className="text-slate-500">Absent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-700 font-medium">{month.total}</p>
                        <p className="text-slate-500">Total Days</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Subject Performance
                </CardTitle>
                <CardDescription>Overall grades by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={testResults}>
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
                    <Bar dataKey="grade" fill="#6366f1" radius={6} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Recent Test Results
                </CardTitle>
                <CardDescription>Latest test scores and assessments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {testResults.slice(0, 3).map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900">{subject.subject}</h4>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                        {subject.grade}%
                      </Badge>
                    </div>
                    {subject.tests.slice(0, 2).map((test, testIndex) => (
                      <div key={testIndex} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-200">
                        <div>
                          <p className="font-medium text-sm text-slate-900">{test.name}</p>
                          <p className="text-xs text-slate-500">{new Date(test.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{test.score}/{test.maxScore}</p>
                          <p className="text-xs text-slate-500">{Math.round((test.score / test.maxScore) * 100)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Behavior Assessment
                </CardTitle>
                <CardDescription>Overall behavior evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={behaviorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {behaviorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {behaviorData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-slate-600">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Teacher Comments
                </CardTitle>
                <CardDescription>Recent feedback from teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-emerald-900">Ms. Sarah Wilson</p>
                      <p className="text-xs text-emerald-600">Mathematics Teacher</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">"Alice shows excellent problem-solving skills and always participates actively in class discussions."</p>
                  <p className="text-xs text-slate-500 mt-2">March 20, 2024</p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-indigo-900">Mr. James Rodriguez</p>
                      <p className="text-xs text-indigo-600">Science Teacher</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">"Great improvement in laboratory work. Shows good understanding of scientific concepts."</p>
                  <p className="text-xs text-slate-500 mt-2">March 18, 2024</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-purple-900">Ms. Emily Chen</p>
                      <p className="text-xs text-purple-600">English Teacher</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">"Excellent writing skills and creative thinking. One of the top performers in the class."</p>
                  <p className="text-xs text-slate-500 mt-2">March 15, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Recent Activities & Achievements
              </CardTitle>
              <CardDescription>Latest student activities and accomplishments</CardDescription>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}