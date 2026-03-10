import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Target,
  Download,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

// Mock test data
const currentGrades = {
  overall: 'A-',
  gpa: 3.7,
  percentage: 92.4,
  rank: 5,
  totalStudents: 45
};

const subjectPerformance = [
  { subject: 'Mathematics', current: 92, previous: 88, target: 95, grade: 'A-', trend: 'up' },
  { subject: 'Science', current: 88, previous: 85, target: 90, grade: 'B+', trend: 'up' },
  { subject: 'English', current: 95, previous: 93, target: 95, grade: 'A', trend: 'up' },
  { subject: 'Social Studies', current: 90, previous: 92, target: 93, grade: 'A-', trend: 'down' },
  { subject: 'Arts', current: 96, previous: 94, target: 95, grade: 'A', trend: 'up' },
  { subject: 'Physical Education', current: 94, previous: 91, target: 90, grade: 'A', trend: 'up' },
];

const progressData = [
  { month: 'Sep', overall: 85, mathematics: 82, science: 80, english: 88 },
  { month: 'Oct', overall: 87, mathematics: 85, science: 83, english: 90 },
  { month: 'Nov', overall: 89, mathematics: 88, science: 85, english: 92 },
  { month: 'Dec', overall: 91, mathematics: 90, science: 87, english: 94 },
  { month: 'Jan', overall: 92, mathematics: 92, science: 88, english: 95 },
];

const radarData = [
  { subject: 'Math', score: 92, fullMark: 100 },
  { subject: 'Science', score: 88, fullMark: 100 },
  { subject: 'English', score: 95, fullMark: 100 },
  { subject: 'Social', score: 90, fullMark: 100 },
  { subject: 'Arts', score: 96, fullMark: 100 },
  { subject: 'PE', score: 94, fullMark: 100 },
];

const recentTests = [
  {
    subject: 'Mathematics',
    testName: 'Algebra Quiz',
    date: '2024-01-20',
    score: 18,
    totalMarks: 20,
    percentage: 90,
    grade: 'A-',
    status: 'graded'
  },
  {
    subject: 'Science',
    testName: 'Physics Unit Test',
    date: '2024-01-18',
    score: 42,
    totalMarks: 50,
    percentage: 84,
    grade: 'B+',
    status: 'graded'
  },
  {
    subject: 'English',
    testName: 'Essay Writing',
    date: '2024-01-15',
    score: 95,
    totalMarks: 100,
    percentage: 95,
    grade: 'A',
    status: 'graded'
  },
  {
    subject: 'Mathematics',
    testName: 'Geometry Test',
    date: '2024-01-25',
    score: null,
    totalMarks: 25,
    percentage: null,
    grade: null,
    status: 'pending'
  }
];

const upcomingTests = [
  { subject: 'Science', testName: 'Chemistry Lab Test', date: '2024-01-28', syllabus: 'Chapters 5-6' },
  { subject: 'Social Studies', testName: 'History Quiz', date: '2024-01-30', syllabus: 'World War II' },
  { subject: 'Mathematics', testName: 'Trigonometry Test', date: '2024-02-02', syllabus: 'Chapters 7-8' },
  { subject: 'English', testName: 'Grammar Test', date: '2024-02-05', syllabus: 'Parts of Speech' }
];

export function TestProgress() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('current');

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <div className="h-4 w-4 text-red-600 rotate-180"><TrendingUp /></div>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'graded':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Graded</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
      default:
        return null;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'text-green-600';
    if (grade?.startsWith('B')) return 'text-blue-600';
    if (grade?.startsWith('C')) return 'text-amber-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Academic Progress</h2>
          <p className="text-sm text-gray-500 mt-1">Track your child's test scores and academic performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Overall Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Overall Grade</p>
                <p className="text-2xl font-bold text-blue-900">{currentGrades.overall}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Star className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-1">{currentGrades.percentage}% Average</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Class Rank</p>
                <p className="text-2xl font-bold text-green-900">{currentGrades.rank}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">Out of {currentGrades.totalStudents} students</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">GPA</p>
                <p className="text-2xl font-bold text-purple-900">{currentGrades.gpa}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Target className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-1">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Tests Taken</p>
                <p className="text-2xl font-bold text-amber-900">24</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Progress Trend</CardTitle>
            <CardDescription className="text-sm text-gray-500">Monthly academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[75, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line type="monotone" dataKey="overall" stroke="#3b82f6" strokeWidth={2} name="Overall" />
                <Line type="monotone" dataKey="mathematics" stroke="#10b981" strokeWidth={2} name="Math" />
                <Line type="monotone" dataKey="science" stroke="#f59e0b" strokeWidth={2} name="Science" />
                <Line type="monotone" dataKey="english" stroke="#8b5cf6" strokeWidth={2} name="English" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Subject Performance</CardTitle>
            <CardDescription className="text-sm text-gray-500">Current scores across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Details */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Subject-wise Performance</CardTitle>
          <CardDescription className="text-sm text-gray-500">Detailed breakdown by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                    <Badge className={`${getGradeColor(subject.grade)} bg-opacity-10 border-current`}>
                      {subject.grade}
                    </Badge>
                    {getTrendIcon(subject.trend)}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">{subject.current}%</span>
                    <p className="text-xs text-gray-500">Target: {subject.target}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Target</span>
                    <span>{Math.round((subject.current / subject.target) * 100)}%</span>
                  </div>
                  <Progress value={(subject.current / subject.target) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Tests */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent Tests</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recent Test Results</CardTitle>
              <CardDescription className="text-sm text-gray-500">Latest assessments and scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50/50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{test.testName}</h4>
                          <p className="text-sm text-gray-500">{test.subject} • {test.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                    <div className="flex items-center gap-4">
                      {test.status === 'graded' ? (
                        <>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{test.score}/{test.totalMarks}</p>
                            <p className="text-sm text-gray-500">{test.percentage}% ({test.grade})</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Awaiting results</p>
                          <p className="text-xs text-gray-400">Total: {test.totalMarks} marks</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Upcoming Tests</CardTitle>
              <CardDescription className="text-sm text-gray-500">Scheduled assessments and preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50/50">
                    <div className="flex items-center gap-4">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{test.testName}</h4>
                        <p className="text-sm text-gray-500">{test.subject} • {test.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Syllabus:</p>
                      <p className="text-sm text-gray-600">{test.syllabus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Tips */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg font-semibold text-purple-900">Performance Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-purple-900">Strengths:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Excellent performance in English and Arts</li>
                <li>• Consistent improvement in Mathematics</li>
                <li>• Strong overall academic trajectory</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-purple-900">Areas for Improvement:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Focus on Science concepts and practical work</li>
                <li>• Maintain consistency in Social Studies</li>
                <li>• Continue regular practice in weak areas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}