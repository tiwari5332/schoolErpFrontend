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
  BarChart3,
  School,
  ChevronRight
} from "lucide-react";

interface TeacherDetailViewProps {
  teacher: {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    subjects: string[];
    classes: string[];
    experience: string;
    qualification: string;
    status: string;
    joinDate: string;
    address: string;
    avatar: string;
  };
  onClose: () => void;
}

// Mock detailed data for the teacher
const classPerformanceData = [
  { class: '5A', averageGrade: 88, studentCount: 25, attendance: 94 },
  { class: '5B', averageGrade: 92, studentCount: 27, attendance: 96 },
  { class: '4A', averageGrade: 85, studentCount: 24, attendance: 93 },
];

const monthlyPerformance = [
  { month: 'Jan', classAverage: 85, attendance: 94, assignments: 12 },
  { month: 'Feb', classAverage: 87, attendance: 95, assignments: 15 },
  { month: 'Mar', classAverage: 89, attendance: 96, assignments: 14 },
  { month: 'Apr', classAverage: 91, attendance: 93, assignments: 16 },
  { month: 'May', classAverage: 88, attendance: 97, assignments: 13 },
  { month: 'Jun', classAverage: 92, attendance: 95, assignments: 18 },
];

const studentDistribution = [
  { grade: 'A (90-100%)', count: 18, color: '#10b981' },
  { grade: 'B (80-89%)', count: 28, color: '#06b6d4' },
  { grade: 'C (70-79%)', count: 15, color: '#f59e0b' },
  { grade: 'D (60-69%)', count: 8, color: '#ef4444' },
  { grade: 'F (<60%)', count: 2, color: '#64748b' }
];

const upcomingSchedule = [
  { time: '09:00 - 09:45', subject: 'Mathematics', class: '5A', room: 'Room 201' },
  { time: '10:00 - 10:45', subject: 'Algebra', class: '5B', room: 'Room 201' },
  { time: '11:15 - 12:00', subject: 'Geometry', class: '4A', room: 'Room 201' },
  { time: '14:00 - 14:45', subject: 'Mathematics', class: '5A', room: 'Room 201' },
];

const achievements = [
  {
    title: 'Best Mathematics Teacher 2023',
    description: 'Awarded for exceptional student performance and innovative teaching methods',
    date: '2023-12-15',
    type: 'award'
  },
  {
    title: 'Professional Development Certification',
    description: 'Completed advanced training in modern teaching methodologies',
    date: '2024-01-20',
    type: 'certification'
  },
  {
    title: 'Student Satisfaction Excellence',
    description: 'Highest student satisfaction rating in Mathematics department',
    date: '2024-02-10',
    type: 'recognition'
  }
];

const recentActivities = [
  {
    type: 'grade',
    title: 'Graded Mathematics Quiz for Class 5A',
    description: 'Average score: 88/100',
    time: '2 hours ago',
    status: 'completed'
  },
  {
    type: 'assignment',
    title: 'Created new Geometry assignment',
    description: 'Due date: Next Friday',
    time: '1 day ago',
    status: 'active'
  },
  {
    type: 'meeting',
    title: 'Parent-Teacher conference scheduled',
    description: 'Meeting with Alice Johnson\'s parents',
    time: 'Tomorrow 2:00 PM',
    status: 'upcoming'
  },
  {
    type: 'attendance',
    title: 'Submitted attendance for all classes',
    description: '98% average attendance this week',
    time: '3 days ago',
    status: 'completed'
  }
];

export function TeacherDetailView({ teacher, onClose }: TeacherDetailViewProps) {
  const totalStudents = classPerformanceData.reduce((sum, cls) => sum + cls.studentCount, 0);
  const averageClassPerformance = Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.averageGrade, 0) / classPerformanceData.length);
  const averageAttendance = Math.round(classPerformanceData.reduce((sum, cls) => sum + cls.attendance, 0) / classPerformanceData.length);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-emerald-100">
                <AvatarImage src={teacher.avatar} />
                <AvatarFallback className="gradient-emerald text-white text-2xl font-medium">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                  {teacher.name}
                </h2>
                <div className="flex items-center gap-4 mb-3">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1 px-3 py-1.5">
                    <BookOpen className="h-3 w-3" />
                    {teacher.department}
                  </Badge>
                  <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 gap-1 px-3 py-1.5">
                    <CheckCircle className="h-3 w-3" />
                    {teacher.status}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1 px-3 py-1.5">
                    <GraduationCap className="h-3 w-3" />
                    {teacher.experience}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span>Teacher ID: {teacher.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Joined: {new Date(teacher.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-slate-400" />
                    <span>{teacher.qualification}</span>
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
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                <p className="font-medium text-slate-900">{teacher.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                <p className="font-medium text-slate-900">{teacher.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Address</p>
                <p className="font-medium text-slate-900 text-sm">{teacher.address}</p>
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
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-900">{totalStudents}</p>
                <p className="text-sm text-emerald-700">Total Students</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <School className="h-4 w-4 text-emerald-500" />
              <span className="text-sm text-emerald-600">{teacher.classes.length} Classes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-indigo hover-lift">
          <div className="absolute inset-0 gradient-indigo opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-indigo flex items-center justify-center shadow-colored-indigo">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-900">{averageClassPerformance}%</p>
                <p className="text-sm text-indigo-700">Avg Class Performance</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-indigo-500" />
              <span className="text-sm text-indigo-600">Excellent rating</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-purple hover-lift">
          <div className="absolute inset-0 gradient-purple opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-purple flex items-center justify-center shadow-colored-purple">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-900">{averageAttendance}%</p>
                <p className="text-sm text-purple-700">Class Attendance</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-purple-600">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-colored-amber hover-lift">
          <div className="absolute inset-0 gradient-amber opacity-5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="h-12 w-12 rounded-2xl gradient-amber flex items-center justify-center shadow-colored-amber">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-900">{teacher.subjects.length}</p>
                <p className="text-sm text-amber-700">Subjects Teaching</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-600">Specialized</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="classes" className="gap-2">
            <School className="h-4 w-4" />
            Classes
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="activities" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Class Overview
                </CardTitle>
                <CardDescription>Performance summary by class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {classPerformanceData.map((classData, index) => (
                  <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-slate-50/50 to-slate-100/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center">
                          <span className="text-white font-medium">{classData.class}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Class {classData.class}</h4>
                          <p className="text-sm text-slate-500">{classData.studentCount} students</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        {classData.averageGrade}% avg
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Average Grade</p>
                        <div className="flex items-center gap-2">
                          <Progress value={classData.averageGrade} className="h-2" />
                          <span className="text-sm font-medium">{classData.averageGrade}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Attendance</p>
                        <div className="flex items-center gap-2">
                          <Progress value={classData.attendance} className="h-2" />
                          <span className="text-sm font-medium">{classData.attendance}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Subject Distribution
                </CardTitle>
                <CardDescription>Subjects currently teaching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teacher.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="font-medium text-slate-900">{subject}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">Class Assignments</h4>
                  {teacher.classes.map((cls, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2 bg-purple-50 text-purple-700 border-purple-200">
                      Class {cls}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Monthly Performance Trend
                </CardTitle>
                <CardDescription>Class average performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyPerformance}>
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
                    />
                    <Line 
                      type="monotone" 
                      dataKey="classAverage" 
                      stroke="#6366f1" 
                      strokeWidth={4}
                      dot={{ fill: '#6366f1', strokeWidth: 3, r: 6 }}
                      name="Class Average"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#10b981" 
                      strokeWidth={4}
                      dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                      name="Attendance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover-lift glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Student Grade Distribution
                </CardTitle>
                <CardDescription>Distribution of grades across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {studentDistribution.map((entry, index) => (
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
                  {studentDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-slate-600">{item.grade}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{item.count} students</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Today's Schedule
              </CardTitle>
              <CardDescription>Current day teaching schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl gradient-purple flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-900">{schedule.subject}</h4>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {schedule.class}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{schedule.time}</span>
                      <span>•</span>
                      <span>{schedule.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Achievements & Recognition
              </CardTitle>
              <CardDescription>Awards, certifications, and recognitions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-amber-100 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      achievement.type === 'award' ? 'gradient-amber' :
                      achievement.type === 'certification' ? 'gradient-indigo' :
                      'gradient-emerald'
                    }`}>
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{achievement.description}</p>
                      <p className="text-xs text-slate-500">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={`${
                      achievement.type === 'award' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      achievement.type === 'certification' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' :
                      'bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}>
                      {achievement.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="border-0 shadow-xl hover-lift glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Recent Activities
              </CardTitle>
              <CardDescription>Latest teaching activities and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                  activity.status === 'completed' ? 'bg-gradient-to-r from-emerald-50/50 to-green-50/50 border-emerald-100 hover:shadow-colored-emerald' :
                  activity.status === 'active' ? 'bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-amber-100 hover:shadow-colored-amber' :
                  'bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-cyan-100 hover:shadow-colored-cyan'
                }`}>
                  <div className={`w-3 h-3 rounded-full mt-2 animate-pulse-slow ${
                    activity.status === 'completed' ? 'bg-emerald-500' :
                    activity.status === 'active' ? 'bg-amber-500' :
                    'bg-cyan-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                    <p className="text-xs text-slate-600 mb-1">{activity.description}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                  <Badge className={`${
                    activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                    activity.status === 'active' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                    'bg-cyan-100 text-cyan-800 border-cyan-200'
                  }`}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}