import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { 
  Home, 
  ClipboardCheck, 
  FileText, 
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
  Trophy,
  Award
} from "lucide-react";
import { EduTrioLogo } from "./EduTrioLogo";

interface MobileTeacherAppProps {}

export function MobileTeacherApp({}: MobileTeacherAppProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [searchTerm, setSearchTerm] = useState('');

  const [students] = useState([
    { id: '1', name: 'Alice Johnson', rollNumber: '001', isPresent: true, isLate: false },
    { id: '2', name: 'Bob Smith', rollNumber: '002', isPresent: true, isLate: true },
    { id: '3', name: 'Carol Davis', rollNumber: '003', isPresent: false, isLate: false },
    { id: '4', name: 'David Wilson', rollNumber: '004', isPresent: true, isLate: false },
    { id: '5', name: 'Emma Brown', rollNumber: '005', isPresent: true, isLate: false },
    { id: '6', name: 'Frank Miller', rollNumber: '006', isPresent: false, isLate: false },
    { id: '7', name: 'Grace Lee', rollNumber: '007', isPresent: true, isLate: false },
    { id: '8', name: 'Henry Clark', rollNumber: '008', isPresent: true, isLate: false },
  ]);

  const [testScores] = useState([
    { studentId: '1', studentName: 'Alice Johnson', rollNumber: '001', score: 85, grade: 'A' },
    { studentId: '2', studentName: 'Bob Smith', rollNumber: '002', score: 78, grade: 'B+' },
    { studentId: '3', studentName: 'Carol Davis', rollNumber: '003', score: 92, grade: 'A+' },
    { studentId: '4', studentName: 'David Wilson', rollNumber: '004', score: 73, grade: 'B' },
    { studentId: '5', studentName: 'Emma Brown', rollNumber: '005', score: 88, grade: 'A' },
  ]);

  const renderHeader = () => (
    <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <EduTrioLogo size="sm" />
          <div>
            <h1 className="font-bold text-purple-900">EduTrio</h1>
            <p className="text-xs text-slate-600">Teacher Mobile</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-purple-600">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8 border-2 border-purple-200">
            <AvatarImage src="/placeholder-teacher.jpg" />
            <AvatarFallback className="gradient-purple text-white text-xs font-medium">
              JS
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          Good Morning, John!
        </h2>
        <p className="text-slate-600">Here's your class overview for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-purple flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Students</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">58</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-indigo flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Classes</span>
            </div>
            <p className="text-2xl font-bold text-indigo-900">3</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-emerald flex items-center justify-center">
                <ClipboardCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Attendance</span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">91%</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-xl gradient-cyan flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">Tests</span>
            </div>
            <p className="text-2xl font-bold text-cyan-900">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-purple-900">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="font-medium text-slate-900">09:00 AM</p>
                <p className="text-sm text-slate-600">Mathematics - 10-A</p>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              Completed
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <div>
                <p className="font-medium text-slate-900">11:00 AM</p>
                <p className="text-sm text-slate-600">Mathematics - 10-B</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              Ongoing
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <div>
                <p className="font-medium text-slate-900">02:00 PM</p>
                <p className="text-sm text-slate-600">Algebra - 10-A</p>
              </div>
            </div>
            <Badge className="bg-slate-100 text-slate-800 border-slate-200">
              Upcoming
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button 
            className="gradient-indigo text-white shadow-colored-indigo h-12"
            onClick={() => setActiveTab('attendance')}
          >
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Take Attendance
          </Button>
          <Button 
            className="gradient-cyan text-white shadow-colored-cyan h-12"
            onClick={() => setActiveTab('tests')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Manage Tests
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAttendance = () => (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-900">Take Attendance</h2>
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-sm"
        >
          <option value="10-A">Class 10-A</option>
          <option value="10-B">Class 10-B</option>
          <option value="9-A">Class 9-A</option>
        </select>
      </div>

      {/* Date & Subject */}
      <Card className="glass-card border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Date</label>
              <Input type="date" defaultValue="2024-08-27" className="bg-white/50 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Subject</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/50 mt-1">
                <option>Mathematics</option>
                <option>Algebra</option>
                <option>Geometry</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/50"
        />
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="h-6 w-6 rounded-lg gradient-emerald flex items-center justify-center mx-auto mb-1">
              <CheckCircle2 className="h-3 w-3 text-white" />
            </div>
            <p className="text-lg font-bold text-emerald-900">6</p>
            <p className="text-xs text-slate-600">Present</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="h-6 w-6 rounded-lg gradient-rose flex items-center justify-center mx-auto mb-1">
              <XCircle className="h-3 w-3 text-white" />
            </div>
            <p className="text-lg font-bold text-rose-900">2</p>
            <p className="text-xs text-slate-600">Absent</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="h-6 w-6 rounded-lg gradient-amber flex items-center justify-center mx-auto mb-1">
              <Clock className="h-3 w-3 text-white" />
            </div>
            <p className="text-lg font-bold text-amber-900">1</p>
            <p className="text-xs text-slate-600">Late</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <div className="space-y-2">
        {students.slice(0, 6).map((student) => (
          <Card key={student.id} className="glass-card border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-white">
                    <AvatarFallback className="gradient-indigo text-white text-xs">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{student.name}</p>
                    <p className="text-xs text-slate-600">Roll: {student.rollNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={student.isPresent ? "default" : "outline"}
                    className={student.isPresent ? "gradient-emerald text-white h-8 px-3" : "h-8 px-3"}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant={!student.isPresent ? "default" : "outline"}
                    className={!student.isPresent ? "gradient-rose text-white h-8 px-3" : "h-8 px-3"}
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <Button className="w-full gradient-indigo text-white shadow-colored-indigo h-12">
        <ClipboardCheck className="h-4 w-4 mr-2" />
        Save Attendance
      </Button>
    </div>
  );

  const renderTests = () => (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-cyan-900">Test Management</h2>
        <Button size="sm" className="gradient-cyan text-white">
          <Plus className="h-4 w-4 mr-1" />
          Add Test
        </Button>
      </div>

      {/* Test Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="h-6 w-6 rounded-lg gradient-emerald flex items-center justify-center mx-auto mb-1">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
            <p className="text-lg font-bold text-emerald-900">84</p>
            <p className="text-xs text-slate-600">Average</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="h-6 w-6 rounded-lg gradient-amber flex items-center justify-center mx-auto mb-1">
              <Trophy className="h-3 w-3 text-white" />
            </div>
            <p className="text-lg font-bold text-amber-900">95</p>
            <p className="text-xs text-slate-600">Highest</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <div className="h-6 w-6 rounded-lg gradient-purple flex items-center justify-center mx-auto mb-1">
              <Award className="h-3 w-3 text-white" />
            </div>
            <p className="text-lg font-bold text-purple-900">89%</p>
            <p className="text-xs text-slate-600">Pass Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">Recent Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50">
            <div>
              <p className="font-medium text-slate-900">Mid-term Exam</p>
              <p className="text-sm text-slate-600">Mathematics • 10-A</p>
              <p className="text-xs text-slate-500">Aug 25, 2024</p>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-1">
                Completed
              </Badge>
              <p className="text-xs text-slate-600">28/30 submitted</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50">
            <div>
              <p className="font-medium text-slate-900">Unit Test 3</p>
              <p className="text-sm text-slate-600">Algebra • 10-B</p>
              <p className="text-xs text-slate-500">Aug 23, 2024</p>
            </div>
            <div className="text-right">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-1">
                Pending
              </Badge>
              <p className="text-xs text-slate-600">25/28 submitted</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Scores */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-900">Latest Scores - Mid-term Exam</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {testScores.map((score) => (
            <div key={score.studentId} className="flex items-center justify-between p-3 rounded-xl bg-white/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-white">
                  <AvatarFallback className="gradient-indigo text-white text-xs">
                    {score.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{score.studentName}</p>
                  <p className="text-xs text-slate-600">Roll: {score.rollNumber}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-slate-900">{score.score}/100</p>
                <Badge className={
                  score.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                  score.grade.startsWith('B') ? 'bg-cyan-100 text-cyan-800 border-cyan-200' :
                  'bg-amber-100 text-amber-800 border-amber-200'
                }>
                  {score.grade}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'attendance': return renderAttendance();
      case 'tests': return renderTests();
      case 'students': return (
        <div className="p-4 pb-24">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">My Students</h2>
          <p className="text-slate-600">Student management coming soon...</p>
        </div>
      );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Header */}
      {renderHeader()}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-white/20 p-4 fixed bottom-0 left-0 right-0">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'home' ? 'text-purple-600' : 'text-slate-600'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('attendance')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'attendance' ? 'text-indigo-600' : 'text-slate-600'
            }`}
          >
            <ClipboardCheck className="h-5 w-5" />
            <span className="text-xs">Attendance</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('tests')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'tests' ? 'text-cyan-600' : 'text-slate-600'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs">Tests</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('students')}
            className={`flex flex-col items-center gap-1 h-auto p-2 ${
              activeTab === 'students' ? 'text-emerald-600' : 'text-slate-600'
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs">Students</span>
          </Button>
        </div>
      </div>
    </div>
  );
}