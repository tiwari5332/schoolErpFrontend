import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  ClipboardCheck, 
  Calendar,
  Users,
  Search,
  Download,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Filter
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar?: string;
  isPresent: boolean;
  isLate: boolean;
  notes?: string;
}

export function ClassAttendance() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState('2024-08-27');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alice Johnson', rollNumber: '001', isPresent: true, isLate: false },
    { id: '2', name: 'Bob Smith', rollNumber: '002', isPresent: true, isLate: true },
    { id: '3', name: 'Carol Davis', rollNumber: '003', isPresent: false, isLate: false },
    { id: '4', name: 'David Wilson', rollNumber: '004', isPresent: true, isLate: false },
    { id: '5', name: 'Emma Brown', rollNumber: '005', isPresent: true, isLate: false },
    { id: '6', name: 'Frank Miller', rollNumber: '006', isPresent: false, isLate: false },
    { id: '7', name: 'Grace Lee', rollNumber: '007', isPresent: true, isLate: false },
    { id: '8', name: 'Henry Clark', rollNumber: '008', isPresent: true, isLate: false },
    { id: '9', name: 'Ivy Martinez', rollNumber: '009', isPresent: true, isLate: false },
    { id: '10', name: 'Jack Taylor', rollNumber: '010', isPresent: false, isLate: false },
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

  const updateAttendance = (studentId: string, field: 'isPresent' | 'isLate', value: boolean) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, [field]: value, ...(field === 'isPresent' && !value ? { isLate: false } : {}) }
        : student
    ));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, isPresent: true, isLate: false })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, isPresent: false, isLate: false })));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const presentCount = students.filter(s => s.isPresent).length;
  const absentCount = students.filter(s => !s.isPresent).length;
  const lateCount = students.filter(s => s.isLate).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Class Attendance
          </h1>
          <p className="text-slate-600 mt-2">
            Mark and manage student attendance for your classes.
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <ClipboardCheck className="h-5 w-5" />
            Attendance Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="class-select">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
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
              <Label htmlFor="subject-select">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
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
            
            <div>
              <Label htmlFor="date-select">Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white/50"
              />
            </div>
            
            <div>
              <Label htmlFor="search">Search Students</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by name or roll..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={markAllPresent} className="gradient-emerald text-white shadow-colored-emerald">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All Present
            </Button>
            <Button onClick={markAllAbsent} variant="outline" className="hover:bg-red-50 hover:border-red-300">
              <XCircle className="h-4 w-4 mr-2" />
              Mark All Absent
            </Button>
            <Button variant="outline" className="hover:bg-cyan-50 hover:border-cyan-300">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Present</p>
                <p className="text-xl font-bold text-emerald-900">{presentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-rose flex items-center justify-center">
                <XCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Absent</p>
                <p className="text-xl font-bold text-rose-900">{absentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-amber flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Late</p>
                <p className="text-xl font-bold text-amber-900">{lateCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-indigo flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-xl font-bold text-indigo-900">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900">
              <Users className="h-5 w-5" />
              Student Attendance - {selectedClass}
            </div>
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
              {selectedDate}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback className="gradient-indigo text-white font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-600">Roll No: {student.rollNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Present Checkbox */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`present-${student.id}`}
                      checked={student.isPresent}
                      onCheckedChange={(checked) => updateAttendance(student.id, 'isPresent', checked as boolean)}
                    />
                    <Label htmlFor={`present-${student.id}`} className="text-sm font-medium text-emerald-700">
                      Present
                    </Label>
                  </div>

                  {/* Late Checkbox */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`late-${student.id}`}
                      checked={student.isLate}
                      disabled={!student.isPresent}
                      onCheckedChange={(checked) => updateAttendance(student.id, 'isLate', checked as boolean)}
                    />
                    <Label htmlFor={`late-${student.id}`} className="text-sm font-medium text-amber-700">
                      Late
                    </Label>
                  </div>

                  {/* Status Badge */}
                  <Badge className={
                    student.isPresent 
                      ? (student.isLate ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200')
                      : 'bg-red-100 text-red-800 border-red-200'
                  }>
                    {student.isPresent ? (student.isLate ? 'Late' : 'Present') : 'Absent'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6 pt-6 border-t border-slate-200">
            <Button className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200">
              <Save className="h-4 w-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}