import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, GraduationCap, UserCheck, DollarSign, TrendingUp, Calendar, BookOpen, Award, ArrowUpRight, ArrowDownRight } from "lucide-react";

const studentData = [
  { month: 'Jan', students: 450 },
  { month: 'Feb', students: 465 },
  { month: 'Mar', students: 480 },
  { month: 'Apr', students: 470 },
  { month: 'May', students: 485 },
  { month: 'Jun', students: 492 },
];

const gradeData = [
  { grade: 'Grade 1', count: 85, color: '#3b82f6' },
  { grade: 'Grade 2', count: 78, color: '#10b981' },
  { grade: 'Grade 3', count: 65, color: '#f59e0b' },
  { grade: 'Grade 4', count: 72, color: '#ef4444' },
  { grade: 'Grade 5', count: 68, color: '#8b5cf6' },
];

const revenueData = [
  { month: 'Jan', revenue: 22400 },
  { month: 'Feb', revenue: 23100 },
  { month: 'Mar', revenue: 24600 },
  { month: 'Apr', revenue: 23800 },
  { month: 'May', revenue: 24200 },
  { month: 'Jun', revenue: 24600 },
];

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">492</div>
            <div className="flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+2.4%</span>
              <span className="text-gray-600">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Total Teachers</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">48</div>
            <div className="flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+4.2%</span>
              <span className="text-gray-600">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-700">Admin Users</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">12</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-600">Active administrators</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-amber-700">Monthly Revenue</CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">$24,600</div>
            <div className="flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+8.1%</span>
              <span className="text-gray-600">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Student Enrollment Trend</CardTitle>
                <CardDescription className="text-sm text-gray-500">Monthly enrollment over the past 6 months</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                +2.4% growth
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="students" fill="#3b82f6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Students by Grade</CardTitle>
            <CardDescription className="text-sm text-gray-500">Current distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  stroke="none"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {gradeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.grade}</span>
                  </div>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
              <CardDescription className="text-sm text-gray-500">Monthly revenue trend and growth</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.1% growth
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <CardDescription className="text-sm text-gray-500">Latest system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New student Sarah Johnson enrolled</p>
                <p className="text-xs text-gray-500 mt-1">Grade 3 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Curriculum updated by Mark Davis</p>
                <p className="text-xs text-gray-500 mt-1">Grade 5 Mathematics • 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Fee payments received</p>
                <p className="text-xs text-gray-500 mt-1">15 students • 1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New admin user added</p>
                <p className="text-xs text-gray-500 mt-1">Lisa Chen • 2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-gray-500">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
              <GraduationCap className="h-4 w-4 mr-3" />
              Add New Student
            </Button>
            <Button className="w-full justify-start h-12 bg-green-600 hover:bg-green-700 text-white" variant="secondary" size="lg">
              <Users className="h-4 w-4 mr-3" />
              Add New Teacher
            </Button>
            <Button className="w-full justify-start h-12" variant="outline" size="lg">
              <BookOpen className="h-4 w-4 mr-3" />
              Manage Courses
            </Button>
            <Button className="w-full justify-start h-12" variant="outline" size="lg">
              <Calendar className="h-4 w-4 mr-3" />
              Schedule Management
            </Button>
            <Button className="w-full justify-start h-12" variant="outline" size="lg">
              <Award className="h-4 w-4 mr-3" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Academic Progress */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Academic Progress Overview</CardTitle>
          <CardDescription className="text-sm text-gray-500">Current academic year progress and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Semester 1</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Completed
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-sm text-gray-500">All assessments completed</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Semester 2</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  In Progress
                </Badge>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-sm text-gray-500">65% complete • 4 weeks remaining</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Final Exams</span>
                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                  Upcoming
                </Badge>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-sm text-gray-500">Scheduled for July 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}