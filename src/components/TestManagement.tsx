import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  FileText, 
  Plus,
  Edit,
  Save,
  Search,
  Download,
  Trophy,
  TrendingUp,
  Users,
  Calendar,
  Star,
  Award
} from "lucide-react";

interface Test {
  id: string;
  name: string;
  subject: string;
  class: string;
  date: string;
  totalMarks: number;
  type: 'quiz' | 'unit-test' | 'mid-term' | 'final';
  status: 'draft' | 'published' | 'completed';
}

interface TestScore {
  studentId: string;
  studentName: string;
  rollNumber: string;
  score: number;
  grade: string;
  remarks?: string;
}

export function TestManagement() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isAddingTest, setIsAddingTest] = useState(false);

  const [tests] = useState<Test[]>([
    {
      id: '1',
      name: 'Mid-term Exam',
      subject: 'Mathematics',
      class: '10-A',
      date: '2024-08-25',
      totalMarks: 100,
      type: 'mid-term',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Unit Test 3',
      subject: 'Mathematics',
      class: '10-A',
      date: '2024-08-20',
      totalMarks: 50,
      type: 'unit-test',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Weekly Quiz',
      subject: 'Algebra',
      class: '10-B',
      date: '2024-08-27',
      totalMarks: 25,
      type: 'quiz',
      status: 'published'
    },
  ]);

  const [testScores, setTestScores] = useState<TestScore[]>([
    { studentId: '1', studentName: 'Alice Johnson', rollNumber: '001', score: 85, grade: 'A' },
    { studentId: '2', studentName: 'Bob Smith', rollNumber: '002', score: 78, grade: 'B+' },
    { studentId: '3', studentName: 'Carol Davis', rollNumber: '003', score: 92, grade: 'A+' },
    { studentId: '4', studentName: 'David Wilson', rollNumber: '004', score: 73, grade: 'B' },
    { studentId: '5', studentName: 'Emma Brown', rollNumber: '005', score: 88, grade: 'A' },
    { studentId: '6', studentName: 'Frank Miller', rollNumber: '006', score: 65, grade: 'C+' },
    { studentId: '7', studentName: 'Grace Lee', rollNumber: '007', score: 95, grade: 'A+' },
    { studentId: '8', studentName: 'Henry Clark', rollNumber: '008', score: 82, grade: 'A-' },
  ]);

  const classes = [
    { value: '10-A', label: 'Class 10-A' },
    { value: '10-B', label: 'Class 10-B' },
    { value: '9-A', label: 'Class 9-A' },
  ];

  const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'algebra', label: 'Algebra' },
    { value: 'geometry', label: 'Geometry' },
  ];

  const testTypes = [
    { value: 'quiz', label: 'Quiz' },
    { value: 'unit-test', label: 'Unit Test' },
    { value: 'mid-term', label: 'Mid-term Exam' },
    { value: 'final', label: 'Final Exam' },
  ];

  const getGrade = (score: number, total: number): string => {
    const percentage = (score / total) * 100;
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'A-';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 65) return 'C+';
    if (percentage >= 60) return 'C';
    if (percentage >= 55) return 'C-';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const updateScore = (studentId: string, score: number) => {
    if (selectedTest) {
      const grade = getGrade(score, selectedTest.totalMarks);
      setTestScores(prev => prev.map(s => 
        s.studentId === studentId ? { ...s, score, grade } : s
      ));
    }
  };

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.class.includes(searchTerm) ||
    test.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageScore = testScores.length > 0 
    ? testScores.reduce((sum, score) => sum + score.score, 0) / testScores.length 
    : 0;

  const highestScore = testScores.length > 0 
    ? Math.max(...testScores.map(s => s.score)) 
    : 0;

  const passCount = testScores.filter(s => s.score >= (selectedTest?.totalMarks ?? 100) * 0.5).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Test & Grade Management
          </h1>
          <p className="text-slate-600 mt-2">
            Create tests, manage scores, and track student performance.
          </p>
        </div>
      </div>

      {!selectedTest ? (
        <>
          {/* Controls */}
          <Card className="glass-card border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-900">
                  <FileText className="h-5 w-5" />
                  Test Management
                </div>
                <Dialog open={isAddingTest} onOpenChange={setIsAddingTest}>
                  <DialogTrigger asChild>
                    <Button className="gradient-cyan text-white shadow-colored-cyan">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Test</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Test Name</Label>
                        <Input placeholder="Enter test name" className="bg-white/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Class</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              {classes.map(cls => (
                                <SelectItem key={cls.value} value={cls.value}>
                                  {cls.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Subject</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map(subject => (
                                <SelectItem key={subject.value} value={subject.value}>
                                  {subject.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Test Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {testTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Total Marks</Label>
                          <Input type="number" placeholder="100" className="bg-white/50" />
                        </div>
                      </div>
                      <div>
                        <Label>Test Date</Label>
                        <Input type="date" className="bg-white/50" />
                      </div>
                      <Button className="w-full gradient-cyan text-white">
                        Create Test
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Test List */}
          <Card className="glass-card border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <FileText className="h-5 w-5" />
                All Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl gradient-cyan flex items-center justify-center shadow-colored-cyan">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-slate-900">{test.name}</p>
                        <p className="text-sm text-slate-600">
                          {test.subject} • {test.class} • {test.date}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">
                            {test.totalMarks} marks
                          </Badge>
                          <Badge className={
                            test.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            test.status === 'published' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-slate-100 text-slate-800 border-slate-200'
                          }>
                            {test.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedTest(test)}
                        className="hover:bg-cyan-50 hover:border-cyan-300"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Manage Scores
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-purple-50 hover:border-purple-300">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Test Score Management */}
          <Card className="glass-card border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-900">
                    <FileText className="h-5 w-5" />
                    {selectedTest.name} - Score Management
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedTest.subject} • {selectedTest.class} • Total: {selectedTest.totalMarks} marks
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTest(null)}
                  className="hover:bg-slate-50"
                >
                  Back to Tests
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="glass-card border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Average</p>
                        <p className="text-xl font-bold text-emerald-900">{averageScore.toFixed(1)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl gradient-amber flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Highest</p>
                        <p className="text-xl font-bold text-amber-900">{highestScore}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl gradient-purple flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Pass Rate</p>
                        <p className="text-xl font-bold text-purple-900">
                          {((passCount / testScores.length) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl gradient-indigo flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Submitted</p>
                        <p className="text-xl font-bold text-indigo-900">{testScores.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Score Entry */}
              <div className="space-y-3">
                {testScores.map((score) => (
                  <div key={score.studentId} className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="gradient-indigo text-white font-medium">
                          {score.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="font-medium text-slate-900">{score.studentName}</p>
                        <p className="text-sm text-slate-600">Roll No: {score.rollNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-slate-600">Score:</Label>
                        <Input
                          type="number"
                          min="0"
                          max={selectedTest.totalMarks}
                          value={score.score}
                          onChange={(e) => updateScore(score.studentId, parseInt(e.target.value) || 0)}
                          className="w-20 bg-white/70"
                        />
                        <span className="text-sm text-slate-600">/ {selectedTest.totalMarks}</span>
                      </div>
                      
                      <Badge className={
                        score.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                        score.grade.startsWith('B') ? 'bg-cyan-100 text-cyan-800 border-cyan-200' :
                        score.grade.startsWith('C') ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }>
                        {score.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="flex justify-end mt-6 pt-6 border-t border-slate-200">
                <Button className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-all duration-200">
                  <Save className="h-4 w-4 mr-2" />
                  Save All Scores
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}